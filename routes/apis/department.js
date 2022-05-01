const express = require('express')
const router = express.Router()

const DEPARTMENT = require('../../models/department')

router
    .route('/')
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Department']
            #swagger.description = '取得部門' 
        */
        try {
            const departments = await DEPARTMENT.find()
            return res.status(200).json({ results: departments })
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .post(async (req, res) => {
        /* 	
            #swagger.tags = ['Department']
            #swagger.description = '新增部門' 
        */
        try {
            let department = new DEPARTMENT(req.body)
            department = await department.save()
            return res.status(200).json(department)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

router
    .route('/:id')
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Department']
            #swagger.description = '取得單一部門' 
        */
        try {
            const { id } = req.params
            const department = await DEPARTMENT.findOne({ _id: id })
            if (!department) return res.status(404).json({ message: `Can't find the department` })
            return res.status(200).json(department)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .patch(async (req, res) => {
        /* 	
            #swagger.tags = ['Department']
            #swagger.description = '更新一個部門' 
        */
        try {
            const { id } = req.params
            const department = await DEPARTMENT.findOneAndUpdate({ _id: id }, { $set: { ...req.body } }, { returnDocument: 'after' })
            if (!department) return res.status(404).json({ message: `Can't find the department` })
            return res.status(200).json(department)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .delete(async (req, res) => {
        /* 	
            #swagger.tags = ['Department']
            #swagger.description = '刪除部門' 
        */
        try {
            const { id } = req.params
            const department = await DEPARTMENT.findOneAndDelete({ _id: id })
            if (!department) return res.status(404).json({ message: `Can't find the department` })
            return res.status(200).json(department)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

module.exports = router
