const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "removetrack",
    category: "ZENE PARANCSOK",
    aliases: ["rt"],
    useage: "removetrack <Queury Number>",
    description: "Tarck törlés",
    run: async (client, message, args) => {
        //if not a dj, return error
        if (functions.check_if_dj(message))
            return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `❌ Nincs jogod végre hajtani a parancsot! Rang szükséges: ${functions.check_if_dj(message)}`)

        //If Bot not connected, return error
        if (!message.guild.me.voice.channel) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nincs hallható zene!")

        //if member not connected return error
        if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek lépj be egy hangcsatornába")

        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Csatlakozz a hangcsatornámhoz: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

        //get queue
        let queue = client.distube.getQueue(message);
        
        //if no queue return error
        if (!queue) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nincs hallható zene");

        //if no args return
        if (!args[0]) return functions.embedbuilder(client, 3000, message, config.colors.no, "Kérlek add meg annak a zenének számát amelyiket el szeretnéd távolítani");
        
        //if args too big
        if (isNaN(args[0]) || Number(args[0]) >= queue.songs.length) return functions.embedbuilder(client, 3000, message, config.colors.no, "A te zenéd nincs benne a listába! Max: " + queue.songs.length);

        //save the current track on a variable
        var track = queue.songs[Number(args[0])]

        //clear the queue
        queue.songs.splice(Number(args[0]), Number(args[0]) + 1);
        
        //Send info message
        functions.embedbuilder(client, 3000, message, config.colors.yes, "Sikeresen törölve!", `[${track.name}](${track.url})`)
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
