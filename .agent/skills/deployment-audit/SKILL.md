---
name: deployment-audit
description: Use when preparing for deployment to Vercel, Netlify, or cloud platforms to detect garbage files or misconfigurations.
---

# Deployment Audit

## Overview
This skill performs a pre-flight check on the codebase to identify common deployment blockers, specifically "garbage" or "orphan" files (like `._` AppleDouble files, `.DS_Store`) and misconfigurations that cause 404 errors or build failures on Linux-based hosting environments.

## When to Use
- **Before pushing** to production or staging.
- **When encountering 404 errors** after a seemingly successful build.
- **When moving code** between operating systems (macOS -> Linux).

## Core Pattern

### The Problem
macOS automatically generates metadata files (starting with `._`) on non-HFS+ volumes (like USB drives or network shares). If accidentally committed, these files confuse build tools (Next.js, Webpack) on Linux servers, leading to silent failures or 404s.

### The Solution
1. **Scan** for restricted file patterns (`._*`, `.DS_Store`).
2. **Verify** `.gitignore` coverage.
3. **Clean** the repository of these artifacts.

## Quick Reference
1. Run the audit script: `python3 .agent/skills/deployment-audit/scripts/audit.py`
2. Review the report.
3. If issues found, run with `--fix` (if implemented) or manually git rm the offenders.

## Implementation

See `scripts/audit.py` for the automated checker.

## Common Mistakes
- Committing `node_modules` (detected by size/count, usually).
- Committing `.env` files (security risk).
- Ignoring `._` files in `.gitignore` but leaving them in the git history (they must be explicitly removed).
