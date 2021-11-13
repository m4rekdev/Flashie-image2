const instagramApi = require('user-instagram');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        instagramApi.authenticate(username, password);
        console.log(`${client.user.tag} is now online!`);
    },
};

module.exports.instagramApi = instagramApi;
