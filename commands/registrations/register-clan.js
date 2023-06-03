const { SlashCommandBuilder } = require('discord.js');
const Clan = require('../../models/Clan');
const keygen = require("keygenerator");
const User = require('../../models/User');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register-clan')
        .setDescription('Registers the clan in the bots database [Admin]')
        .addStringOption(option =>
            option
                .setName('clan-name')
                .setDescription('Enter the name of the clan')
                .setRequired(true))
        .setDefaultMemberPermissions(0),
    async execute(interaction) {
        try {
            await interaction.deferReply();
            const clanId = interaction.guildId;
            const clanName = interaction.options.getString('clan-name');
            const userId = interaction.user.id;
            const username = interaction.user.username + '#' + interaction.user.discriminator;

            const res = await Clan.findOne({ clanId: clanId }).exec();
            const check = await User.findOne({ id: userId }).exec();

            if (check) {
                await interaction.editReply(`You are already registered in ${check.clanName}.`)
                return;
            }

            if (res) {
                await interaction.editReply(`This server already has a clan: **${res.clanName}**`)
                return;
            }

            const key = keygen._({
                chars: true,
                numbers: true,
                length: 6
            })

            const clan = new Clan({
                clanName,
                clanId,
                code: key
            })
            const leader = new User({
                name: username,
                id: userId,
                amount: 0,
                clanName,
                clanId,
                role: 'admin',
                code: key
            })

            clan.save().then(async () => {
                console.log(`${clanName} clan has been registered.`)
                await interaction.editReply(`**${clanName}** clan has been registered. The code has been DMed.`)
                await interaction.user.send(`||${key}|| is the code. Please share it only with your clan members.`)
            }).catch(async (err) => {
                console.log(err)
                await interaction.editReply(`An error has occured, please try again later`)
            })

            leader.save().then(async () => {
                console.log(`${username} has been registered in ${clanName}.`)
            }).catch(async (err) => {
                console.log(err)
                await interaction.editReply(`An error has occured, please try again later.`)
            })
        }
        catch (err) {
            console.log(err)
            await interaction.editReply(`An error has occured. Please try again later.`)
        }
    },
};
