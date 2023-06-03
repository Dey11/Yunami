const { SlashCommandBuilder } = require('discord.js');
const User = require('../../models/User');
const Clan = require('../../models/Clan');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register-user')
        .setDescription('Registers user in a clan')
        .addStringOption(option =>
            option
                .setName('clan-key')
                .setDescription('Enter the unique key of the clan')
                .setRequired(true)),
    async execute(interaction) {
        try {
            await interaction.deferReply();
            const guildId = interaction.guildId;
            const clanKey = interaction.options.getString('clan-key');
            const userId = interaction.user.id;
            const username = interaction.user.username + '#' + interaction.user.discriminator;

            // NAME, ID, AMOUNT, CLANNAME, CLANID, ROLE

            const res = await Clan.findOne({ code: clanKey }).exec();
            const res1 = await User.findOne({ id: userId }).exec();

            if (res === null) {
                await interaction.editReply(`Invalid key or the clan has not yet been registered.`)
                return;
            }
            if (res1) {
                await interaction.editReply(`You are already registered as a member of **${res1.clanName}**`)
                return;
            }

            const newUser = new User({
                name: username,
                id: userId,
                amount: 0,
                clanName: res.clanName,
                clanId: res.clanId,
                role: 'member',
                code: clanKey
            })

            newUser.save().then(async () => {
                console.log(`${username} has been registered in ${res.clanName}.`)
                await interaction.editReply(`${username} has been registered in ${res.clanName}.`)
            }).catch(async (err) => {
                console.log(err)
                await interaction.editReply(`An error has occured, please try again later.`)
            })
        } catch (err) {
            console.log(err)
            await interaction.editReply(`An error has occured. Please try again later.`)
        }
    },
};
