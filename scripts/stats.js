const fs = require("fs");
const path = require("path");
const dsa = require("./dsa");

const REVIEW_FILE = path.join(__dirname, "..", ".review-data.json");

function read_json(file, fallback) {
    try { return JSON.parse(fs.readFileSync(file, "utf-8")); }
    catch { return fallback; }
}

function today_str() {
    return new Date().toISOString().split("T")[0];
}

const all_katas = Object.keys(dsa).sort();
const reviews = read_json(REVIEW_FILE, {});
const today = today_str();

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
    const bar = "█".repeat(Math.ceil(count / Math.max(1, ...Object.values(ef_buckets)) * 20));
    console.log(`  ${bucket}: ${count} ${bar}`);
}
console.log();

if (due_now.length > 0) {
    console.log("Due for review:");
    for (const k of due_now) {
        const r = reviews[k];
        const due_days = Math.ceil((new Date(today).getTime() - new Date(r.next_review).getTime()) / 86400000);
        console.log(`  ${k} (overdue by ${due_days}d, easiness: ${r.easiness})`);
    }
}
