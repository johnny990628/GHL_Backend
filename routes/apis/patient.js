const express = require('express')
const router = express.Router()

const Patient = require('../../models/patient')

router
    .route('/')
    .get(async (req, res) => {
        try {
            const patients = await Patient.find()
            return res.status(200).json(patients)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .post(async (req, res) => {
        try {
            let patient = new Patient(req.body)
            patient = await patient.save()
            return res.status(200).json(patient)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

router
    .route('/:patientID')
    .patch(async (req, res) => {
        try {
            const { patientID } = req.params
            const patient = await Patient.findOneAndReplace({ id: patientID }, req.body, { returnDocument: 'after' })
            return res.status(200).json(patient)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .delete(async (req, res) => {
        try {
            const { patientID } = req.params
            const patient = await Patient.findOneAndDelete({ id: patientID })
            return res.status(200).json(patient)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

module.exports = router
