const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('guild command testing'),
    async execute(interaction) {
        await interaction.reply(`worked i guess`);
    },
};