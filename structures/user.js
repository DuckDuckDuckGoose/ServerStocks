module.exports = {
  name: "user",
  id: (message) => {return message.author.id},
  guildid: (message) => {return message.guild.id},
};
