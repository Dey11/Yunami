const { SlashCommandBuilder } = require('discord.js');
const User = require('../../models/User');
const Clan = require('../../models/Clan');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reduce-weekly')
        .setDescription('Reduces the donated amount of all users according to the weekly rate')
        .addIntegerOption(option =>
            option
                .setName('amount')
                .setDescription('Amount to be deducted')
                .setRequired(true)),
    async execute(interaction) {
        try {
            await interaction.deferReply();
            const userId = interaction.user.id;
            const isAdmin = interaction.member.permissions.has("Administrator")
            const memberRole = await User.findOne({ id: userId }).exec()
            if ((!isAdmin && memberRole.role === 'member') || memberRole === null) {
                await interaction.editReply(`You do not have the permission to use this command.`)
                return;
            }
            const amountToBeDeducted = interaction.options.getInteger('amount')
            const guildId = interaction.guildId;
            const clan = memberRole.code;
            const clanName = memberRole.clanName;
            const usersInClan = await User.find({ code: clan }).exec();
            usersInClan.forEach(async (user) => {
                const newAmount = user.amount - amountToBeDeducted;
                const userId = user.id;
                const updatedUser = await User.findOneAndUpdate({ id: userId }, { amount: newAmount }, { new: true })
            })

            await interaction.editReply(`Donations of all the members of **${clanName}** have been reduced by **${amountToBeDeducted}**.`)
        }
        catch (err) {
            console.log(err)
            await interaction.editReply(`An error has occured. Please try again later.`)
        }
    },
};