const discord = require("discord.js");
module.exports = {
  name: "getitem",
  aliases: ["getitem"],
  syntax: [],
  description: "Shows the items used in this server.",
  adminPerm: false,
  minargs: 0,
  execute(message, args) {
    let embed = new discord.MessageEmbed().setTitle(message.client.formatTitle(this.name)).setColor(message.client.embedColor);
    let rows = message.client.db.prepare("SELECT * FROM items WHERE guildid = ?").all(message.guild.id);
    rows.forEach((item) => {
      embed.addField(item.itemname, "temp");
    });
    message.channel.send(embed.setFooter(`ServerStocks responded in ${new Date() - message.createdAt}ms`))
  },
};
