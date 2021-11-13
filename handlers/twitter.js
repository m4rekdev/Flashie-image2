const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cache = {};

module.exports = {
    async get(username) {
        let data = {};
        const url = "https://mobile.twitter.com/" + username;
        const response = request(url, (_, __, body) => {
            const $ = cheerio.load(body);
            const url = ($(".avatar img").attr("src") || "").replace("_normal", size);
            cache[username] = url;
            console.log(url);
        });
        // console.log(response);

        return data;
    }
}