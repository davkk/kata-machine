const fs = require("fs");
const path = require("path");
const dsa = require("./dsa");

const ACTIVE_FILE = path.join(__dirname, "..", ".active.json");
function read_json(file, fallback) {
    try { return JSON.parse(fs.readFileSync(file, "utf-8")); }
    catch { return fallback; }
}
const config = { dsa: read_json(ACTIVE_FILE, []) };

const GOLDEN_PATH = path.join(__dirname, "..", "golden");

function get_description(name) {
    try {
        const content = fs.readFileSync(path.join(GOLDEN_PATH, `${name}.ts`), "utf-8");
        const lines = content.split("\n");
        let inDesc = false;
        const desc = [];
        for (const line of lines) {
            if (line.startsWith("// ===")) { inDesc = true; continue; }
            if (line.startsWith("// Steps:")) break;
            if (inDesc) {
                if (line.startsWith("//")) {
                    const text = line.replace(/^\/\/ ?/, "");
                    desc.push(text);
                } else break;
            }
        }
        while (desc.length > 0 && desc[0] === "") desc.shift();
        while (desc.length > 0 && desc[desc.length - 1] === "") desc.pop();
        return desc;
    } catch {
        return [];
    }
}



const sessions_path = path.join(__dirname, "..", "sessions");
let session = 1;

try {
    fs.mkdirSync(sessions_path, { recursive: true });
    session = +fs.readdirSync(sessions_path).
        filter(i => i.includes("session")).
        sort((a, b) => {
            return +b.substring(7) - a.substring(7);
        })[0].substring(7) + 1;

    if (isNaN(session)) {
        console.log("session is nan");
        session = 1;
    }
} catch (e) {
    session = 1;
}

const session_name = `session${session}`;
const session_path = path.join(sessions_path, session_name);
const relative_session_path = path.relative(process.cwd(), session_path);
try { fs.unlinkSync(session_path); } catch (e) { }
try { fs.mkdirSync(session_path); } catch (e) { }

function generate_method(method) {
    return `${method.name}(${method.args || ""}): ${method.return || "void"} {

    }`;
}

function generate_property(prop) {
    return `${prop.scope} ${prop.name}: ${prop.type};`
}

function generate_getter(getter) {
    return `get ${getter.name}(): ${getter.return} {
    return this.${getter.prop_name};
}`
}

function create_class(name, item) {
    const desc = get_description(name);
    const parts = [];

    for (const line of desc) {
        parts.push(`// ${line}`);
    }
    if (desc.length > 0) parts.push("//");

    parts.push(`export default class ${name}${item.generic || ""} {`);

    if (item.properties && item.properties.length > 0) {
        parts.push(`    ${item.properties.map(generate_property).join("\n    ")}`);
    }

    if (item.getters && item.getters.length > 0) {
        if (parts[parts.length - 1] !== `export default class ${name}${item.generic || ""} {`) {
            parts.push("");
        }
        parts.push(`    ${item.getters.map(generate_getter).join("\n    ")}`);
    }

    parts.push("");
    parts.push("    constructor() {");
    parts.push("    }");

    if (item.methods && item.methods.length > 0) {
        parts.push("");
        parts.push(`    ${item.methods.map(generate_method).join("\n    ")}`);
    }

    parts.push("}");

    fs.writeFileSync(path.join(session_path, `${name}.ts`), parts.join("\n") + "\n");
}

function create_function(name, item) {
    const desc = get_description(name);
    const parts = [];

    for (const line of desc) {
        parts.push(`// ${line}`);
    }
    if (desc.length > 0) parts.push("//");

    const g = item.generic ? item.generic : "";
    parts.push(`export default function ${item.fn}${g}(${item.args}): ${item.return} {`);
    parts.push("");
    parts.push("}");

    fs.writeFileSync(path.join(session_path, `${name}.ts`), parts.join("\n") + "\n");
}

config.dsa.forEach(ds => {
    const item = dsa[ds];
    if (!item) {
        throw new Error(`algorithm ${ds} could not be found`);
    }
    if (item.type === "class") {
        create_class(ds, item);
    } else {
        create_function(ds, item);
    }
});

const align = require("./align-configs");
align.jest(session_name);
align.ts_config(session_name);
align.package_json(config, relative_session_path);
align.stats(config, session_path);
