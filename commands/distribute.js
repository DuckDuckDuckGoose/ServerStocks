module.exports = {
  name: "distribute",
  aliases: ["share"],
  syntax: [],
  description: "Allows currency to be shared amongst users!",
  adminPerm: true,
  minargs: 0,
  execute(message, args) {
    message.channel.send(this.name);
  },
};
