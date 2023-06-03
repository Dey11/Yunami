const { SlashCommandBuilder } = require('discord.js');
const User = require('../../models/User');
const Clan = require('../../models/Clan');
const { Pagination } = require('pagination.djs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tracker')
        .setDescription('Shows the weekly donation log'),
    async execute(interaction) {
        try {
            await interaction.deferReply();
            const pagination = new Pagination(interaction, {
                firstEmoji: '⏮', // First button emoji
                prevEmoji: '◀️', // Previous button emoji
                nextEmoji: '▶️', // Next button emoji
                lastEmoji: '⏭', // Last button emoji
                limit: 6, // number of entries per page
                idle: 30000, // idle time in ms before the pagination closes
                loop: false // loop through the pages
            });
            const userId = interaction.user.id;
            const guildId = interaction.guildId;
            const isRegistered = await User.findOne({ id: userId }).exec();
            if (isRegistered === null) {
                await interaction.editReply(`You are not registered in any clan`)
                return;
            }
            const secretKey = isRegistered.code;
            const usersArr = await User.find({ code: secretKey });
            pagination.setTitle(`Weekly tracker of ${isRegistered.clanName}`)
            pagination.setDescription('Shows the weekly donated amount of all the members of the clan.');
            var arr = []
            usersArr.forEach((user) => {
                arr.push({ name: user.name, value: user.amount, inline: 'false' })
            })

            var sortedArr = arr.sort(
                (p1, p2) => (p2.value - p1.value)
            )

            pagination.setFields(sortedArr)
            pagination.paginateFields();
            pagination.setTimestamp();
            pagination.setColor('#fa0567');
            pagination.render();
        }
        catch (err) {
            console.log(err)
            await interaction.editReply(`An error has occured. Please try again later.`)
        }
    },
};