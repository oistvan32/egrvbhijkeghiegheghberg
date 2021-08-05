const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: "addbotchat",
  aliases: ["addbotchannel"],
  category: "SETUP PARANCSOK",
  description: "BOT csatorna beállitása(csak abba a csatornában lehet használni a botot)",
  useage: "addbotchat <#chat>",
  run: async (client, message, args) => {
    //command
    if (!message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, "null", message, config.colors.no, "BOT-CHAT-SETUP", `❌ Nincs jogod végre hajtani a parancsot!`)

    let channel = message.mentions.channels.first();
    if (!channel) return functions.embedbuilder(client, "null", message, config.colors.no, `ERROR`, `Kérlek adj megy egy létező csatornát! #csatorna`)
    try {
      message.guild.roles.cache.get(channel.id)
    } catch {
      return functions.embedbuilder(client, "null", message, config.colors.no, `ERROR`, `Úgy tűnik, hogy a csatorna nem létezik ezen a szerveren!`)
    }
    if (client.settings.get(message.guild.id, `botchannel`).includes(channel.id)) return functions.embedbuilder(client, "null", message, config.colors.no, `ERROR`, `Ez a csatorna már a listában van!`)

    message.react("✅");

    client.settings.push(message.guild.id, channel.id, `botchannel`);
    let leftb = "";
    if (client.settings.get(message.guild.id, `botchannel`).join("") === "") leftb = "Nincs csatorna, más néven minden csatorna botcsatorna(minden szobában lehet használni a botot)"
    else
      for (let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length; i++) {
        leftb += "<#" + client.settings.get(message.guild.id, `botchannel`)[i] + "> | "
      }
    let botchatfromenmap = message.guild.channels.cache.get(client.settings.get(message.guild.id, `botchannel`)[client.settings.get(message.guild.id, `botchannel`).length])

    return functions.embedbuilder(client, "null", message, config.colors.yes, "BOT-CHAT-SETUP ", `✅ Sikeresen bot chat lett a következő: ${botchatfromenmap}
  All Bot Chats:
  > ${leftb}`)

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
