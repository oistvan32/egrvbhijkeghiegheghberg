const config = require("../config.json")
console.log("LOADING SLASH COMMANDS...")
const Discord = require("discord.js");
module.exports = (client) => {
    ///////////////////////////////
    /////////SLASH COMMANDS////////
    ///////////////////////////////
    client.on('ready', () => {

        //client.api.applications(client.user.id).guilds('guild id').commands.post({data: {     für einen server VVVV ist für mehr als 1 server
        client.api.applications(client.user.id).commands.post({
            data: {
                name: "help",
                description: "Shows you information for every cmd"
            }
        });
        client.api.applications(client.user.id).commands.post({
            data: {
                name: "info",
                description: "Néhány ifnormáció a botról"
            }
        });
        client.api.applications(client.user.id).commands.post({

            data: {
                name: "invite",
                description: "Hívd be saját szerveredre a botot!"
            }
        });
        client.ws.on('INTERACTION_CREATE', async interaction => {
            let prefix = await client.settings.get(interaction.guild_id, `prefix`);
            if (prefix === null) prefix = config.prefix;

            const command = interaction.data.name.toLowerCase();
            const args = interaction.data.options;
            const inviteembed = new Discord.MessageEmbed()
                .setColor(config.colors.yes)
                .setTitle("Invite me now!")
                .setDescription(`[\`Support\`](https://discord.gg/JJ5gUUfj2e)   |   [\`Invite link\`](https://discord.com/oauth2/authorize?client_id=870348656883167324&permissions=8&scope=bot)   |   :heart: Köszönöm a meghívást`)
                .setFooter(client.user.username + " | Syntax:  <>...must    []...optional", client.user.displayAvatarURL())
                .setAuthor(interaction.member.user.username, client.user.displayAvatarURL())
            let totalMembers = client.guilds.cache.reduce((c, g) => c + g.memberCount, 0);
            let days = Math.floor(client.uptime / 86400000);
            let hours = Math.floor(client.uptime / 3600000) % 24;
            let minutes = Math.floor(client.uptime / 60000) % 60;
            let seconds = Math.floor(client.uptime / 1000) % 60;

            const infoembed = new Discord.MessageEmbed()
                .setAuthor(
                    `Information about the ${client.user.username} Bot`,
                    client.user.displayAvatarURL()
                )
                .setColor(config.colors.yes)
                .addFields({
                        name: 'Bot tag',
                        value: `**\`${client.user.tag}\`**`,
                        inline: true,
                    }, {
                        name: 'Verzió',
                        value: `**\`7.0.0\`**`,
                        inline: true,
                    }, {
                        name: "Prefix",
                        value: `**\`${prefix}\`**`,
                        inline: true,
                    },

                    {
                        name: 'Az utolsó újraindítás óta eltelt idő',
                        value: `**\`${process.uptime().toFixed(2)}s\`**`,
                        inline: true,
                    }, {
                        name: 'Üzemidő',
                        value: `**\`${days}n\` \`${hours}ó\` \`${minutes}p\` \`${seconds}mp\`**`,
                        inline: true,
                    }, {
                        name: 'Szerverek száma',
                        value: `**\`${client.guilds.cache.size}\`**`,
                        inline: true,
                    }, {
                        name: 'Összes tag',
                        value: `**\`${totalMembers}\`**`,
                        inline: true,
                    }, {
                        name: 'Owner and Developer',
                        value: `**\`O.Istvan#5621\` <@527584460754124801>**`,
                        inline: true,
                    },
                )
                .addField("\u200b", `
            \u200b
            `)

                .addField("***SUPPORT:***", `
            >>> [\`Szerver\`](https://discord.gg/JJ5gUUfj2e) | [\`Invite\`](https://discord.com/oauth2/authorize?client_id=870348656883167324&permissions=8&scope=bot)
            `)
            const helpembed = new Discord.MessageEmbed()
                .setColor(config.colors.yes)
                .setTitle(`Help Menu\nPrefix: \`${prefix}\``)
                .addField("\u200b", "\u200b")
                .addField("**BASSBOOST FILTER INFORMÁCIÓ**", `
                >>> BassBoost erősségének megváloztatása \`1\`-\`20\`-ig terjedő skálán!Használat: \`${prefix}bassboost 10\` *Használd a bassboostot 10-esen*
                `)
                .addField("**CUSTOM LEJÁTSZÁSI LISTA**", `
                >>> Több lejátszási lista is elérhető fejenként 75 zenével!
                
                1. Charts
                2. Christmas
                3. Jazz
                4. Blues
                5. Country
                6. Rock
                *HAMAROSAN*
                Használd : \`${prefix}playlist <lejátszási l. szám>\`
                `)
                .addField("**RADIÓ ÁLLOMÁSOK**", `
                >>> Válasz több mint 200 rádió állomás közül! Használat: \`${prefix}radio\`
                és játszd le \`${prefix}radio <Rádió szám>\`
                `)
                .addField("\u200b", "\u200b")

                .addField("**__Támogatott zene appok__**", `
                >>> \`Youtube\`, \`Spotify\`, \`Soundcloud\`
                `)
                .setFooter(`Több infoért használd:${prefix}help [PARANCS NÉV]`, client.user.displayAvatarURL())

            const commands = (category) => {
                return client.commands
                    .filter(cmd => cmd.category === category)
                    .map(cmd => `\`${cmd.name}\``)
                    .join(", ");
            }

            const info = client.categories
                .map(cat => stripIndents `**__${cat[0].toUpperCase() + cat.slice(1)}__** \n> ${commands(cat)}`)
                .reduce((string, category) => string + "\n\n" + category);
            helpembed.setDescription("*Használd a prefixet a parancsok elején*\n" + info);
            if (command == 'help') {


                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: await createAPIMessage(interaction, helpembed)
                    }
                });
            }
            if (command == 'invite') {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: await createAPIMessage(interaction, inviteembed)
                    }
                });
            }
            if (command == 'info') {
                client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: await createAPIMessage(interaction, infoembed)
                    }
                });
            }
        });
    });

    async function createAPIMessage(interaction, content) {
        const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
            .resolveData()
            .resolveFiles();

        return {
            ...apiMessage.data,
            files: apiMessage.files
        };
    }
    console.log('Loaded Slash Commands');
}
