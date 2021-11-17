const { instagramApi } = require('../../events/ready');

module.exports = {
    async get(username) {
        let data = {};
        const response = await instagramApi.getUserData(username).catch(error => data = { error: true });

        if (!response.error)
            data = {
                name: response.getFullName(),
                imageUrl: response.getHdProfilePicture()
            };
            

        return data;
    }
}