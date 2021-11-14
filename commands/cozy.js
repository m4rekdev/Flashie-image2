const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const youtube = require('../handlers/youtube');
const minecraft = require('../handlers/minecraft');
const instagram = require('../handlers/instagram');
const twitter = require('../handlers/twitter');
const Canvas = require('canvas');

function roundImage(context, x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cozy')
        .setDescription('idk')
        .addStringOption(option =>
            option
                .setName('platform')
                .setDescription('The platform to get avatar from.')
                .setRequired(true)
                .addChoices([['youtube', 'youtube'], ['minecraft', 'minecraft'], ['instagram', 'instagram'], ['twitter', 'twitter']])
        )
        .addStringOption(option =>
            option
                .setName('search')
                .setDescription('The value to search for.')
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply();
        const query = interaction.options.getString('search');
        const cozyOverlay = "./assets/overlays/cozy.png";
        let data = {};

        switch (interaction.options.getString('platform')) {
            case "youtube":
                data = await youtube.get(query);
                break;

            case "minecraft":
                data = await minecraft.get(query);
                break;
                
            case "instagram":
                data = await instagram.get(query);
                break;

            case "twitter":
                data = await twitter.get(query);
                break;
        }

        if (data.error) {
            return interaction.editReply({ content: `User not found` });
        }

        const canvas = Canvas.createCanvas(738, 635);
        const context = canvas.getContext('2d');
        const overlay = await Canvas.loadImage(cozyOverlay);
        const avatar = await Canvas.loadImage(data.imageUrl);
        context.save();
        roundImage(context, 290, 75, 280, 315, 150);
        context.clip();
        context.drawImage(avatar, 290, 75, 280, 315);
        context.restore();
        context.drawImage(overlay, 0, 0, canvas.width, canvas.height);
        const attachment = new MessageAttachment(canvas.toBuffer(), 'image.png');
        interaction.editReply({ content: `${data.name} je L`, files: [attachment] });
    },
};