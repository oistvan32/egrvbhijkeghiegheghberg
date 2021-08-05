const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "volume",
    category: "ZENE PARANCSOK",
    aliases: ["vol"],
    useage: "volume <HANGERŐ SZÁM>",
    description: "Hangerő csere",
    run: async (client, message, args) => {
        //if not a dj, return error
        //if(functions.check_if_dj(message))
        //return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `❌ You don\'t have permission for this Command! You need to have: ${functions.check_if_dj(message)}`)
   
        //If Bot not connected, return error
        if (!message.guild.me.voice.channel) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nincs hallható zene")
        
        //if member not connected return error
        if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek lépj be egy hangcsatornába")
        
        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Csatlakozz a hangcsatornámhoz: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)
        
        //if no arguments, return error
        if (!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek adj megy egy számot", "A számnak  `0` és `500` között kell legyen")
        
        //get the Number count if too big return error
        if (Number(args[0]) > 500 && Number(args[0]) < 0) return functions.embedbuilder(client, "null", message, config.colors.no, "Helytelen szám", "A számnak `0` and `500`között kell legyen")
        
        //send information message
        functions.embedbuilder(client, 3000, message, config.colors.yes, "VOLUME!", `Hangerő megváloztatva \`${args[0]} %\`-re`)
        
        //set the volume
        await client.distube.setVolume(message, args[0]);
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
