const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
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
        reports: [],
    },
    { timestamps: true }
)

module.exports = mongoose.model('Patient', patientSchema)
