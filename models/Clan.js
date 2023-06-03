const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    clanName: {
        type: String,
        required: true,
    },
    clanId: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true })

const Clan = mongoose.model('CLAN', UsersSchema);

module.exports = Clan;