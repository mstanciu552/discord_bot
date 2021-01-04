"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manga = void 0;
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
const config_js_1 = require("../config.js");
const manga = (message) => {
    const content = message.content.split(" ");
    if (content[0] === "!manga") {
        const manga = content.slice(1).join("-");
        if (manga === "rec") {
            var list = [];
            axios_1.default
                .get("https://kitsu.io/api/edge/trending/manga")
                .then(res => {
                res.data.data.forEach((item) => {
                    list.push(item.attributes.titles.en_jp);
                });
                return message.channel.send(new discord_js_1.MessageEmbed()
                    .setTitle("Manga Recommendations")
                    .setDescription(list.join("\n"))
                    .setColor(config_js_1.COLORS.random));
            })
                .catch(_ => {
                return message.channel.send(new discord_js_1.MessageEmbed()
                    .setTitle("No recommendations")
                    .setDescription("No recommendations found at this time")
                    .setColor(config_js_1.COLORS.alert));
            });
        }
        else {
            axios_1.default
                .get(`https://kitsu.io/api/edge/manga?filter[text]=${manga}`)
                .then(res => {
                const title = res.data.data[0].attributes.titles.en
                    ? res.data.data[0].attributes.titles.en
                    : res.data.data[0].attributes.titles.en_jp;
                const description = res.data.data[0].attributes.description;
                const posterImage = res.data.data[0].attributes.posterImage.small;
                console.log(res.data.data[0].attributes.titles);
                return message.channel.send(new discord_js_1.MessageEmbed()
                    .setTitle(title)
                    .setDescription(description)
                    .setImage(posterImage)
                    .setColor(config_js_1.COLORS.random));
            })
                .catch(err => {
                console.error(err);
                return message.channel.send(new discord_js_1.MessageEmbed()
                    .setTitle("Not found")
                    .setDescription("No such manga found")
                    .setColor(config_js_1.COLORS.alert));
            });
        }
    }
};
exports.manga = manga;
//# sourceMappingURL=manga.js.map