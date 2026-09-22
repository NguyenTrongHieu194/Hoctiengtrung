import React, { useEffect } from "react";
import { Zap, X, ArrowRight, Sparkles } from "lucide-react";

interface OnlineRewardToastProps {
  show: boolean;
  pointsAdded: number;
  onClose: () => void;
  onOpenExchange: () => void;
}

export const OnlineRewardToast: React.FC<OnlineRewardToastProps> = ({
  show,
  pointsAdded,
  onClose,
  onOpenExchange
}) => {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onClose();
    }, 7000);
    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 sm:bottom-6 sm:right-6 sm:left-auto sm:translate-x-0 z-50 animate-bounce-short max-w-[95vw] sm:max-w-md">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-amber-400/60 flex items-center gap-3 backdrop-blur-md">
        
        {/* Animated Icon */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-white shadow-md shadow-amber-500/40 shrink-0">
          <Zap className="w-6 h-6 fill-current animate-pulse" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-black text-amber-300">
              +{pointsAdded} Điểm Sôi Nổi
            </span>
            <span className="text-[10px] bg-amber-400/20 text-amber-200 border border-amber-400/40 px-1.5 py-0.2 rounded font-bold">
              Online 10 phút 🎉
            </span>
          </div>
          <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
            10 điểm sôi nổi có thể đổi ngay ra 10 Kim Cương 💎
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenExchange();
            }}
            className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black transition cursor-pointer flex items-center gap-1 shadow-sm active:scale-95"
          >
            <span>Đổi 💎</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
            title="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
