const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        trim:true
    },
    phone:{
        type:String,
        type:String,
        required: true,
        trim:true
    },
    occupation:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    }
},{timestamps:true})

const Users = mongoose.model('Users', userSchema)

module.exports = Users