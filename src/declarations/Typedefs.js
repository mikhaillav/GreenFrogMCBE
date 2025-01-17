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
/**
 * @typedef {Object} ServerInfo
 * @property {string} minorServerVersion 
 * @property {string} versionDescription 
 * @property {string} majorServerVersion 
 * @property {string} apiVersion 
 * 
 * @typedef {Object} Coordinate
 * @property {x}
 * @property {y}
 * @property {z}
 *
 * @typedef {Object} WorldData
 * @property {string} name
 * @property {number} chunk_radius 
 * @property {Coordinate} spawn_coordinates
 * @property {string} generator 
 * @property {number} time 
 * 
 * @typedef {Object.<string, string>} LanguageContent
 * 
 * @typedef {object} CommandsPacket 
 * @property {number} values_len
 * @property {string} _enum_type 
 * @property {Array} enum_values 
 * @property {Array} suffixes
 * @property {Array} enums
 * @property {Array<any>} command_data
 * @property {Array} dynamic_enums 
 * @property {Array} enum_constraints
 */
exports.unused = {};