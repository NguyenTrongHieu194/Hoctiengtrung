import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  Volume2, 
  Sparkles, 
  Play,
  Gamepad2,
  Trophy,
  ArrowRight,
  TrendingUp,
  Target,
  Globe,
  Briefcase,
  CheckCircle2,
  PenTool,
  GraduationCap,
  Languages,
  Bookmark
} from "lucide-react";
import { UserProfile, UserProgressData, WordItem, Lesson, TabType } from "../types";
import { HSK1_LESSONS } from "../data/hskData";
import { getRandomWordRemote, CedictEntry } from "../data/dictionaryService";
import { playChineseAudio } from "../services/speechService";
import { HelloChinaAppIcon, HelloChinaSloganBanner } from "./HelloChinaLogo";

interface HomeViewProps {
  userProfile: UserProfile;
  userProgress: UserProgressData;
  onChangeTab: (tab: TabType) => void;
  onOpenLesson: (lesson: Lesson) => void;
  onOpenPlacementTest: () => void;
  onOpenAITutor: () => void;
  onOpenSavedWords?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  userProfile,
  userProgress,
  onChangeTab,
  onOpenLesson,
  onOpenSavedWords
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [dailyWord, setDailyWord] = useState<CedictEntry>({
    id: 1,
    simp: "学习",
    trad: "學習",
    pinyinNum: "xue2 xi2",
    pinyin: "xuéxí",
    hanViet: "học tập",
    vietnamese: ["Học tập, nghiên cứu, rèn luyện kiến thức"],
    english: ["to learn; to study"],
    hskLevel: "HSK1"
  });

  useEffect(() => {
    let isMounted = true;
    getRandomWordRemote().then((word) => {
      if (isMounted && word) {
        setDailyWord(word);
      }
    }).catch(() => {
      // keep default
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const completedCount = userProgress.completedLessonIds?.length || 0;
  const currentResumeLesson = HSK1_LESSONS.find((l) => !userProgress.completedLessonIds?.includes(l.id)) || HSK1_LESSONS[0];
  const isLessonDone = userProgress.completedLessonIds?.includes(currentResumeLesson.id);
  const lessonProgressPercent = isLessonDone ? 100 : (completedCount > 0 ? Math.min(100, Math.round((completedCount / HSK1_LESSONS.length) * 100)) : 0);

  const handlePlayWordAudio = async () => {
    setIsPlayingAudio(true);
    await playChineseAudio(dailyWord.simp, 1.0);
    setIsPlayingAudio(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn bg-white text-slate-900 w-full max-w-full overflow-hidden">
      
      {/* 1. Main Brand Hero Section - Hello China Modern Identity */}
      <section 
        id="home-hero-section"
        className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 rounded-3xl p-6 sm:p-9 text-white overflow-hidden shadow-xl shadow-blue-900/15 border border-blue-500/30"
      >
        {/* Subtle decorative background circles */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-orange-500/15 blur-3xl pointer-events-none" />
        <div className="absolute left-1/2 -bottom-24 w-96 h-96 rounded-full bg-sky-400/20 blur-3xl pointer-events-none" />
        
        {/* Large stylized watermark Chinese character */}
        <div className="absolute right-4 -bottom-6 text-[140px] sm:text-[210px] font-black opacity-10 select-none pointer-events-none text-white leading-none font-serif">
          中
        </div>

        <div className="relative z-10 max-w-3xl">
          {/* Top Brand Slogan Pill */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-bold text-white shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span>Nền Tảng Tự Học Toàn Diện 4 Kỹ Năng</span>
            </div>
            <span className="text-xs text-blue-100 font-semibold bg-black/20 px-3 py-1 rounded-full">
              HSK 1-6 • Giao Tiếp • Chuyên Ngành
            </span>
          </div>

          {/* Heading */}
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-xs">
              Chào mừng đến với <span className="bg-gradient-to-r from-white via-orange-200 to-orange-400 bg-clip-text text-transparent">Hello China</span>
            </h1>
          </div>

          {/* Brand Slogan */}
          <p className="text-orange-200 text-sm sm:text-lg font-bold mb-3 tracking-wide">
            Học tiếng Trung – Hiểu văn hóa – Kết nối tương lai
          </p>

          <p className="text-blue-100 text-xs sm:text-base mb-6 font-normal leading-relaxed max-w-2xl">
            Lộ trình học bài bản từ con số 0 dành cho học sinh, sinh viên, người đi làm và kỹ sư nhà máy. Phát âm Pinyin chuẩn giọng Bắc Kinh, tập viết nét chữ Hán và luyện thi HSK 1–6 cùng trợ lý AI.
          </p>

          {/* Current Progress Track */}
          <div className="bg-white/10 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/20 mb-6 max-w-xl shadow-inner">
            <div className="flex justify-between items-center text-xs font-bold text-white mb-2">
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-orange-400" />
                <span>Tiến trình: {currentResumeLesson.title}</span>
              </span>
              <span className="text-orange-300 font-extrabold">{lessonProgressPercent}% Hoàn thành</span>
            </div>
            <div className="w-full bg-black/25 h-2.5 rounded-full overflow-hidden p-0.5">
              <div 
                className="bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-xs" 
                style={{ width: `${lessonProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="continue-lesson-btn"
              onClick={() => onOpenLesson(currentResumeLesson)}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3.5 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-orange-500/30 cursor-pointer flex items-center gap-2 text-sm sm:text-base border border-orange-400/50"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>Tiếp tục học bài</span>
            </button>

            <button
              onClick={() => onChangeTab("pinyin")}
              className="bg-white/15 hover:bg-white/25 text-white border border-white/40 px-5 py-3.5 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm sm:text-base flex items-center gap-2 shadow-xs backdrop-blur-xs"
            >
              <span>Luyện phát âm Pinyin</span>
            </button>

            <button
              onClick={() => onChangeTab("learn")}
              className="bg-black/20 hover:bg-black/30 text-blue-100 border border-white/20 px-4 py-3 rounded-2xl font-semibold transition-all cursor-pointer text-xs sm:text-sm"
            >
              Xem lộ trình HSK
            </button>
          </div>
        </div>
      </section>

      {/* Slogan Banner Highlight */}
      <div className="flex items-center justify-center sm:justify-start">
        <HelloChinaSloganBanner className="w-full justify-center sm:justify-start sm:w-auto" />
      </div>

      {/* Sổ tay từ đã lưu (Saved Words Quick Banner) */}
      {(userProgress.favoriteWordIds?.length ?? 0) > 0 && onOpenSavedWords && (
        <div
          id="home-saved-words-banner"
          onClick={onOpenSavedWords}
          className="bg-gradient-to-r from-rose-500 via-rose-600 to-orange-500 text-white p-4 sm:p-5 rounded-3xl shadow-md shadow-rose-500/15 flex items-center justify-between gap-4 cursor-pointer hover:scale-[1.01] transition-all group border border-rose-300/30"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <Bookmark className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-black">
                  Sổ tay từ vựng đã lưu
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-white/25 text-white text-xs font-black">
                  {userProgress.favoriteWordIds.length} từ
                </span>
              </div>
              <p className="text-xs text-rose-100 font-medium mt-0.5">
                Ôn tập các từ vựng bạn đã đánh dấu bằng Flashcard hoặc tra cứu lại
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-black bg-white/20 px-3.5 py-2 rounded-xl group-hover:bg-white/30 transition-all shrink-0">
            <span>Mở sổ tay</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      )}

      {/* Interactive Game Arena Banner */}
      <section
        id="home-game-arena-banner"
        onClick={() => onChangeTab("game")}
        className="bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-600 rounded-3xl p-5 sm:p-6 text-white shadow-lg shadow-orange-500/10 cursor-pointer hover:scale-[1.01] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden group border border-orange-300/30"
      >
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-3xl shadow-inner group-hover:rotate-12 transition-transform shrink-0 border border-white/30">
            🎮
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-black/25 px-2.5 py-0.5 rounded-full">
                5 Đấu Trường Game Tương Tác
              </span>
              <span className="text-xs animate-bounce">🔥</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black mt-0.5 tracking-tight flex items-center gap-2">
              <span>Đấu Trường Luyện Phản Xạ & Ghi Nhớ Từ Vựng</span>
            </h3>
            <p className="text-xs text-orange-100 font-medium line-clamp-1 mt-0.5">
              Lật thẻ trí nhớ, Bắt chữ 15s, Thám hiểm 4 thanh điệu, Đua xe xếp câu ngữ pháp & Giải đố bộ thủ
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 self-end sm:self-auto shrink-0">
          <span className="px-4 py-2.5 rounded-2xl bg-white text-orange-600 text-xs font-black shadow-md flex items-center gap-1.5 group-hover:bg-orange-50 transition">
            <span>Tham Gia Ngay</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </section>

      {/* 2. Structured Learning Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
              📚
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Chương Trình Đào Tạo Trọng Tâm
              </h3>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Thiết kế chuẩn hóa phù hợp với học sinh, sinh viên, người đi làm và kỹ sư
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Lộ trình HSK 1-6 chuẩn hóa ✨
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Module 1: Tình Huống Giao Tiếp Thực Chiến (NEW PRIMARY FOCUS) */}
          <div 
            onClick={() => onChangeTab("dialogue")}
            className="bg-gradient-to-br from-orange-500/10 via-white to-amber-500/10 p-5 sm:p-6 rounded-3xl border-2 border-orange-300 hover:border-orange-500 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 text-2xl group-hover:scale-110 transition-transform">
                  💬
                </div>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-orange-500 text-white shadow-2xs animate-pulse">
                  TRỌNG TÂM MỚI
                </span>
              </div>
              <h4 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                Giao Tiếp Tình Huống Thực Tế
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 font-medium leading-relaxed">
                Hội thoại phản xạ: Chào hỏi, Gọi món nhà hàng, Mua sắm trả giá, Bắt taxi chỉ đường, Công sở & Chuyên môn xưởng với chế độ đóng vai AI.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-orange-100 flex items-center justify-between text-xs font-black text-orange-600">
              <span>Luyện giao tiếp ngay</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* Module 2: Pinyin & Phát Âm Chuẩn */}
          <div 
            onClick={() => onChangeTab("pinyin")}
            className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-100 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 text-2xl group-hover:scale-110 transition-transform">
                  🎵
                </div>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-blue-600 text-white shadow-2xs">
                  NỀN TẢNG
                </span>
              </div>
              <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                Luyện Phát Âm Pinyin
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 font-medium leading-relaxed">
                4 Thanh điệu, 23 Thanh mẫu, 36 Vận mẫu, Bảng ghép âm tương tác kèm giọng đọc chuẩn Bắc Kinh và hướng dẫn khẩu hình.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-blue-600">
              <span>Luyện phát âm ngay</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* Module 3: 214 Bộ Thủ Hán Tự */}
          <div 
            onClick={() => onChangeTab("radicals")}
            className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-100 hover:border-orange-300 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 text-2xl group-hover:scale-110 transition-transform">
                  🖌️
                </div>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-orange-600 text-white shadow-2xs">
                  214 BỘ THỦ
                </span>
              </div>
              <h4 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                214 Bộ Thủ & Chiết Tự
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 font-medium leading-relaxed">
                Hiểu bản chất cấu tạo chữ Hán qua hình vẽ tượng hình, nguồn gốc chiết tự, ô kẻ chữ Mễ và hướng dẫn từng nét thuận.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-orange-600">
              <span>Học bộ thủ & tập viết</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* Module 4: Giáo Trình HSK 1-6 */}
          <div 
            onClick={() => onChangeTab("learn")}
            className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-100 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 text-2xl group-hover:scale-110 transition-transform">
                  📚
                </div>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-blue-600 text-white shadow-2xs">
                  HSK 1-6
                </span>
              </div>
              <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                Giáo Trình HSK Chuẩn Hán Ban
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 font-medium leading-relaxed">
                Hệ thống bài học phân cấp bài bản từ HSK1 đến HSK6: Hội thoại thực tế, cấu trúc câu, từ vựng và bài tập củng cố.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-blue-600">
              <span>Vào danh sách bài học</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* Module 5: Luyện Tập 5 Kỹ Năng & AI */}
          <div 
            onClick={() => onChangeTab("practice")}
            className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-100 hover:border-orange-300 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 text-2xl group-hover:scale-110 transition-transform">
                  🗣️
                </div>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-orange-600 text-white shadow-2xs">
                  AI CHẤM ĐIỂM
                </span>
              </div>
              <h4 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                Luyện Tập & Chấm Điểm Phát Âm
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 font-medium leading-relaxed">
                Thu âm giọng đọc của bạn để nhận diện độ chuẩn xác thanh điệu và luyện viết bút thuận từng nét Hán tự chi tiết.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-orange-600">
              <span>Bắt đầu luyện tập</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* Module 6: Tiếng Trung Chuyên Ngành May Mặc */}
          <div 
            onClick={() => onChangeTab("garment")}
            className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-100 hover:border-blue-300 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 text-2xl group-hover:scale-110 transition-transform">
                  🧵
                </div>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-slate-900 text-white shadow-2xs">
                  CHUYÊN NGÀNH
                </span>
              </div>
              <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                Tiếng Trung Ngành May Mặc & Nhà Máy
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 font-medium leading-relaxed">
                150+ thuật ngữ và hội thoại thực tế tại xưởng may: Máy may công nghiệp, Quản lý chuyền IE, Đọc tài liệu Techpack, Kiểm hàng QC.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-blue-600">
              <span>Học chuyên ngành may</span>
              <span className="text-base group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Word of the Day & User Progress Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Word of the Day (7 cols on lg) */}
        <div 
          id="word-of-day-card"
          className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border-2 border-blue-100 shadow-2xs relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Mục Từ Tiêu Điểm Trong Ngày
            </span>
            {dailyWord.hskLevel && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-600 text-white shadow-2xs">
                {dailyWord.hskLevel}
              </span>
            )}
          </div>

          <div className="flex items-start justify-between gap-4 bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/50 p-5 rounded-2xl border border-slate-200/80">
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-wide">
                  {dailyWord.simp}
                </span>
                {dailyWord.trad && dailyWord.trad !== dailyWord.simp && (
                  <span className="text-sm sm:text-base font-medium text-slate-400">
                    [{dailyWord.trad}]
                  </span>
                )}
                <span className="text-lg sm:text-xl font-mono text-orange-600 font-extrabold">
                  {dailyWord.pinyin}
                </span>
              </div>

              {dailyWord.hanViet && (
                <p className="text-xs sm:text-sm font-bold text-emerald-700 mt-1">
                  Âm Hán Việt: <span className="uppercase tracking-wide">{dailyWord.hanViet}</span>
                </p>
              )}

              <p className="text-base sm:text-lg font-bold text-slate-800 mt-2 line-clamp-2">
                Nghĩa Việt:{" "}
                <span className="text-blue-700 font-black">
                  {dailyWord.vietnamese?.length > 0
                    ? dailyWord.vietnamese.join("; ")
                    : dailyWord.english?.join("; ") || "—"}
                </span>
              </p>

              {dailyWord.english && dailyWord.english.length > 0 && dailyWord.vietnamese && dailyWord.vietnamese.length > 0 && (
                <p className="text-xs text-slate-500 italic mt-1 line-clamp-1">
                  English: {dailyWord.english.join("; ")}
                </p>
              )}
            </div>

            <button
              id="play-word-of-day-audio"
              onClick={handlePlayWordAudio}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all shadow-md active:scale-95 shrink-0 ${
                isPlayingAudio
                  ? "bg-blue-600 text-white border-blue-600 animate-pulse scale-105"
                  : "bg-white text-blue-600 border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600"
              }`}
              title="Bấm để nghe phát âm chuẩn"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-medium">
              Từ điển CC-CEDICT + CVDICT (122,596 từ)
            </span>
            <button
              onClick={() => onChangeTab("dictionary")}
              className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 hover:text-blue-800 transition-colors cursor-pointer group"
            >
              <span>Mở Từ điển tra cứu</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* User Learning Overview (5 cols on lg) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-100 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-orange-500" />
                <span>Tổng Quan Thành Tích Học Tập</span>
              </h3>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">
                Chăm chỉ
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Stat 1 */}
              <div className="bg-orange-50/70 p-3.5 rounded-2xl border border-orange-200/80 text-center">
                <span className="text-2xl">🔥</span>
                <p className="text-xs text-slate-600 font-bold mt-1">Chuỗi ngày</p>
                <p className="text-xl font-black text-orange-600">{userProfile.streakDays} ngày</p>
              </div>

              {/* Stat 2 */}
              <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-200/80 text-center">
                <span className="text-2xl">💎</span>
                <p className="text-xs text-slate-600 font-bold mt-1">Điểm kinh nghiệm</p>
                <p className="text-xl font-black text-blue-700">{userProgress.totalXP} XP</p>
              </div>

              {/* Stat 3 */}
              <div className="bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-200/80 text-center">
                <span className="text-2xl">📖</span>
                <p className="text-xs text-slate-600 font-bold mt-1">Từ đã thành thạo</p>
                <p className="text-xl font-black text-emerald-700">{(userProgress.masteredWordIds?.length ?? userProgress.wordsLearned ?? 0)} từ</p>
              </div>

              {/* Stat 4 */}
              <div className="bg-indigo-50/70 p-3.5 rounded-2xl border border-indigo-200/80 text-center">
                <span className="text-2xl">⭐</span>
                <p className="text-xs text-slate-600 font-bold mt-1">Cấp độ hiện tại</p>
                <p className="text-xl font-black text-indigo-700">{userProfile.currentHskLevel}</p>
              </div>
            </div>

            <p className="text-center text-xs text-slate-600 font-medium">
              {userProgress.totalXP > 0 ? (
                <>Bạn đã tích lũy <span className="font-black text-blue-600">{userProgress.totalXP} XP</span> trên hành trình chinh phục tiếng Trung!</>
              ) : (
                <>Bắt đầu bài học đầu tiên hôm nay để tích lũy điểm thưởng và xây dựng chuỗi học tập!</>
              )}
            </p>
          </div>

          <button
            onClick={() => onChangeTab("profile")}
            className="w-full mt-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black transition-all cursor-pointer text-center shadow-md shadow-blue-500/20 active:scale-98"
          >
            Xem Thống Kê Chi Tiết & Bảng Điều Khiển 📊
          </button>
        </div>

      </div>

    </div>
  );
};
