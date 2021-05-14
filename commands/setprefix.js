module.exports = {
  name: "setprefix",
  aliases: ["setpre"],
  syntax: [],
  description: "Sets prefix for this server.",
  adminPerm: true,
  minargs: 1,
  execute(message, args) {
    message.client.db.prepare("UPDATE guilds SET prefix = ? WHERE id = ?").run(args[0], message.guild.id);
    message.channel.send(`Prefix now set to ${args[0]}`);
  },
};
