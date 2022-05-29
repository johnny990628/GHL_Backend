const express = require('express')
const router = express.Router()

const REPORT = require('../../models/report')
const SCHEDULE = require('../../models/schedule')
const PATIENT = require('../../models/patient')

router.route('/').get(async (req, res) => {
    try {
        const patient = await PATIENT.countDocuments()
        const report = await REPORT.countDocuments()
        const schedule = await SCHEDULE.countDocuments()
        return res.status(200).json({ patient, report, schedule })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})
router.route('/patient').get(async (req, res) => {
    try {
        const count = await PATIENT.countDocuments()
        return res.status(200).json({ count })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})
router.route('/report').get(async (req, res) => {
    try {
        const count = await REPORT.countDocuments()
        return res.status(200).json({ count })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})
router.route('/schedule').get(async (req, res) => {
    try {
        const count = await SCHEDULE.countDocuments()
        return res.status(200).json({ count })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

module.exports = router
