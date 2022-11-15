const express = require('express')
const router = express.Router()

const SCHEDULE = require('../../models/schedule')
const BLOOD = require('../../models/blood')
const REPORT = require('../../models/report')

router
    .route('/')
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Schedule']
            #swagger.description = '取得排程' 
        */
        try {
            const { procedureCode, patientID } = req.query

            let query = {}
            if (procedureCode) query.procedureCode = procedureCode
            if (patientID) query.patientID = patientID

            const schedule = await SCHEDULE.find(query).populate('patient').populate('reports').populate('blood')
            const count = await SCHEDULE.find(query).countDocuments()

            return res.status(200).json({ results: schedule, count })
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .post(async (req, res) => {
        /* 	
            #swagger.tags = ['Schedule']
            #swagger.description = '新增排程' 
        */
        try {
            let schedule = new SCHEDULE(req.body)
            schedule = await schedule.save()
            return res.status(200).json(schedule)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .patch(async (req, res) => {
        try {
            const { patientID, scheduleID, status } = req.body
            const schedule = await SCHEDULE.findOneAndUpdate({ _id: scheduleID }, { $set: { status } }, { returnDocument: 'after' })
            if (patientID) {
                await REPORT.findOneAndDelete({ patientID, status: 'pending' })
                await BLOOD.findOneAndDelete({ patientID })
            }

            if (!schedule) return res.status(404).json({ message: '找不到排程資料' })
            return res.status(200).json(schedule)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .delete(async (req, res) => {
        try {
            const { patientID } = req.body
            const schedule = await SCHEDULE.findOneAndDelete({ patientID })
            await REPORT.findOneAndDelete({ patientID, status: 'pending' })
            await BLOOD.findOneAndDelete({ patientID })
            if (!schedule) return res.status(404).json({ message: '找不到排程資料' })
            return res.status(200).json(schedule)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

router
    .route('/:_id')
    .patch(async (req, res) => {
        /* 	
            #swagger.tags = ['Schedule']
            #swagger.description = '修改排程' 
        */
        try {
            const { _id } = req.params
            const schedule = await SCHEDULE.findOneAndUpdate({ _id: _id }, { $set: { ...req.body } }, { returnDocument: 'after' })
            return res.status(200).json(schedule)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .delete(async (req, res) => {
        /* 	
        #swagger.tags = ['Schedule']
        #swagger.description = '刪除排程' 
    */
        try {
            const { _id } = req.params
            const schedule = await SCHEDULE.findOneAndDelete({ _id })
            if (!schedule) return res.status(404).json({ message: '找不到報告資料' })
            return res.status(200).json(schedule)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

module.exports = router
