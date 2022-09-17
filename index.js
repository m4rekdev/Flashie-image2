const fs = require('fs');
const path = require('path');

const { Client, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { token } = require('./config.json');

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

if (!fs.existsSync('./data/ship.json')) fs.writeFileSync('./data/ship.json', "{}");

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    };

    console.log(`Loaded event: ${file}`);
};

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    console.log(`Loaded command: ${file}`);
};

client.login(token);