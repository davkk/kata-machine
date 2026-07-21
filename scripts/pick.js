const fs = require("fs");
const path = require("path");
const dsa = require("./dsa");

const HISTORY_FILE = path.join(__dirname, "..", ".last-katas.json");
const REVIEW_FILE = path.join(__dirname, "..", ".review-data.json");
const CONFIG_FILE = path.join(__dirname, "..", "ligma.config.js");

const all_katas = Object.keys(dsa).sort();

const count_index = process.argv.indexOf("--count");
const PICK_COUNT = count_index !== -1 ? parseInt(process.argv[count_index + 1], 10) || 5 : 5;

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

function read_history() {
    return read_json(HISTORY_FILE, []);
}

function write_history(picks) {
    write_json(HISTORY_FILE, picks);
}

function read_reviews() {
    return read_json(REVIEW_FILE, {});
}

function write_reviews(reviews) {
    write_json(REVIEW_FILE, reviews);
}

function write_config(picks) {
    const lines = all_katas.map(k => `        ${picks.includes(k) ? "" : "// "}"${k}",`);
    const content = `module.exports = {
    dsa: [
${lines.join("\n")}
    ],
}
`;
    fs.writeFileSync(CONFIG_FILE, content);
}

const today = today_str();
const reviews = read_reviews();
const previous = read_history();

const due = all_katas.filter(k => {
    const r = reviews[k];
    return !r || !r.next_review || r.next_review <= today;
});

const not_due = all_katas.filter(k => !due.includes(k));

due.sort((a, b) => {
    const ra = reviews[a] || {};
    const rb = reviews[b] || {};
    if ((ra.easiness || 2.5) !== (rb.easiness || 2.5)) {
        return (ra.easiness || 2.5) - (rb.easiness || 2.5);
    }
    return (ra.next_review || "") < (rb.next_review || "") ? -1 : 1;
});

const pool = due.filter(k => !previous.includes(k));
let picks = pool.slice(0, PICK_COUNT);

if (picks.length < PICK_COUNT) {
    const fill = all_katas.filter(k => !picks.includes(k) && !previous.includes(k));
    fill.sort(() => Math.random() - 0.5);
    picks = picks.concat(fill.slice(0, PICK_COUNT - picks.length));
}

if (picks.length < PICK_COUNT) {
    const fallback = all_katas.filter(k => !picks.includes(k));
    fallback.sort(() => Math.random() - 0.5);
    picks = picks.concat(fallback.slice(0, PICK_COUNT - picks.length));
}

write_config(picks);
write_history(picks);

console.log(`Picked ${picks.length} katas: ${picks.join(", ")}`);
