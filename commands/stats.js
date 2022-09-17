const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

const formatDuration = require('../handlers/misc/formatDuration');
const { embedFooterDescription } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Shows the bot\'s stats.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#d37d63')
            .setAuthor({ name: interaction.member.user.tag, iconURL: interaction.member.user.displayAvatarURL() })
            .setTitle('Stats')
            .setDescription(`🏓 **Ping**
            > Latency: ${Date.now() - interaction.createdTimestamp}ms
            > API Latency: ${Math.round(interaction.client.ws.ping)}ms
            
            🕛 __Uptime__ 🕛
            > ${await formatDuration.format(interaction.client.uptime)}`)
            .setFooter({ text: embedFooterDescription });
        await interaction.reply({embeds: [embed]});
    },
};