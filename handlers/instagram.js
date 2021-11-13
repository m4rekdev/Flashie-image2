const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { instagramApi } = require('../events/ready');

module.exports = {
    async get(username) {
        let data = {};
        const response = await instagram.getUserData(username);
        // const response = await fetch(`https://instagram.com/${username}/?__a=1`).then(response => response.json()).catch(error => data = { error: true });
        // const response = await fetch(`https://instagram.com/${username}/?__a=1`);
        // console.log(response)

        // if (response.error) {
        //     data = {
        //         error: true
        //     };
        // } else {
        //     data = {
        //         name: response.graphql.user.full_name,
        //         imageUrl: response.graphql.user.profile_pic_url_hd
        //     };
        // }

        // return data;
    }
}