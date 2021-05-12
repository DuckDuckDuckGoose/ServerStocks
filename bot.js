const discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

let client = new discord.Client();
let structures = {};
let commands = {};
let data;

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
          structures[file.replace(".json", "")] = JSON.parse(data);
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
      commands[command.name] = command;
    }
  });}, (error) => {
  if(error) {
    throw error;
  }
})

let dataPromise =  new Promise((resolve, reject) => {loadData(resolve, reject)}).then((value) => {
  data = value;
  setInterval(() => {saveData()}, 2000);
}, (error) => {
  throw error;
})

Promise.all([structurePromise, commandPromise, dataPromise]).then(() => {client.login(config.token);})

client.on("ready", () => {
  console.log("Connected");
})

function saveData() {
  fs.writeFile("data.json", JSON.stringify(data), (error) => {
    if(error) {
      console.log(error);
    } else {
      console.log(`Data saved at ${new Date().toISOString()}`);
    }
  })
}

function loadData(resolve, reject) {
  fs.readFile("data.json", (error, data) => {
    if(error) {
      reject(error);
    } else {
      resolve(JSON.parse(data.toString()));
    }
  })
}
