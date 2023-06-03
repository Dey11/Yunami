const mongoose = require('mongoose');
const { pass } = require('./config.json');
const Clan = require('./models/Clan');
const User = require('./models/User');

const mongoDBUpdateSchema = async () => {
    const uri = `mongodb+srv://sdey11:${pass}@cluster0.zruc00d.mongodb.net/donobot?retryWrites=true&w=majority`;
    mongoose.set('strictQuery', true)
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(async () => {
        console.log('Connected to MongoDB')
        const updateSchema = await User.updateMany({}, { $set: { donoReq: 0 } });
        console.log(updateSchema)
    }).catch((err) => {
        console.log(err)
    })
}

mongoDBUpdateSchema()
