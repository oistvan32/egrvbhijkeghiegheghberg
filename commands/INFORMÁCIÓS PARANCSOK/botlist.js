const Discord = require("discord.js")
const config = require("../../config.json")
module.exports = {
    name: "botlist",
    aliases: ["botlist"],
    category: "INFORMÁCIÓS PARANCSOK",
    description: "Lesd meg a másik botjaim",
    useage: "ping",
    run: async (client, message, args) => {
        return message.reply(new Discord.MessageEmbed().setColor("#c219d8")
            .setTitle("Az aktuális botjaim!")
            .addField("BurnyBOT:", "https://discord.com/api/oauth2/authorize?client_id=844537272510578688&permissions=8&scope=bot")
            .addField("KesfhBOT:", "https://discord.com/api/oauth2/authorize?client_id=870348656883167324&permissions=8&scope=bot")
            .addField("Support:", "https://discord.gg/JJ5gUUfj2e")
        );
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
