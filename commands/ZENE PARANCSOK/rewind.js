const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "rewind",
    category: "ZENE PARANCSOK",
    aliases: ["rew"],
    useage: "rewind <IDŐTARTALOM>",
    description: "A zene vissza pörgetése",
    run: async (client, message, args) => {
        //if not a dj, return error
        if(functions.check_if_dj(message))
        return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `❌ Nincs jogod végre hajtani a parancsot! Rang szükséges: ${functions.check_if_dj(message)}`)
    
        //If Bot not connected, return error
        if (!message.guild.me.voice.channel) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nincs hallható zene!")
        
        //if member not connected return error
        if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek lépj be egy hangcsatornába")
        
        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Csatlakozz a hangcsatornámhoz: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)
        
        //get the Queue
        let queue = client.distube.getQueue(message);

        //if no Queue return error message
        if (!queue) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nothing playing!")

        //if no arguments, return error message
        if (!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + "Kérlek adj megy egy vissza tekerési időt!")

        //get seektime
        let seektime = queue.currentTime - Number(args[0]) * 1000;
        if (seektime < 0) seektime = 0;
        if (seektime >= queue.songs[0].duration - queue.currentTime) seektime = 0;
        

        //seek
        client.distube.seek(message, Number(seektime));

        //send information message
        functions.embedbuilder(client, 3000, message, config.colors.yes, "REWIND!", `A zene vissza lett tekerve \`${args[0]} mp-vel\``)
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
