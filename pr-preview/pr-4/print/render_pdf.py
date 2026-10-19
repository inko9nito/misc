import sys, asyncio
from playwright.async_api import async_playwright
src, pdf, png = sys.argv[1], sys.argv[2], sys.argv[3]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome")
        pg = await b.new_page(viewport={"width":528,"height":816}, device_scale_factor=2)
        await pg.goto("file://"+src)
        await pg.evaluate("document.fonts.ready")
        await pg.wait_for_timeout(300)
        # overflow check per page
        info = await pg.evaluate("""() => [...document.querySelectorAll('.page')].map(p => {
            const r = p.getBoundingClientRect(); let maxB = 0;
            p.querySelectorAll('*').forEach(e => { const b = e.getBoundingClientRect().bottom; if (b > maxB) maxB = b; });
            return {pageBottom: r.bottom, contentBottom: maxB, limit: r.bottom - 40, fontOK: document.fonts.check('700 15px Figtree')};
        })""")
        print(info)
        await pg.set_viewport_size({"width":528,"height":1632})
        await pg.screenshot(path=png, full_page=True)
        await pg.pdf(path=pdf, width="5.5in", height="8.5in", print_background=True, margin={"top":"0","right":"0","bottom":"0","left":"0"})
        await b.close()
asyncio.run(main())
