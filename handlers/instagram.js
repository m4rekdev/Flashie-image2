const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    async get(username) {
        let data = {};
        const response = await fetch(`https://www.instagram.com/${username}/?__a=1`).then(response => response.json()).catch(error => data = { error: true });

        if (response.error) {
            data = {
                error: true
            };
        } else {
            data = {
                name: response.graphql.user.full_name,
                imageUrl: response.graphql.user.profile_pic_url_hd
            };
        }

        return data;
    }
}