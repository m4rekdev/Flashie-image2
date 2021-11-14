const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    async get(username) {
        let data = {};
        


        return data;
    }
}