const discord = require("discord.js");
module.exports = {
  name: "sell",
  aliases: ["selling"],
  syntax: [],
  description: "Put something on the market.",
  adminPerm: false,
  minargs: 2,
  guildTimeoutTime: 1,
  userTimeoutTime: 10,
  guildTimeouts: [],
  userTimeouts: [],
  execute(message, args) {
    let [quantity, sellItem, price, forItem] = args;
    if(sellItem == forItem) {return;}
    let {id:sellId} = message.client.db.prepare("SELECT id FROM items WHERE itemname = ?").get(sellItem) || {};
    let {id:forId} = message.client.db.prepare("SELECT id FROM items WHERE itemname = ?").get(forItem) || {};
    if(!sellId || !forId) {console.log("fail");return;}
    message.client.db.prepare("INSERT INTO selltrades (userid, guildid, sellid, forid, price, units, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .run(message.author.id, message.guild.id, sellId, forId, price, quantity, new Date().getTime());
  },
};
