const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require("fs");
const toggler = require('../../misc.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('automod')
        .setDescription('Deletes raid filters to prevent spam')
        .addStringOption(option =>
            option
                .setName('toggle')
                .setDescription('Toggle the feature on/off')
                .setRequired(true)
                .addChoices(
                    { name: 'ON', value: 'on' },
                    { name: 'OFF', value: 'off' }
                ))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {

        try {
            const option = interaction.options.getString('toggle');
            if (option === 'on') {
                toggler[0].toggler = 'on'
                await interaction.reply(`Toggled the command on`)
            } else {
                toggler[0].toggler = 'off'
                await interaction.reply(`Toggled the command off`)
            }

            fs.writeFile("./misc.json", JSON.stringify(toggler), err => {
                //Checking for errors
                if (err) throw err;
            })
        } catch (err) {
            console.log(err)
            await interaction.reply(`An error has occured. Please try again later.`)
        }
    },
};
