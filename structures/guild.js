module.exports = {
  name: "guild",
  id:  (message) => {return message.guild.id},
  prefix: (message) => {return "!ss"}
};
