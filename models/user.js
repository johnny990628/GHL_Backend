const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roleSchema = new Schema({
    name: String,
    level: Number,
})

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        roles: [roleSchema],
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
