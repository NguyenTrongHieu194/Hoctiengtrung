import React, { useRef, useState, useEffect, useCallback } from "react";
import { 
  Home, 
  BookOpen, 
  Scissors, 
  Dumbbell, 
  Layers, 
  User, 
  Search, 
  Bot, 
  PenTool,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Cloud,
  CloudCheck,
  Loader2,
  LogIn,
  Sparkles,
  Crown,
  Zap,
  Languages,
  Bookmark
} from "lucide-react";
import { TabType, UserProfile, UserProgressData } from "../types";
import { subscribeSyncStatus } from "../services/dbService";
import { isProUser, getUserTier } from "../services/subscriptionService";
import { HelloChinaAppIcon, HelloChinaHorizontalLogo } from "./HelloChinaLogo";

interface NavbarProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  onOpenSearch: () => void;
  onOpenAITutor: () => void;
  onOpenSavedWords?: () => void;
  onOpenSubscription?: () => void;
  onOpenActivityModal?: () => void;
  onGoogleSignIn?: () => void;
  userProfile: UserProfile;
  userProgress: UserProgressData;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  children?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onChangeTab,
  onOpenSearch,
  onOpenAITutor,
  onOpenSavedWords,
  onOpenSubscription,
  onOpenActivityModal,
  onGoogleSignIn,
  userProfile,
  userProgress,
  onToggleDarkMode,
  children
}) => {
  const totalXP = userProgress?.totalXP ?? 0;
  const navScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "synced" | "error">("idle");

  const isGuest = !userProfile.email || userProfile.email.includes("guest");

  useEffect(() => {
    const unsub = subscribeSyncStatus((status) => {
      setSyncStatus(status);
      if (status === "synced") {
        const t = setTimeout(() => setSyncStatus("idle"), 2500);
        return () => clearTimeout(t);
      }
    });
    return unsub;
  }, []);

  const checkNavScroll = useCallback(() => {
    const el = navScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollWidth - (el.scrollLeft + el.clientWidth) > 6);
  }, []);

  useEffect(() => {
    const el = navScrollRef.current;
    if (!el) return;
    checkNavScroll();
    window.addEventListener("resize", checkNavScroll);
    return () => window.removeEventListener("resize", checkNavScroll);
  }, [checkNavScroll]);

  // Scroll active tab into view smoothly if selected
  useEffect(() => {
    const activeBtn = document.getElementById(`nav-tab-${activeTab}`);
    if (activeBtn && navScrollRef.current) {
      const container = navScrollRef.current;
      const left = activeBtn.offsetLeft - container.offsetWidth / 2 + activeBtn.offsetWidth / 2;
      container.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
      setTimeout(checkNavScroll, 300);
    }
  }, [activeTab, checkNavScroll]);

  const handleNavScroll = (offset: number) => {
    if (navScrollRef.current) {
      navScrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
      setTimeout(checkNavScroll, 200);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col h-full w-full max-w-full overflow-hidden bg-white text-slate-900 select-text">
      {/* Modern Top Header - Rigid Pinned to Top */}
      <header className="shrink-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-100 shadow-xs transition-colors w-full max-w-full overflow-hidden select-none">
        <div className="max-w-6xl mx-auto px-2.5 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 w-full">
          
          {/* Official Hello China Brand Logo */}
          <div 
            onClick={() => onChangeTab("home")}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none group shrink-0"
            title="Hello China - Trang chủ"
          >
            <HelloChinaAppIcon size={32} className="shrink-0 group-hover:scale-105 transition-transform" />
            <div className="flex flex-col justify-center shrink-0">
              <div className="flex items-baseline tracking-tight font-black leading-none whitespace-nowrap">
                <span className="text-slate-900 text-base sm:text-xl font-black">Hello&nbsp;</span>
                <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent text-base sm:text-xl font-black">
                  China
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 leading-tight mt-0.5 hidden md:block whitespace-nowrap">
                Học tiếng Trung – Hiểu văn hóa – <span className="font-bold text-orange-600">Kết nối tương lai</span>
              </p>
            </div>
          </div>

          {/* Quick Metric Badges & User Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Activity Points Badge - Shown on sm+ screens */}
            <button
              id="header-activity-points-btn"
              onClick={onOpenActivityModal}
              title={`Điểm Sôi Nổi: ${userProfile.activityPoints ?? 0} điểm (Online 10p tặng 2 điểm, 10 điểm đổi 10 💎)`}
              className="hidden sm:flex bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl items-center gap-1 sm:gap-1.5 border border-amber-300 shadow-2xs shrink-0 cursor-pointer active:scale-95 transition"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <div className="flex items-center gap-0.5">
                <span className="font-black text-amber-800 text-xs sm:text-sm">
                  {userProfile.activityPoints ?? 0}
                </span>
                <span className="text-[10px] font-bold text-amber-600 hidden md:inline">điểm</span>
              </div>
            </button>

            {/* Gems Badge - Brand Royal Blue */}
            <button
              id="header-gems-btn"
              onClick={onOpenActivityModal || onOpenSubscription}
              title={`Kho Kim Cương: ${(userProfile.gems ?? 0).toLocaleString()} 💎 (Bấm để đổi Điểm Sôi Nổi lấy Kim Cương)`}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl flex items-center gap-1 sm:gap-1.5 border border-blue-200 shadow-2xs shrink-0 cursor-pointer active:scale-95 transition"
            >
              <span className="text-xs sm:text-sm">💎</span>
              <span className="font-black text-blue-700 text-xs sm:text-sm">
                {(userProfile.gems ?? 0).toLocaleString()}
              </span>
            </button>

            {/* PRO / VIP Upgrade Button */}
            {isProUser(userProfile) ? (
              <button
                id="header-pro-active-badge"
                onClick={onOpenSubscription}
                title="Tài khoản PRO VIP - Đã mở khóa trọn bộ"
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs shadow-sm hover:from-amber-600 hover:to-orange-600 transition-all cursor-pointer shrink-0 active:scale-95"
              >
                <Crown className="w-3.5 h-3.5" />
                <span className="text-[11px] uppercase tracking-wider">PRO</span>
              </button>
            ) : (
              <button
                id="header-upgrade-pro-btn"
                onClick={onOpenSubscription}
                title="Nâng cấp gói PRO để mở khóa trọn bộ HSK 1-6 & AI Tutor"
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 text-orange-700 hover:bg-orange-100 font-black text-xs shadow-2xs transition-all cursor-pointer shrink-0 active:scale-95 group"
              >
                <Crown className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  <span className="hidden sm:inline">Nâng Cấp </span>PRO
                </span>
              </button>
            )}

            {/* Sổ tay từ đã lưu (Bookmark) */}
            <button
              id="open-saved-words-btn"
              onClick={onOpenSavedWords}
              title={`Sổ tay từ đã lưu (${userProgress?.favoriteWordIds?.length ?? 0} từ)`}
              className="p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 hover:border-rose-300 transition-all border border-rose-200 cursor-pointer active:scale-95 shrink-0 relative flex items-center gap-1"
            >
              <Bookmark className="w-4 h-4 fill-rose-500 text-rose-500" />
              {(userProgress?.favoriteWordIds?.length ?? 0) > 0 && (
                <span className="text-[11px] font-black text-rose-700 leading-none">
                  {userProgress.favoriteWordIds.length}
                </span>
              )}
            </button>

            {/* Global Search */}
            <button
              id="open-search-modal-btn"
              onClick={onOpenSearch}
              title="Tìm kiếm từ vựng, ngữ pháp, Pinyin"
              className="p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all border border-slate-200 cursor-pointer active:scale-95 shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* AI Tutor Assistant Button */}
            <button
              id="open-ai-tutor-btn"
              onClick={onOpenAITutor}
              title="Trợ lý AI Giảng Viên Tiếng Trung"
              className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black shadow-md shadow-blue-500/20 transition-all active:scale-95 cursor-pointer shrink-0"
            >
              <Bot className="w-4 h-4" />
              <span>Thầy Giáo AI</span>
            </button>

            {/* Cloud Sync Status Indicator */}
            {!isGuest && (
              <div 
                title={syncStatus === "syncing" ? "Đang đồng bộ dữ liệu..." : "Đã đồng bộ an toàn với Google Cloud Firestore"}
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold"
              >
                {syncStatus === "syncing" ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                    <span>Đang lưu...</span>
                  </>
                ) : (
                  <>
                    <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cloud Sync</span>
                  </>
                )}
              </div>
            )}

            {/* Google Sign In / Profile Quick Button */}
            {isGuest ? (
              <button
                id="header-google-signin-btn"
                onClick={onGoogleSignIn}
                title="Đăng nhập tài khoản Google để lưu tiến độ học tập"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl sm:rounded-2xl bg-white hover:bg-blue-50 text-blue-600 border border-blue-300 hover:border-blue-500 font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-95 shrink-0"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span className="hidden sm:inline font-semibold">Đăng nhập</span>
              </button>
            ) : (
              <button
                id="header-user-profile-btn"
                onClick={() => onChangeTab("profile")}
                title={`Tài khoản: ${userProfile.displayName} (${userProfile.email})`}
                className="flex items-center gap-1.5 p-0.5 sm:px-2.5 sm:py-1 rounded-full sm:rounded-2xl bg-blue-50 border border-blue-200 hover:border-blue-400 text-blue-900 transition-all cursor-pointer shrink-0"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gradient-to-r from-blue-600 to-orange-500 text-white flex items-center justify-center text-xs font-black shrink-0">
                  {userProfile.photoURL ? (
                    <img src={userProfile.photoURL} alt={userProfile.displayName} className="w-full h-full object-cover" />
                  ) : (
                    userProfile.displayName?.charAt(0).toUpperCase() || "H"
                  )}
                </div>
                <span className="text-xs font-bold hidden md:inline max-w-[90px] truncate">
                  {userProfile.displayName?.split(" ")[0] || "Học viên"}
                </span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Scrollable Main Area (Content scrolls smoothly inside this container) */}
      <main 
        id="app-main-scroll-container" 
        className="flex-1 w-full overflow-y-auto overflow-x-hidden overscroll-y-contain bg-white"
      >
        <div className="w-full max-w-6xl mx-auto px-2.5 sm:px-6 lg:px-8 pt-3 sm:pt-6 pb-8">
          {children}
        </div>
      </main>

      {/* Floating AI Teacher for Mobile - Positioned cleanly above fixed bottom bar */}
      <button
        id="floating-ai-tutor-btn"
        onClick={onOpenAITutor}
        className="md:hidden fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom,20px))] right-4 z-40 p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-orange-500 text-white shadow-xl shadow-blue-500/25 flex items-center justify-center hover:scale-105 active:scale-95 transition-all border-2 border-white cursor-pointer"
        title="Thầy Giáo AI"
      >
        <Bot className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
      </button>

      {/* Solid Opaque Fixed Bottom Navigation Bar - Brand Styled */}
      <nav 
        id="bottom-main-navigation"
        className="relative shrink-0 z-40 bg-white border-t-2 border-slate-100 shadow-[0_-6px_25px_rgba(0,0,0,0.06)] px-2 sm:px-6 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom,18px))] transition-all select-none w-full min-h-[74px] sm:min-h-[80px] flex items-center"
      >
        {/* Left Scroll Arrow Overlay for Mobile */}
        {canScrollLeft && (
          <div 
            onClick={() => handleNavScroll(-150)}
            className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/95 to-transparent z-10 flex items-center justify-start pl-1 cursor-pointer sm:hidden"
          >
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md border-2 border-white hover:scale-110 active:scale-95 transition-all">
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        )}

        {/* Right Scroll Arrow Overlay for Mobile (Indicates more tabs like Garment, Profile) */}
        {canScrollRight && (
          <div 
            onClick={() => handleNavScroll(150)}
            className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/95 to-transparent z-10 flex items-center justify-end pr-1 cursor-pointer sm:hidden"
          >
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-md border-2 border-white text-[10px] font-black animate-pulse hover:scale-105 active:scale-95 transition-all">
              <span>Trượt</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>
        )}

        <div 
          ref={navScrollRef}
          onScroll={checkNavScroll}
          style={{ touchAction: "pan-x" }}
          className="max-w-6xl w-full mx-auto flex items-center justify-between sm:justify-around gap-2 sm:gap-3 overflow-x-auto scrollbar-none overscroll-x-contain px-1 py-1"
        >
          
          {/* Trang chủ - Brand Blue */}
          <button
            id="nav-tab-home"
            onClick={() => onChangeTab("home")}
            className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 sm:px-4 rounded-2xl transition-all cursor-pointer select-none active:scale-90 duration-150 min-w-[68px] sm:min-w-[76px] shrink-0 border ${
              activeTab === "home"
                ? "bg-blue-50 text-blue-700 font-extrabold shadow-2xs border-blue-200 ring-2 ring-blue-100 scale-[1.02]"
                : "border-transparent text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"
            }`}
          >
            <div className={`p-1.5 rounded-xl ${activeTab === "home" ? "bg-blue-600 text-white shadow-2xs" : ""}`}>
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap leading-tight">Trang chủ</span>
          </button>

          {/* Học bài - Blue/Cyan */}
          <button
            id="nav-tab-learn"
            onClick={() => onChangeTab("learn")}
            className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 sm:px-4 rounded-2xl transition-all cursor-pointer select-none active:scale-90 duration-150 min-w-[68px] sm:min-w-[76px] shrink-0 border ${
              activeTab === "learn"
                ? "bg-blue-50 text-blue-700 font-extrabold shadow-2xs border-blue-200 ring-2 ring-blue-100 scale-[1.02]"
                : "border-transparent text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"
            }`}
          >
            <div className={`p-1.5 rounded-xl ${activeTab === "learn" ? "bg-blue-600 text-white shadow-2xs" : ""}`}>
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap leading-tight">Học bài</span>
          </button>

          {/* Pinyin Phát âm - Sky Blue */}
          <button
            id="nav-tab-pinyin"
            onClick={() => onChangeTab("pinyin")}
            className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 sm:px-4 rounded-2xl transition-all cursor-pointer select-none active:scale-90 duration-150 relative min-w-[68px] sm:min-w-[76px] shrink-0 border ${
              activeTab === "pinyin"
                ? "bg-sky-50 text-sky-700 font-extrabold shadow-2xs border-sky-200 ring-2 ring-sky-100 scale-[1.02]"
                : "border-transparent text-slate-600 hover:text-sky-600 hover:bg-sky-50/50"
            }`}
          >
            <div className={`p-1.5 rounded-xl relative ${activeTab === "pinyin" ? "bg-sky-500 text-white shadow-2xs" : ""}`}>
              <span className="font-extrabold text-xs sm:text-sm leading-none flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5">
                pīn
              </span>
              <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-orange-500 text-[8px] text-white font-black rounded-full shadow-2xs animate-bounce">
                HOT
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap leading-tight">Pinyin</span>
          </button>

          {/* 214 Bộ thủ - Coral Orange */}
          <button
            id="nav-tab-radicals"
            onClick={() => onChangeTab("radicals")}
            className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 sm:px-4 rounded-2xl transition-all cursor-pointer select-none active:scale-90 duration-150 relative min-w-[68px] sm:min-w-[76px] shrink-0 border ${
              activeTab === "radicals"
                ? "bg-orange-50 text-orange-700 font-extrabold shadow-2xs border-orange-200 ring-2 ring-orange-100 scale-[1.02]"
                : "border-transparent text-slate-600 hover:text-orange-600 hover:bg-orange-50/50"
            }`}
          >
            <div className={`p-1.5 rounded-xl relative ${activeTab === "radicals" ? "bg-orange-500 text-white shadow-2xs" : ""}`}>
              <PenTool className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-blue-600 text-[8px] text-white font-black rounded-full shadow-2xs">
                214
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap leading-tight">Bộ thủ</span>
          </button>

          {/* Ngữ pháp - Indigo/Blue */}
          <button
            id="nav-tab-grammar"
            onClick={() => onChangeTab("grammar")}
            className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 sm:px-4 rounded-2xl transition-all cursor-pointer select-none active:scale-90 duration-150 relative min-w-[68px] sm:min-w-[76px] shrink-0 border ${
              activeTab === "grammar"
                ? "bg-indigo-50 text-indigo-700 font-extrabold shadow-2xs border-indigo-200 ring-2 ring-indigo-100 scale-[1.02]"
                : "border-transparent text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50"
            }`}
          >
            <div className={`p-1.5 rounded-xl relative ${activeTab === "grammar" ? "bg-indigo-600 text-white shadow-2xs" : ""}`}>
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-orange-500 text-[8px] text-white font-black rounded-full shadow-2xs">
                HOT
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap leading-tight">Ngữ pháp</span>
          </button>

          {/* Luyện tập - Vibrant Orange */}
          <button
            id="nav-tab-practice"
            onClick={() => onChangeTab("practice")}
            className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 sm:px-4 rounded-2xl transition-all cursor-pointer select-none active:scale-90 duration-150 min-w-[68px] sm:min-w-[76px] shrink-0 border ${
              activeTab === "practice"
                ? "bg-orange-50 text-orange-700 font-extrabold shadow-2xs border-orange-200 ring-2 ring-orange-100 scale-[1.02]"
                : "border-transparent text-slate-600 hover:text-orange-600 hover:bg-orange-50/50"
            }`}
          >
            <div className={`p-1.5 rounded-xl ${activeTab === "practice" ? "bg-orange-500 text-white shadow-2xs" : ""}`}>
              <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap leading-tight">Luyện tập</span>
          </button>

          {/* Từ điển CC-CEDICT - Royal Blue */}
          <button
            id="nav-tab-dictionary"
            onClick={() => onChangeTab("dictionary")}
            className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 sm:px-4 rounded-2xl transition-all cursor-pointer select-none active:scale-90 duration-150 relative min-w-[68px] sm:min-w-[76px] shrink-0 border ${
              activeTab === "dictionary" || activeTab === "vocab"
                ? "bg-blue-50 text-blue-700 font-extrabold shadow-2xs border-blue-200 ring-2 ring-blue-100 scale-[1.02]"
                : "border-transparent text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"
            }`}
          >
            <div className={`p-1.5 rounded-xl relative ${activeTab === "dictionary" || activeTab === "vocab" ? "bg-blue-600 text-white shadow-2xs" : ""}`}>
              <Languages className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-emerald-500 text-[8px] text-white font-black rounded-full shadow-2xs">
                122K
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap leading-tight">Từ điển</span>
          </button>

          {/* Đấu trường Game - Red/Orange */}
          <button
            id="nav-tab-game"
            onClick={() => onChangeTab("game")}
            className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 sm:px-4 rounded-2xl transition-all cursor-pointer select-none active:scale-90 duration-150 relative min-w-[68px] sm:min-w-[76px] shrink-0 border ${
              activeTab === "game"
                ? "bg-rose-50 text-rose-700 font-extrabold shadow-2xs border-rose-200 ring-2 ring-rose-100 scale-[1.02]"
                : "border-transparent text-slate-600 hover:text-rose-600 hover:bg-rose-50/50"
            }`}
          >
            <div className={`p-1.5 rounded-xl relative ${activeTab === "game" ? "bg-rose-500 text-white shadow-2xs" : ""}`}>
              <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-rose-500 text-[8px] text-white font-black rounded-full shadow-2xs animate-bounce">
                HOT
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap leading-tight">Trò chơi</span>
          </button>

          {/* Cá nhân - Blue */}
          <button
            id="nav-tab-profile"
            onClick={() => onChangeTab("profile")}
            className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 sm:px-4 rounded-2xl transition-all cursor-pointer select-none active:scale-90 duration-150 min-w-[68px] sm:min-w-[76px] shrink-0 border ${
              activeTab === "profile"
                ? "bg-blue-50 text-blue-700 font-extrabold shadow-2xs border-blue-200 ring-2 ring-blue-100 scale-[1.02]"
                : "border-transparent text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"
            }`}
          >
            <div className={`p-1.5 rounded-xl ${activeTab === "profile" ? "bg-blue-600 text-white shadow-2xs" : ""}`}>
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap leading-tight">Cá nhân</span>
          </button>

        </div>
      </nav>
    </div>
  );
};
