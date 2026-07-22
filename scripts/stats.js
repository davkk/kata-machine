const fs = require("fs");
const path = require("path");
const dsa = require("./dsa");

const REVIEW_FILE = path.join(__dirname, "..", ".review-data.json");
const ACTIVE_FILE = path.join(__dirname, "..", ".active.json");
const STATS_FILE = path.join(__dirname, "..", ".stats.json");
const DAILY_AVG_FILE = path.join(__dirname, "..", ".daily-averages.json");

function read_json(file, fallback) {
    try { return JSON.parse(fs.readFileSync(file, "utf-8")); }
    catch { return fallback; }
}

function today_str() {
    return new Date().toISOString().split("T")[0];
}

const all_katas = Object.keys(dsa).sort();
const reviews = read_json(REVIEW_FILE, {});
const active = read_json(ACTIVE_FILE, []);
const session_stats = read_json(STATS_FILE, {});
const today = today_str();

// --- Stats section ---

const reviewed = Object.keys(reviews);
const never_reviewed = all_katas.filter(k => !reviews[k]);

const due_now = all_katas.filter(k => {
    const r = reviews[k];
    return r && r.next_review && r.next_review <= today;
});

const not_due = all_katas.filter(k => {
    const r = reviews[k];
    return r && r.next_review && r.next_review > today;
});

const scores = [];
for (const k of reviewed) {
    for (const r of reviews[k].reviews) {
        scores.push(r.score);
    }
}
const avg_score = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : "N/A";

const review_dates = new Set();
for (const k of reviewed) {
    for (const r of reviews[k].reviews) {
        review_dates.add(r.date);
    }
}
const sorted_dates = [...review_dates].sort();
let streak = 0;
for (let i = sorted_dates.length - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - (sorted_dates.length - 1 - i));
    if (sorted_dates[i] === d.toISOString().split("T")[0]) {
        streak++;
    } else {
        break;
    }
}

const ef_buckets = { "< 2.0": 0, "2.0-2.5": 0, "2.5-3.0": 0, "> 3.0": 0 };
for (const k of reviewed) {
    const ef = reviews[k].easiness || 2.5;
    if (ef < 2.0) ef_buckets["< 2.0"]++;
    else if (ef <= 2.5) ef_buckets["2.0-2.5"]++;
    else if (ef <= 3.0) ef_buckets["2.5-3.0"]++;
    else ef_buckets["> 3.0"]++;
}

const max_ef = Math.max(1, ...Object.values(ef_buckets));

console.log("=== Kata Review Stats ===\n");
console.log(`Total katas:       ${all_katas.length}`);
console.log(`Reviewed:          ${reviewed.length}`);
console.log(`Never reviewed:    ${never_reviewed.length}`);
console.log(`Due today/overdue: ${due_now.length}`);
console.log(`Scheduled later:   ${not_due.length}`);
console.log(`Average score:     ${avg_score}`);
console.log(`Current streak:    ${streak} day${streak !== 1 ? "s" : ""}\n`);

console.log("Easiness buckets:");
for (const [bucket, count] of Object.entries(ef_buckets)) {
    const bar = "█".repeat(Math.ceil(count / max_ef * 20));
    console.log(`  ${bucket}: ${count} ${bar}`);
}
console.log();

if (due_now.length > 0) {
    console.log("Overdue / due now:");
    for (const k of due_now) {
        const r = reviews[k];
        const due_days = Math.ceil((new Date(today).getTime() - new Date(r.next_review).getTime()) / 86400000);
        console.log(`  ${k} (overdue by ${due_days}d, easiness: ${r.easiness})`);
    }
    console.log();
}

// --- Upcoming schedule ---

const by_date = {};
for (const [kata, data] of Object.entries(reviews)) {
    if (!data.next_review || data.next_review <= today) continue;
    const d = data.next_review;
    if (!by_date[d]) by_date[d] = [];
    by_date[d].push({ name: kata, interval: data.interval, easiness: data.easiness });
}

const sorted_upcoming = Object.keys(by_date).sort();
if (sorted_upcoming.length > 0) {
    console.log("Upcoming schedule:");
    for (const date of sorted_upcoming) {
        console.log(`  ${date}`);
        for (const k of by_date[date]) {
            console.log(`    ${k.name.padEnd(16)} interval: ${k.interval}d  easiness: ${k.easiness}`);
        }
    }
    console.log();
}

// --- Active stats ---

console.log("Active katas (times practiced):");
for (const k of active) {
    console.log(`  ${k.padEnd(16)} ${(session_stats[k] || 0)}x`);
}
console.log();

console.log(`Session count: ${sorted_dates.length}`);

// --- Daily average trend ---

const daily_avgs = read_json(DAILY_AVG_FILE, []).sort((a, b) => a.date.localeCompare(b.date));
if (daily_avgs.length > 0) {
    console.log("\nDaily average scores:");
    const max_bar = 20;
    const max_avg = Math.max(...daily_avgs.map(d => d.avg), 5);
    for (const d of daily_avgs) {
        const bar = "█".repeat(Math.round(d.avg / 5 * max_bar));
        const label = d.avg === 5 ? "5.00" : d.avg.toFixed(2);
        console.log(`  ${d.date}  ${label} ${bar}  (${d.count} reviews)`);
    }
    const all_avgs = daily_avgs.map(d => d.avg);
    const trend = all_avgs.length > 1
        ? (all_avgs[all_avgs.length - 1] - all_avgs[0]).toFixed(2)
        : "N/A";
    console.log(`  Trend: ${trend} from first to last`);
}
