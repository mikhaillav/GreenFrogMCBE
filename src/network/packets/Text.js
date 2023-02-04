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
/* It's a class that sends a text packet to the client */
let message = "";
let type = "announcement";
let needs_translation = false;
let source_name = "";
let xuid = "";
let platform_chat_id = "";

class Text extends require("./Packet") {
  /**
   * name() {
   *         return "text"
   * }
   * @returns Packet name
   */
  name() {
    return "text";
  }

  /**
   * Sets the message to be sent
   * @param {string} message Message to be sent
   */
  setMessage(message1) {
    message = message1;
  }

  /**
   * Sets the type
   * @param {string} type1 Set the type
   */
  setType(type1) {
    type = type1;
  }

  /**
   * Sets the needs translation
   * @param {boolean} needs_translation1 Set the need translation
   */
  setNeedsTranslation(needs_translation1) {
    needs_translation = needs_translation1;
  }

  /**
   * Sets the source name
   * @param {string} source_name1 Set the source name
   */
  setSourceName(source_name1) {
    source_name = source_name1;
  }

  /**
   * Sets the xuid
   * @param {string} xuid1 The xuid
   */
  setXuid(xuid1) {
    xuid = xuid1;
  }

  /**
   * Sets the platform chat id
   * @param {string} platform_chat_id1 The platform chat id
   */
  setPlatformChatId(platform_chat_id1) {
    platform_chat_id = platform_chat_id1;
  }

  /**
   * Returns the message
   * @returns The message to be sent
   */
  getMessage() {
    return message;
  }

  /**
   * Returns the type
   * @returns The type
   */
  getType() {
    return type;
  }

  /**
   * Returns the needs translation
   * @returns The needs translation
   */
  getNeedsTranslation() {
    return needs_translation;
  }

  /**
   * Returns the source name
   * @returns The source name
   */
  getSourceName() {
    return source_name;
  }

  /**
   * Returns the xuid
   * @returns The xuid
   */
  getXuid() {
    return xuid;
  }

  /**
   * Returns the platform chat id
   * @returns The platform chat id
   */
  getPlatformChatId() {
    return platform_chat_id;
  }

  /**
   * It writes a packet to the client
   * @param {Object} client - The client that will receive the packet.
   * @param {string} [message] - The message to send.
   * @param {string} [type=announcement] - The type of message.
   * @param {boolean} [needs_translation=false] - If true, the message will be translated to the client's language (if there is translation key).
   * @param {string} [source_name] - The name of the source of the message.
   * @param {string} [xuid] - The XUID of the player, who sent the message.
   * @param {string} [platform_chat_id] - This is the ID of the player you want to send the message to.
   */
  send(client) {
    client.write(this.name(), {
      type: type,
      needs_translation: needs_translation,
      source_name: source_name,
      message: message,
      xuid: xuid,
      platform_chat_id: platform_chat_id,
    });
  }
}

module.exports = Text;
