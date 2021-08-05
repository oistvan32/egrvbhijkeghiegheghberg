const Discord = require("discord.js")
const config = require("../../config.json")
module.exports = {
    name: "uptime",
    aliases: ["uptime"],
    category: "INFORMÁCIÓS PARANCSOK",
    description: "Megmutatja mióta online a bot",
    useage: "uptime",
    run: async (client, message, args) => {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
        const uptime = new Discord.MessageEmbed()
            .setTitle(`**Uptime**`)
            .setColor(config.colors.yes)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setDescription(`:clock1: \`${days}nap\` \`${hours}óra\` \`${minutes}prec\` \`${seconds}másodperc\``);
        return message.channel.send(uptime);
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
