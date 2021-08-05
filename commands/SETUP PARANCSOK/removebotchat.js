const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: "removebotchat",
  aliases: ["removechat"],
  category: "SETUP PARANCSOK",
  description: "BOT csatorna törlée",
  useage: "removebotchat #Chat",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, "null", message, config.colors.no, "DISABLE-BOT-CHAT-SETUP", `❌ Nincs jogod végre hajtani a parancsot!`)
    let channel = message.mentions.channels.first();
    if (!channel) return functions.embedbuilder(client, "null", message, config.colors.no, `ERROR`, `Kérlek adj megy egy csatornát a ping segítségével pl.: #csatorna`)
    try {
      message.guild.roles.cache.get(channel.id)
    } catch {
      return functions.embedbuilder(client, "null", message, config.colors.no, `ERROR`, `Ez a csatorna nem létezik a szerveren`)
    }

    if (!client.settings.get(message.guild.id, `botchannel`).includes(channel.id)) return functions.embedbuilder(client, "null", message, config.colors.no, `ERROR`, `Ez a csatorna nem volt be állítva BOT csatonának!`)
    message.react("✅");
    client.settings.remove(message.guild.id, channel.id, `botchannel`);

    let leftb = "";
    if (client.settings.get(message.guild.id, `botchannel`).join("") === "") leftb = "Nincs csatorna, más néven minden csatorna botcsatorna"
    else
      for (let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length; i++) {
        leftb += "<#" + client.settings.get(message.guild.id, `botchannel`)[i] + "> | "
      }
    return functions.embedbuilder(client, "null", message, config.colors.yes, "BOT-CHAT-SETUP", `✅ Sikeresen törlve: ${channel} a bot csatornából
    Nem bot csatorna
    > ${leftb}
    `)
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
