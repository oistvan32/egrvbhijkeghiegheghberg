const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: "autoplay",
  category: "ZENE PARANCSOK",
  aliases: ["ap", "randomsong"],
  useage: "autoplay",
  description: "Utoplay engedélyezése",
  run: async (client, message, args) => {
    //if not a dj, return error
    if (functions.check_if_dj(message))
      return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-Rang", `❌ Nincsen hozzá jogod! MEgfelelő rang: ${functions.check_if_dj(message)}`)

    //If Bot not connected, return error
    if (!message.guild.me.voice.channel) return functions.embedbuilder(client, 3000, message, config.colors.no, "Jelenleg nincs hallható zene!")

    //if member not connected return error
    if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek lépj be egy hangcsatornába")

    //if they are not in the same channel, return error
    if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Csatlakozz a hangcsatornámhoz: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

    //get queue
    let queue = client.distube.getQueue(message);

    //if no queue return error
    if (!queue) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nincs hallható zene!");

    //send info message + toggle autoplay
    await functions.embedbuilder(client, 3000, message, config.colors.yes, `Autoplay jelenleg: **${client.distube.toggleAutoplay(message) ? "active" : "deactive"}**!`)
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
