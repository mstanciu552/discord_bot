import axios from "axios";
import { Message, MessageEmbed } from "discord.js";
import { COLORS } from "../config.js";

export const dadjokes = (message: Message) => {
  const content = message.content.split(" ");
  // check for command
  if (content[0] === "!joke" || content[0] === "!jk") {
    axios
      .get("https://icanhazdadjoke.com/", {
        headers: { Accept: "text/plain" },
      })
      .then((res) => {
        return message.channel.send(
          new MessageEmbed().setDescription(res.data).setColor(COLORS.random)
        );
      })
      .catch((err) => {
        // Handle API error
        console.log(err.response);
        return message.channel.send(
          new MessageEmbed()
            .setTitle("Error")
            .setDescription("API not working")
            .setColor(COLORS.alert)
        );
      });
  }
};
