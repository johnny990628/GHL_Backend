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
            const { limit, offset, search, sort, desc } = req.query
            if (!limit || !offset) return res.status(400).json({ message: 'Need a limit and offset' })
            const searchRe = new RegExp(search)
            const searchQuery = search
                ? {
                      $or: [{ name: searchRe }, { address: searchRe }],
                  }
                : {}

            const departments = await DEPARTMENT.find(searchQuery)
                .sort({ [sort]: desc })
                .limit(limit)
                .skip(limit * offset)

            const count = await DEPARTMENT.find(searchQuery).countDocuments()
            return res.status(200).json({ count, results: departments })
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
    .route('/:_id')
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Department']
            #swagger.description = '取得單一部門' 
        */
        try {
            const { _id } = req.params
            const department = await DEPARTMENT.findOne({ _id })
            if (!department) return res.status(404).json({ message: '找不到部門資料' })
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
            const { _id } = req.params
            const department = await DEPARTMENT.findOneAndUpdate({ _id }, { $set: { ...req.body } }, { returnDocument: 'after' })
            if (!department) return res.status(404).json({ message: '找不到部門資料' })
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
            const { _id } = req.params
            const department = await DEPARTMENT.findOneAndDelete({ _id })
            if (!department) return res.status(404).json({ message: '找不到部門資料' })
            return res.status(200).json(department)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

module.exports = router
