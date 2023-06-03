const { Events } = require('discord.js');
const { ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const { pass } = require('../config.json');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        const uri = `mongodb+srv://sdey11:${pass}@cluster0.zruc00d.mongodb.net/donobot?retryWrites=true&w=majority`;
        mongoose.set('strictQuery', true)
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log('Connected to MongoDB')
        }).catch((err) => {
            console.log(err)
        })
        client.guilds.cache.forEach((guild) => {
            console.log(guild.name)
        })
        client.user.setActivity(`${client.guilds.cache.size} servers`, { type: ActivityType.Watching });
    },
};