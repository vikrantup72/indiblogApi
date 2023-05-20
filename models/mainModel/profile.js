const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    user_id:{
        type: String
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type:Number
    },
    bio: {
        type: String,
    },
    picture:{
        type: String
    }
}, { timestamps: true })

const Profile = mongoose.model('Profile', ProfileSchema)

module.exports = Profile