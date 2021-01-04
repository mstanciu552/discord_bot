"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dadjokes = void 0;
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
const config_js_1 = require("../config.js");
const dadjokes = (message) => {
    const content = message.content.split(" ");
    if (content[0] === "!joke" || content[0] === "!jk") {
        axios_1.default
            .get("https://icanhazdadjoke.com/", { headers: { Accept: "text/plain" } })
            .then(res => {
            return message.channel.send(new discord_js_1.MessageEmbed().setDescription(res.data).setColor(config_js_1.COLORS.random));
        })
            .catch(_ => {
            return message.channel.send(new discord_js_1.MessageEmbed()
                .setTitle("Error")
                .setDescription("API not working")
                .setColor(config_js_1.COLORS.alert));
        });
    }
};
exports.dadjokes = dadjokes;
//# sourceMappingURL=dadjoke.js.map