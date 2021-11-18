const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const Canvas = require('canvas');

const data = require('../data/ship.json');
const drawText = require('../handlers/misc/drawText');
const { embedFooterDescription } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ship')
        .setDescription('Get cozy avatar from popular social platforms.')
        .addUserOption(option => 
            option
                .setName('member')
                .setDescription('The server member.')
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply();
        
        const member = interaction.member;
        const userToShip = interaction.options.getUser('member');

        if (member.user.id == userToShip.id) {
            const error = new MessageEmbed()
                .setColor('#b5dd92')
                .setAuthor(member.user.username, member.user.displayAvatarURL())
                .setTitle('Ship')
                .setDescription(`You can't ship yourself, silly.`)
                .setFooter(embedFooterDescription, interaction.client.user.displayAvatarURL());

            return interaction.editReply({ embeds: [error] });
        }

        if (!data?.[member.user.id]) data[member.user.id] = {};
        if (!data?.[userToShip.id]) data[userToShip.id] = {};

        let similiarity = data?.[member.user.id][userToShip.id];

        if (!similiarity) {
            similiarity = Math.floor(Math.random() * 100) + 1;

            data[member.user.id][userToShip.id] = similiarity;
            data[userToShip.id][member.user.id] = similiarity;
        }

        context.registerFont('../../assets/fonts/noto_sans.ttf', { family: 'Noto Sans' });
        const canvas = Canvas.createCanvas(1920, 1080);
        const context = canvas.getContext('2d');
        const overlay = await Canvas.loadImage("./assets/images/fun/ship.png");

        const memberAvatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: "png", size: 512 }));
        const shipAvatar = await Canvas.loadImage(userToShip.displayAvatarURL({ format: "png", size: 512 }));

        context.drawImage(overlay, 0, 0, canvas.width, canvas.height);


        context.drawImage(memberAvatar, 129, 284, 512, 512);
        context.drawImage(shipAvatar, 1279, 284, 512, 512);
        drawText.write(context, { text: member.user.username, x: 960, y: 506 }, { fontSize: 63, fontFamily: "Noto Sans", textAlign: "center" });
        drawText.write(context, { text: userToShip.username, x: 960, y: 506 }, { fontSize: 63, fontFamily: "Noto Sans", textAlign: "center" });

        drawText.write(context, { text: similiarity+"%", x: 960, y: 506 }, { fontSize: 63, fontFamily: "Noto Sans", textAlign: "center" });

        let embedDescription = "haha uwu";
        const attachment = new MessageAttachment(canvas.toBuffer(), 'result.png');
        const embed = new MessageEmbed()
            .setColor('#d37d63')
            .setAuthor(member.user.username, member.user.displayAvatarURL())
            .setTitle('Ship')
            .setDescription(embedDescription)
            .setImage('attachment://result.png')
            .setFooter(`Ran by ${member.user.tag}`, member.user.displayAvatarURL());

        interaction.editReply({ embeds: [embed], files: [attachment] });
    },
};