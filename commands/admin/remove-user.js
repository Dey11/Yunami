const { SlashCommandBuilder } = require('discord.js');
const Clan = require('../../models/Clan');
const User = require('../../models/User');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove-user')
        .setDescription(`Removes an user from a clan's database`)
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('User to be removed')
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

            const userInDB = await User.findOne({ id: modifyingUser.id }).exec();

            if (userInDB === null || (userInDB.code !== memberRole.code)) {
                await interaction.editReply(`The mentioned user isn't a member of your guild.`)
                return;
            }

            const updatedDB = await User.findOneAndDelete({ id: modifyingUser.id })
            await interaction.editReply(`<@${modifyingUser.id}> has now been removed from the guild`)
        } catch (err) {
            console.log(err)
            await interaction.editReply(`An error has occured. Please try again later.`)
        }
    },
};
