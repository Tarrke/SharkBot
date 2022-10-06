const axios = require('axios');
const qs = require('qs');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const BASE_URL = 'https://api.swgoh.help';

async function call_api(endpoint, token) {
    console.log('api_call');

    try {
        const response = await axios.post(BASE_URL + endpoint,
            {
                allycodes: [413347731],
            },
            { headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + token,
            } },
        );

        if (response && response.status) {
            // console.log(response.status);
            // console.log(response.data);
            return response.data;
        } else {
            console.log('error retriving data');
            console.log(response.status);
        }
    } catch (error) {
        console.log(error);
    }
}

async function login() {
    console.log('login function');

    try {
        if (!fs.existsSync('./token.secret')) {
            // Si le fichier n'existe pas on le crée avec des valeurs bidon
            fs.writeFileSync('./token.secret', `noToken:${Date.now()}`);
        }

        const fileData = fs.readFileSync('./token.secret', { flag:'r' }).toString();
        const token = fileData.split(':')[0];
        const endOfLife = new Date(parseInt(fileData.split(':')[1]));

        if (endOfLife.getTime() > Date.now()) {
            // Token toujours valide
            return token;
        } else {
            // On doit renouveller le token
            try {
                const response = await axios.post(BASE_URL + '/auth/signin', qs.stringify({
                    'username': process.env.SWGOHAPI_USER,
                    'password': process.env.SWGOHAPI_PASS,
                    'grant_type': 'password',
                    'client_id': process.env.SWGOHAPI_CLIENTID,
                    'client_secret': process.env.SWGOHAPI_CLIENTSECRET,
                }));

                if (response && response.status) {
                    fs.writeFileSync('./token.secret', `${response.data.access_token}:${Date.now() + parseInt(response.data.expires_in) * 1000}`);
                    return response.data.access_token;
                } else {
                    console.log('error retriving the token');
                    console.log(response.status);
                }

            } catch (error) {
                console.log('Error while retriving token from API');
                console.log(error);
            }
        }

    } catch (error) {
        console.log('Error while getting credentials');
        console.log(error);
    }

    return null;
}

async function main() {
    const token = await login();
    if (!token) {
        console.log('No token, quit');
        return null;
    }
    console.log('My Token : ' + token);

    const players = await call_api('/swgoh/players', token);
    const me = players[0];
    console.log(`${me.name} [${me.level}]`);

    // const data = await call_api('');
}

main();