module.exports = {
    async format(duration) {
        let totalSeconds = (duration / 1000);
        let years = Math.round(Math.floor(totalSeconds / 31536000));
        let months = Math.round(Math.floor(totalSeconds / 2628000));
        let days = Math.round(Math.floor(totalSeconds / 86400));
        let hours = Math.round(Math.floor(totalSeconds / 3600));
        totalSeconds %= 3600;
        let minutes = Math.round(Math.floor(totalSeconds / 60));
        let seconds = Math.round(totalSeconds % 60);

        if (years)
            return years == 1 ? `${years} year` : `${years} years`;
        else if (months)
            return months == 1 ? `${months} month` : `${months} months`;
        else if (days)
            return days == 1 ? `${days} day` : `${days} days`;
        else if (hours)
            return hours == 1 ? `${hours} hour` : `${hours} hours`;
        else if (minutes)
            return minutes == 1 ? `${minutes} minute` : `${minutes} minutes`;
        else if (seconds)
            return seconds == 1 ? `${seconds} second` : `${seconds} seconds`;
    }
}