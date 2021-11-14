const { google } = require("googleapis");
const { toolresults } = require("googleapis/build/src/apis/toolresults");
const apiKey = "AIzaSyCN-i6oapY8uI0VAKacHG1VIAvWD6KAND0";
const apiUrl = "https://www.googleapis.n/youtube/v3";
const youtube = google.youtube({
    version: "v3",
    auth: apiKey,
});

module.exports = {
    async get(query) {
        let data = {};

        const response = await youtube.search.list({
            type: "channel",
            part: "snippet",
            q: query,
        })

        console.log(response.data.items);

        if (response.data.items.length == 0)
            data = {
                error: true
            };
        else 
            data = {
                imageUrl: response.data.items[0].snippet.thumbnails.high.url,
                name: response.data.items[0].snippet.title
            };

        return data;
    }
}