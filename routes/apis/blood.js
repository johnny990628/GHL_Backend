const express = require('express')
const router = express.Router()

const BLOOD = require('../../models/blood')

router
    .route('/')
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Blood']
            #swagger.description = '取得所有抽血資訊' 
        */
        try {
            const { patientID } = req.query
            const bloods = patientID ? await BLOOD.findOne({ patientID }) : await BLOOD.find()
            return res.status(200).json({ results: bloods })
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .post(async (req, res) => {
        /* 	
            #swagger.tags = ['Blood']
            #swagger.description = '新增抽血資訊' 
        */
        try {
            let blood = new BLOOD(req.body)
            blood = await blood.save()
            return res.status(200).json(blood)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

router
    .route('/:bloodNumber')
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Blood']
            #swagger.description = '取得單一抽血資訊' 
        */
        try {
            const { bloodNumber } = req.params
            const blood = await BLOOD.findOne({ number: bloodNumber })
            if (!blood) return res.status(404).json({ message: '找不到血液資料' })
            return res.status(200).json(blood)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .delete(async (req, res) => {
        /* 	
            #swagger.tags = ['Blood']
            #swagger.description = '刪除抽血資訊' 
        */
        try {
            const { bloodNumber } = req.params
            const blood = await BLOOD.findOneAndDelete({ number: bloodNumber })
            if (!blood) return res.status(404).json({ message: '找不到血液資料' })
            return res.status(200).json(blood)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

module.exports = router
