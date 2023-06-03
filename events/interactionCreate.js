const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
        const devCommand = interaction.client.devCommands.get(interaction.commandName);

        if (!command && !devCommand) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            if (command) {
                await command.execute(interaction);
            } else {
                await devCommand.execute(interaction);
            }
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
        }
    },
};