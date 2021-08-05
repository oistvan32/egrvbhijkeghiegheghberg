const radio = require("../../radio")
const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "radio",
    category: "ZENE PARANCSOK",
    useage: "radio [rádió állomás] [hang]",
    description: "Kapcsolj rádiót akár 200 rádió állomás segítségével",
    run: async (client, message, args) => {
        //if not allowed to CONNECT to the CHANNEL
        if (!message.guild.me.permissionsIn(message.member.voice.channel).has("CONNECT")) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Nem tudok \` belépni\` a hangcsatornába")

        //If bot not connected, join the channel
        if (!message.guild.me.voice.channel)
            message.member.voice.channel.join().catch(e => {
                //send error if not possible
                return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Nem \`csatlakozhatók\` a hangcsatornához")
            })

        //if not allowed to CONNECT to the CHANNEL
        if (!message.guild.me.permissionsIn(message.member.voice.channel).has("SPEAK")) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Nem tudok \`besélni\` a hangcsatornába")


        if (message.guild.me.voice.channel && args[0]) {
            //if not a dj, return error
            //if (functions.check_if_dj(message))
               // return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-Rang", `❌ Nincs jogod végre hajtani a parancsot! Rang szükséges: ${functions.check_if_dj(message)}`)

            //If Bot not connected, return error
            if (!message.guild.me.voice.channel) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nincs hallható zene!")

            //if member not connected return error
            if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Csatlakozz a hangcsatornámhoz:")

            //if they are not in the same channel, return error
            if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek lépj be egy hangcsatornába: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

            //stop the Distube
            try{
                client.distube.stop(message);
            }catch{
                console.log("JUST PLAY RADIO")
            }

            //execute the radio module
            return radio(client, message, args); //get the radio module
        } else {
            //execute the radio module
            return radio(client, message, args); //get the radio module
        }
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
