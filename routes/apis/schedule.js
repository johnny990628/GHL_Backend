const express = require('express')
const router = express.Router()

const SCHEDULE = require('../../models/schedule')

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
            const schedule = await SCHEDULE.find(query)
            return res.status(200).json({ results: schedule })
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

router.route('/:_id').delete(async (req, res) => {
    /* 	
        #swagger.tags = ['Schedule']
        #swagger.description = '刪除排程' 
    */
    try {
        const { _id } = req.params
        const schedule = await SCHEDULE.findOneAndDelete({ _id })
        if (!schedule) return res.status(404).json({ message: `Can't find the department` })
        return res.status(200).json(schedule)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

module.exports = router
