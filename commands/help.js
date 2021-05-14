const discord = require("discord.js");
module.exports = {
  name: "help",
  aliases: ["assistance", "syntax", "query"],
  syntax: [],
  description: "Provides helps with commands and syntax!",
  adminPerm: false,
  execute(message, args) {
    if(args.length > 0) {
      command = message.client.commands.findKey((cmd) => cmd.name == args[0] || cmd.aliases.includes(args[0]));
      if(!command) {return;}
      message.channel.send(message.client.embed
        .setTitle(message.client.formatTitle(this.name))
        .addField("Command -> " + message.client.capitalise(args[0]), message.client.commands.get(command).description))
    }else {
      message.channel.send("Help")
    }
  },
};
