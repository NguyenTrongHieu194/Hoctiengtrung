import React, { useState, useRef, useMemo } from"react";
import {
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Check,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Mic,
  MicOff,
  Flame,
  Award,
  BookOpen,
  Music,
  Wind,
  Search,
  ChevronRight,
  ArrowRight,
  Layers,
  CheckCircle2,
  XCircle,
  ListFilter,
  Headphones,
  Eye
} from "lucide-react";
import {
  PINYIN_INITIALS,
  PINYIN_FINALS,
  PINYIN_TONES,
  TONE_CHANGE_RULES,
  TONE_DRILLS,
  MINIMAL_PAIRS_DRILLS,
  TONE_SANDHI_DRILLS,
  TONGUE_TWISTERS,
  COMMON_PINYIN_SYLLABLES,
  PinyinInitialItem,
  PinyinFinalItem,
  PinyinToneItem,
  ToneRuleItem,
  MinimalPairDrill,
  TongueTwisterItem
} from "../data/pinyin";
import { playChineseAudio, createSpeechRecognizer, VoiceAudioRecorder } from "../services/speechService";
import { getMixerSyllableData, VALID_PINYIN_MATRIX } from "../utils/pinyinEngine";
import { UserProgressData } from "../types";
import { ScrollableTabs } from "./ScrollableTabs";
import { PinyinDetailModal } from "./PinyinDetailModal";

interface PinyinPracticeViewProps {
  userProgress?: UserProgressData;
  onRecordPractice?: (xpGained: number) => void;
}

type PinyinMainTab ="tones" |"initials" |"finals" |"mixer" |"drills" |"twisters";

export const PinyinPracticeView: React.FC<PinyinPracticeViewProps> = ({
  userProgress,
  onRecordPractice
}) => {
  const [activeTab, setActiveTab] = useState<PinyinMainTab>("tones");
  const [audioSpeed, setAudioSpeed] = useState<1.0 | 0.75>(1.0);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  // Trạng thái từ vựng ví dụ được ấn chọn bởi người dùng
  const [selectedExampleWord, setSelectedExampleWord] = useState<string | null>(null);

  // Detail Modal for Pinyin (Tones / Initials / Finals)
  const [pinyinDetailModal, setPinyinDetailModal] = useState<{
    isOpen: boolean;
    type: "initial" | "final" | "tone";
    id?: string;
    toneNumber?: number;
  } | null>(null);

  // Helper to play audio with visual state
  const handlePlayAudio = async (text: string, speedOverride?: number, phoneticHint?: string) => {
    setCurrentlyPlaying(text);
    try {
      await playChineseAudio(text, speedOverride || audioSpeed, phoneticHint);
    } catch (e) {
      console.error(e);
    } finally {
      setCurrentlyPlaying(null);
    }
  };

  // Helper chọn từ vựng minh họa & phát âm thanh
  const handleSelectExampleWord = (wordText: string, speedOverride?: number, phoneticHint?: string) => {
    setSelectedExampleWord(wordText);
    handlePlayAudio(wordText, speedOverride, phoneticHint);
  };

  // =========================================================================
  // 1. STATE: THANH ĐIỆU (TONES)
  // =========================================================================
  const [selectedToneNum, setSelectedToneNum] = useState<number>(1);
  const [activeToneSubTab, setActiveToneSubTab] = useState<"tones" | "rules">("tones");
  const [selectedRuleId, setSelectedRuleId] = useState<string>(TONE_CHANGE_RULES[0].id);

  // =========================================================================
  // 2. STATE: THANH MẪU (INITIALS)
  // =========================================================================
  const [selectedInitialId, setSelectedInitialId] = useState<string>("b");
  const [initialFilterGroup, setInitialFilterGroup] = useState<string>("all");
  const [initialSearchQuery, setInitialSearchQuery] = useState("");

  const filteredInitials = useMemo(() => {
    return PINYIN_INITIALS.filter((item) => {
      const matchGroup = initialFilterGroup === "all" || item.group === initialFilterGroup;
      const matchSearch =
        item.initial.toLowerCase().includes(initialSearchQuery.toLowerCase()) ||
        item.groupName.toLowerCase().includes(initialSearchQuery.toLowerCase()) ||
        item.vietnameseApproximation.toLowerCase().includes(initialSearchQuery.toLowerCase());
      return matchGroup && matchSearch;
    });
  }, [initialFilterGroup, initialSearchQuery]);

  const activeInitial = useMemo(() => {
    return PINYIN_INITIALS.find((i) => i.id === selectedInitialId) || PINYIN_INITIALS[0];
  }, [selectedInitialId]);

  // =========================================================================
  // 3. STATE: VẬN MẪU (FINALS)
  // =========================================================================
  const [selectedFinalId, setSelectedFinalId] = useState<string>("a");
  const [finalFilterCategory, setFinalFilterCategory] = useState<string>("all");
  const [finalSearchQuery, setFinalSearchQuery] = useState("");

  const filteredFinals = useMemo(() => {
    return PINYIN_FINALS.filter((item) => {
      const matchCategory = finalFilterCategory === "all" || item.category === finalFilterCategory;
      const matchSearch =
        item.final.toLowerCase().includes(finalSearchQuery.toLowerCase()) ||
        item.categoryName.toLowerCase().includes(finalSearchQuery.toLowerCase()) ||
        item.vietnameseApproximation.toLowerCase().includes(finalSearchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [finalFilterCategory, finalSearchQuery]);

  const activeFinal = useMemo(() => {
    return PINYIN_FINALS.find((f) => f.id === selectedFinalId) || PINYIN_FINALS[0];
  }, [selectedFinalId]);

  // =========================================================================
  // 4. STATE: SYLLABLE MIXER (GHÉP ÂM PINYIN)
  // =========================================================================
  const [mixerInitial, setMixerInitial] = useState<string>("b");
  const [mixerFinal, setMixerFinal] = useState<string>("a");
  const [mixerTone, setMixerTone] = useState<1 | 2 | 3 | 4>(1);

  // Valid finals for the currently selected initial
  const validFinalsForInitial = useMemo(() => {
    return VALID_PINYIN_MATRIX[mixerInitial] || [];
  }, [mixerInitial]);

  // Generate constructed Pinyin syllable with accurate Hanzi mapping and tone placement
  const currentMixerDisplay = useMemo(() => {
    return getMixerSyllableData(mixerInitial, mixerFinal, mixerTone);
  }, [mixerInitial, mixerFinal, mixerTone]);

  // =========================================================================
  // 5. STATE: BÀI TẬP NHỎ & TRẮC NGHIỆM (DRILLS)
  // =========================================================================
  const [drillMode, setDrillMode] = useState<"tone_listen" |"minimal_pairs" |"sandhi_rules">("tone_listen");

  // A. Tone Listen Drill State
  const [toneDrillIdx, setToneDrillIdx] = useState(0);
  const [selectedToneAnswer, setSelectedToneAnswer] = useState<number | null>(null);
  const [toneDrillScore, setToneDrillScore] = useState(0);
  const [isToneAnswerSubmitted, setIsToneAnswerSubmitted] = useState(false);

  // B. Minimal Pairs Drill State
  const [pairCategoryIdx, setPairCategoryIdx] = useState(0);
  const [pairQuestionIdx, setPairQuestionIdx] = useState(0);
  const [selectedPairOption, setSelectedPairOption] = useState<number | null>(null);
  const [isPairSubmitted, setIsPairSubmitted] = useState(false);
  const [pairScore, setPairScore] = useState(0);

  // C. Sandhi Drill State
  const [sandhiIdx, setSandhiIdx] = useState(0);
  const [selectedSandhiOption, setSelectedSandhiOption] = useState<string | null>(null);
  const [isSandhiSubmitted, setIsSandhiSubmitted] = useState(false);
  const [sandhiScore, setSandhiScore] = useState(0);

  // =========================================================================
  // 6. STATE: TONGUE TWISTERS & SPEECH EVALUATION
  // =========================================================================
  const [twisterIdx, setTwisterIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState("");
  const [speechFeedback, setSpeechFeedback] = useState<{
    score: number;
    matchText: string;
    comment: string;
  } | null>(null);
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);
  const [userAudioProgress, setUserAudioProgress] = useState(0);
  const recognizerRef = useRef<any>(null);
  const voiceRecorderRef = useRef<VoiceAudioRecorder | null>(null);
  const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const activeTwister = TONGUE_TWISTERS[twisterIdx];

  const handleStartSpeechRecording = async () => {
    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
      userAudioPlayerRef.current = null;
    }
    setIsPlayingUserAudio(false);
    setUserAudioProgress(0);
    setUserAudioUrl(null);
    setSpeechFeedback(null);
    setSpokenTranscript("");
    setIsRecording(true);

    const recorder = new VoiceAudioRecorder();
    voiceRecorderRef.current = recorder;
    await recorder.start();

    const recognizer = createSpeechRecognizer(
      async (text: string) => {
        setSpokenTranscript(text);
        setIsRecording(false);
        const recorded = await voiceRecorderRef.current?.stop();
        if (recorded) {
          setUserAudioUrl(recorded.url);
        }
        evaluateTwisterSpeech(text, activeTwister);
      },
      async (err: string) => {
        console.warn("Speech error:", err);
        setIsRecording(false);
        const recorded = await voiceRecorderRef.current?.stop();
        if (recorded) {
          setUserAudioUrl(recorded.url);
        }
      },
      async () => {
        setIsRecording(false);
        const recorded = await voiceRecorderRef.current?.stop();
        if (recorded) {
          setUserAudioUrl(recorded.url);
        }
      }
    );

    if (recognizer) {
      recognizerRef.current = recognizer;
      recognizer.start();
    } else {
      setIsRecording(false);
      alert("Trình duyệt không hỗ trợ nhận diện giọng nói hoặc chưa cấp quyền Micro.");
    }
  };

  const handleStopSpeechRecording = async () => {
    if (recognizerRef.current) {
      recognizerRef.current.stop();
    }
    setIsRecording(false);
    const recorded = await voiceRecorderRef.current?.stop();
    if (recorded) {
      setUserAudioUrl(recorded.url);
    }
  };

  const handleTogglePlayUserAudio = () => {
    if (!userAudioUrl) return;

    if (!userAudioPlayerRef.current || userAudioPlayerRef.current.src !== userAudioUrl) {
      if (userAudioPlayerRef.current) {
        userAudioPlayerRef.current.pause();
      }
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
      }).catch((e) => {
        console.warn("User audio playback error:", e);
        setIsPlayingUserAudio(false);
      });
    }
  };

  const evaluateTwisterSpeech = (transcript: string, twister: TongueTwisterItem) => {
    const target = twister.hanziLines.join("").replace(/[，。；？！\s]/g,"");
    const spoken = transcript.replace(/[，。；？！\s]/g,"");

    // Calculate basic char overlap
    let matchCount = 0;
    for (const char of spoken) {
      if (target.includes(char)) {
        matchCount++;
      }
    }
    const score = Math.min(100, Math.round((matchCount / Math.max(1, spoken.length)) * 100));

    let comment ="Phát âm rất chuẩn xác và rõ ràng!";
    if (score < 60) {
      comment ="Cần chú ý uốn lưỡi / bật hơi đúng nhịp và nói dứt khoát hơn nhé!";
    } else if (score < 85) {
      comment ="Khá tốt! Luyện thêm tốc độ để âm điệu mượt mà hơn.";
    }

    setSpeechFeedback({
      score: Math.max(50, score),
      matchText: transcript,
      comment
    });

    if (onRecordPractice) {
      onRecordPractice(15);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16 w-full max-w-full overflow-hidden">
      {/* ------------------------------------------------------------------- */}
      {/* HERO BANNER: PINYIN MASTERY CENTER */}
      {/* ------------------------------------------------------------------- */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-5 sm:p-8 shadow-xl w-full max-w-full">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wider text-blue-100 uppercase border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Chuyên Mục Ngữ Âm Toàn Diện</span>
            </div>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-xs">
              Luyện Phát Âm Pinyin Chuẩn Quốc Tế
            </h1>
            <p className="text-xs sm:text-base text-blue-100 leading-relaxed">
              Làm chủ trọn bộ <strong>4 Thanh điệu & Biến điệu</strong>, <strong>23 Thanh mẫu</strong>,{""}
              <strong>36 Vận mẫu</strong> cùng các bài tập nhỏ phân biệt cặp âm dễ nhầm và líu lưỡi thực chiến.
            </p>
          </div>

          {/* Quick Metrics / Speed Control */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md p-2.5 sm:p-3.5 rounded-2xl border border-white/20 shrink-0">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-200" />
              <span className="text-xs font-medium text-blue-100">Tốc độ phát âm:</span>
            </div>
            <div className="inline-flex p-1 bg-black/20 rounded-xl">
              <button
                onClick={() => setAudioSpeed(1.0)}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  audioSpeed === 1.0
                    ?"bg-white text-blue-800 shadow-xs"
                    :"text-white/80 hover:text-white"
                }`}
              >
                1.0x (Chuẩn)
              </button>
              <button
                onClick={() => setAudioSpeed(0.75)}
                className={`px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  audioSpeed === 0.75
                    ?"bg-white text-blue-800 shadow-xs"
                    :"text-white/80 hover:text-white"
                }`}
              >
                0.75x (Chậm)
              </button>
            </div>
          </div>
        </div>

        {/* Decorative background art */}
        <div className="absolute -right-8 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-1/3 -top-10 w-48 h-48 bg-sky-400/20 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* MAIN NAVIGATION TABS */}
      {/* ------------------------------------------------------------------- */}
      <ScrollableTabs
        hintText="Trượt xem 6 mục Pinyin"
        pillColor="blue"
        containerClassName="border-b border-slate-200 pb-1"
      >
        {[
          { id: "tones", label: "1. Thanh Điệu (Tones)", icon: Music, badge: "4 Thanh + Sandhi" },
          { id: "initials", label: "2. Thanh Mẫu (Initials)", icon: Wind, badge: "23 Âm đầu" },
          { id: "finals", label: "3. Vận Mẫu (Finals)", icon: Layers, badge: "36 Vần" },
          { id: "mixer", label: "4. Ghép Vần Pinyin", icon: BookOpen, badge: "Matrix" },
          { id: "drills", label: "5. Bài Tập Nhỏ", icon: Award, badge: "Luyện nghe" },
          { id: "twisters", label: "6. Líu Lưỡi (绕口令)", icon: Flame, badge: "Luyện giọng" }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as PinyinMainTab)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 border select-none active:scale-95 duration-100 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 border-blue-600 ring-2 ring-blue-400/30"
                  : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200/90 shadow-2xs"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-blue-500"}`} />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </ScrollableTabs>

      {/* =================================================================== */}
      {/* TAB 1: THANH ĐIỆU (TONES) & QUY TẮC BIẾN ĐIỆU */}
      {/* =================================================================== */}
      {activeTab ==="tones" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Sub Tab Switcher: 4 Thanh Chính vs Quy Tắc Biến Điệu */}
          <div className="flex items-center justify-between gap-4 flex-wrap bg-white  p-2 rounded-2xl border border-slate-200  shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveToneSubTab("tones")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer select-none active:scale-95 duration-100 ${
                  activeToneSubTab ==="tones"
                    ?"bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/30"
                    :"text-slate-600  hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                4 Thanh Điệu Chính + Khinh Thanh
              </button>
              <button
                onClick={() => setActiveToneSubTab("rules")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer select-none active:scale-95 duration-100 ${
                  activeToneSubTab ==="rules"
                    ?"bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/30"
                    :"text-slate-600  hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                6 Quy Tắc Biến Điệu Cốt Lõi (Tone Sandhi)
              </button>
            </div>
          </div>

          {activeToneSubTab ==="tones" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: 4 Tone Selector Cards */}
              <div className="lg:col-span-5 space-y-3">
                <h3 className="text-sm font-bold text-slate-500  uppercase tracking-wider px-1">
                  Chọn thanh điệu để phân tích:
                </h3>
                {PINYIN_TONES.map((tone) => {
                  const isSelected = selectedToneNum === tone.toneNumber;
                  return (
                    <div
                      key={tone.toneNumber}
                      onClick={() => {
                        setSelectedToneNum(tone.toneNumber);
                        setPinyinDetailModal({
                          isOpen: true,
                          type: "tone",
                          toneNumber: tone.toneNumber
                        });
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative interactive-card active:scale-95 ${
                        isSelected
                          ? "bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/20 shadow-md"
                          : "bg-white border-slate-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shadow-xs ${
                              isSelected
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {tone.toneNumber === 0 ? "•" : tone.toneNumber}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-slate-800 text-base">
                                {tone.name}
                              </h4>
                              <span className="text-xs text-blue-600 font-semibold">
                                {tone.chineseName}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Cao độ: <strong className="text-slate-700">{tone.pitchContour}</strong> • Ký hiệu: {tone.symbol}
                            </p>
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center gap-1.5">
                          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100">
                            <Eye className="w-3 h-3" /> Chi tiết
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayAudio(tone.audioSample);
                            }}
                            className="p-2.5 rounded-xl bg-blue-100/70 text-blue-600 hover:bg-blue-200 transition-all cursor-pointer active:scale-90"
                            title="Nghe phát âm mẫu"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Detailed Tone Visualizer & Guide */}
              {(() => {
                const currentTone =
                  PINYIN_TONES.find((t) => t.toneNumber === selectedToneNum) || PINYIN_TONES[0];
                return (
                  <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                          Chi tiết thanh âm
                        </span>
                        <h3 className="text-2xl font-black text-slate-900 mt-1">
                          {currentTone.name} ({currentTone.chineseName})
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          {currentTone.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            setPinyinDetailModal({
                              isOpen: true,
                              type: "tone",
                              toneNumber: currentTone.toneNumber
                            })
                          }
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 text-xs font-bold transition-all cursor-pointer active:scale-95 shrink-0"
                          title="Bật cửa sổ xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline">Cửa sổ chi tiết</span>
                        </button>
                        <button
                          onClick={() => handlePlayAudio(currentTone.audioSample)}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer active:scale-95"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>Nghe âm mẫu</span>
                        </button>
                      </div>
                    </div>

                    {/* Pitch Diagram Visualizer (5-Level Pitch Scale) */}
                    <div className="bg-slate-50  rounded-2xl p-5 border border-slate-200/80">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Sơ đồ cao độ 5 bậc thanh điệu (Chao Yuen-ren 5-Level Pitch)
                        </span>
                        <span className="text-xs font-extrabold text-blue-600  bg-blue-100  px-2.5 py-1 rounded-full">
                          Mô hình: {currentTone.pitchContour}
                        </span>
                      </div>

                      {/* Visual Pitch Graph representation */}
                      <div className="relative h-28 w-full bg-white  rounded-xl border border-slate-200  p-3 flex flex-col justify-between overflow-hidden">
                        {/* 5 Levels lines */}
                        {[5, 4, 3, 2, 1].map((lvl) => (
                          <div key={lvl} className="flex items-center gap-3 text-[10px] text-slate-400">
                            <span className="w-4 font-mono font-bold">{lvl}</span>
                            <div className="grow border-b border-dashed border-slate-200" />
                          </div>
                        ))}

                        {/* Tone Curve Overlay */}
                        <div className="absolute inset-y-0 left-12 right-6 flex items-center pointer-events-none">
                          {currentTone.toneNumber === 1 && (
                            <div className="w-full h-1 bg-red-500 rounded-full shadow-md shadow-red-500/40 relative top-[-36px] flex items-center justify-end">
                              <span className="absolute right-0 top-2 text-[10px] font-bold text-red-500">
                                5-5 Cao & Ngang
                              </span>
                            </div>
                          )}
                          {currentTone.toneNumber === 2 && (
                            <div
                              className="w-full h-1 bg-emerald-500 rounded-full shadow-md shadow-emerald-500/40 relative origin-left transform -rotate-12 flex items-center justify-end"
                              style={{ top:"4px" }}
                            >
                              <span className="absolute right-0 -top-4 text-[10px] font-bold text-emerald-600">
                                3 → 5 Vút Lên
                              </span>
                            </div>
                          )}
                          {currentTone.toneNumber === 3 && (
                            <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                              <path
                                d="M 10 50 Q 150 95 290 30"
                                fill="none"
                                stroke="#f59e0b"
                                strokeWidth="4"
                                strokeLinecap="round"
                              />
                              <text x="230" y="25" fill="#f59e0b" fontSize="12" fontWeight="bold">
                                2 → 1 → 4
                              </text>
                            </svg>
                          )}
                          {currentTone.toneNumber === 4 && (
                            <div
                              className="w-full h-1 bg-purple-500 rounded-full shadow-md shadow-purple-500/40 relative origin-left transform rotate-14 flex items-center justify-end"
                              style={{ top:"-6px" }}
                            >
                              <span className="absolute right-0 top-3 text-[10px] font-bold text-purple-600">
                                5 → 1 Rơi Nhanh
                              </span>
                            </div>
                          )}
                          {currentTone.toneNumber === 0 && (
                            <div className="w-full flex items-center justify-center">
                              <span className="w-3 h-3 rounded-full bg-slate-400  animate-pulse" />
                              <span className="text-xs font-semibold text-slate-500 ml-2">
                                Âm lướt ngắn & nhẹ
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Pronunciation & Vietnamese Approximation Guide */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-amber-50/80  border border-amber-200/80">
                        <div className="flex items-center gap-2 text-amber-700  font-bold text-xs mb-1.5 uppercase">
                          <HelpCircle className="w-4 h-4" />
                          <span>Mẹo phát âm theo tiếng Việt</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700  leading-relaxed font-medium">
                          {currentTone.vietnameseApproximation}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-blue-50/80  border border-blue-200/80">
                        <div className="flex items-center gap-2 text-blue-700  font-bold text-xs mb-1.5 uppercase">
                          <Wind className="w-4 h-4" />
                          <span>Bí quyết điều khiển luồng hơi</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700  leading-relaxed font-medium">
                          {currentTone.pronunciationGuide}
                        </p>
                      </div>
                    </div>

                    {/* Vowel Examples Chart */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-500  uppercase tracking-wider mb-2.5">
                        Dấu thanh trên 6 nguyên âm đơn (Click để nghe):
                      </h4>
                      <div className="grid grid-cols-6 gap-2">
                        {Object.entries(currentTone.vowelExamples).map(([v, marked]) => (
                          <button
                            key={v}
                            onClick={() => handlePlayAudio(marked)}
                            className="p-3 rounded-xl bg-slate-50  hover:bg-blue-100  border border-slate-200  text-center transition-all cursor-pointer group"
                          >
                            <span className="block text-lg font-black text-slate-800  group-hover:text-blue-600">
                              {marked}
                            </span>
                            <span className="block text-[10px] text-slate-400 mt-0.5">({v})</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Vocabulary Example Cards */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-500  uppercase tracking-wider mb-2.5">
                        Từ vựng mẫu ứng dụng:
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {currentTone.syllableExamples.map((item, idx) => {
                          const isSelected = selectedExampleWord === item.hanzi;
                          const isPlaying = currentlyPlaying === item.hanzi;
                          return (
                            <div
                              key={idx}
                              onClick={() => handleSelectExampleWord(item.hanzi)}
                              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between active:scale-95 duration-150 select-none group ${
                                isSelected
                                  ? "bg-blue-50/95 border-blue-500 ring-2 ring-blue-500/30 shadow-md scale-[1.02]"
                                  : "bg-white border-slate-200 hover:border-blue-400 hover:shadow-xs"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`text-2xl font-black transition-colors ${
                                  isSelected ? "text-blue-700" : "text-slate-900 group-hover:text-blue-600"
                                }`}>
                                  {item.hanzi}
                                </span>
                                {isPlaying ? (
                                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-black animate-pulse shadow-2xs">
                                    <Volume2 className="w-3 h-3 animate-bounce" />
                                    <span>Đang đọc</span>
                                  </span>
                                ) : isSelected ? (
                                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[9px] font-bold border border-blue-200">
                                    <Volume2 className="w-3 h-3 text-blue-600" />
                                    <span>Đã chọn</span>
                                  </span>
                                ) : (
                                  <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                )}
                              </div>
                              <div className="mt-2">
                                <div className="text-xs font-bold text-blue-600 font-mono">
                                  {item.pinyin}
                                </div>
                                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                                  {item.meaning}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Sub Tab: 6 Quy Tắc Biến Điệu Cốt Lõi */}
          {activeToneSubTab ==="rules" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TONE_CHANGE_RULES.map((rule) => {
                  const isSelected = selectedRuleId === rule.id;
                  return (
                    <div
                      key={rule.id}
                      onClick={() => setSelectedRuleId(rule.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ?"bg-blue-50/80  border-blue-500 ring-2 ring-blue-500/20 shadow-md"
                          :"bg-white  border-slate-200  hover:border-blue-300"
                      }`}
                    >
                      <div>
                        <h4 className="font-extrabold text-slate-800  text-base">
                          {rule.title}
                        </h4>
                        <div className="my-2.5 px-3 py-1.5 rounded-xl bg-slate-100  text-xs font-mono font-bold text-blue-600  inline-block">
                          {rule.ruleFormula}
                        </div>
                        <p className="text-xs text-slate-500  line-clamp-2">
                          {rule.explanation}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-100  flex items-center justify-between text-xs font-bold text-blue-600">
                        <span>Xem ví dụ & phát âm</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Rule Interactive Detail Panel */}
              {(() => {
                const rule =
                  TONE_CHANGE_RULES.find((r) => r.id === selectedRuleId) || TONE_CHANGE_RULES[0];
                return (
                  <div className="bg-white  rounded-3xl p-6 sm:p-8 border border-slate-200  shadow-sm space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100  pb-5">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                          Quy tắc biến điệu chi tiết
                        </span>
                        <h3 className="text-2xl font-black text-slate-900  mt-1">
                          {rule.title}
                        </h3>
                        <div className="mt-2 px-3.5 py-1.5 bg-blue-50  rounded-xl font-mono text-sm font-bold text-blue-700  inline-block border border-blue-200">
                          {rule.ruleFormula}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-slate-50  border border-slate-200  space-y-1">
                        <span className="text-xs font-bold text-slate-500  uppercase">
                          Giải thích ngôn ngữ học:
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700  leading-relaxed whitespace-pre-line">
                          {rule.explanation}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-amber-50/70  border border-amber-200  space-y-1">
                        <span className="text-xs font-bold text-amber-700  uppercase">
                          Mẹo nhớ thực tế:
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700  leading-relaxed font-medium">
                          {rule.practicalTips}
                        </p>
                      </div>
                    </div>

                    {/* Interactive Audio Examples */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-500  uppercase tracking-wider mb-3">
                        Từ vựng minh họa (Click để nghe biến âm):
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {rule.examples.map((item, idx) => {
                          const isSelected = selectedExampleWord === item.originalHanzi;
                          const isPlaying = currentlyPlaying === item.audio || currentlyPlaying === item.originalHanzi;
                          return (
                            <div
                              key={idx}
                              onClick={() => handleSelectExampleWord(item.originalHanzi, undefined, item.actualPronunciation)}
                              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 group active:scale-95 duration-150 select-none ${
                                isSelected
                                  ? "bg-blue-50/95 border-blue-500 ring-2 ring-blue-500/30 shadow-md scale-[1.02]"
                                  : "bg-white border-slate-200 hover:border-blue-500 hover:shadow-xs"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`text-2xl font-black transition-colors ${
                                  isSelected ? "text-blue-700" : "text-slate-900 group-hover:text-blue-600"
                                }`}>
                                  {item.originalHanzi}
                                </span>
                                {isPlaying ? (
                                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-black animate-pulse shadow-2xs">
                                    <Volume2 className="w-3 h-3 animate-bounce" />
                                    <span>Đang đọc</span>
                                  </span>
                                ) : isSelected ? (
                                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[9px] font-bold border border-blue-200">
                                    <Volume2 className="w-3 h-3 text-blue-600" />
                                    <span>Đã chọn</span>
                                  </span>
                                ) : (
                                  <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                )}
                              </div>
                              <div className="space-y-0.5">
                                <div className="text-xs text-slate-400 line-through">
                                  Gốc: {item.originalPinyin}
                                </div>
                                <div className="text-sm font-bold text-emerald-600">
                                  Đọc là: {item.actualPronunciation}
                                </div>
                                <div className="text-xs text-slate-600">
                                  {item.meaning}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: THANH MẪU (INITIALS - 23 ÂM ĐẦU) */}
      {/* =================================================================== */}
      {activeTab ==="initials" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white  p-4 rounded-2xl border border-slate-200  shadow-xs">
            {/* Category Filter Pills */}
            <ScrollableTabs hintText="Trượt xem 8 nhóm âm" pillColor="blue" className="w-full sm:w-auto">
              {[
                { id:"all", label:"Tất cả (23)" },
                { id:"lip", label:"Âm Môi (b,p,m,f)" },
                { id:"tongue_tip", label:"Đầu Lưỡi (d,t,n,l)" },
                { id:"tongue_root", label:"Cuống Lưỡi (g,k,h)" },
                { id:"tongue_surface", label:"Mặt Lưỡi (j,q,x)" },
                { id:"flat_tongue", label:"Thẳng Lưỡi (z,c,s)" },
                { id:"retroflex", label:"Uốn Lưỡi (zh,ch,sh,r)" },
                { id:"special", label:"Đặc biệt (y,w)" }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setInitialFilterGroup(pill.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                    initialFilterGroup === pill.id
                      ?"bg-blue-600 text-white border-blue-600 shadow-xs"
                      :"bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </ScrollableTabs>

            {/* Search Input */}
            <div className="relative w-full sm:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm thanh mẫu..."
                value={initialSearchQuery}
                onChange={(e) => setInitialSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50  border border-slate-200  text-slate-800  focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Grid of Initials */}
            <div className="lg:col-span-6 grid grid-cols-3 sm:grid-cols-4 gap-3">
              {filteredInitials.map((item) => {
                const isSelected = selectedInitialId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedInitialId(item.id);
                      setPinyinDetailModal({
                        isOpen: true,
                        type: "initial",
                        id: item.id
                      });
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative interactive-card active:scale-95 ${
                      isSelected
                        ? "bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/20 shadow-md"
                        : "bg-white border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    {/* Aspirated Badge */}
                    {item.isAspirated && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-amber-500 text-[9px] font-black text-white uppercase tracking-tight">
                        Bật hơi
                      </span>
                    )}

                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-slate-900">
                        {item.initial}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                        {item.groupName}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-blue-600 font-bold">
                          {item.audioExample}
                        </span>
                        <span className="text-[9px] text-slate-400 font-medium">
                          • Chi tiết
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayAudio(item.audioExample);
                        }}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-100 cursor-pointer active:scale-90 transition-all"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Detailed Pronunciation Card */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      {activeInitial.groupName}
                    </span>
                    {activeInitial.isAspirated && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500 text-[10px] font-black text-white">
                        ÂM BẬT HƠI MẠNH
                      </span>
                    )}
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 mt-1">
                    Thanh mẫu: <span className="text-blue-600">{activeInitial.initial}</span>
                  </h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setPinyinDetailModal({
                        isOpen: true,
                        type: "initial",
                        id: activeInitial.id
                      })
                    }
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 text-xs font-bold transition-all cursor-pointer active:scale-95"
                    title="Bật cửa sổ xem chi tiết"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Cửa sổ chi tiết</span>
                  </button>
                  <button
                    onClick={() => handlePlayAudio(activeInitial.audioExample)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer active:scale-95"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe âm: {activeInitial.audioExample}</span>
                  </button>
                </div>
              </div>

              {/* Explanations */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-50  border border-slate-200">
                  <span className="text-xs font-bold text-slate-500  uppercase">
                    Âm tương đương trong tiếng Việt:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800  font-semibold mt-0.5">
                    {activeInitial.vietnameseApproximation}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50/70  border border-blue-200">
                  <span className="text-xs font-bold text-blue-700  uppercase">
                    Khẩu hình miệng & Đặt vị trí lưỡi:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700  mt-0.5">
                    {activeInitial.mouthShapeDescription}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/70  border border-amber-200">
                  <span className="text-xs font-bold text-amber-700  uppercase">
                    Lỗi thường gặp của người Việt:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700  mt-0.5 font-medium">
                    {activeInitial.commonMistakes}
                  </p>
                </div>
              </div>

              {/* Example Words */}
              <div>
                <h4 className="text-xs font-bold text-slate-500  uppercase tracking-wider mb-2.5">
                  Từ vựng ví dụ thực tế:
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {activeInitial.exampleWords.map((word, idx) => {
                    const isSelected = selectedExampleWord === word.hanzi;
                    const isPlaying = currentlyPlaying === word.hanzi;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectExampleWord(word.hanzi)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group active:scale-95 duration-150 select-none ${
                          isSelected
                            ? "bg-blue-50/95 border-blue-500 ring-2 ring-blue-500/30 shadow-md scale-[1.02]"
                            : "bg-white border-slate-200 hover:border-blue-500 hover:shadow-xs"
                        }`}
                      >
                        <div className="min-w-0">
                          <div className={`text-lg font-black transition-colors ${
                            isSelected ? "text-blue-700" : "text-slate-900 group-hover:text-blue-600"
                          }`}>
                            {word.hanzi}
                          </div>
                          <div className="text-xs font-bold text-blue-600 font-mono">
                            {word.pinyin}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">
                            {word.vietnamese}
                          </div>
                        </div>

                        <div className="shrink-0 ml-2">
                          {isPlaying ? (
                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-black animate-pulse shadow-2xs">
                              <Volume2 className="w-3 h-3 animate-bounce" />
                              <span>Đang đọc</span>
                            </span>
                          ) : isSelected ? (
                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[9px] font-bold border border-blue-200">
                              <Volume2 className="w-3 h-3 text-blue-600" />
                              <span>Đã chọn</span>
                            </span>
                          ) : (
                            <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 3: VẬN MẪU (FINALS - 36 VẦN) */}
      {/* =================================================================== */}
      {activeTab ==="finals" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white  p-4 rounded-2xl border border-slate-200  shadow-xs">
            <ScrollableTabs hintText="Trượt xem 6 nhóm vần" pillColor="blue" className="w-full sm:w-auto">
              {[
                { id:"all", label:"Tất cả (36)" },
                { id:"single", label:"Vận Mẫu Đơn (6)" },
                { id:"compound", label:"Vận Mẫu Kép (13)" },
                { id:"nasal_front", label:"Mũi Trước -n (8)" },
                { id:"nasal_back", label:"Mũi Sau -ng (8)" },
                { id:"special", label:"Đặc Biệt er (1)" }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setFinalFilterCategory(pill.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                    finalFilterCategory === pill.id
                      ?"bg-blue-600 text-white border-blue-600 shadow-xs"
                      :"bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </ScrollableTabs>

            <div className="relative w-full sm:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm vận mẫu..."
                value={finalSearchQuery}
                onChange={(e) => setFinalSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50  border border-slate-200  text-slate-800  focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Grid of Finals */}
            <div className="lg:col-span-6 grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[600px] overflow-y-auto pr-1">
              {filteredFinals.map((item) => {
                const isSelected = selectedFinalId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedFinalId(item.id);
                      setPinyinDetailModal({
                        isOpen: true,
                        type: "final",
                        id: item.id
                      });
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between interactive-card active:scale-95 ${
                      isSelected
                        ? "bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/20 shadow-md"
                        : "bg-white border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-baseline justify-between gap-1">
                        <span className="text-2xl font-black text-slate-900 font-mono">
                          {item.final}
                        </span>
                        <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100/80">
                          {item.audioExample}
                        </span>
                      </div>
                      <div className="text-[11px] text-blue-700 font-bold mt-1 line-clamp-1" title={item.vietnameseApproximation}>
                        {item.vietnameseApproximation.replace(/^Giống âm\s*/i, "Âm: ")}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                        {item.categoryName}
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-slate-500 font-medium">
                          Bấm xem chi tiết
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayAudio(item.audioExample);
                        }}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-100 cursor-pointer active:scale-90 transition-all"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Detailed Final Card */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    {activeFinal.categoryName}
                  </span>
                  <h3 className="text-4xl font-black text-slate-900 mt-1">
                    Vận mẫu: <span className="text-blue-600">{activeFinal.final}</span>
                  </h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setPinyinDetailModal({
                        isOpen: true,
                        type: "final",
                        id: activeFinal.id
                      })
                    }
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 text-xs font-bold transition-all cursor-pointer active:scale-95"
                    title="Bật cửa sổ xem chi tiết"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Cửa sổ chi tiết</span>
                  </button>
                  <button
                    onClick={() => handlePlayAudio(activeFinal.audioExample)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer active:scale-95"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe âm: {activeFinal.audioExample}</span>
                  </button>
                </div>
              </div>

              {/* Explanations */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/90 to-sky-50/50 border border-blue-200 shadow-2xs">
                  <span className="text-xs font-black text-blue-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                    Cách phát âm đối chiếu chuẩn tiếng Việt:
                  </span>
                  <p className="text-sm sm:text-base text-blue-950 font-bold mt-1 leading-relaxed">
                    {activeFinal.vietnameseApproximation}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50/70  border border-blue-200">
                  <span className="text-xs font-bold text-blue-700  uppercase">
                    Khẩu hình miệng & Cách di chuyển luồng khí:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700  mt-0.5">
                    {activeFinal.mouthShapeDescription}
                  </p>
                </div>

                {activeFinal.rules && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/70  border border-amber-200">
                    <span className="text-xs font-bold text-amber-700  uppercase">
                      Quy tắc biến âm & Cách viết đặc biệt:
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700  mt-0.5 font-medium">
                      {activeFinal.rules}
                    </p>
                  </div>
                )}
              </div>

              {/* Example Words */}
              <div>
                <h4 className="text-xs font-bold text-slate-500  uppercase tracking-wider mb-2.5">
                  Từ vựng minh họa:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {activeFinal.exampleWords.map((word, idx) => {
                    const isSelected = selectedExampleWord === word.hanzi;
                    const isPlaying = currentlyPlaying === word.hanzi;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectExampleWord(word.hanzi)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group active:scale-95 duration-150 select-none ${
                          isSelected
                            ? "bg-blue-50/95 border-blue-500 ring-2 ring-blue-500/30 shadow-md scale-[1.02]"
                            : "bg-white border-slate-200 hover:border-blue-500 hover:shadow-xs"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-lg font-black transition-colors ${
                            isSelected ? "text-blue-700" : "text-slate-900 group-hover:text-blue-600"
                          }`}>
                            {word.hanzi}
                          </span>
                          {isPlaying ? (
                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-black animate-pulse shadow-2xs">
                              <Volume2 className="w-3 h-3 animate-bounce" />
                              <span>Đang đọc</span>
                            </span>
                          ) : isSelected ? (
                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[9px] font-bold border border-blue-200">
                              <Volume2 className="w-3 h-3 text-blue-600" />
                              <span>Đã chọn</span>
                            </span>
                          ) : (
                            <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                          )}
                        </div>
                        <div className="mt-1">
                          <div className="text-xs font-bold text-blue-600 font-mono">
                            {word.pinyin}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">
                            {word.vietnamese}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 4: INTERACTIVE PINYIN MIXER (GHÉP ÂM PINYIN) */}
      {/* =================================================================== */}
      {activeTab === "mixer" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Main Mixer Canvas & Audio Player */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Bộ Phối Âm Tiết Tương Tác Chuẩn Xác
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Ghép Thanh Mẫu + Vận Mẫu + Thanh Điệu
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Chọn phụ âm đầu, vần và thanh điệu để nghe phát âm chuẩn giọng Bắc Kinh, đối chiếu chữ Hán và ngữ nghĩa thực tế.
              </p>
            </div>

            {/* Display Hero Block */}
            <div className={`max-w-xl mx-auto p-6 sm:p-8 rounded-3xl border text-center space-y-5 shadow-sm transition-all ${
              currentMixerDisplay.isValid
                ? "bg-linear-to-b from-blue-50 to-indigo-50/60 border-blue-200"
                : "bg-linear-to-b from-amber-50/60 to-orange-50/40 border-amber-200"
            }`}>
              {/* Formula Badge Row */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => handlePlayAudio(mixerInitial)}
                  title="Bấm để nghe âm thanh mẫu"
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 text-xs font-bold text-slate-700 shadow-2xs border border-slate-200 hover:border-blue-300 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Thanh mẫu: <strong className="text-blue-600">{mixerInitial}</strong></span>
                </button>
                <span className="text-slate-400 font-bold">+</span>
                <button
                  onClick={() => handlePlayAudio(mixerFinal)}
                  title="Bấm để nghe âm vận mẫu"
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 text-xs font-bold text-slate-700 shadow-2xs border border-slate-200 hover:border-blue-300 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Vận mẫu: <strong className="text-blue-600">{mixerFinal}</strong></span>
                </button>
                <span className="text-slate-400 font-bold">+</span>
                <span className="px-3 py-1.5 rounded-xl bg-white text-xs font-bold text-indigo-600 shadow-2xs border border-slate-200">
                  Thanh {mixerTone}
                </span>
              </div>

              {/* Status Pill */}
              <div className="flex items-center justify-center">
                {currentMixerDisplay.isValid ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Âm tiết chuẩn tiếng Trung
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    Tổ hợp không tồn tại trong tiếng Trung chuẩn
                  </span>
                )}
              </div>

              {/* Big Pinyin & Character */}
              <div className="py-2">
                <div className="text-5xl sm:text-6xl font-black text-blue-600 tracking-wide font-mono">
                  {currentMixerDisplay.pinyin}
                </div>
                {currentMixerDisplay.isValid && currentMixerDisplay.hanzi && currentMixerDisplay.hanzi !== "拼音" && currentMixerDisplay.hanzi !== "—" && (
                  <div className="text-3xl font-black text-slate-900 mt-2">
                    {currentMixerDisplay.hanzi}
                  </div>
                )}
                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                  {currentMixerDisplay.meaning}
                </p>
              </div>

              {/* Action Audio Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    const audioTarget = (currentMixerDisplay.hanzi && currentMixerDisplay.hanzi !== "拼音" && currentMixerDisplay.hanzi !== "—")
                      ? currentMixerDisplay.hanzi
                      : currentMixerDisplay.pinyin;
                    handlePlayAudio(audioTarget, undefined, currentMixerDisplay.pinyin);
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>Phát Âm Tiết: {currentMixerDisplay.pinyin}</span>
                </button>

                <button
                  onClick={() => {
                    const audioTarget = (currentMixerDisplay.hanzi && currentMixerDisplay.hanzi !== "拼音" && currentMixerDisplay.hanzi !== "—")
                      ? currentMixerDisplay.hanzi
                      : currentMixerDisplay.pinyin;
                    handlePlayAudio(audioTarget, 0.7, currentMixerDisplay.pinyin);
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm border border-slate-200 flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 text-blue-600" />
                  <span>Nghe Chậm (0.7x)</span>
                </button>
              </div>
            </div>

            {/* 3 Step Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {/* Step 1: Initials Selector */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  1. Chọn Thanh Mẫu ({PINYIN_INITIALS.length} Âm đầu):
                </label>
                <div className="grid grid-cols-4 gap-1.5 max-h-64 overflow-y-auto p-2 rounded-2xl bg-slate-50 border border-slate-200">
                  {PINYIN_INITIALS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setMixerInitial(item.initial);
                        handlePlayAudio(item.audioExample);
                      }}
                      className={`p-2 rounded-xl text-center text-xs font-bold transition-all cursor-pointer select-none active:scale-95 duration-100 ${
                        mixerInitial === item.initial
                          ? "bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/30"
                          : "bg-white text-slate-700 hover:bg-blue-100"
                      }`}
                    >
                      {item.initial}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Finals Selector */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    2. Chọn Vận Mẫu (Vần):
                  </label>
                  <span className="text-[10px] text-blue-600 font-bold">
                    Khớp: {validFinalsForInitial.length} vần
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 max-h-64 overflow-y-auto p-2 rounded-2xl bg-slate-50 border border-slate-200">
                  {PINYIN_FINALS.map((item) => {
                    const isValidWithInitial = validFinalsForInitial.includes(item.final) || validFinalsForInitial.includes(item.final.replace("v", "ü"));
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setMixerFinal(item.final);
                          handlePlayAudio(item.audioExample);
                        }}
                        className={`p-2 rounded-xl text-center text-xs font-bold transition-all cursor-pointer relative select-none active:scale-95 duration-100 ${
                          mixerFinal === item.final
                            ? "bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/30"
                            : isValidWithInitial
                            ? "bg-white text-slate-800 hover:bg-blue-100 border border-blue-200/60"
                            : "bg-slate-100/70 text-slate-400 hover:bg-slate-200/60 opacity-60"
                        }`}
                      >
                        <span>{item.final}</span>
                        {isValidWithInitial && mixerFinal !== item.final && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute top-1 right-1" title="Vần hợp lệ" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Tones Selector */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  3. Chọn Thanh Điệu (4 Thanh):
                </label>
                <div className="space-y-2 p-2 rounded-2xl bg-slate-50 border border-slate-200 max-h-64 overflow-y-auto">
                  {[
                    { num: 1, mark: "¯", name: "Thanh 1 (Ngang - Cao 55)" },
                    { num: 2, mark: "´", name: "Thanh 2 (Sắc - Vút lên 35)" },
                    { num: 3, mark: "ˇ", name: "Thanh 3 (Trầm uốn - 214)" },
                    { num: 4, mark: "`", name: "Thanh 4 (Rơi dứt khoát 51)" }
                  ].map((t) => (
                    <button
                      key={t.num}
                      onClick={() => setMixerTone(t.num as 1 | 2 | 3 | 4)}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer select-none active:scale-95 duration-100 ${
                        mixerTone === t.num
                          ? "bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/30"
                          : "bg-white text-slate-700 hover:bg-blue-100"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-black">
                          {t.num}
                        </span>
                        <span>{t.name}</span>
                      </span>
                      {mixerTone === t.num && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Suggestions for Selected Initial */}
            {validFinalsForInitial.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Gợi ý các vần ghép chuẩn xác với thanh mẫu <span className="text-blue-600 font-extrabold font-mono">[{mixerInitial}]</span>:
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Bấm để thử ngay
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {validFinalsForInitial.map((finalName) => (
                    <button
                      key={finalName}
                      onClick={() => {
                        setMixerFinal(finalName);
                        const testData = getMixerSyllableData(mixerInitial, finalName, mixerTone);
                        const audioTarget = (testData.hanzi && testData.hanzi !== "拼音" && testData.hanzi !== "—")
                          ? testData.hanzi
                          : testData.pinyin;
                        handlePlayAudio(audioTarget, undefined, testData.pinyin);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 select-none active:scale-95 duration-100 ${
                        mixerFinal === finalName
                          ? "bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/30"
                          : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 border border-slate-200"
                      }`}
                    >
                      <span>{mixerInitial}{finalName}</span>
                      <Volume2 className="w-3 h-3 opacity-70" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 5: BÀI TẬP NHỎ & TRẮC NGHIỆM PHÁT ÂM (DRILLS) */}
      {/* =================================================================== */}
      {activeTab ==="drills" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Sub-modes switcher */}
          <ScrollableTabs
            hintText="Trượt xem bài tập"
            pillColor="blue"
            className="bg-white p-2 rounded-2xl border border-slate-200"
          >
            {[
              { id:"tone_listen", label:"Bài tập 1: Nhận diện Thanh điệu", count:`${TONE_DRILLS.length} câu` },
              { id:"minimal_pairs", label:"Bài tập 2: Phân biệt cặp âm dễ nhầm", count:`${MINIMAL_PAIRS_DRILLS.length} chủ đề` },
              { id:"sandhi_rules", label:"Bài tập 3: Trắc nghiệm quy tắc biến điệu", count:`${TONE_SANDHI_DRILLS.length} câu` }
            ].map((drill) => (
              <button
                key={drill.id}
                onClick={() => setDrillMode(drill.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 shrink-0 select-none active:scale-95 duration-100 ${
                  drillMode === drill.id
                    ?"bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/30"
                    :"text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{drill.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    drillMode === drill.id ?"bg-white/20 text-white" :"bg-slate-200 text-slate-500"
                  }`}
                >
                  {drill.count}
                </span>
              </button>
            ))}
          </ScrollableTabs>

          {/* DRILL MODE 1: TONE RECOGNITION */}
          {drillMode ==="tone_listen" && (() => {
            const currentQ = TONE_DRILLS[toneDrillIdx];
            return (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold">
                    Câu hỏi {toneDrillIdx + 1} / {TONE_DRILLS.length}
                  </span>
                  <span className="font-bold text-blue-600">
                    Điểm số: {toneDrillScore} câu đúng
                  </span>
                </div>

                {/* Question Audio Box */}
                <div className="text-center p-6 rounded-2xl bg-blue-50 border border-blue-200 space-y-4">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                    Lắng nghe âm thanh và chọn thanh điệu đúng:
                  </span>

                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handlePlayAudio(currentQ.audioText)}
                      className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 active:scale-90 transition-transform cursor-pointer"
                    >
                      <Volume2 className="w-8 h-8" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-500">
                    Gợi ý âm thanh: <strong>{currentQ.pinyinPrompt}</strong>
                  </p>
                </div>

                {/* 4 Tone Options */}
                <div className="grid grid-cols-2 gap-3">
                  {currentQ.options.map((opt) => {
                    const isSelected = selectedToneAnswer === opt.tone;
                    const isCorrect = opt.tone === currentQ.correctTone;
                    let btnStyle ="bg-slate-50 border-slate-200 hover:border-blue-400";

                    if (isToneAnswerSubmitted) {
                      if (isCorrect) {
                        btnStyle ="bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20";
                      } else if (isSelected) {
                        btnStyle ="bg-red-50 border-red-500 ring-2 ring-red-500/20";
                      }
                    } else if (isSelected) {
                      btnStyle ="bg-blue-50 border-blue-500 ring-2 ring-blue-500/20";
                    }

                    return (
                      <button
                        key={opt.tone}
                        disabled={isToneAnswerSubmitted}
                        onClick={() => {
                          setSelectedToneAnswer(opt.tone);
                          handlePlayAudio(opt.pinyin);
                        }}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer select-none active:scale-95 duration-100 ${btnStyle}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-black text-slate-900">
                            {opt.pinyin}
                          </span>
                          <span className="text-xs font-bold text-slate-400">Thanh {opt.tone}</span>
                        </div>
                        <div className="text-xs text-slate-500  mt-1">
                          {opt.hanzi} ({opt.meaning})
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Explanation */}
                {isToneAnswerSubmitted && (
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      selectedToneAnswer === currentQ.correctTone
                        ?"bg-emerald-50  text-emerald-800  border border-emerald-200"
                        :"bg-red-50  text-red-800  border border-red-200"
                    }`}
                  >
                    <div className="font-bold mb-1 flex items-center gap-1.5">
                      {selectedToneAnswer === currentQ.correctTone ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Chính xác! (+10 XP)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span>Chưa đúng! Đáp án là Thanh {currentQ.correctTone} ({currentQ.options.find(o => o.tone === currentQ.correctTone)?.pinyin})</span>
                        </>
                      )}
                    </div>
                    <p>{currentQ.explanation}</p>
                  </div>
                )}

                {/* Bottom Action Bar */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      setToneDrillIdx(0);
                      setToneDrillScore(0);
                      setSelectedToneAnswer(null);
                      setIsToneAnswerSubmitted(false);
                    }}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800  font-semibold cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm lại từ đầu</span>
                  </button>

                  {!isToneAnswerSubmitted ? (
                    <button
                      disabled={selectedToneAnswer === null}
                      onClick={() => {
                        setIsToneAnswerSubmitted(true);
                        if (selectedToneAnswer === currentQ.correctTone) {
                          setToneDrillScore((prev) => prev + 1);
                          if (onRecordPractice) onRecordPractice(10);
                        }
                      }}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-md transition-all"
                    >
                      Kiểm tra đáp án
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (toneDrillIdx < TONE_DRILLS.length - 1) {
                          setToneDrillIdx((prev) => prev + 1);
                          setSelectedToneAnswer(null);
                          setIsToneAnswerSubmitted(false);
                        } else {
                          alert(`Chúc mừng bạn đã hoàn thành bài tập! Đạt ${toneDrillScore + (selectedToneAnswer === currentQ.correctTone ? 1 : 0)} / ${TONE_DRILLS.length} câu đúng.`);
                        }
                      }}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                    >
                      <span>Câu tiếp theo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })()}

          {/* DRILL MODE 2: MINIMAL PAIRS (CẶP ÂM DỄ NHẦM) */}
          {drillMode ==="minimal_pairs" && (() => {
            const activePairGroup = MINIMAL_PAIRS_DRILLS[pairCategoryIdx];
            const currentQ = activePairGroup.questions[pairQuestionIdx];

            return (
              <div className="space-y-6">
                {/* Category Selector Tabs */}
                <ScrollableTabs hintText="Trượt xem cặp âm" pillColor="blue">
                  {MINIMAL_PAIRS_DRILLS.map((pair, idx) => (
                    <button
                      key={pair.id}
                      onClick={() => {
                        setPairCategoryIdx(idx);
                        setPairQuestionIdx(0);
                        setSelectedPairOption(null);
                        setIsPairSubmitted(false);
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 border select-none active:scale-95 duration-100 ${
                        pairCategoryIdx === idx
                          ?"bg-blue-600 text-white border-blue-600 shadow-xs ring-2 ring-blue-400/30"
                          :"bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {pair.pairCategory}
                    </button>
                  ))}
                </ScrollableTabs>

                <div className="bg-white  rounded-3xl p-6 sm:p-8 border border-slate-200  shadow-sm max-w-2xl mx-auto space-y-6">
                  {/* Category Header */}
                  <div className="border-b border-slate-100  pb-4">
                    <span className="text-xs font-bold text-blue-600  uppercase">
                      Luyện phân biệt cặp âm
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900  mt-0.5">
                      {activePairGroup.pairCategory}
                    </h3>
                    <p className="text-xs text-slate-500  mt-1">
                      {activePairGroup.description}
                    </p>
                  </div>

                  {/* Audio trigger */}
                  <div className="text-center p-5 rounded-2xl bg-slate-50  border border-slate-200  space-y-3">
                    <span className="text-xs font-bold text-slate-600">
                      Nghe âm thanh và chọn từ phát ra:
                    </span>
                    <div className="flex justify-center">
                      <button
                        onClick={() => handlePlayAudio(currentQ.audioText)}
                        className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 active:scale-95 transition-transform cursor-pointer"
                      >
                        <Volume2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-2 gap-3">
                    {currentQ.options.map((opt, idx) => {
                      const isSelected = selectedPairOption === idx;
                      const isCorrect = idx === currentQ.correctIndex;
                      let btnStyle ="bg-slate-50  border-slate-200  hover:border-blue-400";

                      if (isPairSubmitted) {
                        if (isCorrect) {
                          btnStyle ="bg-emerald-50  border-emerald-500 ring-2 ring-emerald-500/20";
                        } else if (isSelected) {
                          btnStyle ="bg-red-50  border-red-500 ring-2 ring-red-500/20";
                        }
                      } else if (isSelected) {
                        btnStyle ="bg-blue-50  border-blue-500 ring-2 ring-blue-500/20";
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isPairSubmitted}
                          onClick={() => {
                            setSelectedPairOption(idx);
                            handlePlayAudio(opt.hanzi);
                          }}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer select-none active:scale-95 duration-100 ${btnStyle}`}
                        >
                          <div className="text-2xl font-black text-slate-900">
                            {opt.hanzi}
                          </div>
                          <div className="text-sm font-bold text-blue-600  mt-1">
                            {opt.pinyin}
                          </div>
                          <div className="text-xs text-slate-500  mt-0.5">
                            {opt.meaning}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback */}
                  {isPairSubmitted && (
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        selectedPairOption === currentQ.correctIndex
                          ?"bg-emerald-50  text-emerald-800  border border-emerald-200"
                          :"bg-red-50  text-red-800  border border-red-200"
                      }`}
                    >
                      <div className="font-bold mb-1">
                        {selectedPairOption === currentQ.correctIndex ?"Chính xác! (+10 XP)" :"Chưa chính xác!"}
                      </div>
                      <p>{currentQ.explanation}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    {!isPairSubmitted ? (
                      <button
                        disabled={selectedPairOption === null}
                        onClick={() => {
                          setIsPairSubmitted(true);
                          if (selectedPairOption === currentQ.correctIndex) {
                            setPairScore((s) => s + 1);
                            if (onRecordPractice) onRecordPractice(10);
                          }
                        }}
                        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-md"
                      >
                        Kiểm tra
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (pairQuestionIdx < activePairGroup.questions.length - 1) {
                            setPairQuestionIdx((prev) => prev + 1);
                            setSelectedPairOption(null);
                            setIsPairSubmitted(false);
                          } else {
                            alert("Đã hoàn thành các câu hỏi trong chủ đề này!");
                          }
                        }}
                        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <span>Câu tiếp theo</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* DRILL MODE 3: SANDHI RULES QUIZ */}
          {drillMode ==="sandhi_rules" && (() => {
            const currentQ = TONE_SANDHI_DRILLS[sandhiIdx];
            return (
              <div className="bg-white  rounded-3xl p-6 sm:p-8 border border-slate-200  shadow-sm max-w-2xl mx-auto space-y-6">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold">
                    Câu hỏi {sandhiIdx + 1} / {TONE_SANDHI_DRILLS.length}
                  </span>
                  <span className="font-bold text-blue-600">Điểm: {sandhiScore} đúng</span>
                </div>

                <div className="p-5 rounded-2xl bg-blue-50  border border-blue-200  space-y-2">
                  <span className="text-xs font-bold text-blue-700  uppercase">
                    {currentQ.title}
                  </span>
                  <div className="text-3xl font-black text-slate-900  flex items-center gap-3">
                    <span>{currentQ.originalText}</span>
                    <button
                      onClick={() => handlePlayAudio(currentQ.audioSample)}
                      className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                      title="Nghe phát âm chuẩn"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600  font-medium">
                    {currentQ.question}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-2.5">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedSandhiOption === opt;
                    const isCorrect = opt === currentQ.correctAnswer;
                    let btnStyle ="bg-slate-50  border-slate-200  hover:border-blue-400";

                    if (isSandhiSubmitted) {
                      if (isCorrect) {
                        btnStyle ="bg-emerald-50  border-emerald-500 ring-2 ring-emerald-500/20";
                      } else if (isSelected) {
                        btnStyle ="bg-red-50  border-red-500 ring-2 ring-red-500/20";
                      }
                    } else if (isSelected) {
                      btnStyle ="bg-blue-50  border-blue-500 ring-2 ring-blue-500/20";
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isSandhiSubmitted}
                        onClick={() => setSelectedSandhiOption(opt)}
                        className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between select-none active:scale-95 duration-100 ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isSandhiSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {isSandhiSubmitted && (
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      selectedSandhiOption === currentQ.correctAnswer
                        ?"bg-emerald-50  text-emerald-800  border border-emerald-200"
                        :"bg-red-50  text-red-800  border border-red-200"
                    }`}
                  >
                    <div className="font-bold mb-1">
                      {selectedSandhiOption === currentQ.correctAnswer ?"Chính xác! (+10 XP)" :"Chưa chính xác!"}
                    </div>
                    <p>{currentQ.explanation}</p>
                  </div>
                )}

                {/* Bottom Bar */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  {!isSandhiSubmitted ? (
                    <button
                      disabled={selectedSandhiOption === null}
                      onClick={() => {
                        setIsSandhiSubmitted(true);
                        if (selectedSandhiOption === currentQ.correctAnswer) {
                          setSandhiScore((s) => s + 1);
                          if (onRecordPractice) onRecordPractice(10);
                        }
                      }}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-md"
                    >
                      Kiểm tra
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (sandhiIdx < TONE_SANDHI_DRILLS.length - 1) {
                          setSandhiIdx((prev) => prev + 1);
                          setSelectedSandhiOption(null);
                          setIsSandhiSubmitted(false);
                        } else {
                          alert(`Chúc mừng bạn đã hoàn thành bài tập biến điệu!`);
                        }
                      }}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span>Câu tiếp theo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 6: TONGUE TWISTERS (LÍU LƯỠI LUYỆN GIỌNG) */}
      {/* =================================================================== */}
      {activeTab ==="twisters" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Twister Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TONGUE_TWISTERS.map((item, idx) => {
              const isSelected = twisterIdx === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setTwisterIdx(idx);
                    setSpeechFeedback(null);
                    setSpokenTranscript("");
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none active:scale-95 duration-100 ${
                    isSelected
                      ?"bg-blue-50/90 border-blue-500 ring-2 ring-blue-500/20 shadow-md scale-[1.01]"
                      :"bg-white border-slate-200 hover:border-blue-300"
                  }`}
                >
                  <div>
                    <span className="px-2 py-0.5 rounded-full bg-blue-100  text-[10px] font-bold text-blue-600">
                      {item.level}
                    </span>
                    <h4 className="font-extrabold text-slate-800  text-sm mt-1.5 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500  mt-1 line-clamp-2">
                      {item.category}
                    </p>
                  </div>
                  <div className="mt-3 text-[10px] font-mono text-blue-600  font-bold">
                    Trọng tâm: {item.focusSound}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Twister Practice Room */}
          <div className="bg-white  rounded-3xl p-6 sm:p-8 border border-slate-200  shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100  pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {activeTwister.category}
                </span>
                <h3 className="text-2xl font-black text-slate-900  mt-0.5">
                  {activeTwister.title}
                </h3>
              </div>

              {/* Audio Listen Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePlayAudio(activeTwister.audioSpeed.slow, 0.7)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100  hover:bg-slate-200  text-xs font-bold text-slate-700  flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Nghe chậm (0.7x)</span>
                </button>
                <button
                  onClick={() => handlePlayAudio(activeTwister.audioSpeed.normal, 1.0)}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe chuẩn (1.0x)</span>
                </button>
              </div>
            </div>

            {/* Display Hanzi + Pinyin Lines */}
            <div className="p-6 rounded-2xl bg-slate-50  border border-slate-200  space-y-4 text-center">
              {activeTwister.hanziLines.map((line, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-xl sm:text-2xl font-black text-slate-900  tracking-wide">
                    {line}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-blue-600">
                    {activeTwister.pinyinLines[idx]}
                  </div>
                  <div className="text-xs text-slate-500">
                    {activeTwister.vietnameseMeaning[idx]}
                  </div>
                </div>
              ))}
            </div>

            {/* Practical Tips */}
            <div className="p-4 rounded-2xl bg-amber-50/80  border border-amber-200  text-xs text-slate-700">
              <strong className="text-amber-800  font-bold block mb-1">
                Bí quyết phát âm không líu lưỡi:
              </strong>
              {activeTwister.tips}
            </div>

            {/* Live Recording Studio */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Phòng Thu Âm Nhận Diện & Đánh Giá Giọng Nói AI
              </span>

              <div className="flex flex-col items-center justify-center gap-3">
                <button
                  onClick={isRecording ? handleStopSpeechRecording : handleStartSpeechRecording}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl transition-transform active:scale-95 cursor-pointer ${
                    isRecording
                      ? "bg-red-600 animate-pulse ring-4 ring-red-300"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
                </button>
                <span className="text-xs text-slate-500">
                  {isRecording ? "Đang lắng nghe giọng bạn... Nhấn để dừng & nghe lại" : "Nhấn Micro để đọc to bài líu lưỡi"}
                </span>
              </div>

              {/* USER RECORDED AUDIO REPLAY CARD */}
              {userAudioUrl && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 max-w-lg mx-auto text-left space-y-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                    <span className="flex items-center gap-1.5">
                      <Headphones className="w-4 h-4 text-blue-600" />
                      Bản ghi âm giọng bạn vừa đọc:
                    </span>
                    <span className="text-[10px] bg-blue-200/60 text-blue-800 px-2 py-0.5 rounded-md font-semibold">
                      Sẵn sàng phát
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-blue-100 shadow-xs">
                    <button
                      onClick={handleTogglePlayUserAudio}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-white transition-all shadow-sm shrink-0 ${
                        isPlayingUserAudio
                          ? "bg-rose-500 hover:bg-rose-600 ring-2 ring-rose-200"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      title={isPlayingUserAudio ? "Tạm dừng phát" : "Nghe lại giọng vừa đọc"}
                    >
                      {isPlayingUserAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5 fill-current" />}
                    </button>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-700">
                          {isPlayingUserAudio ? "Đang phát lại..." : "Bấm nút để nghe lại giọng bạn"}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {isPlayingUserAudio ? "Playing" : "Audio"}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full transition-all duration-100 rounded-full"
                          style={{ width: `${userAudioProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Feedback result */}
              {spokenTranscript && (
                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-left space-y-2 max-w-lg mx-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-bold">Giọng thu âm nhận diện:</span>
                    {speechFeedback && (
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
                        Điểm: {speechFeedback.score}/100
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-slate-800">
                    {spokenTranscript}
                  </div>
                  {speechFeedback && (
                    <p className="text-xs text-slate-500 border-t border-slate-100 pt-2">
                      {speechFeedback.comment}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Pinyin Detail Modal */}
      {pinyinDetailModal && (
        <PinyinDetailModal
          isOpen={pinyinDetailModal.isOpen}
          onClose={() => setPinyinDetailModal(null)}
          type={pinyinDetailModal.type}
          initialItem={
            pinyinDetailModal.type === "initial"
              ? (PINYIN_INITIALS.find((i) => i.id === (pinyinDetailModal.id || selectedInitialId)) || activeInitial)
              : null
          }
          finalItem={
            pinyinDetailModal.type === "final"
              ? (PINYIN_FINALS.find((f) => f.id === (pinyinDetailModal.id || selectedFinalId)) || activeFinal)
              : null
          }
          toneItem={
            pinyinDetailModal.type === "tone"
              ? (PINYIN_TONES.find((t) => t.toneNumber === (pinyinDetailModal.toneNumber ?? selectedToneNum)) || PINYIN_TONES[0])
              : null
          }
          onSelectNext={() => {
            if (pinyinDetailModal.type === "final") {
              const currentId = pinyinDetailModal.id || selectedFinalId;
              const idx = filteredFinals.findIndex((f) => f.id === currentId);
              if (idx < filteredFinals.length - 1) {
                const nextItem = filteredFinals[idx + 1];
                setSelectedFinalId(nextItem.id);
                setPinyinDetailModal({ isOpen: true, type: "final", id: nextItem.id });
              }
            } else if (pinyinDetailModal.type === "initial") {
              const currentId = pinyinDetailModal.id || selectedInitialId;
              const idx = filteredInitials.findIndex((i) => i.id === currentId);
              if (idx < filteredInitials.length - 1) {
                const nextItem = filteredInitials[idx + 1];
                setSelectedInitialId(nextItem.id);
                setPinyinDetailModal({ isOpen: true, type: "initial", id: nextItem.id });
              }
            } else if (pinyinDetailModal.type === "tone") {
              const currentToneNum = pinyinDetailModal.toneNumber ?? selectedToneNum;
              const idx = PINYIN_TONES.findIndex((t) => t.toneNumber === currentToneNum);
              if (idx < PINYIN_TONES.length - 1) {
                const nextTone = PINYIN_TONES[idx + 1];
                setSelectedToneNum(nextTone.toneNumber);
                setPinyinDetailModal({ isOpen: true, type: "tone", toneNumber: nextTone.toneNumber });
              }
            }
          }}
          onSelectPrev={() => {
            if (pinyinDetailModal.type === "final") {
              const currentId = pinyinDetailModal.id || selectedFinalId;
              const idx = filteredFinals.findIndex((f) => f.id === currentId);
              if (idx > 0) {
                const prevItem = filteredFinals[idx - 1];
                setSelectedFinalId(prevItem.id);
                setPinyinDetailModal({ isOpen: true, type: "final", id: prevItem.id });
              }
            } else if (pinyinDetailModal.type === "initial") {
              const currentId = pinyinDetailModal.id || selectedInitialId;
              const idx = filteredInitials.findIndex((i) => i.id === currentId);
              if (idx > 0) {
                const prevItem = filteredInitials[idx - 1];
                setSelectedInitialId(prevItem.id);
                setPinyinDetailModal({ isOpen: true, type: "initial", id: prevItem.id });
              }
            } else if (pinyinDetailModal.type === "tone") {
              const currentToneNum = pinyinDetailModal.toneNumber ?? selectedToneNum;
              const idx = PINYIN_TONES.findIndex((t) => t.toneNumber === currentToneNum);
              if (idx > 0) {
                const prevTone = PINYIN_TONES[idx - 1];
                setSelectedToneNum(prevTone.toneNumber);
                setPinyinDetailModal({ isOpen: true, type: "tone", toneNumber: prevTone.toneNumber });
              }
            }
          }}
          hasNext={
            pinyinDetailModal.type === "final"
              ? filteredFinals.findIndex((f) => f.id === (pinyinDetailModal.id || selectedFinalId)) < filteredFinals.length - 1
              : pinyinDetailModal.type === "initial"
              ? filteredInitials.findIndex((i) => i.id === (pinyinDetailModal.id || selectedInitialId)) < filteredInitials.length - 1
              : PINYIN_TONES.findIndex((t) => t.toneNumber === (pinyinDetailModal.toneNumber ?? selectedToneNum)) < PINYIN_TONES.length - 1
          }
          hasPrev={
            pinyinDetailModal.type === "final"
              ? filteredFinals.findIndex((f) => f.id === (pinyinDetailModal.id || selectedFinalId)) > 0
              : pinyinDetailModal.type === "initial"
              ? filteredInitials.findIndex((i) => i.id === (pinyinDetailModal.id || selectedInitialId)) > 0
              : PINYIN_TONES.findIndex((t) => t.toneNumber === (pinyinDetailModal.toneNumber ?? selectedToneNum)) > 0
          }
        />
      )}
    </div>
  );
};
