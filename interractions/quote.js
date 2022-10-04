const fs = require('fs');

const citations = JSON.parse(fs.readFileSync('./catchphrase.json'));

module.exports = {
    'name': 'quote',
    // eslint-disable-next-line no-unused-vars
    async execute(msg, arg) {
        const quote = citations[Math.floor(Math.random() * citations.length)];
        msg.reply(quote.phrase);
    },
};