const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { instagramApi } = require('../events/ready');

module.exports = {
    async get(username) {
        let data = {};
        const response = await instagramApi.getUserData(username).catch(error => data = { error: true });

        if (!response || response.error)
            data = {
                error: true
            };
        else
            data = {
                name: response.getFullName(),
                imageUrl: response.getHdProfilePicture()
            };

        return data;
    }
}