const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        default: 0,
    },
    clanName: {
        type: String,
        required: true,
    },
    clanId: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true
    },
    reminderPref: {
        type: String,
        default: 'none'
    },
    donoReq: {
        type: Number,
        default: 0,
    }
}, { timestamps: true })

const User = mongoose.model('ClanMember', UsersSchema);

module.exports = User;