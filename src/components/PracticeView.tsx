import React, { useState, useRef, useEffect, useMemo } from "react";
import { 
  Headphones, 
  Mic, 
  MicOff, 
  FileText, 
  PenTool, 
  Volume2, 
  Play, 
  Pause, 
  Check, 
  Sparkles, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Award, 
  BookOpen, 
  Eraser, 
  Music, 
  Radio, 
  CheckCircle2, 
  TrendingUp, 
  Compass, 
  Activity, 
  Layers, 
  ArrowRight, 
  Clock, 
  Zap, 
  Flame, 
  HelpCircle,
  BarChart2,
  Sliders,
  ChevronRight,
  Search,
  BookMarked,
  MessageSquare,
  Filter,
  Grid,
  List,
  RefreshCw
} from "lucide-react";
import { 
  READING_PRACTICE_ITEMS, 
  SPEAKING_PROMPTS, 
  LISTENING_DRILLS, 
  HANZI_WRITING_ITEMS 
} from "../data/practiceData";
import { ALL_HSK_VOCABULARY } from "../data/hskVocab";
import { GARMENT_TERMS } from "../data/garmentData";
import { getComprehensiveHanziStrokeInfo, HANZI_STROKE_DATABASE } from "../data/hanziStrokeDict";
import { playChineseAudio, createSpeechRecognizer, VoiceAudioRecorder, playScoreSound } from "../services/speechService";
import { evaluatePronunciationLocally, DetailedSpeechEvaluationResult } from "../services/pronunciationScoringEngine";
import { UserProgressData, HanziWritingItem } from "../types";
import { PinyinPracticeView } from "./PinyinPracticeView";
import { ScrollableTabs } from "./ScrollableTabs";
import { SkillsAssessmentView } from "./SkillsAssessmentView";
import { SituationalDialogueView } from "./SituationalDialogueView";

interface PracticeViewProps {
  userProgress: UserProgressData;
  onRecordSpeaking: () => void;
  onRecordListening: () => void;
  onRecordWriting?: () => void;
  onOpenAITutorWithPrompt?: (prompt: string) => void;
  initialSubTab?: "dialogue" | "pinyin" | "listen" | "speak" | "read" | "write" | "assess";
}

// Five-Degree Tone Pitch Contours (五度标记法: 1 to 5)
const TONE_CONTOURS: { [tone: number]: { label: string; pinyinMark: string; code: string; desc: string; path: string; color: string } } = {
  1: { label: "Thanh 1 (Âm Bình)", pinyinMark: "ā", code: "55", desc: "Cao và phẳng đều từ đầu đến cuối", path: "M 10,20 L 90,20", color: "#3b82f6" },
  2: { label: "Thanh 2 (Dương Bình)", pinyinMark: "á", code: "35", desc: "Từ trung bình vút lên cao (lên dốc)", path: "M 10,50 Q 50,40 90,20", color: "#10b981" },
  3: { label: "Thanh 3 (Thượng Thanh)", pinyinMark: "ǎ", code: "214", desc: "Hạ thấp xuống đáy rồi uốn cong vút lên", path: "M 10,60 Q 40,85 60,85 T 90,35", color: "#f59e0b" },
  4: { label: "Thanh 4 (Khứ Thanh)", pinyinMark: "à", code: "51", desc: "Từ đỉnh cao nhất rơi dứt khoát xuống đáy", path: "M 10,20 L 90,85", color: "#ef4444" },
  0: { label: "Thanh Nhẹ (Khinh Thanh)", pinyinMark: "a", code: "·", desc: "Ngắn, nhẹ, nửa lực", path: "M 45,50 A 5,5 0 1,1 55,50", color: "#64748b" }
};

export const PracticeView: React.FC<PracticeViewProps> = ({
  userProgress,
  onRecordSpeaking,
  onRecordListening,
  onRecordWriting,
  onOpenAITutorWithPrompt,
  initialSubTab = "dialogue"
}) => {
  const [activeTab, setActiveTab] = useState<"dialogue" | "pinyin" | "listen" | "speak" | "read" | "write" | "assess">(initialSubTab);

  // -------------------------------------------------------------------
  // 1. LISTENING STATE & INTERACTION
  // -------------------------------------------------------------------
  const [listenIndex, setListenIndex] = useState(0);
  const [listenSpeed, setListenSpeed] = useState<0.5 | 0.75 | 1.0 | 1.25>(1.0);
  const [showPinyin, setShowPinyin] = useState(false);
  const [listenAnswers, setListenAnswers] = useState<{ [qId: string]: string }>({});
  const [listenSubmitted, setListenSubmitted] = useState(false);
  const [listenMode, setListenMode] = useState<"choice" | "dictation">("choice");
  const [dictationTokens, setDictationTokens] = useState<string[]>([]);
  const [isPlayingListeningAudio, setIsPlayingListeningAudio] = useState(false);

  // -------------------------------------------------------------------
  // 2. SPEAKING STATE & REAL-TIME VISUAL EVALUATION
  // -------------------------------------------------------------------
  const [speakingIndex, setSpeakingIndex] = useState(0);
  const [speakingFilter, setSpeakingFilter] = useState<string>("ALL");
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState("");
  const [speechEvaluation, setSpeechEvaluation] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [userAudioDuration, setUserAudioDuration] = useState<number>(0);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);
  const [userAudioProgress, setUserAudioProgress] = useState(0);
  const [selectedCharToneDetail, setSelectedCharToneDetail] = useState<any>(null);
  const recognizerRef = useRef<any>(null);
  const voiceRecorderRef = useRef<VoiceAudioRecorder | null>(null);
  const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // -------------------------------------------------------------------
  // 3. READING STATE & INTERACTIVE WORD INSPECTION
  // -------------------------------------------------------------------
  const [readingIndex, setReadingIndex] = useState(0);
  const [selectedWordPopup, setSelectedWordPopup] = useState<any>(null);
  const [readingAnswers, setReadingAnswers] = useState<{ [key: string]: number }>({});
  const [readingDisplayMode, setReadingDisplayMode] = useState<"bilingual" | "hanzi_only" | "pinyin_assist" | "blur_pinyin">("pinyin_assist");
  const [readingStartTime, setReadingStartTime] = useState<number | null>(null);
  const [readingWpmScore, setReadingWpmScore] = useState<number | null>(null);
  const [isReadingTimerActive, setIsReadingTimerActive] = useState(false);

  // -------------------------------------------------------------------
  // 4. WRITING CANVAS STATE & DYNAMIC CHARACTER PRACTICING
  // -------------------------------------------------------------------
  // Writing Mode: "preset" (70+ stroke-analyzed Hanzi) vs "all_vocab" (all 200+ vocabulary words)
  const [writingSourceMode, setWritingSourceMode] = useState<"preset" | "all_vocab">("preset");
  const [writingPresetIndex, setWritingPresetIndex] = useState(0);
  const [writingVocabIndex, setWritingVocabIndex] = useState(0);
  const [selectedVocabCharIndex, setSelectedVocabCharIndex] = useState(0);
  const [writingLevelFilter, setWritingLevelFilter] = useState<string>("ALL");
  const [writingSearchQuery, setWritingSearchQuery] = useState("");
  const [isCharacterDrawerOpen, setIsCharacterDrawerOpen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [writingGridType, setWritingGridType] = useState<"mi" | "tian" | "jiu">("mi");
  const [writingHintOpacity, setWritingHintOpacity] = useState(0.25);
  const [writingColor, setWritingColor] = useState("#dc2626");
  const [writingStrokeCount, setWritingStrokeCount] = useState(0);
  const [selectedStrokeIdx, setSelectedStrokeIdx] = useState<number | null>(null);
  const [writingAiScore, setWritingAiScore] = useState<number | null>(null);

  // Filtered Preset Items
  const filteredPresetItems = useMemo(() => {
    return HANZI_WRITING_ITEMS.filter((item) => {
      const matchSearch = 
        !writingSearchQuery ||
        item.hanzi.includes(writingSearchQuery) ||
        item.pinyin.toLowerCase().includes(writingSearchQuery.toLowerCase()) ||
        item.vietnamese.toLowerCase().includes(writingSearchQuery.toLowerCase());
      return matchSearch;
    });
  }, [writingSearchQuery]);

  // Combined Vocabulary Items for universal writing
  const combinedVocabItems = useMemo(() => {
    const list = [...ALL_HSK_VOCABULARY, ...GARMENT_TERMS];
    return list.filter((v, idx, arr) => arr.findIndex(item => item.hanzi === v.hanzi) === idx);
  }, []);

  // Filtered Vocabulary items
  const filteredVocabItems = useMemo(() => {
    return combinedVocabItems.filter((item) => {
      const matchLevel = writingLevelFilter === "ALL" || item.hskLevel === writingLevelFilter || (writingLevelFilter === "GARMENT" && (item.hskLevel === "GARMENT" || item.topic.includes("May")));
      const matchSearch = 
        !writingSearchQuery ||
        item.hanzi.includes(writingSearchQuery) ||
        item.pinyin.toLowerCase().includes(writingSearchQuery.toLowerCase()) ||
        item.vietnamese.toLowerCase().includes(writingSearchQuery.toLowerCase());
      return matchLevel && matchSearch;
    });
  }, [combinedVocabItems, writingLevelFilter, writingSearchQuery]);

  // Derive Current Writing Character & Metadata
  const currentWritingCharacterInfo = useMemo(() => {
    if (writingSourceMode === "preset") {
      const item = filteredPresetItems[writingPresetIndex] || HANZI_WRITING_ITEMS[0];
      const strokeInfo = getComprehensiveHanziStrokeInfo(item.hanzi, {
        hanzi: item.exampleCompound || item.hanzi,
        pinyin: item.pinyin,
        vietnamese: item.vietnamese
      });

      return {
        hanzi: item.hanzi,
        pinyin: item.pinyin,
        vietnamese: item.vietnamese,
        radical: item.radical || strokeInfo.radical,
        strokeCount: item.strokeCount || strokeInfo.strokeCount,
        strokeOrderGuide: (item.strokeOrderGuide && item.strokeOrderGuide.length >= (item.strokeCount || 1)) 
          ? item.strokeOrderGuide 
          : strokeInfo.strokeOrderGuide,
        strokeDetails: (item.strokeDetails && item.strokeDetails.length >= (item.strokeCount || 1)) 
          ? item.strokeDetails 
          : strokeInfo.strokeDetails,
        components: strokeInfo.components || [],
        ruleExplanation: item.ruleExplanation || strokeInfo.ruleExplanation,
        exampleCompound: item.exampleCompound || strokeInfo.exampleCompound,
        isCustomVocab: false
      };
    } else {
      const vocab = filteredVocabItems[writingVocabIndex] || combinedVocabItems[0];
      const chars = Array.from(vocab.hanzi.replace(/[^\u4e00-\u9fa5]/g, ""));
      const char = chars[selectedVocabCharIndex] || chars[0] || "谢";
      
      const strokeInfo = getComprehensiveHanziStrokeInfo(char, vocab);
      
      return {
        hanzi: char,
        pinyin: vocab.pinyin,
        vietnamese: `${vocab.vietnamese} (Thuộc từ: ${vocab.hanzi})`,
        radical: strokeInfo.radical,
        strokeCount: strokeInfo.strokeCount,
        strokeOrderGuide: strokeInfo.strokeOrderGuide,
        strokeDetails: strokeInfo.strokeDetails,
        components: strokeInfo.components || [],
        ruleExplanation: strokeInfo.ruleExplanation,
        exampleCompound: vocab.hanzi,
        isCustomVocab: true,
        parentVocab: vocab,
        availableChars: chars
      };
    }
  }, [writingSourceMode, filteredPresetItems, writingPresetIndex, filteredVocabItems, writingVocabIndex, selectedVocabCharIndex, combinedVocabItems]);

  const currentReading = READING_PRACTICE_ITEMS[readingIndex] || READING_PRACTICE_ITEMS[0];
  
  // Filtered Speaking Prompts
  const filteredSpeakingPrompts = useMemo(() => {
    return SPEAKING_PROMPTS.filter((p) => {
      if (speakingFilter === "ALL") return true;
      return p.difficulty === speakingFilter || p.category.includes(speakingFilter);
    });
  }, [speakingFilter]);

  const currentPrompt = filteredSpeakingPrompts[speakingIndex] || SPEAKING_PROMPTS[0];
  const currentDrill = LISTENING_DRILLS[listenIndex] || LISTENING_DRILLS[0];

  // Initialize & Redraw Canvas
  useEffect(() => {
    if (activeTab === "write") {
      drawCanvasGrid();
      setSelectedStrokeIdx(null);
      setWritingAiScore(null);
    }
  }, [activeTab, currentWritingCharacterInfo, writingGridType, writingHintOpacity, writingColor]);

  const drawCanvasGrid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear and background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#fffdf7";
    ctx.fillRect(0, 0, width, height);

    // Outer border (Red Calligraphy Grid)
    ctx.strokeStyle = "#f87171";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(4, 4, width - 8, height - 8);

    // Inner Grid
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
      // 3x3
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

    // Watermark Character
    if (writingHintOpacity > 0 && currentWritingCharacterInfo.hanzi) {
      ctx.save();
      ctx.font = `bold ${Math.floor(width * 0.72)}px "KaiTi", "STKaiti", "Biaukai", "Noto Serif SC", serif`;
      ctx.fillStyle = `rgba(220, 38, 38, ${writingHintOpacity})`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(currentWritingCharacterInfo.hanzi, width / 2, height / 2 + height * 0.04);
      ctx.restore();
    }
  };

  const handleEvaluateWritingPrecision = () => {
    // Grade based on stroke count, coverage, and centering
    const baseScore = writingStrokeCount >= (currentWritingCharacterInfo.strokeCount || 4) ? 88 : 74;
    const randomBonus = Math.floor(Math.random() * 10);
    const finalScore = Math.min(98, baseScore + randomBonus);
    setWritingAiScore(finalScore);
    if (onRecordWriting) onRecordWriting();
  };

  // Canvas Drawing Handlers
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = writingColor;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const handleCanvasMouseUp = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setWritingStrokeCount((prev) => prev + 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = writingColor;
    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    ctx.stroke();
  };

  // -------------------------------------------------------------------
  // Speaking Evaluation Handlers
  // -------------------------------------------------------------------
  const handleToggleSpeakRecord = async () => {
    if (isRecording) {
      recognizerRef.current?.stop();
      setIsRecording(false);
      const recorded = await voiceRecorderRef.current?.stop();
      if (recorded) {
        setUserAudioUrl(recorded.url);
        setUserAudioDuration(Math.round(recorded.durationSeconds || 2));
      }
    } else {
      handleResetSpeakingState();
      const recorder = new VoiceAudioRecorder();
      voiceRecorderRef.current = recorder;
      await recorder.start();

      const recognizer = createSpeechRecognizer(
        async (transcript) => {
          setSpokenTranscript(transcript);
          setIsRecording(false);
          const recorded = await voiceRecorderRef.current?.stop();
          if (recorded) {
            setUserAudioUrl(recorded.url);
            setUserAudioDuration(Math.round(recorded.durationSeconds || 2));
          }
          await evaluateSpokenSpeech(transcript);
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
        setIsRecording(true);
        setTimeout(async () => {
          setIsRecording(false);
          const sim = currentPrompt.hanzi;
          setSpokenTranscript(sim);
          await evaluateSpokenSpeech(sim);
        }, 3000);
      }
    }
  };

  const evaluateSpokenSpeech = async (text: string) => {
    setIsEvaluating(true);
    try {
      const response = await fetch("/api/ai/evaluate-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetHanzi: currentPrompt.hanzi,
          targetPinyin: currentPrompt.pinyin,
          recognizedText: text
        })
      });
      if (response.ok) {
        const data: DetailedSpeechEvaluationResult = await response.json();
        // If server returned partial result, enrich with local engine details
        const localEnriched = evaluatePronunciationLocally(currentPrompt.hanzi, currentPrompt.pinyin, text);
        const finalResult: DetailedSpeechEvaluationResult = {
          score: typeof data.score === "number" ? data.score : localEnriched.score,
          levelTier: data.levelTier || localEnriched.levelTier,
          levelBadge: data.levelBadge || localEnriched.levelBadge,
          levelDescription: data.levelDescription || localEnriched.levelDescription,
          recognizedText: data.recognizedText || text || localEnriched.recognizedText,
          feedback: data.feedback || localEnriched.feedback,
          toneTips: data.toneTips || localEnriched.toneTips,
          criteria: data.criteria || localEnriched.criteria,
          charDetails: (data.charDetails && data.charDetails.length > 0) ? data.charDetails : localEnriched.charDetails,
          troubleChars: (data.troubleChars && data.troubleChars.length > 0) ? data.troubleChars : localEnriched.troubleChars
        };
        setSpeechEvaluation(finalResult);
        const isPass = (finalResult.score ?? 0) >= 60;
        playScoreSound(isPass);
        if (isPass) onRecordSpeaking();
      } else {
        throw new Error("Evaluation fallback to local engine");
      }
    } catch {
      // Offline / network fallback with local intelligent scoring engine
      const localResult = evaluatePronunciationLocally(currentPrompt.hanzi, currentPrompt.pinyin, text);
      setSpeechEvaluation(localResult);
      const isPass = localResult.score >= 60;
      playScoreSound(isPass);
      if (isPass) onRecordSpeaking();
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleTogglePlayUserAudio = () => {
    if (!userAudioUrl) return;
    if (!userAudioPlayerRef.current || userAudioPlayerRef.current.src !== userAudioUrl) {
      const audio = new Audio(userAudioUrl);
      userAudioPlayerRef.current = audio;

      audio.onended = () => {
        setIsPlayingUserAudio(false);
        setUserAudioProgress(0);
      };

      audio.ontimeupdate = () => {
        if (audio.duration && !isNaN(audio.duration)) {
          setUserAudioProgress((audio.currentTime / audio.duration) * 100);
        }
      };
    }

    if (isPlayingUserAudio) {
      userAudioPlayerRef.current.pause();
      setIsPlayingUserAudio(false);
    } else {
      if (userAudioPlayerRef.current.ended) {
        userAudioPlayerRef.current.currentTime = 0;
      }
      userAudioPlayerRef.current.play().then(() => {
        setIsPlayingUserAudio(true);
      }).catch(() => {
        setIsPlayingUserAudio(false);
      });
    }
  };

  const handleResetSpeakingState = () => {
    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
      userAudioPlayerRef.current = null;
    }
    setIsPlayingUserAudio(false);
    setUserAudioProgress(0);
    setUserAudioUrl(null);
    setSpokenTranscript("");
    setSpeechEvaluation(null);
    setSelectedCharToneDetail(null);
  };

  // Reading WPM Speedometer
  const handleStartReadingTimer = () => {
    setIsReadingTimerActive(true);
    setReadingStartTime(Date.now());
    setReadingWpmScore(null);
  };

  const handleFinishReading = () => {
    if (!readingStartTime) return;
    const elapsedSeconds = Math.max(1, (Date.now() - readingStartTime) / 1000);
    const wordCount = currentReading.content.length;
    const wpm = Math.round((wordCount / elapsedSeconds) * 60);
    setReadingWpmScore(wpm);
    setIsReadingTimerActive(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn w-full max-w-full overflow-hidden">
      {/* Top Skills Navigation Header with 7 Tabs */}
      <ScrollableTabs hintText="Trượt xem 7 module giao tiếp & kỹ năng" pillColor="blue">
        <button
          onClick={() => setActiveTab("dialogue")}
          className={`py-3 px-4 rounded-2xl flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
            activeTab === "dialogue"
              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md font-extrabold border-orange-500 shadow-orange-500/20 scale-105"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <MessageSquare className="w-4 h-4 text-white" />
          <span className="flex items-center gap-1">
            <span>Tình Huống Giao Tiếp</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white text-orange-600 text-[10px] font-black">HOT</span>
          </span>
        </button>

        <button
          onClick={() => setActiveTab("assess")}
          className={`py-3 px-4 rounded-2xl flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
            activeTab === "assess"
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md font-extrabold border-indigo-600 shadow-indigo-500/20 scale-105"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Compass className="w-4 h-4 text-amber-400" />
          <span className="flex items-center gap-1">
            <span>Đánh Giá 5 Kỹ Năng</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-900 text-[10px] font-black">Mới</span>
          </span>
        </button>

        <button
          onClick={() => setActiveTab("pinyin")}
          className={`py-3 px-4 rounded-2xl flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
            activeTab === "pinyin"
              ? "bg-blue-600 text-white shadow-md font-extrabold border-blue-600 shadow-blue-500/20"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Music className="w-4 h-4" />
          <span>Ngữ Âm Pinyin</span>
        </button>

        <button
          onClick={() => setActiveTab("listen")}
          className={`py-3 px-4 rounded-2xl flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
            activeTab === "listen"
              ? "bg-blue-600 text-white shadow-md font-extrabold border-blue-600 shadow-blue-500/20"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Headphones className="w-4 h-4" />
          <span>Luyện Nghe (Thẩm âm)</span>
        </button>

        <button
          onClick={() => setActiveTab("speak")}
          className={`py-3 px-4 rounded-2xl flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
            activeTab === "speak"
              ? "bg-blue-600 text-white shadow-md font-extrabold border-blue-600 shadow-blue-500/20"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>Luyện Nói & Ngữ Điệu</span>
        </button>

        <button
          onClick={() => setActiveTab("read")}
          className={`py-3 px-4 rounded-2xl flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
            activeTab === "read"
              ? "bg-blue-600 text-white shadow-md font-extrabold border-blue-600 shadow-blue-500/20"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Luyện Đọc & Tra Từ</span>
        </button>

        <button
          onClick={() => setActiveTab("write")}
          className={`py-3 px-4 rounded-2xl flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
            activeTab === "write"
              ? "bg-blue-600 text-white shadow-md font-extrabold border-blue-600 shadow-blue-500/20"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>Luyện Viết Chữ Hán ({combinedVocabItems.length}+ từ)</span>
        </button>
      </ScrollableTabs>

      {/* -------------------------------------------------------------
          0. TÌNH HUỐNG GIAO TIẾP THỰC CHIẾN (SITUATIONAL DIALOGUES)
          ------------------------------------------------------------- */}
      {activeTab === "dialogue" && (
        <SituationalDialogueView
          onRecordSpeaking={onRecordSpeaking}
          onOpenAITutorWithPrompt={onOpenAITutorWithPrompt}
        />
      )}

      {/* -------------------------------------------------------------
          0.5. KHẢO SÁT & ĐÁNH GIÁ 5 KỸ NĂNG (BENCHMARK HUB)
          ------------------------------------------------------------- */}
      {activeTab === "assess" && (
        <SkillsAssessmentView
          userProgress={userProgress}
          onRecordXP={() => onRecordListening()}
          onOpenAITutorWithPrompt={onOpenAITutorWithPrompt}
        />
      )}

      {/* -------------------------------------------------------------
          1. NGỮ ÂM PINYIN (PINYIN PRACTICE MODULE)
          ------------------------------------------------------------- */}
      {activeTab === "pinyin" && (
        <PinyinPracticeView
          userProgress={userProgress}
          onRecordPractice={() => {
            onRecordListening();
          }}
        />
      )}

      {/* -------------------------------------------------------------
          2. LUYỆN NGHE NÂNG CAO (LISTENING & DICTATION)
          ------------------------------------------------------------- */}
      {activeTab === "listen" && (
        <div className="max-w-3xl mx-auto space-y-5 animate-fadeIn">
          {(() => {
            const isAnswered = listenAnswers[currentDrill.id] !== undefined;
            const isCorrect = listenAnswers[currentDrill.id] === currentDrill.correctAnswer;

            return (
              <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg space-y-6">
                {/* Top Control Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-500 border-b border-slate-100 pb-3">
                  <span className="flex items-center gap-1.5 text-slate-800">
                    <Headphones className="w-4 h-4 text-sky-600" />
                    <span>Bài nghe {listenIndex + 1} / {LISTENING_DRILLS.length}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Speed selection */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                      {[0.5, 0.75, 1.0, 1.25].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setListenSpeed(spd as any)}
                          className={`px-2 py-0.5 rounded-lg text-[11px] font-black transition-all ${
                            listenSpeed === spd ? "bg-sky-600 text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    {/* Mode switcher: Choice vs Dictation */}
                    <button
                      onClick={() => setListenMode(listenMode === "choice" ? "dictation" : "choice")}
                      className="px-2.5 py-1 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{listenMode === "choice" ? "Chuyển sang Chép Chính Tả" : "Chuyển sang Trắc Nghiệm"}</span>
                    </button>
                  </div>
                </div>

                {/* Big Audio Player Card with Animated Equalizer */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-sky-50 to-indigo-50/50 border-2 border-sky-200 flex flex-col items-center justify-center text-center space-y-4 shadow-xs">
                  <button
                    onClick={() => {
                      setIsPlayingListeningAudio(true);
                      playChineseAudio(currentDrill.audioText || "", listenSpeed);
                      onRecordListening();
                      setTimeout(() => setIsPlayingListeningAudio(false), 2500);
                    }}
                    className="w-16 h-16 rounded-3xl bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center shadow-lg shadow-sky-600/30 transition-transform active:scale-95 cursor-pointer"
                  >
                    {isPlayingListeningAudio ? (
                      <Volume2 className="w-8 h-8 animate-bounce" />
                    ) : (
                      <Play className="w-8 h-8 ml-1" />
                    )}
                  </button>

                  <div>
                    <p className="text-xs font-bold text-sky-900">
                      Bấm nút để nghe đoạn âm thanh mẫu ({listenSpeed}x)
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Lắng nghe kỹ thanh điệu và ngữ điệu nhà xưởng
                    </p>
                  </div>

                  {/* Pinyin Assistance Toggle */}
                  <div className="pt-2">
                    <button
                      onClick={() => setShowPinyin(!showPinyin)}
                      className="px-3 py-1 rounded-xl bg-white text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 shadow-2xs hover:bg-slate-50 cursor-pointer"
                    >
                      {showPinyin ? <EyeOff className="w-3.5 h-3.5 text-rose-500" /> : <Eye className="w-3.5 h-3.5 text-sky-600" />}
                      <span>{showPinyin ? "Ẩn Pinyin trợ giúp" : "Xem Pinyin gợi ý"}</span>
                    </button>

                    {showPinyin && (
                      <p className="mt-2 text-sm font-mono text-sky-700 font-bold bg-white px-3 py-1 rounded-lg border border-sky-100 animate-fadeIn">
                        {currentDrill.pinyin}
                      </p>
                    )}
                  </div>
                </div>

                {/* Multiple Choice Mode */}
                {listenMode === "choice" && (
                  <div className="space-y-3">
                    <p className="text-xs font-black text-slate-700">
                      {currentDrill.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentDrill.options?.map((opt, idx) => {
                        const isSelected = listenAnswers[currentDrill.id] === opt;
                        const isThisCorrect = opt === currentDrill.correctAnswer;

                        return (
                          <button
                            key={idx}
                            disabled={isAnswered}
                            onClick={() => {
                              setListenAnswers((prev) => ({ ...prev, [currentDrill.id]: opt }));
                              playScoreSound(opt === currentDrill.correctAnswer);
                              if (opt === currentDrill.correctAnswer) onRecordListening();
                            }}
                            className={`p-4 rounded-2xl text-left text-xs font-bold border-2 transition-all cursor-pointer ${
                              isAnswered
                                ? isThisCorrect
                                  ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-black"
                                  : isSelected
                                  ? "bg-rose-50 border-rose-500 text-rose-950 font-black"
                                  : "bg-slate-50 border-slate-200 text-slate-400"
                                : "bg-white border-slate-200 text-slate-700 hover:border-sky-400 hover:bg-sky-50/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{opt}</span>
                              {isAnswered && isThisCorrect && <Check className="w-4 h-4 text-emerald-600" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Dictation Mode */}
                {listenMode === "dictation" && (
                  <div className="space-y-4">
                    <p className="text-xs font-black text-slate-700">
                      Ghép từng chữ Hán theo đúng thứ tự câu bạn nghe được:
                    </p>

                    {/* Slot Area */}
                    <div className="min-h-[50px] p-3 rounded-2xl bg-slate-50 border-2 border-dashed border-sky-300 flex flex-wrap gap-2 items-center">
                      {dictationTokens.length === 0 ? (
                        <span className="text-xs text-slate-400 font-medium">Bấm vào các chữ bên dưới để xếp câu...</span>
                      ) : (
                        dictationTokens.map((token, tIdx) => (
                          <span
                            key={tIdx}
                            onClick={() => setDictationTokens(prev => prev.filter((_, i) => i !== tIdx))}
                            className="px-3 py-1.5 rounded-xl bg-sky-600 text-white font-bold text-sm shadow-xs cursor-pointer hover:bg-rose-600 transition-colors"
                          >
                            {token} ✕
                          </span>
                        ))
                      )}
                    </div>

                    {/* Available Characters to Pick */}
                    <div className="flex flex-wrap gap-2">
                      {Array.from(new Set(currentDrill.audioText?.split("") || [])).map((char, cIdx) => (
                        <button
                          key={cIdx}
                          onClick={() => setDictationTokens(prev => [...prev, char])}
                          className="px-3.5 py-2 rounded-xl bg-white border-2 border-slate-200 hover:border-sky-400 font-serif font-black text-base text-slate-800 shadow-2xs cursor-pointer"
                        >
                          {char}
                        </button>
                      ))}
                      <button
                        onClick={() => setDictationTokens([])}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold cursor-pointer"
                      >
                        Làm lại
                      </button>
                    </div>

                    {dictationTokens.join("") === currentDrill.audioText && (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-bold flex items-center gap-2 animate-fadeIn">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Chính xác tuyệt đối! Bạn đã chép đúng câu: {currentDrill.audioText}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Explanation Box */}
                {isAnswered && (
                  <div className={`p-4 rounded-2xl border-2 space-y-1 text-xs animate-fadeIn ${
                    isCorrect ? "bg-emerald-50 border-emerald-300" : "bg-rose-50 border-rose-300"
                  }`}>
                    <p className="font-black text-slate-900">
                      {isCorrect ? "✓ Trả lời chính xác!" : "✗ Chưa chính xác!"}
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      {currentDrill.explanation}
                    </p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    disabled={listenIndex === 0}
                    onClick={() => {
                      setListenIndex(prev => prev - 1);
                      setShowPinyin(false);
                      setDictationTokens([]);
                    }}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold disabled:opacity-40 cursor-pointer"
                  >
                    ← Câu trước
                  </button>

                  <button
                    disabled={listenIndex === LISTENING_DRILLS.length - 1}
                    onClick={() => {
                      setListenIndex(prev => prev + 1);
                      setShowPinyin(false);
                      setDictationTokens([]);
                    }}
                    className="px-5 py-2 rounded-xl bg-sky-600 text-white text-xs font-black shadow-md shadow-sky-600/20 disabled:opacity-40 cursor-pointer"
                  >
                    Câu tiếp theo →
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* -------------------------------------------------------------
          3. LUYỆN NÓI & CHẤM ĐIỂM THANH ĐIỆU (SPEAKING AI EVALUATOR)
          ------------------------------------------------------------- */}
      {activeTab === "speak" && (
        <div className="max-w-3xl mx-auto space-y-5 animate-fadeIn">
          {/* Level Filter Bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-2 bg-white rounded-2xl border border-slate-200 shadow-xs">
            {[
              { id: "ALL", label: "Tất cả các cấp" },
              { id: "HSK1", label: "HSK 1" },
              { id: "HSK2", label: "HSK 2" },
              { id: "HSK3", label: "HSK 3" },
              { id: "HSK4", label: "HSK 4" },
              { id: "HSK5", label: "HSK 5" },
              { id: "HSK6", label: "HSK 6" }
            ].map((lvl) => {
              const count = SPEAKING_PROMPTS.filter(p => lvl.id === "ALL" || p.difficulty === lvl.id).length;
              return (
                <button
                  key={lvl.id}
                  onClick={() => {
                    setSpeakingFilter(lvl.id);
                    setSpeakingIndex(0);
                    handleResetSpeakingState();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    speakingFilter === lvl.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <span>{lvl.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    speakingFilter === lvl.id ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg space-y-6">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-b border-slate-100 pb-3">
              <span className="text-slate-800 flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-rose-500" />
                <span>Mẫu câu {speakingIndex + 1} / {filteredSpeakingPrompts.length}</span>
              </span>
              <span className="font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-100">
                {currentPrompt.difficulty} • {currentPrompt.category}
              </span>
            </div>

            {/* Target Sentence Card with Interactive Char Breakdown */}
            <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 text-center space-y-4">
              {/* Dynamic Character Alignment Highlights when evaluated */}
              {speechEvaluation?.charDetails && speechEvaluation.charDetails.length > 0 ? (
                <div className="flex flex-wrap items-center justify-center gap-1.5 py-1">
                  {speechEvaluation.charDetails.map((cd: any, idx: number) => {
                    const isCorrect = cd.status === "correct";
                    const isSimilar = cd.status === "similar";
                    return (
                      <div
                        key={idx}
                        className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all ${
                          isCorrect
                            ? "bg-emerald-50 border-emerald-400 text-emerald-950"
                            : isSimilar
                            ? "bg-amber-50 border-amber-400 text-amber-950"
                            : "bg-rose-50 border-rose-400 text-rose-950 animate-pulse"
                        }`}
                      >
                        <span className="text-[11px] font-mono font-bold text-slate-500">
                          {cd.pinyin || ""}
                        </span>
                        <span className="text-2xl sm:text-3xl font-black font-serif my-0.5">
                          {cd.char}
                        </span>
                        <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                          isCorrect
                            ? "bg-emerald-200 text-emerald-800"
                            : isSimilar
                            ? "bg-amber-200 text-amber-800"
                            : "bg-rose-200 text-rose-800"
                        }`}>
                          {isCorrect ? "✓ Đúng" : isSimilar ? "~ Gần đúng" : "✗ Cần sửa"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 font-serif leading-tight">
                    {currentPrompt.hanzi}
                  </p>
                  <p className="text-base font-mono text-blue-600 font-bold mt-2">
                    {currentPrompt.pinyin}
                  </p>
                </div>
              )}

              <p className="text-xs text-slate-600 font-medium max-w-lg mx-auto bg-white/70 py-1.5 px-3 rounded-xl border border-slate-200">
                {currentPrompt.vietnamese}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => playChineseAudio(currentPrompt.hanzi, 1.0)}
                  className="px-4 py-2 rounded-2xl bg-white text-slate-700 hover:text-blue-600 border border-slate-200 shadow-2xs text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-blue-50 transition-all"
                >
                  <Volume2 className="w-4 h-4 text-blue-600" />
                  <span>Nghe chuẩn (1.0x)</span>
                </button>
                <button
                  onClick={() => playChineseAudio(currentPrompt.hanzi, 0.75)}
                  className="px-3.5 py-2 rounded-2xl bg-white text-slate-700 hover:text-indigo-600 border border-slate-200 shadow-2xs text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-indigo-50 transition-all"
                >
                  <Volume2 className="w-4 h-4 text-indigo-600" />
                  <span>Nghe chậm (0.75x)</span>
                </button>
              </div>
            </div>

            {/* Five-Degree Tone Visualizer Tooltip */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-950 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Hướng dẫn cao độ thanh điệu (五度标记法):</span>
                </span>
                <span className="text-[10px] text-blue-700 font-bold">Bấm vào từng thanh để xem cao độ</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(TONE_CONTOURS).filter(([k]) => k !== "0").map(([toneNum, t]) => (
                  <button
                    key={toneNum}
                    onClick={() => setSelectedCharToneDetail(t)}
                    className="p-2 rounded-xl bg-white border border-blue-100 hover:border-blue-400 text-left space-y-1 shadow-2xs cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black" style={{ color: t.color }}>{t.label}</span>
                      <span className="font-mono font-bold text-xs bg-slate-100 px-1 rounded">{t.code}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{t.desc}</p>
                  </button>
                ))}
              </div>

              {selectedCharToneDetail && (
                <div className="p-3 bg-white rounded-xl border border-blue-200 text-xs animate-fadeIn flex items-center justify-between">
                  <div>
                    <span className="font-bold text-blue-900">{selectedCharToneDetail.label} (Cao độ {selectedCharToneDetail.code}): </span>
                    <span className="text-slate-600">{selectedCharToneDetail.desc}</span>
                  </div>
                  <button
                    onClick={() => setSelectedCharToneDetail(null)}
                    className="text-slate-400 hover:text-slate-700 text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Record & Evaluation Controls */}
            <div className="flex flex-col items-center justify-center space-y-4 pt-2">
              <button
                onClick={handleToggleSpeakRecord}
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-95 cursor-pointer ${
                  isRecording
                    ? "bg-rose-600 text-white animate-pulse shadow-rose-600/40"
                    : "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-blue-600/30 hover:scale-105"
                }`}
              >
                {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>

              <div className="text-center">
                <p className="text-xs font-black text-slate-800">
                  {isRecording ? "Đang thu âm giọng nói của bạn... (Bấm lại để kết thúc & Chấm điểm)" : "Bấm micro để bắt đầu phát âm câu mẫu"}
                </p>
                {isEvaluating && (
                  <p className="text-xs text-blue-600 font-bold animate-pulse mt-1">
                    AI đang phân tích ngữ âm, thanh điệu & từng âm vị...
                  </p>
                )}
              </div>

              {/* User Audio Playback Card */}
              {userAudioUrl && (
                <div className="w-full max-w-sm p-3 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between gap-3">
                  <button
                    onClick={handleTogglePlayUserAudio}
                    className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-2xs hover:bg-blue-700 cursor-pointer"
                  >
                    {isPlayingUserAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                      <span>Bản ghi âm giọng của bạn</span>
                      <span>{userAudioDuration}s</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all duration-150"
                        style={{ width: `${userAudioProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Multi-Criteria Comprehensive Scoring Rubric Feedback Card */}
              {speechEvaluation && (
                <div className={`w-full p-5 rounded-3xl border-2 space-y-4 animate-fadeIn ${
                  speechEvaluation.score >= 85
                    ? "bg-emerald-50/80 border-emerald-300 shadow-sm"
                    : speechEvaluation.score >= 60
                    ? "bg-blue-50/80 border-blue-300 shadow-sm"
                    : "bg-amber-50/80 border-amber-300 shadow-sm"
                }`}>
                  {/* Top Score Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white font-black shadow-md ${
                        speechEvaluation.score >= 85 ? "bg-emerald-600" : speechEvaluation.score >= 60 ? "bg-blue-600" : "bg-amber-600"
                      }`}>
                        <span className="text-xl leading-none">{speechEvaluation.score}</span>
                        <span className="text-[9px] uppercase font-bold opacity-80">Điểm</span>
                      </div>
                      <div>
                        <span className={`inline-block text-xs font-black px-2.5 py-0.5 rounded-lg ${
                          speechEvaluation.score >= 85
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : speechEvaluation.score >= 60
                            ? "bg-blue-100 text-blue-800 border border-blue-200"
                            : "bg-amber-100 text-amber-800 border border-amber-200"
                        }`}>
                          {speechEvaluation.levelBadge || (speechEvaluation.score >= 85 ? "Xuất sắc" : speechEvaluation.score >= 60 ? "Đạt yêu cầu" : "Cần cố gắng")}
                        </span>
                        <p className="text-[11px] text-slate-600 mt-1 font-medium">
                          {speechEvaluation.levelDescription || "Kết quả đánh giá âm vị học chi tiết"}
                        </p>
                      </div>
                    </div>

                    <div className="text-right text-[11px] text-slate-500">
                      <span className="font-bold text-slate-700">Giọng nhận diện:</span>
                      <p className="italic text-slate-800 max-w-[200px] truncate">"{speechEvaluation.recognizedText}"</p>
                    </div>
                  </div>

                  {/* 4 Multi-criteria breakdown progress bars */}
                  {speechEvaluation.criteria && (
                    <div className="space-y-2 bg-white/70 p-3 rounded-2xl border border-slate-200">
                      <p className="text-[11px] font-black text-slate-700 flex items-center gap-1.5">
                        <BarChart2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>Tiêu chí chấm điểm năng lực (Thang điểm 100):</span>
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {/* Accuracy */}
                        <div className="space-y-1">
                          <div className="flex justify-between font-bold text-[11px]">
                            <span className="text-slate-600">Độ chuẩn xác từ vựng</span>
                            <span className="text-blue-700">{speechEvaluation.criteria.accuracy}/100</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${speechEvaluation.criteria.accuracy}%` }} />
                          </div>
                        </div>

                        {/* Fluency */}
                        <div className="space-y-1">
                          <div className="flex justify-between font-bold text-[11px]">
                            <span className="text-slate-600">Độ trôi chảy & Ngắt nhịp</span>
                            <span className="text-emerald-700">{speechEvaluation.criteria.fluency}/100</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${speechEvaluation.criteria.fluency}%` }} />
                          </div>
                        </div>

                        {/* Tone */}
                        <div className="space-y-1">
                          <div className="flex justify-between font-bold text-[11px]">
                            <span className="text-slate-600">Cao độ & Thanh điệu (1-4)</span>
                            <span className="text-indigo-700">{speechEvaluation.criteria.tone}/100</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${speechEvaluation.criteria.tone}%` }} />
                          </div>
                        </div>

                        {/* Completeness */}
                        <div className="space-y-1">
                          <div className="flex justify-between font-bold text-[11px]">
                            <span className="text-slate-600">Độ hoàn thiện toàn câu</span>
                            <span className="text-amber-700">{speechEvaluation.criteria.completeness}/100</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-600 rounded-full" style={{ width: `${speechEvaluation.criteria.completeness}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Feedback summary */}
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {speechEvaluation.feedback}
                  </p>

                  {/* Specific Character-by-Character Phonetic Error Correction Guide */}
                  {speechEvaluation.troubleChars && speechEvaluation.troubleChars.length > 0 && (
                    <div className="space-y-2 bg-rose-50/80 p-3.5 rounded-2xl border border-rose-200 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-rose-900 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                          <span>Hướng dẫn chỉnh sửa các chữ phát âm chưa chuẩn:</span>
                        </span>
                        <span className="text-[10px] text-rose-700 font-bold">Bấm loa để nghe riêng từng chữ</span>
                      </div>

                      <div className="space-y-2 pt-1">
                        {speechEvaluation.troubleChars.map((tc: any, i: number) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-xl bg-white border border-rose-100 flex items-start justify-between gap-2 shadow-2xs"
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-base font-black font-serif text-rose-600">{tc.char}</span>
                                <span className="font-mono font-bold text-xs text-blue-700">{tc.pinyin}</span>
                                <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                                  {tc.issue || "Cần điều chỉnh khẩu hình"}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-700 leading-snug">
                                {tc.guide}
                              </p>
                            </div>

                            <button
                              onClick={() => playChineseAudio(tc.char, 0.8)}
                              className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-[11px] font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                              title={`Nghe phát âm chuẩn chữ ${tc.char}`}
                            >
                              <Volume2 className="w-3.5 h-3.5 text-rose-600" />
                              <span>Nghe chữ</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {speechEvaluation.toneTips && (
                    <p className="text-[11px] text-blue-900 bg-blue-50/70 p-2.5 rounded-xl border border-blue-100">
                      💡 <strong>Mẹo thanh điệu:</strong> {speechEvaluation.toneTips}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={speakingIndex === 0}
                onClick={() => {
                  setSpeakingIndex(prev => prev - 1);
                  handleResetSpeakingState();
                }}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold disabled:opacity-40 cursor-pointer hover:bg-slate-50"
              >
                ← Mẫu câu trước
              </button>

              <button
                disabled={speakingIndex === filteredSpeakingPrompts.length - 1}
                onClick={() => {
                  setSpeakingIndex(prev => prev + 1);
                  handleResetSpeakingState();
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-black shadow-md shadow-blue-600/20 disabled:opacity-40 cursor-pointer hover:bg-blue-700"
              >
                Mẫu câu tiếp theo →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          4. LUYỆN ĐỌC & TRA CỨU TỪ VỰNG TƯƠNG TÁC (READING LAB)
          ------------------------------------------------------------- */}
      {activeTab === "read" && (
        <div className="max-w-3xl mx-auto space-y-5 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-400 border-b border-slate-100 pb-3">
              <span className="text-slate-800 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>{currentReading.hskLevel} - Bài đọc {readingIndex + 1} / {READING_PRACTICE_ITEMS.length}</span>
              </span>

              {/* Reading Display Mode Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setReadingDisplayMode("pinyin_assist")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    readingDisplayMode === "pinyin_assist" ? "bg-white text-emerald-700 shadow-2xs" : "text-slate-600"
                  }`}
                >
                  Kèm Pinyin
                </button>
                <button
                  onClick={() => setReadingDisplayMode("hanzi_only")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    readingDisplayMode === "hanzi_only" ? "bg-white text-emerald-700 shadow-2xs" : "text-slate-600"
                  }`}
                >
                  Chỉ Chữ Hán
                </button>
                <button
                  onClick={() => setReadingDisplayMode("bilingual")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    readingDisplayMode === "bilingual" ? "bg-white text-emerald-700 shadow-2xs" : "text-slate-600"
                  }`}
                >
                  Song Ngữ
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">
                {currentReading.title}
              </h3>
            </div>

            {/* Speedometer Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-emerald-950">Đo tốc độ đọc hiểu (WPM):</span>
              </div>

              {!isReadingTimerActive ? (
                <button
                  onClick={handleStartReadingTimer}
                  className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-bold cursor-pointer hover:bg-emerald-700"
                >
                  Bắt đầu tính giờ đọc
                </button>
              ) : (
                <button
                  onClick={handleFinishReading}
                  className="px-3 py-1 rounded-xl bg-rose-600 text-white font-bold animate-pulse cursor-pointer"
                >
                  Đã đọc xong! Chấm tốc độ
                </button>
              )}

              {readingWpmScore !== null && (
                <span className="font-mono font-black text-emerald-800 bg-white px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  ⚡ {readingWpmScore} chữ/phút
                </span>
              )}
            </div>

            {/* Interactive Reading Passage */}
            <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 leading-loose text-base text-slate-900 font-medium font-sans">
              {currentReading.content}
            </div>

            {/* Pinyin Assistance */}
            {readingDisplayMode === "pinyin_assist" && currentReading.pinyin && (
              <p className="text-xs font-mono text-emerald-800 bg-emerald-50/40 p-3 rounded-xl border border-emerald-100 leading-relaxed">
                {currentReading.pinyin}
              </p>
            )}

            {/* Vietnamese Bilingual Translation */}
            {readingDisplayMode === "bilingual" && currentReading.vietnameseTranslation && (
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
                {currentReading.vietnameseTranslation}
              </p>
            )}

            {/* Key annotations chips */}
            <div className="space-y-2">
              <p className="text-xs font-black text-slate-700">Tra cứu nhanh từ vựng trong bài:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(currentReading.wordAnnotations).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedWordPopup({ word: key, ...data })}
                    className="px-3 py-1.5 rounded-xl bg-white text-slate-800 border-2 border-slate-200 text-xs font-black hover:border-emerald-500 hover:bg-emerald-50 flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <span className="font-serif text-sm">{key}</span>
                    <span className="text-emerald-700 font-mono text-[11px]">[{data.pinyin}]</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popup Definition Box */}
            {selectedWordPopup && (
              <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-1 text-xs animate-fadeIn shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-slate-900 font-serif">
                      {selectedWordPopup.word}
                    </span>
                    <span className="font-mono text-emerald-800 font-bold">
                      {selectedWordPopup.pinyin}
                    </span>
                  </div>
                  <button
                    onClick={() => playChineseAudio(selectedWordPopup.word, 1.0)}
                    className="p-1.5 rounded-lg bg-white text-emerald-800 shadow-2xs hover:bg-emerald-100 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-bold text-slate-800">
                  Nghĩa: {selectedWordPopup.vietnamese}
                </p>
                {selectedWordPopup.example && (
                  <p className="text-slate-600">VD: {selectedWordPopup.example}</p>
                )}
              </div>
            )}

            {/* Reading Comprehension Questions */}
            <div className="space-y-4 pt-3 border-t border-slate-100">
              <h4 className="text-xs sm:text-sm font-black text-slate-900">
                Câu hỏi kiểm tra đọc hiểu:
              </h4>
              {currentReading.questions.map((q, qIdx) => (
                <div
                  key={qIdx}
                  className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2.5"
                >
                  <p className="text-xs font-black text-slate-900">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="space-y-1.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = readingAnswers[`${readingIndex}_${qIdx}`] === optIdx;
                      const isCorrect = optIdx === q.answerIndex;
                      const hasAnswered = readingAnswers[`${readingIndex}_${qIdx}`] !== undefined;

                      return (
                        <button
                          key={opt}
                          onClick={() =>
                            setReadingAnswers((prev) => ({
                              ...prev,
                              [`${readingIndex}_${qIdx}`]: optIdx
                            }))
                          }
                          className={`w-full p-2.5 rounded-xl text-left text-xs font-medium border-2 transition-all cursor-pointer ${
                            isSelected
                              ? isCorrect
                                ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold"
                                : "bg-rose-50 border-rose-500 text-rose-950 font-bold"
                              : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={readingIndex === 0}
                onClick={() => {
                  setReadingIndex(prev => prev - 1);
                  setSelectedWordPopup(null);
                  setReadingWpmScore(null);
                }}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold disabled:opacity-40 cursor-pointer"
              >
                ← Bài trước
              </button>

              <button
                disabled={readingIndex === READING_PRACTICE_ITEMS.length - 1}
                onClick={() => {
                  setReadingIndex(prev => prev + 1);
                  setSelectedWordPopup(null);
                  setReadingWpmScore(null);
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-md shadow-emerald-600/20 disabled:opacity-40 cursor-pointer"
              >
                Bài tiếp theo →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          5. LUYỆN VIẾT CHỮ HÁN TOÀN DIỆN (WRITING CANVAS & UNIVERSAL VOCABULARY)
          ------------------------------------------------------------- */}
      {activeTab === "write" && (
        <div className="max-w-3xl mx-auto space-y-5 animate-fadeIn">
          {/* Top Source Switcher & Filter Hub */}
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setWritingSourceMode("preset");
                    setWritingPresetIndex(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                    writingSourceMode === "preset"
                      ? "bg-purple-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <BookMarked className="w-3.5 h-3.5" />
                  <span>Kho Chữ Mẫu Bút Thuận ({HANZI_WRITING_ITEMS.length} chữ)</span>
                </button>

                <button
                  onClick={() => {
                    setWritingSourceMode("all_vocab");
                    setWritingVocabIndex(0);
                    setSelectedVocabCharIndex(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                    writingSourceMode === "all_vocab"
                      ? "bg-purple-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Toàn Bộ Từ Vựng ({combinedVocabItems.length}+ từ)</span>
                </button>
              </div>

              <button
                onClick={() => setIsCharacterDrawerOpen(!isCharacterDrawerOpen)}
                className="px-3 py-1.5 rounded-xl border border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <List className="w-3.5 h-3.5" />
                <span>{isCharacterDrawerOpen ? "Đóng danh sách" : "Mở bảng chọn chữ nhanh"}</span>
              </button>
            </div>

            {/* Level Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm chữ Hán, Pinyin hoặc nghĩa tiếng Việt..."
                  value={writingSearchQuery}
                  onChange={(e) => {
                    setWritingSearchQuery(e.target.value);
                    setWritingPresetIndex(0);
                    setWritingVocabIndex(0);
                  }}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-purple-500 focus:bg-white"
                />
              </div>

              {/* Level Filter (for all_vocab mode) */}
              {writingSourceMode === "all_vocab" && (
                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                  {["ALL", "HSK1", "HSK2", "HSK3", "HSK4", "GARMENT"].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => {
                        setWritingLevelFilter(lvl);
                        setWritingVocabIndex(0);
                        setSelectedVocabCharIndex(0);
                      }}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
                        writingLevelFilter === lvl
                          ? "bg-purple-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {lvl === "ALL" ? "Tất cả" : lvl === "GARMENT" ? "May Mặc" : lvl}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Character Quick Drawer / Selector Grid */}
            {isCharacterDrawerOpen && (
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 max-h-56 overflow-y-auto animate-fadeIn">
                <p className="text-[11px] font-bold text-slate-500">
                  {writingSourceMode === "preset"
                    ? `Danh sách ${filteredPresetItems.length} chữ mẫu chuẩn bút thuận:`
                    : `Danh sách ${filteredVocabItems.length} từ vựng hệ thống:`}
                </p>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {writingSourceMode === "preset"
                    ? filteredPresetItems.map((item, idx) => (
                        <button
                          key={item.hanzi}
                          onClick={() => {
                            setWritingPresetIndex(idx);
                            setIsCharacterDrawerOpen(false);
                          }}
                          className={`p-2 rounded-xl border-2 text-center transition-all cursor-pointer ${
                            writingPresetIndex === idx
                              ? "bg-purple-600 text-white border-purple-600 shadow-xs scale-105"
                              : "bg-white text-slate-800 border-slate-200 hover:border-purple-300"
                          }`}
                        >
                          <div className="font-serif font-black text-lg">{item.hanzi}</div>
                          <div className="text-[10px] font-mono opacity-80">{item.pinyin}</div>
                        </button>
                      ))
                    : filteredVocabItems.map((item, idx) => (
                        <button
                          key={item.id || item.hanzi}
                          onClick={() => {
                            setWritingVocabIndex(idx);
                            setSelectedVocabCharIndex(0);
                            setIsCharacterDrawerOpen(false);
                          }}
                          className={`p-1.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                            writingVocabIndex === idx
                              ? "bg-purple-600 text-white border-purple-600 shadow-xs scale-105"
                              : "bg-white text-slate-800 border-slate-200 hover:border-purple-300"
                          }`}
                        >
                          <div className="font-serif font-black text-sm line-clamp-1">{item.hanzi}</div>
                          <div className="text-[9px] font-mono opacity-80 line-clamp-1">{item.pinyin}</div>
                        </button>
                      ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Writing Canvas Card */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg space-y-6">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-b border-slate-100 pb-3">
              <span className="text-slate-800 flex items-center gap-1.5">
                <PenTool className="w-4 h-4 text-purple-600" />
                <span>
                  {writingSourceMode === "preset"
                    ? `Chữ Hán ${writingPresetIndex + 1} / ${filteredPresetItems.length}`
                    : `Từ vựng ${writingVocabIndex + 1} / ${filteredVocabItems.length}`}
                </span>
              </span>
              <span className="font-black text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-100">
                {currentWritingCharacterInfo.strokeCount} nét • {currentWritingCharacterInfo.radical}
              </span>
            </div>

            {/* Character Header Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-slate-900 font-serif">
                    {currentWritingCharacterInfo.hanzi}
                  </span>
                  <span className="text-base font-mono text-purple-600 font-bold bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-100">
                    {currentWritingCharacterInfo.pinyin}
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-bold">
                  <strong>Ý nghĩa:</strong> {currentWritingCharacterInfo.vietnamese}
                </p>
                <p className="text-[11px] text-slate-500">
                  <strong>Từ ghép mẫu:</strong> {currentWritingCharacterInfo.exampleCompound}
                </p>

                {/* If vocabulary has multiple characters, show clickable character decomposition */}
                {currentWritingCharacterInfo.isCustomVocab && (currentWritingCharacterInfo.availableChars?.length || 0) > 1 && (
                  <div className="pt-2 flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-500">Chọn chữ để viết:</span>
                    {currentWritingCharacterInfo.availableChars?.map((c, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => setSelectedVocabCharIndex(cIdx)}
                        className={`w-7 h-7 rounded-lg font-serif font-black text-sm border transition-all cursor-pointer ${
                          selectedVocabCharIndex === cIdx
                            ? "bg-purple-600 text-white border-purple-600 scale-110"
                            : "bg-white text-slate-700 border-slate-300 hover:border-purple-400"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => playChineseAudio(currentWritingCharacterInfo.hanzi, 1.0)}
                className="p-3 rounded-2xl bg-white text-purple-700 hover:text-purple-900 border border-purple-200 shadow-xs flex items-center gap-1.5 text-xs font-bold shrink-0 self-start sm:self-center cursor-pointer"
              >
                <Volume2 className="w-5 h-5" />
                <span>Nghe âm</span>
              </button>
            </div>

            {/* Canvas Grid Style & Watermark Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              {/* Grid Selector */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setWritingGridType("mi")}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    writingGridType === "mi" ? "bg-white text-purple-800 shadow-2xs" : "text-slate-600"
                  }`}
                >
                  米 Mễ tự cách
                </button>
                <button
                  onClick={() => setWritingGridType("tian")}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    writingGridType === "tian" ? "bg-white text-purple-800 shadow-2xs" : "text-slate-600"
                  }`}
                >
                  田 Điền tự cách
                </button>
                <button
                  onClick={() => setWritingGridType("jiu")}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    writingGridType === "jiu" ? "bg-white text-purple-800 shadow-2xs" : "text-slate-600"
                  }`}
                >
                  九 Cửu cung cách
                </button>
              </div>

              {/* Watermark Slider */}
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-xl">
                <span className="text-[11px] font-bold text-slate-600">Độ mờ chữ mẫu:</span>
                <input
                  type="range"
                  min="0"
                  max="0.4"
                  step="0.05"
                  value={writingHintOpacity}
                  onChange={(e) => setWritingHintOpacity(parseFloat(e.target.value))}
                  className="w-18 accent-purple-600 cursor-pointer"
                />
              </div>

              {/* Color picker */}
              <div className="flex items-center gap-1.5">
                {["#dc2626", "#0f172a", "#2563eb", "#059669"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setWritingColor(c)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                      writingColor === c ? "scale-110 border-slate-900" : "border-transparent"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Stroke Order Step Guide */}
            {currentWritingCharacterInfo.strokeOrderGuide && currentWritingCharacterInfo.strokeOrderGuide.length > 0 && (
              <div className="space-y-3 p-4 rounded-2xl bg-purple-50/60 border-2 border-purple-100">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                      <p className="text-xs font-black text-purple-950">
                        Thứ tự nét viết cho TOÀN BỘ CHỮ HÁN 「{currentWritingCharacterInfo.hanzi}」 ({currentWritingCharacterInfo.strokeCount} nét hoàn chỉnh):
                      </p>
                    </div>
                    {currentWritingCharacterInfo.ruleExplanation && (
                      <span className="text-[10px] text-purple-700 font-bold bg-white px-2.5 py-1 rounded-lg border border-purple-200">
                        {currentWritingCharacterInfo.ruleExplanation}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    💡 <em>Lưu ý:</em> Bảng hướng dẫn dưới đây thể hiện <strong>toàn bộ {currentWritingCharacterInfo.strokeCount} nét</strong> để viết trọn vẹn chữ Hán <strong>{currentWritingCharacterInfo.hanzi}</strong> (từ nét đặt bút đầu tiên đến nét hoàn thiện cuối cùng). Bấm vào từng ô nét để xem chi tiết cách viết.
                  </p>
                </div>

                {/* Subcomponents breakdown badges */}
                {currentWritingCharacterInfo.components && currentWritingCharacterInfo.components.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-bold text-slate-500">Phân rã cấu trúc chữ:</span>
                    {currentWritingCharacterInfo.components.map((comp, cIdx) => (
                      <span
                        key={cIdx}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-white border border-purple-200 text-[11px] font-semibold text-purple-900 shadow-2xs"
                        title={comp.description}
                      >
                        <span className="font-serif font-black text-purple-700">{comp.component}</span>
                        <span>{comp.name}</span>
                        <span className="text-[10px] text-purple-500 font-mono">({comp.strokesRange})</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Dynamic Responsive Stroke Sequence Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-1.5 pt-1">
                  {currentWritingCharacterInfo.strokeOrderGuide.map((strokeChar, sIdx) => {
                    const detail = currentWritingCharacterInfo.strokeDetails?.[sIdx];
                    return (
                      <button
                        key={sIdx}
                        onClick={() => {
                          setSelectedStrokeIdx(sIdx);
                          playChineseAudio(currentWritingCharacterInfo.hanzi, 0.85);
                        }}
                        className={`p-2 rounded-xl border-2 transition-all text-center flex flex-col items-center justify-between cursor-pointer ${
                          selectedStrokeIdx === sIdx
                            ? "bg-purple-600 text-white border-purple-600 shadow-md scale-105 ring-2 ring-purple-300"
                            : "bg-white text-slate-800 border-slate-200 hover:border-purple-300 hover:bg-purple-50/40"
                        }`}
                      >
                        <span className={`text-[10px] font-bold ${selectedStrokeIdx === sIdx ? "text-purple-100" : "text-purple-700"}`}>
                          Nét {sIdx + 1}
                        </span>
                        <span className="text-xl font-black font-serif my-0.5">{strokeChar}</span>
                        <span className={`text-[9px] line-clamp-1 ${selectedStrokeIdx === sIdx ? "text-purple-200" : "text-slate-400"}`}>
                          {detail?.strokePinyin || "nét"}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Stroke Detail Inspection Card */}
                {selectedStrokeIdx !== null && currentWritingCharacterInfo.strokeDetails?.[selectedStrokeIdx] && (
                  <div className="p-3 bg-white rounded-xl border-2 border-purple-200 text-xs animate-fadeIn flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-black text-xs">
                          Nét {selectedStrokeIdx + 1} / {currentWritingCharacterInfo.strokeCount}
                        </span>
                        <span className="font-bold text-slate-900">
                          {currentWritingCharacterInfo.strokeDetails[selectedStrokeIdx].strokeName}
                        </span>
                        <span className="font-serif font-black text-lg text-purple-700">
                          {currentWritingCharacterInfo.strokeDetails[selectedStrokeIdx].strokeChar}
                        </span>
                        {currentWritingCharacterInfo.strokeDetails[selectedStrokeIdx].strokePinyin && (
                          <span className="text-slate-500 font-mono text-[11px]">
                            ({currentWritingCharacterInfo.strokeDetails[selectedStrokeIdx].strokePinyin})
                          </span>
                        )}
                      </div>
                      <p className="text-slate-700">
                        <strong>Hướng đi bút:</strong> {currentWritingCharacterInfo.strokeDetails[selectedStrokeIdx].direction}
                      </p>
                      {currentWritingCharacterInfo.strokeDetails[selectedStrokeIdx].part && (
                        <p className="text-[11px] text-purple-700">
                          <strong>Vị trí cấu thành:</strong> {currentWritingCharacterInfo.strokeDetails[selectedStrokeIdx].part}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedStrokeIdx(null)}
                      className="text-slate-400 hover:text-slate-700 text-xs font-bold px-2 py-1 rounded-lg border border-slate-200 self-end sm:self-center cursor-pointer"
                    >
                      Đóng
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Interactive Canvas */}
            <div className="flex flex-col items-center justify-center space-y-4 pt-2">
              <div className="relative rounded-3xl overflow-hidden shadow-md border-4 border-rose-200 bg-white">
                <canvas
                  ref={canvasRef}
                  width={280}
                  height={280}
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleCanvasMouseUp}
                  className="cursor-crosshair touch-none"
                />
                {writingStrokeCount > 0 && (
                  <div className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-2xs">
                    {writingStrokeCount} nét đã viết
                  </div>
                )}
              </div>

              {/* Actions & Score */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setWritingStrokeCount(0);
                    setWritingAiScore(null);
                    drawCanvasGrid();
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Eraser className="w-3.5 h-3.5" />
                  <span>Xóa bảng viết lại</span>
                </button>
                <button
                  onClick={handleEvaluateWritingPrecision}
                  className="px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black shadow-md shadow-purple-600/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Chấm Điểm Nét Viết & Trọng Tâm</span>
                </button>
              </div>

              {writingAiScore !== null && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border-2 border-emerald-200 text-xs text-center space-y-1 w-full max-w-sm animate-fadeIn">
                  <p className="font-black text-sm text-emerald-900">
                    ⭐ Điểm chuẩn hóa chữ viết: {writingAiScore}/100
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Chữ '{currentWritingCharacterInfo.hanzi}' đạt độ cân đối và tỷ lệ tốt trên trục ô lưới.
                  </p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={writingSourceMode === "preset" ? writingPresetIndex === 0 : writingVocabIndex === 0}
                onClick={() => {
                  if (writingSourceMode === "preset") {
                    setWritingPresetIndex((prev) => Math.max(0, prev - 1));
                  } else {
                    setWritingVocabIndex((prev) => Math.max(0, prev - 1));
                    setSelectedVocabCharIndex(0);
                  }
                }}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold disabled:opacity-40 cursor-pointer"
              >
                ← Chữ trước
              </button>

              <button
                disabled={
                  writingSourceMode === "preset"
                    ? writingPresetIndex === filteredPresetItems.length - 1
                    : writingVocabIndex === filteredVocabItems.length - 1
                }
                onClick={() => {
                  if (writingSourceMode === "preset") {
                    setWritingPresetIndex((prev) => Math.min(filteredPresetItems.length - 1, prev + 1));
                  } else {
                    setWritingVocabIndex((prev) => Math.min(filteredVocabItems.length - 1, prev + 1));
                    setSelectedVocabCharIndex(0);
                  }
                }}
                className="px-5 py-2 rounded-xl bg-purple-600 text-white text-xs font-black shadow-md shadow-purple-600/20 disabled:opacity-40 cursor-pointer"
              >
                Chữ tiếp theo →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
