# Turns cutouts (cut_<name>.png from 2_cutouts.py or 4_product_shots.py) into WebP data URIs:
# IMG (180 px, list thumbnails) and IMG_L (420 px, the details sheet) in the app.
from PIL import Image
import base64, io, json
names = ["mag","bone","d3k2","lymph","drain","silver","intz","biod","multi","b12","vitc"]
def uri(n, size, q):
    im = Image.open(f"cut_{n}.png").convert("RGBA")
    im.thumbnail((size, size), Image.LANCZOS)
    b = io.BytesIO(); im.save(b, "WEBP", quality=q, method=6)
    return "data:image/webp;base64," + base64.b64encode(b.getvalue()).decode()
small = {n: uri(n, 180, 88) for n in names}
large = {n: uri(n, 420, 80) for n in names}
open("img.js", "w").write("  const IMG = " + json.dumps(small) + ";\n  const IMG_L = " + json.dumps(large) + ";\n")
