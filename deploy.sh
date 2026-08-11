#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
TARGET="$(dirname "$ROOT")/public_html"

echo "PROJECT: $ROOT"
echo "TARGET : $TARGET"

npm ci
npm run build

mkdir -p "$TARGET"
rm -rf "$TARGET/assets"
rm -f  "$TARGET/index.html"
cp -r dist/. "$TARGET"/

pm2 reload aylin-client --update-env 2>/dev/null || echo "PM2: aylin-client NOT FOUND"

echo "===== 1) DOMAIN FOLDER ====="
ls -la "$(dirname "$ROOT")"

echo "===== 2) public_html ====="
ls -la "$TARGET"

echo "===== 3) index.html ====="
head -c 700 "$TARGET/index.html"; echo

echo "===== 4) htaccess ====="
cat "$TARGET/.htaccess" 2>/dev/null || echo "no .htaccess"

echo "===== 5) pm2 list ====="
pm2 list 2>/dev/null || echo "no pm2"

echo "===== 6) pm2 detail ====="
pm2 describe aylin-client 2>/dev/null | head -25 || true

echo "DONE"
