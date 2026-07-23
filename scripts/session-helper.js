const fs = require("fs");
const path = require("path");

function get_latest_session() {
    const sessions_path = path.join(__dirname, "..", "sessions");
    try {
        const sessions = fs.readdirSync(sessions_path)
            .filter(i => i.startsWith("session"))
            .sort((a, b) => {
                const na = parseInt(a.substring(7), 10);
                const nb = parseInt(b.substring(7), 10);
                return nb - na;
            });
        return sessions[0] || "session1";
    } catch {
        return "session1";
    }
}

module.exports = { get_latest_session };
