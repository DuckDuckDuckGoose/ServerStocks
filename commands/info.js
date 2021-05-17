const discord = require("discord.js");
module.exports = {
  name: "information",
  aliases: ["info", "start"],
  syntax: [],
  description: "Explains some of ServerStocks features!",
  adminPerm: false,
  minargs: 0,
  guildTimeoutTime: 1,
  userTimeoutTime: 10,
  guildTimeouts: [],
  userTimeouts: [],
  execute(message, args) {
    if(this.userTimeouts.includes(message.author.id) || this.guildTimeouts.includes(message.guild.id)) {return;}
    let embedFields = [{"name": "What", "value": "ServerStocks is virtual currency and stock market, this means you will be competing with fellow server members to win rare stocks and rack up large tallies of cash!", "inline": false},
      {"name": "Why", "value": "Why not? Who would say no to some vicously comptetitive fun?", "inline": false},
      {"name": "When", "value": "Main features will start to be added soon, for now check out some basic commands", "inline": false},
      {"name": "Extra", "value": "Some features will not work well / as intended, bugs will as always be present, dm me if you find one!", "inline": false}];
    message.client.embedReply(message, embedFields, this);
  },
};
