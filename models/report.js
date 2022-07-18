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

const recordSchema = new Schema(
    {
        liver: [cancerSchema],
        gallbladder: [cancerSchema],
        kidney: [cancerSchema],
        pancreas: [cancerSchema],
        spleen: [cancerSchema],
        suggestion: [cancerSchema],
        id: { type: String },
    },
    { _id: false }
)

const reportSchema = new Schema(
    {
        patientID: { type: String, required: true },
        procedureCode: { type: String, required: true },
        records: [recordSchema],
        status: { type: String, required: true },
        blood: { type: String },
        userID: { type: String },
    },
    { timestamps: true }
)

reportSchema.virtual('patient', {
    ref: 'Patient',
    localField: 'patientID',
    foreignField: 'id',
    justOne: true,
})
reportSchema.virtual('user', {
    ref: 'User',
    localField: 'userID',
    foreignField: '_id',
    justOne: true,
})

reportSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Report', reportSchema)
