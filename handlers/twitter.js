const { twitterClient } = require('../events/ready');

module.exports = {
    async get(username) {
        let data = {};
        
        const response = await twitterClient.get('users/lookup', { screen_name: username }).catch(error => data = { error: true });

        if (!response.error) {
            data = {
                name: response[0].name,
                imageUrl: response[0].profile_image_url_https.replace('normal.jpg', '400x400.jpg')
            };
        }

        return data;
    }
}