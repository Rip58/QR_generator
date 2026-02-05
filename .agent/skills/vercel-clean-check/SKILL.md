---
name: vercel-clean-check
description: Use when preparing for Vercel deployment, migrating projects, or debugging build errors (404, 500)
---

# Vercel Clean Check

## Overview
Ensures a Next.js/React project is clean, structurally sound, and ready for Vercel deployment. Prevents common errors like "AppleDouble" garbage files, case sensitivity collisions, and missing configurations.

## When to Use
- Before `git push` to a deployment branch.
- When Vercel build fails with opaque errors (404, 500).
- When migrating codebases between OSs (Mac -> Linux).

## Core Checks
1.  **Garbage Files**: key culprit for Vercel 404s (e.g., `._*`, `.DS_Store`).
2.  **Case Sensitivity**: Linux is case-sensitive; macOS is not. `File.js` vs `file.js` collisions break builds.
3.  **Configuration**: Verify `next.config.ts` and `package.json` build scripts.
4.  **Git Status**: Ensure build artifacts (`.next`, `node_modules`) are NOT tracked.

## Automated Check
Run the included script to validate the project status:

```bash
bash .agent/skills/vercel-clean-check/scripts/check.sh
```

## Quick Reference
| Issue | Symptom | Fix |
|-------|---------|-----|
| AppleDouble | Vercel 404 / Build Fail | `find . -name "._*" -delete` |
| Case Sensitivity | "Module not found" | Renaming requires `git mv` |
| Bad Config | Build Error | Check `output: 'export'` usage |
