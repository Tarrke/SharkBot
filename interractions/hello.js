module.exports = {
    'name': 'hello',
    async execute(msg) {
        msg.reply(`Salut à toi aussi ${msg.author.username}.`);
    },
};