const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Shows the bot ping.'),
    async execute(interaction) {
        await interaction.reply(`🏓 Pong! | ${interaction.client.ws.ping}ms`);
    },
};