/* eslint-disable no-plusplus */
require('dotenv').config();

const Discord = require('discord.js');
const axios = require('axios');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  if (message.author.bot) return;

  if (message.content.indexOf(process.env.PREFIX) !== 0) return;

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ /g);
  const command = args.shift().toLowerCase();

  // FKU FUNCTION
  if (command === 'fku') {
    message.channel.send('fk you too');
  }

  // HEADS OR TAILS FUNCTION
  if (command === 'hort') {
    const rand = Math.random() < 0.5;

    if (rand) {
      message.channel.send('Heads', { files: ['https://i.imgur.com/BguRU0K.png'] });
    } else {
      message.channel.send('Tails', { files: ['https://i.imgur.com/u0lKXpp.png'] });
    }
  }

  // TEST FUNCTION
  if (command === 'test') {
    if (!args.length) {
      message.channel.send(`testing usertag: ${message.author}!`);
      return;
    }
    message.channel.send(`arguments: ${args}`);
  }

  if (command === 'write') {
    const data = {
      "content": {
          "contentEntities": [
              {
                  "entityLocation": "https://www.ubeshi.com"
              }
          ]
      },
      "distribution": {
          "linkedInDistributionTarget": {}
      },
      "owner": `urn:li:organization:${process.env.LINKEDIN_ORG_ID}`,
      "subject": `${args}`,
      "text": {
          "text": `${args} \n#ubeshi #gpt2`
      }
    };
    axios.post('https://api.linkedin.com/v2/shares', data, {
      headers: {
        Authorization: `Bearer ${process.env.LINKEDIN_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }).catch((e) => {
      console.log(e);
    });
  }
});

client.login(process.env.CLIENT_TOKEN);
