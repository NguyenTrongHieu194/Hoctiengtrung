import { analyzeChineseSentence, ensureCedictLoaded } from "../../server/cedictService.ts";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    await ensureCedictLoaded(req);
    const sentence = req.body?.sentence || req.query?.sentence;
    if (!sentence || typeof sentence !== "string") {
      return res.status(400).json({ error: "Cần cung cấp chuỗi câu tiếng Trung cần phân tích" });
    }
    const tokens = analyzeChineseSentence(sentence);
    return res.status(200).json({ tokens });
  } catch (error: any) {
    console.error("Sentence analysis error:", error);
    return res.status(500).json({ error: "Lỗi phân tích câu", message: error?.message });
  }
}
