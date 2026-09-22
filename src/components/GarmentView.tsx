import React, { useState } from "react";
import { 
  Scissors, 
  Building2, 
  Cog, 
  BarChart3, 
  Volume2, 
  MessageSquare, 
  BookOpen, 
  Search, 
  Sparkles, 
  Bookmark, 
  Play, 
  RotateCw,
  Check,
  ChevronRight,
  Mic,
  Lock,
  Crown
} from "lucide-react";
import { GARMENT_CATEGORIES, GARMENT_TERMS, GARMENT_DIALOGUES } from "../data/garmentData";
import { GarmentTerm, GarmentDialogue, UserProgressData, UserProfile } from "../types";
import { playChineseAudio } from "../services/speechService";
import { hasGarmentAccess, checkGarmentTopicLock } from "../services/subscriptionService";
import { LockedGateData } from "./LockedFeatureGateModal";
import { ScrollableTabs } from "./ScrollableTabs";

interface GarmentViewProps {
  userProfile?: UserProfile;
  userProgress: UserProgressData;
  onToggleFavorite: (wordId: string) => void;
  onOpenAITutor: () => void;
  onOpenLockedGate?: (data: LockedGateData) => void;
}

export const GarmentView: React.FC<GarmentViewProps> = ({
  userProfile,
  userProgress,
  onToggleFavorite,
  onOpenAITutor,
  onOpenLockedGate
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"terms" |"dialogues" |"flashcards">("terms");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDialogue, setSelectedDialogue] = useState<GarmentDialogue | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Filter terms
  const filteredTerms = GARMENT_TERMS.filter((term) => {
    const matchCat = selectedCategory ==="all" || term.industryCategory === selectedCategory;
    const matchSearch =
      !searchTerm.trim() ||
      term.hanzi.includes(searchTerm) ||
      term.pinyin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.vietnamese.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleNextFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % GARMENT_TERMS.length);
  };

  const handlePrevFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev === 0 ? GARMENT_TERMS.length - 1 : prev - 1));
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn w-full max-w-full overflow-hidden">
      {/* 1. Header Banner */}
      <div className="p-7 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white shadow-lg shadow-blue-500/15 relative overflow-hidden">
        <div className="absolute right-4 -bottom-4 text-white/10 font-extrabold text-9xl select-none pointer-events-none">
          缝
        </div>
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-white/20 backdrop-blur-md text-white">
              <Scissors className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full border border-white/30">
              Module Chuyên Ngành
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            Tiếng Trung Chuyên Ngành May Mặc
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
            Tổng hợp từ vựng xưởng may, tên máy móc, công đoạn sản xuất, bảng thông số kỹ thuật (Techpack) và hội thoại thực tế tại nhà máy.
          </p>
        </div>
      </div>

      {/* 2. Sub Navigation Tabs */}
      <ScrollableTabs hintText="Trượt xem 3 chế độ May mặc" pillColor="blue">
        <button
          onClick={() => setActiveSubTab("terms")}
          className={`py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0 border ${
            activeSubTab === "terms"
              ? "bg-white text-blue-600 shadow-sm border-blue-200 font-bold"
              : "bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-800"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Thuật ngữ ({GARMENT_TERMS.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab("dialogues")}
          className={`py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0 border ${
            activeSubTab === "dialogues"
              ? "bg-white text-blue-600 shadow-sm border-blue-200 font-bold"
              : "bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-800"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Hội thoại xưởng ({GARMENT_DIALOGUES.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab("flashcards")}
          className={`py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0 border ${
            activeSubTab === "flashcards"
              ? "bg-white text-blue-600 shadow-sm border-blue-200 font-bold"
              : "bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-800"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Flashcard May mặc</span>
        </button>
      </ScrollableTabs>

      {/* -------------------------------------------------------------
          TAB 1: THUẬT NGỮ & TỪ VỰNG CHUYÊN NGÀNH
          ------------------------------------------------------------- */}
      {activeSubTab ==="terms" && (
        <div className="space-y-5 animate-fadeIn">
          {/* Category Selector Pills */}
          <ScrollableTabs
            hintText="Trượt xem 8 nhóm ngành may"
            pillColor="blue"
            gap="gap-2.5"
          >
            <button
              onClick={() => setSelectedCategory("all")}
              className={`p-3 rounded-2xl text-left border transition-all cursor-pointer min-w-[130px] shrink-0 ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200 font-bold"
                  : "bg-white border-slate-200 text-slate-700 hover:border-blue-300"
              }`}
            >
              <span className="block text-xs font-bold">Tất cả nhóm từ</span>
              <span className={`text-[11px] block mt-0.5 ${selectedCategory === "all" ? "text-blue-100" : "text-slate-400"}`}>
                {GARMENT_TERMS.length} thuật ngữ
              </span>
            </button>

            {GARMENT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer min-w-[130px] shrink-0 ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200 font-bold"
                    : "bg-white border-slate-200 text-slate-700 hover:border-blue-300"
                }`}
              >
                <span className="block text-xs font-bold truncate">{cat.name}</span>
                <span className={`text-[11px] block truncate mt-0.5 ${selectedCategory === cat.id ? "text-blue-100" : "text-slate-400"}`}>
                  {cat.chineseName}
                </span>
              </button>
            ))}
          </ScrollableTabs>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm máy móc, chuyền may, công đoạn (VD: máy vắt sổ, 平缝机, 拷边)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white  text-slate-800  text-sm px-5 py-3.5 rounded-2xl border border-slate-100  focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-5 top-4" />
          </div>

          {/* Terms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map((term) => {
              const isFav = userProgress.favoriteWordIds.includes(term.id);

              return (
                <div
                  key={term.id}
                  className="p-5 rounded-3xl bg-white  border border-slate-100  hover:border-blue-200  transition-all shadow-sm flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-slate-800  tracking-wide">
                            {term.hanzi}
                          </span>
                          <span className="text-xs font-mono text-blue-700  bg-blue-50  px-2.5 py-0.5 rounded-lg font-bold border border-blue-100">
                            {term.pinyin}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-slate-700  mt-1.5">
                          {term.vietnamese}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => playChineseAudio(term.hanzi, 1.0)}
                          className="p-2 rounded-xl bg-slate-50  text-slate-600  hover:text-blue-600 hover:bg-blue-50 border border-slate-200  shadow-xs transition-colors cursor-pointer"
                          title="Phát âm"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onToggleFavorite(term.id)}
                          className={`p-2 rounded-xl border cursor-pointer ${
                            isFav
                              ?"bg-rose-50 text-rose-500 border-rose-200"
                              :"bg-slate-50  text-slate-400 border-slate-200"
                          } transition-colors`}
                          title="Lưu từ yêu thích"
                        >
                          <Bookmark className="w-4 h-4" fill={isFav ?"currentColor" :"none"} />
                        </button>
                      </div>
                    </div>

                    {term.commonUsage && (
                      <p className="text-xs text-slate-500  bg-slate-50  px-3 py-2 rounded-xl border border-slate-100  mt-2.5">
                        <strong className="text-blue-600">Ứng dụng:</strong> {term.commonUsage}
                      </p>
                    )}

                    {term.exampleSentence && (
                      <div className="mt-3 text-xs bg-blue-50/40  p-3 rounded-2xl border border-blue-100/60  space-y-1">
                        <p className="font-bold text-slate-800">
                          {term.exampleSentence.hanzi}
                        </p>
                        <p className="text-slate-400 font-mono">{term.exampleSentence.pinyin}</p>
                        <p className="text-emerald-600  font-medium">
                          {term.exampleSentence.vietnamese}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 2: HỘI THOẠI XƯỞNG MAY THỰC TẾ
          ------------------------------------------------------------- */}
      {activeSubTab ==="dialogues" && (
        <div className="space-y-5 animate-fadeIn">
          {selectedDialogue ? (
            /* Dialogue Detail Screen */
            <div className="bg-white  rounded-3xl p-6 border border-slate-100  shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <button
                  onClick={() => setSelectedDialogue(null)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800  flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100/80  cursor-pointer"
                >
                  ← Danh sách bài thoại
                </button>
                <button
                  onClick={() => {
                    const full = selectedDialogue.lines.map((l) => l.hanzi).join("");
                    playChineseAudio(full, 0.85);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-200  flex items-center gap-2 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" /> Nghe toàn bộ hội thoại
                </button>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  {selectedDialogue.title}
                </h3>
                <p className="text-xs text-blue-600  font-semibold mt-1">
                  👥 {selectedDialogue.participants}
                </p>
                <p className="text-xs text-slate-500 mt-1">{selectedDialogue.situation}</p>
              </div>

              {/* Dialogue lines */}
              <div className="space-y-3.5">
                {selectedDialogue.lines.map((line, idx) => (
                  <div
                    key={idx}
                    className="p-4.5 rounded-2xl bg-slate-50/80  border border-slate-100  flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-blue-100  text-blue-800  text-xs font-bold">
                          {line.speaker}
                        </span>
                        <span className="text-[11px] text-slate-400">{line.role}</span>
                      </div>
                      <p className="text-base font-bold text-slate-800  pt-1">
                        {line.hanzi}
                      </p>
                      <p className="text-xs font-mono text-blue-600">{line.pinyin}</p>
                      <p className="text-xs text-emerald-600  font-medium">
                        {line.vietnamese}
                      </p>
                    </div>

                    <button
                      onClick={() => playChineseAudio(line.hanzi, 0.9)}
                      className="p-2 rounded-xl bg-white  text-slate-600  hover:text-blue-600 shadow-xs border border-slate-200  shrink-0 cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Roleplay with AI Button */}
              <div className="p-4.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50   border border-blue-100  flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    Luyện đóng vai tình huống này với AI
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Bạn đóng vai công nhân/tổ trưởng, AI đóng vai Quản lý xưởng Trung Quốc
                  </p>
                </div>
                <button
                  onClick={onOpenAITutor}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-200  flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Mic className="w-4 h-4" /> Vào luyện nói
                </button>
              </div>
            </div>
          ) : (
            /* Dialogue List Screen */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GARMENT_DIALOGUES.map((dlg, idx) => {
                const lockStatus = checkGarmentTopicLock(idx, dlg.id, userProfile);

                const handleDialogueClick = () => {
                  if (lockStatus.isLocked) {
                    onOpenLockedGate?.({
                      type: "garment_topic",
                      id: dlg.id,
                      title: dlg.title,
                      subtitle: dlg.situation,
                      gemCost: lockStatus.gemUnlockCost || 120,
                      previewSummary: [
                        `Tình huống thực tế xưởng: ${dlg.situation}`,
                        `Đóng vai phản xạ cùng AI Thầy giáo bản ngữ`,
                        `${dlg.lines.length} câu thoại chuyên ngành may mẫu`
                      ]
                    });
                  } else {
                    setSelectedDialogue(dlg);
                  }
                };

                return (
                  <div
                    key={dlg.id}
                    onClick={handleDialogueClick}
                    className={`p-6 rounded-3xl transition-all cursor-pointer shadow-sm group flex flex-col justify-between border ${
                      lockStatus.isLocked
                        ? "bg-slate-50/70 border-slate-200 hover:border-amber-300"
                        : "bg-white border-slate-100 hover:border-blue-200"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
                          <MessageSquare className="w-4 h-4" />
                          <span>{dlg.participants}</span>
                        </div>
                        {lockStatus.isLocked && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200">
                            <Lock className="w-3 h-3 text-amber-600" /> VIP / 120 💎
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {dlg.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {dlg.situation}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                      {lockStatus.isLocked ? (
                        <span className="text-amber-600 flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5" /> Mở khóa hội thoại
                        </span>
                      ) : (
                        <span className="text-blue-600">Xem {dlg.lines.length} câu thoại →</span>
                      )}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-slate-400 group-hover:text-blue-600" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 3: FLASHCARD CHUYÊN NGÀNH MAY MẶC
          ------------------------------------------------------------- */}
      {activeSubTab ==="flashcards" && (
        <div className="max-w-md mx-auto space-y-5 animate-fadeIn">
          {(() => {
            const currentTerm = GARMENT_TERMS[flashcardIndex];
            return (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-2">
                  <span>
                    Thẻ {flashcardIndex + 1} / {GARMENT_TERMS.length}
                  </span>
                  <span className="text-blue-600">{currentTerm.industryCategory}</span>
                </div>

                {/* 3D Flip Card */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full min-h-[300px] bg-white  rounded-3xl p-7 border border-blue-100  shadow-md flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all hover:scale-[1.01]"
                >
                  {!isFlipped ? (
                    /* Front side */
                    <div className="space-y-3">
                      <span className="text-4xl font-extrabold text-slate-800  tracking-wide block">
                        {currentTerm.hanzi}
                      </span>
                      <span className="text-base font-mono text-blue-600  font-semibold block">
                        {currentTerm.pinyin}
                      </span>
                      <p className="text-xs text-slate-400 pt-4">👆 Chạm để lật xem nghĩa tiếng Việt</p>
                    </div>
                  ) : (
                    /* Back side */
                    <div className="space-y-3 animate-fadeIn">
                      <h4 className="text-xl font-bold text-slate-800">
                        {currentTerm.vietnamese}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {currentTerm.commonUsage}
                      </p>
                      {currentTerm.exampleSentence && (
                        <div className="mt-3 text-xs bg-slate-50  p-3 rounded-2xl text-left border border-slate-100">
                          <p className="font-bold text-slate-800">
                            {currentTerm.exampleSentence.hanzi}
                          </p>
                          <p className="text-slate-400">{currentTerm.exampleSentence.pinyin}</p>
                          <p className="text-emerald-600  font-medium">
                            {currentTerm.exampleSentence.vietnamese}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Controls */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    onClick={handlePrevFlashcard}
                    className="px-4 py-3 rounded-2xl bg-white  border border-slate-100  text-xs font-bold text-slate-700  shadow-xs cursor-pointer"
                  >
                    ← Thẻ trước
                  </button>

                  <button
                    onClick={() => playChineseAudio(currentTerm.hanzi, 1.0)}
                    className="p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-200  cursor-pointer"
                    title="Phát âm"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNextFlashcard}
                    className="px-4 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-200  cursor-pointer"
                  >
                    Thẻ tiếp theo →
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
