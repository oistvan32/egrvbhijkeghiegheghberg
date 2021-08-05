const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: "reset",
  aliases: ["hardreset"],
  category: "SETUP PARANCSOK",
  description: "Törlés/vissza állítja a prefixet az alapra",
  usage: "reset",
  run: async (client, message, args) => {
    if (message.member.guild.owner.id !== message.author.id) return functions.embedbuilder(client, "null", message, config.colors.no, "RESET", `❌ Nincs jogod a parancsot végre hajtani! **CSAK A SZERVER TULAJDONOSA TUDJA VÉGRE HAJTANI EZT A FELEDATOTT**`)
    let themsg = await message.reply("Valóban vissza akarja állítani az összes beállítást? ||(*Válasz ezzel::* **__`yes`__**)||")
    const filter = m => m.author.id === message.author.id;
    themsg.channel.awaitMessages(filter, {
        max: 1,
        time: 600000,
        errors: ['time']
      })
      .then(collected => {
        if (collected === "yes") {
          client.settings.delete(message.guild.id, "prefix");

          client.settings.delete(message.guild.id, "djroles");

          client.settings.delete(message.guild.id, "playingembed");

          client.settings.delete(message.guild.id, "playingchannel");

          client.settings.delete(message.guild.id, "botchannel");

          client.custom.delete(message.guild.id, "playlists");

          client.custom.ensure(message.guild.id, {
            playlists: [],
          });
          client.settings.ensure(message.guild.id, {
            prefix: config.prefix,
            djroles: [],
            playingembed: "",
            playingchannel: "",
            botchannel: [],
          });
          message.reply("SIKERESEN TÖRÖLVE MINDEN :c")
        }
      }).catch(error => {
        message.reply("HIBA! IDŐ LE JÁRT VAGY ROSSZ SZÓT ADTÁL MEG!")
      })

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
