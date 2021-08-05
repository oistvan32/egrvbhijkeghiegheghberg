const Discord = require("discord.js")
const config = require("../../config.json")
module.exports = {
    name: "ping",
    aliases: ["latency"],
    category: "INFORMÁCIÓS PARANCSOK",
    description: "BOT késleltetési ideje",
    useage: "ping",
    run: async (client, message, args) => {
        return message.reply(
            new Discord.MessageEmbed()
            .setAuthor(`🏓 PING`)
            .setColor(config.colors.yes)
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setDescription(`\`${client.ws.ping} ms\``)
        )
    }
}

/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
