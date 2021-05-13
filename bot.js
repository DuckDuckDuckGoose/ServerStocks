const discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const database = require('better-sqlite3');

let client = new discord.Client();
client.structures = new discord.Collection();
client.commands = new discord.Collection();
//let data;
let db = new database("bot.db");

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
    if(file.endsWith(".json")) {
      fs.readFile(`./structures/` + file.toString(), (error, data) => {
        if(error) {
          console.log(error);
        } else {
          client.structures.set(file.replace(".json", ""), JSON.parse(data));
        }
      })
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
      client.commands.set(command.name, command)
    }
  });}, (error) => {
  if(error) {
    throw error;
  }
})

/*
let dataPromise =  new Promise((resolve, reject) => {loadData(resolve, reject)}).then((value) => {
  data = value;
  setInterval(() => {saveData()}, 2000);
}, (error) => {
  throw error;
})
*/

Promise.all([structurePromise, commandPromise]).then(() => {client.login(config.token);})

client.on("ready", () => {
  console.log("Connected");
})

client.on("message", (message) => {
  parseMessage(message)});

function addGuild(guild) {
  let stmt = db.prepare("INSERT INTO guilds (id, prefix) VALUES (?, @prefix)");
  stmt.run(guild.id, client.structures.get("guild"))
}

function addUser(user) {
  let stmt = dp.prepare("INSERT INTO users (id) VALUES (?)");
  stmt.run(user.id)
}

function parseMessage(message) {
  let {prefix} = db.prepare("SELECT prefix FROM guilds WHERE id = ?").all(message.guild.id);
  console.log(prefix);
  if(message.content.indexOf(db.prepare("SELECT prefix FROM guilds WHERE id = ?").get(message.guild.id).prefix) == 0) {
    let command = message.content.split(" ");
    if(client.commands.has(command[1])) {
      client.commands.get(command[1]).execute(message, command.splice(2));
    }
  }
}
