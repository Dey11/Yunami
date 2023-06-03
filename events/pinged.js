const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.content.startsWith("<@1084026036024528956>")) {
            const pingEmbed = {
                color: 0xfa0567,
                title: 'Yunami',
                description: `Yunami is a donation tracker bot for Anigame. It can track only donations made using slash commands. Donations made using prefix commands will not be logged.`,
                url: 'https://discord.gg/Rd7bb5ruJs',
                fields: [
                    {
                        name: 'How to register in Yunami?',
                        value: `First the clan leader (or any admin of the clan server) has to use /register-clan command with a suitable clan name. They will then receive a unique code in their DMs (make sure you allow DMs from unknowns) which is then to be shared with the clan members. The clan members can register themselves using the code. Yunami will then start tracking all donations made by the registered users.`
                    },

                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'For more info, please join the support server.',
                },
            }
            const channel = message.client.channels.cache.get(message.channelId);
            channel.send({ embeds: [pingEmbed] });

        }
    }
};
