const { google } = require("googleapis");
const apiKey = "AIzaSyCN-i6oapY8uI0VAKacHG1VIAvWD6KAND0";
const apiUrl = "https://www.googleapis.com/youtube/v3";
const youtube = google.youtube({
    version: "v3",
    auth: apiKey,
});

module.exports = {
    async get(query) {
        const response = await youtube.search.list({
            type: "channel",
            part: "snippet",
            q: query,
        });
      
        const channelThumbnailUrl = response.data.items[0].snippet.thumbnails.high.url;
        const channelName = response.data.items[0].snippet.title;

        const data = {
            imageUrl: channelThumbnailUrl,
            name: channelName,
        };

        return data;
    }
}