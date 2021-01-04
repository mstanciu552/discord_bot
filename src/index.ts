import express, { Application, Request, Response } from "express";
import { Client, Message } from "discord.js";
import dotenv from "dotenv";

// Commands
import { gifs } from "./commands/gifs";
import { anime } from "./commands/anime";
import { help } from "./commands/help";
import { manga } from "./commands/manga";
import { dadjokes } from "./commands/dadjoke";

// Set up dotenv
dotenv.config();

// Initialize app
const app: Application = express();

// Initialize client
const client: Client = new Client();

// On ready
client.on("ready", () => console.log("Bot online"));

// Listen to messages
client.on("message", (message: Message) => {
  // Help command
  help(message);

  // Gif command
  gifs(message);

  // Anime command
  anime(message);

  // Manga command
  manga(message);

  // Dad jokes command
  dadjokes(message);
});

client.login(process.env.DISCORD_TOKEN);

// Dev no idling
app.get("/", (_: Request, res: Response) => {
  return res.send("Bot restarting");
});

app.listen(process.env.PORT || 8000, () =>
  console.log(`Server listening on port ${process.env.PORT}`)
);
