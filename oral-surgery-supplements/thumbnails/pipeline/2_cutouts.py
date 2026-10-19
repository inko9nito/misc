import cv2, numpy as np
from PIL import Image
names = ["mag","bone","d3k2","lymph","drain","silver","intz","biod"]
BBOX = {"silver": (470, 640, 950, 1660)}
NEUTRAL = {"intz", "biod", "silver"}

def largest(m):
    n, lab, st, _ = cv2.connectedComponentsWithStats(m.astype(np.uint8), 8)
    if n <= 1: return m.astype(bool)
    return lab == (1 + np.argmax(st[1:, cv2.CC_STAT_AREA]))
def fill_holes(m):
    m = m.astype(np.uint8)*255; h, w = m.shape; ff = m.copy()
    cv2.floodFill(ff, np.zeros((h+2, w+2), np.uint8), (0,0), 255)
    return (m | cv2.bitwise_not(ff)) > 0
def rot(img, ang, interp):
    h, w = img.shape[:2]; c = (w/2, h/2); M = cv2.getRotationMatrix2D(c, ang, 1.0)
    cos, sin = abs(M[0,0]), abs(M[0,1]); nw, nh = int(h*sin + w*cos), int(h*cos + w*sin)
    M[0,2] += nw/2 - c[0]; M[1,2] += nh/2 - c[1]
    return cv2.warpAffine(img, M, (nw, nh), flags=interp, borderValue=0)
K = lambda r: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (r, r))
def medfilt(a, k):
    p = k//2; ap = np.pad(a, p, mode="edge"); return np.array([np.median(ap[i:i+k]) for i in range(len(a))])

report = {}
for n in names:
    rgb = np.array(Image.open(f"small_{n}.png").convert("RGB"))
    M = np.array(Image.open(f"mask_{n}.png")) > 128
    sc = rgb.shape[1] / 1500.0
    if n in BBOX:
        x0, y0, x1, y1 = [int(v*sc) for v in BBOX[n]]
        box = np.zeros_like(M); box[y0:y1, x0:x1] = True; M &= box
    ycc = cv2.cvtColor(rgb, cv2.COLOR_RGB2YCrCb).astype(int)
    Y, Cr, Cb = ycc[...,0], ycc[...,1], ycc[...,2]
    skin = (Cr>=134)&(Cr<=182)&(Cb>=74)&(Cb<=134)&(Y>55)&M
    skin = cv2.morphologyEx(skin.astype(np.uint8), cv2.MORPH_OPEN, K(3))
    skin = cv2.morphologyEx(skin, cv2.MORPH_CLOSE, K(9)) > 0
    edge = M & ~(cv2.erode(M.astype(np.uint8), K(5)) > 0)
    k, lab = cv2.connectedComponents(skin.astype(np.uint8), connectivity=8)
    F = np.zeros_like(M)
    for i in range(1, k):
        comp = lab == i
        if (comp & edge).sum() > 6 and comp.sum() > 120: F |= comp
    if n in NEUTRAL:
        hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV).astype(int)
        hh, ss, vv = hsv[...,0], hsv[...,1], hsv[...,2]
        warm = ((hh <= 17) | (hh >= 168)) & (ss > 28) & (vv > 30) & M
        warm = cv2.morphologyEx(warm.astype(np.uint8), cv2.MORPH_OPEN, K(3)) > 0
        F = F | warm
        Fs = cv2.dilate(F.astype(np.uint8), K(5)) > 0
        Fd = cv2.dilate(F.astype(np.uint8), K(11)) > 0
    else:
        Fs = cv2.dilate(F.astype(np.uint8), K(5)) > 0
        Fd = cv2.dilate(F.astype(np.uint8), K(17)) > 0
    core = fill_holes(largest(cv2.morphologyEx((M & ~Fs).astype(np.uint8), cv2.MORPH_OPEN, K(5)) > 0))
    ys = np.where(core.any(1))[0]; wid = core[ys].sum(1); body = ys[wid >= 0.75*wid.max()]
    lx = np.array([np.argmax(core[y]) for y in body]); a, _ = np.polyfit(body, lx, 1)
    ang = -np.degrees(np.arctan(a))
    R  = rot(rgb, ang, cv2.INTER_CUBIC)
    C  = rot(core.astype(np.uint8)*255, ang, cv2.INTER_NEAREST) > 127
    Fr = rot(Fd.astype(np.uint8)*255, ang, cv2.INTER_NEAREST) > 127
    H, W = C.shape
    rows = np.where(C.any(1))[0]; r0, r1 = rows[0], rows[-1]
    L = np.full(H, np.nan); Rt = np.full(H, np.nan); okL = np.zeros(H, bool); okR = np.zeros(H, bool)
    for y in rows:
        xs = np.where(C[y])[0]; L[y], Rt[y] = xs[0], xs[-1]
        okL[y] = not Fr[y, max(int(L[y])-6,0):int(L[y])+4].any()
        okR[y] = not Fr[y, max(int(Rt[y])-4,0):int(Rt[y])+7].any()
    both = rows[okL[rows] & okR[rows]]
    w = Rt[both] - L[both]; br = both[w >= 0.8*np.max(w)] if len(both) else both
    if len(br) < 5: br = rows[: max(5, len(rows)//10)]
    axis = float(np.median((L[br] + Rt[br]) / 2))
    # half-width profile: narrowest clean side wins (protrusions are never real)
    hw = np.full(H, np.nan)
    for y in rows:
        c = []
        if okL[y]: c.append(axis - L[y])
        if okR[y]: c.append(Rt[y] - axis)
        if c: hw[y] = min(c)
    seg = np.arange(r0, r1+1); h = hw[seg]
    idx = np.where(~np.isnan(h))[0]; h = np.interp(np.arange(len(h)), idx, h[idx])
    hs = medfilt(h, 9)
    top = np.percentile(hs, 95); isbody = hs >= 0.9*top
    by = seg[isbody]
    if len(by) > 10:
        vx, vy, x0_, y0_ = cv2.fitLine(np.stack([by, hs[isbody]], 1).astype(np.float32), cv2.DIST_HUBER, 0, 0.01, 0.01).ravel()
        fit = y0_ + (by - x0_) * (vy / vx)
        hs[isbody] = fit
    hs = np.minimum(hs, np.max(hs[isbody]) if isbody.any() else hs.max())
    S = np.zeros((H, W), bool)
    toprows = int(0.14 * (r1 - r0))
    for i, y in enumerate(seg):
        if i < toprows and okL[y] and okR[y] and not np.isnan(L[y]):
            l, r = int(L[y]), int(Rt[y])          # keep real cap/spout shape
        else:
            l, r = int(round(axis - hs[i])), int(round(axis + hs[i]))
        if r > l: S[y, max(l,0):min(r,W-1)+1] = True
    S = cv2.morphologyEx(S.astype(np.uint8), cv2.MORPH_CLOSE, K(5))
    S = fill_holes(largest(cv2.medianBlur(S*255, 5) > 127))
    if n in NEUTRAL:
        hsvR = cv2.cvtColor(R, cv2.COLOR_RGB2HSV).astype(int)
        warmR = (((hsvR[...,0] <= 17) | (hsvR[...,0] >= 168)) & (hsvR[...,1] > 28)) & S
        ring = S & ~(cv2.erode(S.astype(np.uint8), K(15)) > 0)
        cut = cv2.dilate((warmR & ring).astype(np.uint8), K(5)) > 0
        S2 = S & ~cut
        S2 = cv2.morphologyEx(S2.astype(np.uint8), cv2.MORPH_OPEN, K(5)) > 0
        rowsS = np.where(S2.any(1))[0]
        Sm = np.zeros_like(S2)
        for y in rowsS:   # keep the row symmetric: use the narrower side of the trimmed row
            xs = np.where(S2[y])[0]; hwy = min(axis - xs[0], xs[-1] - axis)
            if hwy > 2: Sm[y, int(round(axis-hwy)):int(round(axis+hwy))+1] = True
        S = fill_holes(largest(cv2.medianBlur(Sm.astype(np.uint8)*255, 5) > 127))
    bad = S & (Fr | ~C)
    out = R.copy(); yy, xx = np.where(bad)
    mx = np.clip(np.round(2*axis - xx).astype(int), 0, W-1)
    good = C[yy, mx] & ~Fr[yy, mx]
    out[yy[good], xx[good]] = R[yy[good], mx[good]]
    rest = np.zeros((H, W), np.uint8); rest[yy[~good], xx[~good]] = 1
    seam = (cv2.dilate(bad.astype(np.uint8), K(3)) & ~cv2.erode(bad.astype(np.uint8), K(3))) & S.astype(np.uint8)
    out = cv2.cvtColor(cv2.inpaint(cv2.cvtColor(out, cv2.COLOR_RGB2BGR), rest | seam, 4, cv2.INPAINT_TELEA), cv2.COLOR_BGR2RGB)
    alpha = np.clip((cv2.GaussianBlur(S.astype(np.float32), (0,0), 0.9) - 0.15) / 0.7, 0, 1)
    ys2, xs2 = np.where(S); y0, y1, x0, x1 = ys2.min(), ys2.max(), xs2.min(), xs2.max()
    p = int(0.03*(y1-y0)); y0, x0 = max(y0-p,0), max(x0-p,0); y1, x1 = min(y1+p,H-1), min(x1+p,W-1)
    im = Image.fromarray(np.dstack([out, (alpha*255).astype(np.uint8)])[y0:y1+1, x0:x1+1], "RGBA")
    im.thumbnail((400, 400), Image.LANCZOS); im.save(f"cut_{n}.png")
    report[n] = (round(ang,1), round(axis), int(bad.sum()))
print(report)
tiles = []
for n in names:
    t = Image.open(f"cut_{n}.png").copy(); t.thumbnail((280, 400))
    col = Image.new("RGBA", (300, 850), (90,90,90,255))
    for i, bg in enumerate([(241,239,233,255), (42,41,38,255)]):
        b = Image.new("RGBA", (300, 420), bg); b.alpha_composite(t, ((300-t.width)//2, (420-t.height)//2)); col.alpha_composite(b, (0, i*430))
    tiles.append(col)
sheet = Image.new("RGBA", (len(tiles)*310, 850), (90,90,90,255))
for i, t in enumerate(tiles): sheet.alpha_composite(t, (i*310, 0))
sheet.convert("RGB").save("sheet6.png")
