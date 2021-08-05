const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "seek",
    category: "ZENE PARANCSOK",
    useage: "seek <IDŐTARTALOM>",
    description: "Tekerj a zenébe",
    run: async (client, message, args) => {
        //if not a dj, return error
        if(functions.check_if_dj(message))
        return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-Rang", `❌ Nincs jogod végre hajtani a parancsot! Rang szükséges: ${functions.check_if_dj(message)}`)
    
        //If Bot not connected, return error
        if (!message.guild.me.voice.channel) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nincs hallható zene")
        
        //if member not connected return error
        if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek lépj be egy hangcsatornába")
        
        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Csatlakozz a hangcsatornámhoz: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)
                
        //if no arguments, return error
        if (!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + "Kérlek adj megy egy összeget")
        
        //sned information message
        functions.embedbuilder(client, 3000, message, config.colors.yes, "Seeked!", `A zene csak \`${args[0]} mp\`-ig fog menni!`)
        
        //Seek
        client.distube.seek(message, Number(args[0] * 1000));
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
