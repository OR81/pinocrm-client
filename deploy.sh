#!/bin/bash
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"
TARGET="$(dirname "$ROOT")/public_html"

npm ci
npm run build

# PM2 پوشه build را سرو می‌کند ولی Vite در dist می‌سازد
rm -rf build
cp -r dist build

# برای حالتی که وب‌سرور مستقیم از public_html بخواند
mkdir -p "$TARGET"
rm -rf "$TARGET/assets"
rm -f  "$TARGET/index.html"
cp -r dist/. "$TARGET"/
[ -f "$TARGET/index.php" ] && mv "$TARGET/index.php" "$TARGET/index.php.bak"

pm2 reload aylin-client --update-env

echo "----- build -----"
ls -la build | head
echo "DONE"
