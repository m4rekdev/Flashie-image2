const { instagramApi } = require('../../events/ready');

module.exports = {
    async get(username) {
        let data = {};
        await instagramApi.getUserData(username).then(response => data = {
            name: response.getFullName(),
            imageUrl: response.getHdProfilePicture()
        }).catch(error => data = { error: true });

        return data;
    }
}