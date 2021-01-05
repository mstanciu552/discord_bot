import { Message, MessageEmbed } from "discord.js";
import axios from "axios";
import { COLORS } from "../config.js";

export const manga = (message: Message) => {
  const content = message.content.split(" ");
  if (content[0] === "!manga") {
    const manga = content.slice(1).join("-");
    if (manga === "rec") {
      var list: Array<string> = [];
      axios
        .get("https://kitsu.io/api/edge/trending/manga")
        .then(res => {
          res.data.data.forEach((item: any) => {
            list.push(item.attributes.titles.en_jp);
          });
          return message.channel.send(
            new MessageEmbed()
              .setTitle("Manga Recommendations")
              .setDescription(list.join("\n"))
              .setColor(COLORS.random)
          );
        })
        .catch(_ => {
          return message.channel.send(
            new MessageEmbed()
              .setTitle("No recommendations")
              .setDescription("No recommendations found at this time")
              .setColor(COLORS.alert)
          );
        });
    } else {
      axios
        .get(`https://kitsu.io/api/edge/manga?filter[text]=${manga}`)
        .then(res => {
          var title;

          if (res.data.data[0].attributes.titles.en)
            title = res.data.data[0].attributes.titles.en;
          else if (res.data.data[0].attributes.titles.en_jp)
            title = res.data.data[0].attributes.titles.en_jp;
          else if (res.data.data[0].attributes.titles.en_us)
            title = res.data.data[0].attributes.titles.en_us;
          const description = res.data.data[0].attributes.description;
          const posterImage = res.data.data[0].attributes.posterImage.small;
          console.log(res.data.data[0].attributes.titles);
          return message.channel.send(
            new MessageEmbed()
              .setTitle(title)
              .setDescription(description)
              .setImage(posterImage)
              .setColor(COLORS.random)
          );
        })
        .catch(err => {
          console.error(err);
          return message.channel.send(
            new MessageEmbed()
              .setTitle("Not found")
              .setDescription("No such manga found")
              .setColor(COLORS.alert)
          );
        });
    }
  }
};
