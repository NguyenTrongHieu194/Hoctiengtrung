import { defineWord, ensureCedictLoaded } from "../../server/cedictService.ts";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    await ensureCedictLoaded(req);
    const word = (req.query?.word as string) || "";
    if (!word) {
      return res.status(400).json({ error: "Tham số word không được để trống" });
    }
    const result = defineWord(word);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Dictionary define error:", error);
    return res.status(500).json({ error: "Lỗi định nghĩa từ", message: error?.message });
  }
}
