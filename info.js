const discord = require("discord.js");
module.exports = {
  name: "information",
  aliases: ["info", "start"],
  syntax: [],
  description: "Explains some of ServerStocks features!",
  adminPerm: false,
  minargs: 0,
  execute(message, args) {
    let embed = new discord.MessageEmbed()
      .setTitle(message.client.formatTitle(this.name))
      .addField("What", "ServerStocks is virtual currency and stock market, this means you will be competing with fellow server members to win rare stocks and rack up large tallies of cash!")
      .addField("Why", "Why not? Who would say no to some vicously comptetitive fun?")
      .addField("When", "Main features will start to be added soon, for now check out some basic commands")
      .addField("Extra", "Some features will not work well / as intended, bugs will as always be present, dm me if you find one!")
  },
};
