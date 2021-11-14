const { tiktokClient } = require('../events/ready');

module.exports = {
    async get(username) {
        let data = {};
        
        // console.log(tiktokClient);
        // const response = await twitterClient.get('users/lookup', { screen_name: username }).catch(error => data = { error: true });
        // const response = await tiktokClient.getUserByName(username).catch(error => data = { error: true });
        // console.log(response);
        const userInfo = await tiktokClient.getUserData();

        console.log(tiktokClient);
        console.log(userInfo.followingCount, userInfo.followerCount, userInfo.likeCount);

        if (!response.error) {
            data = {
                name: response[0].name,
                imageUrl: response[0].profile_image_url_https.replace('normal.jpg', '400x400.jpg')
            };
        }

        return data;
    }
}