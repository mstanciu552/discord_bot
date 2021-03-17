"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manga = void 0;
const discord_js_1 = require("discord.js");
const axios_1 = __importDefault(require("axios"));
const config_js_1 = require("../config.js");
const list = [
    '1. Apotheosis',
    '2. Martial Peak',
    '3. Rebirth: City Deity',
    '4. Yuan Zun',
    '5. Rebirth Of The Urban Immortal Cultivator',
    '6. Spirit Sword Sovereign',
    '7. Tales Of Demons And Gods',
    '8. God Of Martial Arts',
    '9. Star Martial God Technique',
    '10. Tower Of God',
    '11. Everlasting God Of Sword',
    '12. Cultivation Chat Group',
    '13. Yong Heng Zhi Zun',
    '14. Versatile Mage',
    '15. Magic Emperor',
    '16. Solo Leveling',
    '17. I Am The Sorcerer King',
    '18. Volcanic Age',
    '19. Immortal, Invincible',
];
const manga = (message) => {
    const content = message.content.split(' ');
    if (content[0] === '!manga') {
        const manga = content.slice(1).join('-');
        if (manga === 'rec') {
            let list = [];
            axios_1.default
                .get('https://kitsu.io/api/edge/trending/manga')
                .then(res => {
                res.data.data.forEach((item) => {
                    list.push(item.attributes.titles.en_jp);
                });
                return message.channel.send(new discord_js_1.MessageEmbed()
                    .setTitle('Manga Recommendations')
                    .setDescription(list.join('\n'))
                    .setColor(config_js_1.COLORS.random));
            })
                .catch(_ => {
                return message.channel.send(new discord_js_1.MessageEmbed()
                    .setTitle('No recommendations')
                    .setDescription('No recommendations found at this time')
                    .setColor(config_js_1.COLORS.alert));
            });
        }
        else if (manga === 'list' || manga === '') {
            message.channel.send(new discord_js_1.MessageEmbed()
                .setTitle('Manga Recommendations')
                .setDescription(list.join('\n'))
                .setColor(config_js_1.COLORS.random));
        }
        else {
            axios_1.default
                .get(`https://kitsu.io/api/edge/manga?filter[text]=${manga}`)
                .then(res => {
                let title;
                if (res.data.data[0].attributes.titles.en)
                    title = res.data.data[0].attributes.titles.en;
                else if (res.data.data[0].attributes.titles.en_jp)
                    title = res.data.data[0].attributes.titles.en_jp;
                else if (res.data.data[0].attributes.titles.en_us)
                    title = res.data.data[0].attributes.titles.en_us;
                const description = res.data.data[0].attributes.description;
                const posterImage = res.data.data[0].attributes.posterImage.small;
                const chapterCount = res.data.data[0].attributes.chapterCount;
                return message.channel.send(new discord_js_1.MessageEmbed()
                    .setTitle(title + '\nChapter count: ' + chapterCount)
                    .setDescription(description)
                    .setImage(posterImage)
                    .setColor(config_js_1.COLORS.random));
            })
                .catch(err => {
                console.error(err);
                return message.channel.send(new discord_js_1.MessageEmbed()
                    .setTitle('Not found')
                    .setDescription('No such manga found')
                    .setColor(config_js_1.COLORS.alert));
            });
        }
    }
};
exports.manga = manga;
//# sourceMappingURL=manga.js.map