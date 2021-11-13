const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const MojangAPI = require('mojang-api');

module.exports = {
    async get(username) {
        try {
            const request = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
            const response = await request.json();

            return { name: response.name, imageUrl: `https://minotar.net/helm/${response.name}` };
        } catch (error) {
            console.log(error);
        }
    }
}