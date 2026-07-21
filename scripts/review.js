const fs = require("fs");
const path = require("path");

const REVIEW_FILE = path.join(__dirname, "..", ".review-data.json");
const CONFIG_FILE = path.join(__dirname, "..", "ligma.config.js");

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

function sm2(score, prev) {
    const ef = prev ? prev.easiness : 2.5;
    const interval = prev ? prev.interval : 0;
    let new_ef, new_interval;
    if (score >= 3) {
        if (interval === 0) new_interval = 1;
        else if (interval === 1) new_interval = 6;
        else new_interval = Math.round(interval * ef);
        new_ef = Math.max(1.3, ef + (0.1 - (5 - score) * (0.08 + (5 - score) * 0.02)));
    } else {
        new_interval = 1;
        new_ef = Math.max(1.3, ef);
    }
    const next = new Date();
    next.setDate(next.getDate() + new_interval);
    return {
        interval: new_interval,
        easiness: Math.round(new_ef * 100) / 100,
        next_review: next.toISOString().split("T")[0],
    };
}

function get_active_katas() {
    try {
        const config = require(CONFIG_FILE);
        return config.dsa || [];
    } catch {
        return [];
    }
}

async function main() {
    const katas = get_active_katas();
    if (katas.length === 0) {
        console.log("No active katas found in ligma.config.js.");
        return;
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
}

main().catch(console.error);
