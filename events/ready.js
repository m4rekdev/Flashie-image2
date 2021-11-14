const instagramApi = require('user-instagram');
const twitterApi = require('twitter');
const { ig_username, ig_password, twitter_key, twitter_secret, twitter_token } = require('../config.json');
const twitterClient = new twitterApi({
    consumer_key: twitter_key,
    consumer_secret: twitter_secret,
    bearer_token: twitter_token
});

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log("disablnuty login na instagram v ready.js:15")
        // instagramApi.authenticate(ig_username, ig_password);
        console.log(`${client.user.tag} is now online!`);
    },
};

module.exports.instagramApi = instagramApi;
module.exports.twitterClient = twitterClient;
