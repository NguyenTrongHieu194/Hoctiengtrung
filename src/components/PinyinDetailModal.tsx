import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Volume2,
  X,
  Sparkles,
  Mic,
  MicOff,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Layers,
  Award,
  AlertTriangle,
  Play
} from "lucide-react";
import { PinyinInitialItem, PinyinFinalItem, PinyinToneItem } from "../data/pinyin";
import { playChineseAudio, createSpeechRecognizer, VoiceAudioRecorder } from "../services/speechService";
import { applyPinyinTone } from "../utils/pinyinEngine";

export interface PinyinDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "initial" | "final" | "tone";
  initialItem?: PinyinInitialItem | null;
  finalItem?: PinyinFinalItem | null;
  toneItem?: PinyinToneItem | null;
  onSelectNext?: () => void;
  onSelectPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export const PinyinDetailModal: React.FC<PinyinDetailModalProps> = ({
  isOpen,
  onClose,
  type,
  initialItem,
  finalItem,
  toneItem,
  onSelectNext,
  onSelectPrev,
  hasNext = false,
  hasPrev = false
}) => {
  const [speed, setSpeed] = useState<1.0 | 0.75>(1.0);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<"guide" | "tones" | "vocab" | "speech">("guide");
  const [selectedVocabWord, setSelectedVocabWord] = useState<string | null>(null);
  const [selectedToneText, setSelectedToneText] = useState<string | null>(null);

  // Speech recording state
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState("");
  const [speechScore, setSpeechScore] = useState<number | null>(null);
  const [speechFeedback, setSpeechFeedback] = useState<string | null>(null);
  const voiceRecorderRef = useRef<VoiceAudioRecorder | null>(null);
  const recognizerRef = useRef<any>(null);
  const contentScrollRef = useRef<HTMLDivElement>(null);

  // Reset state and scroll to top when item changes
  useEffect(() => {
    setIsRecording(false);
    setSpokenTranscript("");
    setSpeechScore(null);
    setSpeechFeedback(null);
    setSelectedVocabWord(null);
    setSelectedToneText(null);
    setActiveSubTab("guide");
    contentScrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [initialItem?.id, finalItem?.id, toneItem?.toneNumber]);

  // Scroll to top when subTab changes
  useEffect(() => {
    contentScrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [activeSubTab]);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Derive active content based on type
  let title = "";
  let categoryTag = "";
  let mainAudio = "";
  let vietnameseApprox = "";
  let mouthShape = "";
  let rulesText = "";
  let tipsText = "";
  let mistakesText = "";
  let isAspirated = false;
  let exampleWords: Array<{ hanzi: string; pinyin: string; vietnamese: string }> = [];

  // Generate 4 tone variations for initial / final
  const toneVariations: Array<{ tone: number; text: string; label: string; pitch: string }> = [];

  if (type === "final" && finalItem) {
    title = finalItem.final;
    categoryTag = finalItem.categoryName;
    mainAudio = finalItem.audioExample;
    vietnameseApprox = finalItem.vietnameseApproximation;
    mouthShape = finalItem.mouthShapeDescription;
    rulesText = finalItem.rules || "";
    exampleWords = finalItem.exampleWords || [];

    // Calculate tone variations for final
    [1, 2, 3, 4].forEach((t) => {
      const toneText = applyPinyinTone("", finalItem.final, t as 1 | 2 | 3 | 4);
      const pitchMap = ["5-5 (Ngang cao)", "3-5 (Vút lên)", "2-1-4 (Xuống rồi lên)", "5-1 (Rơi mạnh)"];
      toneVariations.push({
        tone: t,
        text: toneText,
        label: `Thanh ${t}`,
        pitch: pitchMap[t - 1]
      });
    });
  } else if (type === "initial" && initialItem) {
    title = initialItem.initial;
    categoryTag = initialItem.groupName;
    mainAudio = initialItem.audioExample;
    vietnameseApprox = initialItem.vietnameseApproximation;
    mouthShape = initialItem.mouthShapeDescription;
    tipsText = initialItem.pronunciationTips || "";
    mistakesText = initialItem.commonMistakes || "";
    isAspirated = Boolean(initialItem.isAspirated);
    exampleWords = initialItem.exampleWords || [];

    // Calculate tone variations with standard vowel 'a' or default syllable
    [1, 2, 3, 4].forEach((t) => {
      // Using 'a' for standard syllables, or 'i' for j/q/x/zh/ch/sh/r/z/c/s
      const sampleVowel = ["j", "q", "x", "zh", "ch", "sh", "r", "z", "c", "s"].includes(initialItem.initial) ? "i" : "a";
      const toneText = applyPinyinTone(initialItem.initial, sampleVowel, t as 1 | 2 | 3 | 4);
      const pitchMap = ["5-5 (Ngang cao)", "3-5 (Vút lên)", "2-1-4 (Xuống rồi lên)", "5-1 (Rơi mạnh)"];
      toneVariations.push({
        tone: t,
        text: toneText,
        label: `Thanh ${t}`,
        pitch: pitchMap[t - 1]
      });
    });
  } else if (type === "tone" && toneItem) {
    title = toneItem.name.split("(")[0].trim();
    categoryTag = toneItem.chineseName;
    mainAudio = toneItem.audioSample;
    vietnameseApprox = toneItem.vietnameseApproximation;
    mouthShape = toneItem.pitchGraph;
    tipsText = toneItem.pronunciationGuide;
    rulesText = toneItem.description;
    exampleWords = toneItem.syllableExamples.map((ex) => ({
      hanzi: ex.hanzi,
      pinyin: ex.pinyin,
      vietnamese: ex.meaning
    }));
  }

  const handlePlayAudio = async (text: string, overrideSpeed?: number) => {
    setCurrentlyPlaying(text);
    try {
      await playChineseAudio(text, overrideSpeed || speed);
    } catch (err) {
      console.error(err);
    } finally {
      setCurrentlyPlaying(null);
    }
  };

  const handleStartSpeech = async () => {
    setIsRecording(true);
    setSpokenTranscript("");
    setSpeechScore(null);
    setSpeechFeedback(null);

    const recorder = new VoiceAudioRecorder();
    voiceRecorderRef.current = recorder;
    await recorder.start();

    const targetText = mainAudio || title;

    const recognizer = createSpeechRecognizer(
      async (text: string) => {
        setSpokenTranscript(text);
        setIsRecording(false);
        await voiceRecorderRef.current?.stop();

        // Calculate simple similarity
        const cleanTarget = targetText.toLowerCase().trim();
        const cleanSpoken = text.toLowerCase().trim();

        if (cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken)) {
          setSpeechScore(100);
          setSpeechFeedback("🎉 Xuất sắc! Phát âm chuẩn xác, ngữ điệu rất tự nhiên.");
        } else {
          setSpeechScore(75);
          setSpeechFeedback("👍 Rất tốt! Hãy mở rộng khẩu hình và thử phát âm rõ hơn nữa nhé.");
        }
      },
      async (err) => {
        console.warn(err);
        setIsRecording(false);
        await voiceRecorderRef.current?.stop();
        setSpeechFeedback("Chưa nhận diện rõ âm thanh, bạn hãy thử phát âm lại gần micro hơn.");
      },
      async () => {
        setIsRecording(false);
        await voiceRecorderRef.current?.stop();
      }
    );

    if (recognizer) {
      recognizerRef.current = recognizer;
      recognizer.start();
    } else {
      setIsRecording(false);
      setSpeechFeedback("Trình duyệt không hỗ trợ nhận diện giọng nói.");
    }
  };

  const handleStopSpeech = async () => {
    setIsRecording(false);
    try {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
      await voiceRecorderRef.current?.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-2 sm:pt-6 pb-2 sm:pb-6 px-2 sm:px-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[calc(100dvh-1rem)] sm:max-h-[88vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-slideDown sm:animate-zoomIn mt-0 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-4 py-3 sm:px-5 sm:py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200">
              {categoryTag || "Pinyin"}
            </span>
            {isAspirated && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                Bật hơi mạnh
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Speed toggle */}
            <button
              type="button"
              onClick={() => setSpeed(speed === 1.0 ? 0.75 : 1.0)}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all border cursor-pointer active:scale-95 ${
                speed === 0.75
                  ? "bg-amber-50 border-amber-300 text-amber-700"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
              title="Tốc độ phát âm"
            >
              Tốc độ: {speed}x
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition-all cursor-pointer active:scale-90"
              title="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Pronunciation Banner */}
        <div className="px-4 py-3.5 sm:px-6 sm:py-5 bg-gradient-to-br from-blue-50/90 via-sky-50/40 to-white border-b border-slate-100 shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight font-mono">
                {title}
              </span>
              {mainAudio && mainAudio !== title && (
                <div className="text-sm font-bold text-slate-500">
                  Phát âm: <span className="text-blue-600 text-lg font-black font-mono">{mainAudio}</span>
                </div>
              )}
            </div>

            {/* Play Sound Button */}
            <button
              type="button"
              onClick={() => handlePlayAudio(mainAudio || title)}
              className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl font-black text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ${
                currentlyPlaying === (mainAudio || title)
                  ? "bg-blue-700 text-white ring-4 ring-blue-300 scale-105"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25"
              }`}
            >
              <Volume2 className={`w-5 h-5 ${currentlyPlaying ? "animate-bounce" : ""}`} />
              <span>Nghe phát âm</span>
            </button>
          </div>

          {/* Vietnamese Approximation Pill */}
          {vietnameseApprox && (
            <div className="mt-2.5 p-2.5 rounded-xl bg-white/95 border border-blue-200/90 text-xs text-blue-950 font-medium flex items-start gap-2 shadow-2xs">
              <span className="font-black text-blue-700 shrink-0 bg-blue-100/80 px-2 py-0.5 rounded-md">
                Phát âm chuẩn tiếng Việt:
              </span>
              <span className="font-bold text-slate-800 leading-snug">{vietnameseApprox}</span>
            </div>
          )}
        </div>

        {/* Navigation Tabs inside Modal */}
        <div className="flex items-center px-4 pt-1.5 border-b border-slate-200 bg-white gap-1 sm:gap-2 overflow-x-auto scrollbar-none shrink-0">
          <button
            type="button"
            onClick={() => setActiveSubTab("guide")}
            className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer active:scale-95 ${
              activeSubTab === "guide"
                ? "border-blue-600 text-blue-600 bg-blue-50/50"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            Khẩu hình & Mẹo âm
          </button>

          {toneVariations.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveSubTab("tones")}
              className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer active:scale-95 ${
                activeSubTab === "tones"
                  ? "border-blue-600 text-blue-600 bg-blue-50/50"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              4 Thanh điệu ({toneVariations.length})
            </button>
          )}

          {exampleWords.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveSubTab("vocab")}
              className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer active:scale-95 ${
                activeSubTab === "vocab"
                  ? "border-blue-600 text-blue-600 bg-blue-50/50"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Từ vựng thực tế ({exampleWords.length})
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveSubTab("speech")}
            className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer active:scale-95 flex items-center gap-1.5 ${
              activeSubTab === "speech"
                ? "border-blue-600 text-blue-600 bg-blue-50/50"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-orange-500" />
            <span>Luyện nói thử</span>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div 
          ref={contentScrollRef}
          className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1 overscroll-contain"
        >
          {/* TAB 1: KHẨU HÌNH & MẸO PHÁT ÂM */}
          {activeSubTab === "guide" && (
            <div className="space-y-4 animate-fadeIn">
              {/* Vietnamese Comparison Block */}
              {vietnameseApprox && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/90 to-sky-50/50 border border-blue-200 space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-black text-blue-900 uppercase tracking-wide">
                    <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Đối chiếu phát âm chuẩn với tiếng Việt:</span>
                  </div>
                  <p className="text-sm font-bold text-blue-950 leading-relaxed">
                    {vietnameseApprox}
                  </p>
                </div>
              )}

              {/* Mouth Shape */}
              {mouthShape && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>Khẩu hình miệng & Đặt lưỡi chuẩn:</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    {mouthShape}
                  </p>
                </div>
              )}

              {/* Pronunciation Tips */}
              {tipsText && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Mẹo phát âm chuẩn bản xứ:</span>
                  </div>
                  <p className="text-sm text-emerald-950 leading-relaxed">
                    {tipsText}
                  </p>
                </div>
              )}

              {/* Common Mistakes */}
              {mistakesText && (
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-800">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Lỗi người Việt hay mắc phải:</span>
                  </div>
                  <p className="text-sm text-rose-950 leading-relaxed">
                    {mistakesText}
                  </p>
                </div>
              )}

              {/* Rules / Orthography */}
              {rulesText && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    <span>Quy tắc chính tả & Ghép âm:</span>
                  </div>
                  <p className="text-sm text-amber-950 leading-relaxed">
                    {rulesText}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BẢNG 4 THANH ĐIỆU */}
          {activeSubTab === "tones" && (
            <div className="space-y-4 animate-fadeIn">
              <p className="text-xs text-slate-500">
                Bấm vào từng thanh điệu để luyện nghe sự thay đổi cao độ khi phát âm:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {toneVariations.map((tv) => {
                  const isSelected = selectedToneText === tv.text;
                  const isPlaying = currentlyPlaying === tv.text;
                  return (
                    <button
                      key={tv.tone}
                      type="button"
                      onClick={() => {
                        setSelectedToneText(tv.text);
                        handlePlayAudio(tv.text);
                      }}
                      className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-2 active:scale-95 duration-100 select-none ${
                        isSelected || isPlaying
                          ? "bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-300 scale-[1.02]"
                          : "bg-slate-50 hover:bg-white border-slate-200 hover:border-blue-400 hover:shadow-xs"
                      }`}
                    >
                      <span className={`text-xs font-bold ${isSelected || isPlaying ? "text-blue-100" : "text-slate-500"}`}>
                        {tv.label}
                      </span>
                      <span className={`text-3xl font-black font-mono ${isSelected || isPlaying ? "text-white" : "text-blue-600"}`}>
                        {tv.text}
                      </span>
                      <span className={`text-[11px] font-medium leading-tight ${isSelected || isPlaying ? "text-blue-100" : "text-slate-400"}`}>
                        {tv.pitch}
                      </span>
                      <div className={`mt-1 p-1.5 rounded-full ${isSelected || isPlaying ? "bg-white/20 text-white" : "bg-white text-blue-600 shadow-xs"}`}>
                        <Volume2 className="w-4 h-4" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: TỪ VỰNG VÍ DỤ */}
          {activeSubTab === "vocab" && (
            <div className="space-y-3 animate-fadeIn">
              <p className="text-xs text-slate-500">
                Các từ vựng thông dụng chứa âm này trong giao tiếp hàng ngày và may mặc:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {exampleWords.map((word, idx) => {
                  const isSelected = selectedVocabWord === word.hanzi;
                  const isPlaying = currentlyPlaying === word.hanzi;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedVocabWord(word.hanzi);
                        handlePlayAudio(word.hanzi);
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 active:scale-95 duration-150 select-none group ${
                        isSelected
                          ? "bg-blue-50/95 border-blue-500 ring-2 ring-blue-500/30 shadow-md scale-[1.01]"
                          : "bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/20"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className={`text-2xl font-black font-sans tracking-wide transition-colors ${
                          isSelected ? "text-blue-700" : "text-slate-900 group-hover:text-blue-600"
                        }`}>
                          {word.hanzi}
                        </div>
                        <div className="text-xs font-mono font-bold text-blue-600 mt-0.5">
                          {word.pinyin}
                        </div>
                        <div className="text-xs text-slate-500 truncate mt-0.5">
                          {word.vietnamese}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isPlaying ? (
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black animate-pulse shadow-2xs">
                            <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                            <span>Đang đọc</span>
                          </span>
                        ) : isSelected ? (
                          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold border border-blue-200">
                            <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>Đã chọn</span>
                          </span>
                        ) : (
                          <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 transition-colors">
                            <Volume2 className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: LUYỆN NÓI THỬ */}
          {activeSubTab === "speech" && (
            <div className="space-y-5 text-center py-4 animate-fadeIn">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Mục tiêu phát âm:
                </span>
                <div className="text-4xl font-black text-blue-600 font-mono">
                  {mainAudio || title}
                </div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Nhấn nút bên dưới và đọc to âm này vào micro để kiểm tra độ chính xác.
                </p>
              </div>

              {/* Mic action button */}
              <div className="flex flex-col items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={isRecording ? handleStopSpeech : handleStartSpeech}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all cursor-pointer active:scale-90 ${
                    isRecording
                      ? "bg-rose-500 hover:bg-rose-600 ring-8 ring-rose-200 animate-pulse"
                      : "bg-gradient-to-tr from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 shadow-blue-500/30"
                  }`}
                >
                  {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </button>
                <span className="text-xs font-bold text-slate-600">
                  {isRecording ? "Đang lắng nghe... Bấm để dừng" : "Chạm để bắt đầu nói"}
                </span>
              </div>

              {/* Speech Result */}
              {(spokenTranscript || speechFeedback) && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 max-w-md mx-auto">
                  {spokenTranscript && (
                    <div className="text-xs">
                      <span className="text-slate-400">Âm thanh nghe được:</span>{" "}
                      <strong className="text-slate-800 font-bold font-mono text-sm">
                        "{spokenTranscript}"
                      </strong>
                    </div>
                  )}
                  {speechScore !== null && (
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-bold text-slate-700">
                        Điểm phát âm: <strong className="text-emerald-600 text-sm">{speechScore}/100</strong>
                      </span>
                    </div>
                  )}
                  {speechFeedback && (
                    <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-2 mt-1">
                      {speechFeedback}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Navigation */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between shrink-0">
          <button
            type="button"
            disabled={!hasPrev}
            onClick={onSelectPrev}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none hover:bg-white transition-all cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Âm trước</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-all cursor-pointer active:scale-95"
          >
            Đóng
          </button>

          <button
            type="button"
            disabled={!hasNext}
            onClick={onSelectNext}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none shadow-xs shadow-blue-500/20 transition-all cursor-pointer active:scale-95"
          >
            <span>Âm tiếp theo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : modalContent;
};
