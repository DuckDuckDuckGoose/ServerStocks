const discord = require("discord.js");
module.exports = {
  name: "ping",
  aliases: ["latency", "delay", "alive", "performance"],
  syntax: [],
  description: "Shows latency and ping of ServerStocks",
  adminPerm: false,
  minargs: 0,
  guildTimeoutTime: 1,
  userTimeoutTime: 10,
  guildTimeouts: [],
  userTimeouts: [],
  execute(message, args) {
    message.channel.send(`Ping: ${message.client.ws.ping}`);
  },
};
