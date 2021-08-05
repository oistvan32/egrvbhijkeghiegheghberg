const functions = require("../../functions")
const config = require("../../config.json")
module.exports = {
  name: "embed",
  category: "Utility",
  aliases: ["createembed"],
  useage: "embed <Title> ++ <Description>",
  description: "Csinálj egy embedet!",
  run: async (client, message, args) => {
    if (!args[0]) return functions.embedbuilder(client, 5000, message, "#ff264a", "`" + message.author.tag + "`" + " Kérlek adj meg egy szöveget!")
    message.delete({
      timeout: client.ws.ping
    })
    return embedbuilder(client, "null", message, "#c219d8", args[0], args.slice(1).join(" ") || "");
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
