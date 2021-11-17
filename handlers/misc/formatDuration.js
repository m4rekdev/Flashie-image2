const prettyMilliseconds = require("pretty-ms");

module.exports = {
    async format(duration) {
        return prettyMilliseconds(duration, { verbose: true, secondsDecimalDigits: 0});
    }
}   