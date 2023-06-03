const { Events } = require('discord.js');
const toggler = require('../misc.json');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.content.startsWith(".rd lobbies -n") || message.content.startsWith(".rd lobbies -r")) {
            if (toggler[0].toggler == 'on') {
                message.delete(1000);
            }
        }
    }
};