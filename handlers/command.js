const {
    readdirSync
} = require("fs");
const config = require("../config.json")
const ascii = require("ascii-table");
let table = new ascii("Commands");
const functions = require("../functions")
table.setHeading("Command", "Load status");
console.log("Welcome to HANDLER SERVICE // By https://milrato.eu // Discord: Tomato#6966")
module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, 'Ready');
            } else {
                table.addRow(file, `error -> missing a cmd.name, or cmd.name is not a string.`);
                continue;
            }
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });

    const guildonlycounter = new Map();
    client.on("ready", () => {
        console.log(`Bot User ${client.user.username} has been logged in and is ready to use!`);
        client.user.setActivity(`+help | ${client.guilds.cache.size} Szerver`, {
            type: 'WATCHING'
        });
        setInterval(() => {
            client.guilds.cache.forEach(async guild => {
                await functions.delay(client.ws.ping);
                let member = await client.guilds.cache.get(guild.id).members.cache.get(client.user.id)
                //if not connected
                if (!member.voice.channel)
                    return;
                if (member.voice.channel.members.size === 1) {
                    if (!guildonlycounter.has(guild.id)) return guildonlycounter.set(guild.id);
                    try {
                        guildonlycounter.delete(guild.id);
                        return member.voice.channel.leave();
                    } catch {}
                }
            });
        }, (30 * 1000));
    });


    client.distube
        .on("playSong", async (message, queue, song) => {

            client.infos.set("global", Number(client.infos.get("global", "songs")) + 1, "songs");

            try {
                queue.connection.voice.setDeaf(true);
            } catch (error) {
                console.error(error)
                functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error lépet fel kérlek szólj az egyik fejlesztőnek**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
            try {
                queue.connection.voice.setSelfDeaf(true);
            } catch (error) {
                console.error(error)
                functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error lépet fel kérlek szólj az egyik fejlesztőnek**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
            try {
                functions.playsongyes(client, message, queue, song);
            } catch (error) {
                console.error(error)
                functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error lépet fel kérlek szólj az egyik fejlesztőnek**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
        })
        .on("addSong", (message, queue, song) => {
            try {
                return functions.embedbuilder(client, 7500, message, config.colors.yes, "Zene hozzáadva", `Zene: [\`${song.name}\`](${song.url})  -  \`${song.formattedDuration}\` \n\nLe kérte: ${song.user}\n\n Becsült: ${queue.songs.length - 1} zene(ék) - \`${(Math.floor((queue.duration - song.duration) / 60 * 100) / 100).toString().replace(".", ":")}\`\nLista időtartama: \`${queue.formattedDuration}\``, song.thumbnail)
            } catch (error) {
                console.error(error)
                functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error lépet fel kérlek szólj az egyik fejlesztőnek**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
        })
        .on("playList", (message, queue, playlist, song) => {
            try {
                queue.connection.voice.setDeaf(true);
            } catch (error) {
                console.error(error)
                functions.embedbuilder(5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error lépet fel kérlek szólj az egyik fejlesztőnek**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
            try {
                queue.connection.voice.setSelfDeaf(true);
            } catch (error) {
                console.error(error)
                functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error lépet fel kérlek szólj az egyik fejlesztőnek**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
            functions.embedbuilder(client, 7500, message, config.colors.yes, "Zene hozzáadva a liához", `Lista: [\`${playlist.name}\`](${playlist.url ? playlist.url : ""})  -  \`${playlist.songs.length ? playlist.songs.length : "undefinied"} zene\` \n\nLe kérte: ${queue.songs[0].user ? queue.songs[0].user : "error"}`, playlist.thumbnail.url ? playlist.thumbnail.url : "")

            try {
                functions.playsongyes(client, message, queue, queue.songs[0]);
            } catch (error) {
                console.error(error)
                functions.embedbuilder(client, 5000, message, "#ff264a", "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error lépet fel kérlek szólj az egyik fejlesztőnek**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
        })
        .on("addList", (message, queue, playlist) => {
            try {
                return functions.embedbuilder(client, 7500, message, config.colors.yes, "Zene hozzáadva a liához", `Lista: [\`${playlist.name}\`](${playlist.url ? playlist.url : ""})  -  \`${playlist.songs.length ? playlist.songs.length : "undefinied"} zene\` \n\nLe kérte: ${queue.songs[0].user ? queue.songs[0].user : "error"}`, playlist.thumbnail.url ? playlist.thumbnail.url : "")
            } catch (error) {
                console.error(error)
                functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error lépet fel kérlek szólj az egyik fejlesztőnek**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
        })
        .on("searchResult", (message, result) => {
            try {
                let i = 0;
                return functions.embedbuilder(client, "null", message, config.colors.yes, "", `**Válasszon egy lehetőséget az alábbiak közül**\n${result.map(song => `**${++i}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n")}\n*Válasz ki bármelyiket vagy várja meg a 60mp-t*`)
            } catch (error) {
                console.error(error)
                functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error lépet fel kérlek szólj az egyik fejlesztőnek**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
        })
        .on("searchCancel", (message) => {
            try {
                message.reactions.removeAll();
                message.react("❌")
            } catch (error) {
                console.error(error)
                functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error lépet fel kérlek szólj az egyik fejlesztőnek**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
            try {
                return functions.embedbuilder(client, 5000, message, config.colors.yes, `Searching canceled`, "")
            } catch (error) {
                console.error(error)
                functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error lépet fel kérlek szólj az egyik fejlesztőnek**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
        })
        .on("error", (message, err) => {
            try {
                message.reactions.removeAll();
                message.react("❌")
            } catch (error) {
                console.error(error)
                functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error lépet fel kérlek szólj az egyik fejlesztőnek**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
            console.log(err);
            try {
                return functions.embedbuilder(client, "null", message, config.colors.yes, "Hiba történt:", "```" + err + "```")
            } catch (error) {
                console.error(error)
                functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error lépet fel kérlek szólj az egyik fejlesztőnek**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
        })
        .on("finish", message => {
            try {
                return functions.embedbuilder(client, 5000, message, config.colors.yes, "Ki léptem a hangcsatornába", "Nincs több dal")
            } catch (error) {
                console.error(error)
                functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error lépet fel kérlek szólj az egyik fejlesztőnek**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
        })
        .on("empty", message => {

            try {
                return functions.embedbuilder(client, 5000, message, config.colors.yes, "El hagytam a csatornát mert üres lett a lista")
            } catch (error) {
                console.error(error)
                functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error lépet fel kérlek szólj az egyik fejlesztőnek**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
        })
        .on("noRelated", message => {
            try {
                return functions.embedbuilder(client, 5000, message, config.colors.yes, "Nem találok kapcsolódó videót a lejátszáshoz!")
            } catch (error) {
                console.error(error)
                functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error lépet fel kérlek szólj az egyik fejlesztőnek!**")
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
        })
        .on("initQueue", queue => {
            try {
                queue.autoplay = false;
                queue.volume = 50;
                queue.filter = "bassboost6";
            } catch (error) {
                console.error(error)
                functions.errorbuilder(error.stack.toString().substr(0, 2000))
            }
        });

    console.log(table.toString());
    console.log("Welcome to HANDLER SERVICE // By https://milrato.eu // Discord: Tomato#6966")
    console.log("Logging into Bot User...");
}
