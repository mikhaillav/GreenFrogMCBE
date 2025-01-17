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
const Frog = require("../../Frog");

const Logger = require("../../server/Logger");
const CommandManager = require("../../server/CommandManager");
const CommandVerifier = require("../../utils/CommandVerifier");

const PacketConstructor = require("./PacketConstructor");

const { getKey } = require("../../utils/Language");

const config = Frog.config;

class ClientCommandRequestPacket extends PacketConstructor {
	name = "command_request";

	async readPacket(player, packet) {
		let executedCommand = packet.data.params.command.replace("/", "");

		const args = executedCommand.split(" ").slice(1);

		let shouldExecuteCommand = true;

		Frog.eventEmitter.emit("playerExecutedCommand", {
			player,
			args,
			command: executedCommand,
			cancel: () => {
				shouldExecuteCommand = false;
			},
		});

		if (!shouldExecuteCommand) return;

		if (config.chat.blockInvalidCommands) {
			executedCommand = executedCommand.replace("%d%", executedCommand.replace("§", ""));

			if (executedCommand > 256) {
				Frog.eventEmitter.emit("playerMalformatedChatCommand", {
					player,
					command: executedCommand,
				});
				return;
			}
		}

		try {
			let commandFound = false;

			for (const command of CommandManager.commands) {
				if (command.data.name === executedCommand.split(" ")[0] || (command.data.aliases && command.data.aliases.includes(executedCommand.split(" ")[0]))) {
					if (command.data.requiresOp && !player.op) {
						CommandVerifier.throwError(player, executedCommand.split(" ")[0]);
						return;
					}

					if (command.data.minArgs !== undefined && command.data.minArgs > args.length) {
						player.sendMessage(getKey("commands.errors.syntaxError.minArg").replace("%s%", command.data.minArgs).replace("%d%", args.length));
						return;
					}

					if (command.data.maxArgs !== undefined && command.data.maxArgs < args.length) {
						player.sendMessage(getKey("commands.errors.syntaxError.maxArg").replace("%s%", command.data.maxArgs).replace("%d%", args.length));
						return;
					}

					command.execute(Frog, player, args);

					commandFound = true;
					break; // Exit loop once command has been found and executed
				}
			}

			if (!commandFound) {
				CommandVerifier.throwError(player, executedCommand.split(" ")[0]);
			}
		} catch (error) {
			Logger.error(getKey("commands.errors.internalError.player").replace("%s%", player.username).replace("%d%", error.stack));
		}
	}
}

module.exports = ClientCommandRequestPacket;
