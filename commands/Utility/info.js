const Discord = require("discord.js")
const config = require("../../config.json")
const {
    version
} = require("discord.js");
module.exports = {
    name: "info",
    category: "Utility",
    description: "Részletes információkat küld a BORról",
    usage: "+info",
    run: async (client, message, args) => {
        let prefix = client.settings.get(message.guild.id, `prefix`);
        if (prefix === null) prefix = config.prefix; //if not prefix set it to standard prefix in the config.json file
        let totalMembers = client.guilds.cache.reduce((c, g) => c + g.memberCount, 0);
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        let boch = "";
        if (client.settings.get(message.guild.id, `botchannel`).join("") === "") boch = "Nincs megadva"
        else
            for (let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length; i++) {
                boch += "<#" + client.settings.get(message.guild.id, `botchannel`)[i] + "> | "
            }
        let djs = "";
        if (client.settings.get(message.guild.id, `djroles`).join("") === "") djs = "Nincs megadva"
        else
            for (let i = 0; i < client.settings.get(message.guild.id, `djroles`).length; i++) {
                djs += "<@&" + client.settings.get(message.guild.id, `djroles`)[i] + "> | "
            }
        const embed = new Discord.MessageEmbed()
            .setAuthor(
                `Információk: ${client.user.username} Bothoz`,
                client.user.displayAvatarURL(), "https://dc.musicium.eu"
            )
            .setColor(config.colors.yes)
            .addFields({
                    name: '🤖 BOT TAG',
                    value: `**\`${client.user.tag}\`**`,
                    inline: true,
                }, {
                    name: '🤖 BOT VERZIÓ',
                    value: `**\`7.0.0\`**`,
                    inline: true,
                }, {
                    name: '🤖 DISCORD.JS VERZIÓ',
                    value: `**\`${version}\`**`,
                    inline: true,
                }, {
                    name: '⌚️ ÜZEMIDŐ',
                    value: `**\`${days}N\` \`${hours}Ó\` \`${minutes}P\` \`${seconds}MP\`**`,
                    inline: true,
                }, {
                    name: '📶 PING',
                    value: `**\`${client.ws.ping} ms\`**`,
                    inline: true,
                }, {
                    name: '\u200b',
                    value: `\u200b`,
                    inline: true,
                }, {
                    name: '📁 Szerverek',
                    value: `**\`${client.guilds.cache.size}\`**`,
                    inline: true,
                }, {
                    name: '📁 Összes tag',
                    value: `**\`${totalMembers}\`**`,
                    inline: true,
                }, {
                    name: '📁 Összes parancs',
                    value: `**\`${client.commands.map(cmd => cmd.name).length}\`**`,
                    inline: true,
                }, {
                    name: '__**EGYEDI BEÁLLÍTÁSOK:**__',
                    value: `\u200b`,
                    inline: false,
                }, {
                    name: "📌 SZERVER PREFIX",
                    value: `**\`${prefix}\`**`,
                    inline: true,
                }, {
                    name: "⏳ BOT CSATORNA",
                    value: `**${boch}**`,
                    inline: true,
                }, {
                    name: "🎧 DJ-RANG",
                    value: `**${djs}**`,
                    inline: true,
                }, {
                    name: "⚙️ A felhasznált parancsok száma",
                    value: `**\`${client.infos.get("global", "cmds")}\`**`,
                    inline: true,
                }, {
                    name: "🎧 A lejátszott dalok száma",
                    value: `**\`${client.infos.get("global", "songs")}\`**`,
                    inline: true,
                }, {
                    name: "🔉 A hozzá adott filterek száma",
                    value: `**\`${client.infos.get("global", "filters")}\`**`,
                    inline: true,
                },


            ).addField("\u200b", `
    \u200b
    `)

    .addField("***SUPPORT:***", `
    >>> [\`Server\`](https://discord.gg/JJ5gUUfj2e) | [\`Invite\`](https://discord.com/oauth2/authorize?client_id=870348656883167324&permissions=8&scope=bot)
    `)
        message.channel.send(embed)
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
