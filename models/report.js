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
        patientID: { type: String, required: true },
        procedureCode: String,
        records: [recordSchema],
    },
    { timestamps: true }
)

module.exports = mongoose.model('Report', reportSchema)
