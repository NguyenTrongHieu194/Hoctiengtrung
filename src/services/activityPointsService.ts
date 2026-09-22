/**
 * activityPointsService.ts
 * 
 * Quản lý cơ chế điểm độ sôi nổi:
 * 1. Online mỗi 10 phút tặng 2 điểm sôi nổi (600 giây = +2 điểm sôi nổi).
 * 2. 10 điểm sôi nổi đổi ra 10 kim cương (Tỷ lệ 10:10 = 1:1, đổi theo mốc 10 điểm).
 * 3. Nạp 1 từ vựng vào kho Mini Game tiêu tốn 1 kim cương (1 từ = 1 💎).
 */

export const ACTIVITY_CONFIG = {
  ONLINE_MINUTES_PER_REWARD: 10,
  ONLINE_SECONDS_PER_REWARD: 600, // 10 phút
  POINTS_PER_ONLINE_REWARD: 2,    // +2 điểm sôi nổi mỗi 10 phút
  EXCHANGE_POINTS_STEP: 10,       // Đổi theo bội số 10 điểm
  EXCHANGE_GEMS_PER_10_POINTS: 10,// 10 điểm = 10 kim cương
  VOCAB_GEM_COST: 1,              // Nạp 1 từ vựng = 1 kim cương
} as const;

const ONLINE_TIMER_KEY = "chinese_app_online_timer_seconds";
const LAST_ACTIVE_TIMESTAMP_KEY = "chinese_app_online_last_timestamp";

/**
 * Lấy số giây online đã tích lũy trong chu kỳ 10 phút hiện tại (0 -> 599)
 */
export function getStoredOnlineSeconds(): number {
  try {
    const raw = localStorage.getItem(ONLINE_TIMER_KEY);
    if (!raw) return 0;
    const val = parseInt(raw, 10);
    return isNaN(val) ? 0 : Math.max(0, val % ACTIVITY_CONFIG.ONLINE_SECONDS_PER_REWARD);
  } catch {
    return 0;
  }
}

/**
 * Lưu số giây online tích lũy
 */
export function setStoredOnlineSeconds(seconds: number): void {
  try {
    localStorage.setItem(
      ONLINE_TIMER_KEY, 
      Math.max(0, Math.floor(seconds % ACTIVITY_CONFIG.ONLINE_SECONDS_PER_REWARD)).toString()
    );
  } catch (err) {
    console.error("Lỗi khi lưu online seconds:", err);
  }
}

/**
 * Tính toán quy đổi điểm sôi nổi sang kim cương
 * @param pointsToExchange Số điểm muốn đổi (phải là bội số của 10)
 * @param currentPoints Số điểm sôi nổi hiện có
 * @returns { success: boolean, gemsAdded: number, pointsDeducted: number, error?: string }
 */
export function exchangePointsForGems(
  pointsToExchange: number,
  currentPoints: number
): {
  success: boolean;
  gemsAdded: number;
  pointsDeducted: number;
  error?: string;
} {
  if (pointsToExchange <= 0) {
    return { success: false, gemsAdded: 0, pointsDeducted: 0, error: "Số điểm đổi phải lớn hơn 0" };
  }

  if (pointsToExchange % ACTIVITY_CONFIG.EXCHANGE_POINTS_STEP !== 0) {
    return {
      success: false,
      gemsAdded: 0,
      pointsDeducted: 0,
      error: `Số điểm đổi phải là bội số của ${ACTIVITY_CONFIG.EXCHANGE_POINTS_STEP} (10, 20, 30,...)`
    };
  }

  if (pointsToExchange > currentPoints) {
    return {
      success: false,
      gemsAdded: 0,
      pointsDeducted: 0,
      error: `Bạn không đủ điểm độ sôi nổi! Hiện có ${currentPoints} điểm, cần ${pointsToExchange} điểm.`
    };
  }

  // 10 điểm = 10 kim cương (Tỷ lệ 1:1)
  const gemsAdded = (pointsToExchange / ACTIVITY_CONFIG.EXCHANGE_POINTS_STEP) * ACTIVITY_CONFIG.EXCHANGE_GEMS_PER_10_POINTS;

  return {
    success: true,
    gemsAdded,
    pointsDeducted: pointsToExchange
  };
}

/**
 * Kiểm tra người dùng có đủ kim cương để nạp từ vựng vào game không
 */
export function canAffordVocabAdd(currentGems: number, wordCount: number = 1): boolean {
  const totalCost = wordCount * ACTIVITY_CONFIG.VOCAB_GEM_COST;
  return (currentGems || 0) >= totalCost;
}

/**
 * Tính chi phí kim cương cho số lượng từ nạp
 */
export function calculateVocabAddCost(wordCount: number): number {
  return Math.max(0, wordCount) * ACTIVITY_CONFIG.VOCAB_GEM_COST;
}

/**
 * Format thời gian giây thành dạng MM:SS
 */
export function formatTimerMMSS(seconds: number): string {
  const remaining = Math.max(0, seconds);
  const m = Math.floor(remaining / 60);
  const s = Math.floor(remaining % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
