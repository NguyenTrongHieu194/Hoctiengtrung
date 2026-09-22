import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  X,
  Search,
  Gamepad2,
  Check,
  Plus,
  Trash2,
  Volume2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Filter,
  AlertCircle,
  Zap
} from "lucide-react";
import { WordItem, UserProfile } from "../types";
import { getAllDictionaryWords, normalizePinyin, normalizeVietnamese } from "../data/dictionaryService";
import {
  getCustomGameWordIds,
  getCustomGameWordItems,
  isWordInGame,
  toggleWordInGame,
  addMultipleWordsToGame,
  removeMultipleWordsFromGame,
  clearCustomGameWords,
  subscribeCustomGameVocab
} from "../services/customGameVocabService";
import { playChineseAudio } from "../services/speechService";

interface CustomGameVocabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame?: (gameType?: "memory" | "speed" | "tones") => void;
  initialTab?: "browse" | "selected";
  userProfile?: UserProfile;
  onUpdateProfile?: (updated: Partial<UserProfile>) => void;
  onOpenActivityModal?: () => void;
}

const ITEMS_PER_PAGE = 24;

export const CustomGameVocabModal: React.FC<CustomGameVocabModalProps> = ({
  isOpen,
  onClose,
  onStartGame,
  initialTab = "browse",
  userProfile,
  onUpdateProfile,
  onOpenActivityModal
}) => {
  const [selectedWordIds, setSelectedWordIds] = useState<string[]>(() => getCustomGameWordIds());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"browse" | "selected">("browse");

  // Search & Pagination inside Selected tab
  const [selectedSearchTerm, setSelectedSearchTerm] = useState("");
  const [selectedPage, setSelectedPage] = useState(1);
  const [browsePage, setBrowsePage] = useState(1);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Sync with initialTab whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setSelectedPage(1);
      setBrowsePage(1);
      setShowClearConfirm(false);
      setSelectedWordIds(getCustomGameWordIds());
    }
  }, [isOpen, initialTab]);

  // Sync with service updates
  useEffect(() => {
    const unsubscribe = subscribeCustomGameVocab((ids) => {
      setSelectedWordIds(ids);
    });
    return unsubscribe;
  }, []);

  const allWords = useMemo(() => {
    try {
      return getAllDictionaryWords() || [];
    } catch (err) {
      console.error("Failed to load dictionary words:", err);
      return [];
    }
  }, []);

  // Filter words for Browse tab
  const filteredWords = useMemo(() => {
    try {
      const qRaw = (searchTerm || "").toLowerCase().trim();
      const qPinyinNorm = normalizePinyin(qRaw);
      const qVnNorm = normalizeVietnamese(qRaw);

      return allWords.filter((word) => {
        if (!word) return false;

        // Level filter
        if (selectedLevel !== "all") {
          if (selectedLevel === "GARMENT") {
            if (!word.isSpecialized && word.hskLevel !== "GARMENT" && !(word.topic && word.topic.includes("May"))) {
              return false;
            }
          } else if (word.hskLevel !== selectedLevel) {
            return false;
          }
        }

        // Topic filter
        if (selectedTopic !== "all" && word.topic !== selectedTopic) {
          return false;
        }

        // Search query
        if (!qRaw) return true;

        const hanzi = word.hanzi || "";
        const pinyin = (word.pinyin || "").toLowerCase();
        const pinyinNorm = normalizePinyin(word.pinyin || "");
        const vn = (word.vietnamese || "").toLowerCase();
        const vnNorm = normalizeVietnamese(word.vietnamese || "");

        return (
          hanzi.includes(qRaw) ||
          pinyin.includes(qRaw) ||
          pinyinNorm.includes(qPinyinNorm) ||
          vn.includes(qRaw) ||
          vnNorm.includes(qVnNorm)
        );
      });
    } catch (e) {
      console.error("Error filtering words:", e);
      return allWords;
    }
  }, [allWords, selectedLevel, selectedTopic, searchTerm]);

  // Selected words objects lookup directly from customGameVocabService (resolves IDs, Hanzi, CEDICT words, and cached entries)
  const selectedWordObjects = useMemo(() => {
    try {
      return getCustomGameWordItems();
    } catch {
      return [];
    }
  }, [selectedWordIds]);

  // Quick check if a word is already in game (checks both ID and Hanzi)
  const isWordSelected = useCallback(
    (w: WordItem) => {
      if (!w) return false;
      if (selectedWordIds.includes(w.id)) return true;
      if (w.hanzi && selectedWordIds.includes(w.hanzi)) return true;
      if (w.hanzi && isWordInGame(w.hanzi)) return true;
      return false;
    },
    [selectedWordIds]
  );

  // Filtered words inside Selected tab
  const filteredSelectedWordObjects = useMemo(() => {
    const qRaw = (selectedSearchTerm || "").toLowerCase().trim();
    if (!qRaw) return selectedWordObjects;

    const qPinyinNorm = normalizePinyin(qRaw);
    const qVnNorm = normalizeVietnamese(qRaw);

    return selectedWordObjects.filter((word) => {
      const hanzi = word.hanzi || "";
      const pinyin = (word.pinyin || "").toLowerCase();
      const pinyinNorm = normalizePinyin(word.pinyin || "");
      const vn = (word.vietnamese || "").toLowerCase();
      const vnNorm = normalizeVietnamese(word.vietnamese || "");

      return (
        hanzi.includes(qRaw) ||
        pinyin.includes(qRaw) ||
        pinyinNorm.includes(qPinyinNorm) ||
        vn.includes(qRaw) ||
        vnNorm.includes(qVnNorm)
      );
    });
  }, [selectedWordObjects, selectedSearchTerm]);

  // Pagination calculations
  const totalBrowsePages = Math.max(1, Math.ceil(filteredWords.length / ITEMS_PER_PAGE));
  const currentBrowsePage = Math.min(browsePage, totalBrowsePages);
  const paginatedBrowseWords = useMemo(() => {
    const start = (currentBrowsePage - 1) * ITEMS_PER_PAGE;
    return filteredWords.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredWords, currentBrowsePage]);

  const totalSelectedPages = Math.max(1, Math.ceil(filteredSelectedWordObjects.length / ITEMS_PER_PAGE));
  const currentSelectedPage = Math.min(selectedPage, totalSelectedPages);
  const paginatedSelectedWords = useMemo(() => {
    const start = (currentSelectedPage - 1) * ITEMS_PER_PAGE;
    return filteredSelectedWordObjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSelectedWordObjects, currentSelectedPage]);

  // Extract available topics for current level
  const availableTopics = useMemo(() => {
    const topicSet = new Set<string>();
    allWords.forEach((w) => {
      if (
        selectedLevel === "all" ||
        w.hskLevel === selectedLevel ||
        (selectedLevel === "GARMENT" && (w.isSpecialized || w.hskLevel === "GARMENT"))
      ) {
        if (w.topic) topicSet.add(w.topic);
      }
    });
    return Array.from(topicSet).sort();
  }, [allWords, selectedLevel]);

  // State for gem alerts & feedback
  const [gemWarning, setGemWarning] = useState<{
    show: boolean;
    requiredGems: number;
    currentGems: number;
    message?: string;
  } | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const currentGems = userProfile?.gems ?? 0;

  // Handle toggle single word
  const handleToggle = (word: WordItem | string) => {
    const targetWord = typeof word === "string" ? allWords.find((w) => w.id === word || w.hanzi === word) : word;
    const wordId = typeof word === "string" ? word : word.id;
    const wordHanzi = typeof word === "string" ? (targetWord?.hanzi || word) : word.hanzi;
    const isCurrentlySelected = targetWord ? isWordSelected(targetWord) : isWordInGame(wordId);

    if (isCurrentlySelected) {
      // Gỡ khỏi game: miễn phí
      removeMultipleWordsFromGame([wordId, wordHanzi]);
      setSuccessToast("Đã gỡ từ khỏi kho Game");
      setTimeout(() => setSuccessToast(null), 2000);
      return;
    }

    // Nạp từ mới: cần 1 kim cương
    if (currentGems < 1) {
      setGemWarning({
        show: true,
        requiredGems: 1,
        currentGems,
        message: "Bạn cần 1 Kim Cương để nạp từ này vào kho Game!"
      });
      return;
    }

    if (onUpdateProfile) {
      onUpdateProfile({ gems: currentGems - 1 });
    }
    toggleWordInGame(targetWord || word);
    setSuccessToast("✓ Đã nạp vào Game (-1 💎)");
    setTimeout(() => setSuccessToast(null), 2500);
  };

  // Select all words on current browse page
  const handleSelectCurrentPage = () => {
    const newWords = paginatedBrowseWords.filter((w) => !isWordSelected(w));

    if (newWords.length === 0) {
      setSuccessToast("Tất cả từ trên trang này đã có trong Game!");
      setTimeout(() => setSuccessToast(null), 2000);
      return;
    }

    const cost = newWords.length;
    if (currentGems < cost) {
      setGemWarning({
        show: true,
        requiredGems: cost,
        currentGems,
        message: `Trang này có ${newWords.length} từ mới chưa nạp. Cần ${cost} 💎 nhưng bạn hiện có ${currentGems} 💎.`
      });
      return;
    }

    if (onUpdateProfile) {
      onUpdateProfile({ gems: currentGems - cost });
    }
    addMultipleWordsToGame(newWords);
    setSuccessToast(`✓ Đã nạp ${newWords.length} từ vào Game (-${cost} 💎)`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // Deselect all words on current browse page
  const handleDeselectCurrentPage = () => {
    const idsToRemove = paginatedBrowseWords.flatMap((w) => [w.id, w.hanzi]);
    removeMultipleWordsFromGame(idsToRemove);
  };

  // Quick preset packs
  const handleAddPreset = (type: "hsk1" | "garment" | "daily") => {
    let presetWords: WordItem[] = [];
    if (type === "hsk1") {
      presetWords = allWords.filter((w) => w.hskLevel === "HSK1").slice(0, 20);
    } else if (type === "garment") {
      presetWords = allWords.filter((w) => w.isSpecialized || w.hskLevel === "GARMENT").slice(0, 20);
    } else {
      presetWords = allWords
        .filter((w) => w.topic?.includes("Ăn uống") || w.topic?.includes("Chào hỏi"))
        .slice(0, 20);
    }

    const newWords = presetWords.filter((w) => !isWordSelected(w));

    if (newWords.length === 0) {
      setSuccessToast("Gói từ vựng này đã được nạp toàn bộ vào Game!");
      setTimeout(() => setSuccessToast(null), 2000);
      return;
    }

    const cost = newWords.length;
    if (currentGems < cost) {
      setGemWarning({
        show: true,
        requiredGems: cost,
        currentGems,
        message: `Gói có ${newWords.length} từ mới. Cần ${cost} 💎 nhưng bạn hiện chỉ có ${currentGems} 💎.`
      });
      return;
    }

    if (onUpdateProfile) {
      onUpdateProfile({ gems: currentGems - cost });
    }
    addMultipleWordsToGame(newWords);
    setSuccessToast(`✓ Đã nạp gói ${newWords.length} từ vào Game (-${cost} 💎)`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col w-full h-full overflow-hidden animate-fadeIn">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200/90 shadow-2xs shrink-0">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <button
              onClick={onClose}
              className="p-2 sm:px-3 sm:py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 cursor-pointer font-bold text-xs shrink-0 active:scale-95"
              title="Quay lại Game"
            >
              <ChevronLeft className="w-5 h-5 text-slate-800" />
              <span className="hidden sm:inline">Quay lại Game</span>
            </button>

            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/20 shrink-0">
              <Gamepad2 className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-sm sm:text-lg font-black text-slate-900 truncate">
                  Quản Lý Kho Từ Cho Game
                </h1>
                <span className="text-[11px] sm:text-xs font-black px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 shrink-0">
                  {selectedWordObjects.length} từ đã nạp
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate hidden sm:block">
                Tự do chọn từ vựng bạn muốn ôn tập để đưa vào Lật Thẻ, Bắt Từ & Luyện Thanh Điệu
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Diamond Balance */}
            <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs shadow-2xs">
              <span className="text-sm">💎</span>
              <span className="font-black text-blue-900">
                {(userProfile?.gems ?? 0).toLocaleString()}
              </span>
              <span className="text-[10px] text-blue-600 font-bold hidden md:inline">
                (Phí: 1 💎/từ)
              </span>
            </div>

            {onOpenActivityModal && (
              <button
                onClick={onOpenActivityModal}
                title="Đổi Điểm Sôi Nổi sang Kim Cương (10 điểm = 10 💎)"
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black transition cursor-pointer flex items-center gap-1 shadow-2xs active:scale-95"
              >
                <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="hidden sm:inline">Đổi Điểm ⚡</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <span>Xong & Lưu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Full-Page Content */}
      <main className="flex-1 flex flex-col overflow-hidden max-w-7xl mx-auto w-full">
        {/* Tab Switcher & Quick Presets Bar */}
        <div className="px-3 sm:px-6 py-2.5 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2.5 bg-white/90 shrink-0">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold shadow-2xs">
            <button
              onClick={() => setActiveTab("selected")}
              className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "selected"
                  ? "bg-white text-indigo-700 shadow-sm font-black"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Từ đã chọn trong game</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  activeTab === "selected" ? "bg-indigo-100 text-indigo-700" : "bg-slate-200 text-slate-700"
                }`}
              >
                {selectedWordObjects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("browse")}
              className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                activeTab === "browse"
                  ? "bg-white text-indigo-700 shadow-sm font-black"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Tra cứu & Chọn thêm ({allWords.length})
            </button>
          </div>

          {/* Quick Preset Packs */}
          <div className="flex items-center gap-1.5 text-xs overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10px] font-bold text-slate-400 hidden md:inline">Gói nhanh:</span>
            <button
              onClick={() => handleAddPreset("hsk1")}
              className="px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-[11px] font-bold transition cursor-pointer shrink-0 active:scale-95"
            >
              +20 từ HSK 1
            </button>
            <button
              onClick={() => handleAddPreset("garment")}
              className="px-2.5 py-1 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 text-[11px] font-bold transition cursor-pointer shrink-0 active:scale-95"
            >
              +20 từ May Mặc
            </button>
            <button
              onClick={() => handleAddPreset("daily")}
              className="px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[11px] font-bold transition cursor-pointer shrink-0 active:scale-95"
            >
              +20 từ Ăn uống
            </button>
          </div>
        </div>

        {/* =======================================================================
            TAB 1: SELECTED WORDS TAB
           ======================================================================= */}
        {activeTab === "selected" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Toolbar in Selected View */}
            <div className="p-3 sm:p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2.5 bg-white">
              <div className="relative flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Tìm trong danh sách từ đã chọn..."
                  value={selectedSearchTerm}
                  onChange={(e) => {
                    setSelectedSearchTerm(e.target.value);
                    setSelectedPage(1);
                  }}
                  className="w-full bg-slate-50 text-slate-800 text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                {selectedSearchTerm && (
                  <button
                    onClick={() => {
                      setSelectedSearchTerm("");
                      setSelectedPage(1);
                    }}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">
                  Hiển thị: <strong>{filteredSelectedWordObjects.length}</strong> / {selectedWordObjects.length} từ
                </span>

                {selectedWordObjects.length > 0 && (
                  <>
                    {!showClearConfirm ? (
                      <button
                        onClick={() => setShowClearConfirm(true)}
                        className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition cursor-pointer flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa tất cả</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 bg-rose-50 p-1 rounded-xl border border-rose-200 animate-fadeIn">
                        <span className="text-[11px] font-bold text-rose-700 px-1">Chắc chắn xóa?</span>
                        <button
                          onClick={() => {
                            clearCustomGameWords();
                            setShowClearConfirm(false);
                            setSelectedPage(1);
                          }}
                          className="px-2 py-1 rounded-lg bg-rose-600 text-white text-[11px] font-bold hover:bg-rose-700 cursor-pointer"
                        >
                          Xóa hết
                        </button>
                        <button
                          onClick={() => setShowClearConfirm(false)}
                          className="px-2 py-1 rounded-lg bg-white text-slate-600 text-[11px] font-bold border border-slate-200 hover:bg-slate-50 cursor-pointer"
                        >
                          Hủy
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Word Grid in Selected View */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 min-h-[260px]">
              {selectedWordObjects.length === 0 ? (
                <div className="py-14 text-center text-slate-400 space-y-3">
                  <div className="text-4xl">🎮</div>
                  <h3 className="text-base font-bold text-slate-700">Chưa có từ vựng nào trong kho game</h3>
                  <p className="text-xs max-w-sm mx-auto text-slate-500">
                    Hãy bấm tab &quot;Tra cứu & Chọn thêm&quot; hoặc chọn các gói nhanh ở trên để nạp từ vựng vào game.
                  </p>
                  <button
                    onClick={() => setActiveTab("browse")}
                    className="mt-2 px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/25 cursor-pointer"
                  >
                    Mở Kho Tra Cứu Từ Vựng
                  </button>
                </div>
              ) : filteredSelectedWordObjects.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <p className="text-sm font-semibold">Không tìm thấy từ vựng khớp với tìm kiếm</p>
                  <button
                    onClick={() => setSelectedSearchTerm("")}
                    className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
                  >
                    Xóa bộ lọc tìm kiếm
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3">
                  {paginatedSelectedWords.map((word) => (
                    <div
                      key={word.id}
                      className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-200/90 flex items-center justify-between gap-2.5 transition hover:shadow-xs"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-black text-slate-900 tracking-wide">
                            {word.hanzi}
                          </span>
                          <span className="text-xs font-mono font-semibold text-indigo-600">
                            {word.pinyin}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
                          {word.vietnamese}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5 text-[10px] text-slate-400">
                          <span className="font-semibold text-slate-500">{word.hskLevel}</span>
                          {word.topic && <span>• {word.topic}</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => playChineseAudio(word.hanzi, 1.0)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-white transition cursor-pointer"
                          title="Phát âm"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggle(word)}
                          className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-100 transition cursor-pointer"
                          title="Gỡ khỏi game"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination Controls for Selected View */}
            {totalSelectedPages > 1 && (
              <div className="p-2.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-500 font-medium text-[11px]">
                  Trang <strong className="text-slate-800">{currentSelectedPage}</strong> / {totalSelectedPages} ({filteredSelectedWordObjects.length} từ)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentSelectedPage <= 1}
                    onClick={() => setSelectedPage((p) => Math.max(1, p - 1))}
                    className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-black text-slate-700 px-2">
                    {currentSelectedPage}
                  </span>
                  <button
                    disabled={currentSelectedPage >= totalSelectedPages}
                    onClick={() => setSelectedPage((p) => Math.min(totalSelectedPages, p + 1))}
                    className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =======================================================================
            TAB 2: BROWSE & ADD WORDS TAB
           ======================================================================= */}
        {activeTab === "browse" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Filters and Search Bar */}
            <div className="p-3 sm:p-4 border-b border-slate-100 space-y-2.5 bg-white">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm chữ Hán, Pinyin, hoặc nghĩa Tiếng Việt..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setBrowsePage(1);
                  }}
                  className="w-full bg-slate-50 text-slate-800 text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                {searchTerm && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setBrowsePage(1);
                    }}
                    className="absolute right-3 top-2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Level Selector */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                <span className="font-bold text-slate-400 shrink-0 text-[11px]">Cấp độ:</span>
                {[
                  { id: "all", label: "Tất cả" },
                  { id: "HSK1", label: "HSK 1" },
                  { id: "HSK2", label: "HSK 2" },
                  { id: "HSK3", label: "HSK 3" },
                  { id: "HSK4", label: "HSK 4" },
                  { id: "HSK5", label: "HSK 5" },
                  { id: "HSK6", label: "HSK 6" },
                  { id: "GARMENT", label: "May Mặc" }
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => {
                      setSelectedLevel(lvl.id);
                      setSelectedTopic("all");
                      setBrowsePage(1);
                    }}
                    className={`px-2.5 py-1 rounded-xl font-bold transition shrink-0 cursor-pointer text-[11px] ${
                      selectedLevel === lvl.id
                        ? "bg-slate-900 text-white shadow-2xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>

              {/* Topic dropdown & Batch Selection Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-400 shrink-0">Chủ đề:</span>
                  <select
                    value={selectedTopic}
                    onChange={(e) => {
                      setSelectedTopic(e.target.value);
                      setBrowsePage(1);
                    }}
                    className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-[200px] truncate"
                  >
                    <option value="all">Tất cả chủ đề ({availableTopics.length})</option>
                    {availableTopics.map((top) => (
                      <option key={top} value={top}>
                        {top}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleSelectCurrentPage}
                    className="text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-xl border border-indigo-200 transition cursor-pointer flex items-center gap-1"
                    title="Chọn tất cả từ ở trang hiện tại"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Chọn trang này ({paginatedBrowseWords.length})</span>
                  </button>
                  <button
                    onClick={handleDeselectCurrentPage}
                    className="text-[11px] font-semibold text-slate-500 hover:text-slate-700 px-2 py-1 rounded-xl transition cursor-pointer"
                  >
                    Bỏ chọn trang này
                  </button>
                </div>
              </div>
            </div>

            {/* Word Grid in Browse View */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 min-h-[260px]">
              {filteredWords.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <p className="text-sm font-semibold">Không tìm thấy từ vựng phù hợp với bộ lọc</p>
                  <p className="text-xs">Hãy thử thay đổi từ khóa hoặc cấp độ HSK</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3">
                  {paginatedBrowseWords.map((word) => {
                    const isSelected = isWordSelected(word);
                    return (
                      <div
                        key={word.id}
                        onClick={() => handleToggle(word)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                          isSelected
                            ? "bg-indigo-50/80 border-indigo-300 shadow-2xs"
                            : "bg-white border-slate-200/90 hover:border-indigo-200 hover:bg-slate-50/70"
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-base font-black text-slate-900 tracking-wide">
                              {word.hanzi}
                            </span>
                            <span className="text-xs font-mono font-semibold text-indigo-600 bg-indigo-50/80 px-1.5 py-0.5 rounded-md truncate">
                              {word.pinyin}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
                            {word.vietnamese}
                          </p>
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                            <span className="font-semibold text-slate-500">{word.hskLevel}</span>
                            {word.topic && <span>• {word.topic}</span>}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              playChineseAudio(word.hanzi, 1.0);
                            }}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-white transition cursor-pointer"
                            title="Phát âm"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>

                          <div
                            className={`w-6 h-6 rounded-xl flex items-center justify-center transition-all ${
                              isSelected
                                ? "bg-indigo-600 text-white shadow-2xs"
                                : "border border-slate-300 bg-white text-transparent"
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Pagination Controls for Browse View */}
            {totalBrowsePages > 1 && (
              <div className="p-2.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-500 font-medium text-[11px]">
                  Trang <strong className="text-slate-800">{currentBrowsePage}</strong> / {totalBrowsePages} ({filteredWords.length} từ)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentBrowsePage <= 1}
                    onClick={() => setBrowsePage((p) => Math.max(1, p - 1))}
                    className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-black text-slate-700 px-2">
                    {currentBrowsePage}
                  </span>
                  <button
                    disabled={currentBrowsePage >= totalBrowsePages}
                    onClick={() => setBrowsePage((p) => Math.min(totalBrowsePages, p + 1))}
                    className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Full-Page Footer with Quick Game Start */}
      <footer className="sticky bottom-0 z-20 border-t border-slate-200/90 bg-white shadow-lg shrink-0">
        <div className="max-w-7xl mx-auto p-3 sm:px-6 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>
              Đã nạp: <strong className="text-indigo-600 font-black">{selectedWordIds.length}</strong> từ
              <span className="text-slate-400 hidden sm:inline"> (Khuyến nghị: từ 6 từ trở lên)</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-200 transition cursor-pointer flex-1 sm:flex-initial"
            >
              ← Quay lại Game
            </button>

            {onStartGame && (
              <div className="flex items-center gap-1.5 flex-1 sm:flex-initial">
                <button
                  onClick={() => {
                    onClose();
                    onStartGame("memory");
                  }}
                  disabled={selectedWordIds.length === 0}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-black shadow-md shadow-indigo-600/25 transition cursor-pointer flex items-center gap-1.5 active:scale-95"
                >
                  <span>🎴 Lật Thẻ</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onStartGame("speed");
                  }}
                  disabled={selectedWordIds.length === 0}
                  className="px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white text-xs font-black shadow-md shadow-orange-500/25 transition cursor-pointer flex items-center gap-1.5 active:scale-95"
                >
                  <span>⚡ Bắt Từ</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onStartGame("tones");
                  }}
                  disabled={selectedWordIds.length === 0}
                  className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white text-xs font-black shadow-md shadow-sky-600/25 transition cursor-pointer flex items-center gap-1.5 active:scale-95"
                >
                  <span>🎵 Thanh Điệu</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </footer>

      {/* Success Toast */}
      {successToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700 text-xs font-bold animate-slideUp flex items-center gap-2">
          <span>{successToast}</span>
        </div>
      )}

      {/* Insufficient Gems Warning Modal */}
      {gemWarning?.show && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full shadow-2xl border border-rose-200 text-center space-y-4 animate-scaleUp">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-rose-500/25">
              <span className="text-2xl">💎</span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-slate-900">
                Không Đủ Kim Cương!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {gemWarning.message || `Cần ${gemWarning.requiredGems} 💎 để nạp từ vào game.`}
              </p>
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-left mt-2 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  Cách nhận thêm Kim Cương:
                </div>
                <ul className="list-disc list-inside text-[11px] text-amber-800 space-y-0.5">
                  <li>Online 10 phút nhận ngay 2 Điểm Sôi Nổi</li>
                  <li>10 Điểm Sôi Nổi đổi ra 10 Kim Cương 💎</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              {onOpenActivityModal && (
                <button
                  onClick={() => {
                    setGemWarning(null);
                    onOpenActivityModal();
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs sm:text-sm font-black shadow-md shadow-amber-500/25 transition cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Đổi Điểm Sôi Nổi Lấy Kim Cương</span>
                </button>
              )}
              <button
                onClick={() => setGemWarning(null)}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
              >
                Để sau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
