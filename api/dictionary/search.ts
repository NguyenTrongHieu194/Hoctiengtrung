import { searchCedict, ensureCedictLoaded } from "../../server/cedictService.ts";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    await ensureCedictLoaded(req);
    const q = (req.query?.q as string) || "";
    const limit = parseInt((req.query?.limit as string) || "25", 10);
    const page = parseInt((req.query?.page as string) || "1", 10);
    const filter = (req.query?.filter as "all" | "hsk" | "garment") || "all";

    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
    const result = searchCedict(q, { limit, page, filter });
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("Dictionary search error:", error);
    return res.status(500).json({ error: "Lỗi tra cứu từ điển", message: error?.message });
  }
}
