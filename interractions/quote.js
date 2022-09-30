const fs = require('fs');

const citations = JSON.parse(fs.readFileSync('./catchphrase.json'));

module.exports = {
    'name': 'quote',
    async execute(msg) {
        const quote = citations[Math.floor(Math.random() * citations.length)];
        msg.reply(quote.phrase);
    },
};