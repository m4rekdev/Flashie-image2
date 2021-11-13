const instagramApi = require('user-instagram');
const { ig_username, ig_password } = require('../config.json');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        instagramApi.authenticate(ig_username, ig_password);
        console.log(`${client.user.tag} is now online!`);
    },
};

module.exports.instagramApi = instagramApi;
