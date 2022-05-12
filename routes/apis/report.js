const express = require('express')
const router = express.Router()

const REPORT = require('../../models/report')

router
    .route('/')
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Reports']
            #swagger.description = '取得報告' 
        */
        try {
            const { patientID, limit, offset } = req.query
            const reports = patientID
                ? await REPORT.find({ patientID })
                : await REPORT.find()
                      .limit(limit)
                      .sort('createdAt')
                      .skip(limit * offset)

            const count = patientID ? await REPORT.find({ patientID }).countDocuments() : await REPORT.countDocuments()

            return res.status(200).json({ count, results: reports })
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .post(async (req, res) => {
        /* 	
            #swagger.tags = ['Reports']
            #swagger.description = '新增報告' 
        */
        try {
            const { patientID, procedureCode } = req.query
            let report = new REPORT({ patientID, procedureCode, records: [req.body.report] })
            report = await report.save()
            return res.status(200).json(report)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

router
    .route('/:reportID')
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Reports']
            #swagger.description = '取得一則報告' 
        */
        try {
            const { reportID } = req.params
            const report = await REPORT.findOne({ _id: reportID })
            return res.status(200).json(report)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .patch(async (req, res) => {
        /* 	
            #swagger.tags = ['Reports']
            #swagger.description = '修改報告' 
        */
        try {
            const { reportID } = req.params
            const report = await REPORT.findOneAndUpdate(
                { _id: reportID },
                { $push: { records: req.body.report } },
                { returnDocument: 'after' }
            )
            return res.status(200).json(report)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

// router.route('/:patientID').post(async (req, res) => {
//     try {
//         const { patientID } = req.params
//         const patient = await Patient.findOneAndUpdate(
//             { id: patientID },
//             { $set: { processing: false }, $push: { reports: { records: req.body.report } } },
//             { returnDocument: 'after' }
//         )
//         return res.status(200).json(patient)
//     } catch (e) {
//         return res.status(500).json({ message: e.message })
//     }
// })

// router.route('/:patientID/:reportID').patch(async (req, res) => {
//     try {
//         const { patientID, reportID } = req.params
//         const { _id, ...report } = req.body.report
//         const patient = await Patient.findOneAndUpdate(
//             { id: patientID },
//             { $push: { 'reports.$[report].records': report } },
//             {
//                 arrayFilters: [{ 'report._id': reportID }],
//                 returnDocument: 'after',
//             }
//         )
//         return res.status(200).json(patient)
//     } catch (e) {
//         return res.status(500).json({ message: e.message })
//     }
// })

module.exports = router
