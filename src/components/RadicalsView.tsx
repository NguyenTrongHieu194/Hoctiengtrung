import React, { useState, useMemo, useEffect } from "react";
import {
  ALL_RADICALS,
  RADICAL_CATEGORIES_CONFIG,
  RADICAL_LESSONS,
  getRadicalById,
} from"../data/radicals";
import { RadicalItem, RadicalCategory, RadicalLesson } from"../types";
import { playChineseAudio } from"../services/speechService";
import { StrokeWriterCanvas } from "./StrokeWriterCanvas";
import { ScrollableTabs } from "./ScrollableTabs";
import { RadicalsQuizView } from "./RadicalsQuizView";
import {
  BookOpen,
  Search,
  Grid,
  Sparkles,
  Volume2,
  PenTool,
  Award,
  ChevronRight,
  ChevronLeft,
  X,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  SlidersHorizontal,
  Bookmark,
  BookMarked
} from"lucide-react";

export const RadicalsView: React.FC = () => {
  // Navigation & Sub-views
  const [activeSubTab, setActiveSubTab] = useState<"lessons" | "all" | "saved" | "practice" | "quiz">("lessons");
  const [selectedLesson, setSelectedLesson] = useState<RadicalLesson | null>(null);
  const [selectedRadical, setSelectedRadical] = useState<RadicalItem | null>(null);
  
  // Filters for "all" tab
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<RadicalCategory | "all">("all");
  const [selectedStrokeCount, setSelectedStrokeCount] = useState<number | "all">("all");

  // Search for "saved" tab
  const [savedSearchQuery, setSavedSearchQuery] = useState("");

  // Audio State
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Bookmarks
  const [savedRadicalIds, setSavedRadicalIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("hsk_saved_radicals");
      return saved ? JSON.parse(saved) : [1, 9, 30, 38, 61, 64, 85, 86, 120, 145];
    } catch {
      return [1, 9, 30, 38, 61, 64, 85, 86, 120, 145];
    }
  });

  // Sync bookmarks from custom events or external changes
  useEffect(() => {
    const handleSavedUpdate = (e: Event) => {
      const custom = e as CustomEvent<number[]>;
      const incoming = Array.isArray(custom.detail)
        ? custom.detail
        : (() => {
            try {
              const raw = localStorage.getItem("hsk_saved_radicals");
              return raw ? JSON.parse(raw) : null;
            } catch {
              return null;
            }
          })();

      if (Array.isArray(incoming)) {
        setSavedRadicalIds((prev) => {
          if (
            prev.length === incoming.length &&
            prev.every((val, idx) => val === incoming[idx])
          ) {
            return prev;
          }
          return incoming;
        });
      }
    };
    window.addEventListener("savedRadicalsUpdated", handleSavedUpdate);
    window.addEventListener("storage", handleSavedUpdate);
    return () => {
      window.removeEventListener("savedRadicalsUpdated", handleSavedUpdate);
      window.removeEventListener("storage", handleSavedUpdate);
    };
  }, []);

  const toggleBookmark = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedRadicalIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem("hsk_saved_radicals", JSON.stringify(next));
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("savedRadicalsUpdated", { detail: next }));
        }, 0);
      } catch {}
      return next;
    });
  };

  // Saved radicals list
  const savedRadicalsList = useMemo(() => {
    return ALL_RADICALS.filter((r) => savedRadicalIds.includes(r.id));
  }, [savedRadicalIds]);

  const filteredSavedRadicals = useMemo(() => {
    if (!savedSearchQuery.trim()) return savedRadicalsList;
    const q = savedSearchQuery.trim().toLowerCase();
    return savedRadicalsList.filter(
      (r) =>
        r.radical.toLowerCase().includes(q) ||
        r.pinyin.toLowerCase().includes(q) ||
        r.sinoVietnamese.toLowerCase().includes(q) ||
        r.vietnamese.toLowerCase().includes(q) ||
        r.id.toString() === q
    );
  }, [savedRadicalsList, savedSearchQuery]);

  // Filtered Radicals List
  const filteredRadicals = useMemo(() => {
    let list = ALL_RADICALS;

    if (selectedCategory !=="all") {
      list = list.filter((r) => r.category === selectedCategory);
    }

    if (selectedStrokeCount !=="all") {
      list = list.filter((r) => r.strokeCount === selectedStrokeCount);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.radical.toLowerCase().includes(q) ||
          r.pinyin.toLowerCase().includes(q) ||
          r.sinoVietnamese.toLowerCase().includes(q) ||
          r.vietnamese.toLowerCase().includes(q) ||
          r.id.toString() === q ||
          (r.variants && r.variants.some((v) => v.toLowerCase().includes(q))) ||
          r.vocabularyExamples.some(
            (ex) =>
              ex.hanzi.toLowerCase().includes(q) ||
              ex.pinyin.toLowerCase().includes(q) ||
              ex.vietnamese.toLowerCase().includes(q) ||
              ex.sinoVietnamese.toLowerCase().includes(q)
          )
      );
    }

    return list;
  }, [selectedCategory, selectedStrokeCount, searchQuery]);

  const handlePlayAudio = async (text: string, id: string, rate: number = 0.9, phoneticHint?: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPlayingAudioId(id);
    await playChineseAudio(text, rate, phoneticHint);
    setPlayingAudioId(null);
  };

  const handleNextRadical = () => {
    if (!selectedRadical) return;
    const currentIndex = ALL_RADICALS.findIndex((r) => r.id === selectedRadical.id);
    if (currentIndex < ALL_RADICALS.length - 1) {
      setSelectedRadical(ALL_RADICALS[currentIndex + 1]);
    } else {
      setSelectedRadical(ALL_RADICALS[0]);
    }
  };

  const handlePrevRadical = () => {
    if (!selectedRadical) return;
    const currentIndex = ALL_RADICALS.findIndex((r) => r.id === selectedRadical.id);
    if (currentIndex > 0) {
      setSelectedRadical(ALL_RADICALS[currentIndex - 1]);
    } else {
      setSelectedRadical(ALL_RADICALS[ALL_RADICALS.length - 1]);
    }
  };

  return (
    <div id="radicals-view-root" className="w-full max-w-full overflow-hidden bg-white text-slate-900 pb-20">
      {/* Top Hero Banner - Bright Rose/Amber Accent Card */}
      <div className="bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 text-white rounded-3xl p-5 sm:p-8 shadow-lg shadow-rose-500/15 mb-6 sm:mb-8 w-full max-w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 bg-white/30 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full border border-white/40">
                  <Sparkles className="w-3.5 h-3.5" />
                  Giáo Trình Chuẩn 214 Bộ Thủ Khang Hy
                </span>
                <span className="bg-black/20 text-white text-xs font-black px-2.5 py-1 rounded-full">
                  HSK 1-6 & May Mặc ✨
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight font-serif flex items-center gap-3">
                <span>214 Bộ Thủ Hán Tự (部首)</span>
              </h1>
              <p className="mt-2 text-rose-50 text-sm sm:text-base max-w-2xl font-medium leading-relaxed">
                Gốc rễ cấu thành mọi chữ Hán. Được phân nhóm theo Thiên nhiên, Con người, Động vật, May mặc, Cây cối, Nhà cửa; đầy đủ Pinyin, thứ tự nét viết chuẩn và 3-4 từ vựng minh họa sinh động.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 bg-black/20 backdrop-blur-xs p-3.5 rounded-2xl border border-white/20 text-center">
              <div className="px-2">
                <div className="text-xl sm:text-2xl font-black text-amber-200">214</div>
                <div className="text-[11px] text-rose-100 font-bold">Bộ thủ đầy đủ</div>
              </div>
              <div className="px-2 border-x border-white/20">
                <div className="text-xl sm:text-2xl font-black text-amber-200">12</div>
                <div className="text-[11px] text-rose-100 font-bold">Bài học chuyên đề</div>
              </div>
              <div className="px-2">
                <div className="text-xl sm:text-2xl font-black text-amber-200">850+</div>
                <div className="text-[11px] text-rose-100 font-bold">Từ vựng minh họa</div>
              </div>
            </div>
          </div>

          {/* Sub-Navigation Navigation Bar */}
          <ScrollableTabs
            hintText="Trượt xem 5 mục bộ thủ"
            pillColor="rose"
            className="mt-6"
          >
            <button
              id="subtab-lessons"
              onClick={() => {
                setActiveSubTab("lessons");
                setSelectedLesson(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition whitespace-nowrap cursor-pointer shrink-0 ${
                activeSubTab === "lessons"
                  ? "bg-white text-rose-600 shadow-md scale-105"
                  : "bg-white/20 hover:bg-white/30 text-white"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              12 Bài Học Chuyên Đề
            </button>

            <button
              id="subtab-all-radicals"
              onClick={() => setActiveSubTab("all")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition whitespace-nowrap cursor-pointer shrink-0 ${
                activeSubTab === "all"
                  ? "bg-white text-rose-600 shadow-md scale-105"
                  : "bg-white/20 hover:bg-white/30 text-white"
              }`}
            >
              <Grid className="w-4 h-4" />
              Tra Cứu Toàn Bộ (214 Bộ)
            </button>

            <button
              id="subtab-saved-radicals"
              onClick={() => setActiveSubTab("saved")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition whitespace-nowrap cursor-pointer shrink-0 ${
                activeSubTab === "saved"
                  ? "bg-white text-amber-600 shadow-md scale-105"
                  : "bg-white/20 hover:bg-white/30 text-white"
              }`}
            >
              <Bookmark className="w-4 h-4 fill-current" />
              <span>Bộ Thủ Đánh Dấu</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                activeSubTab === "saved"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-white/30 text-white"
              }`}>
                {savedRadicalIds.length}
              </span>
            </button>

            <button
              id="subtab-practice-writing"
              onClick={() => {
                setActiveSubTab("practice");
                if (!selectedRadical) setSelectedRadical(ALL_RADICALS[0]);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition whitespace-nowrap cursor-pointer shrink-0 ${
                activeSubTab === "practice"
                  ? "bg-white text-rose-600 shadow-md scale-105"
                  : "bg-white/20 hover:bg-white/30 text-white"
              }`}
            >
              <PenTool className="w-4 h-4" />
              Tập Viết Nét Chuẩn
            </button>

            <button
              id="subtab-quiz"
              onClick={() => setActiveSubTab("quiz")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition whitespace-nowrap cursor-pointer shrink-0 ${
                activeSubTab === "quiz"
                  ? "bg-white text-rose-600 shadow-md scale-105"
                  : "bg-white/20 hover:bg-white/30 text-white"
              }`}
            >
              <Award className="w-4 h-4" />
              Luyện Trắc Nghiệm 214 Bộ Thủ
            </button>
          </ScrollableTabs>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        {/* VIEW 1: THEMATIC LESSONS (12 BÀI HỌC) */}
        {activeSubTab ==="lessons" && (
          <div>
            {!selectedLesson ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-stone-900">
                      Chương Trình 12 Bài Học Bộ Thủ Liên Kết
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500  mt-0.5">
                      Được sắp xếp khoa học theo ngữ nghĩa tương đồng giúp nhớ lâu gấp 3 lần so với học thuộc lòng số nét.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {RADICAL_LESSONS.map((lesson, idx) => {
                    const radicalsInLesson = lesson.radicalIds
                      .map((id) => getRadicalById(id))
                      .filter((r): r is RadicalItem => r !== undefined);

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson)}
                        className="group bg-white  rounded-2xl p-5 border border-stone-200  hover:border-red-400  shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-red-50 text-red-700   border border-red-100">
                              Bài {idx + 1}
                            </span>
                            <span className="text-xs text-stone-500 font-medium">
                              {radicalsInLesson.length} bộ thủ
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-stone-900  group-hover:text-red-600  transition">
                            {lesson.title}
                          </h3>
                          <p className="text-xs text-stone-600  mt-1.5 line-clamp-2 leading-relaxed">
                            {lesson.description}
                          </p>

                          {/* Radical Preview Pills */}
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {radicalsInLesson.slice(0, 8).map((r) => (
                              <span
                                key={r.id}
                                className="w-8 h-8 rounded-lg bg-stone-100  text-stone-800  font-serif font-bold text-base flex items-center justify-center border border-stone-200/60"
                              >
                                {r.radical}
                              </span>
                            ))}
                            {radicalsInLesson.length > 8 && (
                              <span className="text-xs text-stone-400 flex items-center px-1 font-medium">
                                +{radicalsInLesson.length - 8}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-5 pt-3 border-t border-stone-100  flex items-center justify-between text-xs font-semibold text-red-600  group-hover:translate-x-0.5 transition-transform">
                          <span>Bắt đầu học bài này</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Inside Selected Lesson View */
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => setSelectedLesson(null)}
                    className="p-2 rounded-xl bg-white  border border-stone-200  text-stone-600  hover:bg-stone-100  transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <div className="text-xs text-red-600  font-bold uppercase tracking-wider">
                      Chi tiết bài học
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                      {selectedLesson.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500  mt-0.5">
                      {selectedLesson.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedLesson.radicalIds
                    .map((id) => getRadicalById(id))
                    .filter((r): r is RadicalItem => r !== undefined)
                    .map((r) => (
                      <div
                        key={r.id}
                        onClick={() => setSelectedRadical(r)}
                        className="bg-white  rounded-2xl p-5 border border-stone-200  hover:border-red-400  hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <span className="w-14 h-14 rounded-2xl bg-amber-50  text-red-600  font-serif font-black text-3xl flex items-center justify-center border border-amber-200  shadow-inner group-hover:scale-105 transition-transform">
                                {r.radical}
                              </span>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-extrabold text-stone-900">
                                    {r.pinyin}
                                  </span>
                                  <button
                                    onClick={(e) => handlePlayAudio(r.radical, `rad_${r.id}`, 0.9, r.pinyin, e)}
                                    className="p-1 text-stone-400 hover:text-red-600 transition"
                                  >
                                    <Volume2 className={`w-4 h-4 ${playingAudioId ===`rad_${r.id}` ?"text-red-600 animate-pulse" :""}`} />
                                  </button>
                                </div>
                                <div className="text-xs font-semibold text-red-700">
                                  Bộ {r.sinoVietnamese}
                                </div>
                                <div className="text-[11px] text-stone-500  mt-0.5">
                                  {r.strokeCount} nét • #{r.id}
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={(e) => toggleBookmark(r.id, e)}
                              className="text-stone-400 hover:text-amber-500 transition p-1"
                            >
                              {savedRadicalIds.includes(r.id) ? (
                                <BookMarked className="w-4 h-4 text-amber-500 fill-amber-500" />
                              ) : (
                                <Bookmark className="w-4 h-4" />
                              )}
                            </button>
                          </div>

                          {/* Meaning & Variants */}
                          <p className="text-xs text-stone-700  font-medium mt-3">
                            {r.vietnamese}
                          </p>

                          {r.variants && r.variants.length > 0 && (
                            <div className="flex items-center gap-1.5 mt-2">
                              <span className="text-[11px] text-stone-500">Biến thể:</span>
                              {r.variants.map((v, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-1.5 py-0.5 rounded bg-stone-100  font-serif font-bold text-red-600  border border-stone-200"
                                >
                                  {v}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Vocabulary Pill Preview */}
                          <div className="mt-4 pt-3 border-t border-stone-100">
                            <div className="text-[11px] font-semibold text-stone-500 mb-1.5">
                              Từ vựng minh họa tiêu biểu:
                            </div>
                            <div className="space-y-1">
                              {r.vocabularyExamples.slice(0, 2).map((ex, i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between text-xs bg-stone-50  px-2 py-1 rounded-lg"
                                >
                                  <span className="font-bold text-stone-800">
                                    {ex.hanzi} <span className="text-[11px] font-normal text-stone-500">({ex.pinyin})</span>
                                  </span>
                                  <span className="text-stone-600  text-[11px] truncate max-w-[130px]">
                                    {ex.vietnamese}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 text-xs font-semibold text-red-600  flex items-center justify-between">
                          <span>Xem đầy đủ & tập viết</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: ALL 214 RADICALS (FULL LIST WITH CATEGORY & STROKE FILTERS) */}
        {activeSubTab ==="all" && (
          <div>
            {/* Filter Toolbar */}
            <div className="bg-white  p-5 rounded-2xl border border-stone-200  shadow-sm mb-6 space-y-4">
              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  id="input-search-radicals"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo chữ Hán (木, 水), Pinyin (mù, shuǐ), Hán Việt (Mộc, Thủy), nghĩa tiếng Việt hoặc từ vựng..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-50  border border-stone-200  text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Filter Chips */}
              <div>
                <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5" />
                  Nhóm chủ đề bộ thủ:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                      selectedCategory ==="all"
                        ?"bg-red-600 text-white shadow-sm"
                        :"bg-stone-100  text-stone-700  hover:bg-stone-200"
                    }`}
                  >
                    Tất cả nhóm ({ALL_RADICALS.length})
                  </button>
                  {RADICAL_CATEGORIES_CONFIG.map((cat) => {
                    const count = ALL_RADICALS.filter((r) => r.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`text-xs px-3 py-1.5 rounded-xl font-medium transition ${
                          selectedCategory === cat.id
                            ?"bg-red-600 text-white shadow-sm"
                            :"bg-stone-100  text-stone-700  hover:bg-stone-200"
                        }`}
                      >
                        {cat.name} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stroke Count Filter */}
              <div className="pt-2 border-t border-stone-100">
                <ScrollableTabs hintText="Trượt chọn số nét" pillColor="stone" className="py-1">
                  <span className="text-xs font-semibold text-stone-500 whitespace-nowrap shrink-0 pr-1">
                    Số nét viết:
                  </span>
                  <button
                    onClick={() => setSelectedStrokeCount("all")}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition cursor-pointer shrink-0 ${
                      selectedStrokeCount === "all"
                        ? "bg-stone-900 text-white"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    Tất cả
                  </button>
                  {Array.from({ length: 17 }, (_, i) => i + 1).map((strokes) => {
                    const count = ALL_RADICALS.filter((r) => r.strokeCount === strokes).length;
                    if (count === 0) return null;
                    return (
                      <button
                        key={strokes}
                        onClick={() => setSelectedStrokeCount(strokes)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition cursor-pointer shrink-0 ${
                          selectedStrokeCount === strokes
                            ? "bg-stone-900 text-white"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {strokes} nét ({count})
                      </button>
                    );
                  })}
                </ScrollableTabs>
              </div>
            </div>

            {/* Results Count & Grid */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-stone-500">
                Hiển thị <strong className="text-stone-900">{filteredRadicals.length}</strong> / 214 bộ thủ
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
              {filteredRadicals.map((r) => (
                <div
                  key={r.id}
                  onClick={() => setSelectedRadical(r)}
                  className="bg-white  p-4 rounded-2xl border border-stone-200  hover:border-red-400  hover:shadow-md transition cursor-pointer flex flex-col justify-between group relative"
                >
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                    <span>#{r.id}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] bg-stone-100 px-1.5 py-0.5 rounded">
                        {r.strokeCount} nét
                      </span>
                      <button
                        onClick={(e) => toggleBookmark(r.id, e)}
                        className="p-1 text-stone-400 hover:text-amber-500 transition"
                        title={savedRadicalIds.includes(r.id) ? "Bỏ đánh dấu" : "Đánh dấu bộ thủ"}
                      >
                        {savedRadicalIds.includes(r.id) ? (
                          <BookMarked className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        ) : (
                          <Bookmark className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Character Center */}
                  <div className="text-center py-2">
                    <div className="text-3xl sm:text-4xl font-serif font-bold text-red-600  group-hover:scale-110 transition-transform inline-block">
                      {r.radical}
                    </div>
                    <div className="text-xs font-bold text-stone-800  mt-1">
                      {r.pinyin}
                    </div>
                    <div className="text-xs font-semibold text-red-700">
                      {r.sinoVietnamese}
                    </div>
                  </div>

                  {/* Meaning Bottom */}
                  <div className="text-[11px] text-stone-500  text-center line-clamp-1 border-t border-stone-100  pt-2 mt-1">
                    {r.vietnamese}
                  </div>
                </div>
              ))}
            </div>

            {filteredRadicals.length === 0 && (
              <div className="text-center py-16 bg-white  rounded-2xl border border-stone-200">
                <p className="text-stone-500 font-medium">Không tìm thấy bộ thủ nào phù hợp với từ khóa.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedStrokeCount("all");
                  }}
                  className="mt-3 text-xs font-semibold text-red-600 hover:underline"
                >
                  Xóa bộ lọc tìm kiếm
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2.5: SAVED RADICALS (BỘ THỦ ĐÃ ĐÁNH DẤU) */}
        {activeSubTab === "saved" && (
          <div className="space-y-6">
            {/* Header / Intro */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-md shadow-amber-500/25 shrink-0">
                  <Bookmark className="w-6 h-6 fill-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-stone-900 flex items-center gap-2">
                    Bộ Thủ Đã Đánh Dấu
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-black border border-amber-200">
                      {savedRadicalsList.length} bộ thủ
                    </span>
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Các bộ thủ quan trọng bạn đã lưu lại để tra cứu và luyện viết nét chuẩn
                  </p>
                </div>
              </div>

              {/* Quick Search inside Saved */}
              <div className="w-full sm:w-72 relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={savedSearchQuery}
                  onChange={(e) => setSavedSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm bộ thủ đã lưu..."
                  className="w-full pl-9 pr-8 py-2 text-xs bg-stone-50 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 focus:bg-white"
                />
                {savedSearchQuery && (
                  <button
                    onClick={() => setSavedSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Grid of Saved Radicals */}
            {filteredSavedRadicals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredSavedRadicals.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRadical(r)}
                    className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-amber-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between group relative"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-14 h-14 rounded-2xl bg-amber-50 text-red-600 font-serif font-black text-3xl flex items-center justify-center border border-amber-200 shadow-inner group-hover:scale-105 transition-transform">
                            {r.radical}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-extrabold text-stone-900">
                                {r.pinyin}
                              </span>
                              <button
                                onClick={(e) => handlePlayAudio(r.radical, `saved_rad_${r.id}`, 0.9, r.pinyin, e)}
                                className="p-1 text-stone-400 hover:text-red-600 transition"
                                title="Nghe phát âm"
                              >
                                <Volume2 className={`w-4 h-4 ${playingAudioId === `saved_rad_${r.id}` ? "text-red-600 animate-pulse" : ""}`} />
                              </button>
                            </div>
                            <div className="text-xs font-semibold text-red-700">
                              Bộ {r.sinoVietnamese}
                            </div>
                            <div className="text-[11px] text-stone-500 mt-0.5">
                              {r.strokeCount} nét • #{r.id}
                            </div>
                          </div>
                        </div>

                        {/* Unbookmark Button */}
                        <button
                          onClick={(e) => toggleBookmark(r.id, e)}
                          className="p-1 text-amber-500 hover:text-stone-400 transition"
                          title="Bỏ đánh dấu"
                        >
                          <BookMarked className="w-4 h-4 fill-amber-500" />
                        </button>
                      </div>

                      {/* Meaning */}
                      <p className="text-xs text-stone-700 font-medium mt-3">
                        {r.vietnamese}
                      </p>

                      {r.variants && r.variants.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className="text-[11px] text-stone-500">Biến thể:</span>
                          {r.variants.map((v, i) => (
                            <span
                              key={i}
                              className="text-xs px-1.5 py-0.5 rounded bg-stone-100 font-serif font-bold text-red-600 border border-stone-200"
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRadical(r);
                          setActiveSubTab("practice");
                        }}
                        className="text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1 hover:underline"
                      >
                        <PenTool className="w-3.5 h-3.5" />
                        <span>Tập viết nét</span>
                      </button>
                      <span className="text-stone-400 group-hover:text-amber-600 font-semibold flex items-center gap-0.5">
                        <span>Chi tiết</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-6 space-y-3">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Bookmark className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-stone-800">
                  {savedRadicalsList.length === 0
                    ? "Bạn chưa đánh dấu bộ thủ nào"
                    : "Không tìm thấy bộ thủ phù hợp"}
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  {savedRadicalsList.length === 0
                    ? "Hãy duyệt danh sách 214 bộ thủ hoặc các bài học chuyên đề và nhấn biểu tượng Bookmark để lưu lại ôn tập nhanh tại đây."
                    : "Thử tìm kiếm với tên Hán Việt, Pinyin hoặc nghĩa tiếng Việt khác."}
                </p>
                {savedRadicalsList.length === 0 ? (
                  <button
                    onClick={() => setActiveSubTab("all")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs shadow-md shadow-red-500/20 hover:scale-105 active:scale-95 transition cursor-pointer"
                  >
                    <Grid className="w-4 h-4" />
                    <span>Khám phá ngay 214 Bộ Thủ</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setSavedSearchQuery("")}
                    className="text-xs font-bold text-amber-600 hover:underline"
                  >
                    Xóa từ khóa tìm kiếm
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: INTERACTIVE CANVAS WRITING PRACTICE */}
        {activeSubTab ==="practice" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white  rounded-3xl p-6 sm:p-8 border border-stone-200  shadow-sm">
              <div className="text-center mb-6">
                <span className="text-xs font-bold text-red-600  uppercase tracking-widest bg-red-50  px-3 py-1 rounded-full border border-red-200">
                  Luyện viết chữ Hán trên giấy 米字格
                </span>
                <h2 className="text-2xl font-bold text-stone-900  mt-2">
                  Tập Viết Đúng Thứ Tự Nét Bộ Thủ
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Chọn bất kỳ bộ thủ nào trong danh sách bên dưới để tập viết từng nét trên khung lưới chữ Mễ.
                </p>
              </div>

              {/* Selector Carousel */}
              <ScrollableTabs
                hintText="Trượt xem danh sách bộ thủ"
                pillColor="rose"
                className="pb-4 mb-6"
              >
                {ALL_RADICALS.slice(0, 30).map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRadical(r)}
                    className={`shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center font-serif text-lg font-bold transition border cursor-pointer ${
                      selectedRadical?.id === r.id
                        ? "bg-red-600 text-white border-red-700 shadow-md scale-105"
                        : "bg-stone-50 text-stone-800 border-stone-200 hover:border-red-300"
                    }`}
                  >
                    <span>{r.radical}</span>
                    <span className="text-[9px] font-sans font-normal opacity-80">{r.pinyin}</span>
                  </button>
                ))}
              </ScrollableTabs>

              {/* Writing Canvas Embedded */}
              {selectedRadical && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <StrokeWriterCanvas
                    character={selectedRadical.radical}
                    pinyin={selectedRadical.pinyin}
                    sinoVietnamese={selectedRadical.sinoVietnamese}
                    strokeOrderGuide={selectedRadical.strokeOrderGuide}
                  />

                  {/* Radical Info Side Card */}
                  <div className="space-y-4 bg-stone-50  p-5 rounded-2xl border border-stone-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-red-600 bg-red-100  px-2.5 py-1 rounded-lg">
                        Bộ số #{selectedRadical.id} • {selectedRadical.strokeCount} nét
                      </span>
                      <span className="text-xs text-stone-500 font-medium">
                        {selectedRadical.categoryName}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-stone-900">
                        Bộ {selectedRadical.sinoVietnamese} ({selectedRadical.radical})
                      </h3>
                      <p className="text-xs text-stone-600  mt-1 font-medium">
                        Ý nghĩa: {selectedRadical.vietnamese}
                      </p>
                    </div>

                    {selectedRadical.mnemonic && (
                      <div className="p-3 bg-amber-50  rounded-xl border border-amber-200  text-xs text-amber-900">
                        <strong className="block mb-0.5">💡 Mẹo ghi nhớ hình tượng:</strong>
                        {selectedRadical.mnemonic}
                      </div>
                    )}

                    {/* Word Examples */}
                    <div>
                      <span className="text-xs font-bold text-stone-700  block mb-2">
                        Từ vựng ghép tiêu biểu:
                      </span>
                      <div className="space-y-2">
                        {selectedRadical.vocabularyExamples.map((ex, idx) => (
                          <div
                            key={idx}
                            className="bg-white  p-2.5 rounded-xl border border-stone-200  flex items-center justify-between"
                          >
                            <div>
                              <div className="font-bold text-xs text-stone-900">
                                {ex.hanzi} <span className="text-stone-500 font-normal">({ex.pinyin})</span>
                              </div>
                              <div className="text-[11px] text-stone-600">
                                {ex.vietnamese}
                              </div>
                            </div>
                            <button
                              onClick={() => handlePlayAudio(ex.hanzi,`ex_${idx}`, 0.9)}
                              className="p-1.5 text-stone-400 hover:text-red-600 rounded-full hover:bg-stone-100  transition"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 4: QUIZ / FLASHCARD PRACTICE */}
        {activeSubTab === "quiz" && (
          <RadicalsQuizView
            savedRadicalIds={savedRadicalIds}
            onToggleBookmark={toggleBookmark}
            onBackToLessons={() => setActiveSubTab("lessons")}
          />
        )}
      </div>

      {/* RADICAL DETAIL MODAL / DRAWER */}
      {selectedRadical && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            id="radical-detail-modal"
            className="bg-white  rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-stone-200  shadow-2xl p-6 sm:p-8 relative"
          >
            {/* Close Button */}
            <button
              id="btn-close-radical-modal"
              onClick={() => setSelectedRadical(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-600  hover:bg-stone-100  transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Big Character */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-amber-50  border-2 border-red-200  text-red-600  font-serif font-black text-5xl flex items-center justify-center shadow-inner">
                  {selectedRadical.radical}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-extrabold text-stone-900">
                      {selectedRadical.pinyin}
                    </span>
                    <button
                      onClick={() => handlePlayAudio(selectedRadical.radical, "modal_rad", 0.9, selectedRadical.pinyin)}
                      className="p-1.5 text-stone-600 hover:text-red-600   bg-stone-100  rounded-full transition"
                      title="Nghe phát âm chuẩn"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-red-700">
                    Bộ {selectedRadical.sinoVietnamese} (#{selectedRadical.id})
                  </h3>
                  <div className="text-xs text-stone-500 font-medium mt-0.5">
                    {selectedRadical.strokeCount} nét • Nhóm: {selectedRadical.categoryName}
                  </div>
                </div>
              </div>

              {/* Bookmarking and Navigation inside modal */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBookmark(selectedRadical.id)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                    savedRadicalIds.includes(selectedRadical.id)
                      ?"bg-amber-50 text-amber-800 border-amber-300"
                      :"bg-stone-100 text-stone-700 border-stone-200"
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${savedRadicalIds.includes(selectedRadical.id) ?"fill-amber-500 text-amber-500" :""}`} />
                  {savedRadicalIds.includes(selectedRadical.id) ?"Đã lưu" :"Lưu bộ thủ"}
                </button>
              </div>
            </div>

            {/* Meaning & Details */}
            <div className="py-5 space-y-4">
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">
                  Ý nghĩa cốt lõi:
                </span>
                <p className="text-sm text-stone-800  font-semibold">
                  {selectedRadical.vietnamese}
                </p>
              </div>

              {/* Variants */}
              {selectedRadical.variants && selectedRadical.variants.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1">
                    Các biến thể khi ghép chữ:
                  </span>
                  <div className="flex items-center gap-2">
                    {selectedRadical.variants.map((v, i) => (
                      <span
                        key={i}
                        className="text-base px-2.5 py-1 rounded-lg bg-red-50 text-red-700   font-serif font-bold border border-red-200"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Mnemonic */}
              {selectedRadical.mnemonic && (
                <div className="p-3.5 bg-amber-50  rounded-2xl border border-amber-200  text-xs text-amber-900">
                  <strong className="block font-bold mb-1">💡 Mẹo nhớ hình tượng:</strong>
                  {selectedRadical.mnemonic}
                </div>
              )}

              {/* Stroke Order Step Breakdown */}
              {selectedRadical.strokeOrderGuide && selectedRadical.strokeOrderGuide.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                    Thứ tự {selectedRadical.strokeOrderGuide.length} nét viết chuẩn:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRadical.strokeOrderGuide.map((step, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-stone-100  text-stone-700  px-2.5 py-1 rounded-lg border border-stone-200"
                      >
                        {idx + 1}. {step}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Illustrated Vocabulary List (3-4 Words) */}
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                  3-4 Từ vựng minh họa có chứa bộ thủ:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedRadical.vocabularyExamples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="bg-stone-50  p-3 rounded-2xl border border-stone-200/80  flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-serif font-black text-lg text-red-600">
                            {ex.hanzi}
                          </div>
                          <div className="text-xs font-bold text-stone-800">
                            {ex.pinyin}
                          </div>
                          <div className="text-[11px] text-stone-500">
                            Hán Việt: {ex.sinoVietnamese}
                          </div>
                        </div>
                        <button
                          onClick={() => handlePlayAudio(ex.hanzi, `modal_ex_${idx}`, 0.9, ex.pinyin)}
                          className="p-1.5 text-stone-400 hover:text-red-600 bg-white  rounded-full border border-stone-200  transition"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-2 pt-2 border-t border-stone-200/60">
                        <div className="text-xs font-semibold text-stone-900">
                          {ex.vietnamese}
                        </div>
                        {ex.explanation && (
                          <div className="text-[11px] text-stone-500  mt-0.5 line-clamp-2">
                            {ex.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Embedded Canvas practice */}
              <div className="pt-2">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                  Tập viết nhanh bộ thủ này:
                </span>
                <StrokeWriterCanvas
                  character={selectedRadical.radical}
                  pinyin={selectedRadical.pinyin}
                  sinoVietnamese={selectedRadical.sinoVietnamese}
                  strokeOrderGuide={selectedRadical.strokeOrderGuide}
                />
              </div>
            </div>

            {/* Bottom Modal Navigation */}
            <div className="pt-4 border-t border-stone-100  flex items-center justify-between">
              <button
                onClick={handlePrevRadical}
                className="text-xs font-semibold text-stone-600  hover:text-red-600 flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Bộ thủ trước
              </button>
              <button
                onClick={handleNextRadical}
                className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                Bộ thủ kế tiếp
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
