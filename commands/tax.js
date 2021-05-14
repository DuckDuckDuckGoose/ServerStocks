module.exports = {
  name: "tax",
  aliases: ["reduce", "cut", "remove"],
  syntax: [],
  description: "Removes currency from users!",
  adminPerm: true,
  execute(message, args) {
    message.channel.send(this.name);
  },
};
