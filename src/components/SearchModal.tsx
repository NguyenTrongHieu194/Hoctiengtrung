import React, { useState, useEffect, useRef } from "react";
import { Search, X, Volume2, Bookmark, Sparkles, Loader2 } from "lucide-react";
import {
  searchCedictRemote,
  CedictEntry,
  searchDictionary,
  wordItemToCedictEntry,
  getEntryUniqueKey,
  isEntryFavorite
} from "../data/dictionaryService";
import { playChineseAudio } from "../services/speechService";
import { WordItem, UserProfile } from "../types";
import { WordDetailModal } from "./WordDetailModal";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWord?: (word: WordItem) => void;
  onSelectLesson?: (lesson: any) => void;
  favoriteWordIds?: string[];
  onToggleFavorite?: (wordId: string) => void;
  userProfile?: UserProfile;
  onUpdateProfile?: (updated: Partial<UserProfile>) => void;
  onNavigateToGame?: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  favoriteWordIds = [],
  onToggleFavorite,
  userProfile,
  onUpdateProfile,
  onNavigateToGame
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [entries, setEntries] = useState<CedictEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [detailModalEntry, setDetailModalEntry] = useState<CedictEntry | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Focus on input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Remote & local hybrid search with debouncing
  useEffect(() => {
    if (!isOpen) return;

    let isCancelled = false;
    const timer = setTimeout(async () => {
      setIsLoading(true);
      setPage(1);
      try {
        const result = await searchCedictRemote(searchTerm, {
          limit: 35,
          page: 1,
          filter: "all"
        });
        if (!isCancelled) {
          setEntries(result.entries);
          setTotalCount(result.total);
          setHasMore(result.entries.length < result.total);
          scrollContainerRef.current?.scrollTo({ top: 0 });
        }
      } catch (e) {
        console.warn("Fallback to local words in modal:", e);
        if (!isCancelled) {
          const local = searchDictionary(searchTerm, "all");
          const paged = local.slice(0, 35);
          setEntries(paged.map((w, idx) => wordItemToCedictEntry(w, idx)));
          setTotalCount(local.length);
          setHasMore(paged.length < local.length);
          scrollContainerRef.current?.scrollTo({ top: 0 });
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }, 200);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [searchTerm, isOpen]);

  // Handle load more for infinite scroll and manual button
  const handleLoadMore = async () => {
    if (isLoading || isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;
    try {
      const result = await searchCedictRemote(searchTerm, {
        limit: 35,
        page: nextPage,
        filter: "all"
      });
      if (result.entries && result.entries.length > 0) {
        setEntries((prev) => {
          const existingMap = new Set(prev.map((p) => `${p.id}_${p.simp}`));
          const newEntries = result.entries.filter((e) => !existingMap.has(`${e.id}_${e.simp}`));
          return [...prev, ...newEntries];
        });
        setPage(nextPage);
        setTotalCount(result.total);
        setHasMore(entries.length + result.entries.length < result.total);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      console.warn("Load more error in search modal:", e);
      const local = searchDictionary(searchTerm, "all");
      const startIndex = page * 35;
      const nextSlice = local.slice(startIndex, startIndex + 35);
      if (nextSlice.length > 0) {
        setEntries((prev) => [
          ...prev,
          ...nextSlice.map((w, idx) => wordItemToCedictEntry(w, startIndex + idx))
        ]);
        setPage(nextPage);
        setHasMore(startIndex + nextSlice.length < local.length);
      } else {
        setHasMore(false);
      }
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Scroll listener to trigger infinite scroll
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el || isLoading || isLoadingMore || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollHeight - scrollTop - clientHeight < 280) {
      handleLoadMore();
    }
  };

  if (!isOpen) return null;

  const handlePlayAudio = async (e: React.MouseEvent, hanzi: string, wordId: string | number) => {
    e.stopPropagation();
    setPlayingId(wordId.toString());
    await playChineseAudio(hanzi, 1.0);
    setPlayingId(null);
  };


  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div 
        id="search-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[88vh] overflow-hidden transition-all animate-scaleUp"
      >
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 shrink-0">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              id="search-dictionary-input"
              type="text"
              placeholder="Tra cứu chữ Hán, Pinyin, Hán Việt, Tiếng Việt..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 text-sm sm:text-base pl-4 pr-10 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium placeholder:text-slate-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-xs transition-colors cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
          <button
            id="close-search-modal-btn"
            onClick={onClose}
            className="p-2.5 text-slate-400 hover:text-slate-700 rounded-2xl hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
            title="Đóng từ điển (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results List */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 space-y-3 overscroll-contain"
        >
          {entries.length === 0 ? (
            <div className="text-center py-12 px-4 text-slate-400 space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-700">
                Không tìm thấy từ vựng phù hợp với "{searchTerm}"
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Hệ thống hỗ trợ tìm kiếm bằng chữ Hán Giản thể, Pinyin có/không dấu (wo, ni hao), tiếng Việt có/không dấu (xin chao, may vat so).
              </p>
            </div>
          ) : (
            <>
              {entries.map((word, idx) => {
                const favKey = getEntryUniqueKey(word);
                const isFav = isEntryFavorite(word, favoriteWordIds);

                return (
                  <div
                    key={`modal_entry_${word.id || idx}_${word.simp}_${idx}`}
                    id={`search-item-${word.id || idx}`}
                    onClick={() => setDetailModalEntry(word)}
                    className="p-4 rounded-2xl border border-slate-100 hover:border-blue-300 bg-white hover:bg-blue-50/30 transition-all flex items-start justify-between gap-3 group shadow-2xs cursor-pointer"
                  >
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-2xl font-bold text-slate-800 tracking-wide group-hover:text-blue-600 transition-colors">
                          {word.simp}
                        </span>
                        <span className="text-sm font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-100">
                          {word.pinyin}
                        </span>
                      </div>

                      {word.hanViet && (
                        <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                          Hán Việt: {word.hanViet}
                        </p>
                      )}

                      <p className="text-sm font-bold text-slate-700 leading-relaxed">
                        {word.vietnamese.join("; ")}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 pt-1">
                      <button
                        id={`play-audio-${word.id || idx}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayAudio(e, word.simp, word.id || idx);
                        }}
                        title="Phát âm chuẩn tiếng Trung"
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                          playingId === (word.id || idx).toString()
                            ? "bg-blue-600 text-white border-blue-600 animate-pulse"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      {onToggleFavorite && (
                        <button
                          id={`toggle-fav-${word.id || idx}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(favKey);
                          }}
                          title={isFav ? "Bỏ yêu thích" : "Thêm vào từ vựng yêu thích"}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                            isFav
                              ? "bg-rose-50 text-rose-500 border-rose-200"
                              : "bg-slate-50 text-slate-400 border-slate-200 hover:text-rose-500 hover:border-rose-200"
                          }`}
                        >
                          <Bookmark className="w-4 h-4" fill={isFav ? "currentColor" : "none"} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Load More Trigger & Indicator */}
              {hasMore && (
                <div className="pt-2 pb-4 text-center">
                  <button
                    id="btn-search-load-more"
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-95 disabled:opacity-60"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        <span>Đang tải thêm kết quả...</span>
                      </>
                    ) : (
                      <span>Tải thêm kết quả</span>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between gap-2">
          <span className="font-medium truncate">
            {searchTerm ? (
              <>
                Hiển thị <strong className="text-slate-800">{entries.length}</strong> / <strong className="text-slate-800">{totalCount.toLocaleString()}</strong> kết quả cho "{searchTerm}"
              </>
            ) : (
              <>
                Hiển thị <strong className="text-slate-800">{entries.length}</strong> từ vựng
              </>
            )}
          </span>
          <span className="flex items-center gap-1 text-blue-600 font-bold shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Từ điển Hán – Việt</span>
          </span>
        </div>
      </div>

      {/* Word Detail Modal Window */}
      <WordDetailModal
        isOpen={!!detailModalEntry}
        onClose={() => setDetailModalEntry(null)}
        entry={detailModalEntry}
        onToggleFavorite={onToggleFavorite}
        favoriteWordIds={favoriteWordIds}
        userProfile={userProfile}
        onUpdateProfile={onUpdateProfile}
        onNavigateToGame={onNavigateToGame}
      />
    </div>
  );
};
