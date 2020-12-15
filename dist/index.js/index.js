"use strict";
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var dotenv = require("dotenv");
dotenv.config();
console.log(config.COLORS.message);
var client = new discord_js_1.Client();
client.on('message', function (message) {
    if (message.content === "bot test") {
        var reply = new discord_js_1.MessageEmbed()
            .setTitle("The bot works")
            .setDescription("You wrote: " + message.content);
        return message.channel.send(reply);
    }
    return;
});
client.login(process.env.DISCORD_TOKEN);
