#!/bin/bash
set -e

echo "🔍 Starting Vercel Clean Check..."

# 1. Check for AppleDouble files
echo "Checking for garbage files (._*)..."
GARBAGE=$(find . -type f -name "._*" -not -path "./.git/*")
if [ -n "$GARBAGE" ]; then
    echo "❌ Garbage files found:"
    echo "$GARBAGE"
    echo "👉 Run: find . -type f -name '._*' -delete"
else
    echo "✅ No garbage files found."
fi

# 2. Check for tracked build artifacts
echo "Checking for tracked build artifacts..."
TRACKED_IGNORED=$(git ls-files -i --exclude-standard -c)
if [ -n "$TRACKED_IGNORED" ]; then
    echo "❌ Ignored files are tracked by git:"
    echo "$TRACKED_IGNORED"
    echo "👉 Run: git rm --cached <file>"
else
    echo "✅ No ignored files tracked."
fi

# 3. Check for lockfile consistency
echo "Checking lockfiles..."
if [ -f "package-lock.json" ] && [ -f "yarn.lock" ]; then
    echo "❌ Multiple lockfiles found (package-lock.json AND yarn.lock). Delete one."
else
    echo "✅ Lockfile consistent."
fi

# 4. Check next.config.ts existence
echo "Checking Next.js config..."
if [ -f "next.config.ts" ] || [ -f "next.config.js" ] || [ -f "next.config.mjs" ]; then
    echo "✅ next.config found."
else
    echo "❌ Missing next.config.*"
fi

echo "🏁 Check complete."
