const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const GOLDEN_DIR = path.join(__dirname, "..", "golden");
const SESSION_DIR = path.join(__dirname, "..", "sessions", "session1");

const goldens = fs.readdirSync(GOLDEN_DIR).filter(f => f.endsWith(".ts"));

// Save current stubs
const backup = {};
for (const f of goldens) {
    const src = path.join(SESSION_DIR, f);
    try { backup[f] = fs.readFileSync(src, "utf-8"); } catch {}
}

// Copy goldens to session
for (const f of goldens) {
    fs.copyFileSync(path.join(GOLDEN_DIR, f), path.join(SESSION_DIR, f));
}

// Get test names from golden file names
const testNames = goldens.map(f => f.replace(".ts", "")).join(" ");

let exitCode = 0;
try {
    console.log(`Running ${goldens.length} tests...\n`);
    execSync(`npx jest ${testNames} --no-coverage`, { stdio: "inherit", timeout: 120000 });
    console.log(`\nAll ${goldens.length} goldens passed!`);
} catch {
    console.log("\nSome goldens failed.");
    exitCode = 1;
}

// Restore stubs
for (const [f, content] of Object.entries(backup)) {
    if (content !== undefined) {
        fs.writeFileSync(path.join(SESSION_DIR, f), content);
    }
}

process.exit(exitCode);
