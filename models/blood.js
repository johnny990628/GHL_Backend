const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bloodSchema = new Schema({
    patientID: { type: String, required: true, unique: true },
    number: { type: String, required: true, unique: true },
})

module.exports = mongoose.model('Blood', bloodSchema)
