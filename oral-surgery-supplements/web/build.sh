#!/usr/bin/env bash
# Builds the GitHub Pages site into <out-dir>: the app with a real <head>
# (viewport, icons, manifest), its Home Screen images and the print files.
#   bash oral-surgery-supplements/web/build.sh <out-dir>
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
app="$here/../app/surgery-checklist.html"
out="$1"
mkdir -p "$out"
{ cat "$here/head.html"; cat "$app"; printf '\n</body>\n</html>\n'; } > "$out/index.html"
cp "$here"/*.png "$here/manifest.webmanifest" "$out/"
cp -r "$here/launch" "$out/launch"
cp -r "$here/../print" "$out/print"
