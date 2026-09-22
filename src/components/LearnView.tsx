import React, { useState } from "react";
import { 
  CheckCircle2, 
  Circle, 
  Play, 
  Volume2, 
  BookOpen, 
  Award, 
  HelpCircle, 
  ArrowLeft, 
  Check, 
  Sparkles,
  Layers,
  ChevronRight,
  RotateCcw,
  CheckCircle,
  FileText,
  Lock,
  Crown
} from "lucide-react";
import confetti from "canvas-confetti";
import { HSK_LEVELS, HSK_LESSONS_BY_LEVEL, PLACEMENT_TEST_QUESTIONS } from "../data/hskData";
import { GARMENT_TERMS } from "../data/garmentData";
import { Lesson, HSKLevelId, QuizQuestion, UserProgressData, UserProfile } from "../types";
import { playChineseAudio } from "../services/speechService";
import { checkLessonLock } from "../services/subscriptionService";
import { LockedGateData } from "./LockedFeatureGateModal";
import { ScrollableTabs } from "./ScrollableTabs";
import { HskLevelVocabView } from "./HskLevelVocabView";
import { HskLevelGrammarView } from "./HskLevelGrammarView";
import { getLevelExclusiveVocabulary } from "../data/hskVocab";
import { getLessonVocabList } from "../data/lessonVocabulary";

interface LearnViewProps {
  userProfile?: UserProfile;
  userProgress: UserProgressData;
  onCompleteLesson: (lessonId: string, score: number) => void;
  activeLessonModal: Lesson | null;
  onCloseLessonModal: () => void;
  onOpenLesson: (lesson: Lesson) => void;
  onOpenLockedGate?: (data: LockedGateData) => void;
  isPlacementTestOpen: boolean;
  onClosePlacementTest: () => void;
  onSetLevel: (level: HSKLevelId) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  userProfile,
  userProgress,
  onCompleteLesson,
  activeLessonModal,
  onCloseLessonModal,
  onOpenLesson,
  onOpenLockedGate,
  isPlacementTestOpen,
  onClosePlacementTest,
  onSetLevel
}) => {
  const [selectedHskTab, setSelectedHskTab] = useState<HSKLevelId>("HSK1");
  const [levelSubTab, setLevelSubTab] = useState<"lessons" | "vocab" | "grammar">("lessons");
  const [lessonActiveSection, setLessonActiveSection] = useState<"vocab" | "grammar" | "dialogue" | "reading" | "quiz">("vocab");
  
  // Placement test state
  const [testCurrentIndex, setTestCurrentIndex] = useState(0);
  const [testAnswers, setTestAnswers] = useState<{ [qId: string]: string }>({});
  const [testReorderIndices, setTestReorderIndices] = useState<{ [qId: string]: number[] }>({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [testScore, setTestScore] = useState(0);

  // Lesson Quiz state
  const [quizAnswers, setQuizAnswers] = useState<{ [qId: string]: string }>({});
  const [quizReorderIndices, setQuizReorderIndices] = useState<{ [qId: string]: number[] }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const handleResetPlacementTest = () => {
    setTestCurrentIndex(0);
    setTestAnswers({});
    setTestReorderIndices({});
    setTestCompleted(false);
    setTestScore(0);
  };

  const handleClosePlacementTestModal = () => {
    handleResetPlacementTest();
    onClosePlacementTest();
  };

  // Handle lesson quiz submission
  const handleSubmitQuiz = (lesson: Lesson) => {
    let correctCount = 0;
    lesson.quizQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / lesson.quizQuestions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    if (score >= 70) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      onCompleteLesson(lesson.id, score);
    }
  };

  // Handle placement test submission
  const handleSubmitPlacementTest = () => {
    let correctCount = 0;
    PLACEMENT_TEST_QUESTIONS.forEach((q) => {
      if (testAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / PLACEMENT_TEST_QUESTIONS.length) * 100);
    setTestScore(score);
    setTestCompleted(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (score >= 80) {
      onSetLevel("HSK2");
    } else {
      onSetLevel("HSK1");
    }
  };

  // -------------------------------------------------------------
  // PLACEMENT TEST MODAL VIEW
  // -------------------------------------------------------------
  if (isPlacementTestOpen) {
    return (
      <div className="max-w-2xl mx-auto p-4 animate-fadeIn">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleClosePlacementTestModal}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                title="Đóng bài kiểm tra"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="font-bold text-slate-800 text-lg">
                  Bài Kiểm Tra Đầu Vào
                </h2>
                <p className="text-xs text-slate-500">Đánh giá nhanh trình độ HSK & May mặc</p>
              </div>
            </div>
            <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              {testCurrentIndex + 1} / {PLACEMENT_TEST_QUESTIONS.length}
            </span>
          </div>

          {!testCompleted ? (
            <div className="space-y-6">
              {/* Question card */}
              {(() => {
                const q = PLACEMENT_TEST_QUESTIONS[testCurrentIndex];
                const isReorder = q.type === "sentence_reorder" || (Boolean(q.words && q.words.length > 0 && !q.options));
                const reorderIndices = testReorderIndices[q.id] || [];

                return (
                  <div key={q.id} className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-sky-600 font-bold">
                          Câu {testCurrentIndex + 1}:
                        </p>
                        {isReorder && (
                          <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                            Sắp xếp câu
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-800">
                        {q.question}
                      </h3>
                      {isReorder && (
                        <p className="text-xs text-slate-500 mt-1">
                          Chạm vào các từ bên dưới theo đúng thứ tự để tạo thành câu hoàn chỉnh:
                        </p>
                      )}
                    </div>

                    {/* Interactive Sentence Reorder Interface */}
                    {isReorder && q.words && (
                      <div className="space-y-3.5">
                        {/* Assembled sentence staging area */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs px-1">
                            <span className="font-semibold text-slate-700">Câu bạn đang ghép:</span>
                            {reorderIndices.length > 0 && (
                              <div className="flex items-center gap-2">
                                {testAnswers[q.id] && (
                                  <button
                                    type="button"
                                    onClick={() => playChineseAudio(testAnswers[q.id], 0.9)}
                                    className="inline-flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700 font-medium px-2 py-0.5 rounded-lg hover:bg-sky-50 transition cursor-pointer"
                                    title="Nghe phát âm câu vừa ghép"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                    <span>Nghe câu</span>
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setTestReorderIndices((prev) => ({ ...prev, [q.id]: [] }));
                                    setTestAnswers((prev) => ({ ...prev, [q.id]: "" }));
                                  }}
                                  className="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 font-medium px-2 py-0.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                  <span>Đặt lại</span>
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border-2 border-dashed border-sky-300 min-h-[64px] flex items-center flex-wrap gap-2 transition-all shadow-inner">
                            {reorderIndices.length === 0 ? (
                              <span className="text-xs sm:text-sm text-slate-400 italic flex items-center gap-1.5 py-1">
                                <span>👉</span> Chạm vào các từ bên dưới để xếp vào đây...
                              </span>
                            ) : (
                              reorderIndices.map((wordIdx, pos) => {
                                const word = q.words?.[wordIdx] || "";
                                return (
                                  <button
                                    key={`${pos}-${wordIdx}`}
                                    type="button"
                                    onClick={() => {
                                      const nextIndices = reorderIndices.filter((_, i) => i !== pos);
                                      setTestReorderIndices((prev) => ({ ...prev, [q.id]: nextIndices }));
                                      const newSentence = nextIndices.map((i) => q.words![i]).join("");
                                      setTestAnswers((prev) => ({ ...prev, [q.id]: newSentence }));
                                    }}
                                    className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-rose-500 text-white font-black text-sm shadow-xs transition-all flex items-center gap-1.5 active:scale-95 group cursor-pointer"
                                    title="Chạm để gỡ từ này ra khỏi câu"
                                  >
                                    <span>{word}</span>
                                    <span className="text-xs text-sky-200 group-hover:text-white transition font-bold">✕</span>
                                  </button>
                                );
                              })
                            )}
                          </div>
                        </div>

                        {/* Available Word Bank */}
                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between text-xs px-1">
                            <span className="font-semibold text-slate-700">Kho từ vựng (chạm để chọn):</span>
                            <span className="text-[11px] text-slate-500">
                              Đã chọn: <strong className="text-sky-600 font-bold">{reorderIndices.length}/{q.words.length}</strong> từ
                            </span>
                          </div>

                          <div className="flex items-center flex-wrap gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                            {q.words.map((word, wordIdx) => {
                              const isUsed = reorderIndices.includes(wordIdx);
                              return (
                                <button
                                  key={wordIdx}
                                  type="button"
                                  disabled={isUsed}
                                  onClick={() => {
                                    const nextIndices = [...reorderIndices, wordIdx];
                                    setTestReorderIndices((prev) => ({ ...prev, [q.id]: nextIndices }));
                                    const newSentence = nextIndices.map((i) => q.words![i]).join("");
                                    setTestAnswers((prev) => ({ ...prev, [q.id]: newSentence }));
                                    playChineseAudio(word, 1.0);
                                  }}
                                  className={`px-4 py-2.5 rounded-2xl text-base font-black transition-all flex items-center gap-1.5 ${
                                    isUsed
                                      ? "opacity-35 bg-slate-200 border-2 border-slate-300 text-slate-400 cursor-not-allowed line-through scale-95"
                                      : "bg-white border-2 border-slate-200 text-slate-800 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-700 active:scale-95 shadow-xs cursor-pointer"
                                  }`}
                                >
                                  <span>{word}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Standard Options */}
                    {!isReorder && q.options && (
                      <div className="space-y-2.5">
                        {q.options.map((opt) => {
                          const isSelected = testAnswers[q.id] === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setTestAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                              className={`w-full p-4 rounded-2xl text-left text-sm font-medium transition-all flex items-center justify-between border cursor-pointer ${
                                isSelected
                                  ? "bg-sky-50 border-sky-500 text-sky-700 font-bold shadow-xs"
                                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                              }`}
                            >
                              <span>{opt}</span>
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                  isSelected
                                    ? "border-sky-500 bg-sky-500 text-white"
                                    : "border-slate-300"
                                }`}
                              >
                                {isSelected && <Check className="w-3.5 h-3.5" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  disabled={testCurrentIndex === 0}
                  onClick={() => setTestCurrentIndex((prev) => prev - 1)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold disabled:opacity-40 hover:bg-slate-50 transition cursor-pointer"
                >
                  ← Câu trước
                </button>

                {testCurrentIndex < PLACEMENT_TEST_QUESTIONS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setTestCurrentIndex((prev) => prev + 1)}
                    className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md shadow-sky-500/20 transition cursor-pointer"
                  >
                    Câu tiếp theo →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitPlacementTest}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition cursor-pointer"
                  >
                    Nộp bài đánh giá ✓
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div className="py-6 space-y-5 animate-fadeIn">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  Chúc mừng bạn đã hoàn thành bài Test!
                </h3>
                <p className="text-sm text-slate-500">
                  Điểm số của bạn: <strong className="text-emerald-500 text-lg">{testScore}%</strong>
                </p>
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sm text-sky-800 max-w-lg mx-auto">
                  {testScore >= 80
                    ? "🎉 Trình độ đề xuất: HSK 2! Bạn có nền tảng từ vựng và ngữ pháp khá tốt."
                    : "💡 Trình độ đề xuất: HSK 1! Bắt đầu rèn luyện từ vựng, phát âm Pinyin và câu cơ bản."}
                </div>
              </div>

              {/* Detailed review of answers */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Chi tiết kết quả các câu hỏi:
                </h4>
                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {PLACEMENT_TEST_QUESTIONS.map((q, idx) => {
                    const isCorrect = testAnswers[q.id] === q.correctAnswer;
                    const userAnswer = testAnswers[q.id] || "(Chưa trả lời)";
                    return (
                      <div
                        key={q.id}
                        className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                          isCorrect
                            ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                            : "bg-rose-50/70 border-rose-200 text-rose-950"
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span>Câu {idx + 1}: {q.question}</span>
                          <span className={isCorrect ? "text-emerald-600 font-black" : "text-rose-600 font-black"}>
                            {isCorrect ? "✓ Đúng" : "✗ Chưa đúng"}
                          </span>
                        </div>
                        <p className="text-slate-700">
                          Bạn chọn: <strong className="font-bold">{userAnswer}</strong>
                          {!isCorrect && (
                            <>
                              {" "}• Đáp án chuẩn:{" "}
                              <strong className="text-emerald-700 font-bold">{q.correctAnswer}</strong>
                            </>
                          )}
                        </p>
                        {q.explanation && (
                          <p className="text-slate-500 italic text-[11px] border-t border-slate-200/60 pt-1 mt-1">
                            {q.explanation}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetPlacementTest}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold inline-flex items-center gap-1.5 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại bài test</span>
                </button>
                <button
                  type="button"
                  onClick={handleClosePlacementTestModal}
                  className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md shadow-sky-500/25 transition cursor-pointer"
                >
                  Bắt đầu học ngay →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // ACTIVE LESSON MODAL VIEW
  // -------------------------------------------------------------
  if (activeLessonModal) {
    const isCompleted = userProgress.completedLessonIds.includes(activeLessonModal.id);

    return (
      <div className="max-w-3xl mx-auto p-4 animate-fadeIn pb-24">
        <div className="bg-white  rounded-3xl p-5 sm:p-7 border border-slate-200  shadow-xl space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <button
                onClick={onCloseLessonModal}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <span className="text-xs font-bold text-sky-600 bg-sky-50  px-2.5 py-0.5 rounded-full">
                  {activeLessonModal.hskLevel} - Bài {activeLessonModal.lessonNumber}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-800  mt-1">
                  {activeLessonModal.title}
                </h2>
              </div>
            </div>

            {isCompleted && (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50  px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" /> Đã hoàn thành
              </span>
            )}
          </div>

          {/* Section Navigation Tabs */}
          {(() => {
            const currentLessonVocab = getLessonVocabList(activeLessonModal);
            return (
              <>
                <div className={`grid ${activeLessonModal.readingPassage ? "grid-cols-5" : "grid-cols-4"} gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold`}>
                  <button
                    onClick={() => setLessonActiveSection("vocab")}
                    className={`py-2 rounded-xl transition-all ${
                      lessonActiveSection === "vocab"
                        ? "bg-white text-sky-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Từ vựng ({currentLessonVocab.length})
                  </button>
                  <button
                    onClick={() => setLessonActiveSection("grammar")}
                    className={`py-2 rounded-xl transition-all ${
                      lessonActiveSection === "grammar"
                        ? "bg-white text-sky-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Ngữ pháp ({activeLessonModal.grammarPoints.length})
                  </button>
                  <button
                    onClick={() => setLessonActiveSection("dialogue")}
                    className={`py-2 rounded-xl transition-all ${
                      lessonActiveSection === "dialogue"
                        ? "bg-white text-sky-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Hội thoại
                  </button>
                  {activeLessonModal.readingPassage && (
                    <button
                      onClick={() => setLessonActiveSection("reading")}
                      className={`py-2 rounded-xl transition-all ${
                        lessonActiveSection === "reading"
                          ? "bg-white text-sky-600 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      Bài đọc
                    </button>
                  )}
                  <button
                    onClick={() => setLessonActiveSection("quiz")}
                    className={`py-2 rounded-xl transition-all ${
                      lessonActiveSection === "quiz"
                        ? "bg-white text-sky-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Kiểm tra ({activeLessonModal.quizQuestions.length})
                  </button>
                </div>

                {/* Section 1: Vocabulary */}
                {lessonActiveSection === "vocab" && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-700">
                        Từ vựng trọng tâm trong bài ({currentLessonVocab.length} từ):
                      </h3>
                      <span className="text-xs text-slate-400">Nhấn loa để nghe phát âm chuẩn</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentLessonVocab.map((word, vIndex) => {
                        return (
                          <div
                            key={`${word.id || 'vocab'}-${vIndex}`}
                            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-2 group hover:border-sky-300 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xl font-bold text-slate-800 font-serif">
                                  {word.hanzi}
                                </span>
                                {word.partOfSpeech && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-sky-100 text-sky-700 font-medium">
                                    {word.partOfSpeech}
                                  </span>
                                )}
                              </div>
                              <span className="block text-xs font-mono text-sky-600 font-semibold mt-0.5">
                                {word.pinyin}
                              </span>
                              <p className="text-xs text-slate-700 mt-1 font-medium leading-relaxed">
                                {word.vietnamese}
                              </p>
                              {word.exampleSentence && (
                                <div className="mt-2 pt-2 border-t border-slate-200/60 text-[11px]">
                                  <span className="text-slate-800 font-medium">{word.exampleSentence.hanzi}</span>
                                  <span className="text-slate-400 block text-[10px] font-mono">{word.exampleSentence.pinyin}</span>
                                  <span className="text-slate-500 block text-[10px]">{word.exampleSentence.vietnamese}</span>
                                </div>
                              )}
                            </div>

                            <button
                              onClick={() => playChineseAudio(word.hanzi, 1.0)}
                              className="p-2 rounded-xl bg-white text-slate-600 hover:text-sky-600 hover:bg-sky-50 border border-slate-200 shadow-sm shrink-0 transition-transform active:scale-95"
                              title="Phát âm tiếng Trung"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            );
          })()}

          {/* Section 2: Grammar */}
          {lessonActiveSection ==="grammar" && (
            <div className="space-y-4 animate-fadeIn">
              {activeLessonModal.grammarPoints.map((gp, idx) => (
                <div
                  key={gp.id}
                  className="p-4 rounded-2xl bg-slate-50  border border-slate-200/80  space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-slate-800  text-sm sm:text-base">
                      {gp.title}
                    </h4>
                  </div>

                  <div className="p-3 rounded-xl bg-white  border border-sky-200/60  text-xs">
                    <span className="text-slate-400 font-medium">Cấu trúc: </span>
                    <span className="font-bold text-sky-600  font-mono">
                      {gp.structure}
                    </span>
                    <p className="text-slate-600  mt-1">{gp.explanation}</p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <p className="text-xs font-bold text-slate-500">Ví dụ minh họa:</p>
                    {gp.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-white  border border-slate-100  flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-bold text-slate-800">{ex.hanzi}</p>
                          <p className="text-slate-400 font-mono">{ex.pinyin}</p>
                          <p className="text-emerald-600  font-medium">
                            {ex.vietnamese}
                          </p>
                        </div>
                        <button
                          onClick={() => playChineseAudio(ex.hanzi, 1.0)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Section 3: Dialogue */}
          {lessonActiveSection ==="dialogue" && activeLessonModal.dialogue && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-700">
                  Hội thoại mẫu:
                </h3>
                <button
                  onClick={() => {
                    const fullText = activeLessonModal.dialogue?.map((d) => d.hanzi).join("");
                    if (fullText) playChineseAudio(fullText, 0.9);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-sky-50  text-sky-600  border border-sky-200  text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Volume2 className="w-4 h-4" /> Nghe toàn bài hội thoại
                </button>
              </div>

              <div className="space-y-3">
                {activeLessonModal.dialogue.map((line, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50  border border-slate-200/80  flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-800  px-2 py-0.5 bg-white  rounded-md border border-slate-200">
                          {line.speaker}
                        </span>
                        <span className="text-[11px] text-slate-400">{line.role}</span>
                      </div>
                      <p className="text-base font-bold text-slate-800  mt-1">
                        {line.hanzi}
                      </p>
                      <p className="text-xs font-mono text-sky-600  mt-0.5">
                        {line.pinyin}
                      </p>
                      <p className="text-xs text-emerald-600  mt-1 font-medium">
                        {line.vietnamese}
                      </p>
                    </div>

                    <button
                      onClick={() => playChineseAudio(line.hanzi, 1.0)}
                      className="p-2 rounded-xl bg-white  text-slate-600  hover:text-sky-600 shadow-sm border border-slate-200"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Reading Passage */}
          {lessonActiveSection === "reading" && activeLessonModal.readingPassage && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-sky-600" />
                  <h3 className="text-sm font-bold text-slate-800">
                    {activeLessonModal.readingPassage.title}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    const text = activeLessonModal.readingPassage?.contentHanzi;
                    if (text) playChineseAudio(text, 0.9);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-200 text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-sky-100 transition-colors"
                >
                  <Volume2 className="w-4 h-4" /> Nghe toàn bộ bài đọc
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Văn bản chữ Hán:
                  </h4>
                  <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed">
                    {activeLessonModal.readingPassage.contentHanzi}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Phiên âm Pinyin:
                  </h4>
                  <p className="text-xs sm:text-sm font-mono text-sky-600 leading-relaxed">
                    {activeLessonModal.readingPassage.contentPinyin}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Dịch nghĩa tiếng Việt:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {activeLessonModal.readingPassage.contentVietnamese}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Quiz */}
          {lessonActiveSection === "quiz" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-4">
                {activeLessonModal.quizQuestions.map((q, idx) => {
                  const isAnswered = quizAnswers[q.id] !== undefined;
                  const isCorrect = quizAnswers[q.id] === q.correctAnswer;
                  const isReorder = q.type === "sentence_reorder" || (Boolean(q.words && q.words.length > 0 && !q.options));
                  const reorderIndices = quizReorderIndices[q.id] || [];

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-sky-600">Câu hỏi {idx + 1}</span>
                        {isReorder && (
                          <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                            Sắp xếp câu
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">
                        {q.question}
                      </h4>

                      {/* Interactive Sentence Reorder for Quiz */}
                      {isReorder && q.words && (
                        <div className="space-y-3 pt-1">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs px-1">
                              <span className="font-semibold text-slate-700">Câu bạn đang ghép:</span>
                              {reorderIndices.length > 0 && !quizSubmitted && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setQuizReorderIndices((prev) => ({ ...prev, [q.id]: [] }));
                                    setQuizAnswers((prev) => ({ ...prev, [q.id]: "" }));
                                  }}
                                  className="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 font-medium px-2 py-0.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                  <span>Đặt lại</span>
                                </button>
                              )}
                            </div>

                            <div className="p-3 rounded-xl bg-white border-2 border-dashed border-sky-300 min-h-[52px] flex items-center flex-wrap gap-2 transition-all shadow-inner">
                              {reorderIndices.length === 0 ? (
                                <span className="text-xs text-slate-400 italic">
                                  👉 Chạm vào các từ bên dưới để xếp vào đây...
                                </span>
                              ) : (
                                reorderIndices.map((wordIdx, pos) => {
                                  const word = q.words?.[wordIdx] || "";
                                  return (
                                    <button
                                      key={`${pos}-${wordIdx}`}
                                      type="button"
                                      disabled={quizSubmitted}
                                      onClick={() => {
                                        if (quizSubmitted) return;
                                        const nextIndices = reorderIndices.filter((_, i) => i !== pos);
                                        setQuizReorderIndices((prev) => ({ ...prev, [q.id]: nextIndices }));
                                        const newSentence = nextIndices.map((i) => q.words![i]).join("");
                                        setQuizAnswers((prev) => ({ ...prev, [q.id]: newSentence }));
                                      }}
                                      className="px-3 py-1.5 rounded-xl bg-sky-500 hover:bg-rose-500 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1 active:scale-95 group cursor-pointer disabled:pointer-events-none"
                                      title={quizSubmitted ? undefined : "Chạm để gỡ từ này"}
                                    >
                                      <span>{word}</span>
                                      {!quizSubmitted && (
                                        <span className="text-[10px] text-sky-200 group-hover:text-white transition font-bold">✕</span>
                                      )}
                                    </button>
                                  );
                                })
                              )}
                            </div>
                          </div>

                          {!quizSubmitted && (
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between text-xs px-1">
                                <span className="font-semibold text-slate-700">Kho từ vựng:</span>
                                <span className="text-[11px] text-slate-500">
                                  {reorderIndices.length}/{q.words.length} từ
                                </span>
                              </div>
                              <div className="flex items-center flex-wrap gap-2 p-2.5 rounded-xl bg-white border border-slate-200">
                                {q.words.map((word, wordIdx) => {
                                  const isUsed = reorderIndices.includes(wordIdx);
                                  return (
                                    <button
                                      key={wordIdx}
                                      type="button"
                                      disabled={isUsed || quizSubmitted}
                                      onClick={() => {
                                        const nextIndices = [...reorderIndices, wordIdx];
                                        setQuizReorderIndices((prev) => ({ ...prev, [q.id]: nextIndices }));
                                        const newSentence = nextIndices.map((i) => q.words![i]).join("");
                                        setQuizAnswers((prev) => ({ ...prev, [q.id]: newSentence }));
                                        playChineseAudio(word, 1.0);
                                      }}
                                      className={`px-3 py-1.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1 ${
                                        isUsed
                                          ? "opacity-35 bg-slate-200 border border-slate-300 text-slate-400 cursor-not-allowed line-through"
                                          : "bg-white border border-slate-200 text-slate-800 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-700 active:scale-95 shadow-xs cursor-pointer"
                                      }`}
                                    >
                                      <span>{word}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Multiple choice options */}
                      {!isReorder && q.options && (
                        <div className="space-y-2">
                          {q.options.map((opt) => {
                            const isSelected = quizAnswers[q.id] === opt;
                            return (
                              <button
                                key={opt}
                                disabled={quizSubmitted}
                                onClick={() =>
                                  setQuizAnswers((prev) => ({ ...prev, [q.id]: opt }))
                                }
                                className={`w-full p-3 rounded-xl text-left text-xs font-medium transition-all flex items-center justify-between border ${
                                  isSelected
                                    ?"bg-sky-50  border-sky-500 text-sky-700 font-bold"
                                    :"bg-white  border-slate-200  text-slate-700"
                                }`}
                              >
                                <span>{opt}</span>
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                    isSelected
                                      ?"border-sky-500 bg-sky-500 text-white"
                                      :"border-slate-300"
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {quizSubmitted && (
                        <div
                          className={`p-3 rounded-xl text-xs ${
                            isCorrect
                              ?"bg-emerald-50  text-emerald-800  border border-emerald-200"
                              :"bg-rose-50  text-rose-800  border border-rose-200"
                          }`}
                        >
                          <strong>{isCorrect ?"✓ Chính xác!" :"✗ Chưa đúng."}</strong>{""}
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={() => handleSubmitQuiz(activeLessonModal)}
                  className="w-full py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md shadow-sky-500/25 cursor-pointer"
                >
                  Nộp bài & Kiểm tra kết quả ✓
                </button>
              ) : (
                <div className="text-center p-4 bg-slate-50  rounded-2xl border border-slate-200  space-y-3">
                  <p className="text-sm font-bold text-slate-800">
                    Kết quả của bạn: <span className="text-sky-500 text-base">{quizScore}%</span>
                  </p>
                  <button
                    onClick={() => {
                      setQuizSubmitted(false);
                      setQuizAnswers({});
                      setQuizReorderIndices({});
                    }}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 flex items-center gap-1.5 mx-auto hover:bg-slate-100 transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Làm lại bài kiểm tra
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // HSK OVERVIEW & CURRICULUM TABS
  // -------------------------------------------------------------
  return (
    <div className="space-y-6 pb-12 animate-fadeIn w-full max-w-full overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white  p-6 rounded-3xl border border-slate-100  shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            Lộ Trình Học HSK 1 - HSK 6
          </h1>
          <p className="text-xs sm:text-sm text-slate-500  mt-0.5">
            Học chuẩn 4 kỹ năng Nghe, Nói, Đọc, Viết theo khung khảo thí tiêu chuẩn
          </p>
        </div>

        <button
          onClick={() => isPlacementTestOpen || (window as any).triggerPlacementTest?.()}
          className="px-4 py-2.5 rounded-2xl bg-blue-50  text-blue-600  border border-blue-100  text-xs font-bold hover:bg-blue-100 transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span>Làm bài Test kiểm tra trình độ</span>
        </button>
      </div>

      {/* HSK Level Selector Tabs */}
      <ScrollableTabs
        hintText="Trượt xem các cấp độ HSK 1 - HSK 6"
        pillColor="blue"
        gap="gap-3"
      >
        {HSK_LEVELS.map((level) => {
          const isSelected = selectedHskTab === level.id;
          return (
            <button
              key={level.id}
              onClick={() => setSelectedHskTab(level.id)}
              className={`px-5 py-3.5 rounded-2xl font-bold text-xs shrink-0 transition-all border flex flex-col items-start min-w-[130px] cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                  : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-sm font-bold">{level.name}</span>
                <span className={`text-[11px] font-mono ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                  {level.hanziName}
                </span>
              </div>
              <span className={`text-[11px] font-medium ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                {level.totalWords} từ vựng
              </span>
            </button>
          );
        })}
      </ScrollableTabs>

      {/* Current HSK Info Card */}
      {(() => {
        const currentLvl = HSK_LEVELS.find((l) => l.id === selectedHskTab) || HSK_LEVELS[0];
        const currentLessons = HSK_LESSONS_BY_LEVEL[selectedHskTab] || [];
        const completedCount = currentLessons.filter((l) => userProgress.completedLessonIds.includes(l.id)).length;
        const progressPercent = currentLessons.length > 0 ? Math.round((completedCount / currentLessons.length) * 100) : 0;
        const levelVocabCount = getLevelExclusiveVocabulary(selectedHskTab).length;

        return (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="font-extrabold text-slate-800 text-lg">
                  {currentLvl.name} - {currentLvl.hanziName}
                </h3>
                <span className="text-xs px-3 py-1 rounded-full bg-white font-bold text-blue-600 shadow-xs border border-blue-100">
                  Mục tiêu: {currentLvl.targetSkill}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                {currentLvl.description}
              </p>
            </div>
            <div className="text-right shrink-0 bg-white/80 px-4 py-2 rounded-2xl border border-blue-100">
              <span className="text-xs text-slate-400 font-medium">Tiến độ cấp độ:</span>
              <p className="text-xl font-bold text-blue-600">
                {progressPercent}%
              </p>
            </div>
          </div>
        );
      })()}

      {/* Sub-view switcher for Level: Lessons / Full Vocab / Grammar */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setLevelSubTab("lessons")}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            levelSubTab === "lessons"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Bài học theo chủ đề ({HSK_LESSONS_BY_LEVEL[selectedHskTab]?.length || 0})</span>
        </button>

        <button
          onClick={() => setLevelSubTab("vocab")}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            levelSubTab === "vocab"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Kho từ vựng {selectedHskTab} ({getLevelExclusiveVocabulary(selectedHskTab).length} từ)</span>
        </button>

        <button
          onClick={() => setLevelSubTab("grammar")}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            levelSubTab === "grammar"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Cẩm nang ngữ pháp</span>
        </button>
      </div>

      {/* Conditional Sub-View Rendering */}
      {levelSubTab === "vocab" && (
        <HskLevelVocabView
          level={selectedHskTab}
          userProgress={userProgress}
        />
      )}

      {levelSubTab === "grammar" && (
        <HskLevelGrammarView level={selectedHskTab} />
      )}

      {levelSubTab === "lessons" && (
        <>
          {/* Lessons List for Selected HSK Level */}
          {(() => {
            const currentLessons = HSK_LESSONS_BY_LEVEL[selectedHskTab] || [];
            if (currentLessons.length === 0) {
              return (
                <div className="p-10 text-center bg-white rounded-3xl border border-slate-100 space-y-3 shadow-sm">
                  <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                  <h4 className="font-bold text-slate-800 text-base">
                    Cấp độ {selectedHskTab} đang được cập nhật
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Hệ thống đang đồng bộ bài học cho cấp độ này.
                  </p>
                </div>
              );
            }

            return (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-700">
                  Danh sách bài học {selectedHskTab} ({currentLessons.length} bài học):
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentLessons.map((lesson) => {
                    const isCompleted = userProgress.completedLessonIds.includes(lesson.id);
                    const lockStatus = checkLessonLock(lesson, userProfile);

                    const handleCardClick = () => {
                      if (lockStatus.isLocked) {
                        onOpenLockedGate?.({
                          type: "lesson",
                          id: lesson.id,
                          hskLevel: lesson.hskLevel,
                          lessonNumber: lesson.lessonNumber,
                          title: lesson.title,
                          subtitle: lesson.vietnameseTitle,
                          gemCost: lockStatus.gemUnlockCost || 150,
                          previewSummary: [
                            `Chủ đề: ${lesson.title} - ${lesson.description}`,
                            `${lesson.grammarPoints?.length || 2} điểm ngữ pháp quan trọng`,
                            `Luyện phát âm & bài tập trắc nghiệm củng cố`
                          ]
                        });
                      } else {
                        onOpenLesson(lesson);
                      }
                    };

                    return (
                      <div
                        key={lesson.id}
                        id={`lesson-card-${lesson.id}`}
                        onClick={handleCardClick}
                        className={`p-6 rounded-3xl transition-all cursor-pointer group shadow-sm flex flex-col justify-between border ${
                          lockStatus.isLocked
                            ? "bg-slate-50/70 border-slate-200 hover:border-amber-300"
                            : "bg-white border-slate-100 hover:border-blue-200"
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                Bài {lesson.lessonNumber}
                              </span>
                              {lockStatus.isLocked && (
                                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200">
                                  <Lock className="w-3 h-3 text-amber-600" /> PRO / 150 💎
                                </span>
                              )}
                            </div>

                            {isCompleted ? (
                              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                                <CheckCircle className="w-3.5 h-3.5" /> Đã học xong
                              </span>
                            ) : (
                              <span className="text-xs text-slate-400">~{lesson.estimatedMinutes} phút</span>
                            )}
                          </div>

                          <h4 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                            {lesson.title}
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                            {lesson.description}
                          </p>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                          {lockStatus.isLocked ? (
                            <span className="text-amber-600 flex items-center gap-1">
                              <Lock className="w-3.5 h-3.5" /> Mở khóa bài học
                            </span>
                          ) : (
                            <span className="text-blue-600">Vào học bài →</span>
                          )}
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-slate-400 group-hover:text-blue-600" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </>
      )}
    </div>
  );
};
