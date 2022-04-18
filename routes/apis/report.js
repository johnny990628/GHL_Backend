const express = require('express')
const router = express.Router()

const Patient = require('../../models/patient')

router.route('/:patientID').post(async (req, res) => {
    try {
        const { patientID } = req.params
        const patient = await Patient.findOneAndUpdate(
            { id: patientID },
            { $set: { processing: false }, $push: { reports: { records: req.body.report } } },
            { returnDocument: 'after' }
        )
        return res.status(200).json(patient)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

router.route('/:patientID/:reportID').patch(async (req, res) => {
    try {
        const { patientID, reportID } = req.params
        const { _id, ...report } = req.body.report
        const patient = await Patient.findOneAndUpdate(
            { id: patientID },
            { $push: { 'reports.$[report].records': report } },
            {
                arrayFilters: [{ 'report._id': reportID }],
                returnDocument: 'after',
            }
        )
        return res.status(200).json(patient)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

module.exports = router
