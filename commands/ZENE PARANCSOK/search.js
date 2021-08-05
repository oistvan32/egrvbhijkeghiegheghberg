const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
    name: "search",
    category: "ZENE PARANCSOK",
    cooldown: 5,
    useage: "search <URL/NÉV>",
    description: "Keres 10 zenét a youtubon",
    run: async (client, message, args) => {

        //if not a dj, return error  -  Disabled because not needed
        //if(functions.check_if_dj(message))
        //return functions.embedbuilder(client, 6000, message, config.colors.no, "DJ-ROLE", `❌ You don\'t have permission for this Command! You need to have: ${functions.check_if_dj(message)}`)
    
        //if member not connected return error
        if (!message.member.voice.channel) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek lépj be egy hangcsatornába")
        
        //if they are not in the same channel, return error but only check if bot is connected
        if (message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Csatlakozz a hangcsatornámhoz: " + ` \`${message.guild.me.voice.channel.name ? message.guild.me.voice.channel.name : ""}\``)
                
        //if no arguments, return error
        if (!args[0]) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Kérlek add meg mirre akarsz rá keresni!")
        
        //if not allowed to CONNECT to the CHANNEL
        if (!message.guild.me.permissionsIn(message.member.voice.channel).has("CONNECT"))  return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Nem tudok  \`belépni\` a hangcsatornádba")

        //If bot not connected, join the channel
        if(!message.guild.me.voice.channel)
        message.member.voice.channel.join().catch(e=>{
            //send error if not possible
            return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Nem tudok  \`belépni\` a hangcsatornába")
        })
        
        //if not allowed to CONNECT to the CHANNEL
        if (!message.guild.me.permissionsIn(message.member.voice.channel).has("SPEAK")) return functions.embedbuilder(client, 5000, message, config.colors.no, "`" + message.author.tag + "`" + " Nem tudok \`beszélni\` a hangcsatornádba")


        //send information message
        functions.embedbuilder(client, 3000, message, config.colors.yes, "🔎 Keresés!", args.join(" "))

        //search tracks and send first 10 results etc
        let result = await client.distube.search(args.join(" "));

        //create variable
        let searchresult = "";

        //create string information
        for (let i = 0; i < 10; i++) {
            try {
                searchresult += await `**${i+1}**. [${result[i].name}](${result[i].url}) - \`${result[i].formattedDuration}\`\n`;
            } catch {
                searchresult += await " ";
            }
        }

        //send search result embed
        await functions.embedbuilder(client, "null", message, config.colors.yes, "🔎 Sikeres találat:", searchresult)

        //wait for userinput
        let userinput;
        await message.channel.awaitMessages(m => m.author.id == message.author.id, {
            max: 1,
            time: 60000,
            errors: ["time"],
        }).then(collected => {
            //save userinput on var
            userinput = collected.first().content;
            //if input out of range, error
            if (Number(userinput) <= 0 && Number(userinput) > 10) {
                functions.embedbuilder(client, "null", message, config.colors.no, "Nem megfelelő szám!", "szóval én az 1-es számot használom!")
                userinput = 1;
            }
        }).catch(() => {
            console.error;
            userinput = 404
        });

        //if smt went wrong return error
        if (userinput === 404)  return functions.embedbuilder(client, "null", message, config.colors.no, "HIBA! Rossz szám vagy le jért az idő!")
        
        //send info message
        functions.embedbuilder(client, 10000, message, config.colors.yes, "🔎 Keresés!", `[${result[userinput - 1].name}](${result[userinput - 1].url})`, result[userinput - 1].thumbnail)
        
        //play track
        client.distube.play(message, result[userinput - 1].url)
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
