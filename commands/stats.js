const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const formatDuration = require('../handlers/misc/formatDuration');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Shows the bot\'s stats.'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor('#d37d63')
            .setTitle('Stats')
            .setDescription(`🏓 **Ping**
            > Latency: ${Date.now() - interaction.createdTimestamp}ms
            > API Latency: ${Math.round(interaction.client.ws.ping)}ms
            
            🕛 __Uptime__ 🕛
            > ${await formatDuration.format(interaction.client.uptime)}`)
            .setFooter(`Ran by ${interaction.member.user.tag}`, interaction.member.user.displayAvatarURL());
        await interaction.reply({embeds: [embed]});
    },
};