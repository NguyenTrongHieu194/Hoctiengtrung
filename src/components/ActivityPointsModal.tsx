import React, { useState } from "react";
import {
  X,
  Zap,
  Clock,
  ArrowRight,
  Sparkles,
  Gamepad2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Gift
} from "lucide-react";
import { UserProfile } from "../types";
import {
  ACTIVITY_CONFIG,
  exchangePointsForGems,
  formatTimerMMSS
} from "../services/activityPointsService";

interface ActivityPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onlineSeconds: number; // 0 - 599
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onNavigateToGameVocab?: () => void;
}

export const ActivityPointsModal: React.FC<ActivityPointsModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onlineSeconds,
  onUpdateProfile,
  onNavigateToGameVocab
}) => {
  const [exchangeAmount, setExchangeAmount] = useState<number>(10);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentPoints = userProfile.activityPoints ?? 0;
  const currentGems = userProfile.gems ?? 0;

  // Tính phần trăm chu kỳ 10 phút hiện tại (600 giây)
  const cycleSeconds = ACTIVITY_CONFIG.ONLINE_SECONDS_PER_REWARD;
  const progressPercent = Math.min(100, Math.floor((onlineSeconds / cycleSeconds) * 100));
  const remainingSeconds = Math.max(0, cycleSeconds - onlineSeconds);

  // Số điểm tối đa có thể đổi (làm tròn xuống bội số của 10)
  const maxExchangablePoints = Math.floor(currentPoints / ACTIVITY_CONFIG.EXCHANGE_POINTS_STEP) * ACTIVITY_CONFIG.EXCHANGE_POINTS_STEP;

  const handleExchange = (points: number) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const result = exchangePointsForGems(points, currentPoints);
    if (!result.success) {
      setErrorMessage(result.error || "Không thể thực hiện quy đổi");
      return;
    }

    const nextPoints = currentPoints - result.pointsDeducted;
    const nextGems = currentGems + result.gemsAdded;

    onUpdateProfile({
      activityPoints: nextPoints,
      gems: nextGems
    });

    setSuccessMessage(`Đổi thành công! Đã chuyển ${result.pointsDeducted} Điểm Sôi Nổi thành +${result.gemsAdded} Kim Cương 💎`);
    
    // Tự động xóa thông báo sau 4s
    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        
        {/* Header with vibrant energy theme */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-5 sm:p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition cursor-pointer"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner text-amber-200">
              <Zap className="w-7 h-7 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  Điểm Độ Sôi Nổi
                </h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/25 text-white">
                  Hoạt Động
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-100 mt-0.5">
                Online học tập tích lũy điểm • Đổi kim cương nạp từ vào Game
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Status Boxes: Activity Points & Gems */}
          <div className="grid grid-cols-2 gap-3">
            {/* Box 1: Điểm Sôi Nổi */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-200 shadow-2xs relative overflow-hidden">
              <div className="flex items-center justify-between text-amber-800 text-xs font-bold mb-1">
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  Điểm Sôi Nổi
                </span>
                <span className="text-[10px] bg-amber-200/80 text-amber-900 px-1.5 py-0.2 rounded font-mono font-bold">
                  ⚡ Sôi nổi
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-950 tracking-tight">
                {currentPoints.toLocaleString()}
              </div>
              <div className="text-[11px] text-amber-700/90 mt-1">
                Có thể đổi: <strong className="font-black text-amber-900">{maxExchangablePoints}</strong> điểm
              </div>
            </div>

            {/* Box 2: Kim Cương */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/60 border border-blue-200 shadow-2xs relative overflow-hidden">
              <div className="flex items-center justify-between text-blue-800 text-xs font-bold mb-1">
                <span className="flex items-center gap-1">
                  <span className="text-sm">💎</span>
                  Kim Cương
                </span>
                <span className="text-[10px] bg-blue-200/80 text-blue-900 px-1.5 py-0.2 rounded font-mono font-bold">
                  Ví ngọc
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-blue-950 tracking-tight">
                {currentGems.toLocaleString()}
              </div>
              <div className="text-[11px] text-blue-700/90 mt-1">
                Dùng nạp từ game (1 💎/từ)
              </div>
            </div>
          </div>

          {/* Section: Live Online Timer */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Tiến trình Online nhận điểm (+2 Điểm)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Online 10 phút = Tặng ngay 2 Điểm Sôi Nổi
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-sm sm:text-base font-black text-amber-600">
                  {formatTimerMMSS(onlineSeconds)} / 10:00
                </span>
                <div className="text-[10px] text-slate-400">
                  Còn {formatTimerMMSS(remainingSeconds)}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 ease-out shadow-xs"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>Đang tính thời gian tự động khi bạn mở app</span>
              <span className="font-bold text-amber-700">{progressPercent}%</span>
            </div>
          </div>

          {/* Feedback messages */}
          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-bold flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Exchange Section: 10 Điểm Sôi Nổi = 10 Kim Cương */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-blue-50/50 to-sky-50/80 border border-indigo-200/90 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-black text-indigo-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Đổi Điểm Sôi Nổi ➜ Kim Cương
                </h3>
                <p className="text-xs text-indigo-700 mt-0.5">
                  Tỷ lệ quy đổi: <strong className="font-bold text-indigo-900">10 Điểm Sôi Nổi = 10 Kim Cương 💎</strong>
                </p>
              </div>
              <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-indigo-600 text-white shadow-xs">
                10 Điểm = 10 💎
              </span>
            </div>

            {/* Quick exchange presets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[10, 20, 50, 100].map((amount) => {
                const canAfford = currentPoints >= amount;
                return (
                  <button
                    key={amount}
                    disabled={!canAfford}
                    onClick={() => handleExchange(amount)}
                    className={`p-2.5 rounded-xl border text-center transition cursor-pointer active:scale-95 flex flex-col items-center justify-center ${
                      canAfford
                        ? "bg-white hover:bg-indigo-50 border-indigo-200 text-slate-800 hover:border-indigo-400 shadow-2xs"
                        : "bg-slate-100/70 border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-600">
                      {amount} Điểm
                    </span>
                    <span className="text-sm font-black text-indigo-700 flex items-center gap-0.5 mt-0.5">
                      = +{amount} 💎
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom / Max Exchange button */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <button
                disabled={maxExchangablePoints < 10}
                onClick={() => handleExchange(maxExchangablePoints)}
                className={`w-full py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer ${
                  maxExchangablePoints >= 10
                    ? "bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-700 text-white shadow-indigo-600/25 active:scale-98"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                }`}
              >
                <Gift className="w-4 h-4" />
                <span>
                  Đổi Tối Đa ({maxExchangablePoints} Điểm ➜ +{maxExchangablePoints} 💎)
                </span>
              </button>
            </div>
          </div>

          {/* Game Vocab Cost Notice */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
            <div className="p-2 rounded-xl bg-amber-200/70 text-amber-800 shrink-0">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <div className="font-black text-slate-900">
                Quy định tiêu tốn kim cương khi nạp từ vựng vào Game:
              </div>
              <p className="text-slate-600 leading-relaxed">
                Mỗi khi bạn bấm <strong>+ Nạp vào Game</strong> để đưa 1 từ mới vào kho Mini Game tự chọn, hệ thống sẽ tiêu tốn <strong>1 Kim Cương (1 💎)</strong>. Bạn có thể online để nhận điểm sôi nổi và đổi kim cương miễn phí không giới hạn!
              </p>
            </div>
          </div>

          {/* Quick Rules Summary */}
          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              Tóm tắt cơ chế điểm & kim cương
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-800 block">1. Online nhận điểm</span>
                <span className="text-slate-500 text-[11px]">Mỗi 10 phút online liên tục/tích lũy tặng ngay 2 Điểm Sôi Nổi.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-800 block">2. Đổi Kim Cương</span>
                <span className="text-slate-500 text-[11px]">10 Điểm Sôi Nổi đổi ra 10 Kim Cương (Bội số 10).</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-bold text-slate-800 block">3. Nạp Từ Game</span>
                <span className="text-slate-500 text-[11px]">Tiêu tốn 1 💎 cho 1 từ vựng nạp vào kho Mini Game.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Càng học nhiều, càng nhận nhiều điểm sôi nổi!
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold transition cursor-pointer ml-auto"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
