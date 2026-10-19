// Renders the Home Screen app's images from icon.svg and devices.json, and
// writes the launch-image <link>s into head.html. Re-run after changing
// either file:
//   npm i --no-save playwright && node generate.mjs
// (set PLAYWRIGHT_EXECUTABLE_PATH=/opt/pw-browsers/chromium if Chromium's
// default binary isn't installed).
//
// Launch images are what iOS shows while the Home Screen app opens: the
// app's background, light or dark, so it doesn't flash white. iOS only uses
// one whose media query matches the phone exactly, so a new iPhone size
// needs a row in devices.json.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const here = (p) => fileURLToPath(new URL(p, import.meta.url))

const ICONS = [
  { file: 'favicon-64.png', size: 64 },         // browser tabs
  { file: 'apple-touch-icon.png', size: 180 },  // iOS Home Screen
  { file: 'icon-192.png', size: 192 },          // Android
  { file: 'icon-512.png', size: 512 },          // Android splash
]
// The app's --bg tokens.
const THEMES = [
  { name: 'dark', bg: '#151513', media: ' and (prefers-color-scheme: dark)' },
  { name: 'light', bg: '#F5F4F0', media: '' },
]

const svg = await readFile(here('./icon.svg'), 'utf8')
const devices = JSON.parse(await readFile(here('./devices.json'), 'utf8'))
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined })

const page = await browser.newPage()
for (const { file, size } of ICONS) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(`<style>html,body{margin:0}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`)
  await writeFile(here(file), await page.screenshot())
  console.log(`wrote ${file}`)
}
await page.close()

await mkdir(here('./launch'), { recursive: true })
const links = []
// Dark first: a phone in light mode skips those links and takes the light ones.
for (const theme of THEMES) {
  for (const { width, height, ratio } of devices) {
    const file = `launch/${width}x${height}@${ratio}x-${theme.name}.png`
    const p = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: ratio })
    await p.setContent(`<style>html,body{margin:0;height:100%;background:${theme.bg}}</style>`)
    await writeFile(here(file), await p.screenshot())
    await p.close()
    links.push(`<link rel="apple-touch-startup-image" media="(device-width: ${width}px) and (device-height: ${height}px) and (-webkit-device-pixel-ratio: ${ratio}) and (orientation: portrait)${theme.media}" href="${file}">`)
  }
}
console.log(`wrote ${links.length} launch images`)
await browser.close()

const head = await readFile(here('./head.html'), 'utf8')
const start = '<!-- launch:start -->', end = '<!-- launch:end -->'
const next = head.replace(new RegExp(`${start}[\\s\\S]*?${end}`), `${start}\n${links.join('\n')}\n${end}`)
if (next === head && !head.includes(start)) throw new Error('head.html is missing the launch markers')
await writeFile(here('./head.html'), next)
console.log('updated head.html')
