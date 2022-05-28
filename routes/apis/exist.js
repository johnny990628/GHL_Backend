const express = require('express')
const router = express.Router()

const BLOOD = require('../../models/blood')
const PATIENT = require('../../models/patient')
const SCHEDULE = require('../../models/schedule')

router.route('/patient').get(async (req, res) => {
    try {
        const { value } = req.query
        const isExists = await PATIENT.exists({ id: value })
        return res.status(200).json(Boolean(isExists))
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})
router.route('/blood').get(async (req, res) => {
    try {
        const { value } = req.query
        const isExists = await BLOOD.exists({ number: value })
        return res.status(200).json(Boolean(isExists))
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})
router.route('/schedule').get(async (req, res) => {
    try {
        const { value } = req.query
        const isExists = await SCHEDULE.exists({ patientID: value })
        return res.status(200).json(Boolean(isExists))
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

module.exports = router
