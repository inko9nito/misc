# Turns cutouts (cut_<name>.png from 2_cutouts.py) into small WebP data URIs for the app's IMG map.
from PIL import Image
import base64, io, json
names = ["mag","bone","d3k2","lymph","drain","silver","intz","biod","multi","b12"]
out = {}
for n in names:
    im = Image.open(f"cut_{n}.png").convert("RGBA")
    im.thumbnail((180, 180), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, "WEBP", quality=88, method=6)
    out[n] = "data:image/webp;base64," + base64.b64encode(b.getvalue()).decode()
open("img.js", "w").write("  const IMG = " + json.dumps(out) + ";\n")
