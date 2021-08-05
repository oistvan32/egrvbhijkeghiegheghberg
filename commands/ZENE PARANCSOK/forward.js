const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "forward",
    category: "ZENE PARANCSOK",
    aliases: ["fwd", "for"],
    useage: "forward <IDŐTARTALOM>",
    description: "A dal előretekerése: másodperc",
    run: async (client, message, args) => {
        //if not a dj, return error
        if (functions.check_if_dj(message))
            return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-Rang", `❌ Nincsen jogod a parancs végre hajtására! Használhatja: ${functions.check_if_dj(message)}`)

        //If Bot not connected, return error
        if (!message.guild.me.voice.channel) return functions.embedbuilder(client, 3000, message, config.colors.no, "Jelenleg nincs hallható zene")

        //if member not connected return error
        if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek lépj be egy hangcsatornába")

        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Csatlakozz a hangcsatornámhoz: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

        //get queue
        let queue = client.distube.getQueue(message);
        
        //if no queue return error
        if (!queue) return functions.embedbuilder(client, 3000, message, config.colors.no, "Jelenleg nincs hallható zene");

        //get the seektime
        let seektime = queue.currentTime + Number(args[0]) * 1000;
        if (seektime >= queue.songs[0].duration * 1000) seektime = queue.songs[0].duration * 1000 - 1;
        
        //seek 
        client.distube.seek(message, Number(seektime));
        
        //Send info message
        functions.embedbuilder(client, 3000, message, config.colors.yes, "ELŐRE!", `A zene meglett hosszabbítva: \`${Number(args[0])} mp-vel\``)
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
