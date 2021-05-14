const discord = require("discord.js");
module.exports = {
  name: "commands",
  aliases: ["command"],
  syntax: [],
  description: "Shows you some of ServerStocks commands!",
  adminPerm: false,
  execute(message, args) {
    let embed = message.client.embed;
    embed.setTitle(message.client.formatTitle(this.name));
    message.client.commands.forEach((command) => {
      embed.addField("Command -> " + message.client.capitalise(command.name), command.description)
    });
    message.channel.send(embed);

  },
};
