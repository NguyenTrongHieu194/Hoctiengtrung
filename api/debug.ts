import { getDictionaryStats, findDataFilePath, ensureCedictLoaded, searchCedict } from "../server/cedictService.ts";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const loadedOk = await ensureCedictLoaded(req);
    const dataPath = findDataFilePath("cedict_vn.tsv.gz");
    const stats = getDictionaryStats();
    const testSearchNihao = searchCedict("你好", { limit: 1 });
    const testSearchQuanAo = searchCedict("quần áo", { limit: 1 });

    return res.status(200).json({
      status: "ok",
      loadedOk,
      totalEntries: stats.totalEntries,
      hasDataFile: !!dataPath,
      dataPath,
      nodeVersion: process.version,
      cwd: process.cwd(),
      host: req.headers?.host,
      vercelUrl: process.env.VERCEL_URL || null,
      stats,
      tests: {
        nihao: testSearchNihao.entries.length > 0 ? testSearchNihao.entries[0].simp : "not_found",
        quanAo: testSearchQuanAo.entries.length > 0 ? testSearchQuanAo.entries[0].simp : "not_found"
      },
      time: new Date().toISOString()
    });
  } catch (err: any) {
    return res.status(500).json({
      status: "error",
      message: err?.message || String(err),
      stack: err?.stack
    });
  }
}
