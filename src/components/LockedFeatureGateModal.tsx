import React from "react";
import { 
  X, 
  Lock, 
  Crown, 
  Sparkles, 
  CheckCircle2, 
  Gem, 
  BookOpen, 
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { UserProfile, Lesson } from "../types";
import { unlockLessonWithGems, unlockGarmentTopicWithGems } from "../services/subscriptionService";

export interface LockedGateData {
  type: "lesson" | "garment_topic" | "ai_limit" | "mock_test";
  title: string;
  subtitle?: string;
  hskLevel?: string;
  lessonNumber?: number;
  id?: string;
  gemCost: number;
  previewSummary?: string[];
}

interface LockedFeatureGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: LockedGateData | null;
  userProfile: UserProfile;
  onUpdateProfile: (u: Partial<UserProfile>) => void;
  onOpenSubscriptionModal: () => void;
  onSuccessUnlock?: () => void;
}

export const LockedFeatureGateModal: React.FC<LockedFeatureGateModalProps> = ({
  isOpen,
  onClose,
  data,
  userProfile,
  onUpdateProfile,
  onOpenSubscriptionModal,
  onSuccessUnlock
}) => {
  if (!isOpen || !data) return null;

  const currentGems = userProfile.gems ?? 0;

  const handleUnlockWithGems = () => {
    if (data.type === "lesson" && data.id) {
      const res = unlockLessonWithGems(data.id, data.gemCost, userProfile, onUpdateProfile);
      if (res.success) {
        onSuccessUnlock?.();
        onClose();
      } else {
        alert(res.message);
      }
    } else if (data.type === "garment_topic" && data.id) {
      const res = unlockGarmentTopicWithGems(data.id, data.gemCost, userProfile, onUpdateProfile);
      if (res.success) {
        onSuccessUnlock?.();
        onClose();
      } else {
        alert(res.message);
      }
    }
  };

  const hasEnoughGems = currentGems >= data.gemCost;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto p-5 sm:p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Lock Icon & Title */}
        <div className="flex flex-col items-center text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-amber-100 to-orange-100 text-amber-600 flex items-center justify-center shadow-inner border border-amber-200/80">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
              {data.hskLevel ? `${data.hskLevel} • Bài ${data.lessonNumber}` : "Nội Dung Nâng Cao"}
            </span>
            <h3 className="text-lg font-black text-slate-900 mt-1">{data.title}</h3>
            {data.subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{data.subtitle}</p>
            )}
          </div>
        </div>

        {/* What's inside this lesson */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <span className="text-xs font-bold text-slate-700 block">Kiến thức bạn sẽ làm chủ trong bài:</span>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {data.previewSummary && data.previewSummary.length > 0 ? (
              data.previewSummary.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Toàn bộ từ vựng trọng tâm & mẫu câu hội thoại chuẩn</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Giải thích ngữ pháp chuyên sâu & bài tập củng cố</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Luyện nghe & phát âm chuẩn bản xứ</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* 2 Ways to Unlock */}
        <div className="space-y-2.5">
          {/* Option 1: PRO Upgrade (Recommended) */}
          <button
            onClick={() => {
              onClose();
              onOpenSubscriptionModal();
            }}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm shadow-md shadow-orange-500/20 flex items-center justify-between transition-all active:scale-95 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              <span>Nâng Cấp PRO Mở Khóa Tất Cả</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-lg">
              <span>Chỉ từ 41k/tháng</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>

          {/* Option 2: Unlock with Gems (Gamification) */}
          <div className="p-3 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-base">💎</span>
              <div>
                <span className="text-xs font-bold text-slate-800 block">Dùng Kim Cương (Gems)</span>
                <span className="text-[11px] text-slate-500">
                  Số dư: <strong className="text-blue-600 font-mono">{currentGems} 💎</strong>
                </span>
              </div>
            </div>

            <button
              onClick={handleUnlockWithGems}
              disabled={!hasEnoughGems}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                hasEnoughGems
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm cursor-pointer"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              Mở khóa ({data.gemCost} 💎)
            </button>
          </div>
        </div>

        {/* Polite note */}
        <p className="text-[11px] text-center text-slate-400">
          💡 Bạn có thể kiếm thêm kim cương miễn phí bằng cách duy trì Streak và làm bài kiểm tra hàng ngày!
        </p>
      </div>
    </div>
  );
};
