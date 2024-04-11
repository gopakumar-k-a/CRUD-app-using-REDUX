const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter name']
    },
    email: {
        type: String,
        required: [true, 'please enter email']
    },
    password: {
        type: String,
        required: [true, 'please enter password']
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports = mongoose.model('user', userSchema)