const mongoose = require('mongoose')
const Schema = mongoose.Schema

const departmentSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    active: { type: Boolean, required: true },
})

module.exports = mongoose.model('Department', departmentSchema)
