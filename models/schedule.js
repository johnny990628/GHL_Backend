const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheduleSchema = new Schema(
    {
        patientID: { type: String, required: true },
        reportID: { type: String },
        bloodID: { type: String },
        eventID: { type: String },
        StudyInstanceUID: { type: String, required: false },
        procedureCode: { type: String, required: true },
        status: { type: String, required: true },
    },
    { timestamps: true }
)

scheduleSchema.virtual('patient', {
    ref: 'Patient',
    localField: 'patientID',
    foreignField: 'id',
    justOne: true,
})

scheduleSchema.virtual('report', {
    ref: 'Report',
    localField: 'reportID',
    foreignField: '_id',
    justOne: true,
})

scheduleSchema.virtual('blood', {
    ref: 'Blood',
    localField: 'bloodID',
    foreignField: '_id',
    justOne: true,
})

scheduleSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Schedule', scheduleSchema)
