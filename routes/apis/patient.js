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
            const { limit, offset, search, sort, desc } = req.query
            if (!limit || !offset) return res.status(400).json({ message: 'Need a limit and offset' })

            const searchRe = new RegExp(search)
            const searchQuery = search
                ? {
                      $or: [{ id: searchRe }, { name: searchRe }],
                  }
                : {}
            const patients = await PATIENT.find(searchQuery)
                .sort({ [sort]: desc })
                .limit(limit)
                .skip(limit * offset)
                .populate('schedule')
                .populate('blood')

            const count = await PATIENT.find(searchQuery).countDocuments()

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
