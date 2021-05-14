module.exports = {
  name: "serverbank",
  aliases: ["guildbank"],
  syntax: [],
  description: "Allows the server's bank to be seen!",
  adminPerm: true,
  execute(message, args) {
    message.channel.send(this.name);
  },
};
