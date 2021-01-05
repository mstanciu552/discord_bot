"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.anime = void 0;
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
const config_js_1 = require("../config.js");
const list = [
    "1.Naruto+Shippuuden ",
    "2.Zero no tsukaima ",
    "3.Akame Ga Kill ",
    "4.The seven deadly sins",
    "5.Sword Art Online+2 ",
    "6.Tokyo Ravens ",
    "7.Rakudai Kishi no Calvary ",
    "8.Knight's Mage ",
    "9.Gakusen Toshi Asterisk ",
    "10.Demon King Daimio ",
    "11.Hundred ",
    "12.Infinite Stratos ",
    "13.Ao No Exorcist ",
    "14.One Piece ",
    "15.Yamada-kun and The Seven Witches",
    "16.The Sacred Blacksmith ",
    "17.Absolute Duo ",
    "18.Date a Live ",
    "19.In another world with My Smartphone ",
    "20.Trinity Seven ",
    "21.Fairy Tail ",
    "22.Golden Time ",
    "23.Toradora ",
    "24.Rosario+Vampire ",
    "24.Princess Lover ",
    "25.Maoyuu Maou Yuusha ",
    "26.Black Clover ",
    "27.Masamune-kun no revenge ",
    "28.Sekirei ",
    "29.Aquarion Evol ",
    "30.Hataraku Maou-sama ",
    "31.Kaichou wa Maid-sama ",
    "32.Soredemo sekai wa Utsukushii ",
    "33.Soul Eater ",
    "34.Madan no ou to Vanadis ",
    "35.Robotics;Notes ",
    "36.Nisekoi ",
    "37.Tonari no Kaibutsu-kun",
    "38.Prison school ",
    "39.Inu x Boku SS ",
    "40.Grisaia no Kajitsu ",
    "41.Shinmai maou no testament ",
    "42.Hajimete no gal ",
    "43.Renai Boukun ",
    "44.Gamers! ",
    "45.Seirei Tsukai no Blade Dance ",
    "46.Amagi Brilliant Park ",
    "47.Noragami ",
    "48.Oda Nobuna no Yabou ",
    "49.War on geminar ",
    "50.Darling in the Franxx ",
    "51.Guilty Crown ",
    "52.Shingeki no kyojin ",
    "53.No game no life ",
    "54.FullMetal Alchemist ",
    "55.Boku no hero academia ",
    "56.rokudenashi majutsu koushi akashic records ",
    "57.Nurarihyon no mago ",
    "58.Kaze no Stigma ",
    "59.Kuusen madoushi kouhosei no kyoukan ",
    "60.B gata h kei ",
    "61.Busou shojo machiavellism ",
    "62.Isuca ",
    "63.Witch craft works ",
    "64.Alderamin Sky ",
    "65.Maken ki ",
    "66.Ore no kanojo osananajimi ga shuraba sugiru  /  Oreshura ",
    "67.Sukitte ii na yo ",
    "68.Walkure Romanze ",
    "69.Kimi ga aruji de shitsuji ga ore de(shinra-sama) ",
    "70.Hoshizora e Kakaru Hashi ",
    "71.Outbreak company ",
    "72.Net-juu no susume ",
    "73.Dagashi Kashi 1+2 ",
    "74.Shokugeki no soma 1+2+3 ",
    "75.Campione! ",
    "76.Dragonaut:The Resonance ",
    "77.Akatsuki no Yona ",
    "78.Shomin Sample ",
    "79.Mahou Sensou ",
    "80.The world god only knows ",
    "81.Arcana Famiglia",
    "82.Asobi ni iku yo",
    "83.Jitsu wa watashi wa",
    "84.Nyan Koi",
    "85.Strike the blood",
    "86.Devil's Line",
    "87.Hunter x Hunter 2011",
    "88.Hidan no Aria",
    "89.Mirai nikki",
    "90.Grancrest senki",
    "91.Mayo chiki",
    "92.Tokyo Ghoul",
    "93.Magi Sinbad no bokuen",
    "93.Seikoku no Dragonar",
    "94.Omamori Himari",
    "95.Owari no seraph",
    "96.Machine-doll wa Kizutsukanai",
    "97.Aho Girl",
    "98.Shimoneta",
    "99.Sakurasou no pet na kanojo",
    "100.Kobayashi san chi no maid dragon",
    "101.Gate",
    "102.Maji de watashi ni koi shinasai!",
    "103.Wanna be the strongest in the world!",
    "104.Twin star exorcists",
    "105.The master of ragnarok and blesser of einherjar",
    "106.Tada-kun wa koi wo shinai",
    "107.Tsuredure Children",
    "108.World Trigger",
    "109.Yahari  ore no seishun Love comedy wa Machigatteiru",
    "110.The disastrous life of Saiki K.",
    "111.Problem Children Are Coming ftom Another World aren't they?",
    "112.Kill la kill",
    "113.One punch man",
    "114.Is it wrong to try to pick up girls in a dungeon?",
    "115.No game no life ",
    "116.Haven't you heard? I'm Sakamoto",
    "117.Grand Blue",
    "118.UQ holder",
    "119.Magi Labirinth of Magic",
    "120.Magi Kingdom of Magic",
    "121.Fire force",
    "122.Jujutsu kaisen",
];
const anime = (message) => {
    const content = message.content.split(" ");
    if (content[0] === "!anime") {
        var anime = content.slice(1).join("-");
        if (content.length === 2)
            anime = content[1];
        if (anime === "rec") {
            var titles = [];
            axios_1.default
                .get(`https://kitsu.io/api/edge/trending/anime`, {
                headers: {
                    "Content-Type": "application/vnd.api+json",
                    Accept: "application/vnd.api+json",
                },
            })
                .then(res => {
                res.data.data.forEach((rec) => {
                    const title = rec.attributes.titles.en
                        ? rec.attributes.titles.en
                        : rec.attributes.titles.en_jp;
                    if (title)
                        titles.push(title);
                });
                return message.channel.send(new discord_js_1.MessageEmbed()
                    .setTitle("Anime Recommendations")
                    .setDescription(titles.join("\n\n ")));
            })
                .catch(_ => {
                return message.channel.send(new discord_js_1.MessageEmbed()
                    .setTitle("No recommendations")
                    .setDescription("Unfortunately, we have no recommendations at this time")
                    .setColor("#e74c3c"));
            });
        }
        else if (anime === "list" || anime === "") {
            message.channel.send(new discord_js_1.MessageEmbed()
                .setTitle("Anime List")
                .setColor(config_js_1.COLORS.list)
                .setDescription(list.slice(0, list.length / 2).join("\n"))
                .setFooter(list.slice(list.length / 2).join("\n")));
        }
        else {
            axios_1.default
                .get(`https://kitsu.io/api/edge/anime?filter[text]=${anime}`, {
                headers: {
                    "Content-Type": "application/vnd.api+json",
                    Accept: "application/vnd.api+json",
                },
            })
                .then(res => {
                const title = res.data.data[0].attributes.titles.en
                    ? res.data.data[0].attributes.titles.en
                    : res.data.data[0].attributes.titles.en_jp;
                const description = res.data.data[0].attributes.description;
                const posterImage = res.data.data[0].attributes.posterImage.small;
                const status = res.data.data[0].attributes.status === "current"
                    ? "Ongoing"
                    : "Finished";
                return message.channel.send(new discord_js_1.MessageEmbed()
                    .setTitle(title + "  ----->  " + status)
                    .setImage(posterImage)
                    .setDescription(description)
                    .setColor(config_js_1.COLORS.random));
            })
                .catch(_ => {
                return message.channel.send(new discord_js_1.MessageEmbed()
                    .setColor(config_js_1.COLORS.alert)
                    .setTitle("Wrong title")
                    .setDescription("No such anime found"));
            });
        }
    }
};
exports.anime = anime;
//# sourceMappingURL=anime.js.map