module.exports = {
  name: "setitem",
  aliases: ["setitem"],
  syntax: [],
  description: "Makes a new item for this server.",
  adminPerm: true,
  minargs: 1,
  execute(message, args) {
    let row = message.client.db.prepare("SELECT * FROM items WHERE itemname = ? AND guildid = ?").get(args[0], message.guild.id);
    console.log(row, args[0]);
    if(row) {message.channel.send("Invalid name, cannot have duplicates");return;}
    message.client.db.prepare("INSERT INTO items (itemname, guildid) VALUES (?, ?)").run(args[0], message.guild.id);
    let {id} = message.client.db.prepare("SELECT id FROM items WHERE itemname = ? AND guildid = ?").get(args[0], message.guild.id);
    console.log(id);
    message.client.db.prepare("INSERT INTO guilditems (itemid, guildid, quantity) VALUES (?, ?, ?)").run(id, message.guild.id, 0);
    message.channel.send(message.client.embed
      .setTitle(message.client.formatTitle(this.name))
      .addField(`Command -> ${this.name} ${args[0]}`, `Created new item called ${args[0]}`)
      .setFooter(`ServerStocks responded in ${new Date() - message.createdAt}ms`));
  },
};
