const express = require('express')
const router = express.Router()

const PATIENT = require('../../models/patient')

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
            const searchQuery = {
                $or: [
                    { blood: { $regex: search } },
                    { id: { $regex: search } },
                    { name: { $regex: search } },
                    { gender: { $regex: search } },
                    { phone: { $regex: search } },
                    { department: { $regex: search } },
                    { address: { $regex: search } },
                ],
            }

            const patients = search
                ? await PATIENT.find(searchQuery)
                : await PATIENT.find()
                      .sort({ [sort]: desc })
                      .limit(limit)
                      .skip(limit * offset)

            const count = search ? await PATIENT.find(searchQuery).countDocuments() : await PATIENT.countDocuments()

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

router
    .route('/:patientID')
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Patients']
            #swagger.description = '取得一個病人' 
        */
        try {
            const { patientID } = req.params
            const patient = await PATIENT.findOne({ id: patientID })
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
