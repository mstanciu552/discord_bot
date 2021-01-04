import { Message, MessageEmbed } from "discord.js";
import axios from "axios";

export const gifs = (message: Message) => {
  const content = message.content.split(" ");
  if (content[0] === "!gif") {
    var gif = content.slice(1).join("");
    if (content.length === 2) gif = content[1];
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
        .catch((_) => {
          return;
        });
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
        .catch((_) => {
          const reply = new MessageEmbed()
            .setTitle("No such gif")
            .setDescription("There is no gif with this subject.");
          return message.channel.send(reply);
        });
    }
  }
};
