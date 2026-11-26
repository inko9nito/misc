// Full-page screenshots of the TDE site for review on a phone.
// Usage: node tde/tools/shoot.mjs [outDir] [--today=2026-11-26] [--only=index,event-dec-12]
//        [--ds=bmwm|ferrari|porsche] [--type=foundation|saira] [--devices=phone,desktop]
// Needs Playwright with Chromium (preinstalled in Claude Code cloud sessions).
// Phone: 390×844 at 2×, split into parts so no image is taller than 8000px.
// Desktop: 1280 wide at 1×. The prototype bar and the phone booking bar are hidden.
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, existsSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const { chromium } = createRequire(import.meta.url)("playwright");
const here = dirname(fileURLToPath(import.meta.url));
const site = resolve(here, "../site");
const args = process.argv.slice(2);
const out = resolve(args.find(a => !a.startsWith("--")) || join(here, "../screenshots"));
const opt = k => (args.find(a => a.startsWith(`--${k}=`)) || "").split("=")[1];
const today = opt("today") || "2026-11-26";
const only = opt("only") ? opt("only").split(",") : null;
const ds = opt("ds"), type = opt("type");
const devices = opt("devices") ? opt("devices").split(",") : ["phone", "desktop"];
const look = `${ds ? `&ds=${ds}` : ""}${ds && type ? `&type=${type}` : ""}`;
const tag = ds ? `${ds}${type === "saira" ? "-saira" : ""}-` : "";

const shots = [
  ["index", "index.html"],
  ["event-dec-12", "event-dec-12.html"],
  ["event-feb-6-7", "event-feb-6-7.html"],
  ["event-dec-12-soon", "event-dec-12.html", "state=soon"],
  ["event-dec-12-sold", "event-dec-12.html", "state=sold"],
  ["design-system", "design-system.html"]
].filter(s => !only || only.includes(s[0]));

const MAX_PX = 8000;
// Serve over http: browsers refuse web fonts from file:// pages.
const types = { html: "text/html", css: "text/css", js: "text/javascript", jpg: "image/jpeg", png: "image/png", woff2: "font/woff2" };
const server = createServer((req, res) => {
  const f = join(site, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (!f.startsWith(site) || !existsSync(f)) { res.writeHead(404).end(); return; }
  res.writeHead(200, { "content-type": types[f.split(".").pop()] || "application/octet-stream" }).end(readFileSync(f));
}).listen(0);
const origin = `http://127.0.0.1:${server.address().port}`;
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
for (const [dev, viewport, scale] of [["phone", { width: 390, height: 844 }, 2], ["desktop", { width: 1280, height: 860 }, 1]].filter(d => devices.includes(d[0]))) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: scale, reducedMotion: "reduce", isMobile: dev === "phone", hasTouch: dev === "phone" });
  const page = await ctx.newPage();
  page.on("pageerror", e => console.error("PAGE ERROR", e.message));
  for (const [name, file, q] of shots) {
    const url = `${origin}/${file}?clean&today=${today}${look}${q ? `&${q}` : ""}`;
    await page.goto(url, { waitUntil: "load" });
    await page.addStyleTag({ content: ".mbar{display:none!important}body.has-mbar{padding-bottom:0!important}" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    const parts = Math.max(1, Math.ceil((h * scale) / MAX_PX));
    const step = Math.ceil(h / parts);
    for (let i = 0; i < parts; i++) {
      const y = i * step, height = Math.min(step, h - y);
      const suffix = parts > 1 ? `-${i + 1}of${parts}` : "";
      const path = join(out, `${tag}${name}-${dev}${suffix}.jpg`);
      await page.screenshot({ path, fullPage: true, clip: { x: 0, y, width: viewport.width, height }, type: "jpeg", quality: 86 });
      console.log(path, `${viewport.width * scale}×${Math.round(height * scale)}`);
    }
  }
  await ctx.close();
}
await browser.close();
server.close();
