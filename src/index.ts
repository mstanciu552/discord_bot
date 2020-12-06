import { Client, MessageEmbed } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new Client();

client.on('message', message => {
	const reply = new MessageEmbed()
		.setTitle("The bot works")
		.setDescription(`You wrote: ${ message.content}`);

	return message.channel.send(reply);
	return;

})

client.login(process.env.DISCORD_TOKEN);
