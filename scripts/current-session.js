const path = require("path");
const { get_latest_session } = require("./session-helper");
console.log(path.join("sessions", get_latest_session()));
