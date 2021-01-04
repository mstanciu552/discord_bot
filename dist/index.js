"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const gifs_1 = require("./commands/gifs");
const anime_1 = require("./commands/anime");
const help_1 = require("./commands/help");
dotenv_1.default.config();
const app = express_1.default();
const client = new discord_js_1.Client();
client.on("ready", () => console.log("Bot online"));
client.on("message", (message) => {
    help_1.help(message);
    gifs_1.gifs(message);
    anime_1.anime(message);
});
client.login(process.env.DISCORD_TOKEN);
app.get("/", (_, res) => {
    return res.send("Bot restarting");
});
app.listen(process.env.PORT || 8000, () => console.log(`Server listening on port ${process.env.PORT}`));
//# sourceMappingURL=index.js.map