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
const Logger = require("../server/Logger");

const PlayerInfo = require("../api/player/PlayerInfo");

const Language = require("./Language");

module.exports = {
	/**
	 * Removes data of offline players
	 */
	async clearOfflinePlayers() {
		Frog.eventEmitter.emit("serverOfflinePlayersGarbageCollection", {
			players: PlayerInfo.players,
		});

		for (let i = 0; i < PlayerInfo.players.length; i++) {
			const isOffline = PlayerInfo.players[i].offline;

			if (isOffline) {
				Logger.debug(Language.getKey("garbageCollector.deleted").replace("%s%", PlayerInfo.players[i].username));

				PlayerInfo.players.splice(i, 1);
				i--;
			}
		}
	},

	/**
	 * Clears RAM from useless entries
	 */
	async gc() {
		Logger.debug(Language.getKey("garbageCollector.started"));

		await this.clearOfflinePlayers();

		Frog.eventEmitter.emit("serverGarbageCollection", {
			players: PlayerInfo.players,
		});

		for (let i = 0; i < PlayerInfo.players.length; i++) {
			const player = PlayerInfo.players[i];

			delete player.q;
			delete player.q2;
			delete player.profile;
			delete player.skinData;
			delete player.userData;
		}

		Logger.debug(Language.getKey("garbageCollector.finished"));
	},
};
