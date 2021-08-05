const functions = require("../../functions")
const config = require("../../config.json")
const path = require("path");
module.exports = {

    name: path.parse(__filename).name,
    category: "ZENE FILTEREK",
    useage: `<${path.parse(__filename).name}>`,
    description: "*Zene filter,hogy a zene fényesebb legyen " + path.parse(__filename).name,
    run: async (client, message, args) => {
        //if not a dj, return error
        //if (functions.check_if_dj(message))
            //return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `<:declined:780403017160982538> You don\'t have permission for this Command! You need to have: ${functions.check_if_dj(message)}`)

        //If Bot not connected, return error
        if (!message.guild.me.voice.channel) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nincs hallható zene!")

        //if member not connected return error
        if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek lépj be egy hangcsatornába")

        //if they are not in the same channel, return error
        if (message.member.voice.channel.id != message.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek lépj be az én hangcsatornámba: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

        //get queue
        let queue = client.distube.getQueue(message);

        //if no queue return error
        if (!queue) return functions.embedbuilder(client, 3000, message, config.colors.no, "Nincs hallható zene!");

        //get the filter from the content
        let filter = path.parse(__filename).name;

        //if its the same filter as the current one, use bassboost6
        if (filter === queue.filter) filter = "bassboost6";

        //set the new filter
        filter = await client.distube.setFilter(message, filter);

        //send information message
        await functions.embedbuilder(client, 3000, message, config.colors.yes, "Filter hozzádva!!", filter)
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
