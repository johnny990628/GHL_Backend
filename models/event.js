const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema(
    {
        name: { type: String, required: true },
        departmentID: { type: String, required: true },
        datetime: { type: Date, default: Date.now },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Event', eventSchema)
