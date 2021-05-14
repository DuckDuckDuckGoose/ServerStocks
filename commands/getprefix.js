module.exports = {
  name: "getprefix",
  aliases: ["getpre"],
  syntax: [],
  description: "Gets prefix for this server.",
  adminPerm: false,
  minargs: 0,
  execute(message, args) {
    message.channel.send(message.client.db.prepare("SELECT prefix FROM guilds WHERE id = ?").get(message.guild.id).prefix)
  },
};
