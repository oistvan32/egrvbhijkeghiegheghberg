const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: "adddj",
  aliases: ["adddjrole"],
  category: "SETUP PARANCSOK",
  description: "ADD meg a Dj-rangot! (több rang is lehet)(ha ez nincs be állítva mindenki dj",
  useage: "adddj @role",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return functions.embedbuilder(client, "null", message, config.colors.no, "DJ-Rrang", `❌ Nincs hozzá jogod végre hajtani a parancsot!`)

    let role = message.mentions.roles.first();

    try {
      message.guild.roles.cache.get(role.id)
    } catch {
      return functions.embedbuilder(client, "null", message, config.colors.no, `ERROR`, `Úgy tűnik, hogy a szerep nem létezik ezzen a szerveren!`)
    }

    if (!role) return functions.embedbuilder(client, "null", message, config.colors.no, `ERROR`, `Kérlek, adj hozzá egy rangot a ping segítségével, @role!`)
    if (client.settings.get(message.guild.id, `djroles`).includes(role.id)) return functions.embedbuilder(client, "null", message, config.colors.no, `ERROR`, `Ez a rang már rajta van a listán!`)

    message.react("✅");

    client.settings.push(message.guild.id, role.id, `djroles`);
    let leftb = "";
    if (client.settings.get(message.guild.id, `djroles`).join("") === "") leftb = "Nincs dj rang...Más néven minden felhasználó Dj"
    else
      for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
        leftb += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
      }

    return functions.embedbuilder(client, "null", message, config.colors.yes, "DJ-rang", `✅ A DJ ROLE sikeres beállítása:${role}
    Összes dj rang:
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
