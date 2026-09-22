import React, { useState, useMemo } from "react";
import { 
  Search, 
  Volume2, 
  RotateCw, 
  Layers, 
  List, 
  Check, 
  Sparkles,
  Eye,
  EyeOff,
  Filter,
  Bookmark
} from "lucide-react";
import { HSKLevelId, WordItem, UserProgressData } from "../types";
import { getLevelExclusiveVocabulary, getVocabularyByLevel } from "../data/hskVocab";
import { normalizePinyin, normalizeVietnamese } from "../data/dictionaryService";
import { playChineseAudio } from "../services/speechService";
import { ScrollableTabs } from "./ScrollableTabs";

interface HskLevelVocabViewProps {
  level: HSKLevelId;
  userProgress?: UserProgressData;
  onToggleFavorite?: (wordId: string) => void;
  onMarkMastered?: (wordId: string) => void;
}

export const HskLevelVocabView: React.FC<HskLevelVocabViewProps> = ({
  level,
  userProgress,
  onToggleFavorite,
  onMarkMastered
}) => {
  const [viewMode, setViewMode] = useState<"list" | "flashcard">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPinyin, setShowPinyin] = useState(true);

  // Get words for this level
  const wordsForLevel = useMemo(() => {
    return getLevelExclusiveVocabulary(level);
  }, [level]);

  // Extract unique topics
  const topics = useMemo(() => {
    const set = new Set<string>();
    wordsForLevel.forEach((w) => {
      if (w.topic) set.add(w.topic);
    });
    return Array.from(set);
  }, [wordsForLevel]);

  // Filtered words
  const filteredWords = useMemo(() => {
    const qRaw = searchTerm.toLowerCase().trim();
    const qPinyinNorm = normalizePinyin(qRaw);
    const qVnNorm = normalizeVietnamese(qRaw);

    return wordsForLevel.filter((word) => {
      const matchTopic = selectedTopic === "all" || word.topic === selectedTopic;
      if (!matchTopic) return false;
      if (!qRaw) return true;

      const hanzi = word.hanzi;
      const pinyin = word.pinyin.toLowerCase();
      const pinyinNorm = normalizePinyin(word.pinyin);
      const vn = word.vietnamese.toLowerCase();
      const vnNorm = normalizeVietnamese(word.vietnamese);

      return (
        hanzi.includes(qRaw) ||
        pinyin.includes(qRaw) ||
        pinyinNorm.includes(qPinyinNorm) ||
        vn.includes(qRaw) ||
        vnNorm.includes(qVnNorm)
      );
    });
  }, [wordsForLevel, selectedTopic, searchTerm]);

  const currentFlashcard = filteredWords[flashcardIndex] || filteredWords[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % (filteredWords.length || 1));
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) =>
      prev === 0 ? Math.max(0, filteredWords.length - 1) : prev - 1
    );
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Control Header */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100">
                {level} Chuẩn
              </span>
              <h3 className="text-base font-bold text-slate-800">
                Kho từ vựng {level} ({filteredWords.length} / {wordsForLevel.length} từ)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tra cứu nhanh, phát âm giọng chuẩn và luyện nhớ qua Flashcard
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Danh sách</span>
              </button>
              <button
                onClick={() => setViewMode("flashcard")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === "flashcard"
                    ? "bg-white text-blue-600 shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Flashcard</span>
              </button>
            </div>

            <button
              onClick={() => setShowPinyin(!showPinyin)}
              className={`p-2 rounded-2xl border text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                showPinyin
                  ? "bg-blue-50 border-blue-200 text-blue-600"
                  : "bg-slate-50 border-slate-200 text-slate-500"
              }`}
              title={showPinyin ? "Ẩn Pinyin để thử thách trí nhớ" : "Hiện Pinyin"}
            >
              {showPinyin ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Search & Topic Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setFlashcardIndex(0);
              }}
              placeholder={`Tìm kiếm từ vựng ${level} (Hán tự, Pinyin, nghĩa tiếng Việt)...`}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-400 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Topic Pills */}
        {topics.length > 0 && (
          <ScrollableTabs hintText="Trượt xem chủ đề con" pillColor="blue" gap="gap-2">
            <button
              onClick={() => {
                setSelectedTopic("all");
                setFlashcardIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all border cursor-pointer ${
                selectedTopic === "all"
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300"
              }`}
            >
              Tất cả chủ đề ({wordsForLevel.length})
            </button>
            {topics.map((top) => {
              const count = wordsForLevel.filter((w) => w.topic === top).length;
              const isSelected = selectedTopic === top;
              return (
                <button
                  key={top}
                  onClick={() => {
                    setSelectedTopic(top);
                    setFlashcardIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300"
                  }`}
                >
                  {top} ({count})
                </button>
              );
            })}
          </ScrollableTabs>
        )}
      </div>

      {/* View 1: Flashcard Mode */}
      {viewMode === "flashcard" && (
        <div className="max-w-xl mx-auto space-y-4">
          {filteredWords.length > 0 && currentFlashcard ? (
            <>
              {/* Flashcard Card */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className={`relative min-h-[300px] p-8 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between items-center text-center shadow-md select-none ${
                  isFlipped
                    ? "bg-gradient-to-br from-indigo-50 via-white to-blue-50 border-blue-200 shadow-blue-100"
                    : "bg-white border-slate-200 hover:border-blue-300"
                }`}
              >
                {/* Card Top Indicator */}
                <div className="w-full flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 font-bold text-slate-600">
                    {flashcardIndex + 1} / {filteredWords.length}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <RotateCw className="w-3 h-3 animate-spin-slow" />
                    {isFlipped ? "Mặt sau: Nghĩa & Ví dụ" : "Mặt trước: Chữ Hán"}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-bold">
                    {currentFlashcard.topic}
                  </span>
                </div>

                {/* Card Main Body */}
                <div className="my-auto py-6 space-y-3">
                  {!isFlipped ? (
                    <>
                      <h2 className="text-5xl sm:text-6xl font-extrabold text-slate-800 tracking-wide">
                        {currentFlashcard.hanzi}
                      </h2>
                      {showPinyin && (
                        <p className="text-lg font-mono font-medium text-blue-600">
                          {currentFlashcard.pinyin}
                        </p>
                      )}
                      <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                        {currentFlashcard.partOfSpeech}
                      </span>
                    </>
                  ) : (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                          {currentFlashcard.vietnamese}
                        </h2>
                        <p className="text-sm font-mono font-bold text-blue-600 mt-1">
                          {currentFlashcard.pinyin} • {currentFlashcard.hanzi}
                        </p>
                      </div>

                      {currentFlashcard.exampleSentence && (
                        <div className="p-3.5 rounded-2xl bg-white border border-blue-100 shadow-xs text-left text-xs space-y-1">
                          <p className="font-bold text-slate-800 text-sm">
                            {currentFlashcard.exampleSentence.hanzi}
                          </p>
                          <p className="text-blue-600 font-mono">
                            {currentFlashcard.exampleSentence.pinyin}
                          </p>
                          <p className="text-slate-600 font-medium">
                            {currentFlashcard.exampleSentence.vietnamese}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Bottom Actions */}
                <div className="w-full flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playChineseAudio(currentFlashcard.hanzi, 1.0);
                    }}
                    className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors flex items-center gap-1.5 text-xs font-bold"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Nghe phát âm</span>
                  </button>

                  <span className="text-[11px] text-slate-400 italic">
                    Chạm để lật thẻ ↷
                  </span>
                </div>
              </div>

              {/* Flashcard Navigation */}
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={handlePrevCard}
                  className="flex-1 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors shadow-xs"
                >
                  ← Từ trước
                </button>
                <button
                  onClick={handleNextCard}
                  className="flex-1 py-3 rounded-2xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
                >
                  Từ tiếp theo →
                </button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-100 text-slate-400 text-xs">
              Không tìm thấy từ vựng phù hợp với bộ lọc
            </div>
          )}
        </div>
      )}

      {/* View 2: Detailed List Mode */}
      {viewMode === "list" && (
        <div className="space-y-3">
          {filteredWords.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredWords.map((word, idx) => (
                <div
                  key={word.id || `lvl_word_${idx}`}
                  className="p-4 rounded-3xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all flex flex-col justify-between gap-3 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {word.hanzi}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold">
                          {word.partOfSpeech}
                        </span>
                      </div>
                      {showPinyin && (
                        <p className="text-xs font-mono font-bold text-blue-600">
                          {word.pinyin}
                        </p>
                      )}
                      <p className="text-sm font-semibold text-slate-700">
                        {word.vietnamese}
                      </p>
                    </div>

                    <button
                      onClick={() => playChineseAudio(word.hanzi, 1.0)}
                      className="p-2.5 rounded-2xl bg-slate-50 text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-100 transition-colors shrink-0"
                      title="Phát âm chuẩn"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {word.exampleSentence && (
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-0.5">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-slate-800">
                          {word.exampleSentence.hanzi}
                        </p>
                        <button
                          onClick={() => playChineseAudio(word.exampleSentence!.hanzi, 0.95)}
                          className="p-1 text-slate-400 hover:text-blue-600"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-blue-600 font-mono text-[11px]">
                        {word.exampleSentence.pinyin}
                      </p>
                      <p className="text-slate-500 text-[11px]">
                        {word.exampleSentence.vietnamese}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-50">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50/70 text-blue-600 font-medium">
                      {word.topic}
                    </span>
                    <span className="font-mono text-[10px]">#{idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center bg-white rounded-3xl border border-slate-100 text-slate-500 text-xs">
              Không tìm thấy từ vựng nào khớp với từ khóa "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};
