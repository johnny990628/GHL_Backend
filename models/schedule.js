const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheduleSchema = new Schema(
    {
        patientID: { type: String, required: true, ref: 'Patient' },
        procedureCode: { type: String, required: true },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Schedule', scheduleSchema)
