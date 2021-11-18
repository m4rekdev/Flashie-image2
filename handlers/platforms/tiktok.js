const tiktok = require('tiktok-scraper');

module.exports = {
    async get(username) {
        let data = {};
        await tiktok.getUserProfileInfo(username, {}).then(response => {
            data = { 
                name: response.user.nickname,
                imageUrl: response.user.avatarLarger
            };
        }).catch(error => data = { error: true });

        return data;
    }
}