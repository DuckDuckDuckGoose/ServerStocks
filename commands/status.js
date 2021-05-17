const discord = require("discord.js");
module.exports = {
  name: "status",
  aliases: ["marketstate"],
  syntax: [],
  description: "Shows the market state",
  adminPerm: false,
  minargs: 2,
  guildTimeoutTime: 1,
  userTimeoutTime: 10,
  guildTimeouts: [],
  userTimeouts: [],
  execute(message, args) {
    let [item1, item2] = args;
  },
};
