"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.manga_updates = void 0;
const discord_js_1 = require("discord.js");
const config_js_1 = require("../config.js");
const puppeteer_1 = __importDefault(require("puppeteer"));
const url = 'https://m.manganelo.com/w';
const favorites = [
    'I Am The Sorcerer King',
    'Apotheosis',
    'Martial Peak',
    'Rebirth: City Deity',
    'Yuan Zun',
    'Rebirth Of The Urban Immortal Cultivator',
    'Spirit Sword Sovereign',
    'Tales Of Demons And Gods',
    'God Of Martial Arts',
    'Star Martial God Technique',
    'Tower Of God',
    'Everlasting God Of Sword',
    'Cultivation Chat Group',
    'Yong Heng Zhi Zun',
    'Versatile Mage',
    'Magic Emperor',
    'Solo Leveling',
    'Volcanic Age',
    'Immortal, Invincible',
];
const manga_updates = (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const content = message.content.split(' ');
    if (content[0] === '!updates') {
        try {
            const browser = yield puppeteer_1.default.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            });
            const page = yield browser.newPage();
            yield page.goto(url, {
                waitUntil: 'networkidle2',
            });
            const mangaRaw = yield page.$$('.content-homepage-item > a');
            let manga = [];
            for (let i = 0; i < mangaRaw.length; i++) {
                if (mangaRaw[i] === undefined)
                    continue;
                manga.push({
                    title: yield ((_a = (yield mangaRaw[i].getProperty('title'))) === null || _a === void 0 ? void 0 : _a.jsonValue()),
                    href: yield ((_b = (yield mangaRaw[i].getProperty('href'))) === null || _b === void 0 ? void 0 : _b.jsonValue()),
                    image: yield ((_d = (yield ((_c = (yield mangaRaw[i].$('img'))) === null || _c === void 0 ? void 0 : _c.getProperty('src')))) === null || _d === void 0 ? void 0 : _d.jsonValue()),
                });
            }
            let response = [];
            manga.forEach((m) => {
                if (favorites.includes(m.title))
                    response.push(`${m.title} -> ${m.href}`);
            });
            message.channel.send(new discord_js_1.MessageEmbed()
                .setTitle('Updates')
                .setDescription(response.join('\n'))
                .setColor(config_js_1.COLORS.random));
            yield browser.close();
        }
        catch (err) {
            console.error(err);
        }
    }
});
exports.manga_updates = manga_updates;
//# sourceMappingURL=manga_updates.js.map