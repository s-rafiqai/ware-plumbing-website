#!/usr/bin/env bash
#
# Fetch the legacy Ware Plumbing images from the old WordPress site into
# public/assets, organised and cleanly named. Re-runnable (overwrites).
#
# KEEP assets (brand + service icons) are used in the build.
# _replace/ photos are stock/low-res placeholders — swap for real photography
# before launch (and they're gitignored).
#
# Usage: bash scripts/fetch-legacy-images.sh
set -u

# Resolve repo root from this script's location so it works from anywhere.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# target-path <TAB> source-url
MAPPINGS=$(
  cat <<'EOF'
public/assets/logo/ware-plumbing-logo.png	https://wareplumbing.com.au/wp-content/uploads/2022/08/cropped-030WARE_-_MAIN_WARE_PLUMBING-preview.png
public/assets/photos/hero-plumber.png	https://wareplumbing.com.au/wp-content/uploads/2022/08/Ware-Plumbing-website-photo-plumber.png
public/assets/photos/roofing.jpg	https://wareplumbing.com.au/wp-content/uploads/2023/08/roof-plumber-roof-reapir.jpg
public/assets/icons/water-leaks.png	https://wareplumbing.com.au/wp-content/uploads/2022/08/Water-leak-white.png
public/assets/icons/drain-cleaning.png	https://wareplumbing.com.au/wp-content/uploads/2022/08/Drain-Cleaning-white.png
public/assets/icons/taps-toilets.png	https://wareplumbing.com.au/wp-content/uploads/2022/08/Taps-Toilets-Repairs-white.png
public/assets/icons/gas-fitting.png	https://wareplumbing.com.au/wp-content/uploads/2022/08/Gas-Fittinf-Repairs-white.png
public/assets/icons/hot-water.png	https://wareplumbing.com.au/wp-content/uploads/2022/08/Hot-Wate-Systems-white.png
public/assets/icons/burst-pipe.png	https://wareplumbing.com.au/wp-content/uploads/2022/08/Burst-Pipe-white.png
public/assets/icons/roofing.png	https://wareplumbing.com.au/wp-content/uploads/2022/09/Roofing-Repairs-Red.png
public/assets/photos/_replace/water-leaks.jpeg	https://wareplumbing.com.au/wp-content/uploads/2021/03/water-tap.jpeg
public/assets/photos/_replace/drain-cleaning.jpg	https://wareplumbing.com.au/wp-content/uploads/2023/08/Drain-Cleaning.jpg
public/assets/photos/_replace/taps-toilets.jpg	https://wareplumbing.com.au/wp-content/uploads/2022/08/toilet-bidet-vater-1284608.jpg
public/assets/photos/_replace/gas-fitting.jpg	https://wareplumbing.com.au/wp-content/uploads/2020/07/water-pipe-valve.jpg
public/assets/photos/_replace/hot-water.jpeg	https://wareplumbing.com.au/wp-content/uploads/2023/08/hot-water-system.jpeg
public/assets/photos/_replace/burst-pipe.webp	https://wareplumbing.com.au/wp-content/uploads/2023/08/burst-pipe-repairs-and-location.jpeg.webp
public/assets/photos/_replace/about.jpg	https://wareplumbing.com.au/wp-content/uploads/2020/08/services-01-free-img.jpg
EOF
)

ok=0
fail=0
failed_list=""

while IFS=$'\t' read -r target url; do
  [ -z "$target" ] && continue
  mkdir -p "$(dirname "$target")"
  if curl -fsSL --retry 2 --connect-timeout 20 -o "$target" "$url"; then
    printf '  OK    %s\n' "$target"
    ok=$((ok + 1))
  else
    printf '  FAIL  %s  <-  %s\n' "$target" "$url"
    rm -f "$target" # don't leave a 0-byte/error file behind
    fail=$((fail + 1))
    failed_list="${failed_list}\n  - ${target}  <-  ${url}"
  fi
done <<< "$MAPPINGS"

echo
echo "Done: ${ok} succeeded, ${fail} failed."
if [ "$fail" -gt 0 ]; then
  printf 'Failed downloads:%b\n' "$failed_list"
fi
