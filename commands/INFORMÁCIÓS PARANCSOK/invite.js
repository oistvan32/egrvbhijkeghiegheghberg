const Discord = require("discord.js")
const config = require("../../config.json")
module.exports = {
    name: "invite",
    aliases: ["add"],
    category: "INFORMÁCIÓS PARANCSOK",
    description: "BOT meghívó linkje",
    useage: "invite",
    run: async (client, message, args) => {
        let inviteembed = new Discord.MessageEmbed()
            .setColor(config.colors.yes)
            .setTitle("INVITE LINK KesfhBOT")
            .setDescription("[INVITE link köszönöm ,ha be hívsz!](https://discord.com/api/oauth2/authorize?client_id=870348656883167324&permissions=8&scope=bot)")
            .setFooter("KesfhBOT", client.user.displayAvatarURL())

        message.reply(inviteembed);
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
