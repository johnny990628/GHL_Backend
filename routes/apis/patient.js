const express = require('express')
const router = express.Router()

const Patient = require('../../models/patient')

router.route('/').post(async (req, res) => {
    try {
        const { id, blood, name, gender, birth, phone, department, address, processing, reports = [] } = req.body
        let patient = new Patient({
            id,
            blood,
            name,
            gender,
            birth,
            phone,
            department,
            address,
            processing,
            reports,
        })
        patient = await patient.save()
        res.status(200).json(patient)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: e.message })
    }
})

module.exports = router
