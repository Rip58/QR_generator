#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function runCommand(command) {
    try {
        return execSync(command, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
    } catch (e) {
        return null;
    }
}

function checkGitRepo() {
    if (!runCommand('git rev-parse --is-inside-work-tree')) {
        console.error('❌ Not a git repository.');
        process.exit(1);
    }
}

function findGarbageFiles() {
    console.log('🔍 Scanning for garbage files...');
    const trackedFiles = runCommand('git ls-files').split('\n').filter(Boolean);

    return trackedFiles.filter(file => {
        const basename = path.basename(file);
        return basename.startsWith('._') || basename === '.DS_Store';
    });
}

function checkGitignore() {
    console.log('REVIEWING .gitignore...');
    if (!fs.existsSync('.gitignore')) {
        console.error('❌ .gitignore not found!');
        return false;
    }

    const content = fs.readFileSync('.gitignore', 'utf8');
    const issues = [];

    if (!content.includes('._*')) issues.push("Missing '._*' (AppleDouble files)");
    if (!content.includes('.DS_Store')) issues.push("Missing '.DS_Store'");

    if (issues.length > 0) {
        console.warn('⚠️  .gitignore gaps found:');
        issues.forEach(issue => console.warn(`   - ${issue}`));
        return false;
    } else {
        console.log('✅ .gitignore looks good.');
        return true;
    }
}

function fixGarbage(garbageFiles) {
    if (garbageFiles.length === 0) {
        console.log('✅ No garbage files to clean.');
        return;
    }

    console.log(`🧹 Removing ${garbageFiles.length} garbage files from git...`);
    garbageFiles.forEach(file => {
        runCommand(`git rm -f "${file}"`);
        console.log(`   Deleted: ${file}`);
    });

    console.log('✅ Cleanup complete. Remember to commit these changes!');
}

function main() {
    const args = process.argv.slice(2);
    const shouldFix = args.includes('--fix');

    checkGitRepo();
    checkGitignore();

    const garbage = findGarbageFiles();

    if (garbage.length > 0) {
        console.error(`❌ Found ${garbage.length} garbage files tracked by git:`);
        garbage.slice(0, 10).forEach(g => console.error(`   - ${g}`));
        if (garbage.length > 10) console.error(`   ...and ${garbage.length - 10} more.`);

        if (shouldFix) {
            fixGarbage(garbage);
        } else {
            console.error('\n❌ Audit FAILED. Run with --fix to clean up.');
            process.exit(1);
        }
    } else {
        console.log('✅ No tracked garbage files found.');
        console.log('🚀 Codebase looks clean for deployment!');
    }
}

main();
