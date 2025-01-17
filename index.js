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
const fs = require("fs");
const center = require("center-align");

const Colors = require("./src/api/color/Colors");

const { convertConsoleColor } = require("./src/utils/ConsoleColorConvertor");

// Print a centered header to the console
console.info(
	convertConsoleColor(
		center(
			`${Colors.GREEN} 
██████   ██████  ███████ ███████ ███    ██ ███████ ██████   ██████   ██████  
██       ██   ██ ██      ██      ████   ██ ██      ██   ██ ██    ██ ██       
██   ███ ██████  █████   █████   ██ ██  ██ █████   ██████  ██    ██ ██   ███ 
██    ██ ██   ██ ██      ██      ██  ██ ██ ██      ██   ██ ██    ██ ██    ██ 
██████   ██   ██ ███████ ███████ ██   ████ ██      ██   ██  ██████   ██████  
${Colors.RESET}`,
			process.stdout.columns,
		),
	),
);

// Generate a filename for the crash report
const crashFileName = `./crash-reports/server-crash-${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}.txt`;

// Create config files and enable debug mode
async function createConfigFilesAndDebug() {
	if (!fs.existsSync("config.yml")) {
		let config = null;
		const configPath = process.env.TEST ? "../src/resources/defaultConfig.yml" : "./src/resources/defaultConfig.yml";

		config = fs.readFileSync(configPath);

		fs.writeFileSync("config.yml", config);
	}

	const Frog = require("./src/Frog");
	if (Frog.isDebug) {
		process.env.DEBUG = "minecraft-protocol";
	}
}

// Start the server
async function start() {
	try {
		await createConfigFilesAndDebug();

		const Server = require("./src/Server.js");
		Server.start();

		// Handle SIGINT signal to shutdown the server
		process.once("SIGINT", async () => {
			require("./src/Frog").shutdownServer();
		});
	} catch (error) {
		// Print error message to console and write crash report to file
		console.clear();
		console.error(
			convertConsoleColor(
				`${Colors.RED}Failed to start server
${error.stack}
	
Make sure that you have the required libraries. Run "npm i" to install them
If you are sure that this is a bug please report it here: https://github.com/GreenFrogMCBE/GreenFrogMCBE
${Colors.RESET}`,
			),
		);
		fs.mkdir("crash-reports", { recursive: true }, () => {});
		fs.writeFileSync(crashFileName, `Error: ${error.stack}`, () => {});

		process.exit(-1);
	}
}

// Call the start function to start the server
start();
