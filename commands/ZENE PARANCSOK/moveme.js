const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: `moveme`,
  category: "ZENE PARANCSOK",
  aliases: [`mm`, "mvm", "my", "mvy", "moveyou"],
  description: `A hangcsatornába lévő emberek mozgatása`,
  usage: `move`,
  run: async (client, message, args, cmduser, text, prefix, player) => {

      //if not a dj, return error - DISABLED - NOT NEEDED
      //if (functions.check_if_dj(message))
      //return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `❌ You don\'t have permission for this Command! You need to have: ${functions.check_if_dj(message)}`)

      //If Bot not connected, return error
      if (!message.guild.me.voice.channel) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nincs hallható zene!")

      //if member not connected return error
      if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek lépj be egy hangcsatornába")

      //if they are not in the same channel, return error
      if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Csatlakozz a hangcsatornámhoz: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

      //If the Channel is full
      if(botchannel.userLimit >= botchannel.members.length) return functions.embedbuilder(client, 3000, message, config.colors.no, "A csatorna megtelt! Nem tudlak titeket át vinni!!")

      //move the member
      message.member.voice.setChannel(botchannel);

      //send success message
      return functions.embedbuilder(client, 3000, message, config.colors.yes, `Sikeresen át vittelek titeket ide: \`${botchannel.name}\``)
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
