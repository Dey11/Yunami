const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Provides a list of commands with their functions'),
    async execute(interaction) {
        const helperEmbed = {
            color: 0xfa0567,
            title: 'Help',
            description: 'Commands and their uses',
            url: 'https://discord.gg/Rd7bb5ruJs',
            thumbnail: {
                url: 'https://i.pinimg.com/564x/ac/e5/f9/ace5f9b063373f57581ff72273935a50.jpg'
            },
            fields: [
                {
                    name: 'tracker',
                    value: 'Shows the amount donated by the members of a clan in a week'
                },
                {
                    name: 'ping',
                    value: 'Returns the roundtrip latency'
                },
                {
                    name: 'register-clan',
                    value: 'Registers a clan. Only one clan can be registered per guild.'
                },
                {
                    name: 'register-user',
                    value: 'Registers oneself in the guild as a clan member - requires clan key'
                },
                {
                    name: 'remove-user',
                    value: 'Removes the user from the guild list'
                },
                {
                    name: 'reduce-weekly',
                    value: 'Reduces the donation of all the members by the specified amount'
                },
                {
                    name: 'add-gold',
                    value: 'Increases the donated value of a particular member by the specified amount'
                },
                {
                    name: 'calculate',
                    value: 'Calculates the value of an expression'
                },
                {
                    name: 'automod',
                    value: 'Clears the raid filters preventing spam'
                },
                {
                    name: 'set-admin',
                    value: 'Sets an admin for a clan (can use admin commands)'
                },
                {
                    name: '',
                    value: '',
                    inline: true
                },
                {
                    name: 'NOTE:',
                    value: 'The bot only tracks donations which are made using slash commands. Please use slash commands while donating.'
                }
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: 'Made by Dey, Kazu & Pani',
            },
        }
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Support Server')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.gg/TPMC2YpSyf'),

                new ButtonBuilder()
                    .setLabel('Bot Invite')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=1084026036024528956&permissions=10738035712&scope=bot%20applications.commands')
            )
        await interaction.reply({ embeds: [helperEmbed], components: [row] });
    },
};