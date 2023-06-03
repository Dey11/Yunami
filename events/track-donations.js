const { Events } = require('discord.js');
const User = require('../models/User');

module.exports = {
    name: Events.MessageCreate,
    async execute(interaction) {
        if (interaction.type == '20' && interaction.author.id == '571027211407196161' && interaction.interaction.commandName == 'cl donate' && !interaction.content) {
            try {
                const userId = interaction.interaction.user.id;
                const isUserRegistered = await User.findOne({ id: userId });
                if (isUserRegistered === null) {
                    return;
                }

                const msg = interaction.embeds[0].data.description
                const re = /Summoner \*\*(.*)?\*\*, you have donated \*\*(.*)?\*\* Gold <:GOLD:704242802522980462> to your clan, and received \*\*(.*)?\*\* Clan Rubies <:CLAN_RUBIES:713100255536742450> in return!/gm;
                const result = re.exec(msg)
                let playerName = result[1]
                let goldAmount = result[2];
                goldAmount = parseInt(goldAmount.replace(/,/g, ''))

                const prevAmount = isUserRegistered.amount;
                const newAmount = goldAmount + prevAmount;

                const logDonation = await User.findOneAndUpdate({ id: userId }, { amount: newAmount }, { new: true })
                await interaction.reply(`Logged: Player ${playerName} donated ${goldAmount} gold`);
            }
            catch (err) {
                await interaction.reply(`An error has occured. Donation could not be logged.`)
            }
        }
        else {
            return;
        }
    }
}