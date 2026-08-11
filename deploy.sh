#!/bin/bash
set -e

# پوشه پروژه
ROOT="$(cd "$(dirname "$0")" && pwd)"
# پوشه‌ای که وب‌سرور از آن می‌خواند (کنار پوشه پروژه)
TARGET="$(dirname "$ROOT")/public_html"

echo "PROJECT: $ROOT"
echo "TARGET : $TARGET"

npm ci
npm run build

mkdir -p "$TARGET"

# پاک کردن بیلد قبلی (فایل‌های سیستمی هاست دست‌نخورده می‌مانند)
rm -rf "$TARGET/assets"
rm -f  "$TARGET/index.html"

# کپی بیلد جدید
cp -r dist/. "$TARGET"/

echo "----- محتوای public_html -----"
ls -la "$TARGET"
echo "✅ done"
