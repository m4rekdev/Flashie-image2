const { instagram_username, instagram_password, twitter_key, twitter_secret, twitter_token, tiktok_username, tiktok_password } = require('../config.json');
const instagramApi = require('user-instagram');
const twitterApi = require('twitter');
const tiktokApi = require('tiktok-app-api');

const twitterClient = new twitterApi({
    consumer_key: twitter_key,
    consumer_secret: twitter_secret,
    bearer_token: twitter_token
});
const tiktokClient = new tiktokApi();


module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} is now online!`);

        console.log("disablnuty login na instagram v ready.js:15")
        // await instagramApi.authenticate(instagram_username, instagram_password);
    },
};

module.exports.instagramApi = instagramApi;
module.exports.twitterClient = twitterClient;
module.exports.tiktokClient = tiktokClient;
