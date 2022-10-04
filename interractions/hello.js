module.exports = {
    'name': 'hello',
    // eslint-disable-next-line no-unused-vars
    async execute(msg, arg) {
        msg.reply(`Salut à toi aussi ${msg.author.username}.`);
    },
};