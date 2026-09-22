import { getDictionaryStats, ensureCedictLoaded } from "../../server/cedictService.ts";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    await ensureCedictLoaded(req);
    const stats = getDictionaryStats();
    return res.status(200).json(stats);
  } catch (error: any) {
    console.error("Dictionary stats error:", error);
    return res.status(500).json({ error: "Lỗi thông tin thống kê từ điển", message: error?.message });
  }
}
