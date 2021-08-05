const functions = require("../../functions")
const scdl = require("soundcloud-downloader").default;
const config = require("../../config.json")
module.exports = {
    name: "searchsc",
    category: "ZENE PARANCSOK",
    useage: "searchsc <URL/NÉV>",
    cooldown: 5,
    description: "Keres 15 zenét a soundcloudon",
    run: async (client, message, args) => {
        //if not a dj, return error  -  DISABLED BECAUSE NOT A DJ CMD
        //if(functions.check_if_dj(message))
        //return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `❌ You don\'t have permission for this Command! You need to have: ${functions.check_if_dj(message)}`)

        //if member not connected return error
        if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek lépj be egy hangcsatornába")

        //if they are not in the same channel, return error, but check only if the bot is connected somewhere
        if (message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Csatlakozz a hangcsatornámhoz: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)

        //if no arguments added, return error
        if (!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek adj meg valami amire rá szeretnél keresni!")

        //if not allowed to CONNECT to the CHANNEL
        if (!message.guild.me.permissionsIn(message.member.voice.channel).has("CONNECT"))  return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Nem tudok \`belépni\` a hangcsatornába")

        //If bot not connected, join the channel
        if(!message.guild.me.voice.channel)
        message.member.voice.channel.join().catch(e=>{
            //send error if not possible
            return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Nem tudok \`belépni\` a hangcsatornába")
        })
        
        //if not allowed to CONNECT to the CHANNEL
        if (!message.guild.me.permissionsIn(message.member.voice.channel).has("SPEAK")) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Nem tudok \`beszélni\`a hangcsatornába ")

        
        //send information message
        functions.embedbuilder(client, 3000, message, config.colors.yes, "🔎 Keresés!", args.join(" "))

        //search in soundcloud
        scdl.search('tracks', args.join(" "))
            .then(async results => {
                //for each result do this
                let searchresult = "";
                for (let i = 0; i < results.collection.length; i++) {
                    try {
                        let mins = Math.floor((results.collection[i].full_duration / 1000) / 60);
                        let secs = Math.floor((results.collection[i].full_duration / 1000) % 60);
                        if (mins < 10) mins = "0" + mins;
                        if (secs < 10) secs = "0" + secs;
                        let durr = mins + ":" + secs;
                        searchresult += await `**${i+1}**. [${results.collection[i].permalink}](${results.collection[i].permalink_url}) - \`${durr}\`\n`;
                    } catch {
                        searchresult += await " ";
                    }
                }

                //send information message
                await functions.embedbuilder(client, "null", message, config.colors.yes, "🔎 Sikeres keresés:", searchresult)

                //wait for userinput with 60 sec. delay
                let userinput;
                await message.channel.awaitMessages(m => m.author.id == message.author.id, {
                    max: 1,
                    time: 60000,
                    errors: ["time"],
                }).then(collected => {
                    //collect his input and saved it on var
                    userinput = collected.first().content;
                    //return if wrong input
                    if (Number(userinput) <= 0 && Number(userinput) > 15) {
                        functions.embedbuilder(client, "null", message, config.colors.no, "Nem megfelelő szám!", "szóval az 1-et használom!")
                        userinput = 1;
                    }
                }).catch(() => {
                    console.error;
                    userinput = 404
                });

                //if something went terrible, wrong send error
                if (userinput === 404) return functions.embedbuilder(client, "null", message, config.colors.no, "Valami elromlott!")

                //send information message
                functions.embedbuilder(client, 10000, message, config.colors.yes, "🔎 Keresés!", `[${results.collection[userinput - 1].permalink}](${results.collection[userinput - 1].permalink_url})`, results.collection[userinput - 1].artwork_url)

                //play the track
                client.distube.play(message, results.collection[userinput - 1].permalink_url)
            })
            .catch(err => console.log(err))
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
