module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log('Ready!');
        console.log(`Logged as ${client.user.tag}.`);
        const promise = client.guilds.fetch();
        promise.then(guilds => {
            guilds.forEach(guild => {
                console.log(`[${guild.name}] [ready] joining the server.]`);
            });
        });
    },
};