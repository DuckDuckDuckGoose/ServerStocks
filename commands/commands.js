const discord = require("discord.js");
module.exports = {
  name: "commands",
  aliases: ["command"],
  syntax: [],
  description: "Shows you some of ServerStocks commands!",
  adminPerm: false,
  minargs: 0,
  guildTimeoutTime: 1,
  userTimeoutTime: 10,
  guildTimeouts: [],
  userTimeouts: [],
  execute(message, args) {
    let embedFields =[];
    message.client.commands.forEach((command) => {
      embedFields.push({"name": command.name, "value": command.description, "inline": false});
    });
    message.client.embedReply(message, embedFields, this);
  },
};
