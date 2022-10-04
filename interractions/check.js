const axios = require('axios');

module.exports = {
    'name': 'check',
    async execute(msg, arg) {
        msg.reply(`Vérification d'un fait sur ${arg}`);
        try {
            axios.get('https://swapi.dev/api/people/')
                .then(response => {
                    // const data = JSON.parse(response.data);
                    console.log(response.data);
                });
        } catch (error) {
            console.log(error);
        }
    },
};