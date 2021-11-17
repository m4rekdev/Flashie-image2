const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const formatDuration = require('../handlers/misc/formatDuration');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Shows the bot\'s ping.'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor('#d37d63')
            .setTitle('Status')
            .setDescription(`**🏓 __Ping__**\n> Latency: ${Math.abs(Date.now() - interaction.createdTimestamp)}ms\n> API Latency: ${Math.round(interaction.client.ws.ping)}ms\n\n**🕛 __Uptime__**\n> ${await formatDuration.format(interaction.client.uptime)}`)
            .setFooter(`Ran by ${interaction.member.user.tag}`, interaction.member.user.displayAvatarURL());
        await interaction.reply({embeds: [embed]});
    },
};