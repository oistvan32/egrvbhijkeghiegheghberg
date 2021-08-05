const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: "removedj",
  aliases: ["deletedj"],
  category: "SETUP PARANCSOK",
  description: "Dj-rang törlése",
  useage: "removedj @ROLE",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, "null", message, config.colors.no, "DISABLE-DJ-RANG-SETUP", `❌ Nincs hozzá jogod végre hajtani a parancsot!`)
    let role = message.mentions.roles.first();
    if (!role) return functions.embedbuilder(client, "null", message, config.colors.no, `ERROR`, `Kérlek, adj meg egy csatornát ping segítségével, például: #channel!`)
    try {
      message.guild.roles.cache.get(role.id)
    } catch {
      return functions.embedbuilder(client, "null", message, config.colors.no, `ERROR`, `Csatorna nem létezik ezen a szerveren!`)
    }

    if (!client.settings.get(message.guild.id, `djroles`).includes(role.id)) return functions.embedbuilder(client, "null", message, config.colors.no, `ERROR`, `Ez a rang már Dj-rang`)
    message.react("✅");
    client.settings.remove(message.guild.id, role.id, `djroles`);

    let leftb = "";
    if (client.settings.get(message.guild.id, `djroles`).join("") === "") leftb = "Nincs Dj-rang, más néven minden felhasználó DJ"
    else
      for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
        leftb += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
      }
    return functions.embedbuilder(client, "null", message, config.colors.yes, "DJ-RANG-SETUP", `✅ Sikeresen törölve ${role} a dj-k közül
    Nem dj rang:
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
