const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "jump",
    cooldown: 5,
    category: "ZENE PARANCSOK",
    aliases: ["skipto"],
    useage: "jump <Lista szám>",
    description: "Kiválasztott zenéhez úgrás",
    run: async (client, message, args) => {
        //if not a dj, return error
        if (functions.check_if_dj(message))
            return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-Rang", `❌ Nincs jogod végre hajtani a parancsot! Rang szükséges: ${functions.check_if_dj(message)}`)

        //If Bot not connected, return error
        if (!message.guild.me.voice.channel) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nincs hallható zene!")

        //if member not connected return error
        if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek lépj be egy hangcsatornába")

        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Csatlakozz a hangcsatornámhoz: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

        //if no args return error
        if (!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek add meg a zenét ahhova skippelni szeretnél")

        //get queue
        let queue = client.distube.getQueue(message);
        
        //if no queue return error
        if (!queue) return functions.embedbuilder(client, 3000, message, config.colors.no, "Jelenleg nincs hallható zene");

        if (0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length) {
            functions.embedbuilder(client, 3000, message, config.colors.yes, "SIKERESEN", `Ugorva ${parseInt(args[0])} zene!`)
            return client.distube.jump(message, parseInt(args[0]))
                .catch(err => message.channel.send("Invalid song number."));
        } else {
            return functions.embedbuilder(client, 3000, message, config.colors.no, "ERROR", `Kérlek adj megy egy számot **0** és **${DisTube.getQueue(message).length}** között  |   *(0: kikapcsolva, 1:  zene ismételés, 2: Ismételje meg az összes zenét)*`)
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
