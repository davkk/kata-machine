const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const targetDir = path.resolve(process.argv[2] || "sessions/session1");

const files = fs.readdirSync(targetDir)
    .filter(f => f.endsWith(".ts"))
    .map(f => f.replace(".ts", ""));

if (files.length === 0) process.exit(1);

const testPattern = files.map(f => `src/__tests__/${f}.ts`).join(" ");
try {
    execSync(`npx vitest run --reporter verbose --config vitest.config.ts ${testPattern}`,
        { stdio: "inherit", timeout: 120000, env: { ...process.env, TEST_TARGET: targetDir } });
} catch {
    process.exit(1);
}
