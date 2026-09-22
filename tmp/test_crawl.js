const vm = require("vm");

async function crawl() {
  const visited = new Set();
  const queue = ["/", "/@vite/client", "/src/main.tsx"];

  while (queue.length > 0) {
    const url = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);

    try {
      const res = await fetch("http://localhost:3000" + url);
      if (!res.ok) {
        console.error("HTTP ERROR", res.status, url);
        continue;
      }
      const text = await res.text();
      
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("javascript") || url.endsWith(".js") || url.endsWith(".tsx") || url.endsWith(".ts")) {
        try {
          new vm.Script(text);
        } catch (syntaxErr) {
          console.error(">>> SYNTAX ERROR in", url, syntaxErr.message);
        }
      }

      // Extract imports
      const regex = /(?:from\s+['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)|import\s+['"]([^'"]+)['"])/g;
      let match;
      while ((match = regex.exec(text)) !== null) {
        const dep = match[1] || match[2] || match[3];
        if (dep.startsWith("/") || dep.startsWith(".")) {
          let resolved = dep;
          if (dep.startsWith(".")) {
            const dir = url.substring(0, url.lastIndexOf("/"));
            resolved = dir + "/" + dep;
          }
          if (!visited.has(resolved)) {
            queue.push(resolved);
          }
        }
      }
    } catch (e) {
      console.error("FETCH ERROR", url, e.message);
    }
  }
  console.log("Crawl finished. Checked", visited.size, "URLs.");
}

crawl();
