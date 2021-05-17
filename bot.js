const discord = require("discord.js");
const fs = require("fs");
const database = require('better-sqlite3');
const dotenv = require("dotenv");
dotenv.config();

let client = new discord.Client();
client.embedReply = (message, embedFields, command) => {
  embed = new discord.MessageEmbed().setTitle(`ServerStocks -> ${client.capitalise(command.name)}`).setColor("DARK_GREEN");
  embed.fields = embedFields;
  message.reply(embed.setFooter(`ServerStocks responded in ${new Date() - message.createdAt}ms`));
  command.userTimeouts.push(message.author.id);
  command.guildTimeouts.push(message.guild.id);
  setTimeout(() => {command.userTimeouts.splice(command.userTimeouts.length - 1, 1)}, command.userTimeoutTime * 1000);
  setTimeout(() => {command.guildTimeouts.splice(command.guildTimeouts.length - 1, 1)}, command.guildTimeoutTime * 1000)
}
client.capitalise = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
client.structures = new discord.Collection();
client.commands = new discord.Collection();
client.db = new database("bot.db");

let structurePromise = new Promise((resolve, reject) => {
  fs.readdir("./structures", (error, structureFiles) => {
    if(error) {
      reject(error);
    } else {
      resolve(structureFiles);
    }
  })
}).then((value) => {
  value.forEach((file, index) => {
    if(file.endsWith(".js")) {
      let structure = require(`./structures/${file}`);
      client.structures.set(structure.name, structure);
    }
  });

}, (error) => {
  if(error) {
    throw error;
  }
})

let commandPromise = new Promise((resolve, reject) => {
  fs.readdir("./commands", (error, commandFiles) => {
    if(error) {
      reject(error);
    } else {
      resolve(commandFiles);
    }
  })
}).then((value) => {
  value.forEach((file, index) => {
    if(file.endsWith(".js")) {
      let command = require(`./commands/${file}`);
      client.commands.set(command.name, command);
    }
  });}, (error) => {
  if(error) {
    throw error;
  }
})

Promise.all([structurePromise, commandPromise]).then(() => {client.login(process.env.TOKEN);})

client.on("ready", () => {
  console.log("Connected");
  console.log();
})

client.on("message", (message) => {
  parseMessage(message);
});

function addGuild(message) {
  let stmt = client.db.prepare("INSERT INTO guilds (id, prefix) VALUES (?, @prefix)");
  stmt.run(message.guild, client.structures.get("guild"))
}

function addUser(message) {
  let stmt = client.db.prepare("INSERT INTO users (id, guildid) VALUES (?, ?)");
  stmt.run(message.author.id, message.guild.id)
}

function updateUser(message) {
  let row = client.db.prepare("SELECT * FROM users WHERE id = ?").get(message.author.id);
  Object.entries(row).forEach((kv) => {
    if(kv[1] == null) {
      client.db.prepare(`UPDATE users SET ${kv[0]} = ${client.structures.get("user")[kv[0]](message)} WHERE id = ${message.author.id}`).run();
    }
  });
}

function updateGuild(message) {
  let row = client.db.prepare("SELECT * FROM guild WHERE id = ?").get(message.guild.id);
  Object.entries(row).forEach((kv) => {
    if(kv[1] == null) {
      client.db.prepare(`UPDATE guild SET ${kv[0]} = ${client.structures.get("guild")[kv[0]](message)} WHERE id = ${message.guild.id}`).run();
    }
  });
}

function parseMessage(message) {
  if(!message.author.bot) {
    checkGuild(message);
    let {prefix} = client.db.prepare("SELECT prefix FROM guilds WHERE id = ?").get(message.guild.id);
    if(message.content.startsWith(prefix + " ")) {
      let args = message.content.toLowerCase().split(" ").filter((arg) => {return arg != ""});
      command = client.commands.findKey((cmd) => cmd.name == args[1] || cmd.aliases.includes(args[1]));
      if(!command) {return;}
      if(client.commands.get(command).adminPerm == true && message.member.hasPermission("ADMINISTRATOR", true, true) == false) {return;}
      if(client.commands.get(command).minargs > args.length - 2) {return;}
      checkUser(message);
      client.commands.get(command).execute(message, args.splice(2));
    }
  }
}

function checkGuild(message) {
  if(client.db.prepare("SELECT * FROM guilds WHERE id = ?").get(message.guild.id) == undefined) {
    addGuild(message);
  }
}

function checkUser(message) {
  let row = client.db.prepare("SELECT * FROM users WHERE id = ?").get(message.author.id);
  if(row == undefined) {
    addUser(message);
  } else if(Object.values(row).some((value) => {return value == null})) {
    updateUser(message);
  }
}

function transfer(user, guild, itemName, amount) {
  if(quantity == 0 || isNaN(quantity)) {return;} // removes invalid / non-number quantities
  let item = client.db.prepare("SELECT * FROM items WHERE itemName = ? AND userid = ? AND guildid = ?")
    .get(itemName, user.id, guild.id); // gets item entry from items
  if(!item) {return;} // removes an invalid item
  let userItem = client.db.prepare("SELECT * FROM useritems WHERE userid = ? AND guildid = ? and itemid = ?")
    .get(user.id, guild.id, item.id); // retrieves useritem row from useritems
  if(userItem) {
    if(quantity > 0) { // already exists and gaining money
      let newQuantity = Number(quantity) + Number(userItem.quantity);
      client.db.prepare("UPDATE useritems SET quantity = ? WHERE userid = ? AND guildid = ? and itemid = ?")
      .run(newQuantity, user.id, guild.id, item.id);
    } else { // already exists and losing money

    }
  } else if(quantity > 0) { // doesnt exist and gaining money
    client.db.prepare("INSERT INTO useritems (guildid, userid, itemid, quantity) VALUES (?, ?, ?, ?)")
      .run();
  } else { // doesnt exist and losing money (not enough money, return)
    return false;
  }
}
