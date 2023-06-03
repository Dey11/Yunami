const { SlashCommandBuilder } = require('discord.js');
const User = require('../../models/User');
const Clan = require('../../models/Clan');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-admin')
        .setDescription('Updates the user role to admin (can use admin commands)')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('User whose role is to be updated')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('role')
                .setDescription('Set the role of the mentioned user')
                .addChoices(
                    { name: "Admin", value: "admin" },
                    { name: "Member", value: "member" })
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
            const guildId = interaction.guildId;
            const modifyingUser = interaction.options.getUser('user');
            const roleInfo = interaction.options.getString('role');

            const userInDB = await User.findOne({ id: modifyingUser.id }).exec();

            if (userInDB === null || (userInDB.code !== memberRole.code)) {
                await interaction.editReply(`The mentioned user isn't a member of your guild.`)
                return;
            }

            const updatedUserInDB = await User.findOneAndUpdate({ id: modifyingUser.id }, { role: roleInfo }, { new: true })
            if (roleInfo === 'member') {
                await interaction.editReply(`<@${modifyingUser.id}> is now a Member.`)
            } else {
                await interaction.editReply(`<@${modifyingUser.id}> is now an Admin.`)
            }
        }
        catch (err) {
            console.log(err)
            await interaction.editReply(`An error has occured. Please try again later.`)
        }
    },
};