const { twitterClient } = require('../events/ready');

module.exports = {
    async get(username) {
        let data = {};
        
        const response = await twitterClient.get('users/lookup', { screen_name: username });

        if (!response[0].name || !response[0].profile_image_url_https) return { error: true };

        const name = response[0].name;
        const imageUrl = response[0].profile_image_url_https;

        data = {
            name,
            imageUrl
        };

        return data;
    }
}