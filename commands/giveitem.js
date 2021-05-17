const discord = require("discord.js");
module.exports = {
  name: "giveitem",
  aliases: ["giveitem"],
  syntax: [],
  description: "Gives out item",
  adminPerm: true,
  minargs: 4,
  guildTimeoutTime: 1,
  userTimeoutTime: 10,
  guildTimeouts: [],
  userTimeouts: [],
  execute(message, args) {
    const [type, id, itemname, quantity] = args;
    let embedFields = [];
    switch(type.toLowerCase()) {
      case "role":
        if(message.guild.roles.cache.has(id)) {
          let members = message.guild.roles.cache.get(id).members;
        }
        break;
      case "user":
        let item = message.client.db.prepare("SELECT * FROM items WHERE itemname = ?").get(itemname);
        if(item) {
          let previousUserItem = message.client.db.prepare("SELECT quantity FROM useritems WHERE userid = ? AND guildid = ? AND itemid = ?")
            .get(id, message.guild.id, item.id);
          if(previousUserItem) {
            console.log(previousUserItem);
            message.client.db.prepare("UPDATE useritems SET quantity = ? WHERE userid = ? AND guildid = ? AND itemid = ?")
              .run(Number(previousUserItem.quantity) + Number(quantity), id, message.guild.id, item.id);
          } else {
            message.client.db.prepare("INSERT INTO useritems (guildid, userid, itemid, quantity) VALUES (?, ?, ?, ?)")
              .run(message.guild.id, id, item.id, quantity);
          }
        }
        break;
      default:
        console.log("Invalid syntax");
    }
  },
};
