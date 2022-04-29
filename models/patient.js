const mongoose = require('mongoose')
const Schema = mongoose.Schema

const patientSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        blood: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        birth: {
            type: Date,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        department: String,
        address: String,
        processing: Boolean,
    },
    { timestamps: true }
)

module.exports = mongoose.model('Patient', patientSchema)
