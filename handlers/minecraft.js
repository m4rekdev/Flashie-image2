const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const MojangAPI = require('mojang-api');

module.exports = {
    async get(username) {
        let data = {};
        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`).then(response => response.json()).catch(error => data = { error: true });
        // const response = await request.json();
        console.log(response);

        if (response.error) {
            data = {
                error: true
            };
        } else {
            data = {
                name: response.name,
                imageUrl: `https://minotar.net/helm/${response.name}`
            };
        }

        return data;
    }
}