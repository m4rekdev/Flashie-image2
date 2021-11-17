module.exports = {
    async send(interaction) {
        const error = new MessageEmbed()
            .setColor('#ff3d3d')
            .setAuthor(interaction.member.user.username, interaction.member.user.displayAvatarURL())
            .setTitle('Error')
            .setDescription('**__There was an error, sorry!__**\n*This can be caused by you entering the wrong username or a problem on our side.*')
            .addField('Platform', await titleCase.make(interaction.options.getSubcommand()), true)
            .setFooter(`Ran by ${interaction.member.user.tag}`, interaction.client.user.displayAvatarURL());

         return interaction.editReply({ embeds: [error] });
    }
}