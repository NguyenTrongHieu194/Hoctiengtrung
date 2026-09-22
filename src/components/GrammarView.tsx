import React, { useState, useMemo } from "react";
import { 
  BookOpen, 
  Search, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Lightbulb, 
  HelpCircle, 
  Award, 
  RotateCcw, 
  ArrowRight, 
  Filter, 
  Layers, 
  ChevronRight, 
  Bookmark, 
  BookmarkCheck,
  Bot,
  Play,
  Share2,
  Check,
  Flame
} from "lucide-react";
import { DEEP_GRAMMAR_POINTS, GRAMMAR_CATEGORIES } from "../data/grammarData";
import { DeepGrammarPoint, GrammarCategory, HSKLevelId, UserProgressData } from "../types";
import { playChineseAudio, playScoreSound } from "../services/speechService";
import { ScrollableTabs } from "./ScrollableTabs";

interface GrammarViewProps {
  userProgress: UserProgressData;
  onOpenAITutorWithPrompt?: (prompt: string) => void;
  onRecordXP?: (amount: number) => void;
}

export const GrammarView: React.FC<GrammarViewProps> = ({
  userProgress,
  onOpenAITutorWithPrompt,
  onRecordXP
}) => {
  // State
  const [selectedCategory, setSelectedCategory] = useState<GrammarCategory | "all">("all");
  const [selectedHskLevel, setSelectedHskLevel] = useState<HSKLevelId | "ALL" | "GARMENT">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrammarId, setSelectedGrammarId] = useState<string>(DEEP_GRAMMAR_POINTS[0].id);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("bookmarked_grammar_ids");
      return saved ? JSON.parse(saved) : ["g_ba_sentence", "g_three_de"];
    } catch {
      return ["g_ba_sentence", "g_three_de"];
    }
  });

  // Quiz state for active grammar point
  const [quizAnswers, setQuizAnswers] = useState<{ [quizId: string]: string }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<{ [quizId: string]: boolean }>({});
  const [reorderSelectedWords, setReorderSelectedWords] = useState<{ [quizId: string]: string[] }>({});

  // Active viewing mode: 'study' (Chi tiết lý thuyết) | 'practice' (Luyện bài tập)
  const [viewMode, setViewMode] = useState<"study" | "practice">("study");

  // Filtered grammar list
  const filteredGrammarPoints = useMemo(() => {
    return DEEP_GRAMMAR_POINTS.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // HSK Level filter
      if (selectedHskLevel !== "ALL") {
        if (selectedHskLevel === "GARMENT") {
          if (item.category !== "garment_factory") return false;
        } else if (item.hskLevel !== selectedHskLevel) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchPinyin = item.pinyinTitle?.toLowerCase().includes(q);
        const matchSummary = item.shortSummary.toLowerCase().includes(q);
        const matchFormula = item.formula.some((f) => f.toLowerCase().includes(q));
        const matchExamples = item.examples.some(
          (ex) => ex.hanzi.toLowerCase().includes(q) || ex.vietnamese.toLowerCase().includes(q)
        );
        return matchTitle || matchPinyin || matchSummary || matchFormula || matchExamples;
      }
      return true;
    });
  }, [selectedCategory, selectedHskLevel, searchQuery]);

  // Active selected grammar item
  const activeGrammar = useMemo(() => {
    const found = DEEP_GRAMMAR_POINTS.find((g) => g.id === selectedGrammarId);
    return found || filteredGrammarPoints[0] || DEEP_GRAMMAR_POINTS[0];
  }, [selectedGrammarId, filteredGrammarPoints]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("bookmarked_grammar_ids", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleSelectWordInReorder = (quizId: string, word: string) => {
    setReorderSelectedWords((prev) => {
      const current = prev[quizId] || [];
      const updated = current.includes(word) ? current.filter((w) => w !== word) : [...current, word];
      return { ...prev, [quizId]: updated };
    });
  };

  const handleCheckQuizAnswer = (quizId: string, correctAnswer: string) => {
    const isReorder = reorderSelectedWords[quizId] !== undefined;
    let answer = quizAnswers[quizId] || "";
    if (isReorder) {
      answer = (reorderSelectedWords[quizId] || []).join("");
    }

    setQuizSubmitted((prev) => ({ ...prev, [quizId]: true }));
    const isCorrect = answer.trim() === correctAnswer.replace(/\s+/g, "");
    playScoreSound(isCorrect);
    if (isCorrect) {
      if (onRecordXP) {
        onRecordXP(15);
      }
    }
  };

  const handleResetQuiz = (quizId: string) => {
    setQuizAnswers((prev) => {
      const copy = { ...prev };
      delete copy[quizId];
      return copy;
    });
    setQuizSubmitted((prev) => {
      const copy = { ...prev };
      delete copy[quizId];
      return copy;
    });
    setReorderSelectedWords((prev) => {
      const copy = { ...prev };
      delete copy[quizId];
      return copy;
    });
  };

  const handleAskAIAboutGrammar = (grammar: DeepGrammarPoint) => {
    const prompt = `Thầy ơi, giải thích sâu hơn giúp em điểm ngữ pháp: "${grammar.title}". Cung cấp thêm 3 ví dụ giao tiếp thực tế và chỉ rõ cách phân biệt khi người Việt dễ bị nhầm lẫn nhé!`;
    if (onOpenAITutorWithPrompt) {
      onOpenAITutorWithPrompt(prompt);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Banner Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 sm:p-8 text-white shadow-xl shadow-orange-500/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wide border border-white/30">
              <span>📖 CHUYÊN ĐỀ NGỮ PHÁP CHUẨN HSK 1 - 6</span>
              <span className="w-2 h-2 rounded-full bg-amber-200 animate-ping" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Học Chuyên Sâu Ngữ Pháp Tiếng Trung
            </h1>
            <p className="text-xs sm:text-sm text-amber-50 max-w-2xl font-medium leading-relaxed">
              Làm chủ các mẫu câu đặc biệt (把, 被, 比, 是...的), phân biệt 3 chữ Đích-Đắc-Địa (的-得-地), hệ thống Bổ ngữ toàn diện và ngữ pháp chuyên ngành May mặc kèm bài tập tương tác.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-center">
              <div className="text-xl sm:text-2xl font-black">{DEEP_GRAMMAR_POINTS.length}</div>
              <div className="text-[11px] font-bold text-amber-100">Chuyên đề cốt lõi</div>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-center">
              <div className="text-xl sm:text-2xl font-black flex items-center justify-center gap-1">
                <span>{bookmarkedIds.length}</span>
                <BookmarkCheck className="w-5 h-5 text-amber-200" />
              </div>
              <div className="text-[11px] font-bold text-amber-100">Đã lưu ôn tập</div>
            </div>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        {/* Search input and HSK level chips */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="grammar-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo cấu trúc, pinyin (vd: 把, de, so sánh, bổ ngữ, thời gian...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 text-xs sm:text-sm font-semibold outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Level Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none shrink-0">
            {(["ALL", "HSK1", "HSK2", "HSK3", "GARMENT"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedHskLevel(lvl)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer border ${
                  selectedHskLevel === lvl
                    ? "bg-orange-500 text-white border-orange-600 shadow-sm shadow-orange-500/20 scale-105"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                }`}
              >
                {lvl === "ALL" ? "Tất cả Level" : lvl === "GARMENT" ? "🧵 Xưởng May" : lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Category Scrollable Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 border cursor-pointer ${
              selectedCategory === "all"
                ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Tất cả chủ đề</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-800">
              {DEEP_GRAMMAR_POINTS.length}
            </span>
          </button>

          {GRAMMAR_CATEGORIES.map((cat) => {
            const count = DEEP_GRAMMAR_POINTS.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 border cursor-pointer ${
                  isSelected
                    ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20 scale-105"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-orange-50 hover:border-orange-200"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name.split("(")[0]}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    isSelected ? "bg-white/30 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grammar Layout: Left Master List / Right Detail deep dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List of Grammar Points */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-orange-500" />
              Danh Sách Ngữ Pháp ({filteredGrammarPoints.length})
            </h3>
          </div>

          <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
            {filteredGrammarPoints.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 space-y-2">
                <span className="text-2xl">🔍</span>
                <p className="text-xs font-bold text-slate-600">Không tìm thấy điểm ngữ pháp phù hợp.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedHskLevel("ALL");
                  }}
                  className="text-xs font-bold text-orange-600 underline"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            ) : (
              filteredGrammarPoints.map((item) => {
                const isActive = item.id === activeGrammar.id;
                const isBookmarked = bookmarkedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedGrammarId(item.id);
                      setViewMode("study");
                    }}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all relative ${
                      isActive
                        ? "bg-orange-50/80 border-orange-500 shadow-md shadow-orange-500/10 ring-2 ring-orange-400/30"
                        : "bg-white border-slate-200/80 hover:border-orange-300 hover:bg-orange-50/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md bg-orange-100 text-orange-800 text-[10px] font-black">
                            {item.hskLevel}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            {item.categoryName}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 font-medium">
                          {item.shortSummary}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(item.id);
                        }}
                        className="p-1.5 rounded-xl hover:bg-orange-100 text-slate-400 hover:text-orange-600 transition-colors shrink-0"
                        title={isBookmarked ? "Bỏ đánh dấu" : "Lưu vào sổ tay"}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 text-orange-600 fill-orange-500" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Progress indicator */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <span>{item.examples.length} ví dụ</span> • <span>{item.quizzes.length} bài tập</span>
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-orange-600 translate-x-0.5" : "text-slate-400"}`} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Deep-Dive Workspace */}
        <div className="lg:col-span-8 space-y-4">
          {activeGrammar && (
            <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm p-4 sm:p-6 space-y-6">
              {/* Header of Active Point */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-orange-500 text-white text-xs font-black shadow-xs">
                      {activeGrammar.hskLevel}
                    </span>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                      {activeGrammar.categoryName}
                    </span>
                    {activeGrammar.pinyinTitle && (
                      <span className="text-xs font-mono font-bold text-orange-600">
                        {activeGrammar.pinyinTitle}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">
                    {activeGrammar.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleAskAIAboutGrammar(activeGrammar)}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-purple-200 transition-transform active:scale-95 cursor-pointer"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Hỏi Thầy AI 🤖</span>
                  </button>

                  <button
                    onClick={() => toggleBookmark(activeGrammar.id)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      bookmarkedIds.includes(activeGrammar.id)
                        ? "bg-amber-50 border-amber-300 text-amber-600"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                    }`}
                    title="Lưu vào sổ tay"
                  >
                    {bookmarkedIds.includes(activeGrammar.id) ? (
                      <BookmarkCheck className="w-5 h-5 fill-current" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* View Switcher: Lý thuyết vs Luyện bài tập */}
              <div className="flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200/80">
                <button
                  onClick={() => setViewMode("study")}
                  className={`flex-1 py-2 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    viewMode === "study"
                      ? "bg-white text-orange-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>1. Lý Thuyết & Phân Tích Chuyên Sâu</span>
                </button>
                <button
                  onClick={() => setViewMode("practice")}
                  className={`flex-1 py-2 px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    viewMode === "practice"
                      ? "bg-white text-emerald-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>2. Luyện Tập Tương Tác ({activeGrammar.quizzes.length} câu)</span>
                </button>
              </div>

              {/* MODE 1: STUDY VIEW */}
              {viewMode === "study" && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Short Summary & Explanation */}
                  <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-2">
                    <h4 className="text-xs font-black text-orange-900 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-orange-600" />
                      Bản chất & Định nghĩa cốt lõi:
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {activeGrammar.shortSummary}
                    </p>
                    <div className="space-y-1 pt-1">
                      {activeGrammar.explanation.map((exp, idx) => (
                        <p key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <span className="text-orange-500 font-bold">•</span>
                          <span>{exp}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Mathematical Formula Breakdown with Interactive Syntax Constructor */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                        <span className="text-base">📐</span> Cấu Trúc & Sơ Đồ Khối Cú Pháp:
                      </h4>
                      <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                        Khối màu trực quan
                      </span>
                    </div>

                    {/* Interactive Formula Cards */}
                    <div className="space-y-2.5">
                      {activeGrammar.formula.map((f, idx) => {
                        // Split formula by '+' to render visual colored blocks
                        const parts = f.split(/\s*\+\s*/);

                        return (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl bg-slate-900 text-white shadow-md space-y-2.5 border border-slate-800"
                          >
                            <div className="flex items-center flex-wrap gap-2">
                              {parts.map((p, pIdx) => {
                                const isHighlight = p.includes("把") || p.includes("被") || p.includes("比") || p.includes("得") || p.includes("地") || p.includes("的");
                                const isVerb = p.toLowerCase().includes("v") || p.includes("động từ") || p.includes("动词");
                                const isSubject = p.toLowerCase().includes("s") || p.includes("chủ ngữ") || p.includes("主语");

                                let badgeColor = "bg-slate-800 text-slate-200 border-slate-700";
                                if (isHighlight) badgeColor = "bg-amber-500 text-slate-950 font-black border-amber-400 shadow-sm";
                                else if (isVerb) badgeColor = "bg-emerald-600 text-white font-bold border-emerald-500";
                                else if (isSubject) badgeColor = "bg-blue-600 text-white font-bold border-blue-500";

                                return (
                                  <React.Fragment key={pIdx}>
                                    <span className={`px-2.5 py-1 rounded-xl text-xs sm:text-sm font-mono border ${badgeColor}`}>
                                      {p.trim()}
                                    </span>
                                    {pIdx < parts.length - 1 && (
                                      <span className="text-slate-500 font-bold text-xs">+</span>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                            </div>
                            <p className="text-[11px] text-slate-400 font-mono">
                              Công thức số {idx + 1}: {f}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Golden Rules & Pro-tips */}
                  {activeGrammar.goldenRules.length > 0 && (
                    <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
                      <h4 className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-600" />
                        Quy Tắc Vàng & Những Điều Cấm Kỵ:
                      </h4>
                      <div className="space-y-1.5">
                        {activeGrammar.goldenRules.map((rule, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-amber-950 font-medium">
                            <span className="text-amber-600 font-bold shrink-0">⭐</span>
                            <span>{rule}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contrastive Common Mistakes (Sai vs Đúng) */}
                  {activeGrammar.commonMistakes.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-black text-rose-900 flex items-center gap-1.5 uppercase tracking-wider">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        Các Lỗi Sai Kinh Điển Cần Tránh (Sai vs Đúng):
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {activeGrammar.commonMistakes.map((mis, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {/* Wrong version */}
                              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                                <div className="flex items-center gap-1.5 text-rose-700 text-xs font-black">
                                  <XCircle className="w-4 h-4" />
                                  <span>Cách dùng SAI:</span>
                                </div>
                                <p className="text-xs sm:text-sm font-bold text-rose-900 font-sans">
                                  {mis.wrongHanzi}
                                </p>
                                <p className="text-[11px] font-mono text-rose-600">{mis.wrongPinyin}</p>
                              </div>

                              {/* Correct version */}
                              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-black">
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span>Cách dùng ĐÚNG:</span>
                                </div>
                                <p className="text-xs sm:text-sm font-bold text-emerald-900 font-sans">
                                  {mis.correctHanzi}
                                </p>
                                <p className="text-[11px] font-mono text-emerald-600">{mis.correctPinyin}</p>
                                <p className="text-[11px] text-emerald-800 font-medium">{mis.correctTranslation}</p>
                              </div>
                            </div>

                            <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 font-medium">
                              💡 <strong>Giải thích lý do:</strong> {mis.explanation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Real-life Examples with Audio */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                      <Volume2 className="w-4 h-4 text-sky-600" />
                      Ví Dụ Thực Tế & Phân Tích Thành Phần Câu:
                    </h4>
                    <div className="space-y-2.5">
                      {activeGrammar.examples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 transition-colors shadow-xs space-y-2 group"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1 flex-1">
                              <p className="text-base sm:text-lg font-black text-slate-900">
                                {ex.hanzi}
                              </p>
                              <p className="text-xs font-mono text-sky-600 font-semibold">{ex.pinyin}</p>
                              <p className="text-xs sm:text-sm font-medium text-slate-700">{ex.vietnamese}</p>
                            </div>

                            <button
                              onClick={() => playChineseAudio(ex.hanzi, 0.85)}
                              className="p-2.5 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white transition-all shadow-xs shrink-0 active:scale-95 cursor-pointer"
                              title="Nghe phát âm mẫu"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>

                          {ex.analysis && (
                            <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center gap-1.5">
                              <span className="font-bold text-slate-700">Phân tích:</span>
                              <span>{ex.analysis}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action to switch to practice */}
                  <div className="pt-2">
                    <button
                      onClick={() => setViewMode("practice")}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs sm:text-sm font-black shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
                    >
                      <span>Làm bài tập củng cố cấu trúc này</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* MODE 2: PRACTICE / QUIZ VIEW */}
              {viewMode === "practice" && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-emerald-600" />
                      Bài Tập Tương Tác Củng Cố ({activeGrammar.quizzes.length} câu hỏi)
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {activeGrammar.quizzes.map((quiz, qIdx) => {
                      const isSubmitted = quizSubmitted[quiz.id];
                      const selectedAnswer = quizAnswers[quiz.id] || "";
                      const reorderList = reorderSelectedWords[quiz.id] || [];
                      const isReorder = quiz.type === "reorder";
                      const currentReorderString = reorderList.join("");
                      const isCorrect = isReorder
                        ? currentReorderString === quiz.correctAnswer.replace(/\s+/g, "")
                        : selectedAnswer === quiz.correctAnswer;

                      return (
                        <div
                          key={quiz.id}
                          className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/50 space-y-4 shadow-xs"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-white text-[11px] font-black">
                              Câu {qIdx + 1}
                            </span>
                            {isSubmitted && (
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-xs font-black flex items-center gap-1 ${
                                  isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                                }`}
                              >
                                {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                {isCorrect ? "Chính xác! (+15 XP)" : "Chưa chính xác"}
                              </span>
                            )}
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm sm:text-base font-black text-slate-900">
                              {quiz.question}
                            </p>
                            {quiz.pinyinPrompt && (
                              <p className="text-xs font-mono text-slate-500">{quiz.pinyinPrompt}</p>
                            )}
                          </div>

                          {/* Multiple Choice / Fill Blank Options */}
                          {quiz.options && !isReorder && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {quiz.options.map((opt, optIdx) => {
                                const isSelected = selectedAnswer === opt;
                                let btnStyle = "bg-white border-slate-200 text-slate-800 hover:border-orange-300";
                                if (isSubmitted) {
                                  if (opt === quiz.correctAnswer) {
                                    btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-900 font-black";
                                  } else if (isSelected) {
                                    btnStyle = "bg-rose-100 border-rose-500 text-rose-900 font-bold";
                                  }
                                } else if (isSelected) {
                                  btnStyle = "bg-orange-50 border-orange-500 text-orange-900 font-black shadow-xs";
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    disabled={isSubmitted}
                                    onClick={() => {
                                      setQuizAnswers((prev) => ({ ...prev, [quiz.id]: opt }));
                                    }}
                                    className={`p-3 rounded-xl border-2 text-xs sm:text-sm text-left transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                                  >
                                    <span>{opt}</span>
                                    {isSubmitted && opt === quiz.correctAnswer && (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {/* Sentence Reordering Interaction */}
                          {isReorder && quiz.words && (
                            <div className="space-y-3">
                              {/* Answer staging box */}
                              <div className="p-3.5 rounded-xl bg-white border-2 border-dashed border-slate-300 min-h-[52px] flex items-center flex-wrap gap-2">
                                {reorderList.length === 0 ? (
                                  <span className="text-xs text-slate-400 italic">
                                    Bấm vào các từ bên dưới theo đúng trật tự câu...
                                  </span>
                                ) : (
                                  reorderList.map((w, wIdx) => (
                                    <button
                                      key={wIdx}
                                      disabled={isSubmitted}
                                      onClick={() => handleSelectWordInReorder(quiz.id, w)}
                                      className="px-3 py-1.5 rounded-lg bg-orange-500 text-white font-black text-xs shadow-xs hover:bg-orange-600 active:scale-95 transition-all flex items-center gap-1"
                                    >
                                      <span>{w}</span>
                                      {!isSubmitted && <span className="text-[10px] opacity-70">✕</span>}
                                    </button>
                                  ))
                                )}
                              </div>

                              {/* Word bank */}
                              <div className="flex items-center flex-wrap gap-2 pt-1">
                                {quiz.words.map((w, wIdx) => {
                                  const isUsed = reorderList.includes(w);
                                  return (
                                    <button
                                      key={wIdx}
                                      disabled={isUsed || isSubmitted}
                                      onClick={() => handleSelectWordInReorder(quiz.id, w)}
                                      className={`px-3.5 py-2 rounded-xl text-xs font-black border-2 transition-all cursor-pointer ${
                                        isUsed
                                          ? "opacity-30 bg-slate-200 border-slate-300 cursor-not-allowed"
                                          : "bg-white border-slate-200 text-slate-800 hover:border-orange-400 hover:bg-orange-50 active:scale-95"
                                      }`}
                                    >
                                      {w}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Submit / Reset Actions */}
                          <div className="flex items-center justify-between pt-2">
                            {!isSubmitted ? (
                              <button
                                disabled={isReorder ? reorderList.length === 0 : !selectedAnswer}
                                onClick={() => handleCheckQuizAnswer(quiz.id, quiz.correctAnswer)}
                                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md shadow-emerald-600/20 disabled:opacity-40 transition-transform active:scale-95 cursor-pointer"
                              >
                                Kiểm tra đáp án
                              </button>
                            ) : (
                              <button
                                onClick={() => handleResetQuiz(quiz.id)}
                                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Làm lại câu này</span>
                              </button>
                            )}
                          </div>

                          {/* Explanation after submission */}
                          {isSubmitted && (
                            <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1 text-slate-700 animate-fadeIn">
                              <p className="font-bold text-slate-900">
                                🎯 Đáp án đúng: <span className="text-emerald-700">{quiz.correctAnswer}</span>
                              </p>
                              <p className="text-slate-600">💡 {quiz.explanation}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
