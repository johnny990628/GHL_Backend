const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cancerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    value: Schema.Types.Mixed,
})

const recordSchema = new Schema({
    liver: [cancerSchema],
    gallbladder: [cancerSchema],
    kidney: [cancerSchema],
    pancreas: [cancerSchema],
    spleen: [cancerSchema],
    suggestion: [cancerSchema],
})

const reportSchema = new Schema(
    {
        records: [recordSchema],
    },
    { timestamps: true }
)
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
        reports: [reportSchema],
    },
    { timestamps: true }
)

module.exports = mongoose.model('Patient', patientSchema)
