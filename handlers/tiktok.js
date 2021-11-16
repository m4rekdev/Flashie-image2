const tiktok = require('tiktok-scraper');

module.exports = {
    async get(username) {
        let data = {};

        const response = await tiktok.getUserProfileInfo(username, {}).catch(error => data = { error: true });

        if (!response.error)
            data = { 
                name: response.user.nickname,
                imageUrl: response.user.avatarLarger
            };

        return data;
    }
}