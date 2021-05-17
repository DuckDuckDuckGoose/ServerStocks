const discord = require("discord.js");
module.exports = {
  name: "buy",
  aliases: ["buying"],
  syntax: [],
  description: "Buy from the market.",
  adminPerm: false,
  minargs: 4,
  guildTimeoutTime: 1,
  userTimeoutTime: 10,
  guildTimeouts: [],
  userTimeouts: [],
  execute(message, args) {
    let [quantity, buyItem, price, forItem] = args;
    if(buyItem == forItem) {return;}
    let {id:buyId} = message.client.db.prepare("SELECT id FROM items WHERE itemname = ?").get(buyItem) || {};
    let {id:forId} = message.client.db.prepare("SELECT id FROM items WHERE itemname = ?").get(forItem) || {};
    if(!buyId || !forId) {console.log("fail");return;}
    let previousTrades = message.client.db.prepare("SELECT * FROM items WHERE userid = ? AND guildid = ? AND ()")
    message.client.db.prepare("INSERT INTO buytrades (userid, guildid, buyid, forid, price, units, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .run(message.author.id, message.guild.id, buyId, forId, price, quantity, new Date().getTime());
  },
};
