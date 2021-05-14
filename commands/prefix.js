module.exports = {
  name: "prefix",
  aliases: ["sign", "prefix", "call"],
  syntax: [],
  description: "Allows ServerStocks prefix to be changed",
  adminPerm: true,
  execute(message, args) {
    if(args[0] == undefined) {
      message.channel.send(message.client.db.prepare("SELECT prefix FROM guilds WHERE id = ?").get(message.guild.id).prefix)
    } else {
      message.client.db.prepare("UPDATE guilds SET prefix = ? WHERE id = ?").run(args[0], message.guild.id);
    }
  },
};
