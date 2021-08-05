const functions = require("../../functions");
const config = require("../../config.json")
module.exports = {
    name: "stop",
    category: "ZENE PARANCSOK",
    aliases: ["leave"],
    useage: "stop",
    description: "El hagyom a hangcsatornát!",
    run: async (client, message, args) => {
        //if not a dj, return error
        ///return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-Rang", `❌ Nincs jogod végre hajtani a parancsot! Rang szükséges:: ${functions.check_if_dj(message)}`)

        //If Bot not connected, return error
        if (!message.guild.me.voice.channel) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nincs hallható zene")
        
        //if member not connected return error
        if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek lépj be egy hangcsatornába")
        
        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Csatlakozz a hangcsatornámhoz: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)
                
        //send information message
        functions.embedbuilder(client, "null", message, config.colors.no, "STOPOLVA!", `Ki léptem a  hangcsatornából`)

        //leave channel if bot joined via opus stream
        message.member.voice.channel.leave().catch(e=> console.log("Nem léphetek ki a hangcsatornából LULUL"))
        
        //stop distube
        client.distube.stop(message);

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
