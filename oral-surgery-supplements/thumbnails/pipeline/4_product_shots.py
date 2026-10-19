# Cutouts for retailer-style product shots on a plain light background (no hands),
# where steps 1-2 aren't needed. Writes cut_<name>.png for 3_export.py.
#   python3 4_product_shots.py <photo.jpg> <name> [--x0 PX]
# --x0 drops everything left of that column (e.g. a checkbox from the shop page).
# The silhouette is filled row by row, so a clear cap that shows the background
# through it keeps its shape.
import sys, argparse
import cv2, numpy as np
from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument("photo"); ap.add_argument("name"); ap.add_argument("--x0", type=int, default=0)
a = ap.parse_args()

rgb = np.array(Image.open(a.photo).convert("RGB")).astype(np.int16)
H, W = rgb.shape[:2]
border = np.concatenate([rgb[:4].reshape(-1, 3), rgb[-4:].reshape(-1, 3), rgb[:, -4:].reshape(-1, 3)])
bg = np.median(border, axis=0)
dist = np.abs(rgb - bg).max(axis=2)
M = (dist > 14).astype(np.uint8)
M[:, :a.x0] = 0
M = cv2.morphologyEx(M, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
M = cv2.morphologyEx(M, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9)))
n, lab, st, _ = cv2.connectedComponentsWithStats(M, 8)
M = (lab == 1 + np.argmax(st[1:, cv2.CC_STAT_AREA])).astype(np.uint8)
S = np.zeros_like(M)
for y in np.where(M.any(1))[0]:          # row-wise span fill
    xs = np.where(M[y])[0]; S[y, xs[0]:xs[-1] + 1] = 1
S = cv2.medianBlur(S * 255, 5) > 127
alpha = np.clip((cv2.GaussianBlur(S.astype(np.float32), (0, 0), 0.9) - 0.15) / 0.7, 0, 1)
ys, xs = np.where(S); y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
p = int(0.03 * (y1 - y0)); y0, x0 = max(y0 - p, 0), max(x0 - p, 0); y1, x1 = min(y1 + p, H - 1), min(x1 + p, W - 1)
out = np.dstack([rgb.astype(np.uint8), (alpha * 255).astype(np.uint8)])[y0:y1 + 1, x0:x1 + 1]
im = Image.fromarray(out, "RGBA"); im.thumbnail((400, 400), Image.LANCZOS); im.save(f"cut_{a.name}.png")
print(a.name, im.size)
