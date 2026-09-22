import { WordItem } from "../types";
import { ALL_HSK_VOCABULARY } from "./hskVocab";
import { GARMENT_TERMS } from "./garmentData";
import { COMMON_THEMES_VOCABULARY } from "./commonThemesVocab";
import { getWordHskLevel, isWordGarment } from "./hskMappingData";

export interface CedictEntry {
  id: number;
  trad: string;
  simp: string;
  pinyinNum: string;
  pinyin: string;
  hanViet: string;
  vietnamese: string[];
  english: string[];
  classifiers?: string[];
  hskLevel?: string;
  isGarment?: boolean;
}

export const enrichCedictEntry = (e: CedictEntry): CedictEntry => {
  if (!e) return e;
  let level = e.hskLevel;
  if (!level) {
    level = getWordHskLevel(e.simp) || getWordHskLevel(e.trad);
  }
  if (level) {
    const upper = level.toUpperCase().trim();
    if (upper.startsWith("HSK")) {
      const num = upper.replace("HSK", "").trim();
      level = num ? `HSK ${num}` : "HSK";
    }
  }
  const isGarment = e.isGarment || isWordGarment(e.simp) || isWordGarment(e.trad) || level === "GARMENT";

  return {
    ...e,
    hskLevel: level,
    isGarment
  };
};

/**
 * Generates a unique, disambiguated favorite key for a dictionary entry or word.
 * Prevents multiple homographs or polyphonic readings of the same Hanzi (e.g. 别)
 * from colliding or all being toggled together.
 */
export const getEntryUniqueKey = (entry: {
  id?: number | string;
  simp?: string;
  hanzi?: string;
}): string => {
  const text = entry.simp || entry.hanzi || "";
  if (entry.id !== undefined && entry.id !== null) {
    const idStr = String(entry.id);
    if (idStr.startsWith("hsk") || idStr.startsWith("gm_")) {
      return idStr;
    }
    return `cedict_${idStr}_${text}`;
  }
  return `cedict_${text}`;
};

/**
 * Checks if a dictionary entry is favorited.
 * Prioritizes exact unique keys (e.g. cedict_1206_别), ID matches, and supports legacy keys.
 */
export const isEntryFavorite = (
  entry: { id?: number | string; simp?: string; hanzi?: string },
  favoriteWordIds: string[] = []
): boolean => {
  if (!favoriteWordIds || favoriteWordIds.length === 0) return false;
  const text = entry.simp || entry.hanzi || "";
  const uniqueKey = getEntryUniqueKey(entry);

  // 1. Exact match with disambiguated unique key (e.g. "cedict_1206_别" or "hsk1_5")
  if (favoriteWordIds.includes(uniqueKey)) return true;

  // 2. Numeric / prefixed ID match
  if (entry.id !== undefined && entry.id !== null) {
    const idStr = String(entry.id);
    if (
      favoriteWordIds.includes(idStr) ||
      favoriteWordIds.includes(`cedict_${idStr}`) ||
      favoriteWordIds.some((id) => id.startsWith(`cedict_${idStr}_`))
    ) {
      return true;
    }
  }

  // 3. Legacy compatibility:
  // If user previously saved as "cedict_别" or "别", match ONLY if there are no disambiguated keys for this Hanzi
  const hasDisambiguatedKeyForThisHanzi = favoriteWordIds.some(
    (id) => id.startsWith("cedict_") && id.endsWith(`_${text}`) && id !== `cedict_${text}`
  );
  if (!hasDisambiguatedKeyForThisHanzi) {
    if (favoriteWordIds.includes(`cedict_${text}`) || favoriteWordIds.includes(text)) {
      return true;
    }
  }

  return false;
};

export interface CedictSearchResult {
  entries: CedictEntry[];
  total: number;
  page: number;
  limit: number;
  query: string;
  timeMs: number;
}

export interface SegmentedWord {
  text: string;
  pinyin: string;
  hanViet: string;
  vietnamese: string[];
  english: string[];
  hskLevel?: string;
  isPunctuation: boolean;
}

// Helper: Remove tone marks from pinyin (ā -> a, á -> a, ǎ -> a, à -> a, ü -> v/u, etc.)
export const normalizePinyin = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ü/g, "v")
    .replace(/[^a-z]/g, "");
};

// Helper: Remove Vietnamese diacritics (Tôi -> toi, máy vắt sổ -> may vat so)
export const normalizeVietnamese = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .trim();
};

// Convert WordItem to CedictEntry for uniform UI display
export const wordItemToCedictEntry = (w: WordItem, index: number = 0): CedictEntry => {
  const vDefs = w.vietnamese ? [w.vietnamese] : [];
  const entry: CedictEntry = {
    id: index + 1000000,
    trad: w.hanzi,
    simp: w.hanzi,
    pinyinNum: w.pinyin,
    pinyin: w.pinyin,
    hanViet: w.sinoVietnamese || "",
    vietnamese: vDefs,
    english: [],
    hskLevel: w.hskLevel,
    isGarment: w.isSpecialized || w.hskLevel === "GARMENT"
  };
  return enrichCedictEntry(entry);
};

// Convert CedictEntry to WordItem for Game and Practice compatibility
export const cedictEntryToWordItem = (entry: CedictEntry): WordItem => {
  return {
    id: entry.simp,
    hanzi: entry.simp,
    pinyin: entry.pinyin || entry.pinyinNum || "",
    vietnamese: Array.isArray(entry.vietnamese) ? entry.vietnamese.join("; ") : (entry.vietnamese || ""),
    sinoVietnamese: entry.hanViet || "",
    partOfSpeech: "Từ vựng",
    hskLevel: (entry.hskLevel as any) || "HSK1",
    topic: entry.isGarment ? "Từ chuyên ngành May" : "Từ vựng tra cứu",
    isSpecialized: entry.isGarment
  };
};

// Aggregate all words across the entire app for local fallback
export const getMasterDictionary = (): WordItem[] => {
  const map = new Map<string, WordItem>();

  // 1. All HSK 1-6 standard vocabularies
  ALL_HSK_VOCABULARY.forEach((w) => {
    const key = w.hanzi.trim();
    if (!map.has(key)) {
      map.set(key, w);
    }
  });

  // 2. Garment specialized terms
  GARMENT_TERMS.forEach((w) => {
    const key = w.hanzi.trim();
    if (!map.has(key)) {
      map.set(key, w);
    } else {
      const existing = map.get(key)!;
      if (w.isSpecialized || w.hskLevel === "GARMENT") {
        existing.isSpecialized = true;
      }
    }
  });

  // 3. General & communicative vocabulary
  COMMON_THEMES_VOCABULARY.forEach((w) => {
    const key = w.hanzi.trim();
    if (!map.has(key)) {
      map.set(key, w);
    } else {
      const existing = map.get(key)!;
      if (w.topic) {
        existing.topic = w.topic;
      }
      if (w.exampleSentence && (!existing.exampleSentence || existing.exampleSentence.hanzi.length <= (w.exampleSentence.hanzi?.length || 0))) {
        existing.exampleSentence = w.exampleSentence;
      }
      if (w.vietnamese && w.vietnamese.length >= existing.vietnamese.length) {
        existing.vietnamese = w.vietnamese;
      }
    }
  });

  return Array.from(map.values());
};

// Cached master dictionary
let cachedDictionary: WordItem[] | null = null;

export const getAllDictionaryWords = (): WordItem[] => {
  if (!cachedDictionary) {
    cachedDictionary = getMasterDictionary();
  }
  return cachedDictionary;
};

// Smart synchronous local search
export const searchDictionary = (
  query: string,
  levelFilter: string = "all"
): WordItem[] => {
  const allWords = getAllDictionaryWords();
  const qRaw = query.trim().toLowerCase();

  if (!qRaw) {
    if (levelFilter === "all") {
      return allWords.slice(0, 30);
    }
    if (levelFilter === "GARMENT") {
      return allWords.filter((w) => w.isSpecialized || w.hskLevel === "GARMENT");
    }
    return allWords.filter((w) => w.hskLevel === levelFilter);
  }

  const isChineseChar = /[\u4e00-\u9fa5]/.test(qRaw);
  const qPinyinNorm = normalizePinyin(qRaw);
  const qVnNorm = normalizeVietnamese(qRaw);

  const scoredResults: { word: WordItem; score: number }[] = [];

  for (const word of allWords) {
    if (levelFilter !== "all") {
      if (levelFilter === "GARMENT" || levelFilter === "garment") {
        if (!word.isSpecialized && word.hskLevel !== "GARMENT") continue;
      } else if (levelFilter.toUpperCase().startsWith("HSK")) {
        if (!word.hskLevel || word.hskLevel.toUpperCase() !== levelFilter.toUpperCase()) {
          continue;
        }
      }
    }

    const hanzi = word.hanzi;
    const pinyin = word.pinyin.toLowerCase();
    const pinyinNorm = normalizePinyin(word.pinyin);
    const vn = word.vietnamese.toLowerCase();
    const vnNorm = normalizeVietnamese(word.vietnamese);
    const topic = (word.topic || "").toLowerCase();

    let score = 0;

    // 1. If user typed Chinese characters, ONLY match Chinese hanzi!
    if (isChineseChar) {
      if (hanzi === qRaw) {
        score += 1000;
      } else if (hanzi.startsWith(qRaw)) {
        score += 500 - (hanzi.length - qRaw.length) * 20;
      } else if (hanzi.includes(qRaw)) {
        score += 200 - (hanzi.length - qRaw.length) * 10;
      }
    } else {
      // 2. Latin query: match Pinyin, Vietnamese or Topic
      if (qPinyinNorm && qPinyinNorm.length > 0) {
        if (pinyinNorm === qPinyinNorm || pinyin === qRaw) {
          score += 500;
        } else if (pinyinNorm.startsWith(qPinyinNorm)) {
          score += 250;
        } else if (pinyinNorm.includes(qPinyinNorm)) {
          score += 100;
        }
      }

      if (qVnNorm && qVnNorm.length > 0) {
        if (vnNorm === qVnNorm || vn === qRaw) {
          score += 400;
        } else if (vnNorm.startsWith(qVnNorm) || vn.startsWith(qRaw)) {
          score += 200;
        } else if (vnNorm.includes(qVnNorm) || vn.includes(qRaw)) {
          score += 80;
        }

        const sinoNorm = normalizeVietnamese(word.sinoVietnamese || "");
        if (sinoNorm && (sinoNorm === qVnNorm || sinoNorm.startsWith(qVnNorm))) {
          score += 150;
        }

        if (topic && normalizeVietnamese(topic).includes(qVnNorm)) {
          score += 30;
        }
      }
    }

    if (score > 0) {
      scoredResults.push({ word, score });
    }
  }

  scoredResults.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.word.hanzi.length - b.word.hanzi.length;
  });

  return scoredResults.map((item) => item.word);
};

// ==============================================================
// Remote CC-CEDICT Vietnamese Dictionary API Integration
// ==============================================================

/**
 * Searches the 122,000+ entries CC-CEDICT Vietnamese database on server
 */
export const searchCedictRemote = async (
  query: string,
  options: { limit?: number; page?: number; filter?: string } = {}
): Promise<CedictSearchResult> => {
  const limit = options.limit || 25;
  const page = options.page || 1;
  const filter = options.filter || "all";

  try {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      page: page.toString(),
      filter
    });

    const res = await fetch(`/api/dictionary/search?${params.toString()}`);
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const data: CedictSearchResult = await res.json();
    data.entries = (data.entries || []).map(enrichCedictEntry);
    return data;
  } catch (err) {
    console.warn("Falling back to local dictionary search:", err);
    // Local fallback
    const localWords = searchDictionary(query, filter);
    const startIndex = (page - 1) * limit;
    const paged = localWords.slice(startIndex, startIndex + limit);
    return {
      entries: paged.map((w, idx) => wordItemToCedictEntry(w, startIndex + idx)),
      total: localWords.length,
      page,
      limit,
      query,
      timeMs: 5
    };
  }
};

/**
 * Gets exact definition and character breakdown for a word
 */
export const defineWordRemote = async (
  word: string
): Promise<{
  entries: CedictEntry[];
  characterBreakdown: { char: string; entries: CedictEntry[] }[];
}> => {
  try {
    const res = await fetch(`/api/dictionary/define?word=${encodeURIComponent(word)}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return {
      entries: (json.entries || []).map(enrichCedictEntry),
      characterBreakdown: (json.characterBreakdown || []).map((b: any) => ({
        ...b,
        entries: (b.entries || []).map(enrichCedictEntry)
      }))
    };
  } catch (err) {
    console.warn("Define word remote error:", err);
    const local = searchDictionary(word, "all");
    const entries = local.slice(0, 3).map((w, i) => wordItemToCedictEntry(w, i));
    return {
      entries,
      characterBreakdown: []
    };
  }
};

/**
 * Tokenizes and analyzes a Chinese sentence word-by-word
 */
export const analyzeSentenceRemote = async (
  sentence: string
): Promise<SegmentedWord[]> => {
  try {
    const res = await fetch("/api/dictionary/analyze-sentence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sentence })
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.tokens || [];
  } catch (err) {
    console.warn("Analyze sentence remote error:", err);
    return [];
  }
};

/**
 * Retrieves a random word of the day from CC-CEDICT
 */
export const getRandomWordRemote = async (): Promise<CedictEntry | null> => {
  try {
    const res = await fetch("/api/dictionary/random");
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.word || null;
  } catch (err) {
    console.warn("Random word remote error:", err);
    const words = getAllDictionaryWords();
    if (words.length === 0) return null;
    const rand = words[Math.floor(Math.random() * words.length)];
    return wordItemToCedictEntry(rand);
  }
};

/**
 * Retrieves dictionary metadata and database stats
 */
export const getDictionaryStatsRemote = async (): Promise<any> => {
  try {
    const res = await fetch("/api/dictionary/stats");
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      totalEntries: 122596,
      simplifiedIndexSize: 119043,
      sources: [
        { name: "CC-CEDICT", description: "Từ điển Hán - Anh tiêu chuẩn", entries: 122596 },
        { name: "CVDICT", description: "Bản dịch Hán - Việt tiêu chuẩn CC-CEDICT", entries: 122596 }
      ]
    };
  }
};

/**
 * Batch lookup of multiple entries from server CC-CEDICT database
 */
export const getBatchEntriesRemote = async (words: string[]): Promise<CedictEntry[]> => {
  if (!words || words.length === 0) return [];
  try {
    const res = await fetch("/api/dictionary/batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ words })
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.entries || [];
  } catch (err) {
    console.warn("Batch lookup remote error:", err);
    return [];
  }
};

/**
 * Resolves favorite word IDs (cedict_*, gm_*, or HSK/local word ids) into full CedictEntry objects
 */
export const resolveSavedWordEntries = async (favoriteWordIds: string[]): Promise<CedictEntry[]> => {
  if (!favoriteWordIds || favoriteWordIds.length === 0) return [];

  const results: CedictEntry[] = [];
  const cedictLookups: string[] = [];
  const garmentMap = new Map<string, (typeof GARMENT_TERMS)[0]>();
  GARMENT_TERMS.forEach((gt) => {
    garmentMap.set(gt.id, gt);
    garmentMap.set(gt.hanzi, gt);
  });

  const hskMap = new Map<string, (typeof ALL_HSK_VOCABULARY)[0]>();
  ALL_HSK_VOCABULARY.forEach((hv) => {
    hskMap.set(hv.id, hv);
    hskMap.set(hv.hanzi, hv);
  });

  for (const rawId of favoriteWordIds) {
    // 1. Check if it's a garment term ID
    if (garmentMap.has(rawId)) {
      const g = garmentMap.get(rawId)!;
      results.push({
        id: 900000 + Math.abs(g.id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)),
        simp: g.hanzi,
        trad: g.hanzi,
        pinyinNum: g.pinyin,
        pinyin: g.pinyin,
        hanViet: g.sinoVietnamese || "",
        vietnamese: [g.vietnamese],
        english: g.notes ? [g.notes] : [],
        isGarment: true
      });
      continue;
    }

    // 2. Check if it's in ALL_HSK_VOCABULARY
    if (hskMap.has(rawId)) {
      const h = hskMap.get(rawId)!;
      results.push(wordItemToCedictEntry(h));
      continue;
    }

    // 3. Otherwise, queue for CC-CEDICT remote lookup
    if (rawId) {
      cedictLookups.push(rawId);
    }
  }

  if (cedictLookups.length > 0) {
    const remoteEntries = await getBatchEntriesRemote(cedictLookups);
    const existingIds = new Set(results.map((r) => r.id));
    for (const entry of remoteEntries) {
      if (!existingIds.has(entry.id)) {
        results.push(entry);
        existingIds.add(entry.id);
      }
    }
  }

  return results.map(enrichCedictEntry);
};

