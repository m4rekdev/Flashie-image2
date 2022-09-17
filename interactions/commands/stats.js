const { AutocompleteInteraction, CommandInteraction, Message, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require(`discord.js`);
const { STATS } = require(`../../assets/messages.js`);
const formatDuration = require('../handlers/misc/formatDuration');

module.exports = {
    type: `command`,
    name: `stats`,
    description: `Shows the bot's stats.`,
    options: [],

    /**
     * @param {AutocompleteInteraction} interaction 
     */
    async autocomplete(interaction) {
        const choices = [];
        return choices;
    },

    /**
     * @param {CommandInteraction} interaction 
     */
    async runInteraction(interaction) {
        const response = await this.run();
        return interaction.reply(response);
    },
    
    /**
     * @param {Message} message 
     */
    async runMessage(message) {
        const response = await this.run();
        return message.reply(response);
    },

	async run() {
        const embed = new EmbedBuilder()
            .setColor('#d37d63')
            .setAuthor({ name: interaction.member.user.tag, iconURL: interaction.member.user.displayAvatarURL() })
            .setTitle('Stats')
            .setDescription(
                STATS
                    .replaceAll(`{0}`, Date.now() - interaction.createdTimestamp + `ms`)
                    .replaceAll(`{1}`, Math.round(interaction.client.ws.ping) + `ms`)
                    .replaceAll(`{2}`, await formatDuration.format(interaction.client.uptime))
                )
            .setFooter({ text: embedFooterDescription });

		return { embeds: [embed] };
	}
};