import React, { useState, useEffect } from "react";
import { 
  User, 
  Flame, 
  BookOpen, 
  Award, 
  Clock, 
  Bell, 
  BellRing, 
  Moon, 
  Sun, 
  LogOut, 
  LogIn, 
  Sparkles, 
  CheckCircle2, 
  Scissors, 
  Mic, 
  ShieldCheck,
  TrendingUp,
  Cloud,
  CloudCheck,
  RefreshCw,
  Database,
  Smartphone,
  Check,
  Crown,
  Zap,
  Lock,
  ArrowRight,
  Bookmark
} from "lucide-react";
import { UserProfile, UserProgressData, HSKLevelId } from "../types";
import { HSK_LEVELS } from "../data/hskData";
import { LearningAnalyticsDashboard } from "./LearningAnalyticsDashboard";
import { subscribeSyncStatus, saveUserProfile, saveUserProgress } from "../services/dbService";
import { getUserTier, isProUser, getDailyAiQuota } from "../services/subscriptionService";
import { SUBSCRIPTION_PLANS } from "../data/subscriptionPlans";

interface ProfileViewProps {
  userProfile: UserProfile;
  userProgress: UserProgressData;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onGoogleSignIn: () => void;
  onSignOut: () => void;
  onOpenSubscriptionModal?: () => void;
  onOpenSavedWords?: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  userProgress,
  onUpdateProfile,
  onGoogleSignIn,
  onSignOut,
  onOpenSubscriptionModal,
  onOpenSavedWords,
  darkMode,
  onToggleDarkMode
}) => {
  const [reminderTime, setReminderTime] = useState(userProfile.dailyReminderTime || "20:00");
  const [reminderEnabled, setReminderEnabled] = useState(userProfile.notificationEnabled);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [isManualSyncing, setIsManualSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState("");
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "synced" | "error">("idle");

  const isGuest = !userProfile.email || userProfile.email.includes("guest");
  const currentTier = getUserTier(userProfile);
  const isPro = isProUser(userProfile);
  const aiQuota = getDailyAiQuota(userProfile);
  const planInfo = SUBSCRIPTION_PLANS.find(p => p.id === currentTier) || SUBSCRIPTION_PLANS[0];

  useEffect(() => {
    const unsub = subscribeSyncStatus((status) => {
      setSyncStatus(status);
    });
    return unsub;
  }, []);

  const handleManualSync = async () => {
    setIsManualSyncing(true);
    setSyncFeedback("Đang đồng bộ dữ liệu với Google Cloud...");
    try {
      await saveUserProfile(userProfile);
      await saveUserProgress(userProgress);
      setSyncFeedback("✓ Đã đồng bộ thành công toàn bộ tiến trình học tập lên Cloud Firestore!");
    } catch (err) {
      setSyncFeedback("Đã lưu vào bộ nhớ cục bộ (Offline)");
    } finally {
      setIsManualSyncing(false);
      setTimeout(() => setSyncFeedback(""), 4000);
    }
  };

  const handleToggleReminder = async () => {
    const nextState = !reminderEnabled;
    setReminderEnabled(nextState);
    onUpdateProfile({ notificationEnabled: nextState, dailyReminderTime: reminderTime });

    if (nextState && typeof window !== "undefined" && "Notification" in window) {
      const perm = await Notification.requestPermission();
      if (perm === "granted") {
        setNotificationMsg("✓ Đã bật thông báo nhắc nhở học tập hàng ngày vào lúc " + reminderTime);
      } else {
        setNotificationMsg("⚠️ Vui lòng cấp quyền thông báo trên trình duyệt để nhận lời nhắc học tập.");
      }
    } else {
      setNotificationMsg("Đã tắt nhắc nhở học tập.");
    }

    setTimeout(() => setNotificationMsg(""), 4000);
  };

  const handleSaveReminderTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value;
    setReminderTime(time);
    onUpdateProfile({ dailyReminderTime: time });
  };

  const badges = [
    {
      id: "first_day",
      title: "Ngày đầu nhập môn",
      description: "Bắt đầu hành trình học tiếng Trung",
      icon: "🌟",
      unlocked: true
    },
    {
      id: "streak_3",
      title: "Chiến binh kiên trì",
      description: "Duy trì chuỗi học 3 ngày liên tiếp",
      icon: "🔥",
      unlocked: userProfile.streakDays >= 3
    },
    {
      id: "garment_starter",
      title: "Chuyên gia May mặc",
      description: "Học trên 10 thuật ngữ xưởng may",
      icon: "✂️",
      unlocked: true
    },
    {
      id: "speaking_master",
      title: "Bậc thầy Phát âm",
      description: "Luyện nói trên 10 câu thoại",
      icon: "🎙️",
      unlocked: userProgress.speakingPracticedCount >= 10
    },
    {
      id: "hsk_conqueror",
      title: "Chinh phục HSK 1",
      description: "Hoàn thành các bài học cốt lõi HSK 1",
      icon: "🎓",
      unlocked: userProgress.completedLessonIds.length >= 1
    }
  ];

  return (
    <div className="space-y-6 pb-12 animate-fadeIn max-w-3xl w-full mx-auto overflow-hidden">
      {/* 1. Profile & Google Auth Information Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-md shadow-blue-500/20 border-2 border-white overflow-hidden shrink-0">
              {userProfile.photoURL ? (
                <img
                  src={userProfile.photoURL}
                  alt={userProfile.displayName}
                  className="w-full h-full rounded-3xl object-cover"
                />
              ) : (
                userProfile.displayName.charAt(0).toUpperCase()
              )}
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h2 className="text-xl font-black text-slate-900">
                  {userProfile.displayName}
                </h2>
                {!isGuest ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold" title="Tài khoản Google đã kết nối">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Google Account</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
                    <span>Khách</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {isGuest ? "Tài khoản tạm thời • Đăng nhập Google để sao lưu vĩnh viễn" : userProfile.email}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3.5">
                <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold">
                  Cấp độ: {userProfile.currentHskLevel}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-xs font-bold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{userProfile.streakDays} ngày liên tiếp</span>
                </span>
                <span className="px-3.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100 text-xs font-bold">
                  💎 {userProgress.totalXP.toLocaleString()} XP
                </span>
              </div>
            </div>
          </div>

          {/* Auth Action Button */}
          <div className="shrink-0">
            {isGuest ? (
              <button
                id="google-signin-btn"
                onClick={onGoogleSignIn}
                className="px-4 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-blue-200 flex items-center gap-2.5 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Đăng nhập Google</span>
              </button>
            ) : (
              <button
                id="signout-btn"
                onClick={onSignOut}
                className="px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              >
                <LogOut className="w-4 h-4" />
                <span>Đăng xuất</span>
              </button>
            )}
          </div>
        </div>

        {/* Cloud Persistence & Realtime Status Box */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs bg-slate-50/80 -mx-6 -mb-6 p-4 sm:px-6 rounded-b-3xl">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              !isGuest ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
            }`}>
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-800">
                {!isGuest ? "Đám mây Firestore: Đã kết nối & Tự động lưu" : "Lưu trữ: Bộ nhớ cục bộ (Offline)"}
              </p>
              <p className="text-[11px] text-slate-500">
                {!isGuest 
                  ? "Mọi thay đổi XP, từ vựng và bài học đều được đồng bộ tức thì." 
                  : "Đăng nhập bằng tài khoản Google để không bị mất dữ liệu khi đổi thiết bị."}
              </p>
            </div>
          </div>

          <button
            onClick={handleManualSync}
            disabled={isManualSyncing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 font-bold text-xs shadow-2xs transition-all cursor-pointer shrink-0 active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isManualSyncing ? "animate-spin text-blue-600" : ""}`} />
            <span>{isManualSyncing ? "Đang đồng bộ..." : "Đồng bộ ngay"}</span>
          </button>
        </div>
      </div>

      {syncFeedback && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{syncFeedback}</span>
        </div>
      )}

      {/* 2. Membership Tier & Subscription Plan Card */}
      <div className={`p-6 rounded-3xl border transition-all relative overflow-hidden ${
        isPro 
          ? "bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-white border-amber-300 shadow-md shadow-amber-500/10" 
          : "bg-white border-slate-200 shadow-xs"
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
              isPro 
                ? "bg-gradient-to-tr from-amber-500 to-orange-500 text-white" 
                : "bg-slate-100 text-slate-600"
            }`}>
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gói hội viên hiện tại</span>
                <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                  isPro 
                    ? "bg-amber-100 text-amber-800 border border-amber-300" 
                    : "bg-slate-100 text-slate-700 border border-slate-200"
                }`}>
                  {planInfo.name}
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 mt-1">
                {isPro ? "Bạn đang sở hữu toàn bộ đặc quyền VIP" : "Tài khoản Miễn phí (Freemium)"}
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {isPro 
                  ? "Truy cập toàn bộ 6 cấp độ HSK 1-6, không giới hạn AI Gemini Thầy giáo, trọn bộ hội thoại xưởng may và không quảng cáo." 
                  : `Đã dùng ${aiQuota.used}/${aiQuota.total} lượt hỏi AI hôm nay • Mở khóa sẵn toàn bộ HSK 1 và 20% HSK 2.`}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            {onOpenSubscriptionModal && (
              <button
                id="profile-upgrade-btn"
                onClick={onOpenSubscriptionModal}
                className={`px-5 py-2.5 rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                  isPro 
                    ? "bg-white hover:bg-slate-50 text-slate-800 border border-slate-200" 
                    : "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white shadow-orange-500/20 hover:scale-[1.02]"
                }`}
              >
                <Crown className="w-4 h-4" />
                <span>{isPro ? "Xem chi tiết gói cước" : "Nâng cấp lên PRO VIP"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="text-[11px] text-slate-400 font-medium text-center sm:text-right">
              Số dư ngọc: <strong className="text-amber-600">💎 {(userProfile.gems || 0).toLocaleString()}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Target HSK Level Customization */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Award className="w-4 h-4 text-blue-600" />
          <span>Mục tiêu chứng chỉ HSK của bạn</span>
        </h3>
        <p className="text-xs text-slate-500">
          Chọn cấp độ mục tiêu để hệ thống cá nhân hóa bài tập và từ vựng phù hợp:
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
          {HSK_LEVELS.map((lvl) => {
            const isTarget = userProfile.targetHskLevel === lvl.id;
            return (
              <button
                key={lvl.id}
                onClick={() => onUpdateProfile({ targetHskLevel: lvl.id })}
                className={`py-3.5 px-2 rounded-2xl text-center border transition-all cursor-pointer ${
                  isTarget
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200 font-bold"
                    : "bg-white text-slate-700 border-slate-200/80 hover:border-blue-200"
                }`}
              >
                <span className="block text-xs font-bold">{lvl.name}</span>
                <span className="text-[10px] opacity-75">{lvl.totalWords} từ</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sổ tay từ đã lưu (Saved Words Notebook) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-50/70 via-white to-orange-50/50 border border-rose-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/25 shrink-0">
            <Bookmark className="w-6 h-6 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Sổ tay từ vựng đã đánh dấu
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-xs font-black border border-rose-200">
                {userProgress?.favoriteWordIds?.length ?? 0} từ
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Danh sách các từ vựng bạn đã lưu để tra cứu nhanh, ôn tập Flashcard hoặc nghe phát âm
            </p>
          </div>
        </div>

        {onOpenSavedWords && (
          <button
            id="profile-open-saved-words-btn"
            onClick={onOpenSavedWords}
            className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-bold text-xs shadow-md shadow-rose-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <span>Mở sổ tay từ vựng</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 3. Recharts Learning Analytics & Progress Dashboard */}
      <LearningAnalyticsDashboard
        userProfile={userProfile}
        userProgress={userProgress}
        darkMode={darkMode}
      />

      {/* 4. Daily Study Reminder Notification Settings */}
      <div className="p-6 rounded-3xl bg-white  border border-slate-100  shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50  text-amber-600 flex items-center justify-center">
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Nhắc nhở học tập hàng ngày
              </h3>
              <p className="text-xs text-slate-500">
                Thông báo nhắc nhở duy trì chuỗi học (Streak) không bị đứt quãng
              </p>
            </div>
          </div>

          <button
            onClick={handleToggleReminder}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
              reminderEnabled ?"bg-blue-600" :"bg-slate-300"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                reminderEnabled ?"translate-x-6" :"translate-x-0"
              }`}
            />
          </button>
        </div>

        {reminderEnabled && (
          <div className="p-4 rounded-2xl bg-slate-50  border border-slate-100  flex items-center justify-between text-xs animate-fadeIn">
            <span className="font-bold text-slate-700">
              Giờ nhắc nhở mỗi ngày:
            </span>
            <input
              type="time"
              value={reminderTime}
              onChange={handleSaveReminderTime}
              className="bg-white  px-3 py-1.5 rounded-xl border border-slate-200  font-bold text-slate-800"
            />
          </div>
        )}

        {notificationMsg && (
          <p className="text-xs text-emerald-600  font-semibold bg-emerald-50  p-2.5 rounded-xl border border-emerald-200">
            {notificationMsg}
          </p>
        )}
      </div>

      {/* 4. Achievement Badges */}
      <div className="p-6 rounded-3xl bg-white  border border-slate-100  shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800  flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Huy hiệu & Thành tựu ({badges.filter((b) => b.unlocked).length}/{badges.length})</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-2xl border flex items-center gap-3.5 transition-all ${
                b.unlocked
                  ?"bg-gradient-to-r from-blue-50/40 to-indigo-50/20   border-blue-100"
                  :"bg-slate-50  border-slate-100  opacity-50 grayscale"
              }`}
            >
              <div className="text-2xl">{b.icon}</div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">{b.title}</h4>
                <p className="text-[11px] text-slate-500">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. App Preferences */}
      <div className="p-6 rounded-3xl bg-white  border border-slate-100  shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Giao diện Tối (Dark Mode)</h3>
          <p className="text-xs text-slate-500">Bảo vệ mắt khi học tiếng Trung vào ban đêm</p>
        </div>

        <button
          onClick={onToggleDarkMode}
          className="p-2.5 rounded-2xl bg-slate-100  text-slate-700  border border-slate-200  cursor-pointer"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};
