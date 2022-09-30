const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Chargement des modules, configs
dotenv.config();

// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });

// Read the Events and register them
const eventPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}


// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);