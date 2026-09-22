import React, { useState, useMemo, useEffect } from "react";
import { 
  Award, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  Bookmark, 
  Eye, 
  EyeOff, 
  Grid, 
  Filter, 
  Sparkles, 
  Zap, 
  ChevronRight, 
  ChevronLeft,
  X,
  HelpCircle,
  Clock,
  Flame,
  Check
} from "lucide-react";
import { ALL_RADICALS, RADICAL_CATEGORIES_CONFIG } from "../data/radicals";
import { RadicalItem, RadicalCategory } from "../types";
import { playChineseAudio } from "../services/speechService";

interface RadicalsQuizViewProps {
  savedRadicalIds: number[];
  onToggleBookmark: (id: number, e?: React.MouseEvent) => void;
  onBackToLessons?: () => void;
}

type QuestionMode = "all214" | "50q" | "20q" | "10q" | "custom_category" | "custom_strokes";

interface QuizQuestionItem {
  id: number;
  target: RadicalItem;
  options: RadicalItem[];
  correctIndex: number;
  userAnswer: number | null;
  isAnswered: boolean;
  isCorrect: boolean | null;
}

const STORAGE_QUIZ_KEY = "hellochina_radicals_quiz_state_v2";

export const RadicalsQuizView: React.FC<RadicalsQuizViewProps> = ({
  savedRadicalIds,
  onToggleBookmark,
  onBackToLessons
}) => {
  // Config & Filters
  const [questionCountMode, setQuestionCountMode] = useState<QuestionMode>("all214");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<RadicalCategory | "all">("all");
  const [selectedStrokeFilter, setSelectedStrokeFilter] = useState<number | "all">("all");
  const [hidePromptPinyin, setHidePromptPinyin] = useState<boolean>(false);
  const [isShuffleQuestions, setIsShuffleQuestions] = useState<boolean>(true);

  // Audio state
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Quiz state
  const [questions, setQuestions] = useState<QuizQuestionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [showQuestionGrid, setShowQuestionGrid] = useState<boolean>(false);
  const [wrongQuestionsOnly, setWrongQuestionsOnly] = useState<boolean>(false);

  // Generate Questions Function
  const generateQuiz = (
    mode: QuestionMode,
    catFilter: RadicalCategory | "all" = "all",
    strokeFilter: number | "all" = "all",
    shuffle: boolean = true,
    onlyWrongFromItems: RadicalItem[] | null = null
  ) => {
    let sourceRadicals: RadicalItem[] = [...ALL_RADICALS];

    if (onlyWrongFromItems && onlyWrongFromItems.length > 0) {
      sourceRadicals = onlyWrongFromItems;
    } else {
      if (catFilter !== "all") {
        sourceRadicals = sourceRadicals.filter((r) => r.category === catFilter);
      }
      if (strokeFilter !== "all") {
        sourceRadicals = sourceRadicals.filter((r) => r.strokeCount === strokeFilter);
      }
    }

    if (sourceRadicals.length === 0) {
      sourceRadicals = [...ALL_RADICALS];
    }

    let targetRadicals = [...sourceRadicals];
    if (shuffle) {
      targetRadicals = targetRadicals.sort(() => 0.5 - Math.random());
    }

    // Limit count based on mode
    if (!onlyWrongFromItems) {
      if (mode === "10q") {
        targetRadicals = targetRadicals.slice(0, 10);
      } else if (mode === "20q") {
        targetRadicals = targetRadicals.slice(0, 20);
      } else if (mode === "50q") {
        targetRadicals = targetRadicals.slice(0, 50);
      } else if (mode === "all214") {
        // Full 214 radicals!
        targetRadicals = targetRadicals.slice(0, 214);
      }
    }

    const newQuestions: QuizQuestionItem[] = targetRadicals.map((target, idx) => {
      // Pick 3 distractors from ALL_RADICALS (avoiding the target)
      const distractors = ALL_RADICALS.filter((r) => r.id !== target.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const options = [target, ...distractors].sort(() => 0.5 - Math.random());
      const correctIndex = options.findIndex((opt) => opt.id === target.id);

      return {
        id: idx + 1,
        target,
        options,
        correctIndex,
        userAnswer: null,
        isAnswered: false,
        isCorrect: null,
      };
    });

    setQuestions(newQuestions);
    setCurrentIndex(0);
    setIsQuizCompleted(false);
    setShowQuestionGrid(false);
  };

  // Initial Load / Storage Recovery
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_QUIZ_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.questions && parsed.questions.length > 0) {
          setQuestions(parsed.questions);
          setCurrentIndex(parsed.currentIndex || 0);
          setQuestionCountMode(parsed.questionCountMode || "all214");
          setIsQuizCompleted(parsed.isQuizCompleted || false);
          return;
        }
      }
    } catch {}
    // Default: generate 214 questions
    generateQuiz("all214", "all", "all", true);
  }, []);

  // Save Progress to LocalStorage
  useEffect(() => {
    if (questions.length > 0) {
      try {
        localStorage.setItem(
          STORAGE_QUIZ_KEY,
          JSON.stringify({
            questions,
            currentIndex,
            questionCountMode,
            isQuizCompleted,
          })
        );
      } catch {}
    }
  }, [questions, currentIndex, questionCountMode, isQuizCompleted]);

  const currentQ = questions[currentIndex];

  // Scoring
  const stats = useMemo(() => {
    const answeredCount = questions.filter((q) => q.isAnswered).length;
    const correctCount = questions.filter((q) => q.isCorrect === true).length;
    const wrongCount = questions.filter((q) => q.isCorrect === false).length;
    const totalScore = correctCount * 10;
    const maxScore = questions.length * 10;
    const percent = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    const wrongRadicals = questions.filter((q) => q.isCorrect === false).map((q) => q.target);

    return {
      answeredCount,
      correctCount,
      wrongCount,
      totalScore,
      maxScore,
      percent,
      wrongRadicals,
    };
  }, [questions]);

  const handleSelectAnswer = (optionIndex: number) => {
    if (!currentQ || currentQ.isAnswered) return;

    const isCorrect = optionIndex === currentQ.correctIndex;

    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex] = {
      ...currentQ,
      userAnswer: optionIndex,
      isAnswered: true,
      isCorrect,
    };

    setQuestions(updatedQuestions);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handlePlayAudio = async (text: string, id: string, rate: number = 0.9, phoneticHint?: string) => {
    setPlayingAudioId(id);
    await playChineseAudio(text, rate, phoneticHint);
    setPlayingAudioId(null);
  };

  const handleRestartQuiz = () => {
    localStorage.removeItem(STORAGE_QUIZ_KEY);
    generateQuiz(questionCountMode, selectedCategoryFilter, selectedStrokeFilter, isShuffleQuestions);
  };

  const handleRetryWrongQuestions = () => {
    if (stats.wrongRadicals.length === 0) return;
    setWrongQuestionsOnly(true);
    generateQuiz("custom_category", "all", "all", true, stats.wrongRadicals);
  };

  return (
    <div id="radicals-quiz-view-root" className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-16">
      
      {/* 1. Header Toolbar & Quick Stats */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-5 sm:p-7 text-white shadow-xl shadow-blue-900/15 border border-blue-400/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/30">
                <Sparkles className="w-3.5 h-3.5 text-orange-300" />
                <span>Trắc Nghiệm 214 Bộ Thủ Khang Hy</span>
              </span>
              <span className="text-xs font-bold bg-orange-500 text-white px-2.5 py-0.5 rounded-full shadow-2xs">
                {questions.length === 214 ? "Trọn Bộ 214 Câu 🌟" : `${questions.length} Câu Hỏi`}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Luyện Trắc Nghiệm Nhớ Nhanh Bộ Thủ
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 font-medium">
              Các đáp án ẩn Pinyin giúp bạn nhận diện mặt chữ và nghĩa Hán–Việt chính xác 100%.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            {/* Toggle Hide/Show Pinyin in Prompt */}
            <button
              onClick={() => setHidePromptPinyin(!hidePromptPinyin)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer shadow-xs ${
                hidePromptPinyin
                  ? "bg-amber-400 text-slate-900 border-amber-300 shadow-md scale-105"
                  : "bg-white/15 text-white border-white/30 hover:bg-white/25"
              }`}
              title={hidePromptPinyin ? "Đang tắt Pinyin ở đề bài" : "Bấm để tắt Pinyin ở đề bài"}
            >
              {hidePromptPinyin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{hidePromptPinyin ? "Đã tắt Pinyin đề" : "Tắt Pinyin đề"}</span>
            </button>

            {/* Question Grid Modal Toggle */}
            <button
              onClick={() => setShowQuestionGrid(true)}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-3.5 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Xem danh sách tất cả câu hỏi"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Bảng {questions.length} câu</span>
            </button>

            {/* Reset / New Test */}
            <button
              onClick={handleRestartQuiz}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3.5 py-2 rounded-2xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-orange-500/30"
              title="Làm bộ đề mới"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm mới</span>
            </button>
          </div>
        </div>

        {/* Mode Selector Chips */}
        <div className="mt-5 pt-4 border-t border-white/20 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-blue-200">Số lượng câu:</span>
          
          <button
            onClick={() => {
              setQuestionCountMode("all214");
              generateQuiz("all214", selectedCategoryFilter, selectedStrokeFilter, isShuffleQuestions);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
              questionCountMode === "all214"
                ? "bg-white text-blue-800 shadow-md scale-105"
                : "bg-white/15 text-white hover:bg-white/25"
            }`}
          >
            🌟 Toàn bộ 214 Bộ (214 câu)
          </button>

          <button
            onClick={() => {
              setQuestionCountMode("50q");
              generateQuiz("50q", selectedCategoryFilter, selectedStrokeFilter, isShuffleQuestions);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              questionCountMode === "50q"
                ? "bg-white text-blue-800 shadow-md scale-105"
                : "bg-white/15 text-white hover:bg-white/25"
            }`}
          >
            ⚡ 50 câu
          </button>

          <button
            onClick={() => {
              setQuestionCountMode("20q");
              generateQuiz("20q", selectedCategoryFilter, selectedStrokeFilter, isShuffleQuestions);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              questionCountMode === "20q"
                ? "bg-white text-blue-800 shadow-md scale-105"
                : "bg-white/15 text-white hover:bg-white/25"
            }`}
          >
            🎯 20 câu
          </button>

          <button
            onClick={() => {
              setQuestionCountMode("10q");
              generateQuiz("10q", selectedCategoryFilter, selectedStrokeFilter, isShuffleQuestions);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              questionCountMode === "10q"
                ? "bg-white text-blue-800 shadow-md scale-105"
                : "bg-white/15 text-white hover:bg-white/25"
            }`}
          >
            ⏱️ 10 câu nhanh
          </button>
        </div>
      </div>

      {/* 2. Main Question Card (When Not Completed) */}
      {!isQuizCompleted && currentQ ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-lg relative">
          
          {/* Progress Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  Câu hỏi {currentIndex + 1} / {questions.length}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  • Bộ thủ #{currentQ.target.id} ({currentQ.target.strokeCount} nét)
                </span>
              </div>
              <div className="w-48 sm:w-64 bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.round(((currentIndex + 1) / questions.length) * 100)}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Đúng / Đã làm</div>
                <div className="text-base font-black text-slate-800">
                  <span className="text-emerald-600">{stats.correctCount}</span> / {stats.answeredCount} câu
                </div>
              </div>
              <div className="text-right pl-3 border-l border-slate-200">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Điểm số</div>
                <div className="text-lg font-black text-orange-600">{stats.totalScore} đ</div>
              </div>
            </div>
          </div>

          {/* Question Prompt Center Card */}
          <div className="text-center py-6 sm:py-8 bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-slate-50 rounded-3xl border border-blue-100 mb-6 relative overflow-hidden">
            
            {/* Top Action inside Prompt: Speaker & Bookmark */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => onToggleBookmark(currentQ.target.id)}
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  savedRadicalIds.includes(currentQ.target.id)
                    ? "bg-amber-100 text-amber-600 border-amber-300"
                    : "bg-white text-slate-400 hover:text-amber-500 border-slate-200"
                }`}
                title={savedRadicalIds.includes(currentQ.target.id) ? "Đã lưu bộ thủ này" : "Lưu bộ thủ này"}
              >
                <Bookmark className={`w-4 h-4 ${savedRadicalIds.includes(currentQ.target.id) ? "fill-amber-500" : ""}`} />
              </button>

              <button
                onClick={() => handlePlayAudio(currentQ.target.radical, `rad_prompt_${currentQ.target.id}`, 0.9, currentQ.target.pinyin)}
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  playingAudioId === `rad_prompt_${currentQ.target.id}`
                    ? "bg-blue-600 text-white border-blue-600 animate-pulse"
                    : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                }`}
                title="Nghe phát âm chuẩn"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Giant Radical Character */}
            <div className="text-6xl sm:text-7xl font-serif font-black text-blue-700 mb-2 drop-shadow-xs">
              {currentQ.target.radical}
            </div>

            {/* Variants if any */}
            {currentQ.target.variants && currentQ.target.variants.length > 0 && (
              <div className="text-xs text-slate-500 font-medium mb-1">
                Biến thể: <span className="font-bold text-slate-700">{currentQ.target.variants.join(", ")}</span>
              </div>
            )}

            {/* Prompt Pinyin (Can be toggled) */}
            {!hidePromptPinyin ? (
              <div className="text-sm font-semibold text-slate-600">
                Pinyin: <strong className="text-slate-900 font-mono text-base">{currentQ.target.pinyin}</strong>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 font-medium">
                <EyeOff className="w-3 h-3" />
                <span>Pinyin đã được ẩn (Thử thách nhận diện chữ)</span>
              </div>
            )}

            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
              Hãy chọn tên Hán-Việt và ý nghĩa đúng của bộ thủ trên:
            </p>
          </div>

          {/* Options List (TẤT CẢ ĐÁP ÁN ĐỀU ĐÃ TẮT PINYIN NHƯ YÊU CẦU) */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isCorrect = idx === currentQ.correctIndex;
              const isSelected = currentQ.userAnswer === idx;

              let btnStyle = "bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-slate-800 shadow-2xs";

              if (currentQ.isAnswered) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-50 text-emerald-900 border-emerald-500 font-bold ring-2 ring-emerald-500/20";
                } else if (isSelected) {
                  btnStyle = "bg-rose-50 text-rose-900 border-rose-500 ring-2 ring-rose-500/20";
                } else {
                  btnStyle = "opacity-45 bg-slate-50 border-slate-200 text-slate-500";
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={currentQ.isAnswered}
                  onClick={() => handleSelectAnswer(idx)}
                  className={`w-full p-4 sm:p-4.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer group ${btnStyle}`}
                >
                  <div className="pr-4">
                    {/* Tên Hán Việt (KHÔNG HIỂN THỊ PINYIN TRONG ĐÁP ÁN) */}
                    <div className="font-black text-base sm:text-lg text-slate-900 group-hover:text-blue-700 transition-colors flex items-center gap-2">
                      <span>Bộ {opt.sinoVietnamese}</span>
                      {currentQ.isAnswered && (
                        <span className="text-xs font-mono font-semibold text-slate-500">
                          ({opt.pinyin})
                        </span>
                      )}
                    </div>
                    {/* Ý nghĩa tiếng Việt */}
                    <div className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-relaxed">
                      Ý nghĩa: {opt.vietnamese}
                    </div>
                  </div>

                  {/* Option Letter / Status Icon */}
                  <div className="shrink-0">
                    {currentQ.isAnswered ? (
                      isCorrect ? (
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                          <Check className="w-5 h-5 stroke-[3]" />
                        </div>
                      ) : isSelected ? (
                        <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md">
                          <X className="w-5 h-5 stroke-[3]" />
                        </div>
                      ) : (
                        <span className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-400">
                          {String.fromCharCode(65 + idx)}
                        </span>
                      )
                    ) : (
                      <span className="w-8 h-8 rounded-full border-2 border-slate-300 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-xs font-black text-slate-600 transition-all">
                        {String.fromCharCode(65 + idx)}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Explanation Banner (Appears after answer is selected) */}
          {currentQ.isAnswered && (
            <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 animate-fadeIn space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {currentQ.isCorrect ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                      <CheckCircle2 className="w-4 h-4" />
                      Chính xác! (+10 điểm)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-black text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-300">
                      <XCircle className="w-4 h-4" />
                      Chưa chính xác!
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handlePlayAudio(currentQ.target.radical, `exp_rad_${currentQ.target.id}`, 0.9, currentQ.target.pinyin)}
                  className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 bg-white px-3 py-1 rounded-xl border border-blue-200 shadow-2xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Nghe phát âm
                </button>
              </div>

              {/* Mnemonic / Insight */}
              {currentQ.target.mnemonic && (
                <p className="text-xs sm:text-sm text-slate-700 font-medium">
                  💡 <strong className="text-slate-900">Mẹo ghi nhớ:</strong> {currentQ.target.mnemonic}
                </p>
              )}

              {/* Examples */}
              {currentQ.target.vocabularyExamples && currentQ.target.vocabularyExamples.length > 0 && (
                <div className="pt-2 border-t border-blue-200/60">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Từ vựng tiêu biểu:</span>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {currentQ.target.vocabularyExamples.slice(0, 3).map((ex, exIdx) => (
                      <span 
                        key={exIdx}
                        className="bg-white px-2.5 py-1 rounded-lg text-xs font-medium text-slate-800 border border-blue-100 flex items-center gap-1"
                      >
                        <span className="font-bold text-blue-700 font-serif">{ex.hanzi}</span>
                        <span className="text-slate-400 font-mono text-[11px]">({ex.pinyin})</span>: {ex.vietnamese}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Controls Footer */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={handlePrevQuestion}
              disabled={currentIndex === 0}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
                currentIndex === 0
                  ? "opacity-30 text-slate-400 cursor-not-allowed"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Câu trước</span>
            </button>

            <button
              id="btn-next-question-action"
              onClick={handleNextQuestion}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer shadow-lg shadow-blue-500/25 flex items-center gap-2 active:scale-95"
            >
              <span>{currentIndex < questions.length - 1 ? "Câu tiếp theo" : "Xem kết quả bài thi"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : null}

      {/* 3. Finished Summary View (When Completed) */}
      {isQuizCompleted && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-xl text-center animate-fadeIn">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 text-white mx-auto flex items-center justify-center mb-5 shadow-lg shadow-orange-500/30">
            <Award className="w-10 h-10" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Hoàn Thành Bài Trắc Nghiệm Bộ Thủ!
          </h3>
          <p className="text-slate-600 text-sm mt-1 max-w-md mx-auto font-medium">
            Bạn đã hoàn thành bài kiểm tra gồm <strong className="text-blue-600">{questions.length} câu hỏi</strong> bộ thủ Khang Hy.
          </p>

          {/* Big Score Board */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto my-6">
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
              <span className="text-xs font-bold text-slate-500">Tổng điểm</span>
              <div className="text-2xl font-black text-blue-700 mt-0.5">{stats.totalScore} đ</div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
              <span className="text-xs font-bold text-slate-500">Đúng</span>
              <div className="text-2xl font-black text-emerald-700 mt-0.5">{stats.correctCount} câu</div>
            </div>

            <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200">
              <span className="text-xs font-bold text-slate-500">Chưa đúng</span>
              <div className="text-2xl font-black text-rose-700 mt-0.5">{stats.wrongCount} câu</div>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
              <span className="text-xs font-bold text-slate-500">Tỷ lệ chính xác</span>
              <div className="text-2xl font-black text-amber-700 mt-0.5">{stats.percent}%</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {stats.wrongCount > 0 && (
              <button
                onClick={handleRetryWrongQuestions}
                className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm transition-all shadow-md shadow-rose-500/20 flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Luyện lại {stats.wrongCount} câu làm sai</span>
              </button>
            )}

            <button
              onClick={() => {
                setQuestionCountMode("all214");
                generateQuiz("all214", "all", "all", true);
              }}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Làm bài 214 câu mới</span>
            </button>

            {onBackToLessons && (
              <button
                onClick={onBackToLessons}
                className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition cursor-pointer"
              >
                Quay về danh sách bộ thủ
              </button>
            )}
          </div>

          {/* List of Wrong Questions if any */}
          {stats.wrongRadicals.length > 0 && (
            <div className="mt-8 text-left border-t border-slate-200 pt-6">
              <h4 className="font-black text-slate-900 text-base mb-3 flex items-center gap-2">
                <span className="text-rose-500">❌</span>
                <span>Các bộ thủ cần ôn tập thêm ({stats.wrongRadicals.length} bộ):</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {stats.wrongRadicals.map((wRad) => (
                  <div 
                    key={wRad.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-blue-700 font-serif font-black text-xl flex items-center justify-center">
                        {wRad.radical}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">
                          Bộ {wRad.sinoVietnamese} <span className="text-slate-500 font-mono">({wRad.pinyin})</span>
                        </div>
                        <div className="text-[11px] text-slate-600 line-clamp-1">
                          {wRad.vietnamese}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePlayAudio(wRad.radical, `wrong_rad_${wRad.id}`, 0.9, wRad.pinyin)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 bg-white rounded-lg border border-slate-200"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Question Grid Drawer / Modal (All 214 Questions Navigator) */}
      {showQuestionGrid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col border border-slate-200 shadow-2xl">
            
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-black text-base sm:text-lg text-slate-900">
                  Bảng Điều Hướng {questions.length} Câu Hỏi
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Bấm vào ô số để chuyển nhanh đến câu hỏi tương ứng
                </p>
              </div>
              <button
                onClick={() => setShowQuestionGrid(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-xl transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Legend */}
            <div className="px-5 py-2.5 bg-white border-b border-slate-100 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-emerald-500 inline-block" />
                Đúng ({stats.correctCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-rose-500 inline-block" />
                Chưa đúng ({stats.wrongCount})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-blue-600 inline-block" />
                Đang làm
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-slate-200 inline-block" />
                Chưa trả lời
              </span>
            </div>

            {/* Grid of Numbers */}
            <div className="p-5 overflow-y-auto max-h-[55vh]">
              <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                {questions.map((q, qIdx) => {
                  let bgStyle = "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200";

                  if (q.isAnswered) {
                    if (q.isCorrect) {
                      bgStyle = "bg-emerald-500 text-white font-bold border-emerald-600 shadow-2xs";
                    } else {
                      bgStyle = "bg-rose-500 text-white font-bold border-rose-600 shadow-2xs";
                    }
                  }

                  if (qIdx === currentIndex) {
                    bgStyle = "bg-blue-600 text-white font-black ring-2 ring-blue-400 ring-offset-1";
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(qIdx);
                        setShowQuestionGrid(false);
                      }}
                      className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center ${bgStyle}`}
                    >
                      <span>{qIdx + 1}</span>
                      <span className="text-[10px] font-serif opacity-80">{q.target.radical}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
              <button
                onClick={() => setShowQuestionGrid(false)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition cursor-pointer"
              >
                Đóng bảng
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
