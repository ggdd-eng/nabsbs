// require("events").EventEmitter.defaultMaxListeners = 200;
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const { MessageEmbed } = require("discord.js");
const botconfig = require('./config.json');

const Discord = require('discord.js') 



const client = new Discord.Client({ fetchAllMembers: false, messageCacheMaxSize: 5 }) 


const db = require('quick.db')


//require fs for make a command handler 
const fs = require('fs')

//create a client map of commands
client.commands = new Discord.Collection()

//read commands directory
const files = fs.readdirSync('./commands/').filter(file => file.endsWith(".js")) 

//read every single file and loop over it
for (const commands of files) {
  
  //require the file 
  const command = require(`./commands/${commands}`)
  
  //sets a command into a map if there's a command name
  if (command.name) client.commands.set(command.name, command) 
} 

//ready event
client.on("ready", async () => {
  const event = require('./events/ready.js').execute(client, db) 
})

//message event
client.on("message", async message => {
  let prefix = "-"
  try {
  const event = require('./events/message.js').execute(client, message, prefix, db) 
  } catch(e) {
    return message.channel.send(e.message) 
  } 
})
/*
client.on("message", msg =>{
  let emmbed = new Discord.MessageEmbed()
    .setColor(botconfig.embedColor)
    .setDescription(`My Default Prefix is : -\nDo \`s!help\` To Get Help Page\nDo \`s!invite\` To invite me to server And gain members\n\n\`Support\`: **__[Support Server](https://discord.gg/cJuhjj9)__** | **__[Invite The Bot](https://discord.com/oauth2/authorize?client_id=743159147889164350&scope=bot&permissions=2146958847)__**`)
    .setFooter(client.user.username)
  if(msg.content === `<@!${botconfig.botID}>`){
    msg.channel.send(emmbed);
  }
  if(msg.content === `@${botconfig.botName}`){
    msg.channel.send(emmbed);
  }
})

client.on("guildMemberAdd", async member => {
  const event = require('./events/guildMemberAdd.js').execute(client, member, db) 
})

client.on("guildMemberRemove", async member => {
  const event = require('./events/guildMemberRemove.js').execute(client, member, db) 
})

client.on("guildCreate", async guild => {
  console.log("new guild!") 
	const event = require('./events/guildCreate.js').execute(client, guild) 
}) 

client.on("guildDelete", async guild => {
  console.log("Left guild!") 
	const event = require('./events/guildDelete.js').execute(client, guild) 
}) 

client.on("error", (error) => {
  let channel = client.channels.get(botconfig.errorChannelID)
  channel.send(`\nWe found a misterious error: \`\`\`${error.message}\`\`\``) 
})*/

client.login(process.env.TOKEN)

/*
client.on('message',msg =>{
  if(msg.content === '+moddelete'){
    let serverid = '714959142430703624';
    
    db.delete(`code_${serverid}`)
    db.delete(`description_${serverid}`) 
    db.delete(`orders_${serverid}`)
    console.log(`the order of guild ${serverid} has been deleted succesfuullyy`);
  }
})*/