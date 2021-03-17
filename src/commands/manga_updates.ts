import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios';
import { COLORS } from '../config.js';
import puppeteer, { Browser, ElementHandle, Page } from 'puppeteer';

const url: string = 'https://m.manganelo.com/w';

const favorites: Array<string> = [
    'I Am The Sorcerer King',
    'Apotheosis',
    'Martial Peak',
    'Rebirth: City Deity',
    'Yuan Zun',
    'Rebirth Of The Urban Immortal Cultivator',
    'Spirit Sword Sovereign',
    'Tales Of Demons And Gods',
    'God Of Martial Arts',
    'Star Martial God Technique',
    'Tower Of God',
    'Everlasting God Of Sword',
    'Cultivation Chat Group',
    'Yong Heng Zhi Zun',
    'Versatile Mage',
    'Magic Emperor',
    'Solo Leveling',
    'Volcanic Age',
    'Immortal, Invincible',
];

export const manga_updates = async (message: Message) => {
    const content = message.content.split(' ');
    // if (content.length !== 1) return;
    if (content[0] === '!updates') {
        try {
            // Starting the browser and going to specified page
            const browser: Browser = await puppeteer.launch();
            const page: Page = await browser.newPage();
            await page.goto(url, {
                waitUntil: 'networkidle2',
            });

            // Get promises with the data
            const mangaRaw: ElementHandle<Element>[] = await page.$$(
                '.content-homepage-item > a'
            );

            // Extract only what data we want from each element
            let manga: Array<Object> = []; // Will hold info about a manga if on the main page
            for (let i = 0; i < mangaRaw.length; i++) {
                if (mangaRaw[i] === undefined) continue;
                manga.push({
                    title: await (
                        await mangaRaw[i].getProperty('title')
                    )?.jsonValue(),
                    href: await (
                        await mangaRaw[i].getProperty('href')
                    )?.jsonValue(),
                    image: await (
                        await (await mangaRaw[i].$('img'))?.getProperty('src')
                    )?.jsonValue(),
                });
            }

            let response: Array<Object> = [];

            // Loops through the first page of new manga and gets any that match the favorites array
            manga.forEach((m: any) => {
                if (favorites.includes(m.title))
                    response.push(`${m.title} -> ${m.href}`);
            });

            // Return list of title + href
            message.channel.send(
                new MessageEmbed()
                    .setTitle('Updates')
                    .setDescription(response.join('\n'))
                    .setColor(COLORS.random)
            );
            await browser.close();
        } catch (err) {
            console.error(err);
        }
    }
};
