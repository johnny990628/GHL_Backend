const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
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
    },
    { timestamps: true }
);

// patientSchema.virtual('schedule', {
//     ref: 'Schedule',
//     localField: 'id',
//     foreignField: 'patientID',
// })

// patientSchema.virtual('blood', {
//     ref: 'Blood',
//     localField: 'id',
//     foreignField: 'patientID',
//     justOne: true,
// })

// patientSchema.virtual('report', {
//     ref: 'Report',
//     localField: 'id',
//     foreignField: 'patientID',
//     justOne: false,
// })

patientSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Patient", patientSchema);
