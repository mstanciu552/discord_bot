"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const client = new discord_js_1.Client();
client.on("ready", () => console.log("Bot online"));
client.on("message", (message) => {
    const content = message.content.split(" ");
    if (content[0] === "!gif") {
        const gif = content[1];
        if (!gif) {
            axios_1.default
                .get(`https://api.tenor.com/v1/search?key=${process.env.TENOR_KEY}&limit=8`)
                .then((res) => {
                const random = Math.floor(Math.random() * Math.floor(res.data.results.length));
                return message.channel.send(res.data.results[random].url);
            })
                .catch((_) => {
                return;
            });
        }
        else {
            axios_1.default
                .get(`https://api.tenor.com/v1/search?q=${gif}&key=${process.env.TENOR_KEY}&limit=8`)
                .then((res) => {
                const random = Math.floor(Math.random() * Math.floor(res.data.results.length));
                return message.channel.send(res.data.results[random].url);
            })
                .catch((_) => {
                const reply = new discord_js_1.MessageEmbed()
                    .setTitle("No such gif")
                    .setDescription("There is no gif with this subject.");
                return message.channel.send(reply);
            });
        }
    }
});
client.login(process.env.DISCORD_TOKEN);
//# sourceMappingURL=index.js.map