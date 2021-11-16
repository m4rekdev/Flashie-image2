const { instagram_username, instagram_password, twitter_key, twitter_secret, twitter_token } = require('../config.json');
const instagramApi = require('user-instagram');
const twitterApi = require('twitter');
const twitterClient = new twitterApi({
    consumer_key: twitter_key,
    consumer_secret: twitter_secret,
    bearer_token: twitter_token
});


module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        // await instagramApi.authenticate(instagram_username, instagram_password);
        console.log(`${client.user.tag} is now online!`);
        console.log("disablednuty login na instagram v ready.js:15");
    },
};

module.exports.instagramApi = instagramApi;
module.exports.twitterClient = twitterClient;
