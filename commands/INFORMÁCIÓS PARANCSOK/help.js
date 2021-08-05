const {
    MessageEmbed
} = require("discord.js");
const {
    stripIndents
} = require("common-tags");
const config = require("../../config.json")
module.exports = {
    name: "help",
    aliases: ["h"],
    cooldown: 3,
    category: "INFORMÁCIÓS PARANCSOK",
    description: "Megjeleníti összes parancsot!",
    useage: "help [Command]",
    run: async (client, message, args) => {
        //GET THE PREFIX
        let prefix = client.settings.get(message.guild.id, `prefix`);
        if (prefix === null) prefix = config.prefix; //if not prefix set it to standard prefix in the config.json file
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return getAll(client, message);
        }

        function getAll(client, message) {
            const embed1 = new MessageEmbed()
                .setColor(config.colors.yes)
                .setTitle(`Parancsok\nPrefix: \`${prefix}\``)
                .addField("\u200b", "\u200b")
                .addField("**BASSBOOST FILTER INFORMÁCIÓ**", `
            >>> BassBoost erősségének megváloztatása \`1\`-\`20\`-ig terjedő skálán! Használat: \`${prefix}bassboost 10\` *Használd a bassboostot 10-esen*
            `)
                .addField("**CUSTOM LEJÁTSZÁSI LISTA**", `
            >>> Több lejátszási lista is elérhető fejenként 75 zenével!!
            
            1. Charts
            2. Christmas
            3. Jazz
            4. Blues
            5. Country
            6. Rock
            *HAMAROSAN*
            Használd \`${prefix}playlist <lejátszási l. szám>\`
            `)
                .addField("**RADIÓ ÁLLOMÁSOK**", `
            >>> Válasz több mint 200 rádió állomás közül! Használat:\`${prefix}radio\`
            és játszd le: \`${prefix}radio <Rádió szám>\`
            `)
                .addField("\u200b", "\u200b")
                .addField("**__Támogatott zene appok__**", `
            >>> \`Youtube\`, \`Spotify\`, \`Soundcloud\`
            `)
                .setFooter(`KesfhBOT`, client.user.displayAvatarURL())
            const embed = new MessageEmbed()
                .setColor(config.colors.yes)
                .setTitle(`Parancsok\nPrefix: \`${prefix}\``)
                .setFooter(`KesfhBOT | Több infóért használd:  ${prefix}help [PARANCS NÉV]`, client.user.displayAvatarURL())

            const commands = (category) => {
                return client.commands
                    .filter(cmd => cmd.category === category)
                    .map(cmd => `\`${cmd.name}\``)
                    .join(", ");
            }

            const info = client.categories
                .map(cat => stripIndents `**__${cat[0].toUpperCase() + cat.slice(1)}__** \n> ${commands(cat)}`)
                .reduce((string, category) => string + "\n\n" + category);

            message.channel.send(embed1)
            return message.channel.send(embed.setDescription("*Használd a prefixet a parancsok használatához*\n" + info));
        }

        function getCMD(client, message, input) {
            const embed = new MessageEmbed() //creating a new Embed

            const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase())) //getting the command by name/alias
            if (!cmd) { //if no cmd found return info no infos!
                return message.channel.send(embed.setColor(config.colors.no).setDescription(`Nincs információ a parancsról **${input.toLowerCase()}**`));
            }
            if (cmd.name) embed.addField("**Parancs neve**", `\`${cmd.name}\``)
            if (cmd.name) embed.setTitle(`Részletes információk: \`${cmd.name}\``)
            if (cmd.description) embed.addField("**Leírás**", `\`${cmd.description}\``);

            if (cmd.aliases) embed.addField("**Alias**", `\`${cmd.aliases.map(a => `${a}`).join("\`, \`")}\``)
            if (cmd.cooldown) embed.addField("**Cooldown**", `\`${cmd.cooldown} mp\``)
            else embed.addField("**Cooldown**", `\`2 Seconds\``)
            if (cmd.useage) {
                embed.addField("**Használat**", `\`${config.prefix}${cmd.useage}\``);
                embed.setFooter("Helyes használat: <> = required, [] = optional");
            }
            return message.channel.send(embed.setColor(config.colors.yes));
        }
    }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
