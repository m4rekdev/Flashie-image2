module.exports = {
    async get(member) {
        let data = {
            name: member.username,
            imageUrl: member.displayAvatarURL({ format: 'png' })
        }

        return data;
    }
}