const express = require('express')
const router = express.Router()

const Patient = require('../../models/patient')

router
    .route('/')
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Patients']
            #swagger.description = '取得病人' 
        */
        try {
            const { limit, offset } = req.query
            const patients = await Patient.find()
                .limit(limit)
                .sort('createdAt')
                .skip(limit * offset)
            return res.status(200).json(patients)
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
            let patient = new Patient(req.body)
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
            const patient = await Patient.find({ id: patientID })
            return res.status(200).json(patient[0])
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
            const patient = await Patient.findOneAndUpdate({ id: patientID }, { $set: { ...req.body } }, { returnDocument: 'after' })
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
            const patient = await Patient.findOneAndDelete({ id: patientID })
            return res.status(200).json(patient)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

module.exports = router
