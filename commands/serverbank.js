module.exports = {
  name: "serverbank",
  aliases: ["guildbank"],
  syntax: [],
  description: "Allows the server's bank to be seen!",
  adminPerm: true,
  minargs: 0,
  guildTimeoutTime: 1,
  userTimeoutTime: 10,
  guildTimeouts: [],
  userTimeouts: [],
  execute(message, args) {
    message.channel.send(this.name);
  },
};
