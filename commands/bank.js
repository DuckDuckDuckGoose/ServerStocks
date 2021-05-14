module.exports = {
  name: "bank",
  aliases: ["wallet", "invent", "inventory", "myitems"],
  syntax: [],
  description: "Allows a user to see their bank!",
  adminPerm: false,
  minargs: 0,
  execute(message, args) {
    message.channel.send(this.name);
  },
};
