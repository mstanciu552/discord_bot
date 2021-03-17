import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios';
import { COLORS } from '../config.js';

// Manga List
const list: Array<string> = [
  '1. Apotheosis',
  '2. Martial Peak',
  '3. Rebirth: City Deity',
  '4. Yuan Zun',
  '5. Rebirth Of The Urban Immortal Cultivator',
  '6. Spirit Sword Sovereign',
  '7. Tales Of Demons And Gods',
  '8. God Of Martial Arts',
  '9. Star Martial God Technique',
  '10. Tower Of God',
  '11. Everlasting God Of Sword',
  '12. Cultivation Chat Group',
  '13. Yong Heng Zhi Zun',
  '14. Versatile Mage',
  '15. Magic Emperor',
  '16. Solo Leveling',
  '17. I Am The Sorcerer King',
  '18. Volcanic Age',
  '19. Immortal, Invincible',
];

export const manga = (message: Message) => {
  // Get command
  const content = message.content.split(' ');
  // Get arguments
  if (content[0] === '!manga') {
    const manga = content.slice(1).join('-');
    if (manga === 'rec') {
      let list: Array<string> = [];
      axios
        .get('https://kitsu.io/api/edge/trending/manga')
        .then(res => {
          // Return data from response
          res.data.data.forEach((item: any) => {
            list.push(item.attributes.titles.en_jp);
          });
          return message.channel.send(
            new MessageEmbed()
              .setTitle('Manga Recommendations')
              .setDescription(list.join('\n'))
              .setColor(COLORS.random)
          );
        })
        .catch(_ => {
          return message.channel.send(
            new MessageEmbed()
              .setTitle('No recommendations')
              .setDescription('No recommendations found at this time')
              .setColor(COLORS.alert)
          );
        });
    } else if (manga === 'list' || manga === '') {
      // Send list to chat
      message.channel.send(
        new MessageEmbed()
          .setTitle('Manga Recommendations')
          .setDescription(list.join('\n'))
          .setColor(COLORS.random)
      );
    } else {
      axios
        .get(`https://kitsu.io/api/edge/manga?filter[text]=${manga}`)
        .then(res => {
          let title;
          // Extract and send info from request
          if (res.data.data[0].attributes.titles.en)
            title = res.data.data[0].attributes.titles.en;
          else if (res.data.data[0].attributes.titles.en_jp)
            title = res.data.data[0].attributes.titles.en_jp;
          else if (res.data.data[0].attributes.titles.en_us)
            title = res.data.data[0].attributes.titles.en_us;
          const description = res.data.data[0].attributes.description;
          const posterImage = res.data.data[0].attributes.posterImage.small;
          const chapterCount = res.data.data[0].attributes.chapterCount;
          return message.channel.send(
            new MessageEmbed()
              .setTitle(title + '\nChapter count: ' + chapterCount)
              .setDescription(description)
              .setImage(posterImage)
              .setColor(COLORS.random)
          );
        })
        .catch(err => {
          console.error(err);
          // Handle not found error
          return message.channel.send(
            new MessageEmbed()
              .setTitle('Not found')
              .setDescription('No such manga found')
              .setColor(COLORS.alert)
          );
        });
    }
  }
};
