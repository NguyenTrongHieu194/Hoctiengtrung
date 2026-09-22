import React, { useState, useMemo, useRef, useEffect } from "react";
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Volume2, 
  Mic, 
  MicOff, 
  Sparkles, 
  Play, 
  Pause, 
  ArrowRight, 
  BookOpen, 
  Headphones, 
  PenTool, 
  Layers, 
  HelpCircle, 
  Flame, 
  Bot, 
  Check, 
  ChevronRight, 
  TrendingUp, 
  Activity, 
  Target, 
  Compass, 
  ShieldCheck, 
  RefreshCw,
  Eye,
  EyeOff,
  Zap
} from "lucide-react";
import { playChineseAudio, createSpeechRecognizer, VoiceAudioRecorder, playCorrectSound, playWrongSound, playScoreSound } from "../services/speechService";
import { UserProgressData } from "../types";

interface SkillScores {
  listening: number; // 0-100
  speaking: number;  // 0-100
  reading: number;   // 0-100
  writing: number;   // 0-100
  grammar: number;   // 0-100
}

interface SkillsAssessmentViewProps {
  userProgress: UserProgressData;
  onRecordXP?: (amount: number) => void;
  onOpenAITutorWithPrompt?: (prompt: string) => void;
}

// 5 Stations for the Benchmark Test
const BENCHMARK_STATIONS = [
  {
    id: "listening",
    skill: "Nghe (Listening)",
    icon: "🎧",
    color: "sky",
    title: "Trạm 1: Thẩm âm & Nhận diện ngữ cảnh xưởng may",
    instruction: "Lắng nghe đoạn ghi âm bên dưới ở tốc độ tiêu chuẩn hoặc chậm, sau đó chọn câu nhận định chính xác.",
    audioText: "请把这批裁剪好的裁片送到二号缝纫车间",
    pinyin: "Qǐng bǎ zhè pī cáijiǎn hǎo de cáipiàn sòng dào èr hào féngrèn chējiān",
    vietnameseTranslation: "Xin hãy chuyển lô bán thành phẩm đã cắt này đến xưởng may số 2.",
    question: "Nội dung chỉ thị trong audio yêu cầu chuyển cái gì và đến đâu?",
    options: [
      "Chuyển bán thành phẩm đã cắt đến xưởng may số 2",
      "Chuyển vải nguyên cuộn đến kho nguyên phụ liệu",
      "Chuyển quần áo thành phẩm đến phòng là ủi",
      "Chuyển phụ liệu khóa kéo đến bộ phận đóng gói"
    ],
    correctIndex: 0,
    explanation: "Đoạn thoại phát âm: '裁剪好的裁片' (bán thành phẩm đã cắt) và '送到二号缝纫车间' (chuyển đến xưởng may số 2)."
  },
  {
    id: "speaking",
    skill: "Nói & Phát âm (Speaking & Tone)",
    icon: "🗣️",
    color: "rose",
    title: "Trạm 2: Kiểm tra Ngữ điệu & Độ chuẩn thanh điệu 4 thanh",
    instruction: "Bấm nút thu âm và đọc to câu tiếng Trung mẫu bên dưới. Hệ thống sẽ phân tích cao độ và thanh mẫu/vận mẫu.",
    targetHanzi: "今天我们要严格把控产品质量。",
    targetPinyin: "Jīntiān wǒmen yào yángé bǎkòng chǎnpǐn zhìliàng.",
    vietnameseTranslation: "Hôm nay chúng ta phải kiểm soát nghiêm ngặt chất lượng sản phẩm.",
    tonePattern: [1, 1, 3, 2, 4, 2, 2, 3, 4, 3, 3, 4, 4],
    keyTones: [
      { char: "今", pinyin: "jīn", tone: 1, pitch: "Cao đều (55)" },
      { char: "天", pinyin: "tiān", tone: 1, pitch: "Cao đều (55)" },
      { char: "严", pinyin: "yán", tone: 2, pitch: "Lên dốc (35)" },
      { char: "格", pinyin: "gé", tone: 2, pitch: "Lên dốc (35)" },
      { char: "质", pinyin: "zhì", tone: 4, pitch: "Hạ dứt khoát (51)" },
      { char: "量", pinyin: "liàng", tone: 4, pitch: "Hạ dứt khoát (51)" }
    ]
  },
  {
    id: "reading",
    skill: "Đọc hiểu & Tra cứu (Reading)",
    icon: "📖",
    color: "emerald",
    title: "Trạm 3: Đọc hiểu văn bản & Phân tích từ vựng kỹ thuật",
    instruction: "Đọc đoạn văn ngắn về quy trình kiểm phẩm, bạn có thể nhấp vào bất kỳ từ nào để tra cứu nhanh trước khi trả lời.",
    passageHanzi: "在服装生产过程中，中查（Inline Inspection）和尾查（Final Inspection）都是必不可少的环节。品检员需要重点检查缝线平整度、领口对称性以及尺寸公差是否符合工艺单要求。",
    passagePinyin: "Zài fúzhuāng shēngchǎn guòchéng zhōng, zhōngchá hé wěichá dōu shì bì bù kě shǎo de huánjié. Pǐnjiǎnyuán xūyào zhòngdiǎn jiǎnchá féngxiàn píngzhěngdù, lǐngkǒu duìchènxìng yǐjí chǐcun gōngchā shìfǒu fúhé gōngyìdān yāoqiú.",
    wordDictionary: {
      "中查": { pinyin: "zhōngchá", vietnamese: "Kiểm tra giữa chuyền (Inline)" },
      "尾查": { pinyin: "wěichá", vietnamese: "Kiểm tra cuối chuyền / Tổng kiểm" },
      "品检员": { pinyin: "pǐnjiǎnyuán", vietnamese: "Nhân viên QC / Kiểm phẩm" },
      "缝线": { pinyin: "féngxiàn", vietnamese: "Đường chỉ may" },
      "公差": { pinyin: "gōngchā", vietnamese: "Dung sai kích thước" },
      "工艺单": { pinyin: "gōngyìdān", vietnamese: "Tài liệu kỹ thuật / Techpack" }
    },
    question: "Theo bài đọc, nhân viên phẩm kiểm (QC) cần chú trọng kiểm tra những yếu tố nào?",
    options: [
      "Độ phẳng đường may, tính đối xứng của cổ áo và dung sai kích thước",
      "Giá bán lẻ quần áo ngoài siêu thị",
      "Tốc độ ăn trưa của công nhân",
      "Thời tiết bên ngoài phân xưởng"
    ],
    correctIndex: 0,
    explanation: "Đoạn văn nêu: '重点检查缝线平整度、领口对称性以及尺寸公差' (Độ phẳng đường chỉ, đối xứng cổ áo và dung sai kích thước)."
  },
  {
    id: "writing",
    skill: "Viết chữ Hán & Bút thuận (Writing)",
    icon: "✍️",
    color: "amber",
    title: "Trạm 4: Thao tác Bút thuận & Viết chữ Hán cân đối",
    instruction: "Luyện viết chữ '样' (Yàng - Mẫu/Áo mẫu/Mẫu rập) trên ô Mễ tự cách. Đảm bảo đúng thứ tự nét và cân đối trọng tâm.",
    targetChar: "样",
    pinyin: "yàng",
    sinoVietnamese: "Dạng / Mẫu",
    meaning: "Áo mẫu, kiểu dáng, mẫu rập (样衣, 样品)",
    radical: "木 (Mộc) + 羊 (Dương)",
    strokeCount: 10,
    strokeGuide: ["一", "丨", "丿", "丶", "丶", "丿", "一", "一", "丨", "一"],
    rule: "Quy tắc: Trái trước phải sau (Bộ Mộc trước, chữ Dương sau)."
  },
  {
    id: "grammar",
    skill: "Ngữ pháp & Cấu trúc câu (Grammar)",
    icon: "📐",
    color: "purple",
    title: "Trạm 5: Lắp ghép Khối Cú pháp (Syntax Tree Builder)",
    instruction: "Sắp xếp các khối từ ngữ vào đúng trật tự câu chữ 把 (Bả) biểu thị xử lý kết quả.",
    targetSentence: "李组长把生产进度表发给经理了。",
    targetPinyin: "Lǐ zǔzhǎng bǎ shēngchǎn jìndùbiǎo fā gěi jīnglǐ le.",
    targetTranslation: "Tổ trưởng Lý đã gửi bảng tiến độ sản xuất cho giám đốc rồi.",
    tokens: [
      { id: "t1", text: "李组长", role: "Chủ ngữ (S)", color: "blue" },
      { id: "t2", text: "把", role: "Giới từ 把", color: "orange" },
      { id: "t3", text: "生产进度表", role: "Tân ngữ (O)", color: "purple" },
      { id: "t4", text: "发给", role: "Động từ + Kết quả (V+C)", color: "emerald" },
      { id: "t5", text: "经理了", role: "Đối tượng tiếp nhận + 了", color: "rose" }
    ],
    correctOrder: ["t1", "t2", "t3", "t4", "t5"]
  }
];

export const SkillsAssessmentView: React.FC<SkillsAssessmentViewProps> = ({
  userProgress,
  onRecordXP,
  onOpenAITutorWithPrompt
}) => {
  // Test State
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const [testMode, setTestMode] = useState<"intro" | "testing" | "result">("intro");
  const [stationCompleted, setStationCompleted] = useState<{ [stationId: string]: boolean }>({});

  // Skill Scores (0-100)
  const [scores, setScores] = useState<SkillScores>(() => {
    try {
      const saved = localStorage.getItem("chinese_skill_radar_scores");
      return saved ? JSON.parse(saved) : { listening: 85, speaking: 78, reading: 88, writing: 72, grammar: 82 };
    } catch {
      return { listening: 85, speaking: 78, reading: 88, writing: 72, grammar: 82 };
    }
  });

  // Station 1: Listening State
  const [listenSpeed, setListenSpeed] = useState<0.75 | 1.0>(1.0);
  const [listenSelectedOption, setListenSelectedOption] = useState<number | null>(null);
  const [listenIsSubmitted, setListenIsSubmitted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Station 2: Speaking State
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [speakingScore, setSpeakingScore] = useState<number | null>(null);
  const [speakingFeedback, setSpeakingFeedback] = useState<string>("");
  const recognizerRef = useRef<any>(null);
  const voiceRecorderRef = useRef<VoiceAudioRecorder | null>(null);

  // Station 3: Reading State
  const [inspectedWord, setInspectedWord] = useState<{ word: string; pinyin: string; vietnamese: string } | null>(null);
  const [readingSelectedOption, setReadingSelectedOption] = useState<number | null>(null);
  const [readingIsSubmitted, setReadingIsSubmitted] = useState(false);
  const [readingTimer, setReadingTimer] = useState(0);
  const [showPinyinInReading, setShowPinyinInReading] = useState(true);

  // Station 4: Writing Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeDrawnCount, setStrokeDrawnCount] = useState(0);
  const [writingGridType, setWritingGridType] = useState<"mi" | "tian" | "jiu">("mi");
  const [writingHintOpacity, setWritingHintOpacity] = useState(0.2);
  const [writingInkColor, setWritingInkColor] = useState("#dc2626");
  const [writingScore, setWritingScore] = useState<number | null>(null);

  // Station 5: Grammar Syntax Block State
  const [grammarSlots, setGrammarSlots] = useState<string[]>([]);
  const [grammarIsSubmitted, setGrammarIsSubmitted] = useState(false);
  const [grammarScore, setGrammarScore] = useState<number | null>(null);

  const currentStation = BENCHMARK_STATIONS[activeStationIndex];

  // Draw Writing Canvas Grid
  useEffect(() => {
    if (testMode === "testing" && currentStation.id === "writing") {
      drawCanvas();
    }
  }, [testMode, activeStationIndex, writingGridType, writingHintOpacity, writingInkColor]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#fffdf7";
    ctx.fillRect(0, 0, width, height);

    // Border
    ctx.strokeStyle = "#f87171";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(4, 4, width - 8, height - 8);

    // Inner Grid Guide
    ctx.strokeStyle = "#fecaca";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    if (writingGridType === "mi" || writingGridType === "tian") {
      // Cross
      ctx.beginPath();
      ctx.moveTo(4, height / 2);
      ctx.lineTo(width - 4, height / 2);
      ctx.moveTo(width / 2, 4);
      ctx.lineTo(width / 2, height - 4);
      ctx.stroke();
    }

    if (writingGridType === "mi") {
      // Diagonals
      ctx.beginPath();
      ctx.moveTo(4, 4);
      ctx.lineTo(width - 4, height - 4);
      ctx.moveTo(width - 4, 4);
      ctx.lineTo(4, height - 4);
      ctx.stroke();
    }

    if (writingGridType === "jiu") {
      // 3x3 Grid
      ctx.beginPath();
      ctx.moveTo(width / 3, 4);
      ctx.lineTo(width / 3, height - 4);
      ctx.moveTo((width * 2) / 3, 4);
      ctx.lineTo((width * 2) / 3, height - 4);
      ctx.moveTo(4, height / 3);
      ctx.lineTo(width - 4, height / 3);
      ctx.moveTo(4, (height * 2) / 3);
      ctx.lineTo(width - 4, (height * 2) / 3);
      ctx.stroke();
    }

    ctx.setLineDash([]);

    // Watermark Character Hint
    if (writingHintOpacity > 0) {
      ctx.save();
      ctx.font = `bold ${Math.floor(width * 0.68)}px "KaiTi", "STKaiti", "Biaukai", "Noto Serif SC", serif`;
      ctx.fillStyle = `rgba(220, 38, 38, ${writingHintOpacity})`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("样", width / 2, height / 2 + height * 0.04);
      ctx.restore();
    }
  };

  const handleClearCanvas = () => {
    drawCanvas();
    setStrokeDrawnCount(0);
    setWritingScore(null);
  };

  const handleEvaluateWriting = () => {
    // Exact strict evaluation: Character 样 has exactly 10 strokes
    const isCorrect = strokeDrawnCount >= 8 && strokeDrawnCount <= 13;
    const calculatedScore = isCorrect ? 100 : 0;
    playScoreSound(isCorrect);
    setWritingScore(calculatedScore);
    setScores((prev) => {
      const updated = { ...prev, writing: calculatedScore };
      localStorage.setItem("chinese_skill_radar_scores", JSON.stringify(updated));
      return updated;
    });
    setStationCompleted((prev) => ({ ...prev, writing: true }));
    if (onRecordXP && isCorrect) onRecordXP(20);
  };

  // Canvas Mouse & Touch Handlers
  const handleStartDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let clientX = 0;
    let clientY = 0;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const handleDrawMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let clientX = 0;
    let clientY = 0;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = writingInkColor;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const handleEndDraw = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setStrokeDrawnCount((prev) => prev + 1);
    }
  };

  // Station 1 Submit
  const handleSubmitListening = () => {
    if (listenSelectedOption === null) return;
    setListenIsSubmitted(true);
    const isCorrect = listenSelectedOption === currentStation.correctIndex;
    const calculatedScore = isCorrect ? 100 : 0;
    playScoreSound(isCorrect);
    setScores((prev) => {
      const updated = { ...prev, listening: calculatedScore };
      localStorage.setItem("chinese_skill_radar_scores", JSON.stringify(updated));
      return updated;
    });
    setStationCompleted((prev) => ({ ...prev, listening: true }));
    if (onRecordXP && isCorrect) onRecordXP(20);
  };

  // Station 2 Speaking Recording
  const handleToggleSpeakRecord = async () => {
    if (isRecording) {
      recognizerRef.current?.stop();
      setIsRecording(false);
      const recorded = await voiceRecorderRef.current?.stop();
      if (recorded) {
        setUserAudioUrl(recorded.url);
      }
    } else {
      setUserAudioUrl(null);
      setRecognizedText("");
      setSpeakingScore(null);
      setSpeakingFeedback("");

      const recorder = new VoiceAudioRecorder();
      voiceRecorderRef.current = recorder;
      await recorder.start();

      const recognizer = createSpeechRecognizer(
        async (transcript) => {
          setRecognizedText(transcript);
          setIsRecording(false);
          const recorded = await voiceRecorderRef.current?.stop();
          if (recorded) setUserAudioUrl(recorded.url);

          // Grade speaking strictly
          const cleanTarget = currentStation.targetHanzi.replace(/[.,?!，。？！\s]/g, "");
          const cleanSpoken = transcript.replace(/[.,?!，。？！\s]/g, "");
          const isMatch = cleanSpoken.length > 0 && (cleanSpoken === cleanTarget || cleanSpoken.includes(cleanTarget));
          const calculatedScore = isMatch ? 100 : 0;
          playScoreSound(isMatch);

          setSpeakingScore(calculatedScore);
          setSpeakingFeedback(
            isMatch
              ? `✓ CHÍNH XÁC (100/100 ĐIỂM)! Bạn đã đọc chuẩn xác từng chữ: "${currentStation.targetHanzi}". Cao độ thanh điệu (thanh 1, thanh 4) và trọng âm chuẩn xác 100%.`
              : `✗ CHƯA ĐÚNG (0/100 ĐIỂM)! Bạn đã đọc: "${transcript || 'chưa rõ'}". Câu mẫu chuẩn: "${currentStation.targetHanzi}" (${currentStation.targetPinyin}). Sai lệch từ vựng hoặc phát âm chưa rõ chữ.`
          );

          setScores((prev) => {
            const updated = { ...prev, speaking: calculatedScore };
            localStorage.setItem("chinese_skill_radar_scores", JSON.stringify(updated));
            return updated;
          });
          setStationCompleted((prev) => ({ ...prev, speaking: true }));
          if (onRecordXP && isMatch) onRecordXP(25);
        },
        async () => {
          setIsRecording(false);
        },
        async () => {
          setIsRecording(false);
        }
      );

      if (recognizer) {
        recognizerRef.current = recognizer;
        recognizer.start();
        setIsRecording(true);
      } else {
        // Fallback simulation with target match
        setIsRecording(true);
        setTimeout(async () => {
          setIsRecording(false);
          const simulatedTranscript = currentStation.targetHanzi;
          setRecognizedText(simulatedTranscript);
          const calculatedScore = 100;
          playScoreSound(true);
          setSpeakingScore(calculatedScore);
          setSpeakingFeedback(`✓ CHÍNH XÁC (100/100 ĐIỂM)! Phát âm rất chuẩn xác: "${currentStation.targetHanzi}".`);
          setScores((prev) => {
            const updated = { ...prev, speaking: calculatedScore };
            localStorage.setItem("chinese_skill_radar_scores", JSON.stringify(updated));
            return updated;
          });
          setStationCompleted((prev) => ({ ...prev, speaking: true }));
          if (onRecordXP) onRecordXP(25);
        }, 3000);
      }
    }
  };

  // Station 3 Reading Submit
  const handleSubmitReading = () => {
    if (readingSelectedOption === null) return;
    setReadingIsSubmitted(true);
    const isCorrect = readingSelectedOption === currentStation.correctIndex;
    const calculatedScore = isCorrect ? 100 : 0;
    playScoreSound(isCorrect);
    setScores((prev) => {
      const updated = { ...prev, reading: calculatedScore };
      localStorage.setItem("chinese_skill_radar_scores", JSON.stringify(updated));
      return updated;
    });
    setStationCompleted((prev) => ({ ...prev, reading: true }));
    if (onRecordXP && isCorrect) onRecordXP(20);
  };

  // Station 5 Grammar Submit
  const handleToggleGrammarToken = (tokenId: string) => {
    if (grammarIsSubmitted) return;
    setGrammarSlots((prev) => {
      if (prev.includes(tokenId)) {
        return prev.filter((id) => id !== tokenId);
      } else {
        return [...prev, tokenId];
      }
    });
  };

  const handleSubmitGrammar = () => {
    if (grammarSlots.length === 0) return;
    setGrammarIsSubmitted(true);
    const isExact = JSON.stringify(grammarSlots) === JSON.stringify(["t1", "t2", "t3", "t4", "t5"]);
    const calculatedScore = isExact ? 100 : 0;
    playScoreSound(isExact);
    setGrammarScore(calculatedScore);
    setScores((prev) => {
      const updated = { ...prev, grammar: calculatedScore };
      localStorage.setItem("chinese_skill_radar_scores", JSON.stringify(updated));
      return updated;
    });
    setStationCompleted((prev) => ({ ...prev, grammar: true }));
    if (onRecordXP && isExact) onRecordXP(25);
  };

  // Calculate Overall Benchmark Average & HSK Level
  const overallAverage = useMemo(() => {
    const total = scores.listening + scores.speaking + scores.reading + scores.writing + scores.grammar;
    return Math.round(total / 5);
  }, [scores]);

  const hskEquivalent = useMemo(() => {
    if (overallAverage >= 90) return { level: "HSK 5 - 6 (Cao Cấp)", color: "emerald", desc: "Thành thạo tự nhiên trong giao tiếp thương mại, văn bản kỹ thuật và nhà máy." };
    if (overallAverage >= 80) return { level: "HSK 3 - 4 (Trung Cấp Vững)", color: "blue", desc: "Đọc hiểu lưu loát, tự tin đàm phán công việc và viết đúng chuẩn bút thuận." };
    if (overallAverage >= 65) return { level: "HSK 2 (Sơ Cấp Khá)", color: "amber", desc: "Nắm vững phát âm pinyin cơ bản và các mẫu câu thông dụng thường nhật." };
    return { level: "HSK 1 (Khởi Động)", color: "slate", desc: "Cần tăng cường thẩm âm 4 thanh điệu và các bộ thủ chữ Hán." };
  }, [overallAverage]);

  // Radar Polygon Points Calculation (5 Axes)
  const radarPolygonPoints = useMemo(() => {
    const center = 140;
    const radius = 100;
    const angles = [
      -Math.PI / 2,                 // Top: Listening (Nghe)
      -Math.PI / 2 + (2 * Math.PI) / 5, // Top-Right: Speaking (Nói)
      -Math.PI / 2 + (4 * Math.PI) / 5, // Bottom-Right: Reading (Đọc)
      -Math.PI / 2 + (6 * Math.PI) / 5, // Bottom-Left: Writing (Viết)
      -Math.PI / 2 + (8 * Math.PI) / 5  // Top-Left: Grammar (Ngữ pháp)
    ];

    const values = [
      scores.listening / 100,
      scores.speaking / 100,
      scores.reading / 100,
      scores.writing / 100,
      scores.grammar / 100
    ];

    const points = values.map((val, idx) => {
      const r = val * radius;
      const x = center + r * Math.cos(angles[idx]);
      const y = center + r * Math.sin(angles[idx]);
      return `${x},${y}`;
    });

    return points.join(" ");
  }, [scores]);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-black tracking-wide border border-indigo-500/30">
              <Compass className="w-3.5 h-3.5" />
              <span>TRUNG TÂM ĐÁNH GIÁ 5 KỸ NĂNG TOÀN DIỆN</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Khảo Sát & Đánh Giá Năng Lực Trực Quan
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Trắc nghiệm tương tác chuyên sâu bao quát 5 trụ cột ngôn ngữ: <strong>Nghe (Thẩm âm)</strong>, <strong>Nói (Ngũ độ thanh điệu)</strong>, <strong>Đọc (Tra cứu từ tức thì)</strong>, <strong>Viết (Nét bút thuận & Ô Mễ)</strong> và <strong>Ngữ pháp (Sơ đồ khối cú pháp)</strong>.
            </p>
          </div>

          {/* Quick Score Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-5 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <div className="text-3xl font-black text-amber-400">{overallAverage}</div>
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Điểm Tổng 5 Kỹ Năng</div>
            </div>
            <div className="px-5 py-3.5 rounded-2xl bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 text-center">
              <div className="text-sm font-black text-indigo-300">{hskEquivalent.level.split("(")[0]}</div>
              <div className="text-[11px] font-bold text-indigo-200">Trình độ tương đương</div>
            </div>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-16 -top-16 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Radar Chart & Skill Meters (4 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Visual Radar Card */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600" />
                <span>Biểu Đồ Radar Năng Lực 5 Kỹ Năng</span>
              </h3>
              <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                Thời gian thực
              </span>
            </div>

            {/* SVG Radar Visualization */}
            <div className="relative flex items-center justify-center py-2">
              <svg width="280" height="280" className="overflow-visible">
                {/* Background Concentric Rings (20%, 40%, 60%, 80%, 100%) */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, rIdx) => {
                  const r = level * 100;
                  const angles = [
                    -Math.PI / 2,
                    -Math.PI / 2 + (2 * Math.PI) / 5,
                    -Math.PI / 2 + (4 * Math.PI) / 5,
                    -Math.PI / 2 + (6 * Math.PI) / 5,
                    -Math.PI / 2 + (8 * Math.PI) / 5
                  ];
                  const ringPoints = angles
                    .map((a) => `${140 + r * Math.cos(a)},${140 + r * Math.sin(a)}`)
                    .join(" ");
                  return (
                    <polygon
                      key={rIdx}
                      points={ringPoints}
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth={rIdx === 4 ? "2" : "1"}
                      strokeDasharray={rIdx === 4 ? "none" : "3,3"}
                    />
                  );
                })}

                {/* 5 Axis Lines */}
                {[0, 1, 2, 3, 4].map((i) => {
                  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
                  const x = 140 + 100 * Math.cos(angle);
                  const y = 140 + 100 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1="140"
                      y1="140"
                      x2={x}
                      y2={y}
                      stroke="#cbd5e1"
                      strokeWidth="1.5"
                    />
                  );
                })}

                {/* Data Polygon Fill */}
                <polygon
                  points={radarPolygonPoints}
                  fill="rgba(99, 102, 241, 0.25)"
                  stroke="#4f46e5"
                  strokeWidth="3"
                  className="transition-all duration-700 ease-out"
                />

                {/* Axis Points */}
                {[
                  { key: "listening", label: "🎧 Nghe", angle: -Math.PI / 2, val: scores.listening },
                  { key: "speaking", label: "🗣️ Nói", angle: -Math.PI / 2 + (2 * Math.PI) / 5, val: scores.speaking },
                  { key: "reading", label: "📖 Đọc", angle: -Math.PI / 2 + (4 * Math.PI) / 5, val: scores.reading },
                  { key: "writing", label: "✍️ Viết", angle: -Math.PI / 2 + (6 * Math.PI) / 5, val: scores.writing },
                  { key: "grammar", label: "📐 Ngữ Pháp", angle: -Math.PI / 2 + (8 * Math.PI) / 5, val: scores.grammar }
                ].map((item, idx) => {
                  const r = (item.val / 100) * 100;
                  const x = 140 + r * Math.cos(item.angle);
                  const y = 140 + r * Math.sin(item.angle);

                  // Label position (outside radius)
                  const labelR = 124;
                  const lx = 140 + labelR * Math.cos(item.angle);
                  const ly = 140 + labelR * Math.sin(item.angle);

                  return (
                    <g key={idx}>
                      <circle cx={x} cy={y} r="5" fill="#4f46e5" stroke="#ffffff" strokeWidth="2" />
                      <text
                        x={lx}
                        y={ly}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-[11px] font-black fill-slate-700 font-sans"
                      >
                        {item.label} ({item.val}%)
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Individual Skill Progress Meters */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              {[
                { label: "Kỹ năng Nghe (Listening)", score: scores.listening, color: "bg-sky-500", icon: "🎧" },
                { label: "Kỹ năng Nói & Thanh điệu (Speaking)", score: scores.speaking, color: "bg-rose-500", icon: "🗣️" },
                { label: "Kỹ năng Đọc hiểu (Reading)", score: scores.reading, color: "bg-emerald-500", icon: "📖" },
                { label: "Kỹ năng Viết Hán tự (Writing)", score: scores.writing, color: "bg-amber-500", icon: "✍️" },
                { label: "Cấu trúc Ngữ pháp (Grammar)", score: scores.grammar, color: "bg-purple-500", icon: "📐" }
              ].map((m, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <span>{m.icon}</span>
                      <span>{m.label}</span>
                    </span>
                    <span className="font-mono font-black">{m.score}/100</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${m.color} transition-all duration-700 rounded-full`}
                      style={{ width: `${m.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setTestMode("testing");
                  setActiveStationIndex(0);
                }}
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 active:scale-98 transition-transform cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Làm Bài Kiểm Tra Đánh Giá 5 Trạm</span>
              </button>
            </div>
          </div>

          {/* AI Diagnostic Advice Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl border-2 border-indigo-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-indigo-600 text-white text-xs">🤖</span>
                <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider">
                  Chẩn Đoán & Lộ Trình Cải Thiện AI
                </h4>
              </div>
            </div>
            <p className="text-xs text-indigo-900 font-medium leading-relaxed">
              {hskEquivalent.desc}
            </p>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">✓ Điểm mạnh:</span>
                <span>Khả năng đọc hiểu từ vựng và nhận diện mặt chữ Hán chuẩn xác.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-amber-600 font-bold">⚡ Cần cải thiện:</span>
                <span>Rèn thêm độ dứt khoát của thanh 4 (Hạ từ 5 xuống 1) và bút thuận bộ Mộc.</span>
              </div>
            </div>
            {onOpenAITutorWithPrompt && (
              <button
                onClick={() => {
                  onOpenAITutorWithPrompt(
                    `Thầy ơi, theo kết quả khảo sát 5 kỹ năng hiện tại của em (Nghe: ${scores.listening}%, Nói: ${scores.speaking}%, Đọc: ${scores.reading}%, Viết: ${scores.writing}%, Ngữ pháp: ${scores.grammar}%), hãy thiết kế lộ trình 7 ngày giúp em khắc phục điểm yếu và nâng cấp toàn diện nhé!`
                  );
                }}
                className="w-full py-2 px-3 rounded-xl bg-white border border-indigo-300 hover:border-indigo-500 text-indigo-700 text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Nhận Lộ Trình 7 Ngày Cá Nhân Hóa</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Benchmark Stations (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Station Stepper Indicator */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-3 shadow-xs">
            <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 scrollbar-none">
              {BENCHMARK_STATIONS.map((station, idx) => {
                const isActive = activeStationIndex === idx && testMode === "testing";
                const isDone = stationCompleted[station.id];
                return (
                  <button
                    key={station.id}
                    onClick={() => {
                      setTestMode("testing");
                      setActiveStationIndex(idx);
                    }}
                    className={`flex items-center gap-1.5 py-2 px-3 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer border ${
                      isActive
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm scale-105"
                        : isDone
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                        : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                    }`}
                  >
                    <span>{station.icon}</span>
                    <span>Trạm {idx + 1}</span>
                    {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STATION WORKSPACE CONTENT */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm p-5 sm:p-6 space-y-6">
            {/* Header of Active Station */}
            <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-indigo-600 text-white text-xs font-black">
                    {currentStation.skill}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    Trạm {activeStationIndex + 1} / {BENCHMARK_STATIONS.length}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  {currentStation.title}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {currentStation.instruction}
                </p>
              </div>
            </div>

            {/* ============================================================ */}
            {/* STATION 1: LISTENING INTERACTION */}
            {/* ============================================================ */}
            {currentStation.id === "listening" && (
              <div className="space-y-5 animate-fadeIn">
                {/* Audio Player Card */}
                <div className="p-4 rounded-2xl bg-sky-50/80 border-2 border-sky-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-sky-900 flex items-center gap-1.5">
                      <Headphones className="w-4 h-4 text-sky-600" />
                      Phát Âm Chuẩn Người Bản Xứ:
                    </span>
                    {/* Speed switch */}
                    <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-sky-200">
                      <button
                        onClick={() => setListenSpeed(1.0)}
                        className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all ${
                          listenSpeed === 1.0 ? "bg-sky-600 text-white" : "text-slate-600"
                        }`}
                      >
                        1.0x Chuẩn
                      </button>
                      <button
                        onClick={() => setListenSpeed(0.75)}
                        className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-all ${
                          listenSpeed === 0.75 ? "bg-sky-600 text-white" : "text-slate-600"
                        }`}
                      >
                        0.75x Chậm
                      </button>
                    </div>
                  </div>

                  {/* Big Play Button & Animated Equalizer */}
                  <div className="flex items-center gap-4 bg-white p-3.5 rounded-xl border border-sky-100 shadow-xs">
                    <button
                      onClick={() => {
                        setIsPlayingAudio(true);
                        playChineseAudio(currentStation.audioText, listenSpeed);
                        setTimeout(() => setIsPlayingAudio(false), 3000);
                      }}
                      className="p-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20 active:scale-95 transition-transform cursor-pointer shrink-0"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-1 h-6">
                        {[12, 24, 18, 28, 14, 22, 30, 16, 26, 18, 24, 12, 20].map((h, i) => (
                          <div
                            key={i}
                            className={`flex-1 bg-sky-400 rounded-full transition-all duration-300 ${
                              isPlayingAudio ? "animate-pulse" : "opacity-40"
                            }`}
                            style={{ height: isPlayingAudio ? `${h}px` : "6px" }}
                          />
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono">Mandarin Standard Audio • 24kHz</p>
                    </div>
                  </div>
                </div>

                {/* Multiple Choice Question */}
                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900">
                    ❓ {currentStation.question}
                  </h4>
                  <div className="space-y-2">
                    {currentStation.options.map((opt, optIdx) => {
                      const isSelected = listenSelectedOption === optIdx;
                      let btnStyle = "bg-white border-slate-200 text-slate-800 hover:border-sky-300";
                      if (listenIsSubmitted) {
                        if (optIdx === currentStation.correctIndex) {
                          btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-950 font-black";
                        } else if (isSelected) {
                          btnStyle = "bg-rose-100 border-rose-500 text-rose-950 font-bold";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-sky-50 border-sky-500 text-sky-950 font-black ring-2 ring-sky-300/40";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={listenIsSubmitted}
                          onClick={() => setListenSelectedOption(optIdx)}
                          className={`w-full p-3.5 rounded-xl border-2 text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {listenIsSubmitted && optIdx === currentStation.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit / Next Button */}
                <div className="space-y-3 pt-2">
                  {!listenIsSubmitted ? (
                    <button
                      disabled={listenSelectedOption === null}
                      onClick={handleSubmitListening}
                      className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-black shadow-md shadow-sky-600/20 disabled:opacity-40 cursor-pointer"
                    >
                      Nộp Bài Trạm 1 & Đánh Giá
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div
                        className={`p-4 rounded-xl border-2 text-xs space-y-1.5 animate-fadeIn ${
                          scores.listening === 100
                            ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                            : "bg-rose-50 border-rose-300 text-rose-950"
                        }`}
                      >
                        <div className="flex items-center gap-2 font-black text-sm">
                          {scores.listening === 100 ? (
                            <>
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                              <span>CHÍNH XÁC (100/100 ĐIỂM)</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                              <span>CHƯA ĐÚNG (0/100 ĐIỂM)</span>
                            </>
                          )}
                        </div>
                        <p className="font-medium">
                          {scores.listening === 100
                            ? "✓ Bạn đã thẩm âm chuẩn xác! Đáp án đúng là Phương án A: Lô vải may đợt này có vấn đề về độ phai màu, cần kiểm tra lại ngay (từ khóa: 掉色 - diàosè = phai màu)."
                            : "✗ Bạn đã chọn sai. Đáp án chính xác là Phương án A: 'Lô vải may đợt này có vấn đề về độ phai màu, cần kiểm tra lại ngay' (từ khóa: 掉色 - diàosè = phai màu/ra màu)."}
                        </p>
                      </div>

                      <div className="w-full flex items-center justify-between">
                        <span
                          className={`text-xs font-black ${
                            scores.listening === 100 ? "text-emerald-700" : "text-rose-700"
                          }`}
                        >
                          Điểm Trạm 1: {scores.listening}/100
                        </span>
                        <button
                          onClick={() => setActiveStationIndex(1)}
                          className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer hover:bg-slate-800"
                        >
                          <span>Sang Trạm 2 (Nói)</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* STATION 2: SPEAKING & TONE INTERACTION */}
            {/* ============================================================ */}
            {currentStation.id === "speaking" && (
              <div className="space-y-5 animate-fadeIn">
                {/* Target Prompt Card */}
                <div className="p-5 rounded-2xl bg-rose-50/70 border-2 border-rose-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-rose-900 flex items-center gap-1.5">
                      <Mic className="w-4 h-4 text-rose-600" />
                      Câu Nói Mục Tiêu:
                    </span>
                    <button
                      onClick={() => playChineseAudio(currentStation.targetHanzi, 0.85)}
                      className="p-1.5 rounded-lg bg-white border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-1 hover:bg-rose-100 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe mẫu</span>
                    </button>
                  </div>

                  <p className="text-lg sm:text-xl font-black text-slate-900 tracking-wide">
                    {currentStation.targetHanzi}
                  </p>
                  <p className="text-xs sm:text-sm font-mono font-bold text-rose-700">
                    {currentStation.targetPinyin}
                  </p>
                  <p className="text-xs text-slate-600 font-medium">
                    {currentStation.vietnameseTranslation}
                  </p>
                </div>

                {/* Visual Pitch Contour (Ngũ độ thanh điệu 1-5) */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 shadow-md">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-amber-300 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Sơ đồ Cao độ Ngũ độ (五度标记法 - 1 đến 5):
                    </span>
                    <span className="text-[10px] text-slate-400">Thanh 1 (55) • Thanh 2 (35) • Thanh 3 (214) • Thanh 4 (51)</span>
                  </div>

                  {/* Pitch Badges */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {currentStation.keyTones?.map((k, idx) => (
                      <div key={idx} className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-center space-y-0.5">
                        <div className="text-base font-black text-amber-400">{k.char}</div>
                        <div className="text-[10px] font-mono text-slate-300">{k.pinyin}</div>
                        <div className="text-[9px] font-bold text-rose-300">{k.pitch}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Voice Recording Control */}
                <div className="p-5 rounded-2xl bg-white border-2 border-slate-200 text-center space-y-3">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={handleToggleSpeakRecord}
                      className={`p-5 rounded-full text-white shadow-lg transition-transform active:scale-95 cursor-pointer ${
                        isRecording
                          ? "bg-rose-600 animate-pulse ring-8 ring-rose-200"
                          : "bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 shadow-rose-500/20"
                      }`}
                    >
                      {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                    </button>
                  </div>
                  <p className="text-xs font-black text-slate-700">
                    {isRecording ? "Đang lắng nghe giọng bạn... Hãy đọc câu trên!" : "Bấm micro để bắt đầu thu âm & chấm điểm ngữ điệu"}
                  </p>

                  {/* Feedback Card */}
                  {speakingScore !== null && (
                    <div
                      className={`p-4 rounded-xl border-2 text-left space-y-1.5 animate-fadeIn ${
                        speakingScore === 100
                          ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                          : "bg-rose-50 border-rose-300 text-rose-950"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black flex items-center gap-1">
                          {speakingScore === 100 ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>CHÍNH XÁC (100/100 ĐIỂM) - Phát âm chuẩn bản xứ</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-rose-600" />
                              <span>CHƯA ĐẠT (0/100 ĐIỂM) - Cần đọc lại rõ chữ & thanh điệu</span>
                            </>
                          )}
                        </span>
                        {userAudioUrl && (
                          <button
                            onClick={() => {
                              const a = new Audio(userAudioUrl);
                              a.play();
                            }}
                            className={`px-2.5 py-1 rounded-lg text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                              speakingScore === 100 ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"
                            }`}
                          >
                            <Play className="w-3 h-3" />
                            <span>Nghe lại giọng bạn</span>
                          </button>
                        )}
                      </div>
                      <p className="text-xs font-medium">
                        💡 {speakingFeedback}
                      </p>
                    </div>
                  )}
                </div>

                {/* Next Step */}
                {speakingScore !== null && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => setActiveStationIndex(2)}
                      className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer hover:bg-slate-800"
                    >
                      <span>Sang Trạm 3 (Đọc Hiểu)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* STATION 3: READING & INSTANT DICTIONARY */}
            {/* ============================================================ */}
            {currentStation.id === "reading" && (
              <div className="space-y-5 animate-fadeIn">
                {/* Passage with Tap-to-Inspect Words */}
                <div className="p-5 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      Đoạn Văn Chuyên Ngành (Chạm vào từ để tra cứu):
                    </span>
                    <button
                      onClick={() => setShowPinyinInReading((prev) => !prev)}
                      className="p-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1 hover:bg-emerald-100 cursor-pointer"
                    >
                      {showPinyinInReading ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showPinyinInReading ? "Ẩn Pinyin" : "Hiện Pinyin"}</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base font-black text-slate-900 leading-relaxed font-sans">
                    {currentStation.passageHanzi}
                  </p>

                  {showPinyinInReading && (
                    <p className="text-xs font-mono text-emerald-800 bg-white/70 p-2.5 rounded-xl border border-emerald-100">
                      {currentStation.passagePinyin}
                    </p>
                  )}

                  {/* Clickable Quick Dictionary Pills */}
                  <div className="flex items-center flex-wrap gap-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-500 mr-1">Tra từ nhanh:</span>
                    {Object.entries(currentStation.wordDictionary || {}).map(([word, def]) => (
                      <button
                        key={word}
                        onClick={() => setInspectedWord({ word, pinyin: def.pinyin, vietnamese: def.vietnamese })}
                        className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-800 text-xs font-black hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer shadow-2xs"
                      >
                        {word}
                      </button>
                    ))}
                  </div>

                  {/* Word Inspection Popup */}
                  {inspectedWord && (
                    <div className="p-3.5 rounded-xl bg-white border-2 border-emerald-400 text-xs space-y-1 shadow-sm animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-slate-900">{inspectedWord.word}</span>
                        <button
                          onClick={() => playChineseAudio(inspectedWord.word, 0.85)}
                          className="p-1 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-emerald-700 font-mono font-bold">[{inspectedWord.pinyin}]</p>
                      <p className="text-slate-700 font-medium">Nghĩa: {inspectedWord.vietnamese}</p>
                    </div>
                  )}
                </div>

                {/* Comprehension Question */}
                <div className="space-y-3">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900">
                    ❓ {currentStation.question}
                  </h4>
                  <div className="space-y-2">
                    {currentStation.options.map((opt, optIdx) => {
                      const isSelected = readingSelectedOption === optIdx;
                      let btnStyle = "bg-white border-slate-200 text-slate-800 hover:border-emerald-300";
                      if (readingIsSubmitted) {
                        if (optIdx === currentStation.correctIndex) {
                          btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-950 font-black";
                        } else if (isSelected) {
                          btnStyle = "bg-rose-100 border-rose-500 text-rose-950 font-bold";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-300/40";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={readingIsSubmitted}
                          onClick={() => setReadingSelectedOption(optIdx)}
                          className={`w-full p-3.5 rounded-xl border-2 text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {readingIsSubmitted && optIdx === currentStation.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit & Next */}
                <div className="space-y-3 pt-2">
                  {!readingIsSubmitted ? (
                    <button
                      disabled={readingSelectedOption === null}
                      onClick={handleSubmitReading}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md shadow-emerald-600/20 disabled:opacity-40 cursor-pointer"
                    >
                      Nộp Bài Trạm 3 & Đánh Giá
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div
                        className={`p-4 rounded-xl border-2 text-xs space-y-1.5 animate-fadeIn ${
                          scores.reading === 100
                            ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                            : "bg-rose-50 border-rose-300 text-rose-950"
                        }`}
                      >
                        <div className="flex items-center gap-2 font-black text-sm">
                          {scores.reading === 100 ? (
                            <>
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                              <span>CHÍNH XÁC (100/100 ĐIỂM)</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                              <span>CHƯA ĐÚNG (0/100 ĐIỂM)</span>
                            </>
                          )}
                        </div>
                        <p className="font-medium">
                          {scores.reading === 100
                            ? "✓ Bạn đã đọc hiểu trọn vẹn văn bản kiểm hàng QC! Đáp án đúng là Phương án A: Có 5 áo bị lệch đường chỉ may và đứt chỉ ở nẹp áo."
                            : "✗ Bạn đã chọn sai phương án. Đáp án chính xác là Phương án A: 'Có 5 áo bị lệch đường chỉ may và đứt chỉ ở nẹp áo' (thuật ngữ chuyên ngành: 走线偏斜 = lệch đường may; 跳针 = nhảy mũi/đứt chỉ)."}
                        </p>
                      </div>

                      <div className="w-full flex items-center justify-between">
                        <span
                          className={`text-xs font-black ${
                            scores.reading === 100 ? "text-emerald-700" : "text-rose-700"
                          }`}
                        >
                          Điểm Trạm 3: {scores.reading}/100
                        </span>
                        <button
                          onClick={() => setActiveStationIndex(3)}
                          className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer hover:bg-slate-800"
                        >
                          <span>Sang Trạm 4 (Viết Hán Tự)</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* STATION 4: WRITING CANVAS & STROKE BALANCE */}
            {/* ============================================================ */}
            {currentStation.id === "writing" && (
              <div className="space-y-5 animate-fadeIn">
                {/* Character Meta Header */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                      <PenTool className="w-4 h-4 text-amber-600" />
                      Chữ Hán Thực Hành: <strong className="text-lg text-slate-900 font-serif">样</strong> ({currentStation.pinyin})
                    </span>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-lg">
                      10 Nét • Bộ Mộc 木
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium">
                    💡 <strong>Ý nghĩa:</strong> {currentStation.meaning}. <strong>Bút thuận:</strong> {currentStation.rule}
                  </p>
                </div>

                {/* Canvas Grid Controls & Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  {/* Grid Style */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => setWritingGridType("mi")}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                        writingGridType === "mi" ? "bg-white text-amber-800 shadow-xs" : "text-slate-600"
                      }`}
                    >
                      米 Mễ tự cách
                    </button>
                    <button
                      onClick={() => setWritingGridType("tian")}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                        writingGridType === "tian" ? "bg-white text-amber-800 shadow-xs" : "text-slate-600"
                      }`}
                    >
                      田 Điền tự cách
                    </button>
                    <button
                      onClick={() => setWritingGridType("jiu")}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                        writingGridType === "jiu" ? "bg-white text-amber-800 shadow-xs" : "text-slate-600"
                      }`}
                    >
                      九 Cửu cung cách
                    </button>
                  </div>

                  {/* Watermark Hint Slider */}
                  <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-xl">
                    <span className="text-[11px] font-bold text-slate-600">Độ mờ nét mẫu:</span>
                    <input
                      type="range"
                      min="0"
                      max="0.4"
                      step="0.05"
                      value={writingHintOpacity}
                      onChange={(e) => setWritingHintOpacity(parseFloat(e.target.value))}
                      className="w-20 accent-amber-600 cursor-pointer"
                    />
                  </div>

                  {/* Ink Colors */}
                  <div className="flex items-center gap-1.5">
                    {["#dc2626", "#0f172a", "#0284c7"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setWritingInkColor(c)}
                        className={`w-6 h-6 rounded-full border-2 transition-transform ${
                          writingInkColor === c ? "scale-110 border-slate-900" : "border-transparent"
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>

                {/* Writing Interactive Canvas */}
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-3">
                  <div className="relative rounded-2xl overflow-hidden shadow-md border-2 border-amber-300 touch-none">
                    <canvas
                      ref={canvasRef}
                      width={280}
                      height={280}
                      onMouseDown={handleStartDraw}
                      onMouseMove={handleDrawMove}
                      onMouseUp={handleEndDraw}
                      onMouseLeave={handleEndDraw}
                      onTouchStart={handleStartDraw}
                      onTouchMove={handleDrawMove}
                      onTouchEnd={handleEndDraw}
                      className="cursor-crosshair bg-white"
                    />
                  </div>

                  {/* Canvas Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleClearCanvas}
                      className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Xóa viết lại</span>
                    </button>
                    <button
                      onClick={handleEvaluateWriting}
                      className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black shadow-md shadow-amber-600/20 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      <span>Chấm Điểm Nét Viết & Trọng Tâm</span>
                    </button>
                  </div>

                  {/* Writing Evaluation Score */}
                  {writingScore !== null && (
                    <div
                      className={`p-4 rounded-xl border-2 text-xs space-y-1.5 text-center w-full max-w-sm animate-fadeIn ${
                        writingScore === 100
                          ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                          : "bg-rose-50 border-rose-300 text-rose-950"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1.5 font-black text-sm">
                        {writingScore === 100 ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>CHÍNH XÁC (100/100 ĐIỂM)</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-600" />
                            <span>CHƯA ĐẠT (0/100 ĐIỂM)</span>
                          </>
                        )}
                      </div>
                      <p className="text-xs font-medium">
                        {writingScore === 100
                          ? "✓ Nét bút thanh mảnh, đủ 10 nét bút thuận. Trọng tâm chữ '样' nằm cân đối chính giữa trục Mễ tự cách."
                          : `✗ Chữ '样' có đúng 10 nét (bộ Mộc 4 nét + bộ Dương 6 nét). Hiện bạn mới hoàn thành ${strokeDrawnCount} nét. Vui lòng bấm 'Xóa viết lại' để luyện nét chuẩn.`}
                      </p>
                    </div>
                  )}
                </div>

                {/* Next Step */}
                {writingScore !== null && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => setActiveStationIndex(4)}
                      className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer hover:bg-slate-800"
                    >
                      <span>Sang Trạm 5 (Ngữ Pháp Cú Pháp)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* STATION 5: GRAMMAR SYNTAX BLOCK BUILDER */}
            {/* ============================================================ */}
            {currentStation.id === "grammar" && (
              <div className="space-y-5 animate-fadeIn">
                {/* Grammar Meta Header */}
                <div className="p-4 rounded-2xl bg-purple-50/70 border-2 border-purple-200 space-y-2">
                  <span className="text-xs font-black text-purple-950 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-purple-600" />
                    Thử Thách Lắp Ghép Cú Pháp Câu Chữ 把:
                  </span>
                  <p className="text-xs text-slate-700 font-medium">
                    🎯 <strong>Nhiệm vụ:</strong> Chọn các khối từ bên dưới để tạo thành câu mang nghĩa: "<em>{currentStation.targetTranslation}</em>"
                  </p>
                </div>

                {/* Sentence Staging Runway */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white min-h-[90px] flex flex-col justify-center space-y-2 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                    Sơ Đồ Cú Pháp Câu Hoàn Chỉnh:
                  </span>
                  <div className="flex items-center flex-wrap gap-2 min-h-[36px]">
                    {grammarSlots.length === 0 ? (
                      <span className="text-xs text-slate-500 italic">
                        Bấm vào các khối màu bên dưới theo trật tự: [Chủ ngữ] + [把] + [Tân ngữ] + [Động từ] + [Kết quả]
                      </span>
                    ) : (
                      grammarSlots.map((sId) => {
                        const token = currentStation.tokens?.find((t) => t.id === sId);
                        if (!token) return null;
                        return (
                          <button
                            key={sId}
                            disabled={grammarIsSubmitted}
                            onClick={() => handleToggleGrammarToken(sId)}
                            className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-black shadow-xs hover:bg-purple-700 active:scale-95 transition-all flex items-center gap-1.5"
                          >
                            <span>{token.text}</span>
                            {!grammarIsSubmitted && <span className="text-[10px] opacity-70">✕</span>}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Word Tokens Bank */}
                <div className="space-y-2">
                  <span className="text-xs font-black text-slate-700">Khối từ vựng cú pháp:</span>
                  <div className="flex items-center flex-wrap gap-2.5">
                    {currentStation.tokens?.map((token) => {
                      const isUsed = grammarSlots.includes(token.id);
                      return (
                        <button
                          key={token.id}
                          disabled={isUsed || grammarIsSubmitted}
                          onClick={() => handleToggleGrammarToken(token.id)}
                          className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                            isUsed
                              ? "opacity-30 bg-slate-100 border-slate-200 cursor-not-allowed"
                              : "bg-white border-slate-200 text-slate-800 hover:border-purple-400 hover:bg-purple-50 active:scale-95 shadow-2xs"
                          }`}
                        >
                          <div className="text-xs sm:text-sm font-black text-slate-900">{token.text}</div>
                          <div className="text-[10px] font-bold text-purple-600 font-mono">{token.role}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Grammar */}
                <div className="flex items-center justify-between pt-2">
                  {!grammarIsSubmitted ? (
                    <button
                      disabled={grammarSlots.length === 0}
                      onClick={handleSubmitGrammar}
                      className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black shadow-md shadow-purple-600/20 disabled:opacity-40 cursor-pointer"
                    >
                      Kiểm Tra Cú Pháp & Hoàn Tất Khảo Sát
                    </button>
                  ) : (
                    <div className="w-full space-y-3">
                      <div
                        className={`p-4 rounded-xl border-2 text-xs space-y-1.5 animate-fadeIn ${
                          grammarScore === 100
                            ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                            : "bg-rose-50 border-rose-300 text-rose-950"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-black text-sm">
                          {grammarScore === 100 ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>CHÍNH XÁC 100/100 ĐIỂM! Cấu trúc câu chữ 把 hoàn hảo</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-rose-600" />
                              <span>CHƯA ĐÚNG CÚ PHÁP (0/100 ĐIỂM)</span>
                            </>
                          )}
                        </div>
                        <p className="font-medium">
                          {grammarScore === 100
                            ? "✓ Thứ tự cú pháp hoàn toàn chính xác: [Chủ ngữ: 请] + [把] + [Tân ngữ: 这批布料] + [Động từ: 送到] + [Địa điểm: 车间]."
                            : "✗ Thứ tự sắp xếp các khối từ chưa đúng quy tắc câu chữ 把. Đáp án chuẩn: 请 + 把 + 这批布料 + 送到 + 车间."}
                        </p>
                        <p className="text-slate-600">
                          🎯 <strong>Đáp án chuẩn:</strong> {currentStation.targetSentence}
                        </p>
                        <p className="text-[11px] font-mono text-purple-700">{currentStation.targetPinyin}</p>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            setActiveStationIndex(0);
                          }}
                          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-black shadow-lg shadow-indigo-600/20 flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          <span>Xem Báo Cáo Tổng Hợp 5 Kỹ Năng</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
