const express = require('express')
const router = express.Router()

const { ROLE } = require('../../models/user')

router
    .route('/')
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Roles']
            #swagger.description = '取得等級' 
        */
        try {
            const roles = await ROLE.find()
            return res.status(200).json({ results: roles })
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .post(async (req, res) => {
        /* 	
            #swagger.tags = ['Roles']
            #swagger.description = '新增等級' 
        */
        try {
            let role = new ROLE(req.body)
            role = await role.save()
            return res.status(200).json(role)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

router
    .route('/:id')
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Roles']
            #swagger.description = '取得等級' 
        */
        try {
            const { id } = req.params
            const role = await ROLE.findOne({ _id: id })
            if (!role) return res.status(404).json({ message: `Can't find the role` })
            return res.status(200).json(role)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .delete(async (req, res) => {
        /* 	
            #swagger.tags = ['Roles']
            #swagger.description = '刪除等級' 
        */
        try {
            const { id } = req.params
            const role = await ROLE.findOneAndDelete({ _id: id })
            if (!role) return res.status(404).json({ message: `Can't find the role` })
            return res.status(200).json(role)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

module.exports = router
