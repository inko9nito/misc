import cv2, numpy as np
from rembg import new_session, remove
from PIL import Image
names = ["mag","bone","d3k2","lymph","drain","silver","intz","biod"]
s = new_session("isnet-general-use")
tiles=[]
for n in names:
    im = Image.open(f"src/{n}.jpg").convert("RGB")
    im.thumbnail((1000,1000))
    m = remove(im, session=s, only_mask=True)
    m.save(f"mask_{n}.png"); im.save(f"small_{n}.png")
    a = np.array(m); rgb = np.array(im)
    # skin mask (YCrCb)
    ycc = cv2.cvtColor(rgb, cv2.COLOR_RGB2YCrCb)
    Y,Cr,Cb = ycc[...,0],ycc[...,1],ycc[...,2]
    skin = ((Cr>=136)&(Cr<=175)&(Cb>=80)&(Cb<=130)&(Y>85)).astype(np.uint8)*255
    vis = rgb.copy()
    vis[a<128] = (vis[a<128]*0.25).astype(np.uint8)
    vis[(skin>0)&(a>=128)] = [255,0,255]
    t = Image.fromarray(vis); t.thumbnail((300,400)); tiles.append(t)
W=sum(t.width for t in tiles)+10*len(tiles); H=max(t.height for t in tiles)
sheet=Image.new("RGB",(W,H),(40,40,40)); x=0
for t in tiles: sheet.paste(t,(x,0)); x+=t.width+10
sheet.save("sheet1.png")
