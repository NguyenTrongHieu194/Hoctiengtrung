import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Search,
  BookOpen,
  Volume2,
  Sparkles,
  Bookmark,
  Copy,
  Check,
  RefreshCw,
  Languages,
  Info,
  Loader2,
  ChevronRight,
  ArrowRight,
  Filter,
  CheckCircle2,
  Share2,
  Sparkle,
  Maximize2
} from "lucide-react";
import {
  CedictEntry,
  SegmentedWord,
  searchCedictRemote,
  defineWordRemote,
  analyzeSentenceRemote,
  getRandomWordRemote,
  getDictionaryStatsRemote,
  resolveSavedWordEntries,
  getEntryUniqueKey,
  isEntryFavorite
} from "../data/dictionaryService";
import { playChineseAudio } from "../services/speechService";
import { WordDetailModal } from "./WordDetailModal";
import { UserProfile } from "../types";

interface DictionaryViewProps {
  favoriteWordIds?: string[];
  onToggleFavorite?: (wordId: string) => void;
  onOpenWordDetail?: (word: any) => void;
  onOpenSavedWordsModal?: () => void;
  userProfile?: UserProfile;
  onUpdateProfile?: (updated: Partial<UserProfile>) => void;
  onNavigateToGame?: () => void;
}

export const DictionaryView: React.FC<DictionaryViewProps> = ({
  favoriteWordIds = [],
  onToggleFavorite,
  onOpenWordDetail,
  onOpenSavedWordsModal,
  userProfile,
  onUpdateProfile,
  onNavigateToGame
}) => {
  // Mode: 'search' (Tra từ) | 'analyzer' (Phân tích câu)
  const [activeMode, setActiveMode] = useState<"search" | "analyzer">("search");

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchResults, setSearchResults] = useState<CedictEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchPage, setSearchPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [searchTimeMs, setSearchTimeMs] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<CedictEntry | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [characterBreakdown, setCharacterBreakdown] = useState<{ char: string; entries: CedictEntry[] }[]>([]);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [playingSimp, setPlayingSimp] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const searchResultsScrollRef = useRef<HTMLDivElement>(null);

  // Sentence Analyzer State
  const [sentenceInput, setSentenceInput] = useState(
    "我喜欢在中国服装厂工作，每天学习新技能。"
  );
  const [analyzedTokens, setAnalyzedTokens] = useState<SegmentedWord[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Word of the day
  const [wordOfTheDay, setWordOfTheDay] = useState<CedictEntry | null>(null);
  const [isLoadingWotd, setIsLoadingWotd] = useState(false);

  // Dictionary stats
  const [stats, setStats] = useState<any>(null);

  // Load initial popular words & stats
  useEffect(() => {
    loadStats();
    loadRandomWord();
    performSearch("", "all", 1, false);
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDictionaryStatsRemote();
      setStats(data);
    } catch (e) {
      console.warn("Failed to load dictionary stats", e);
    }
  };

  const loadRandomWord = async () => {
    setIsLoadingWotd(true);
    try {
      const w = await getRandomWordRemote();
      if (w) setWordOfTheDay(w);
    } catch (e) {
      console.warn("Failed to load random word", e);
    } finally {
      setIsLoadingWotd(false);
    }
  };

  // Perform remote search with debouncing and pagination
  const performSearch = useCallback(
    async (query: string, filter: string, pageNum: number = 1, append: boolean = false) => {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsSearching(true);
        setSearchPage(1);
      }
      try {
        if (filter === "favorites") {
          const resolved = await resolveSavedWordEntries(favoriteWordIds);
          let filtered = resolved;
          const q = query.trim().toLowerCase();
          if (q) {
            filtered = resolved.filter(
              (e) =>
                e.simp.toLowerCase().includes(q) ||
                e.trad.toLowerCase().includes(q) ||
                (e.pinyin || "").toLowerCase().includes(q) ||
                (e.hanViet || "").toLowerCase().includes(q) ||
                e.vietnamese.some((v) => v.toLowerCase().includes(q))
            );
          }
          setSearchResults(filtered);
          setTotalCount(filtered.length);
          setHasMore(false);
          setSearchTimeMs(15);
          if (!append && filtered.length > 0 && !selectedEntry) {
            handleSelectEntry(filtered[0]);
          }
          return;
        }

        const res = await searchCedictRemote(query, { limit: 30, page: pageNum, filter });
        if (append) {
          setSearchResults((prev) => {
            const existingIds = new Set(prev.map((p) => `${p.id}_${p.simp}`));
            const unique = res.entries.filter((e) => !existingIds.has(`${e.id}_${e.simp}`));
            const updated = [...prev, ...unique];
            setHasMore(updated.length < res.total);
            return updated;
          });
        } else {
          setSearchResults(res.entries);
          setHasMore(res.entries.length < res.total);
          searchResultsScrollRef.current?.scrollTo({ top: 0 });
        }
        setTotalCount(res.total);
        setSearchTimeMs(res.timeMs);
        setSearchPage(pageNum);

        // Auto select first entry on exact match
        if (!append && res.entries.length > 0 && !selectedEntry) {
          handleSelectEntry(res.entries[0]);
        }
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setIsSearching(false);
        setIsLoadingMore(false);
      }
    },
    [selectedEntry, favoriteWordIds]
  );

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery, activeFilter, 1, false);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery, activeFilter, performSearch]);

  const handleLoadMoreResults = () => {
    if (isSearching || isLoadingMore || !hasMore) return;
    performSearch(searchQuery, activeFilter, searchPage + 1, true);
  };

  const handleSearchResultsScroll = () => {
    const el = searchResultsScrollRef.current;
    if (!el || isSearching || isLoadingMore || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollHeight - scrollTop - clientHeight < 220) {
      handleLoadMoreResults();
    }
  };

  // Load entry detail with character breakdown
  const handleSelectEntry = async (entry: CedictEntry, openModal: boolean = false) => {
    setSelectedEntry(entry);
    if (openModal) {
      setIsDetailModalOpen(true);
    }
    setIsLoadingDetail(true);
    try {
      const detail = await defineWordRemote(entry.simp);
      setCharacterBreakdown(detail.characterBreakdown || []);
    } catch (e) {
      console.warn("Failed to get character breakdown:", e);
      setCharacterBreakdown([]);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  // Inspect and open detail for a segmented token
  const handleSelectToken = async (token: SegmentedWord) => {
    setIsLoadingDetail(true);
    try {
      const res = await searchCedictRemote(token.text, { limit: 1 });
      if (res.entries && res.entries.length > 0) {
        handleSelectEntry(res.entries[0], true);
      } else {
        const tempEntry: CedictEntry = {
          id: Date.now(),
          simp: token.text,
          trad: token.text,
          pinyin: token.pinyin,
          pinyinNum: token.pinyin,
          hanViet: token.hanViet,
          vietnamese: token.vietnamese,
          english: token.english,
          hskLevel: token.hskLevel
        };
        handleSelectEntry(tempEntry, true);
      }
    } catch (e) {
      console.warn("Failed to select token:", e);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  // Analyze Chinese sentence
  const handleAnalyzeSentence = async (textToAnalyze?: string) => {
    const sentence = textToAnalyze || sentenceInput;
    if (!sentence.trim()) return;

    setIsAnalyzing(true);
    try {
      const tokens = await analyzeSentenceRemote(sentence);
      setAnalyzedTokens(tokens);
    } catch (e) {
      console.error("Analysis failed:", e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePlayAudio = async (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPlayingSimp(text);
    await playChineseAudio(text, 1.0);
    setPlayingSimp(null);
  };

  const handleCopy = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard?.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white p-6 sm:p-8 shadow-xl shadow-blue-950/15 border border-blue-600/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-100 text-xs font-black backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>CC-CEDICT & CVDICT TIẾNG VIỆT TOÀN DIỆN</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Từ Điển Hán – Việt Mở Rộng
            </h1>
            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
              Kho dữ liệu <strong>122,596+ mục từ</strong> chuẩn CC-CEDICT quốc tế tích hợp bản dịch tiếng Việt chuẩn xác (CVDICT), phiên âm Pinyin thanh điệu, âm Hán Việt và phân tích chiết tự.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/15 text-center">
              <span className="block text-xl sm:text-2xl font-black text-amber-300">
                122,596+
              </span>
              <span className="text-[11px] font-bold text-blue-100">Mục từ song ngữ</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/15 text-center">
              <span className="block text-xl sm:text-2xl font-black text-emerald-300">
                HSK 1 - 6
              </span>
              <span className="text-[11px] font-bold text-blue-100">& Ngành May Mặc</span>
            </div>
          </div>
        </div>

        {/* Decorative background glows */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            id="tab-mode-search"
            onClick={() => setActiveMode("search")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              activeMode === "search"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Tra cứu từ vựng (122K từ)</span>
          </button>

          <button
            id="tab-mode-analyzer"
            onClick={() => {
              setActiveMode("analyzer");
              if (analyzedTokens.length === 0) {
                handleAnalyzeSentence();
              }
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
              activeMode === "analyzer"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Languages className="w-4 h-4" />
            <span>Tách từ & Phân tích câu</span>
          </button>
        </div>

        {/* Right side actions: Saved words & Word of the day */}
        <div className="flex items-center gap-2">
          {onOpenSavedWordsModal && (
            <button
              id="dict-open-saved-words-btn"
              onClick={onOpenSavedWordsModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl font-bold text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all cursor-pointer shadow-2xs"
            >
              <Bookmark className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Sổ tay từ đã lưu ({favoriteWordIds.length})</span>
            </button>
          )}

          {/* Word of the day trigger */}
          {wordOfTheDay && (
            <button
              onClick={() => {
                setActiveMode("search");
                setSearchQuery(wordOfTheDay.simp);
                handleSelectEntry(wordOfTheDay);
              }}
              className="hidden lg:flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 transition-all cursor-pointer"
            >
              <Sparkle className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Từ ngẫu nhiên: <strong>{wordOfTheDay.simp}</strong> ({wordOfTheDay.pinyin})</span>
            </button>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODE 1: DICTIONARY SEARCH & DETAIL (Tra Từ Điển CC-CEDICT)      */}
      {/* ============================================================== */}
      {activeMode === "search" && (
        <div className="space-y-6">
          {/* Search Input Box */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                {isSearching ? (
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                ) : (
                  <Search className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <input
                id="dictionary-search-main-input"
                type="text"
                placeholder="Nhập Hán tự (你好), Pinyin (nihao, nǐ hǎo), Hán Việt hoặc Tiếng Việt (xin chào, máy may)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 text-base sm:text-lg pl-12 pr-10 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-medium placeholder:text-slate-400 shadow-inner-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-xs transition-colors cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Results Grid: Split View (List on left, Detail on right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Result List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
                <span>
                  {searchQuery ? (
                    <>
                      Hiển thị <strong className="text-slate-800">{searchResults.length}</strong> / <strong className="text-slate-800">{totalCount.toLocaleString()}</strong> kết quả cho "{searchQuery}"
                    </>
                  ) : (
                    <>
                      Hiển thị <strong className="text-slate-800">{searchResults.length}</strong> từ vựng
                    </>
                  )}
                </span>
                {searchTimeMs > 0 && <span>{searchTimeMs}ms</span>}
              </div>

              <div
                ref={searchResultsScrollRef}
                onScroll={handleSearchResultsScroll}
                className="space-y-2 max-h-[640px] overflow-y-auto pr-1 overscroll-contain"
              >
                {searchResults.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center text-slate-500 space-y-2">
                    <Search className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="font-bold text-sm text-slate-700">
                      Không tìm thấy từ vựng phù hợp
                    </p>
                    <p className="text-xs text-slate-400">
                      Thử tìm bằng Pinyin không dấu (ví dụ: nihao, gongzuo) hoặc tiếng Việt không dấu (xin chao, may mac).
                    </p>
                  </div>
                ) : (
                  <>
                    {searchResults.map((entry, idx) => {
                      const isSelected = selectedEntry?.id === entry.id;
                      const isFav = isEntryFavorite(entry, favoriteWordIds);

                      return (
                        <div
                          key={`cedict_${entry.id}_${entry.simp}_${idx}`}
                          id={`cedict-item-${entry.id}`}
                          onClick={() => handleSelectEntry(entry, true)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                            isSelected
                              ? "bg-blue-50/70 border-blue-500 shadow-xs ring-2 ring-blue-100"
                              : "bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50/50"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xl font-black text-slate-900 leading-none">
                                  {entry.simp}
                                </span>
                                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded-md">
                                  {entry.pinyin}
                                </span>
                              </div>

                              {/* Sino-Vietnamese (Hán Việt) */}
                              {entry.hanViet && (
                                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                                  Hán Việt: {entry.hanViet}
                                </p>
                              )}

                              {/* Vietnamese Definition */}
                              <p className="text-xs text-slate-700 font-medium line-clamp-2 leading-relaxed">
                                {entry.vietnamese.join("; ")}
                              </p>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={(e) => handlePlayAudio(entry.simp, e)}
                                className="p-1.5 rounded-xl hover:bg-blue-100 text-slate-400 hover:text-blue-700 transition-colors cursor-pointer"
                                title="Phát âm"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                              {onToggleFavorite && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleFavorite(getEntryUniqueKey(entry));
                                  }}
                                  className={`p-1.5 rounded-xl transition-colors cursor-pointer ${
                                    isFav
                                      ? "text-rose-500 hover:bg-rose-50"
                                      : "text-slate-300 hover:text-rose-500 hover:bg-slate-100"
                                  }`}
                                  title={isFav ? "Bỏ lưu" : "Lưu vào sổ tay"}
                                >
                                  <Bookmark className="w-4 h-4" fill={isFav ? "currentColor" : "none"} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Load More Trigger in DictionaryView */}
                    {hasMore && (
                      <div className="pt-2 pb-3 text-center">
                        <button
                          id="btn-dict-view-load-more"
                          onClick={handleLoadMoreResults}
                          disabled={isLoadingMore}
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-95 disabled:opacity-60"
                        >
                          {isLoadingMore ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                              <span>Đang tải thêm... ({searchResults.length}/{totalCount.toLocaleString()})</span>
                            </>
                          ) : (
                            <>
                              <span>Tải thêm kết quả (Đang hiển thị {searchResults.length}/{totalCount.toLocaleString()})</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {!hasMore && searchResults.length > 0 && (
                      <div className="py-2.5 text-center text-xs text-slate-400 font-medium">
                        Đã hiển thị toàn bộ {totalCount.toLocaleString()} kết quả phù hợp
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Detailed Word Card & Character Breakdown */}
            <div className="lg:col-span-7">
              {selectedEntry ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-md space-y-6 sticky top-4">
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                    <div className="space-y-1.5">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                          {selectedEntry.simp}
                        </span>
                        <button
                          onClick={() => handlePlayAudio(selectedEntry.simp)}
                          className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
                            playingSimp === selectedEntry.simp
                              ? "bg-blue-600 text-white border-blue-600 animate-pulse"
                              : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                          }`}
                          title="Nghe phát âm chuẩn"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleCopy(selectedEntry.simp)}
                          className="p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200 transition-colors cursor-pointer"
                          title="Sao chép chữ Hán"
                        >
                          {copiedText === selectedEntry.simp ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-lg font-mono font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-xl border border-blue-100">
                          {selectedEntry.pinyin}
                        </span>
                      </div>
                    </div>

                    {/* Word Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        id="btn-open-detail-modal"
                        onClick={() => setIsDetailModalOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold text-xs transition-all cursor-pointer shadow-2xs"
                        title="Mở cửa sổ chi tiết đầy đủ"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Mở cửa sổ</span>
                      </button>
                      {onToggleFavorite && (
                        <button
                          onClick={() => onToggleFavorite(getEntryUniqueKey(selectedEntry))}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border font-bold text-xs transition-all cursor-pointer ${
                            isEntryFavorite(selectedEntry, favoriteWordIds)
                              ? "bg-rose-50 text-rose-600 border-rose-200"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:border-rose-300"
                          }`}
                        >
                          <Bookmark
                            className="w-4 h-4"
                            fill={isEntryFavorite(selectedEntry, favoriteWordIds) ? "currentColor" : "none"}
                          />
                          <span className="hidden sm:inline">
                            {isEntryFavorite(selectedEntry, favoriteWordIds) ? "Đã lưu" : "Lưu từ"}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Sino-Vietnamese Reading */}
                  {selectedEntry.hanViet && (
                    <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                          Âm Hán Việt
                        </span>
                        <span className="text-lg font-black text-emerald-900 capitalize">
                          {selectedEntry.hanViet}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                        Gốc từ vựng Hán - Việt
                      </span>
                    </div>
                  )}

                  {/* Vietnamese Meanings */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      <span>Nghĩa Tiếng Việt (CVDICT)</span>
                    </h3>
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                      <ol className="list-decimal list-inside space-y-1.5 text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
                        {selectedEntry.vietnamese.map((def, idx) => (
                          <li key={`vdef_${idx}`} className="pl-1">
                            <span className="font-semibold text-slate-900">{def}</span>
                          </li>
                        ))}
                      </ol>

                      {/* Classifiers / Lượng từ */}
                      {selectedEntry.classifiers && selectedEntry.classifiers.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                          <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                            Lượng từ:
                          </span>
                          <span className="font-medium text-slate-700">
                            {selectedEntry.classifiers.join("; ")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Character Breakdown (Chiết tự từng chữ thành phần) */}
                  {characterBreakdown.length > 0 && (
                    <div className="space-y-2.5 pt-2 border-t border-slate-100">
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Chiết tự từng chữ Hán cấu thành từ</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {characterBreakdown.map((item, idx) => {
                          const primary = item.entries[0];
                          return (
                            <div
                              key={`breakdown_${idx}_${item.char}`}
                              onClick={() => {
                                setSearchQuery(item.char);
                                if (primary) handleSelectEntry(primary, true);
                              }}
                              className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer space-y-1"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-2xl font-black text-slate-900">
                                  {item.char}
                                </span>
                                {primary && (
                                  <span className="text-xs font-mono font-bold text-blue-600 bg-blue-100/70 px-2 py-0.5 rounded-md">
                                    {primary.pinyin}
                                  </span>
                                )}
                              </div>
                              {primary?.hanViet && (
                                <p className="text-[11px] font-bold text-emerald-700 capitalize">
                                  HV: {primary.hanViet}
                                </p>
                              )}
                              <p className="text-xs text-slate-600 line-clamp-1 font-medium">
                                {primary?.vietnamese.join(", ") || "(chưa có nghĩa)"}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 space-y-3">
                  <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-base font-bold text-slate-700">
                    Chọn một từ vựng để xem định nghĩa chi tiết
                  </p>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Hiển thị chữ Phồn thể, âm Hán Việt, phiên âm Pinyin, nghĩa tiếng Việt, tiếng Anh và chiết tự cấu tạo từ.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODE 2: SENTENCE TOKENIZER & ANALYZER (Phân Tích Câu Tiếng Trung)*/}
      {/* ============================================================== */}
      {activeMode === "analyzer" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Languages className="w-5 h-5 text-blue-600" />
                <span>Phân tích câu & Tách từ tiếng Trung tự động</span>
              </h2>
              <p className="text-xs text-slate-500">
                Nhập hoặc dán bất kỳ câu tiếng Trung nào để hệ thống tự động bóc tách từ vựng, tra âm Pinyin, âm Hán Việt và dịch nghĩa từng từ.
              </p>
            </div>

            <div className="relative">
              <textarea
                id="sentence-analyzer-input"
                rows={3}
                value={sentenceInput}
                onChange={(e) => setSentenceInput(e.target.value)}
                placeholder="Dán câu tiếng Trung cần phân tích vào đây..."
                className="w-full bg-slate-50 text-slate-800 text-base p-4 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-medium placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs py-1">
                <span className="text-slate-400 shrink-0 font-medium">Câu mẫu:</span>
                {[
                  "我喜欢在中国服装厂工作。",
                  "今天晚上我们一起去吃饭吧。",
                  "请把这件衣服的样板送去质检部。"
                ].map((sample, idx) => (
                  <button
                    key={`sample_${idx}`}
                    onClick={() => {
                      setSentenceInput(sample);
                      handleAnalyzeSentence(sample);
                    }}
                    className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-xs transition-colors cursor-pointer shrink-0 truncate max-w-[200px]"
                  >
                    {sample}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePlayAudio(sentenceInput)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe đọc câu</span>
                </button>
                <button
                  id="btn-run-sentence-analysis"
                  onClick={() => handleAnalyzeSentence()}
                  disabled={isAnalyzing}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md shadow-blue-600/20 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span>Phân tích ngay</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tokenized Analysis Results */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center justify-between">
              <span>Kết quả bóc tách từ vựng ({analyzedTokens.filter((t) => !t.isPunctuation).length} từ)</span>
              <span className="text-xs text-blue-600 font-bold normal-case">
                Bấm vào từ bất kỳ để tra cứu sâu
              </span>
            </h3>

            {/* Interactive Sentence Word Chips Display */}
            <div className="flex flex-wrap items-end gap-2 p-4 bg-slate-50/80 rounded-2xl border border-slate-200">
              {analyzedTokens.map((token, idx) => {
                if (token.isPunctuation) {
                  return (
                    <span key={`punct_${idx}`} className="text-2xl font-bold text-slate-400 px-1 pb-1">
                      {token.text}
                    </span>
                  );
                }

                return (
                  <button
                    key={`token_${idx}_${token.text}`}
                    onClick={() => handleSelectToken(token)}
                    className="flex flex-col items-center p-2 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 shadow-2xs hover:shadow-sm transition-all cursor-pointer group active:scale-95"
                    title={token.vietnamese.join(", ")}
                  >
                    <span className="text-xs font-mono font-bold text-blue-600 leading-none">
                      {token.pinyin}
                    </span>
                    <span className="text-2xl font-black text-slate-900 group-hover:text-blue-700 transition-colors my-1">
                      {token.text}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-600 max-w-[120px] truncate">
                      {token.vietnamese[0] || ""}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tokenized Table View */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Từ vựng</th>
                    <th className="p-3">Pinyin</th>
                    <th className="p-3">Hán Việt</th>
                    <th className="p-3">Nghĩa Tiếng Việt</th>
                    <th className="p-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {analyzedTokens
                    .filter((t) => !t.isPunctuation)
                    .map((token, idx) => (
                      <tr key={`row_${idx}_${token.text}`} className="hover:bg-blue-50/40 transition-colors">
                        <td className="p-3 font-black text-base text-slate-900">
                          {token.text}
                        </td>
                        <td className="p-3 font-mono font-bold text-blue-700">
                          {token.pinyin}
                        </td>
                        <td className="p-3 font-bold text-emerald-700 capitalize">
                          {token.hanViet || "—"}
                        </td>
                        <td className="p-3 text-slate-700 font-medium">
                          {token.vietnamese.join("; ")}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleSelectToken(token)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            <span>Chi tiết</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Word Detail Modal Window */}
      <WordDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        entry={selectedEntry}
        onToggleFavorite={onToggleFavorite}
        favoriteWordIds={favoriteWordIds}
        userProfile={userProfile}
        onUpdateProfile={onUpdateProfile}
        onNavigateToGame={onNavigateToGame}
        onSelectWord={(word) => {
          setSearchQuery(word);
          performSearch(word, "all");
        }}
      />

      {/* Dictionary Footer Info */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            Dữ liệu bản quyền mở: <strong>CC-CEDICT</strong> (MDBG Chinese-English) &amp; <strong>CVDICT</strong> (Phong Phan Chinese-Vietnamese).
          </span>
        </div>
        <div className="flex items-center gap-2 font-bold text-blue-700">
          <span>Hello China Chinese Learning Platform</span>
        </div>
      </div>
    </div>
  );
};
