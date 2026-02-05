#!/usr/bin/env python3
import os
import sys
import argparse
import subprocess
from pathlib import Path

def run_command(command, cwd=None):
    try:
        result = subprocess.run(
            command,
            cwd=cwd,
            shell=True,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        return None

def check_git_repo():
    if not run_command("git rev-parse --is-inside-work-tree"):
        print("❌ Not a git repository.")
        sys.exit(1)

def find_garbage_files():
    # Find AppleDouble files (._*) and .DS_Store
    print("🔍 Scanning for garbage files...")
    
    # Get all files tracked by git
    tracked_files = run_command("git ls-files").split('\n')
    
    garbage = []
    for f in tracked_files:
        path = Path(f)
        if path.name.startswith("._") or path.name == ".DS_Store":
            garbage.append(f)
            
    return garbage

def check_gitignore():
    print("REVIEWING .gitignore...")
    if not os.path.exists(".gitignore"):
        print("❌ .gitignore not found!")
        return False
        
    with open(".gitignore", "r") as f:
        content = f.read()
        
    issues = []
    if "._*" not in content:
        issues.append("Missing '._*' (AppleDouble files)")
    if ".DS_Store" not in content:
        issues.append("Missing '.DS_Store'")
        
    if issues:
        print("⚠️  .gitignore gaps found:")
        for i in issues:
            print(f"   - {i}")
        return False
    else:
        print("✅ .gitignore looks good.")
        return True

def fix_garbage(garbage_files):
    if not garbage_files:
        print("✅ No garbage files to clean.")
        return

    print(f"🧹 Removing {len(garbage_files)} garbage files from git...")
    for f in garbage_files:
        run_command(f"git rm -f '{f}'")
        print(f"   Deleted: {f}")
    
    print("✅ Cleanup complete. Remember to commit these changes!")

def main():
    parser = argparse.ArgumentParser(description="Audit codebase for Vercel deployment issues.")
    parser.add_argument("--fix", action="store_true", help="Automatically remove garbage files from git.")
    args = parser.parse_args()

    check_git_repo()
    
    # 1. Check .gitignore
    check_gitignore()
    
    # 2. Find garbage
    garbage = find_garbage_files()
    
    if garbage:
        print(f"❌ Found {len(garbage)} garbage files tracked by git:")
        for g in garbage[:10]:
            print(f"   - {g}")
        if len(garbage) > 10:
            print(f"   ...and {len(garbage) - 10} more.")
            
        if args.fix:
            fix_garbage(garbage)
        else:
            print("\n❌ Audit FAILED. Run with --fix to clean up.")
            sys.exit(1)
    else:
        print("✅ No tracked garbage files found.")
        print("🚀 Codebase looks clean for deployment!")

if __name__ == "__main__":
    main()
