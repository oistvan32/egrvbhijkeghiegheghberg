const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: "mycustom",
  category: "ZENE PARANCSOK",
  aliases: [""],
  useage: "mycustom <add/remove/play/reset> [LINK]",
  description: "Add / Remove / Play Egyénileg létrehozott lejátszási lista!",

  run: async (client, message, args) => {


    let playlist = client.custom2.get(message.author.id, "myplaylists");
    if (args[0] === "add" || args[0] === "set" || args[0] === "use") {
      if (!args[1].includes("http")) return message.reply("Oh ne! That is not a Link for example: https://www.youtube.com/watch?v=dQw4w9WgXcQ")
      if (playlist.includes(args[1])) return message.reply("Oh ne! A dal már létezik a szerver lejátszási listán!")
      client.custom2.push(message.author.id, args[1], "myplaylists");
      return functions.embedbuilder(client, 5000, message, config.colors.yes, "SIKERESEN HOZZÁ ADVA A ZENE A LEJÁTSZÁSI LISTÁHOZ" + `
      Jelenleg ennyi: \`${playlist.length+1}\` zene van a lejátszási listán`)
    }
    if (args[0] === "reset" || args[0] === "res") {
      let themsg = await message.reply("Biztos vissza szeretné állítani az egyéni lejátszási listát? ||(*Reply with:* **__`yes`__**)||")
      const filter = m => m.author.id === message.author.id;
      themsg.channel.awaitMessages(filter, {
          max: 1,
          time: 600000,
          errors: ['time']
        })
        .then(async collected => {
          if (collected === "yes") {
            try {
              await client.custom2.delete(message.author.id, "myplaylists");
            } catch {
              /* */
            }
            client.custom2.ensure(message.author.id, {
              myplaylists: [],
            });
            await message.reply("SIKERESEN TÖRÖLTED A LEJÁTSZÁSI LISTÁT")
          }
        }).catch(error => {
          message.reply("HIBA MERÜLT FEL! ROSSZ SZÓ VAGY LE JÁRT AZ IDŐD!")
        })
    }
    if (args[0] === "play" || args[0] === "p" || args[0] === "hear" || args[0] === "listen") {
      client.distube.playCustomPlaylist(message, playlist, {
        name: message.author.username + "'s Playlist"
      });
      return functions.embedbuilder(client, 5000, message, config.colors.yes, "EGYEDI LEJÁTSZÁSI LISTA JÁTSZÁSA")
    }
    if (args[0] === "remove" || args[0] === "delete" || args[0] === "del" || args[0] === "rem") {
      if (!args[1]) return message.reply("Kérlek adj, meg egy zene linket, amit hozzá szeretnél adni!");
      if (!playlist.includes(args[1])) return message.reply("Oh ne! A zene nem létezik, a szerver lejátszási listájában ellenőrizze, hogy ugyanaz e a link!!")

      client.custom2.remove(message.author.id, args[1], "myplaylists");
      return functions.embedbuilder(client, 5000, message, config.colors.yes, "SIKERESEN TÖRÖLTED A ZENÉT A LISTÁBÓL")
    } else {
      let string = playlist.join("\n");
      customplay(message, string, playlist)
      functions.embedbuilder(client, "null", message, config.colors.yes, `Jelenleg ennyi: ${playlist.length} zene van a listádban!`, )
      return functions.embedbuilder(client, "null", message, config.colors.yes, `Használat`, "+mycustom <add/remove/play> [LINK]")
    }
  }
};
async function customplay(message, string, cursong) {
  let currentPage = 0;
  const embeds = functions.customplaylistembed(client, message, string, cursong);

  const queueEmbed = await message.channel.send(
    `**Aktuális oldal - ${currentPage + 1}/${embeds.length}**`,
    embeds[currentPage]
  );

  try {
    await queueEmbed.react("⬅️");
    await queueEmbed.react("⏹");
    await queueEmbed.react("➡️");
  } catch (error) {
    console.error(error);
    functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error lépet fel kérlek szólj egy fejlesztőnek !**")
    functions.errorbuilder(error.stack.toString().substr(0, 1000))
  }

  const filter = (reaction, user) => ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
  const collector = queueEmbed.createReactionCollector(filter, {
    time: 60000
  });

  collector.on("collect", async (reaction, user) => {
    try {
      if (reaction.emoji.name === "⬅️") {
        if (currentPage < embeds.length - 1) {
          currentPage++;
          queueEmbed.edit(`**Aktuális oldal - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
        }
      } else if (reaction.emoji.name === "➡️") {
        if (currentPage !== 0) {
          --currentPage;
          queueEmbed.edit(`**Aktuális oldal - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
        }
      } else {
        collector.stop();
        reaction.message.reactions.removeAll();
      }
      await reaction.users.remove(message.author.id);
    } catch (error) {
      console.error(error);
      functions.embedbuilder(client, 5000, message, config.colors.no, "ERROR: ", "```" + error.toString().substr(0, 100) + "```" + "\n\n**Error lépet fel kérlek szólj egy fejlesztőnek !**")
      functions.errorbuilder(error.stack.toString().substr(0, 2000))
    }
  });

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
