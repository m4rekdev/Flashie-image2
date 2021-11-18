const { twitterClient } = require('../../events/ready');

module.exports = {
    async get(username) {
        let data = {};
        await twitterClient.get('users/lookup', { screen_name: username }).then(response => data = {
            name: response[0].name,
            imageUrl: response[0].profile_image_url_https.replace('normal.jpg', '400x400.jpg')
        }).catch(error => data = { error: true });

        return data;
    }
}