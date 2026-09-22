import { getRandomWord, ensureCedictLoaded } from "../../server/cedictService.ts";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    await ensureCedictLoaded(req);
    const word = getRandomWord();
    return res.status(200).json({ word });
  } catch (error: any) {
    console.error("Random word error:", error);
    return res.status(500).json({ error: "Lỗi lấy từ ngẫu nhiên", message: error?.message });
  }
}
