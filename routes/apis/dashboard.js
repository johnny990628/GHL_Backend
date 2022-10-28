const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const REPORT = require('../../models/report')
const SCHEDULE = require('../../models/schedule')
const PATIENT = require('../../models/patient')

const statsData = async ({ matchConditions, conditions }) => {
    const patients = await PATIENT.aggregate([...conditions])
    const reports = await REPORT.aggregate([
        ...conditions,
        {
            $project: {
                records: 0,
            },
        },
    ])
    const schedules = await SCHEDULE.aggregate([...conditions])

    let patientCount = await PATIENT.aggregate([
        {
            $match: matchConditions,
        },
        { $group: { _id: null, n: { $sum: 1 } } },
    ])

    let reportCount = await REPORT.aggregate([
        {
            $match: matchConditions,
        },
        { $group: { _id: null, n: { $sum: 1 } } },
    ])
    let scheduleCount = await SCHEDULE.aggregate([
        {
            $match: matchConditions,
        },
        { $group: { _id: null, n: { $sum: 1 } } },
    ])

    patientCount = patientCount.length ? patientCount[0]['n'] : 0
    reportCount = reportCount.length ? reportCount[0]['n'] : 0
    scheduleCount = scheduleCount.length ? scheduleCount[0]['n'] : 0

    return {
        patients,
        reports,
        schedules,
        count: { patient: patientCount, report: reportCount, schedule: scheduleCount },
    }
}

router.route('/').get(async (req, res) => {
    try {
        const { dateFrom, dateTo, limit = 5 } = req.query

        const matchConditions = {
            $and: [
                {
                    createdAt: {
                        $gte: new Date(dateFrom),
                        $lte: new Date(dateTo),
                    },
                },
            ],
        }
        const conditions = [
            {
                $match: matchConditions,
            },
            {
                $limit: limit * 1,
            },
        ]
        const { patients, reports, schedules, count } = await statsData({ matchConditions, conditions })
        return res.status(200).json({
            patients,
            reports,
            schedules,
            count,
        })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})
router.route('/:departmentID').get(async (req, res) => {
    try {
        const { dateFrom, dateTo, limit = 5 } = req.query
        const { departmentID } = req.params

        let patientsOfDepartment = await PATIENT.aggregate([
            {
                $lookup: {
                    from: 'departments',
                    localField: 'department',
                    foreignField: 'name',
                    as: 'department',
                },
            },
            {
                $project: {
                    id: 1,
                    department: { $arrayElemAt: ['$department', -1] },
                },
            },
            {
                $match: {
                    'department._id': mongoose.Types.ObjectId(departmentID),
                },
            },
            {
                $project: {
                    id: 1,
                },
            },
        ])

        if (patientsOfDepartment.length === 0) return res.status(404).json({ message: '此部門無檢查資料' })

        const patientIDCondition = patientsOfDepartment
            .map(patient => patient.id)
            .map(id => ({
                patientID: id,
            }))

        const matchConditions = {
            $and: [
                {
                    $or: patientIDCondition,
                },
                {
                    createdAt: {
                        $gte: new Date(dateFrom),
                        $lte: new Date(dateTo),
                    },
                },
            ],
        }

        const conditions = [
            {
                $match: matchConditions,
            },
            {
                $limit: limit * 1,
            },
        ]

        const { patients, reports, schedules, count } = await statsData({ matchConditions, conditions })
        return res.status(200).json({
            patients,
            reports,
            schedules,
            count,
        })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

module.exports = router
