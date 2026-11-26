#!/usr/bin/env bash
# Copies the site's tokens into the Open Design design system, so both use the same values.
# Run after editing tde/site/assets/css/tokens.css. Use --check to fail if they differ.
set -euo pipefail
root="$(cd "$(dirname "$0")/../.." && pwd)"
src="$root/tde/site/assets/css/tokens.css"
dst="$root/.open-design/design-systems/tde/tokens.css"
if [[ "${1:-}" == "--check" ]]; then
  cmp -s "$src" "$dst" && echo "tokens in sync" || { echo "tokens differ: run tde/tools/sync-design-system.sh" >&2; exit 1; }
else
  cp "$src" "$dst"
  echo "copied $src -> $dst"
fi
