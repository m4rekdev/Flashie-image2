const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed, DiscordAPIError } = require('discord.js');
const Canvas = require('canvas');

const youtube = require('../handlers/youtube');
const minecraft = require('../handlers/minecraft');
const instagram = require('../handlers/instagram');
const twitter = require('../handlers/twitter');
const tiktok = require('../handlers/tiktok');
const discord = require('../handlers/discord');

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

function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cozy')
        .setDescription('idk')
        .addSubcommand(subcommand =>
            subcommand
                .setName('youtube')
                .setDescription('idkk')
                .addStringOption(option => 
                    option
                        .setName('search')
                        .setDescription('The value to search for.')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('instagram')
                .setDescription('idkk')
                .addStringOption(option => 
                    option
                        .setName('search')
                        .setDescription('The value to search for.')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('minecraft')
                .setDescription('idkk')
                .addStringOption(option => 
                    option
                        .setName('search')
                        .setDescription('The value to search for.')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('twitter')
                .setDescription('idkk')
                .addStringOption(option => 
                    option
                        .setName('search')
                        .setDescription('The value to search for.')
                        .setRequired(true)
                )
        ).addSubcommand(subcommand =>
            subcommand
                .setName('tiktok')
                .setDescription('idkk')
                .addStringOption(option => 
                    option
                        .setName('search')
                        .setDescription('The value to search for.')
                        .setRequired(true)
                )
        ).addSubcommand(subcommand =>
            subcommand
                .setName('discord')
                .setDescription('idkk')
                .addUserOption(option => 
                    option
                        .setName('member')
                        .setDescription('The value to search for.')
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        await interaction.deferReply();
        const cozyOverlay = "./assets/overlays/cozy.png";

        switch (interaction.options.getSubcommand()) {
            case "youtube":
                data = await youtube.get(interaction.options.getString('search'));
                break;

            case "minecraft":
                data = await minecraft.get(interaction.options.getString('search'));
                break;
                
            case "instagram":
                data = await instagram.get(interaction.options.getString('search'));
                break;

            case "twitter":
                data = await twitter.get(interaction.options.getString('search'));
                break;

            case "tiktok":
                data = await tiktok.get(interaction.options.getString('search'));
                break;

            case "discord":
                data = await discord.get(interaction.options.getUser('member'));
                break;
        }

        const error = new MessageEmbed()
            .setColor('#ff3d3d')
            .setAuthor(interaction.member.user.username, interaction.member.user.displayAvatarURL())
            .setTitle('Error')
            .setDescription('**__There was an error, sorry!__**\n*This can be caused by you entering the wrong username or a problem on our side.*')
            .addField('Platform', titleCase(interaction.options.getSubcommand()), true)
            .setFooter(`Ran by ${interaction.member.user.tag}`, interaction.client.user.displayAvatarURL());

        if (data.error) return interaction.editReply({ embeds: [error] });

        const canvas = Canvas.createCanvas(738, 635);
        const context = canvas.getContext('2d');
        const overlay = await Canvas.loadImage(cozyOverlay);
        const avatar = await Canvas.loadImage(data.imageUrl);
        context.save();
        roundImage(context, 309, 72, 252, 315, 150);
        context.clip();
        context.drawImage(avatar, 309, 72, 252, 315);
        context.restore();
        context.drawImage(overlay, 0, 0, canvas.width, canvas.height);

        const attachment = new MessageAttachment(canvas.toBuffer(), 'cozy.png');
        const embed = new MessageEmbed()
            .setColor('#d37d63')
            .setAuthor(interaction.member.user.username, interaction.member.user.displayAvatarURL())
            .setTitle('Cozy')
            .setDescription('See your generated image! 🥰')
            .addField('Platform', titleCase(interaction.options.getSubcommand()), true)
            .addField('Account Name', data.name, true)
            .setImage('attachment://cozy.png')
            .setFooter(`Ran by ${interaction.member.user.tag}`, interaction.client.user.displayAvatarURL());

        interaction.editReply({ embeds: [embed], files: [attachment] });
    },
};