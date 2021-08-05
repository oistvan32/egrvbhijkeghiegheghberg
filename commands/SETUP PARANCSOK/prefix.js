const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: "prefix",
  aliases: ["prefix"],
  category: "SETUP PARANCSOK",
  description: "BOT prefix cserélése",
  useage: "prefix <new Prefix>",
  run: async (client, message, args) => {
    //command
    let prefix = client.settings.get(message.guild.id, `prefix`);
    if (prefix === null) prefix = config.prefix;
    message.react("✅");
    if (!args[0]) return functions.embedbuilder(client, "null", message, "YELLOW", `Jelenlegi prefix \`${prefix}\``, `Kérlek adj meg egy új prefixet`)
    if (!message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, "null", message, config.colors.no, "prefix", `❌ Nincs jogod végre hajtani a parancsot`)

    if (args[1]) return functions.embedbuilder(client, "null", message, config.colors.no, "prefix", `❌ A prefix nem lehet 2 space`)
    if (args[0].length > 5) return functions.embedbuilder(client, "null", message, config.colors.no, "ERROR", `❌ A prefix nem lehet nagyobb mint "5" betű/szám`)

    client.settings.set(message.guild.id, args[0], `prefix`);

    return functions.embedbuilder(client, "null", message, config.colors.yes, "prefix", `✅ Sikeresen be állitva prefixnek: **\`${args[0]}\`**`)
  }
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
