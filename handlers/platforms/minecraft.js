const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    async get(username) {
        let data = {};
        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`).then(response => response.json()).catch(error => data = { error: true });

        if (!response.error)
            data = {
                name: response.name,
                imageUrl: `https://minotar.net/helm/${response.name}`
            };
        
        return data;
    }
}