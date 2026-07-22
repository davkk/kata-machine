const fs = require("fs");
const path = require("path");

const sessions_path = path.join(__dirname, "..", "sessions");

try {
    fs.readdirSync(sessions_path).
        filter(f => {
            if (f.includes("session")) {
                console.log("found", f);
                return true;
            }
            console.log("ignoring", f);
            return false;
        }).
        forEach(f => {
            const file = path.join(sessions_path, f);
            console.log("deleting", file);
            fs.rmSync(file, {
                recursive: true,
                force: true,
            });
        });
} catch (e) { console.log(e); }



