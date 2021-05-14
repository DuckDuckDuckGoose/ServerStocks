module.exports = {
  name: "bank",
  aliases: ["wallet", "invent", "inventory", "myitems"],
  syntax: [],
  description: "Allows a user to see their bank!",
  adminPerm: false,
  execute(message, args) {
    message.channel.send(this.name);
  },
};
