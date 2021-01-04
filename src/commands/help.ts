import { Message, MessageEmbed } from "discord.js";
import { COLORS } from "../config.js";

const commandList: Array<string> = [
  "1. !gif [subject]  :   returns a gist related to the <subject> if it exists\n",
  "2. !anime [name | list | rec]  :   returns info about an anime based on the <name> or a list of anime with the <list> parameter or recommendations with <rec> parameter\n",
  "3. !jk | !joke: return a bad joke",
];

export const help = (message: Message) => {
  const content = message.content.split(" ");
  if (content[0] === "!help") {
    var help = content.slice(1).join("-");
    if (content.length === 2) help = content[1];
    if (help === "") {
      message.channel.send(
        new MessageEmbed()
          .setColor(COLORS.help)
          .setTitle("Available Commands")
          .setDescription(commandList.join("\n"))
      );
    } else if (help === "gif" || help === "gifs") {
      message.channel.send(
        new MessageEmbed()
          .setColor(COLORS.help)
          .setTitle("GIF Command")
          .setDescription(commandList[0])
      );
    } else if (help === "anime") {
      message.channel.send(
        new MessageEmbed()
          .setColor(COLORS.help)
          .setTitle("ANIME Command")
          .setDescription(commandList[1])
      );
    } else if (help === "joke") {
      message.channel.send(
        new MessageEmbed()
          .setColor(COLORS.help)
          .setTitle("JOKE Command")
          .setDescription(commandList[2])
      );
    } else {
      message.channel.send(
        new MessageEmbed()
          .setColor(COLORS.help)
          .setTitle("Available Commands")
          .setDescription(commandList.join("\n"))
      );
    }
  }
};
