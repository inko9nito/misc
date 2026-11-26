# Bakes the whole TDE site into one self-contained style-picker page.
# Usage: python3 tde/tools/picker/build.py tde/tools/picker/picker.src.html out.html
import base64, json, re, sys, pathlib
site = pathlib.Path(__file__).resolve().parents[2] / "site"
tpl, out = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
mime = {"woff2": "font/woff2", "jpg": "image/jpeg", "png": "image/png"}
def data_uri(p):
    p = site / p
    return f"data:{mime[p.suffix[1:]]};base64," + base64.b64encode(p.read_bytes()).decode()
def css(name):
    t = (site / "assets/css" / name).read_text()
    return re.sub(r"url\(\.\./((?:fonts|img)/[^)]+)\)", lambda m: f'url("{data_uri("assets/" + m.group(1))}")', t)
def js(name):
    t = (site / "assets/js" / name).read_text()
    t = re.sub(r'"(assets/img/[^"]+)"', lambda m: f'"{data_uri(m.group(1))}"', t)
    return t.replace("location.search", '"__TDE_Q__"').replace("</script", "<\\/script")
NAV = """<script>
// Picker preview: keep in-site links inside the preview pane.
document.addEventListener("click", e => {
  const a = e.target.closest("a[href]"); if (!a) return;
  const h = a.getAttribute("href");
  if (h === "#") { e.preventDefault(); return; }
  const m = h.match(/^([\\w-]+\\.html)?(?:\\?[^#]*)?(#[\\w-]*)?$/); if (!m) return;
  e.preventDefault();
  if (m[1] && parent.tdeNav) parent.tdeNav(m[1], m[2] || "");
  else if (m[2]) { const t = document.getElementById(m[2].slice(1)); if (t) t.scrollIntoView(); }
}, true);
</script>"""
pages = {}
for f in ["index.html", "event-dec-12.html", "event-feb-6-7.html"]:
    h = (site / f).read_text()
    h = re.sub(r'<link rel="preload"[^>]*>\n?', "", h)
    h = re.sub(r'<link rel="stylesheet" href="assets/css/([\w-]+\.css)">', lambda m: f"<style>@@{m.group(1)}@@</style>", h)
    h = re.sub(r'<script src="assets/js/([\w-]+\.js)"></script>', lambda m: f"<script>@@{m.group(1)}@@</script>", h)
    h = h.replace("new URLSearchParams(location.search)", 'new URLSearchParams("__TDE_Q__")')
    h = h.replace("</body>", NAV + "</body>")
    assert "location.search" not in h and 'src="assets' not in h, f
    pages[f] = h
parts = {n: css(n) for n in ["tokens.css", "tde.css", "looks.css"]} | {n: js(n) for n in ["data.js", "tde.js"]}
blob = json.dumps({"pages": pages, "parts": parts}).replace("</", "<\\/")
o = tpl.read_text().replace("/*SITE*/", blob)
out.write_text(o)
print(out, round(len(o) / 1e6, 2), "MB")
