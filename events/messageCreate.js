const { Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const prefix = '!';

// Read the interractions and register them
const interractions = new Collection();
const interractionPath = path.join(__dirname, '..', 'interractions');
const interractionFiles = fs.readdirSync(interractionPath).filter(file => file.endsWith('.js'));

for (const file of interractionFiles) {
    const filePath = path.join(interractionPath, file);
    const interraction = require(filePath);

    interractions.set(interraction.name, interraction);
    console.log(`[interraction] ${interraction.name} loaded.`);
}

module.exports = {
    'name': 'messageCreate',
    'once': false,
    async execute(msg) {
        if (msg.content.startsWith(prefix)) {
            const cmd = msg.content.substring(1);
            const interraction = interractions.get(cmd);
            if (!interraction) return;
            try {
                interraction.execute(msg);
            } catch (error) {
                console.log(error);
                await msg.reply('Une erreur est survenue !');
            }
        }
    },
};