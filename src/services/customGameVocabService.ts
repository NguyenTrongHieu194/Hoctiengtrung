import { WordItem, UserProfile } from "../types";
import {
  getAllDictionaryWords,
  resolveSavedWordEntries,
  CedictEntry,
  cedictEntryToWordItem
} from "../data/dictionaryService";

const STORAGE_KEY = "chinese_custom_game_vocab_ids";
const CACHE_KEY = "chinese_custom_game_vocab_items_cache";
const CUSTOM_EVENT_NAME = "customGameVocabUpdated";

/**
 * Rút gọn nghĩa tiếng Việt cho các trò chơi (Memory Match, Speed Quiz, v.v.)
 * Giúp ô thẻ bài không bị tràn chữ, giữ bố cục gọn gàng, súc tích
 */
export const formatShortGameMeaning = (
  vietnamese: string | string[] | undefined | null,
  maxLength: number = 28
): string => {
  if (!vietnamese) return "";
  const raw = Array.isArray(vietnamese) ? vietnamese.join("; ") : String(vietnamese);

  // Tách theo dấu chấm phẩy (;), gạch chéo (/), hoặc xuống dòng
  const parts = raw.split(/[;\n/]/).map((s) => s.trim()).filter(Boolean);
  if (parts.length === 0) return raw.trim();

  // Làm sạch từng phần: loại bỏ các giải thích phụ trong ngoặc đơn (...) hoặc [...]
  const cleanedParts: string[] = [];
  for (const part of parts) {
    const clean = part
      .replace(/\([^)]*\)/g, "")
      .replace(/（[^）]*）/g, "")
      .replace(/\[[^\]]*\]/g, "")
      .trim();
    if (clean && !cleanedParts.some((existing) => existing.toLowerCase() === clean.toLowerCase())) {
      cleanedParts.push(clean);
    }
  }

  if (cleanedParts.length === 0) {
    const fallback = parts[0].replace(/\([^)]*\)/g, "").trim() || parts[0];
    return fallback.length > maxLength ? fallback.slice(0, maxLength - 1).trim() + "…" : fallback;
  }

  // Ưu tiên 1 nghĩa đầu tiên, nếu còn ngắn thì ghép thêm nghĩa thứ 2
  let result = cleanedParts[0];
  if (cleanedParts.length > 1) {
    const combined = `${result}, ${cleanedParts[1]}`;
    if (combined.length <= maxLength) {
      result = combined;
    }
  }

  if (result.length > maxLength) {
    return result.slice(0, maxLength - 1).trim() + "…";
  }

  return result;
};

/**
 * Lấy cache các WordItem đã được lưu chi tiết
 */
export const getCachedWordItems = (): Record<string, WordItem> => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

/**
 * Lưu cache WordItem vào localStorage
 */
export const saveCachedWordItems = (items: WordItem[]): void => {
  try {
    const cache = getCachedWordItems();
    for (const item of items) {
      if (item && item.hanzi) {
        const hz = item.hanzi.trim();
        cache[hz] = item;
        if (item.id) cache[item.id] = item;
        cache[`cedict_${hz}`] = item;
      }
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (err) {
    console.error("Lỗi khi lưu cache WordItem game:", err);
  }
};

/**
 * Xây dựng bản đồ tra cứu nhanh cả từ ID và Hán tự
 */
const buildLookupMaps = () => {
  const idMap = new Map<string, WordItem>();
  const hanziMap = new Map<string, WordItem>();

  // 1. Tất cả từ trong từ điển tĩnh HSK, May mặc, Giao tiếp
  const allWords = getAllDictionaryWords();
  for (const w of allWords) {
    if (w.id) idMap.set(w.id, w);
    if (w.hanzi) {
      const hz = w.hanzi.trim();
      hanziMap.set(hz, w);
      idMap.set(`cedict_${hz}`, w);
    }
  }

  // 2. Các từ đã được cache từ trước
  const cached = getCachedWordItems();
  for (const [key, w] of Object.entries(cached)) {
    if (w && w.hanzi) {
      const hz = w.hanzi.trim();
      hanziMap.set(hz, w);
      if (w.id) idMap.set(w.id, w);
      idMap.set(key, w);
      idMap.set(`cedict_${hz}`, w);
    }
  }

  return { idMap, hanziMap };
};

/**
 * Lấy danh sách ID các từ vựng người dùng đã chọn cho Game
 */
export const getCustomGameWordIds = (): string[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/**
 * Lưu danh sách ID từ vựng cho Game và phát tín hiệu cho các component
 */
export const saveCustomGameWordIds = (ids: string[]): void => {
  try {
    const uniqueIds = Array.from(new Set(ids.filter(Boolean)));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(uniqueIds));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(CUSTOM_EVENT_NAME, { detail: uniqueIds }));
    }
  } catch (err) {
    console.error("Lỗi khi lưu từ vựng game:", err);
  }
};

/**
 * Kiểm tra 1 từ có nằm trong danh sách game không (khớp cả ID lẫn chữ Hán)
 */
export const isWordInGame = (wordOrId: string): boolean => {
  if (!wordOrId) return false;
  const ids = getCustomGameWordIds();
  if (ids.includes(wordOrId)) return true;

  const clean = wordOrId.replace(/^cedict_/, "").trim();
  if (ids.includes(clean)) return true;

  const { idMap, hanziMap } = buildLookupMaps();
  const item = idMap.get(wordOrId) || hanziMap.get(wordOrId) || hanziMap.get(clean);
  if (item) {
    if (ids.includes(item.id) || ids.includes(item.hanzi)) return true;
  }

  return ids.some((id) => id === wordOrId || id === clean || id.replace(/^cedict_/, "").trim() === clean);
};

// Chuyển đổi input (string, WordItem, hoặc CedictEntry) thành WordItem nếu có thể
function extractWordItemAndId(input: string | WordItem | CedictEntry): { id: string; item?: WordItem } {
  if (typeof input === "string") {
    return { id: input };
  }
  // Check if it's a CedictEntry
  if ("simp" in input && !("partOfSpeech" in input)) {
    const item = cedictEntryToWordItem(input as CedictEntry);
    return { id: input.simp, item };
  }
  // It's a WordItem
  const w = input as WordItem;
  return { id: w.id || w.hanzi, item: w };
}

/**
 * Thêm 1 từ vào kho game
 */
export const addWordToGame = (input: string | WordItem | CedictEntry): void => {
  const { id, item } = extractWordItemAndId(input);
  if (item) {
    saveCachedWordItems([item]);
  }
  const ids = getCustomGameWordIds();
  if (!ids.includes(id)) {
    saveCustomGameWordIds([...ids, id]);
  }
};

/**
 * Gỡ 1 từ khỏi kho game (gỡ cả ID lẫn chữ Hán nếu có)
 */
export const removeWordFromGame = (wordOrId: string): void => {
  const ids = getCustomGameWordIds();
  const clean = wordOrId.replace(/^cedict_/, "").trim();
  const { idMap, hanziMap } = buildLookupMaps();
  const item = idMap.get(wordOrId) || hanziMap.get(wordOrId) || hanziMap.get(clean);

  const targetsToRemove = new Set([wordOrId, clean, `cedict_${clean}`]);
  if (item) {
    if (item.id) targetsToRemove.add(item.id);
    if (item.hanzi) targetsToRemove.add(item.hanzi);
  }

  const nextIds = ids.filter((id) => !targetsToRemove.has(id));
  saveCustomGameWordIds(nextIds);
};

/**
 * Thêm hoặc gỡ từ vựng khỏi kho game (toggle)
 */
export const toggleWordInGame = (input: string | WordItem | CedictEntry): boolean => {
  const { id, item } = extractWordItemAndId(input);
  if (item) {
    saveCachedWordItems([item]);
  }

  if (isWordInGame(id)) {
    removeWordFromGame(id);
    return false;
  } else {
    addWordToGame(input);
    return true;
  }
};

/**
 * Thêm nhiều từ vào kho game cùng lúc
 */
export const addMultipleWordsToGame = (inputs: (string | WordItem | CedictEntry)[]): void => {
  const idsToAdd: string[] = [];
  const itemsToCache: WordItem[] = [];

  for (const input of inputs) {
    const { id, item } = extractWordItemAndId(input);
    idsToAdd.push(id);
    if (item) {
      itemsToCache.push(item);
    }
  }

  if (itemsToCache.length > 0) {
    saveCachedWordItems(itemsToCache);
  }

  const ids = getCustomGameWordIds();
  const nextIds = Array.from(new Set([...ids, ...idsToAdd]));
  saveCustomGameWordIds(nextIds);
};

/**
 * Gỡ nhiều từ khỏi kho game cùng lúc
 */
export const removeMultipleWordsFromGame = (wordOrIds: string[]): void => {
  const ids = getCustomGameWordIds();
  const { idMap, hanziMap } = buildLookupMaps();
  const targetsToRemove = new Set<string>();

  for (const w of wordOrIds) {
    const clean = w.replace(/^cedict_/, "").trim();
    targetsToRemove.add(w);
    targetsToRemove.add(clean);
    targetsToRemove.add(`cedict_${clean}`);

    const item = idMap.get(w) || hanziMap.get(w) || hanziMap.get(clean);
    if (item) {
      if (item.id) targetsToRemove.add(item.id);
      if (item.hanzi) targetsToRemove.add(item.hanzi);
    }
  }

  const nextIds = ids.filter((id) => !targetsToRemove.has(id));
  saveCustomGameWordIds(nextIds);
};

/**
 * Xóa toàn bộ từ vựng tự chọn
 */
export const clearCustomGameWords = (): void => {
  saveCustomGameWordIds([]);
};

// Theo dõi các từ đang được tải ngầm từ CC-CEDICT
const pendingResolutions = new Set<string>();

/**
 * Lấy danh sách đầy đủ WordItem của các từ vựng tự chọn
 * Đảm bảo hỗ trợ cả ID (hsk1_001), chữ Hán (你好), từ trong CC-CEDICT, và cache từ đã lưu
 */
export const getCustomGameWordItems = (): WordItem[] => {
  const ids = getCustomGameWordIds();
  if (ids.length === 0) return [];

  const { idMap, hanziMap } = buildLookupMaps();
  const results: WordItem[] = [];
  const seenHanzi = new Set<string>();
  const unresolvedIds: string[] = [];

  for (const rawId of ids) {
    if (!rawId) continue;
    const clean = rawId.replace(/^cedict_/, "").trim();

    // 1. Tìm trong từ điển chuẩn và cache
    const found =
      idMap.get(rawId) ||
      hanziMap.get(rawId) ||
      hanziMap.get(clean) ||
      idMap.get(clean) ||
      idMap.get(`cedict_${clean}`);

    if (found) {
      if (!seenHanzi.has(found.hanzi)) {
        seenHanzi.add(found.hanzi);
        results.push(found);
      }
    } else {
      // 2. Từ chưa có trong bộ từ điển tĩnh, tạo WordItem fallback ngay để không bị biến mất
      const fallbackHanzi = clean || rawId;
      if (!seenHanzi.has(fallbackHanzi)) {
        seenHanzi.add(fallbackHanzi);
        const fallbackItem: WordItem = {
          id: rawId,
          hanzi: fallbackHanzi,
          pinyin: "",
          vietnamese: fallbackHanzi,
          sinoVietnamese: "",
          partOfSpeech: "Từ vựng",
          hskLevel: "HSK1",
          topic: "Từ vựng tự chọn"
        };
        results.push(fallbackItem);
      }

      if (!pendingResolutions.has(rawId)) {
        unresolvedIds.push(rawId);
      }
    }
  }

  // 3. Tải bất đồng bộ thông tin chi tiết từ CC-CEDICT nếu có từ chưa được cache
  if (unresolvedIds.length > 0) {
    unresolvedIds.forEach((id) => pendingResolutions.add(id));
    resolveSavedWordEntries(unresolvedIds)
      .then((entries) => {
        if (entries && entries.length > 0) {
          const newItems = entries.map(cedictEntryToWordItem);
          saveCachedWordItems(newItems);
          // Phát sự kiện cập nhật để UI tự động render phiên âm & nghĩa tiếng Việt đầy đủ
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent(CUSTOM_EVENT_NAME, { detail: getCustomGameWordIds() }));
          }
        }
      })
      .catch((err) => {
        console.error("Lỗi khi tải thông tin từ vựng game từ từ điển:", err);
      })
      .finally(() => {
        unresolvedIds.forEach((id) => pendingResolutions.delete(id));
      });
  }

  return results;
};

/**
 * Hook / Subscription lắng nghe thay đổi danh sách từ vựng game
 */
export const subscribeCustomGameVocab = (callback: (ids: string[]) => void): (() => void) => {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<string[]>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    } else {
      callback(getCustomGameWordIds());
    }
  };

  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === CACHE_KEY) {
      callback(getCustomGameWordIds());
    }
  };

  window.addEventListener(CUSTOM_EVENT_NAME, handler);
  window.addEventListener("storage", storageHandler);

  return () => {
    window.removeEventListener(CUSTOM_EVENT_NAME, handler);
    window.removeEventListener("storage", storageHandler);
  };
};

/**
 * Thêm 1 từ vào kho Game với chi phí 1 kim cương
 */
export function addWordToGameChargingDiamond(
  input: string | WordItem | CedictEntry,
  userProfile?: UserProfile,
  onUpdateProfile?: (updated: Partial<UserProfile>) => void
): { success: boolean; message: string; remainingGems?: number } {
  const { id } = extractWordItemAndId(input);

  if (isWordInGame(id)) {
    return { success: false, message: "Từ này đã có sẵn trong danh sách Game luyện tập!" };
  }

  const currentGems = userProfile?.gems ?? 0;
  if (currentGems < 1) {
    return {
      success: false,
      message: `Bạn cần 1 💎 để thêm từ vào Game. Hiện tại bạn có ${currentGems} 💎. Hãy tích lũy thêm Điểm Sôi Nổi để đổi Kim Cương nhé!`
    };
  }

  const nextGems = currentGems - 1;
  if (onUpdateProfile) {
    onUpdateProfile({ gems: nextGems });
  }

  addWordToGame(input);
  return {
    success: true,
    message: "Đã thêm từ vào Game để luyện (-1 💎)!",
    remainingGems: nextGems
  };
}
