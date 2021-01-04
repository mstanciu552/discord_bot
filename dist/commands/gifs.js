"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gifs = void 0;
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
const gifs = (message) => {
    const content = message.content.split(" ");
    if (content[0] === "!gif") {
        var gif = content.slice(1).join("");
        if (content.length === 2)
            gif = content[1];
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
};
exports.gifs = gifs;
//# sourceMappingURL=gifs.js.map