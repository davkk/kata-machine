const fs = require("fs");
const path = require("path");

const sessions_path = path.join(__dirname, "..", "sessions");

try {
    fs.readdirSync(sessions_path)
        .filter(f => f.startsWith("session"))
        .forEach(f => fs.rmSync(path.join(sessions_path, f), { recursive: true, force: true }));
} catch (e) { console.log(e); }
