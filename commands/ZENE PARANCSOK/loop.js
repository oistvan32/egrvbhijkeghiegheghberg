const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "loop",
    cooldown: 5,
    category: "ZENE PARANCSOK",
    aliases: ["repeat"],
    useage: "loop <0/1/2> |",
    description: "Loop bekapcsolása kikapcsolása! off / song / queue*\n0 = off\n1 = song\n2 = queue",
    run: async (client, message, args) => {
        ///if not a dj, return error
        if (functions.check_if_dj(message))
            return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-Rang", `❌ Nincs jogod végre hajtani a parancsot! Rang szükséges: ${functions.check_if_dj(message)}`)

        //If Bot not connected, return error
        if (!message.guild.me.voice.channel) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nincs hallható zene!")

        //if member not connected return error
        if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek lépj be egy hangcsatornába")

        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Csatlakozz a hangcsatornámhoz: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

        //if no arguments return error
        if (!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek adj megy egy Loop stílust", `Valid Options:\n\n\`0\`   /   \`1\`   /   \`2\`\n\`off\` / \`song\` / \`queue\``)

        //set variable
        let loopis = args[0];
        if (args[0].toString().toLowerCase() === "song") loopis = "1";
        else if (args[0].toString().toLowerCase() === "queue") loopis = "2";
        else if (args[0].toString().toLowerCase() === "off") loopis = "0";
        else if (args[0].toString().toLowerCase() === "s") loopis = "1";
        else if (args[0].toString().toLowerCase() === "q") loopis = "2";
        else if (args[0].toString().toLowerCase() === "disable") loopis = "0";
        loopis = Number(loopis);

        //change loop state
        if (0 <= loopis && loopis <= 2) {
            await client.distube.setRepeatMode(message, parseInt(args[0]));
            await functions.embedbuilder(client, 3000, message, config.colors.yes, "Az ismétlési mód beállítása:", `${args[0].replace("0", "OFF").replace("1", "Repeat song").replace("2", "Repeat Queue")}`)
            return;
        } else {
            return functions.embedbuilder(client, 3000, message, config.colors.no, "ERROR", `Kérlek adj megy egy számot **0** és **2** között |   *(0: kikaplcsova, 1: zene ismétlés, 2: Összes zene ismétlés)*`)
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
