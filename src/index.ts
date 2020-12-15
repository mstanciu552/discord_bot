import { Client, Message, MessageEmbed } from "discord.js";
import * as dotenv from "dotenv";
import config from "./config";
dotenv.config();

console.log(config.COLORS.message);

const client = new Client();

client.on("message", (message: Message) => {
  if (message.content === "bot test") {
    const reply = new MessageEmbed()
      .setTitle("The bot works")
      .setDescription(`You wrote: ${message.content}`);

    return message.channel.send(reply);
  }
  return;
});

client.login(process.env.DISCORD_TOKEN);
