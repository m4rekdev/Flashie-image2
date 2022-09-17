const { end, log } = require(`../utils/logger.js`);
const slashsync = require(`../utils/slashsync.js`);
const { AutoPoster } = require(`topgg-autoposter`);

const { instagram_username, instagram_password, twitter_key, twitter_secret, twitter_token } = require('../config');
const instagramApi = require('user-instagram');
const twitterApi = require('twitter');
const twitterClient = new twitterApi({
    consumer_key: twitter_key,
    consumer_secret: twitter_secret,
    bearer_token: twitter_token
});

module.exports = {
    instagramApi,
    twitterClient,

    name: `ready`,
    once: true,

    async run(client) {
        end(`Discord`, `Successfully connected to Discord API! (${client.user.tag}) (${client.user.id})`, `blue`);

        await instagramApi.authenticate(instagram_username, instagram_password);

        client.user.setPresence({
            activities: [{
                name: client.presenceName,
                type: client.presenceType,
            }],
            status: client.presenceStatus,
        });

        const topgg = AutoPoster(client.topggToken, client);
        topgg.on(`posted`, () => log(`Top.GG`, `Posted bot statistics!`, `pink`))
            .on(`error`, (error) => log(`Top.GG`, `Failed to post bot statistics! ${error.message}`, `red`));

        await slashsync(client);
    },
};
