module.exports = {
  name: "giveitem",
  aliases: ["getitem"],
  syntax: [],
  description: "Allows a user to give themselves and item!",
  adminPerm: false,
  execute(message, args) {
    message.channel.send(this.name);
  },
};
