import { Client, Message } from "discord.js";
import dotenv from "dotenv";
import axios from "axios";

// Set up dotenv
dotenv.config();

// Initialize client
const client: Client = new Client();

client.on("ready", () => console.log("Bot online"));

// Listen to messages
client.on("message", (message: Message) => {
  const content = message.content.split(" ");
  if (content[0] === "!gif") {
    const gif = content[1];
    if (!gif) {
      axios
        .get(
          `https://api.tenor.com/v1/search?key=${process.env.TENOR_KEY}&limit=8`
        )
        .then((res) => {
          const random = Math.floor(
            Math.random() * Math.floor(res.data.results.length)
          );
          return message.channel.send(res.data.results[random].url);
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .get(
          `https://api.tenor.com/v1/search?q=${gif}&key=${process.env.TENOR_KEY}&limit=8`
        )
        .then((res) => {
          const random = Math.floor(
            Math.random() * Math.floor(res.data.results.length)
          );
          return message.channel.send(res.data.results[random].url);
        })
        .catch((err) => console.error(err));
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
