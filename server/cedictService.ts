import fs from "fs";
import path from "path";
import zlib from "zlib";
import { fileURLToPath } from "url";

let currentDir = process.cwd();
try {
  if (typeof __dirname !== "undefined" && __dirname) {
    currentDir = __dirname;
  } else if (typeof import.meta !== "undefined" && import.meta && import.meta.url) {
    currentDir = path.dirname(fileURLToPath(import.meta.url));
  }
} catch {
  currentDir = process.cwd();
}

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

export interface SearchResult {
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

// In-memory data structures
let allEntries: CedictEntry[] = [];
const simpIndex = new Map<string, CedictEntry[]>();
const tradIndex = new Map<string, CedictEntry[]>();
const pinyinCleanIndex = new Map<string, CedictEntry[]>();
const pinyinNumIndex = new Map<string, CedictEntry[]>();
const hanVietExactIndex = new Map<string, number[]>();
const hanVietNormIndex = new Map<string, number[]>();
const vietWordIndex = new Map<string, number[]>();     // exact accented word -> entry ids
const vietNormWordIndex = new Map<string, number[]>(); // normalized unaccented word -> entry ids
let isInitialized = false;
let initPromise: Promise<boolean> | null = null;

// Static references so @vercel/nft traces and bundles data files for Vercel Serverless Functions
const _nftTracedFiles = [
  path.join(process.cwd(), "api/data/cedict_vn.tsv.gz"),
  path.join(process.cwd(), "public/data/cedict_vn.tsv.gz"),
  path.join(process.cwd(), "server/data/cedict_vn.tsv.gz"),
  path.join(process.cwd(), "data/cedict_vn.tsv.gz"),
  path.join(process.cwd(), "api/data/hsk_map.json"),
  path.join(process.cwd(), "public/data/hsk_map.json"),
  path.join(process.cwd(), "data/hsk_map.json")
];
void _nftTracedFiles;

// HSK & Garment sets
const HSK_LEVEL_MAP = new Map<string, string>();
const GARMENT_WORDS_SET = new Set<string>();

export function normalizeVietnamese(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .trim();
}

export function normalizePinyin(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ü/g, "v")
    .replace(/[^a-z]/g, "");
}

function extractClassifiers(vDefs: string[]): { cleanedDefs: string[]; classifiers: string[] } {
  const classifiers: string[] = [];
  const cleanedDefs: string[] = [];

  for (const d of vDefs) {
    if (d.startsWith("LT:") || d.startsWith("CL:")) {
      classifiers.push(d.replace(/^(LT|CL):/, "Lượng từ: "));
    } else {
      cleanedDefs.push(d);
    }
  }

  return { cleanedDefs, classifiers };
}

function searchFileRecursively(dir: string, filename: string, maxDepth: number = 3): string | null {
  try {
    if (!fs.existsSync(dir) || maxDepth < 0) return null;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isFile() && entry.name === filename) {
        return fullPath;
      }
      if (
        entry.isDirectory() &&
        entry.name !== "node_modules" &&
        entry.name !== ".git" &&
        entry.name !== ".next"
      ) {
        const found = searchFileRecursively(fullPath, filename, maxDepth - 1);
        if (found) return found;
      }
    }
  } catch {
    // Ignore permissions/access errors
  }
  return null;
}

export function findDataFilePath(filename: string): string | null {
  const candidates = [
    path.join(process.cwd(), "data", filename),
    path.join(process.cwd(), "api", "data", filename),
    path.join(process.cwd(), "server", "data", filename),
    path.join(process.cwd(), "public", "data", filename),
    path.join(process.cwd(), "dist", "data", filename),
    path.join(currentDir, "data", filename),
    path.join(currentDir, "..", "data", filename),
    path.join(currentDir, "..", "api", "data", filename),
    path.join(currentDir, "..", "server", "data", filename),
    path.join(currentDir, "..", "public", "data", filename),
    path.join(currentDir, "..", "..", "data", filename),
    path.join(currentDir, "..", "..", "api", "data", filename),
    path.join(currentDir, "..", "..", "public", "data", filename),
    path.resolve("data", filename),
    path.resolve("api/data", filename),
    path.resolve("server/data", filename),
    path.resolve("public/data", filename),
    path.resolve("./server/data", filename),
    path.resolve("../server/data", filename),
    path.join("/tmp", filename),
    path.join("/var/task", "data", filename),
    path.join("/var/task", "api", "data", filename),
    path.join("/var/task", "server", "data", filename),
    path.join("/var/task", "public", "data", filename),
    path.join("/var/task", "dist", "data", filename),
    path.join("/var/task", filename)
  ];
  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    } catch {}
  }

  // Fallback: search recursively in process.cwd() and /var/task
  const foundInCwd = searchFileRecursively(process.cwd(), filename, 3);
  if (foundInCwd) return foundInCwd;

  if (fs.existsSync("/var/task")) {
    const foundInTask = searchFileRecursively("/var/task", filename, 4);
    if (foundInTask) return foundInTask;
  }

  return null;
}

/**
 * Loads HSK mapping and Garment terms with thorough cleanup and expansion
 */
function loadMetadataMaps(): void {
  try {
    const metaPath = findDataFilePath("hsk_map.json");
    if (metaPath) {
      const data = JSON.parse(fs.readFileSync(metaPath, "utf8"));
      if (data.hsk) {
        for (const [hanzi, level] of Object.entries(data.hsk)) {
          const lvl = level as string;
          HSK_LEVEL_MAP.set(hanzi, lvl);
          // Also strip parentheses e.g. "这 (这儿)" -> add "这" and "这儿"
          const cleanK = hanzi.replace(/\s*\([^)]*\)/g, "").trim();
          if (cleanK && cleanK !== hanzi) HSK_LEVEL_MAP.set(cleanK, lvl);
          const parenMatch = hanzi.match(/\(([^)]+)\)/);
          if (parenMatch && parenMatch[1]) HSK_LEVEL_MAP.set(parenMatch[1].trim(), lvl);
        }
      }
      if (Array.isArray(data.garment)) {
        for (const g of data.garment) {
          if (typeof g === "string") {
            // Split slash-separated compound garment terms
            for (const item of g.split("/")) {
              const trimmed = item.trim();
              if (trimmed) GARMENT_WORDS_SET.add(trimmed);
            }
          }
        }
      }
    }
  } catch (e) {
    console.warn("[CC-CEDICT] Could not load hsk_map.json:", e);
  }
}

// Stats and counts cache
let garmentCount = 0;
let totalHskCount = 0;
const hskCounts = new Map<string, number>();

/**
 * Fast buffer parser and in-memory index builder for 122,596 entries
 */
function parseAndIndexCedictBuffer(buffer: Buffer): void {
  const startTime = Date.now();
  const uncompressedText = zlib.gunzipSync(buffer).toString("utf8");
  const lines = uncompressedText.split("\n");

  allEntries = [];
  simpIndex.clear();
  tradIndex.clear();
  pinyinCleanIndex.clear();
  pinyinNumIndex.clear();
  hanVietExactIndex.clear();
  hanVietNormIndex.clear();
  vietWordIndex.clear();
  vietNormWordIndex.clear();
  hskCounts.clear();
  garmentCount = 0;
  totalHskCount = 0;

  const seenExact = new Set<string>();
  const seenNorm = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const parts = line.split("\t");
    if (parts.length < 6) continue;

    const [trad, simp, pinyinNum, pinyinMark, hanViet, rawVDefs, rawEDefs] = parts;

    // Fast classifier extraction without array re-allocations
    let classifiers: string[] | undefined = undefined;
    const vietnamese: string[] = [];
    if (rawVDefs) {
      const rawDefParts = rawVDefs.split("/");
      for (let d = 0; d < rawDefParts.length; d++) {
        const def = rawDefParts[d];
        if (!def) continue;
        if (def.startsWith("LT:") || def.startsWith("CL:")) {
          if (!classifiers) classifiers = [];
          classifiers.push(def.replace(/^(LT|CL):/, "Lượng từ: "));
        } else {
          vietnamese.push(def);
        }
      }
    }

    let hskLevel = HSK_LEVEL_MAP.get(simp) || HSK_LEVEL_MAP.get(trad);
    if (hskLevel) {
      const upper = hskLevel.toUpperCase().trim();
      if (upper.startsWith("HSK")) {
        const num = upper.replace("HSK", "").trim();
        hskLevel = num ? `HSK ${num}` : "HSK";
      }
    }
    const isGarment = GARMENT_WORDS_SET.has(simp) || GARMENT_WORDS_SET.has(trad);

    if (isGarment) garmentCount++;
    if (hskLevel) {
      totalHskCount++;
      const lvlKey = hskLevel.toUpperCase();
      hskCounts.set(lvlKey, (hskCounts.get(lvlKey) || 0) + 1);
    }

    const entry: CedictEntry = {
      id: i,
      trad,
      simp,
      pinyinNum,
      pinyin: pinyinMark,
      hanViet: hanViet || "",
      vietnamese,
      english: rawEDefs ? rawEDefs.split("/").filter(Boolean) : [],
      classifiers,
      hskLevel,
      isGarment
    };

    allEntries.push(entry);

    // 1. Simplified index
    let simpList = simpIndex.get(simp);
    if (!simpList) {
      simpList = [];
      simpIndex.set(simp, simpList);
    }
    simpList.push(entry);

    // 2. Traditional index
    if (trad !== simp) {
      let tradList = tradIndex.get(trad);
      if (!tradList) {
        tradList = [];
        tradIndex.set(trad, tradList);
      }
      tradList.push(entry);
    }

    // 3. Pinyin clean index (no tones, no numbers)
    const cleanP = pinyinNum.toLowerCase().replace(/[^a-z]/g, "");
    if (cleanP) {
      let pList = pinyinCleanIndex.get(cleanP);
      if (!pList) {
        pList = [];
        pinyinCleanIndex.set(cleanP, pList);
      }
      pList.push(entry);
    }

    // 4. Pinyin with numbers
    const numP = pinyinNum.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (numP && numP !== cleanP) {
      let numList = pinyinNumIndex.get(numP);
      if (!numList) {
        numList = [];
        pinyinNumIndex.set(numP, numList);
      }
      numList.push(entry);
    }

    // 5. Sino-Vietnamese (Hán Việt) Index
    if (hanViet) {
      const hvParts = hanViet.toLowerCase().split(/[,;\\/]+/);
      for (let h = 0; h < hvParts.length; h++) {
        const hv = hvParts[h].trim();
        if (!hv) continue;
        let list = hanVietExactIndex.get(hv);
        if (!list) {
          list = [];
          hanVietExactIndex.set(hv, list);
        }
        list.push(i);

        const normHv = normalizeVietnamese(hv);
        let normList = hanVietNormIndex.get(normHv);
        if (!normList) {
          normList = [];
          hanVietNormIndex.set(normHv, normList);
        }
        normList.push(i);
      }
    }

    // 6. Inverted index for Vietnamese definitions (Uncapped: 100% of 122,596 entries)
    if (rawVDefs) {
      seenExact.clear();
      seenNorm.clear();
      const rawWords = rawVDefs.toLowerCase().split(/[^a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ0-9]+/i);

      for (let w = 0; w < rawWords.length; w++) {
        const word = rawWords[w];
        if (word.length < 1 || word.startsWith("lt:") || word.startsWith("cl:")) continue;

        if (!seenExact.has(word)) {
          seenExact.add(word);
          let wList = vietWordIndex.get(word);
          if (!wList) {
            wList = [];
            vietWordIndex.set(word, wList);
          }
          wList.push(i);
        }

        const isAscii = /^[a-z0-9]+$/.test(word);
        const nw = isAscii ? word : normalizeVietnamese(word);
        if (nw && !seenNorm.has(nw)) {
          seenNorm.add(nw);
          let nwList = vietNormWordIndex.get(nw);
          if (!nwList) {
            nwList = [];
            vietNormWordIndex.set(nw, nwList);
          }
          nwList.push(i);
        }
      }
    }
  }

  isInitialized = true;
  console.log(
    `[CC-CEDICT VN] Loaded & indexed ${allEntries.length.toLocaleString()} entries in ${Date.now() - startTime}ms.`
  );
}

/**
 * Asynchronously guarantees that the CC-CEDICT database is loaded.
 * If local disk file is missing in serverless environments (e.g. Vercel),
 * it automatically downloads the static file from the active deployment host CDN.
 */
export async function ensureCedictLoaded(req?: any): Promise<boolean> {
  if (isInitialized) return true;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      loadMetadataMaps();
      let buffer: Buffer | null = null;
      const dataPath = findDataFilePath("cedict_vn.tsv.gz");

      if (dataPath && fs.existsSync(dataPath)) {
        console.log(`[CC-CEDICT VN] Loading from local disk: ${dataPath}`);
        buffer = fs.readFileSync(dataPath);
      } else {
        // Fallback: network download from the deployment host CDN
        console.warn("[CC-CEDICT VN] Local file not found. Attempting host network download fallback...");
        const host =
          req?.headers?.["x-forwarded-host"] ||
          req?.headers?.host ||
          process.env.VERCEL_URL ||
          process.env.VERCEL_PROJECT_PRODUCTION_URL;
        const proto = req?.headers?.["x-forwarded-proto"] || "https";

        const candidateUrls: string[] = [];
        if (host) {
          const cleanHost = host.replace(/^https?:\/\//, "").replace(/\/$/, "");
          candidateUrls.push(`${proto}://${cleanHost}/data/cedict_vn.tsv.gz`);
          candidateUrls.push(`http://${cleanHost}/data/cedict_vn.tsv.gz`);
        }
        if (process.env.VERCEL_URL) {
          candidateUrls.push(`https://${process.env.VERCEL_URL}/data/cedict_vn.tsv.gz`);
        }
        candidateUrls.push("http://localhost:3000/data/cedict_vn.tsv.gz");

        for (const url of candidateUrls) {
          try {
            console.log(`[CC-CEDICT VN] Fetching static dictionary from: ${url}`);
            const resp = await fetch(url);
            if (resp.ok) {
              const ab = await resp.arrayBuffer();
              buffer = Buffer.from(ab);
              console.log(
                `[CC-CEDICT VN] Downloaded ${(buffer.length / 1024 / 1024).toFixed(2)}MB from CDN successfully!`
              );
              try {
                fs.writeFileSync("/tmp/cedict_vn.tsv.gz", buffer);
              } catch {}
              break;
            }
          } catch (e: any) {
            console.warn(`[CC-CEDICT VN] Failed to fetch from ${url}:`, e?.message);
          }
        }
      }

      if (!buffer) {
        console.error("[CC-CEDICT VN] CRITICAL: Could not find or download cedict_vn.tsv.gz");
        return false;
      }

      parseAndIndexCedictBuffer(buffer);
      return true;
    } catch (err: any) {
      console.error("[CC-CEDICT VN] Failed to load dictionary:", err?.message || err);
      return false;
    } finally {
      initPromise = null;
    }
  })();

  return initPromise;
}

/**
 * Initialize and load the CC-CEDICT Vietnamese database into fast in-memory structures (synchronous / background)
 */
export function initCedictDatabase(req?: any): void {
  if (isInitialized) return;
  const dataPath = findDataFilePath("cedict_vn.tsv.gz");
  if (dataPath && fs.existsSync(dataPath)) {
    loadMetadataMaps();
    const buffer = fs.readFileSync(dataPath);
    parseAndIndexCedictBuffer(buffer);
  } else {
    // Trigger asynchronous or host download
    ensureCedictLoaded(req).catch((err) => {
      console.warn("[CC-CEDICT VN] Background load error:", err);
    });
  }
}

/**
 * Searches the CC-CEDICT database with high recall and precision relevance ranking
 */
export function searchCedict(
  rawQuery: string,
  options: { limit?: number; page?: number; filter?: string } = {}
): SearchResult {
  if (!isInitialized) {
    initCedictDatabase();
  }

  const startTime = Date.now();
  const query = (rawQuery || "").trim();
  const limit = Math.min(Math.max(Number(options.limit) || 25, 1), 100);
  const page = Math.max(Number(options.page) || 1, 1);
  const filter = (options.filter || "all").trim();

  if (!query) {
    // Return curated high-utility sample entries matching filter
    const sampleWords = ["你好", "谢谢", "学习", "工作", "朋友", "衣服", "服装", "中国", "越南", "吃饭", "学校", "医生", "买", "看", "水", "钱"];
    const results: CedictEntry[] = [];
    const seenIdSet = new Set<number>();

    for (const w of sampleWords) {
      const found = simpIndex.get(w);
      if (found) {
        for (const f of found) {
          if (filter === "garment" && !f.isGarment) continue;
          if (filter === "hsk" && !f.hskLevel) continue;
          if (filter && filter.toUpperCase().startsWith("HSK")) {
            if (!f.hskLevel || f.hskLevel.toUpperCase() !== filter.toUpperCase()) continue;
          }
          if (!seenIdSet.has(f.id)) {
            seenIdSet.add(f.id);
            results.push(f);
          }
        }
      }
    }

    const startIndex = (page - 1) * limit;
    const targetCount = startIndex + limit;

    if (results.length < targetCount) {
      for (let i = 0; i < allEntries.length; i++) {
        const e = allEntries[i];
        if (filter === "garment" && !e.isGarment) continue;
        if (filter === "hsk" && !e.hskLevel) continue;
        if (filter && filter.toUpperCase().startsWith("HSK")) {
          if (!e.hskLevel || e.hskLevel.toUpperCase() !== filter.toUpperCase()) continue;
        }
        if (!seenIdSet.has(e.id)) {
          seenIdSet.add(e.id);
          results.push(e);
        }
        if (results.length >= targetCount) break;
      }
    }

    let computedTotal = allEntries.length;
    if (filter === "garment") {
      computedTotal = garmentCount || results.length;
    } else if (filter === "hsk") {
      computedTotal = totalHskCount || results.length;
    } else if (filter && filter.toUpperCase().startsWith("HSK")) {
      computedTotal = hskCounts.get(filter.toUpperCase()) || results.length;
    }

    return {
      entries: results.slice(startIndex, targetCount),
      total: computedTotal,
      page,
      limit,
      query: "",
      timeMs: Date.now() - startTime
    };
  }

  const queryLower = query.toLowerCase();
  const cleanQ = normalizePinyin(query);
  const normVietQ = normalizeVietnamese(query);
  const isChineseChar = /[\u4e00-\u9fa5]/.test(query);
  const hasVietnameseDiacritics = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(query);

  const scoredMap = new Map<number, { entry: CedictEntry; score: number }>();

  function addMatch(entry: CedictEntry, baseScore: number) {
    if (filter === "garment" && !entry.isGarment) return;
    if (filter === "hsk" && !entry.hskLevel) return;
    if (filter && filter.toUpperCase().startsWith("HSK")) {
      const targetLvl = filter.toUpperCase();
      if (!entry.hskLevel || entry.hskLevel.toUpperCase() !== targetLvl) return;
    }

    let finalScore = baseScore;

    // HSK priority bonus: HSK1 gets +2500, HSK2 gets +2200 ... HSK6 gets +1200
    if (entry.hskLevel) {
      const lvlNum = parseInt(entry.hskLevel.replace("HSK", "") || "6", 10);
      finalScore += Math.max(800, 2600 - lvlNum * 200);
    }
    if (entry.isGarment) {
      finalScore += 900;
    }

    // Small penalty for long sentences/proverbs to keep concise vocabulary first
    finalScore -= Math.min(500, (entry.simp.length - 1) * 35);

    const existing = scoredMap.get(entry.id);
    if (!existing || existing.score < finalScore) {
      scoredMap.set(entry.id, { entry, score: finalScore });
    }
  }

  // ==========================================
  // CASE 1: CHINESE HANZI SEARCH
  // ==========================================
  if (isChineseChar) {
    // 1a. Exact matches
    if (simpIndex.has(query)) {
      for (const e of simpIndex.get(query)!) addMatch(e, 8000);
    }
    if (tradIndex.has(query)) {
      for (const e of tradIndex.get(query)!) addMatch(e, 7600);
    }

    // 1b. Prefix and substring matches across all entries
    for (let i = 0; i < allEntries.length; i++) {
      const e = allEntries[i];
      if (e.simp === query || e.trad === query) continue;

      if (e.simp.startsWith(query) || e.trad.startsWith(query)) {
        addMatch(e, 3600 - (e.simp.length - query.length) * 35);
      } else if (e.simp.includes(query) || e.trad.includes(query)) {
        addMatch(e, 1800 - (e.simp.length - query.length) * 20);
      }
    }
  } else {
    // ==========================================
    // CASE 2: PINYIN SEARCH (Latin without Vietnamese diacritics)
    // ==========================================
    if (!hasVietnameseDiacritics && cleanQ && cleanQ.length >= 1) {
      // 2a. Exact clean pinyin (e.g. "xuexi", "nihao", "yifu")
      if (pinyinCleanIndex.has(cleanQ)) {
        for (const e of pinyinCleanIndex.get(cleanQ)!) {
          addMatch(e, 5200);
        }
      }

      // 2b. Numbered pinyin (e.g. "ni3hao3", "xue2xi2")
      const numP = queryLower.replace(/[^a-z0-9]/g, "");
      if (numP && pinyinNumIndex.has(numP)) {
        for (const e of pinyinNumIndex.get(numP)!) {
          addMatch(e, 5400);
        }
      }

      // 2c. Pinyin prefix search (e.g. user typed "xue" -> matches "xuexi", "xuexiao", "xuesheng")
      if (cleanQ.length >= 2) {
        for (let i = 0; i < allEntries.length; i++) {
          const e = allEntries[i];
          const entryCleanP = normalizePinyin(e.pinyinNum);
          if (!entryCleanP || entryCleanP === cleanQ) continue;

          if (entryCleanP.startsWith(cleanQ)) {
            addMatch(e, 3200 - (entryCleanP.length - cleanQ.length) * 15);
          }
        }
      }
    }

    // ==========================================
    // CASE 3: VIETNAMESE & SINO-VIETNAMESE (HÁN VIỆT) SEARCH
    // ==========================================
    const tokens = queryLower.split(/\s+/).filter(Boolean);
    const normTokens = normVietQ.split(/\s+/).filter(Boolean);
    const candidateIds = new Set<number>();

    // 3a. Check exact Hán Việt match
    const hvExactList = hanVietExactIndex.get(queryLower);
    if (hvExactList) {
      for (const id of hvExactList) {
        const e = allEntries[id];
        if (e) addMatch(e, 4500);
      }
    }
    const hvNormList = hanVietNormIndex.get(normVietQ);
    if (hvNormList) {
      for (const id of hvNormList) {
        const e = allEntries[id];
        if (e) addMatch(e, hasVietnameseDiacritics ? 2800 : 3800);
      }
    }

    // 3b. Collect candidates from inverted index for Vietnamese words
    const tokensToLookup = hasVietnameseDiacritics ? tokens : normTokens;
    for (const t of tokensToLookup) {
      const ids = hasVietnameseDiacritics ? vietWordIndex.get(t) : vietNormWordIndex.get(t);
      if (ids) {
        for (let j = 0; j < ids.length; j++) {
          candidateIds.add(ids[j]);
        }
      }
    }

    // Prepare boundary regex for safe matching without substring false positives
    const safeRegexQ = queryLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const safeRegexNormQ = normVietQ.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const exactWordRe = new RegExp(
      "(^|[^a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ0-9])" +
        safeRegexQ +
        "([^a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ0-9]|$)",
      "i"
    );
    const normWordRe = new RegExp(
      "(^|[^a-z0-9])" + safeRegexNormQ + "([^a-z0-9]|$)",
      "i"
    );

    for (const id of candidateIds) {
      const e = allEntries[id];
      if (!e) continue;

      const vJoined = e.vietnamese.join(" ").toLowerCase();
      const vJoinedNorm = normalizeVietnamese(vJoined);
      const firstDef = (e.vietnamese[0] || "").toLowerCase();
      const firstDefNorm = normalizeVietnamese(firstDef);

      let vietScore = 0;

      // 1. Primary definition match
      if (firstDef === queryLower || firstDefNorm === normVietQ) {
        vietScore += 6500;
      } else if (firstDef.startsWith(queryLower + " ") || firstDefNorm.startsWith(normVietQ + " ") || firstDef.startsWith(queryLower + ";") || firstDef.startsWith(queryLower + ",")) {
        vietScore += 5200;
      } else if (firstDef.startsWith(queryLower) || firstDefNorm.startsWith(normVietQ)) {
        vietScore += 4500;
      } else if (exactWordRe.test(firstDef)) {
        vietScore += 4200;
      } else if (!hasVietnameseDiacritics && normWordRe.test(firstDefNorm)) {
        vietScore += 3200;
      }

      // 2. Full definition exact phrase match
      if (vJoined.includes(queryLower)) {
        vietScore = Math.max(vietScore, 3400);
      } else if (exactWordRe.test(vJoined)) {
        vietScore = Math.max(vietScore, 3000);
      } else if (normWordRe.test(vJoinedNorm)) {
        vietScore = Math.max(vietScore, hasVietnameseDiacritics ? 1800 : 2500);
      }

      // Penalize incidental classifier mentions e.g. "lượng từ cho số lần xả quần áo"
      const isClassifierIncidental =
        /lượng từ cho.*(quần áo|áo|sách|người)/i.test(vJoined) ||
        /\((quần áo|áo|sách)\)/i.test(vJoined);
      if (isClassifierIncidental && !exactWordRe.test(firstDef)) {
        vietScore -= 2500;
      }

      // 3. Multi-token match (when user searched compound phrase like "quần áo", "áo sơ mi", "bác sĩ")
      const currentTokens = hasVietnameseDiacritics ? tokens : normTokens;
      const targetText = hasVietnameseDiacritics ? vJoined : vJoinedNorm;
      if (currentTokens.length > 1) {
        let matchedCount = 0;
        for (const t of currentTokens) {
          if (targetText.includes(t)) matchedCount++;
        }
        if (matchedCount === currentTokens.length) {
          vietScore = Math.max(vietScore, 3400 + matchedCount * 120);
        } else if (matchedCount >= currentTokens.length - 1) {
          vietScore = Math.max(vietScore, 1800 + matchedCount * 100);
        }
      }

      if (vietScore > 0) {
        addMatch(e, vietScore);
      }
    }

    // ==========================================
    // CASE 4: ENGLISH DEFINITION SEARCH (Fallback for international terms)
    // ==========================================
    if (queryLower.length >= 3 && scoredMap.size < 40) {
      for (let i = 0; i < allEntries.length; i++) {
        const e = allEntries[i];
        if (scoredMap.has(e.id)) continue;

        for (const eDef of e.english) {
          const lowerDef = eDef.toLowerCase();
          if (lowerDef === queryLower) {
            addMatch(e, 2200);
            break;
          } else if (lowerDef.includes(queryLower)) {
            addMatch(e, 1100);
            break;
          }
        }
        if (scoredMap.size >= 80) break;
      }
    }
  }

  // Sort results by score desc, then HSK level, then word length asc
  const sorted = Array.from(scoredMap.values())
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.entry.hskLevel && !b.entry.hskLevel) return -1;
      if (!a.entry.hskLevel && b.entry.hskLevel) return 1;
      return a.entry.simp.length - b.entry.simp.length;
    })
    .map((item) => item.entry);

  const total = sorted.length;
  const startIndex = (page - 1) * limit;
  const pagedEntries = sorted.slice(startIndex, startIndex + limit);

  return {
    entries: pagedEntries,
    total,
    page,
    limit,
    query,
    timeMs: Date.now() - startTime
  };
}

/**
 * Returns exact definition and character breakdown for a word
 */
export function defineWord(word: string): {
  entries: CedictEntry[];
  characterBreakdown: { char: string; entries: CedictEntry[] }[];
} {
  if (!isInitialized) {
    initCedictDatabase();
  }

  const cleanWord = (word || "").trim();
  const entries = simpIndex.get(cleanWord) || tradIndex.get(cleanWord) || [];

  // Character breakdown for compound words
  const characterBreakdown: { char: string; entries: CedictEntry[] }[] = [];
  if (cleanWord.length > 1) {
    for (const char of cleanWord) {
      if (/[\u4e00-\u9fa5]/.test(char)) {
        const charEntries = simpIndex.get(char) || tradIndex.get(char) || [];
        if (charEntries.length > 0) {
          characterBreakdown.push({
            char,
            entries: charEntries.slice(0, 3)
          });
        }
      }
    }
  }

  return {
    entries,
    characterBreakdown
  };
}

/**
 * Chinese sentence segmentation & word-by-word glossing using CC-CEDICT Maximum Matching
 */
export function analyzeChineseSentence(sentence: string): SegmentedWord[] {
  if (!isInitialized) {
    initCedictDatabase();
  }

  const text = (sentence || "").trim();
  if (!text) return [];

  const results: SegmentedWord[] = [];
  let i = 0;
  const maxWordLength = 6;

  while (i < text.length) {
    const char = text[i];

    // Non-Chinese / punctuation
    if (!/[\u4e00-\u9fa5]/.test(char)) {
      results.push({
        text: char,
        pinyin: "",
        hanViet: "",
        vietnamese: [],
        english: [],
        isPunctuation: true
      });
      i++;
      continue;
    }

    // Maximum Matching Algorithm
    let matchedWord = "";
    let matchedEntry: CedictEntry | null = null;

    for (let len = Math.min(maxWordLength, text.length - i); len >= 1; len--) {
      const candidate = text.substring(i, i + len);
      const found = simpIndex.get(candidate) || tradIndex.get(candidate);
      if (found && found.length > 0) {
        matchedWord = candidate;
        matchedEntry = found[0];
        break;
      }
    }

    if (matchedEntry) {
      results.push({
        text: matchedWord,
        pinyin: matchedEntry.pinyin,
        hanViet: matchedEntry.hanViet,
        vietnamese: matchedEntry.vietnamese,
        english: matchedEntry.english,
        hskLevel: matchedEntry.hskLevel,
        isPunctuation: false
      });
      i += matchedWord.length;
    } else {
      // Single character fallback
      results.push({
        text: char,
        pinyin: "",
        hanViet: "",
        vietnamese: ["(chưa có định nghĩa)"],
        english: [],
        isPunctuation: false
      });
      i++;
    }
  }

  return results;
}

/**
 * Retrieves multiple entries by words/keys for favorites or batch review
 */
export function getEntriesByWords(words: string[]): CedictEntry[] {
  if (!isInitialized) {
    initCedictDatabase();
  }
  const result: CedictEntry[] = [];
  const seenIds = new Set<number>();
  const seenWords = new Set<string>();

  for (const w of words) {
    if (!w) continue;
    // Strip prefixes like cedict_
    const clean = w.replace(/^cedict_/, "").trim();
    if (!clean) continue;

    // 1. Check if it starts with numeric ID: e.g. "1206_别" or "1206"
    const matchId = clean.match(/^(\d+)(?:_(.+))?$/);
    if (matchId) {
      const idNum = parseInt(matchId[1], 10);
      if (idNum >= 0 && idNum < allEntries.length) {
        const entry = allEntries[idNum];
        if (entry && !seenIds.has(entry.id)) {
          seenIds.add(entry.id);
          result.push(entry);
          continue;
        }
      }
    }

    // 2. Fallback: search by Hanzi for legacy keys
    if (seenWords.has(clean)) continue;
    seenWords.add(clean);

    const matches = simpIndex.get(clean) || tradIndex.get(clean);
    if (matches && matches.length > 0) {
      for (const m of matches) {
        if (!seenIds.has(m.id)) {
          seenIds.add(m.id);
          result.push(m);
          break; // Take the primary match for legacy Hanzi string
        }
      }
    }
  }

  return result;
}

/**
 * Returns a random word from the dictionary (e.g. for Word of the Day)
 */
export function getRandomWord(): CedictEntry | null {
  if (!isInitialized) {
    initCedictDatabase();
  }
  if (allEntries.length === 0) return null;
  // Pick from common 2-character to 4-character words
  const randIdx = Math.floor(Math.random() * allEntries.length);
  return allEntries[randIdx] || null;
}

/**
 * Returns summary statistics of the loaded CC-CEDICT database
 */
export function getDictionaryStats() {
  if (!isInitialized) {
    initCedictDatabase();
  }
  return {
    totalEntries: allEntries.length,
    simplifiedIndexSize: simpIndex.size,
    traditionalIndexSize: tradIndex.size,
    vietnameseIndexSize: vietWordIndex.size,
    sources: [
      { name: "CC-CEDICT", description: "Từ điển Hán - Anh tiêu chuẩn quốc tế mở MDBG", entries: 122596 },
      { name: "CVDICT", description: "Bản dịch Hán - Việt CC-CEDICT (Phong Phan)", entries: 122596 }
    ],
    features: [
      "Tra cứu Hán tự Giản thể & Phồn thể",
      "Tra cứu Pinyin có dấu, không dấu, số",
      "Tra cứu nghĩa Tiếng Việt & Âm Hán Việt",
      "Tra cứu nghĩa Tiếng Anh",
      "Thông tin Lượng từ (Measure Words / Classifiers)",
      "Tách từ phân tích câu tiếng Trung tự động (Sentence Tokenizer & Analyzer)"
    ]
  };
}
