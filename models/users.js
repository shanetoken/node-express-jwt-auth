const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please insert a valid email']
    },
    password: {
        type: String,
        minLenght: [6, 'At least 6 chars']
    }
})


const User = mongoose.model('User', userSchema)

module.exports = User;