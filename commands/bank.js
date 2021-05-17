const discord = require("discord.js");
module.exports = {
  name: "bank",
  aliases: ["wallet", "invent", "inventory", "myitems", "bank"],
  syntax: [],
  description: "Allows a user to see their bank!",
  adminPerm: false,
  minargs: 0,
  guildTimeoutTime: 1,
  userTimeoutTime: 10,
  guildTimeouts: [],
  userTimeouts: [],
  execute(message, args) {
    let rows = message.client.db.prepare("SELECT * FROM useritems WHERE userid = ? AND guildid = ?").all(message.author.id, message.guild.id);
    let embedFields = [{"name": "Your Bank", "value": "", "inline": false}];
    if(rows.length > 0) {
      rows.forEach((useritem) => {
        let item = message.client.db.prepare("SELECT * FROM items WHERE id = ?").get(useritem.itemid);
        embedFields[0].value += `${message.client.capitalise(item.itemname)}: ${useritem.quantity}pcs` + String.fromCharCode(0x000a);
      });
    } else {
      embedFields.push({"name": "Your bank:", "value": "Your bank is empty, looks like you need to get some money...", "inline": false});
    }
    message.client.embedReply(message, embedFields, this)
  },
};
