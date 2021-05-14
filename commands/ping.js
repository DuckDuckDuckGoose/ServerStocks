const discord = require("discord.js");
module.exports = {
  name: "ping",
  aliases: ["latency", "delay", "alive", "performance"],
  syntax: [],
  description: "Shows latency and ping of ServerStocks",
  adminPerm: false,
  execute(message, args) {
    message.channel.send(`Ping: ${message.client.ws.ping}`);
  },
};