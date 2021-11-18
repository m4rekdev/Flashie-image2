module.exports = {
    async get(member) {
        let data = {
            name: member.username,
            imageUrl: member.displayAvatarURL({ format: 'png', size: 512 })
        }

        return data;
    }
}