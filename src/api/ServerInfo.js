const config = require("../../config.json")

class ServerInfo {}

module.exports = {
    lang: require(`../lang/${require("../../config.json").lang}.json`),
    config: require("../../config.json"),
    serverversion: "1.3",
    commands: require(`../../commands.json`),
};
