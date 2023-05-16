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
            const { patientID, status } = req.query
            const { event } = req

            const eventQuery = event
                ? {
                      eventID: event,
                  }
                : {}
            let query = {}
            if (patientID) query.patientID = patientID
            if (status && status !== 'all') query.status = status

            const schedule = await SCHEDULE.find({ ...query, ...eventQuery })
                .populate('patient')
                .populate('report')
                .populate('blood')
            const count = await SCHEDULE.find({ ...query, ...eventQuery }).countDocuments()

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
            const { event } = req
            let schedule = new SCHEDULE({ ...req.body, eventID: event || '' })
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

            if (!schedule) return res.status(404).json({ message: '找不到排程資料' })
            return res.status(200).json(schedule)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .delete(async (req, res) => {
        try {
            const { scheduleID } = req.body
            const schedule = await SCHEDULE.findOneAndDelete({ _id: scheduleID })
            await REPORT.findOneAndDelete({ _id: schedule.reportID })
            await BLOOD.findOneAndDelete({ _id: schedule.bloodID })
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
