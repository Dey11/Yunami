const { SlashCommandBuilder } = require('discord.js');
const math = require('mathjs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calculate')
        .setDescription('Calculates the value of an expression')
        .addStringOption(option =>
            option
                .setName('expression')
                .setDescription('Enter the expression you want to evaluate')
                .setRequired(true)),

    async execute(interaction) {
        try {
            await interaction.deferReply();
            const exp = interaction.options.getString('expression');
            const node1 = math.parse(exp)

            await interaction.editReply(`${exp} = ${node1.evaluate()}`)
        }
        catch (err) {
            console.log(err)
            await interaction.editReply(`An error has occured. Please try again later.`)
        }
    },
};
