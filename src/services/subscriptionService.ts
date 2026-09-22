import { UserProfile, MembershipTier, Lesson } from "../types";
import { PROMO_CODES } from "../data/subscriptionPlans";

export interface AiQuotaStatus {
  used: number;
  total: number;
  remaining: number;
  isUnlimited: boolean;
}

export interface LockStatus {
  isLocked: boolean;
  reason?: string;
  requiredTier?: string;
  gemUnlockCost?: number;
}

/**
 * Get current membership tier of user, defaulting to 'free'
 */
export function getUserTier(userProfile?: UserProfile | null): MembershipTier {
  if (!userProfile) return "free";
  
  // Check expiration if applicable
  if (userProfile.membershipTier && userProfile.membershipTier !== "free" && userProfile.membershipTier !== "lifetime") {
    if (userProfile.membershipExpiresAt) {
      const expiresAt = new Date(userProfile.membershipExpiresAt).getTime();
      if (Date.now() > expiresAt) {
        return "free"; // Expired
      }
    }
  }
  
  return userProfile.membershipTier || "free";
}

/**
 * Checks whether user has full PRO access
 */
export function isProUser(userProfile?: UserProfile | null): boolean {
  const tier = getUserTier(userProfile);
  return tier === "pro_monthly" || tier === "pro_annual" || tier === "lifetime";
}

/**
 * Checks whether user has garment industry specialized access
 */
export function hasGarmentAccess(userProfile?: UserProfile | null): boolean {
  const tier = getUserTier(userProfile);
  return tier === "pro_monthly" || tier === "pro_annual" || tier === "lifetime" || tier === "garment_addon";
}

/**
 * Check if a specific HSK lesson is locked for this user
 */
export function checkLessonLock(lesson: Lesson, userProfile?: UserProfile | null): LockStatus {
  // HSK 1 and HSK 2 are completely free for everyone
  if (lesson.hskLevel === "HSK1" || lesson.hskLevel === "HSK2") {
    return { isLocked: false };
  }

  // PRO users have all lessons unlocked
  if (isProUser(userProfile)) {
    return { isLocked: false };
  }

  // Check if specifically unlocked via gems
  if (userProfile?.unlockedLessonIds?.includes(lesson.id)) {
    return { isLocked: false };
  }

  // Free users can preview first 2 lessons of HSK 3, 4, 5, 6
  if (lesson.lessonNumber <= 2) {
    return { isLocked: false };
  }

  return {
    isLocked: true,
    reason: `Bài ${lesson.lessonNumber} (${lesson.hskLevel}) thuộc gói PRO. Bạn có thể nâng cấp PRO hoặc dùng 150 💎 để mở khóa vĩnh viễn.`,
    requiredTier: "PRO",
    gemUnlockCost: 150
  };
}

/**
 * Check if a garment topic is locked
 */
export function checkGarmentTopicLock(topicIndex: number, topicId: string, userProfile?: UserProfile | null): LockStatus {
  if (hasGarmentAccess(userProfile)) {
    return { isLocked: false };
  }

  if (userProfile?.unlockedGarmentTopicIds?.includes(topicId)) {
    return { isLocked: false };
  }

  // First 2 topics are free preview
  if (topicIndex < 2) {
    return { isLocked: false };
  }

  return {
    isLocked: true,
    reason: "Chủ đề này thuộc chuyên đề Tiếng Trung May Mặc Chuyên Sâu. Vui lòng mở khóa để xem toàn bộ từ vựng & hội thoại.",
    requiredTier: "Gói May Mặc / PRO",
    gemUnlockCost: 120
  };
}

/**
 * Get AI Tutor daily quota status
 */
export function getDailyAiQuota(userProfile?: UserProfile | null): AiQuotaStatus {
  const tier = getUserTier(userProfile);
  const today = new Date().toISOString().split("T")[0];

  if (tier === "pro_annual" || tier === "lifetime") {
    return {
      used: 0,
      total: Infinity,
      remaining: Infinity,
      isUnlimited: true
    };
  }

  const limit = tier === "pro_monthly" ? 100 : 5;
  const lastDate = userProfile?.lastAiUsageDate || "";
  const currentCount = (lastDate === today) ? (userProfile?.dailyAiUsageCount || 0) : 0;

  return {
    used: currentCount,
    total: limit,
    remaining: Math.max(0, limit - currentCount),
    isUnlimited: false
  };
}

/**
 * Consume one AI request quota
 * Returns true if allowed, false if quota exceeded
 */
export function consumeAiQuota(
  userProfile: UserProfile, 
  onUpdateProfile: (u: Partial<UserProfile>) => void
): boolean {
  const quota = getDailyAiQuota(userProfile);
  if (quota.isUnlimited) return true;

  if (quota.remaining <= 0) {
    return false;
  }

  const today = new Date().toISOString().split("T")[0];
  const lastDate = userProfile.lastAiUsageDate || "";
  const newCount = (lastDate === today) ? ((userProfile.dailyAiUsageCount || 0) + 1) : 1;

  onUpdateProfile({
    dailyAiUsageCount: newCount,
    lastAiUsageDate: today
  });

  return true;
}

/**
 * Unlock a lesson using earned Gems
 */
export function unlockLessonWithGems(
  lessonId: string, 
  cost: number, 
  userProfile: UserProfile,
  onUpdateProfile: (u: Partial<UserProfile>) => void
): { success: boolean; message: string } {
  const currentGems = userProfile.gems || 0;
  if (currentGems < cost) {
    return {
      success: false,
      message: `Bạn cần ${cost} 💎 Kim cương, hiện tại bạn đang có ${currentGems} 💎. Hãy hoàn thành bài học và duy trì Streak để tích thêm nhé!`
    };
  }

  const currentUnlocked = userProfile.unlockedLessonIds || [];
  if (currentUnlocked.includes(lessonId)) {
    return { success: true, message: "Bài học đã được mở khóa trước đó." };
  }

  onUpdateProfile({
    gems: currentGems - cost,
    unlockedLessonIds: [...currentUnlocked, lessonId]
  });

  return {
    success: true,
    message: `Đã mở khóa bài học thành công! Bạn còn ${currentGems - cost} 💎.`
  };
}

/**
 * Unlock a garment topic using earned Gems
 */
export function unlockGarmentTopicWithGems(
  topicId: string,
  cost: number,
  userProfile: UserProfile,
  onUpdateProfile: (u: Partial<UserProfile>) => void
): { success: boolean; message: string } {
  const currentGems = userProfile.gems || 0;
  if (currentGems < cost) {
    return {
      success: false,
      message: `Bạn cần ${cost} 💎 Kim cương, hiện bạn có ${currentGems} 💎.`
    };
  }

  const currentUnlocked = userProfile.unlockedGarmentTopicIds || [];
  if (currentUnlocked.includes(topicId)) {
    return { success: true, message: "Chủ đề đã được mở khóa." };
  }

  onUpdateProfile({
    gems: currentGems - cost,
    unlockedGarmentTopicIds: [...currentUnlocked, topicId]
  });

  return {
    success: true,
    message: `Mở khóa chuyên đề thành công! Số dư: ${currentGems - cost} 💎.`
  };
}

/**
 * Unlock any content (lesson or garment topic) using earned Gems
 */
export function unlockWithGems(
  id: string,
  cost: number,
  userProfile: UserProfile,
  onUpdateProfile: (u: Partial<UserProfile>) => void
): { success: boolean; message: string } {
  if (id.startsWith("g_") || id.startsWith("garment_") || id.startsWith("dlg_") || id.startsWith("d_")) {
    return unlockGarmentTopicWithGems(id, cost, userProfile, onUpdateProfile);
  }
  return unlockLessonWithGems(id, cost, userProfile, onUpdateProfile);
}

/**
 * Validates a promo code
 */
export function validatePromoCode(code: string): { valid: boolean; discountPercent: number; description: string; message: string } {
  const cleanCode = code.trim().toUpperCase();
  const promo = PROMO_CODES[cleanCode];

  if (promo) {
    return {
      valid: true,
      discountPercent: promo.discountPercent,
      description: promo.description,
      message: `Áp dụng thành công mã ${cleanCode}: ${promo.description} (-${promo.discountPercent}%)`
    };
  }

  return {
    valid: false,
    discountPercent: 0,
    description: "",
    message: "Mã giảm giá không hợp lệ hoặc đã hết hạn."
  };
}

/**
 * Simulate or perform subscription upgrade
 */
export function activateSubscriptionTier(
  tier: MembershipTier,
  userProfile: UserProfile,
  onUpdateProfile: (u: Partial<UserProfile>) => void
) {
  let expiresAt: string | undefined = undefined;
  const now = new Date();

  if (tier === "pro_monthly") {
    now.setMonth(now.getMonth() + 1);
    expiresAt = now.toISOString();
  } else if (tier === "pro_annual") {
    now.setFullYear(now.getFullYear() + 1);
    expiresAt = now.toISOString();
  } else if (tier === "lifetime" || tier === "garment_addon") {
    expiresAt = undefined; // Forever
  }

  onUpdateProfile({
    membershipTier: tier,
    membershipExpiresAt: expiresAt,
    gems: (userProfile.gems || 0) + (tier === "pro_annual" ? 500 : tier === "lifetime" ? 1000 : 100)
  });
}
