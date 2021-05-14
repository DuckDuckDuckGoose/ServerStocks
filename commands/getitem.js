module.exports = {
  name: "getitem",
  aliases: ["getitem"],
  syntax: [],
  description: "Shows the items used in this server.",
  adminPerm: false,
  minargs: 0,
  execute(message, args) {
    let rows = message.client.db.prepare("SELECT * FROM items WHERE guildid = ?").all(message.guild.id);
    let embed = message.client.embed.setTitle(message.client.formatTitle(this.name))
    rows.forEach((item) => {
      embed.addField(item.itemname, "null");
    });
    message.channel.send(embed.setFooter(`ServerStocks responded in ${new Date() - message.createdAt}ms`))
  },
};
