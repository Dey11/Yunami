const { SlashCommandBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-gold')
        .setDescription('Adds gold to an user')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('User whose gold has to be modified')
                .setRequired(true))
        .addIntegerOption(option =>
            option
                .setName('amount')
                .setDescription('Amount to be added to the user')
                .setRequired(true)),
    async execute(interaction) {
        try {
            await interaction.deferReply();
            const userId = interaction.user.id;
            let isAdmin = interaction.member.permissions.has("Administrator")
            const memberRole = await User.findOne({ id: userId }).exec()
            if (isAdmin && memberRole.clanId !== interaction.guildId) {
                isAdmin = false;
            }
            if ((!isAdmin && memberRole.role === 'member') || memberRole === null) {
                await interaction.editReply(`You do not have the permission to use this command.`)
                return;
            }
            const amountToBeAdded = interaction.options.getInteger('amount')
            const guildId = interaction.guildId;
            const modifyingUser = interaction.options.getUser('user');

            const userInDB = await User.findOne({ id: modifyingUser.id }).exec();

            if (userInDB === null || (userInDB.code !== memberRole.code)) {
                await interaction.editReply(`The mentioned user isn't a member of your guild.`)
                return;
            }

            const prevAmount = userInDB.amount;
            const newAmount = prevAmount + amountToBeAdded;
            const updatedDB = await User.findOneAndUpdate({ id: modifyingUser.id }, { amount: newAmount }, { new: true })
            await interaction.editReply(`<@${modifyingUser.id}> 's new donation amount is ${updatedDB.amount}`)
        }
        catch (err) {
            console.log(err)
            await interaction.editReply(`An error has occured. Please try again later.`)
        }
    },
};