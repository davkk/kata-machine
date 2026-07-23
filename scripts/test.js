const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { get_latest_session } = require("./session-helper");

const targetDir = path.resolve(process.argv[2] || path.join("sessions", get_latest_session()));

const testPattern = fs.readdirSync(targetDir)
    .filter(f => f.endsWith(".ts"))
    .map(f => `src/__tests__/${f.replace(".ts", "")}.ts`);

if (testPattern.length === 0) process.exit(1);

try {
    execSync(
        `npx vitest run --reporter dot --config vitest.config.ts ${testPattern.join(" ")}`,
        { stdio: "inherit", timeout: 120000, env: { ...process.env, TEST_TARGET: targetDir } });
} catch {
    process.exit(1);
}
