const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "addrelated",
    category: "ZENE PARANCSOK",
    cooldown: 3,
    aliases: ["addrelated", "related", "addsimilar", "similar"],
    useage: "addrelated",
    description: "Hasonló zene az aktuális zenéhez",
    run: async (client, message, args) => {
        //if not a dj, return error - DISABLED cause not needed
        //if (functions.check_if_dj(message))
        //    return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `❌ You don\'t have permission for this Command! You need to have: ${functions.check_if_dj(message)}`)

        //If Bot not connected, return error
        if (!message.guild.me.voice.channel) return functions.embedbuilder(client, 3000, message, config.colors.no, "Jelenleg nincs hallható zene!")

        //if member not connected return error
        if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek lépj be egy hangcsatornába")

        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Csatlakozz a hangcsatornámhoz: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

        //get queue
        let queue = client.distube.getQueue(message);
        
        //if no queue return error
        if (!queue) return functions.embedbuilder(client, 3000, message, config.colors.no, "Jelenleg nincs hallható zene!");

        //find related videos
        let newsong = await client.distube.addRelatedVideo(message);

        //send information message
        functions.embedbuilder(client, 10000, message, config.colors.yes, "🔎 Hozzáadás:", `[${newsong.songs[0].name}](${newsong.songs[0].url})`, newsong.songs[0].thumbnail)
        
        //play track
        return client.distube.play(message, newsong.songs[0].url)
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
