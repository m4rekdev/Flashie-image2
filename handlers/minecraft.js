const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const MojangAPI = require('mojang-api');

module.exports = {
    async get(username) {
        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        console.log(response.name)
        return { name: response.name, imageUrl: `https://minotar.net/helm/${response.name}` };
    }
}