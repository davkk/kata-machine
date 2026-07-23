const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { sm2 } = require("./sm2");
const { get_latest_session } = require("./session-helper");

const REVIEW_FILE = path.join(__dirname, "..", ".review-data.json");
const ACTIVE_FILE = path.join(__dirname, "..", ".active.json");
const DAILY_AVG_FILE = path.join(__dirname, "..", ".daily-averages.json");
const SESSION_DIR = path.join(__dirname, "..", "sessions", get_latest_session());

function read_json(file, fallback) {
    try { return JSON.parse(fs.readFileSync(file, "utf-8")); }
    catch { return fallback; }
}

function write_json(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 4));
}

function today_str() {
    return new Date().toISOString().split("T")[0];
}

function get_active_katas() {
    return read_json(ACTIVE_FILE, []);
}

function run_tests(katas) {
    if (katas.length === 0) return true;
    try {
        console.log("Running tests...\n");
        const testPattern = katas.map(k => `src/__tests__/${k}.ts`).join(" ");
        execSync(
            `npx vitest run --reporter dot --config vitest.config.ts ${testPattern}`,
            { stdio: "inherit", timeout: 120000, env: { ...process.env, TEST_TARGET: SESSION_DIR } });
        return true;
    } catch {
        return false;
    }
}

async function main() {
    const katas = get_active_katas();
    if (katas.length === 0) {
        console.log("No active katas found in .active.json.");
        return;
    }

    console.log(`Active katas: ${katas.join(", ")}\n`);

    const passed = run_tests(katas);
    if (!passed) {
        console.log("\nSome tests failed. You can still rate your performance.\n");
    }

    const reviews = read_json(REVIEW_FILE, {});
    const today = today_str();
    const updated = [];
    const stdin = process.stdin;
    const is_piped = !stdin.isTTY;

    let line_index = 0;
    let piped_lines = [];
    if (is_piped) {
        const data = fs.readFileSync(0, "utf-8");
        piped_lines = data.trim().split("\n").map(l => l.trim());
    }

    for (const kata of katas) {
        let raw;
        if (is_piped) {
            raw = piped_lines[line_index++];
            if (raw === undefined) break;
            console.log(`[${kata}] How did you do? (0-5): ${raw}`);
        } else {
            const readline = require("readline");
            const rl = readline.createInterface({ input: stdin, output: process.stdout });
            raw = await new Promise(resolve => rl.question(`[${kata}] How did you do? (0-5): `, resolve));
            rl.close();
        }

        const score = parseInt(raw, 10);
        if (isNaN(score) || score < 0 || score > 5) {
            console.log(`  Skipping ${kata} — invalid score.`);
            continue;
        }
        const prev = reviews[kata];
        const result = sm2(score, prev);
        const entry = {
            reviews: [...(prev ? prev.reviews : []), { date: today, score }],
            interval: result.interval,
            easiness: result.easiness,
            next_review: result.next_review,
        };
        reviews[kata] = entry;
        updated.push(kata);
        console.log(`  → next review: ${result.next_review} (easiness: ${result.easiness}, interval: ${result.interval}d)`);
    }

    write_json(REVIEW_FILE, reviews);
    console.log(`\nRecorded reviews for: ${updated.join(", ") || "none"}`);

    if (updated.length > 0) {
        const today_scores = updated
            .map(k => reviews[k].reviews.findLast(r => r.date === today)?.score)
            .filter(s => s !== undefined);
        if (today_scores.length > 0) {
            const avg = today_scores.reduce((a, b) => a + b, 0) / today_scores.length;
            const daily = read_json(DAILY_AVG_FILE, []);
            const existing = daily.findIndex(d => d.date === today);
            const entry = { date: today, avg: Math.round(avg * 100) / 100, count: today_scores.length };
            if (existing >= 0) daily[existing] = entry;
            else daily.push(entry);
            write_json(DAILY_AVG_FILE, daily);
        }
    }
}

main().catch(console.error);
