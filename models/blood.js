const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bloodSchema = new Schema({
    patientID: { type: String, required: true },
    number: { type: String, required: true },
})

module.exports = mongoose.model('Blood', bloodSchema)
