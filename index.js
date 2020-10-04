const botconfig = require("./botconfig.json");
const token = require("./settings.json");
const Discord = require('discord.js');
const bcrypt = require("bcryptjs");
const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();
const fs = require("fs");

fs.readdir("./commands/", (err, files) => {
    
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

})


var servers = {};

bot.on("ready", async () =>{
   function randomStatus() {
       let status = ["status 1", "status 2", "status 3"]
       let rStatus = Math.floor(Math.random() * status.length);
       bot.user.setActivity(status[rStatus], {type: "PLAYING"});
   }; setInterval(randomStatus, 2000)
   
    console.log(`${bot.user.username} Is online!`);

})

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(message.channel.type === "embed") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

    if (message.content.startsWith(prefix)) {
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
}
});

bot.login(token)

