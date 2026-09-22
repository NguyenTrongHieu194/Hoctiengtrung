import app from "../server/app.ts";

export default function handler(req: any, res: any) {
  // 1. Set CORS headers for all incoming calls
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 2. Normalize rewritten paths if routed through vercel rewrites
  if (req.query && req.query.path) {
    const rawPath = Array.isArray(req.query.path) ? req.query.path.join("/") : req.query.path;
    const subpath = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
    delete req.query.path;
    req.url = `/api${subpath}`;
  } else if (req.headers && req.headers["x-matched-path"]) {
    const matched = req.headers["x-matched-path"];
    if (typeof matched === "string" && matched.startsWith("/api/")) {
      req.url = matched;
    }
  }

  return app(req, res);
}
