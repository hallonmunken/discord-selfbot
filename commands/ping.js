// Latency between Discord API and the selfbot/bot

const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {

    const m = await message.channel.send("🏓")

    m.edit(`🏓 Pong!, ${m.createdTimestamp - message.createdTimestamp}ms`)

}



module.exports.help = {
    name: "ping",
    description: "Info about ping and api latency"
}