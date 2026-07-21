const fs = require("fs");
const path = require("path");
const dsa = require("./dsa");

const HISTORY_FILE = path.join(__dirname, "..", ".last-katas.json");
const CONFIG_FILE = path.join(__dirname, "..", "ligma.config.js");

const all_katas = Object.keys(dsa).sort();

function read_history() {
    try {
        return JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
    } catch {
        return [];
    }
}

function write_history(picks) {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(picks, null, 4));
}

function pick_n(names, n, exclude) {
    const pool = names.filter(n => !exclude.includes(n));
    if (pool.length < n) {
        return names.sort(() => Math.random() - 0.5).slice(0, n);
    }
    return pool.sort(() => Math.random() - 0.5).slice(0, n);
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

const previous = read_history();
const picks = pick_n(all_katas, 3, previous);

write_config(picks);
write_history(picks);

console.log("Picked katas:", picks.join(", "));
