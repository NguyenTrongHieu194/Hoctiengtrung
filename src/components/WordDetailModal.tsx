import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Volume2,
  Bookmark,
  Copy,
  Check,
  BookOpen,
  Languages,
  Sparkles,
  ChevronLeft,
  Share2,
  ExternalLink,
  Layers,
  ArrowRight,
  Gamepad2
} from "lucide-react";
import { CedictEntry, defineWordRemote, getEntryUniqueKey, isEntryFavorite } from "../data/dictionaryService";
import { playChineseAudio } from "../services/speechService";
import {
  isWordInGame,
  addWordToGameChargingDiamond,
  subscribeCustomGameVocab
} from "../services/customGameVocabService";
import { UserProfile } from "../types";

export interface WordDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: CedictEntry | null;
  onToggleFavorite?: (wordId: string) => void;
  favoriteWordIds?: string[];
  onSelectWord?: (word: string) => void;
  userProfile?: UserProfile;
  onUpdateProfile?: (updated: Partial<UserProfile>) => void;
  onNavigateToGame?: () => void;
}

export const WordDetailModal: React.FC<WordDetailModalProps> = ({
  isOpen,
  onClose,
  entry,
  onToggleFavorite,
  favoriteWordIds = [],
  onSelectWord,
  userProfile,
  onUpdateProfile,
  onNavigateToGame
}) => {
  // Internal navigation stack for sub-character lookups
  const [historyStack, setHistoryStack] = useState<CedictEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<CedictEntry | null>(entry);
  const [characterBreakdown, setCharacterBreakdown] = useState<
    { char: string; entries: CedictEntry[] }[]
  >([]);
  const [isLoadingBreakdown, setIsLoadingBreakdown] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<1.0 | 0.7>(1.0);
  const [copied, setCopied] = useState(false);
  const [isInGame, setIsInGame] = useState(false);
  const [gameToast, setGameToast] = useState<string | null>(null);

  // Check if word is in game
  useEffect(() => {
    if (currentEntry) {
      setIsInGame(isWordInGame(currentEntry.simp));
    }
    const unsub = subscribeCustomGameVocab(() => {
      if (currentEntry) {
        setIsInGame(isWordInGame(currentEntry.simp));
      }
    });
    return unsub;
  }, [currentEntry]);

  // Sync state when entry changes
  useEffect(() => {
    if (entry) {
      setCurrentEntry(entry);
      setHistoryStack([]);
    }
  }, [entry, isOpen]);

  // Load character breakdown whenever currentEntry changes
  useEffect(() => {
    if (!currentEntry || !isOpen) return;

    let isCancelled = false;
    const loadBreakdown = async () => {
      setIsLoadingBreakdown(true);
      try {
        const detail = await defineWordRemote(currentEntry.simp);
        if (!isCancelled) {
          setCharacterBreakdown(detail.characterBreakdown || []);
        }
      } catch (err) {
        console.warn("Failed to load character breakdown in modal:", err);
        if (!isCancelled) {
          setCharacterBreakdown([]);
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingBreakdown(false);
        }
      }
    };

    loadBreakdown();

    return () => {
      isCancelled = true;
    };
  }, [currentEntry, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !currentEntry) return null;

  const favKey = getEntryUniqueKey(currentEntry);
  const isFav = isEntryFavorite(currentEntry, favoriteWordIds);

  const handleToggleFav = () => {
    if (!onToggleFavorite) return;
    const existingKey =
      favoriteWordIds.find((id) => id === favKey) ||
      favoriteWordIds.find((id) => id === `cedict_${currentEntry.id}_${currentEntry.simp}`) ||
      favoriteWordIds.find((id) => id === `cedict_${currentEntry.id}`) ||
      favoriteWordIds.find((id) => id === `cedict_${currentEntry.simp}` || id === currentEntry.simp) ||
      favKey;
    onToggleFavorite(existingKey);
  };

  const handlePlayAudio = async (speedRate: number = audioSpeed) => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    await playChineseAudio(currentEntry.simp, speedRate);
    setIsPlayingAudio(false);
  };

  const handleCopyHanzi = () => {
    navigator.clipboard?.writeText(currentEntry.simp);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleInspectCharacter = (item: { char: string; entries: CedictEntry[] }) => {
    if (item.entries && item.entries.length > 0) {
      setHistoryStack((prev) => [...prev, currentEntry]);
      setCurrentEntry(item.entries[0]);
    } else if (onSelectWord) {
      onSelectWord(item.char);
      onClose();
    }
  };

  const handleGoBack = () => {
    if (historyStack.length > 0) {
      const prev = historyStack[historyStack.length - 1];
      setHistoryStack((stack) => stack.slice(0, stack.length - 1));
      setCurrentEntry(prev);
    }
  };

  const handleAddToGame = () => {
    if (!currentEntry) return;
    const res = addWordToGameChargingDiamond(currentEntry, userProfile, onUpdateProfile);
    setGameToast(res.message);
    setTimeout(() => setGameToast(null), 3000);
  };

  const modalContent = (
    <div
      id="word-detail-modal-overlay"
      className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="word-detail-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[calc(100dvh-1.5rem)] sm:max-h-[88vh] overflow-hidden my-auto shrink-0 animate-scaleUp transition-all"
      >
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-2">
            {historyStack.length > 0 ? (
              <button
                onClick={handleGoBack}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 p-1.5 -ml-1.5 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
                title="Quay lại từ trước"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Quay lại</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-500 uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Chi tiết từ vựng</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {onToggleFavorite && (
              <button
                id="btn-modal-favorite"
                onClick={handleToggleFav}
                title={isFav ? "Bỏ lưu từ này" : "Lưu vào sổ tay từ vựng"}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isFav
                    ? "bg-rose-50 text-rose-500 border-rose-200"
                    : "bg-slate-50 text-slate-400 border-slate-200 hover:text-rose-500 hover:bg-rose-50/50"
                }`}
              >
                <Bookmark className="w-4 h-4" fill={isFav ? "currentColor" : "none"} />
              </button>
            )}

            <button
              id="btn-modal-close"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Game Notification Banner */}
        {gameToast && (
          <div className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-bold flex items-center justify-between animate-fadeIn shrink-0 shadow-inner">
            <span className="flex items-center gap-1.5">
              <Gamepad2 className="w-4 h-4 text-amber-200" />
              {gameToast}
            </span>
            <button onClick={() => setGameToast(null)} className="text-white/80 hover:text-white p-1">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Modal Body - Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Main Word Header Card */}
          <div className="bg-linear-to-br from-blue-50/60 via-slate-50 to-indigo-50/40 rounded-3xl p-5 sm:p-6 border border-blue-100/80 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight select-all">
                    {currentEntry.simp}
                  </span>
                </div>

                {/* Pinyin and tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base sm:text-lg font-mono font-black text-blue-700 bg-white px-3 py-1 rounded-xl border border-blue-200 shadow-2xs">
                    {currentEntry.pinyin}
                  </span>

                  {/* Add to Game Button */}
                  {isInGame ? (
                    <button
                      onClick={() => {
                        if (onNavigateToGame) {
                          onClose();
                          onNavigateToGame();
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition cursor-pointer"
                      title="Từ này đã có trong Game luyện tập"
                    >
                      <Gamepad2 className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Đã có trong Game</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToGame}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold transition cursor-pointer shadow-2xs active:scale-95"
                      title="Nạp từ này vào Game ôn tập - Tiêu 1 kim cương"
                    >
                      <Gamepad2 className="w-3.5 h-3.5 text-amber-600" />
                      <span>Thêm vào Game để luyện</span>
                      <span className="bg-amber-200/90 text-amber-900 px-1.5 py-0.5 rounded-md text-[10px] font-black">1 💎</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  id="btn-modal-copy"
                  onClick={handleCopyHanzi}
                  className="p-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 shadow-2xs transition-all cursor-pointer"
                  title="Sao chép chữ Hán"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Audio Controls Bar */}
            <div className="pt-2 flex items-center gap-2 flex-wrap border-t border-blue-100/60">
              <button
                id="btn-modal-play-audio"
                onClick={() => handlePlayAudio(1.0)}
                disabled={isPlayingAudio}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                  isPlayingAudio
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 animate-pulse"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 active:scale-95"
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>Phát âm chuẩn (1.0x)</span>
              </button>

              <button
                id="btn-modal-play-slow"
                onClick={() => handlePlayAudio(0.7)}
                disabled={isPlayingAudio}
                className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 font-bold text-xs transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <Volume2 className="w-3.5 h-3.5 text-blue-500" />
                <span>Chậm (0.7x)</span>
              </button>
            </div>
          </div>

          {/* Âm Hán Việt (Sino-Vietnamese) */}
          {currentEntry.hanViet && (
            <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-4 flex items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-black text-emerald-700 uppercase tracking-wider block">
                  Âm Hán Việt
                </span>
                <span className="text-xl font-black text-emerald-950 capitalize">
                  {currentEntry.hanViet}
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-200">
                Gốc Hán - Việt
              </span>
            </div>
          )}

          {/* Nghĩa Tiếng Việt (CVDICT) */}
          <div className="space-y-2">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Nghĩa Tiếng Việt (CVDICT)</span>
            </h3>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2.5">
              <ol className="list-decimal list-inside space-y-2 text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
                {currentEntry.vietnamese.map((def, idx) => (
                  <li key={`modal_vdef_${idx}`} className="pl-1">
                    <span className="font-semibold text-slate-900">{def}</span>
                  </li>
                ))}
              </ol>

              {/* Lượng từ (Classifiers) */}
              {currentEntry.classifiers && currentEntry.classifiers.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                  <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                    Lượng từ:
                  </span>
                  <span className="font-medium text-slate-800 font-mono">
                    {currentEntry.classifiers.join("; ")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Chiết tự từng chữ Hán cấu thành từ (Character Breakdown) */}
          {characterBreakdown.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Chiết tự từng chữ Hán cấu thành từ</span>
                </h3>
                <span className="text-[11px] font-semibold text-blue-600">
                  Bấm để tra chữ
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {characterBreakdown.map((item, idx) => {
                  const primary = item.entries[0];
                  return (
                    <div
                      key={`modal_breakdown_${idx}_${item.char}`}
                      onClick={() => handleInspectCharacter(item)}
                      className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                          {item.char}
                        </span>
                        {primary && (
                          <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md">
                            {primary.pinyin}
                          </span>
                        )}
                      </div>
                      {primary?.hanViet && (
                        <p className="text-[11px] font-bold text-emerald-700 capitalize">
                          Hán Việt: {primary.hanViet}
                        </p>
                      )}
                      <p className="text-xs text-slate-600 line-clamp-1 font-medium">
                        {primary?.vietnamese.join(", ") || "(chưa có định nghĩa)"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span className="font-semibold flex items-center gap-1 text-slate-600">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Từ điển CC-CEDICT & Hán - Việt 122K+</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modalContent, document.body) : modalContent;
};
