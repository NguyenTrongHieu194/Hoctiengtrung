import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { evaluatePronunciationLocally } from "../src/services/pronunciationScoringEngine.ts";
import { generateServerTutorFallback } from "./tutorFallback.ts";
import {
  initCedictDatabase,
  ensureCedictLoaded,
  searchCedict,
  defineWord,
  analyzeChineseSentence,
  getRandomWord,
  getDictionaryStats,
  getEntriesByWords,
  findDataFilePath
} from "./cedictService.ts";

dotenv.config();

export const app = express();

// Global CORS middleware
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  next();
});

app.use(express.json({ limit: "10mb" }));

// Middleware to normalize URL paths for Vercel Serverless Function environments
app.use((req, _res, next) => {
  if (req.url === "/api" || req.url === "/" || req.url === "") {
    if (req.originalUrl && req.originalUrl !== "/api" && req.originalUrl !== "/") {
      req.url = req.originalUrl;
    }
  }
  next();
});

// Lazy initializer for Google GenAI client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

/**
 * Executes Gemini generateContent with multi-model fallback in case of 503 high demand or transient failures.
 */
async function generateContentWithFallback(
  prompt: string,
  options?: { jsonMode?: boolean }
): Promise<string> {
  const ai = getGenAI();
  const candidateModels = ["gemini-2.5-flash", "gemini-2.5-pro"];
  
  let lastError: any = null;
  for (const model of candidateModels) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: options?.jsonMode ? { responseMimeType: "application/json" } : undefined,
      });
      if (response && response.text) {
        return response.text;
      }
    } catch (err: any) {
      console.warn(`Model ${model} unavailable or failed:`, err?.message || err);
      lastError = err;
    }
  }
  throw lastError || new Error("All AI models currently experiencing high demand.");
}

// Router supporting both /api/... and direct /... access
const apiRouter = express.Router();

// Health check endpoint
apiRouter.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Diagnostics endpoint to verify data file and dictionary load
apiRouter.get("/debug", (_req, res) => {
  const dataPath = findDataFilePath("cedict_vn.tsv.gz");
  const stats = getDictionaryStats();
  res.json({
    status: "ok",
    nodeVersion: process.version,
    cwd: process.cwd(),
    dataPath,
    hasDataFile: !!dataPath,
    stats,
    time: new Date().toISOString()
  });
});

// AI Chinese Tutor Chat endpoint powered by Gemini with fallback
apiRouter.post("/ai/chat", async (req, res) => {
  const { messages } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  const lastUserMsg = (messages || []).slice(-1)[0]?.content || "";

  if (!apiKey) {
    return res.json({
      reply: generateServerTutorFallback(lastUserMsg)
    });
  }

  try {
    const systemPrompt = `Bạn là một Giáo viên Tiếng Trung AI xuất sắc, uyên bác, sư phạm và gần gũi dành cho người học Việt Nam (Học viên mọi trình độ từ vỡ lòng, HSK 1-6 đến tiếng Trung chuyên ngành May mặc/Nhà xưởng).

Nhiệm vụ của bạn:
1. Trả lời trực diện, chính xác và đầy đủ câu hỏi của người học.
2. Quy chuẩn trình bày:
   - Giải thích sư phạm, mạch lạc bằng TIẾNG VIỆT.
   - Luôn kèm chữ Hán giản thể (Hanzi) chuẩn xác.
   - Kèm phiên âm Pinyin có dấu thanh điệu chuẩn quốc tế.
   - Dịch nghĩa và ví dụ câu minh họa cụ thể, sinh động.
   - Khi có thuật ngữ xưởng may, cung cấp đúng từ vựng nhà máy thực tế.
3. Giọng điệu nhiệt tình, truyền cảm hứng, thân thiện và thông minh như một người thầy dạy trực tiếp.`;

    const chatHistory = (messages || []).map((m: { role: string; content: string }) => {
      return `${m.role === 'user' ? 'Học viên' : 'Giáo viên AI'}: ${m.content}`;
    }).join("\n\n");

    const prompt = `${systemPrompt}\n\nLỊCH SỬ HỘI THOẠI:\n${chatHistory}\n\nGiáo viên AI hãy trả lời câu hỏi mới nhất của học viên một cách chi tiết, sinh động:`;

    const replyText = await generateContentWithFallback(prompt);
    res.json({ reply: replyText || generateServerTutorFallback(lastUserMsg) });
  } catch (error: any) {
    console.warn("AI Chat fallback triggered due to service load:", error?.message);
    res.json({
      reply: generateServerTutorFallback(lastUserMsg)
    });
  }
});

// AI Roleplay Conversation endpoint powered by Gemini with fallback
apiRouter.post("/ai/roleplay", async (req, res) => {
  const { scenario, conversationHistory, userMessage, userRole, aiRole } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.json({
      replyHanzi: "好的，我已经收到你的汇报了。请继续检查下一道工序。",
      replyPinyin: "Hǎo de, wǒ yǐjīng shōudào nǐ de huìbào le. Qǐng jìxù jiǎnchá xià yí dào gōngxù.",
      replyVietnamese: "Được rồi, tôi đã nhận được báo cáo của bạn. Hãy tiếp tục kiểm tra công đoạn tiếp theo nhé.",
      feedback: "Phản hồi rất tốt! Câu từ rõ ràng và đúng chuẩn giao tiếp nhà xưởng.",
      hintSuggestions: ["好的主管，我现在就去安排！", "有问题我会随时向您汇报。"]
    });
  }

  try {
    const systemPrompt = `Bạn đang tham gia bài luyện giao tiếp tiếng Trung tương tác đóng vai (Roleplay) trong xưởng may/nhà máy thực tế.
Tình huống: ${scenario?.title || "Giao tiếp trong xưởng may"}. Bối cảnh: ${scenario?.description || "Trao đổi công việc thực tế"}.
Học viên đóng vai: ${userRole || "Người Việt Nam / Công nhân / Tổ trưởng"}.
Bạn đóng vai: ${aiRole || "Người Trung Quốc / Quản lý xưởng / Chuyên gia QC"}.

Hãy phản hồi tự nhiên theo đúng vai diễn của bạn bằng tiếng Trung giản thể, sau đó trả về định dạng JSON thuần túy (không bọc markdown block phức tạp):
{
  "replyHanzi": "Câu phản hồi tiếng Trung",
  "replyPinyin": "Pinyin có dấu",
  "replyVietnamese": "Dịch nghĩa tiếng Việt",
  "feedback": "Nhận xét ngắn về câu trả lời của học viên (ngữ pháp, độ tự nhiên, cách dùng từ xưởng may)",
  "hintSuggestions": ["Gợi ý câu 1 học viên có thể trả lời tiếp", "Gợi ý câu 2"]
}`;

    const prompt = `${systemPrompt}\n\nLịch sử hội thoại: ${JSON.stringify(conversationHistory || [])}\nCâu nói mới nhất của học viên: "${userMessage}"\n\nPhản hồi JSON:`;

    const rawText = await generateContentWithFallback(prompt, { jsonMode: true });
    let resultJson;
    try {
      resultJson = JSON.parse(rawText || "{}");
    } catch {
      resultJson = {
        replyHanzi: "好的，我明白了。请继续按照工艺标准操作。",
        replyPinyin: "Hǎo de, wǒ míngbái le. Qǐng jìxù ànzhào gōngyì biāozhǔn cāozuò.",
        replyVietnamese: "Được rồi, tôi đã hiểu. Vui lòng tiếp tục thao tác theo đúng quy trình công nghệ.",
        feedback: "Phản hồi lưu loát và đúng từ vựng nghiệp vụ!",
        hintSuggestions: ["好的，谢谢组长！", "明白了，我马上处理。"]
      };
    }

    res.json(resultJson);
  } catch (error: any) {
    console.warn("AI Roleplay fallback triggered:", error?.message);
    res.json({
      replyHanzi: "好的，收到！请继续保持标准工序，有任何异常随时汇报。",
      replyPinyin: "Hǎo de, shōudào! Qǐng jìxù bǎochí biāozhǔn gōngxù, yǒu rènhé yìcháng suíshí huìbào.",
      replyVietnamese: "Được rồi, đã nhận thông tin! Hãy tiếp tục duy trì công đoạn tiêu chuẩn, có bất thường gì hãy báo ngay nhé.",
      feedback: "Bạn đã phản xạ tốt trong tình huống giao tiếp nhà xưởng.",
      hintSuggestions: ["好的主管，我马上落实！", "明白了，我会仔细检查。"]
    });
  }
});

// AI Speech & Pronunciation Evaluator endpoint powered by Gemini with robust fallback
apiRouter.post("/ai/evaluate-speech", async (req, res) => {
  const { targetHanzi, targetPinyin, recognizedText } = req.body;
  
  // Calculate local high-grade phonetic & character rubric baseline
  const localResult = evaluatePronunciationLocally(targetHanzi || "", targetPinyin || "", recognizedText || "");
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.json(localResult);
  }

  try {
    const prompt = `Bạn là Chuyên gia Khảo thí và Giáo viên Phát âm Tiếng Trung Sư phạm cấp cao.
Học viên đang thực hành bài luyện nói / phát âm:
- Câu mẫu chuẩn mục tiêu: "${targetHanzi}" (Pinyin chuẩn: "${targetPinyin}")
- Văn bản nhận diện từ giọng nói học viên: "${recognizedText}"

HƯỚNG DẪN CHẤM ĐIỂM NƯƠNG TAY & KHÍCH LỆ THEO TIÊU CHÍ SƯ PHẠM:
1. ĐỐI CHIẾU ÂM VỊ & TỪNG CHỮ:
   - Dựa trên giọng đọc nhận diện của học viên, hãy so sánh với câu mẫu chuẩn.
   - Nếu học viên đọc đúng hoặc có những âm giống/gần giống câu mẫu thì CHẤM ĐIỂM NƯƠNG TAY (cho điểm từng phần từ 50 - 89 điểm tuỳ mức độ khớp, KHÔNG ĐƯỢC CHO 0 ĐIỂM nếu họ đã nói được một số từ).
   - Nếu đọc đúng hoàn toàn từ vựng và trôi chảy -> Cho 90 - 100 điểm.
   - Nếu đọc đúng 70-80% -> Cho 75 - 88 điểm.
   - Nếu đọc đúng 40-60% -> Cho 60 - 74 điểm.
   - Nếu đọc được một số từ khóa -> Cho 40 - 59 điểm.
   - Chỉ cho dưới 30 điểm khi hoàn toàn không có âm thanh hoặc nói một câu hoàn toàn không liên quan.

2. PHÂN TÍCH TỪNG CHỮ HÁN TRONG CÂU MẪU:
   - status: "correct" (nếu học viên phát âm đúng chữ đó)
   - status: "similar" (nếu phát âm gần đúng hoặc nhầm thanh điệu)
   - status: "missed" (nếu chưa phát âm hoặc đọc sai chữ khác)

3. HƯỚNG DẪN SỬA LỖI TỪNG CHỮ PHÁT ÂM SAI:
   - Chỉ rõ từng chữ học viên đọc sai, kèm Pinyin có dấu, thanh điệu (1, 2, 3, 4) và hướng dẫn cụ thể cách đặt lưỡi, mở khẩu hình, luồng hơi (bật hơi hay không bật hơi).

Hãy trả về định dạng JSON thuần túy:
{
  "score": 85,
  "levelTier": "good",
  "levelBadge": "Rất tốt (75-89 điểm)",
  "levelDescription": "Lời giải thích ngắn gọn về cấp độ đạt được",
  "recognizedText": "${recognizedText}",
  "feedback": "Nhận xét khích lệ, chỉ rõ học viên đã nói đúng được những phần nào và cần chú ý phần nào",
  "toneTips": "Mẹo thanh điệu và cao độ",
  "criteria": {
    "accuracy": 85,
    "fluency": 80,
    "tone": 82,
    "completeness": 90
  },
  "charDetails": [
    { "char": "你", "pinyin": "nǐ", "status": "correct", "tip": "Phát âm chuẩn" }
  ],
  "troubleChars": [
    {
      "char": "厂",
      "pinyin": "chǎng",
      "tone": 3,
      "issue": "Chưa bật hơi mạnh âm ch",
      "guide": "Uốn cong đầu lưỡi chạm vòm họng, bật luồng hơi mạnh ra ngoài và hạ sâu thanh 3."
    }
  ]
}`;

    const rawText = await generateContentWithFallback(prompt, { jsonMode: true });
    const geminiResult = JSON.parse(rawText || "{}");

    const finalResult = {
      score: typeof geminiResult.score === "number" && !isNaN(geminiResult.score) ? geminiResult.score : localResult.score,
      levelTier: geminiResult.levelTier || localResult.levelTier,
      levelBadge: geminiResult.levelBadge || localResult.levelBadge,
      levelDescription: geminiResult.levelDescription || localResult.levelDescription,
      recognizedText: geminiResult.recognizedText || recognizedText || localResult.recognizedText,
      feedback: geminiResult.feedback || localResult.feedback,
      toneTips: geminiResult.toneTips || localResult.toneTips,
      criteria: geminiResult.criteria || localResult.criteria,
      charDetails: (geminiResult.charDetails && geminiResult.charDetails.length > 0) ? geminiResult.charDetails : localResult.charDetails,
      troubleChars: (geminiResult.troubleChars && geminiResult.troubleChars.length > 0) ? geminiResult.troubleChars : localResult.troubleChars
    };

    res.json(finalResult);
  } catch (error: any) {
    console.warn("Speech evaluate AI fallback to local engine:", error?.message);
    res.json(localResult);
  }
});

// AI Comprehensive 5-Skill Benchmark Diagnostic endpoint powered by Gemini with fallback
apiRouter.post("/ai/evaluate-comprehensive", async (req, res) => {
  const { scores, targetGoal } = req.body;
  
  const fallbackBenchmark = {
    overallScore: Math.round(((scores?.listening || 80) + (scores?.speaking || 75) + (scores?.reading || 85) + (scores?.writing || 70) + (scores?.grammar || 80)) / 5),
    equivalentHsk: "HSK 3 - 4",
    strengths: [
      "Khả năng nhận diện từ vựng và đọc hiểu văn bản xưởng may tốt",
      "Nắm vững các mẫu câu giao tiếp cơ bản"
    ],
    weaknesses: [
      "Cần tăng độ dứt khoát của thanh 4 trong phát âm",
      "Bút thuận các bộ thủ phức tạp cần luyện thêm trên ô Mễ"
    ],
    weeklyRoadmap: [
      { day: "Thứ 2", focus: "Nghe & Thẩm âm", task: "Luyện 10 câu khẩu lệnh nhà xưởng ở tốc độ 1.0x" },
      { day: "Thứ 3", focus: "Nói & Cao độ", task: "Đối chiếu biểu đồ ngũ độ 1-5 cho các cặp từ dễ nhầm" },
      { day: "Thứ 4", focus: "Đọc hiểu", task: "Đọc 2 bài về kiểm hàng QC & dùng bộ tra từ nhanh" },
      { day: "Thứ 5", focus: "Viết Hán tự", task: "Viết 5 chữ Hán trọng tâm trên ô Điền/Mễ tự cách" },
      { day: "Thứ 6", focus: "Ngữ pháp", task: "Lắp ghép sơ đồ cú pháp câu chữ 把 & câu so sánh 比" },
      { day: "Cuối tuần", focus: "Tổng ôn & Đánh giá", task: "Làm bài kiểm tra 5 trạm để cập nhật Radar" }
    ],
    aiTeacherAdvice: "Bạn đang có nền tảng rất vững chắc! Hãy tiếp tục duy trì thói quen nghe đối chiếu và thực hành viết bút thuận mỗi ngày."
  };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.json(fallbackBenchmark);
  }

  try {
    const prompt = `Bạn là Chuyên gia Khảo thí và Giáo viên Tiếng Trung Sư phạm cấp cao.
Dựa vào kết quả kiểm tra 5 kỹ năng của học viên:
- Nghe (Listening): ${scores?.listening ?? 80}/100
- Nói (Speaking): ${scores?.speaking ?? 75}/100
- Đọc (Reading): ${scores?.reading ?? 85}/100
- Viết (Writing): ${scores?.writing ?? 70}/100
- Ngữ pháp (Grammar): ${scores?.grammar ?? 80}/100
Mục tiêu học viên: ${targetGoal || "Giao tiếp xưởng may và đạt chuẩn HSK"}

Hãy phân tích toàn diện và trả về JSON chuẩn xác:
{
  "overallScore": 78,
  "equivalentHsk": "HSK 3",
  "strengths": ["Điểm mạnh 1", "Điểm mạnh 2"],
  "weaknesses": ["Điểm cần khắc phục 1", "Điểm cần khắc phục 2"],
  "weeklyRoadmap": [
    { "day": "Thứ 2", "focus": "Trọng tâm", "task": "Nhiệm vụ cụ thể" },
    { "day": "Thứ 3", "focus": "Trọng tâm", "task": "Nhiệm vụ cụ thể" },
    { "day": "Thứ 4", "focus": "Trọng tâm", "task": "Nhiệm vụ cụ thể" },
    { "day": "Thứ 5", "focus": "Trọng tâm", "task": "Nhiệm vụ cụ thể" },
    { "day": "Thứ 6", "focus": "Trọng tâm", "task": "Nhiệm vụ cụ thể" },
    { "day": "Cuối tuần", "focus": "Trọng tâm", "task": "Nhiệm vụ cụ thể" }
  ],
  "aiTeacherAdvice": "Lời khuyên sư phạm truyền cảm hứng và định hướng cụ thể"
}`;

    const rawText = await generateContentWithFallback(prompt, { jsonMode: true });
    const result = JSON.parse(rawText || "{}");
    res.json(result);
  } catch (error: any) {
    console.warn("Comprehensive evaluation AI fallback:", error?.message);
    res.json(fallbackBenchmark);
  }
});

// ==========================================
// CC-CEDICT Vietnamese Dictionary API Routes
// ==========================================

// Ensure dictionary is initialized safely
try {
  initCedictDatabase();
} catch (err) {
  console.warn("Initial CC-CEDICT preload deferred:", err);
}

// 1. Search Dictionary (Simplified, Traditional, Pinyin, Vietnamese, English)
apiRouter.get("/dictionary/search", async (req, res) => {
  try {
    await ensureCedictLoaded(req);
    const q = (req.query.q as string) || "";
    const limit = parseInt(req.query.limit as string, 10) || 25;
    const page = parseInt(req.query.page as string, 10) || 1;
    const filter = (req.query.filter as "all" | "hsk" | "garment") || "all";

    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
    const result = searchCedict(q, { limit, page, filter });
    res.json(result);
  } catch (error: any) {
    console.error("Dictionary search error:", error);
    res.status(500).json({ error: "Lỗi tra cứu từ điển", message: error?.message });
  }
});

// 2. Define Word with Character Breakdown
apiRouter.get("/dictionary/define", async (req, res) => {
  try {
    await ensureCedictLoaded(req);
    const word = (req.query.word as string) || "";
    if (!word) {
      return res.status(400).json({ error: "Tham số word không được để trống" });
    }
    const result = defineWord(word);
    res.json(result);
  } catch (error: any) {
    console.error("Dictionary define error:", error);
    res.status(500).json({ error: "Lỗi định nghĩa từ", message: error?.message });
  }
});

// 3. Sentence Segmentation & Analysis (Phân tích câu tiếng Trung tách từ)
apiRouter.post("/dictionary/analyze-sentence", async (req, res) => {
  try {
    await ensureCedictLoaded(req);
    const { sentence } = req.body;
    if (!sentence || typeof sentence !== "string") {
      return res.status(400).json({ error: "Cần cung cấp chuỗi câu tiếng Trung cần phân tích" });
    }
    const tokens = analyzeChineseSentence(sentence);
    res.json({ tokens });
  } catch (error: any) {
    console.error("Sentence analysis error:", error);
    res.status(500).json({ error: "Lỗi phân tích câu", message: error?.message });
  }
});

// 4. Random Word (Từ ngẫu nhiên / Từ vựng mỗi ngày)
apiRouter.get("/dictionary/random", async (req, res) => {
  try {
    await ensureCedictLoaded(req);
    const word = getRandomWord();
    res.json({ word });
  } catch (error: any) {
    console.error("Random word error:", error);
    res.status(500).json({ error: "Lỗi lấy từ ngẫu nhiên", message: error?.message });
  }
});

// 5. Dictionary Statistics & Metadata
apiRouter.get("/dictionary/stats", async (req, res) => {
  try {
    await ensureCedictLoaded(req);
    const stats = getDictionaryStats();
    res.json(stats);
  } catch (error: any) {
    console.error("Dictionary stats error:", error);
    res.status(500).json({ error: "Lỗi thông tin thống kê từ điển", message: error?.message });
  }
});

// 6. Batch Lookup for Saved / Favorite Words
apiRouter.post("/dictionary/batch", async (req, res) => {
  try {
    await ensureCedictLoaded(req);
    const { words } = req.body;
    if (!Array.isArray(words)) {
      return res.status(400).json({ error: "Tham số words phải là một mảng" });
    }
    const entries = getEntriesByWords(words);
    res.json({ entries });
  } catch (error: any) {
    console.error("Batch dictionary error:", error);
    res.status(500).json({ error: "Lỗi tra cứu hàng loạt", message: error?.message });
  }
});

// Mount router on both /api (standard local/prod path) AND / (for serverless environments where /api is stripped)
app.use("/api", apiRouter);
app.use("/", apiRouter);

export default app;
