/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 *
 * Copyright 2023 andriycraft
 * Github: https://github.com/andriycraft/GreenFrogMCBE
 */
const ColorsServer = require("../Colors");
const ColorsPlayer = require("../../player/Colors");
const PluginManager = require("../../plugin/PluginManager");

const { lang, config } = require("../../server/ServerInfo");

const Logger = require("../Logger");

class CommandPl extends require("./Command") {
	name() {
		return lang.commands.pl;
	}

	aliases() {
		return [lang.commands.plugins];
	}

	execute() {
		let plugins;
		if (PluginManager.getPlugins() == null) {
			plugins = 0;
		} else {
			plugins = PluginManager.getPlugins().length;
		}

		let pluginlist = ColorsServer.CONSOLE_GREEN + PluginManager.getPlugins().join(ColorsServer.CONSOLE_RESET + ", " + ColorsServer.CONSOLE_GREEN);

		Logger.log(`${lang.commands.plugins} (${plugins}): ${pluginlist ?? ""} ${ColorsServer.CONSOLE_RESET}`);
	}

	getPlayerDescription() {
		return lang.commands.ingamePlDescription;
	}

	executePlayer(player) {
		if (!config.playerCommandPlugins) {
			Logger.log(lang.errors.playerUnknownCommand);
			return;
		}
		let plugins;
		if (PluginManager.getPlugins() == null) {
			plugins = 0;
		} else {
			plugins = PluginManager.getPlugins().length;
		}

		let pluginlist = ColorsPlayer.green + PluginManager.getPlugins().join(ColorsPlayer.white + ", " + ColorsPlayer.green);

		player.sendMessage(`${lang.commands.plugins} (${plugins}): ${pluginlist ?? ""} ${ColorsPlayer.reset}`);
	}
}

module.exports = CommandPl;
