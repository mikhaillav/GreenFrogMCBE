/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
const Frog = require("../Frog");

const Colors = require("../api/color/Colors");
const { getKey } = require("../utils/Language");
const VersionToProtocol = require("../utils/VersionToProtocol");

const config = Frog.config;
const version = config.serverInfo.version

/**
 * A command that shows the server's version
 *
 * @type {import('../../declarations/Command').Command}
 */
module.exports = {
	data: {
		name: getKey("commands.version.name"),
		description: getKey("commands.version.description"),
		aliases: [getKey("commands.version.aliases.ver"), getKey("commands.version.aliases.about")],
		minArgs: 0,
		maxArgs: 0,
	},

	execute(_server, player) {
		const versionMsg = getKey("frog.version").replace("%s%", `${Frog.releaseData.minorServerVersion} (${Frog.releaseData.versionDescription})`).replace("%d%", version).replace("%f%", VersionToProtocol.getProtocol(version));
		player.sendMessage(`${Colors.GRAY}${versionMsg}`);
	},
};
