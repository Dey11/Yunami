const { SlashCommandBuilder } = require('discord.js');
const Clan = require('../models/Clan');
const User = require('../models/User');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-dono-req')
        .setDescription('Sets the weekly donation requirement for a clan')
        .addIntegerOption(option =>
            option
                .setName('requirement')
                .setDescription('Enter the weekly amount')
                .setRequired(true))
        .setDefaultMemberPermissions(0),
    async execute(interaction) {
        try {
            await interaction.deferReply();
            // const clanId = interaction.guildId;
            // const username = interaction.user.username + '#' + interaction.user.discriminator;
            const requirement = interaction.options.getInteger('requirement');
            const userId = interaction.user.id;

            const check = await User.findOne({ id: userId }).exec();

            if (check === null) {
                await interaction.editReply(`You are not registered in a clan.`)
                return;
            }
            if (check.role === 'member') {
                await interaction.editReply(`You do not have permission to use this command.`)
            }
            const code = check.code;
            const res = await User.updateMany({ code: code }, { donoReq: requirement }, { new: true }).exec();
            await interaction.editReply(`The weekly donation requirement for clan **${check.clanName}** has been set to ${requirement} for all members.`)
        }
        catch (err) {
            console.log(err)
            await interaction.editReply(`An error has occured. Please try again later.`)
        }
    },
};
