const express = require('express')
const router = express.Router()

const PATIENT = require('../../models/patient')
const REPORT = require('../../models/report')
const BLOOD = require('../../models/blood')
const SCHEDULE = require('../../models/schedule')

router
    .route('/')
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Patients']
            #swagger.description = '取得病人' 
        */
        try {
            const { limit, offset, search, sort, desc, status } = req.query
            if (!limit || !offset) return res.status(400).json({ message: 'Need a limit and offset' })

            const searchRe = new RegExp(search)
            const searchQuery = search
                ? {
                      $or: [{ id: searchRe }, { name: searchRe }],
                  }
                : {}

            let statusMatch = status === 'all' ? {} : { 'schedule.status': status }
            // if (status) {
            //     switch (status) {
            //         case 'finish':
            //             statusMatch['schedule.0'] = { $exists: false }
            //             statusMatch['report.0'] = { $exists: true }
            //             break
            //         case 'yet':
            //             statusMatch['schedule.0'] = { $exists: false }
            //             statusMatch['report.0'] = { $exists: false }
            //             break
            //         case 'processing':
            //             statusMatch['schedule.0'] = { $exists: true }
            //             break
            //         default:
            //             break
            //     }
            // }

            const patients = await PATIENT.aggregate([
                { $match: searchQuery },
                {
                    $lookup: {
                        from: 'schedules',
                        localField: 'id',
                        foreignField: 'patientID',
                        as: 'schedule',
                    },
                },
                {
                    $lookup: {
                        from: 'reports',
                        localField: 'id',
                        foreignField: 'patientID',
                        as: 'report',
                    },
                },
                {
                    $lookup: {
                        from: 'bloods',
                        localField: 'id',
                        foreignField: 'patientID',
                        as: 'blood',
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'creator',
                        foreignField: '_id',
                        as: 'creator',
                    },
                },
                {
                    $lookup: {
                        from: 'departments',
                        localField: 'department',
                        foreignField: '_id',
                        as: 'department',
                    },
                },

                { $sort: { [sort]: Number(desc) } },
                { $skip: Number(limit) * Number(offset) },
                { $limit: Number(limit) },
                {
                    $addFields: {
                        blood: { $arrayElemAt: ['$blood', 0] },
                        schedule: { $arrayElemAt: ['$schedule', 0] },
                        creator: { $arrayElemAt: ['$creator', 0] },
                        department: { $arrayElemAt: ['$department', 0] },
                    },
                },
                {
                    $project: {
                        'creator.password': 0,
                    },
                },
                {
                    $match: statusMatch,
                },
            ])

            const count = await PATIENT.find(searchQuery).countDocuments()

            // const patients = await PATIENT.find(searchQuery)
            //     .sort({ [sort]: desc })
            //     .limit(limit)
            //     .skip(limit * offset)
            //     .populate('schedule')
            //     .populate('blood')
            //     .populate('report')
            return res.status(200).json({ count, results: patients })
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .post(async (req, res) => {
        /* 	
            #swagger.tags = ['Patients']
            #swagger.description = '新增病人' 
        */
        try {
            let patient = new PATIENT(req.body)
            patient = await patient.save()
            return res.status(200).json(patient)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .delete(async (req, res) => {
        try {
            const { patientID } = req.body
            const patient = await PATIENT.findOneAndDelete({ id: patientID })
            await REPORT.findOneAndDelete({ patientID, status: 'pending' })
            await SCHEDULE.findOneAndDelete({ patientID })
            await BLOOD.findOneAndDelete({ patientID })
            return res.status(200).json(patient)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: e.message })
        }
    })

router
    .route('/:patientID')
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Patients']
            #swagger.description = '取得一個病人' 
        */
        try {
            const { patientID } = req.params
            const patient = await PATIENT.findOne({ id: patientID }).populate('blood')
            return res.status(200).json(patient)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .patch(async (req, res) => {
        /* 	
            #swagger.tags = ['Patients']
            #swagger.description = '修改病人' 
        */
        try {
            const { patientID } = req.params
            const patient = await PATIENT.findOneAndUpdate({ id: patientID }, { $set: { ...req.body } }, { returnDocument: 'after' })
            return res.status(200).json(patient)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .delete(async (req, res) => {
        /* 	
            #swagger.tags = ['Patients']
            #swagger.description = '刪除病人' 
        */
        try {
            const { patientID } = req.params
            const patient = await PATIENT.findOneAndDelete({ id: patientID })
            return res.status(200).json(patient)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

module.exports = router
