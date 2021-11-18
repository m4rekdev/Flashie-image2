const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const Canvas = require('canvas');

const youtube = require('../handlers/platforms/youtube');
const minecraft = require('../handlers/platforms/minecraft');
const instagram = require('../handlers/platforms/instagram');
const twitter = require('../handlers/platforms/twitter');
const tiktok = require('../handlers/platforms/tiktok');
const discord = require('../handlers/platforms/discord');
const titleCase = require('../handlers/misc/titleCase');
const roundImage = require('../handlers/misc/roundImage');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cozy')
        .setDescription('Get cozy avatar from popular social platforms.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('youtube')
                .setDescription('Get cozy avatar from Youtube.')
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
                .setDescription('Get cozy avatar from Instagram.')
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
                .setDescription('Get cozy avatar from Minecraft.')
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
                .setDescription('Get cozy avatar from Twitter.')
                .addStringOption(option => 
                    option
                        .setName('search')
                        .setDescription('The value to search for.')
                        .setRequired(true)
                )
        ).addSubcommand(subcommand =>
            subcommand
                .setName('tiktok')
                .setDescription('Get cozy avatar from Tiktok.')
                .addStringOption(option => 
                    option
                        .setName('search')
                        .setDescription('The value to search for.')
                        .setRequired(true)
                )
        ).addSubcommand(subcommand =>
            subcommand
                .setName('discord')
                .setDescription('Get cozy avatar from Discord (current server only).')
                .addUserOption(option => 
                    option
                        .setName('member')
                        .setDescription('The server member.')
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        await interaction.deferReply();
        const cozyOverlay = "./assets/images/overlays/cozy.png";
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

        if (data.error) {
            const error = new MessageEmbed()
                .setColor('#b5dd92')
                .setAuthor(interaction.member.user.username, interaction.member.user.displayAvatarURL())
                .setTitle('Cozy')
                .setDescription(`**Sorry, an error occured!**
                This can be caused by you entering the wrong username or a problem on our side.`)
                .setFooter(`Ran by ${interaction.member.user.tag}`, interaction.member.user.displayAvatarURL());

            return interaction.editReply({ embeds: [error] });
        }

        const canvas = Canvas.createCanvas(738, 635);
        const context = canvas.getContext('2d');
        const overlay = await Canvas.loadImage(cozyOverlay);
        const avatar = await Canvas.loadImage(data.imageUrl);
        context.save();
        roundImage.round(context, 309, 72, 252, 315, 150);
        context.clip();
        context.drawImage(avatar, 309, 72, 252, 315);
        context.restore();
        context.drawImage(overlay, 0, 0, canvas.width, canvas.height);

        const attachment = new MessageAttachment(canvas.toBuffer(), 'result.png');
        const embed = new MessageEmbed()
            .setColor('#d37d63')
            .setAuthor(interaction.member.user.username, interaction.member.user.displayAvatarURL())
            .setTitle('Cozy')
            .setDescription('See your generated image! 🥰')
            .addField('Platform', await titleCase.make(interaction.options.getSubcommand()), true)
            .addField('Target', data.name, true)
            .setImage('attachment://result.png')
            .setFooter(`Ran by ${interaction.member.user.tag}`, interaction.member.user.displayAvatarURL());

        interaction.editReply({ embeds: [embed], files: [attachment] });
    },
};