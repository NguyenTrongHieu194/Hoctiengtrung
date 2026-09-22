import React, { useState, useEffect, useMemo } from "react";
import {
  Bookmark,
  BookMarked,
  X,
  Search,
  Volume2,
  Trash2,
  BookOpen,
  Copy,
  Check,
  RotateCw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Layers,
  Gamepad2,
  PenTool,
  Grid,
  Maximize2,
  Minimize2,
  ChevronRight as ChevronRightIcon
} from "lucide-react";
import { CedictEntry, resolveSavedWordEntries, getEntryUniqueKey } from "../data/dictionaryService";
import { ALL_RADICALS } from "../data/radicals";
import { playChineseAudio } from "../services/speechService";
import { WordDetailModal } from "./WordDetailModal";
import {
  isWordInGame,
  addMultipleWordsToGame,
  addWordToGameChargingDiamond,
  subscribeCustomGameVocab,
  getCustomGameWordIds
} from "../services/customGameVocabService";
import { UserProfile, RadicalItem } from "../types";

interface SavedWordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteWordIds: string[];
  onToggleFavorite: (wordId: string) => void;
  onOpenWordDetail?: (entry: CedictEntry) => void;
  onNavigateToDictionary?: () => void;
  userProfile?: UserProfile;
  onUpdateProfile?: (updated: Partial<UserProfile>) => void;
  onNavigateToGame?: () => void;
  onNavigateToRadicals?: () => void;
}

export const SavedWordsModal: React.FC<SavedWordsModalProps> = ({
  isOpen,
  onClose,
  favoriteWordIds = [],
  onToggleFavorite,
  onOpenWordDetail,
  onNavigateToDictionary,
  userProfile,
  onUpdateProfile,
  onNavigateToGame,
  onNavigateToRadicals
}) => {
  // Fullscreen toggle state for spacious full-page mode
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Main tabs: Từ vựng đã lưu | Bộ thủ đánh dấu
  const [activeSavedTab, setActiveSavedTab] = useState<"words" | "radicals">("words");

  // Words State
  const [resolvedEntries, setResolvedEntries] = useState<CedictEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [playingSimp, setPlayingSimp] = useState<string | null>(null);
  const [selectedDetailEntry, setSelectedDetailEntry] = useState<CedictEntry | null>(null);

  // Radicals Search
  const [savedRadicalSearch, setSavedRadicalSearch] = useState("");

  // Game integration state
  const [gameWordIds, setGameWordIds] = useState<string[]>(() => getCustomGameWordIds());
  const [gameToast, setGameToast] = useState<string | null>(null);

  // Flashcard practice mode for words
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Radicals Bookmarks state
  const [savedRadicalIds, setSavedRadicalIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("hsk_saved_radicals");
      return saved ? JSON.parse(saved) : [1, 9, 30, 38, 61, 64, 85, 86, 120, 145];
    } catch {
      return [1, 9, 30, 38, 61, 64, 85, 86, 120, 145];
    }
  });

  // Subscribe to game vocab changes
  useEffect(() => {
    const unsubscribe = subscribeCustomGameVocab(() => {
      setGameWordIds(getCustomGameWordIds());
    });
    return unsubscribe;
  }, []);

  // Listen to radical bookmark updates safely
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

  // Resolve dictionary entries when modal is open and favoriteWordIds change
  useEffect(() => {
    if (!isOpen) return;

    if (favoriteWordIds.length === 0) {
      setResolvedEntries([]);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    Promise.resolve(resolveSavedWordEntries(favoriteWordIds))
      .then((entries) => {
        if (isMounted) {
          setResolvedEntries(entries);
        }
      })
      .catch((err) => {
        console.error("Error resolving saved words:", err);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, favoriteWordIds]);

  // Audio playback handler
  const handlePlayAudio = async (simp: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPlayingSimp(simp);
    try {
      await playChineseAudio(simp, 0.9);
    } catch (err) {
      console.warn("Audio playback failed:", err);
    } finally {
      setPlayingSimp(null);
    }
  };

  // Filtered words
  const filteredEntries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return resolvedEntries;

    return resolvedEntries.filter((entry) => {
      const simpMatch = entry.simp.toLowerCase().includes(q);
      const tradMatch = entry.trad.toLowerCase().includes(q);
      const pinyinMatch = (entry.pinyin || "").toLowerCase().includes(q);
      const hanVietMatch = (entry.hanViet || "").toLowerCase().includes(q);
      const vnMatch = entry.vietnamese.some((v) => v.toLowerCase().includes(q));
      return simpMatch || tradMatch || pinyinMatch || hanVietMatch || vnMatch;
    });
  }, [resolvedEntries, searchQuery]);

  // Filtered saved radicals
  const savedRadicalsList = useMemo(() => {
    return ALL_RADICALS.filter((r) => savedRadicalIds.includes(r.id));
  }, [savedRadicalIds]);

  const filteredSavedRadicals = useMemo(() => {
    const q = savedRadicalSearch.trim().toLowerCase();
    if (!q) return savedRadicalsList;
    return savedRadicalsList.filter(
      (r) =>
        r.radical.toLowerCase().includes(q) ||
        r.pinyin.toLowerCase().includes(q) ||
        r.sinoVietnamese.toLowerCase().includes(q) ||
        r.vietnamese.toLowerCase().includes(q) ||
        r.id.toString() === q
    );
  }, [savedRadicalsList, savedRadicalSearch]);

  // Copy all saved words
  const handleCopyAll = () => {
    if (filteredEntries.length === 0) return;
    const text = filteredEntries
      .map((e) => {
        const pinyin = e.pinyin || e.pinyinNum;
        const hv = e.hanViet ? ` [${e.hanViet.toUpperCase()}]` : "";
        const vn = e.vietnamese.join("; ");
        return `${e.simp} (${pinyin})${hv}: ${vn}`;
      })
      .join("\n");

    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  // Open word detail modal
  const handleOpenDetail = (entry: CedictEntry, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setSelectedDetailEntry(entry);
    onOpenWordDetail?.(entry);
  };

  // Remove single entry from favorites
  const handleRemoveEntry = (entry: CedictEntry, e: React.MouseEvent) => {
    e.stopPropagation();
    const uniqueKey = getEntryUniqueKey(entry);
    const matchingKey =
      favoriteWordIds.find((id) => id === uniqueKey) ||
      favoriteWordIds.find((id) => id === `cedict_${entry.id}_${entry.simp}`) ||
      favoriteWordIds.find((id) => id === `cedict_${entry.id}`) ||
      favoriteWordIds.find((id) => id === `cedict_${entry.simp}` || id === entry.simp) ||
      favoriteWordIds.find((id) => id.includes(entry.simp)) ||
      uniqueKey;

    onToggleFavorite(matchingKey);
    setResolvedEntries((prev) => prev.filter((item) => item.id !== entry.id));
  };

  // Toggle radical bookmark safely with async dispatch
  const toggleRadicalBookmark = (id: number, e?: React.MouseEvent) => {
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

  // Add single word to game charging 1 diamond
  const handleAddSingleWordToGame = (entry: CedictEntry | string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const result = addWordToGameChargingDiamond(entry, userProfile, onUpdateProfile);
    setGameToast(result.message);
    setTimeout(() => {
      setGameToast((cur) => (cur === result.message ? null : cur));
    }, 3500);
  };

  // Unadded words count for batch addition
  const unaddedWords = useMemo(() => {
    return resolvedEntries.filter((e) => !gameWordIds.includes(e.simp) && !isWordInGame(e.simp));
  }, [resolvedEntries, gameWordIds]);

  // Batch add all saved words to game
  const handleAddAllWordsToGame = () => {
    if (unaddedWords.length === 0) {
      setGameToast("Tất cả từ vựng đã lưu đều đã có trong Game rồi!");
      setTimeout(() => setGameToast(null), 3000);
      return;
    }
    const cost = unaddedWords.length;
    const currentGems = userProfile?.gems ?? 0;
    if (currentGems < cost) {
      setGameToast(
        `Bạn cần ${cost} 💎 để thêm ${unaddedWords.length} từ vào Game. Hiện tại bạn có ${currentGems} 💎.`
      );
      setTimeout(() => setGameToast(null), 4000);
      return;
    }

    onUpdateProfile?.({ gems: currentGems - cost });
    addMultipleWordsToGame(unaddedWords);
    setGameToast(`✓ Đã thêm toàn bộ ${unaddedWords.length} từ vào Game để luyện tập (-${cost} 💎)!`);
    setTimeout(() => setGameToast(null), 3500);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        id="saved-words-modal-backdrop"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs animate-fadeIn ${
        isFullScreen ? "p-0" : "p-0 sm:p-4 md:p-6"
      }`}
      onClick={onClose}
    >
      <div
        id="saved-words-modal-container"
        onClick={(e) => e.stopPropagation()}
        className={`bg-white flex flex-col overflow-hidden transition-all duration-200 ${
          isFullScreen
            ? "w-full h-[100dvh] rounded-none border-none shadow-none"
            : "w-full h-[100dvh] sm:h-[94vh] sm:max-w-5xl sm:rounded-3xl sm:shadow-2xl sm:border sm:border-slate-100"
        }`}
      >
        {/* Clean, balanced App Bar Header */}
        <div className="px-3.5 py-2.5 sm:px-6 sm:py-3.5 border-b border-slate-200/80 bg-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={onClose}
              className="p-1.5 -ml-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer shrink-0 sm:hidden"
              title="Quay lại"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-xl bg-rose-500 text-white hidden sm:flex items-center justify-center shadow-xs shadow-rose-500/25 shrink-0">
              <Bookmark className="w-4 h-4 fill-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 truncate">
                  Sổ tay đã lưu
                </h2>
                <span className="inline-flex px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-extrabold border border-rose-200/70 shrink-0">
                  {favoriteWordIds.length} từ • {savedRadicalIds.length} bộ thủ
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block truncate">
                Xem lại từ vựng &amp; bộ thủ đã đánh dấu để tra cứu, ôn Flashcard và luyện Game
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Toggle Flashcard Practice Mode (in Words tab) */}
            {activeSavedTab === "words" && resolvedEntries.length > 0 && (
              <button
                id="saved-words-toggle-flashcard-btn"
                onClick={() => {
                  setIsFlashcardMode(!isFlashcardMode);
                  setFlashcardIndex(0);
                  setIsCardFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isFlashcardMode
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200"
                }`}
                title="Chuyển đổi giữa danh sách và Flashcard"
              >
                <Layers className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {isFlashcardMode ? "Xem danh sách" : "Ôn tập Flashcard"}
                </span>
                <span className="sm:hidden">{isFlashcardMode ? "Danh sách" : "Flashcard"}</span>
              </button>
            )}

            {/* Toggle Fullscreen button (desktop) */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer hidden sm:flex items-center justify-center"
              title={isFullScreen ? "Thu nhỏ cửa sổ" : "Chế độ hiển thị full trang"}
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              title="Đóng (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Toast Message */}
        {gameToast && (
          <div className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold flex items-center justify-between animate-fadeIn shadow-inner">
            <span className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              <span>{gameToast}</span>
            </span>
            <button
              onClick={() => setGameToast(null)}
              className="text-white/80 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Two Main Tabs: Từ vựng đã lưu | Bộ thủ đánh dấu */}
        <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50/80 px-2 sm:px-6 shrink-0">
          <button
            id="tab-saved-words"
            onClick={() => {
              setActiveSavedTab("words");
              setIsFlashcardMode(false);
            }}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-black border-b-2 flex items-center justify-center gap-2 transition cursor-pointer ${
              activeSavedTab === "words"
                ? "border-rose-600 text-rose-700 bg-white shadow-2xs rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Từ vựng đã lưu</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                activeSavedTab === "words"
                  ? "bg-rose-100 text-rose-700"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {resolvedEntries.length}
            </span>
          </button>

          <button
            id="tab-saved-radicals"
            onClick={() => {
              setActiveSavedTab("radicals");
              setIsFlashcardMode(false);
            }}
            className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-black border-b-2 flex items-center justify-center gap-2 transition cursor-pointer ${
              activeSavedTab === "radicals"
                ? "border-amber-600 text-amber-800 bg-white shadow-2xs rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
            <span>Bộ thủ đánh dấu</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                activeSavedTab === "radicals"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {savedRadicalIds.length}
            </span>
          </button>
        </div>

        {/* TAB 1: TỪ VỰNG ĐÃ LƯU */}
        {activeSavedTab === "words" && (
          <>
            {!isFlashcardMode ? (
              <>
                {/* Search Bar & Actions */}
                <div className="p-3 sm:p-4 border-b border-slate-200/80 bg-white flex flex-col md:flex-row md:items-center justify-between gap-2.5 shrink-0">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="saved-words-search-input"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm kiếm chữ Hán, Pinyin, Hán Việt hoặc nghĩa tiếng Việt..."
                      className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/60 focus:bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-rose-500 transition shadow-2xs"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Actions Right */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Batch Add to Game */}
                    {unaddedWords.length > 0 && (
                      <button
                        onClick={handleAddAllWordsToGame}
                        className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition cursor-pointer"
                        title="Thêm tất cả từ chưa có vào Game ôn tập (tiêu 1 kim cương mỗi từ)"
                      >
                        <Gamepad2 className="w-4 h-4" />
                        <span className="whitespace-nowrap">Thêm tất cả vào Game</span>
                        <span className="bg-amber-400/40 px-1.5 py-0.5 rounded text-[10px] font-black whitespace-nowrap">
                          {unaddedWords.length} 💎
                        </span>
                      </button>
                    )}

                    {/* Copy All */}
                    {filteredEntries.length > 0 && (
                      <button
                        onClick={handleCopyAll}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shrink-0"
                        title="Sao chép toàn bộ danh sách từ"
                      >
                        {copiedSuccess ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Đã chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Words Content Grid */}
                <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 bg-slate-50/50">
                  {isLoading ? (
                    <div className="py-20 text-center text-slate-400 space-y-3">
                      <div className="w-8 h-8 mx-auto border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs font-semibold">Đang tải danh sách từ vựng đã lưu...</p>
                    </div>
                  ) : resolvedEntries.length === 0 ? (
                    <div className="py-20 text-center text-slate-400 space-y-3 max-w-sm mx-auto">
                      <div className="w-14 h-14 mx-auto rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center">
                        <Bookmark className="w-7 h-7" />
                      </div>
                      <h3 className="text-base font-bold text-slate-700">Chưa có từ vựng nào được lưu</h3>
                      <p className="text-xs text-slate-500">
                        Khi tra từ điển hoặc học bài, bấm biểu tượng Bookmark để lưu từ vào đây.
                      </p>
                      {onNavigateToDictionary && (
                        <button
                          onClick={() => {
                            onClose();
                            onNavigateToDictionary();
                          }}
                          className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition cursor-pointer"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>Mở Từ điển để lưu từ</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ) : filteredEntries.length === 0 ? (
                    <div className="py-16 text-center text-slate-400">
                      <p className="text-xs font-bold">
                        Không tìm thấy từ nào phù hợp với "{searchQuery}".
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-3.5">
                      {filteredEntries.map((entry) => {
                        const isAudioPlaying = playingSimp === entry.simp;
                        const inGame = gameWordIds.includes(entry.simp) || isWordInGame(entry.simp);

                        return (
                          <div
                            key={entry.simp}
                            onClick={(e) => handleOpenDetail(entry, e)}
                            className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-rose-300 hover:shadow-md transition-all group relative flex flex-col justify-between cursor-pointer"
                          >
                            <div>
                              {/* Top Row: Hanzi, Pinyin & Actions */}
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-baseline gap-2 flex-wrap min-w-0">
                                  <span className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-rose-600 transition-colors font-serif">
                                    {entry.simp}
                                  </span>
                                  {entry.trad && entry.trad !== entry.simp && (
                                    <span className="text-xs text-slate-400">
                                      ({entry.trad})
                                    </span>
                                  )}
                                  <span className="text-sm font-extrabold text-blue-600">
                                    {entry.pinyin || entry.pinyinNum}
                                  </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-1.5 shrink-0">
                                  {/* Audio Speaker */}
                                  <button
                                    onClick={(e) => handlePlayAudio(entry.simp, e)}
                                    className={`w-8 h-8 rounded-xl border flex items-center justify-center transition cursor-pointer ${
                                      isAudioPlaying
                                        ? "bg-rose-500 text-white border-rose-500 animate-pulse"
                                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                                    }`}
                                    title="Phát âm chuẩn"
                                  >
                                    <Volume2 className="w-4 h-4" />
                                  </button>

                                  {/* Remove from Saved */}
                                  <button
                                    onClick={(e) => handleRemoveEntry(entry, e)}
                                    className="w-8 h-8 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 hover:border-rose-200 flex items-center justify-center transition cursor-pointer"
                                    title="Bỏ lưu khỏi sổ tay"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Sino-Vietnamese Han Viet */}
                              {entry.hanViet && (
                                <div className="mt-1.5">
                                  <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                    Hán Việt: {entry.hanViet.toUpperCase()}
                                  </span>
                                </div>
                              )}

                              {/* Vietnamese Definition */}
                              <div className="mt-2 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed line-clamp-2">
                                {entry.vietnamese.map((def, idx) => (
                                  <span key={idx}>
                                    {idx > 0 && "; "}
                                    {def}
                                  </span>
                                ))}
                              </div>

                              {/* English Definition */}
                              {entry.english && entry.english.length > 0 && (
                                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 italic">
                                  En: {entry.english.join(", ")}
                                </p>
                              )}
                            </div>

                            {/* Bottom Tag Bar with Game Button */}
                            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
                              <div>
                                {inGame ? (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onClose();
                                      onNavigateToGame?.();
                                    }}
                                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold border border-emerald-200 flex items-center gap-1.5 transition text-xs cursor-pointer"
                                    title="Từ đã có trong game, bấm để tới Game luyện tập ngay"
                                  >
                                    <Gamepad2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Đã có trong Game</span>
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={(e) => handleAddSingleWordToGame(entry, e)}
                                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold border border-amber-500 shadow-2xs flex items-center gap-1.5 transition text-xs active:scale-95 cursor-pointer"
                                    title="Thêm từ này vào thư viện Game để ôn tập (tiêu 1 kim cương)"
                                  >
                                    <Gamepad2 className="w-3.5 h-3.5" />
                                    <span>Thêm vào Game</span>
                                    <span className="bg-amber-600/80 px-1.5 py-0.2 rounded text-[10px] font-black">
                                      1 💎
                                    </span>
                                  </button>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={(e) => handleOpenDetail(entry, e)}
                                className="text-slate-500 group-hover:text-rose-600 hover:text-rose-700 font-bold flex items-center gap-0.5 transition-colors shrink-0 cursor-pointer p-1 -m-1 rounded-lg hover:bg-rose-50 active:scale-95"
                                title="Xem chi tiết từ vựng"
                              >
                                <span>Chi tiết</span>
                                <ChevronRightIcon className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Flashcard Review Mode */
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-center bg-slate-50/50">
                {filteredEntries.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    Không có từ vựng nào để ôn tập.
                  </div>
                ) : (
                  <div className="w-full max-w-lg space-y-6">
                    {/* Flashcard Header Progress */}
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                      <span className="flex items-center gap-1 text-indigo-600">
                        <Sparkles className="w-4 h-4" />
                        <span>Luyện nhớ từ đã lưu</span>
                      </span>
                      <span>
                        Thẻ {flashcardIndex + 1} / {filteredEntries.length}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-full transition-all duration-300"
                        style={{
                          width: `${((flashcardIndex + 1) / filteredEntries.length) * 100}%`
                        }}
                      />
                    </div>

                    {/* Main Flashcard Card (Flip interaction) */}
                    {(() => {
                      const card = filteredEntries[flashcardIndex];
                      if (!card) return null;
                      const cardInGame = gameWordIds.includes(card.simp) || isWordInGame(card.simp);

                      return (
                        <div
                          onClick={() => setIsCardFlipped(!isCardFlipped)}
                          className="w-full min-h-[300px] sm:min-h-[340px] bg-white rounded-3xl border-2 border-indigo-100 shadow-xl p-6 sm:p-8 flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-300 hover:border-indigo-300 relative group select-none"
                        >
                          {/* Card Top Actions */}
                          <div className="w-full flex items-center justify-between">
                            <div>
                              {cardInGame ? (
                                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200 flex items-center gap-1">
                                  <Gamepad2 className="w-3 h-3" />
                                  <span>Đã trong Game</span>
                                </span>
                              ) : (
                                <button
                                  onClick={(e) => handleAddSingleWordToGame(card, e)}
                                  className="px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-2xs transition active:scale-95"
                                  title="Thêm vào game để luyện (1 💎)"
                                >
                                  <Gamepad2 className="w-3 h-3" />
                                  <span>Thêm vào Game (1 💎)</span>
                                </button>
                              )}
                            </div>

                            <button
                              onClick={(e) => handlePlayAudio(card.simp, e)}
                              className="p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition cursor-pointer"
                              title="Nghe phát âm"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Card Center Content */}
                          <div className="my-auto py-4">
                            {!isCardFlipped ? (
                              /* Front of Card: Hanzi Only */
                              <div className="space-y-4">
                                <h2 className="text-5xl sm:text-6xl font-black text-slate-900 font-serif tracking-wide">
                                  {card.simp}
                                </h2>
                                {card.trad && card.trad !== card.simp && (
                                  <p className="text-sm text-slate-400 font-serif">
                                    Phồn thể: {card.trad}
                                  </p>
                                )}
                                <p className="text-xs text-indigo-500 font-semibold flex items-center justify-center gap-1 pt-2 animate-pulse">
                                  <RotateCw className="w-3.5 h-3.5" />
                                  <span>Nhấn vào thẻ để lật xem nghĩa</span>
                                </p>
                              </div>
                            ) : (
                              /* Back of Card: Pinyin, Hán Việt, Vietnamese, English */
                              <div className="space-y-3 animate-fadeIn">
                                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif">
                                  {card.simp}
                                </h3>
                                <p className="text-xl font-black text-blue-600">
                                  {card.pinyin || card.pinyinNum}
                                </p>
                                {card.hanViet && (
                                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                                    Âm Hán Việt: {card.hanViet.toUpperCase()}
                                  </span>
                                )}
                                <div className="text-sm font-bold text-slate-800 pt-2 border-t border-slate-100 max-w-sm mx-auto">
                                  {card.vietnamese.join("; ")}
                                </div>
                                {card.english && card.english.length > 0 && (
                                  <p className="text-xs text-slate-400 italic">
                                    {card.english.slice(0, 2).join(", ")}
                                  </p>
                                )}

                                <button
                                  type="button"
                                  onClick={(e) => handleOpenDetail(card, e)}
                                  className="mt-3.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-600 font-bold text-xs flex items-center gap-1.5 transition mx-auto cursor-pointer border border-slate-200 shadow-2xs active:scale-95"
                                  title="Xem chi tiết đầy đủ từ vựng"
                                >
                                  <BookOpen className="w-3.5 h-3.5 text-rose-500" />
                                  <span>Xem chi tiết từ vựng</span>
                                  <ChevronRightIcon className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Card Bottom Hint */}
                          <div className="text-[11px] text-slate-400 font-medium">
                            {isCardFlipped ? "Đã lật mặt sau" : "Mặt trước chữ Hán"}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between gap-3">
                      <button
                        disabled={flashcardIndex === 0}
                        onClick={() => {
                          setFlashcardIndex((prev) => Math.max(0, prev - 1));
                          setIsCardFlipped(false);
                        }}
                        className="flex-1 py-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-40 cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Từ trước</span>
                      </button>

                      <button
                        onClick={() => {
                          const next = (flashcardIndex + 1) % filteredEntries.length;
                          setFlashcardIndex(next);
                          setIsCardFlipped(false);
                        }}
                        className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/20 transition cursor-pointer"
                      >
                        <span>Từ kế tiếp</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* TAB 2: BỘ THỦ ĐÃ ĐÁNH DẤU */}
        {activeSavedTab === "radicals" && (
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/50">
            {/* Search Bar */}
            <div className="p-3 sm:p-4 border-b border-slate-200/80 bg-white flex items-center justify-between gap-3 shrink-0">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={savedRadicalSearch}
                  onChange={(e) => setSavedRadicalSearch(e.target.value)}
                  placeholder="Tìm kiếm bộ thủ đã đánh dấu (chữ, pinyin, Hán Việt, nét, nghĩa)..."
                  className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 hover:bg-slate-100/60 focus:bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 transition shadow-2xs"
                />
                {savedRadicalSearch && (
                  <button
                    onClick={() => setSavedRadicalSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {onNavigateToRadicals && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToRadicals();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition cursor-pointer shrink-0"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Xem 214 Bộ Thủ</span>
                  <span className="sm:hidden">214 Bộ</span>
                </button>
              )}
            </div>

            {/* Radicals Grid */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-5">
              {savedRadicalsList.length === 0 ? (
                <div className="py-20 text-center text-slate-400 space-y-3 max-w-sm mx-auto">
                  <div className="w-14 h-14 mx-auto rounded-3xl bg-amber-50 text-amber-500 flex items-center justify-center">
                    <Bookmark className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-slate-700">Chưa có bộ thủ nào được đánh dấu</h3>
                  <p className="text-xs text-slate-500">
                    Hãy duyệt danh mục 214 Bộ thủ Hán tự và nhấn vào biểu tượng Bookmark để lưu vào sổ tay tra cứu nhanh.
                  </p>
                  {onNavigateToRadicals && (
                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToRadicals();
                      }}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition cursor-pointer"
                    >
                      <Grid className="w-4 h-4" />
                      <span>Khám phá 214 Bộ Thủ ngay</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ) : filteredSavedRadicals.length === 0 ? (
                <div className="py-16 text-center text-slate-400">
                  <p className="text-xs font-bold">
                    Không tìm thấy bộ thủ nào phù hợp với từ khóa "{savedRadicalSearch}".
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
                  {filteredSavedRadicals.map((r) => (
                    <div
                      key={r.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-300 hover:shadow-md transition-all group flex flex-col justify-between"
                    >
                      <div>
                        {/* Top: Radical & Info */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-12 h-12 rounded-2xl bg-amber-50 text-red-600 font-serif font-black text-2xl flex items-center justify-center border border-amber-200 shadow-inner group-hover:scale-105 transition-transform">
                              {r.radical}
                            </span>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-extrabold text-slate-900">
                                  {r.pinyin}
                                </span>
                                <button
                                  onClick={(e) => handlePlayAudio(r.radical, e)}
                                  className="p-1 text-slate-400 hover:text-red-600 transition"
                                  title="Nghe phát âm"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <div className="text-xs font-semibold text-red-700">
                                Bộ {r.sinoVietnamese}
                              </div>
                              <div className="text-[11px] text-slate-400 mt-0.5">
                                {r.strokeCount} nét • #{r.id}
                              </div>
                            </div>
                          </div>

                          {/* Unbookmark */}
                          <button
                            onClick={(e) => toggleRadicalBookmark(r.id, e)}
                            className="p-1 text-amber-500 hover:text-slate-400 transition cursor-pointer"
                            title="Bỏ đánh dấu"
                          >
                            <BookMarked className="w-4 h-4 fill-amber-500" />
                          </button>
                        </div>

                        {/* Meaning */}
                        <p className="text-xs text-slate-700 font-medium mt-3 line-clamp-2">
                          {r.vietnamese}
                        </p>

                        {/* Variants if any */}
                        {r.variants && r.variants.length > 0 && (
                          <div className="flex items-center gap-1.5 mt-2">
                            <span className="text-[10px] text-slate-400">Biến thể:</span>
                            {r.variants.map((v, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-1 py-0.5 rounded bg-slate-100 font-serif font-bold text-red-600 border border-slate-200"
                              >
                                {v}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom Link to Practice */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                        {onNavigateToRadicals && (
                          <button
                            onClick={() => {
                              onClose();
                              onNavigateToRadicals();
                            }}
                            className="text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <PenTool className="w-3 h-3" />
                            <span>Tập viết nét</span>
                          </button>
                        )}
                        <span className="text-[10px] text-slate-400 font-semibold">
                          #{r.id}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-100 bg-white flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>
            {activeSavedTab === "words" ? (
              <>
                Đã lưu <strong>{favoriteWordIds.length}</strong> từ vựng • Có sẵn trong game:{" "}
                <strong>{gameWordIds.filter((id) => favoriteWordIds.some((f) => f.includes(id))).length}</strong> từ
              </>
            ) : (
              <>
                Đã đánh dấu <strong>{savedRadicalIds.length}</strong> / 214 bộ thủ Hán tự
              </>
            )}
          </span>
          <div className="flex items-center gap-2 ml-auto">
            {onNavigateToGame && activeSavedTab === "words" && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToGame();
                }}
                className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Mở Game ôn tập</span>
              </button>
            )}
            {onNavigateToRadicals && activeSavedTab === "radicals" && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToRadicals();
                }}
                className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Đến 214 Bộ Thủ</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Word Detail Modal Window */}
      <WordDetailModal
        isOpen={!!selectedDetailEntry}
        onClose={() => setSelectedDetailEntry(null)}
        entry={selectedDetailEntry}
        onToggleFavorite={onToggleFavorite}
        favoriteWordIds={favoriteWordIds}
        userProfile={userProfile}
        onUpdateProfile={onUpdateProfile}
        onNavigateToGame={() => {
          setSelectedDetailEntry(null);
          onClose();
          onNavigateToGame?.();
        }}
        onSelectWord={() => {
          setSelectedDetailEntry(null);
          onClose();
          onNavigateToDictionary?.();
        }}
      />
    </>
  );
};
