const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const { USER } = require('../../models/user')

router.route('/').get(async (req, res) => {
    /* 	
            #swagger.tags = ['Users']
            #swagger.description = '取得使用者' 
        */
    try {
        const { limit, offset, search, sort, desc } = req.query
        if (!limit || !offset) return res.status(400).json({ message: 'Need a limit and offset' })
        const searchRe = new RegExp(search)
        const searchQuery = search
            ? {
                  $or: [{ username: searchRe }, { name: searchRe }],
              }
            : {}

        const users = await USER.find(searchQuery)
            .limit(limit)
            .sort({ [sort]: desc })
            .skip(limit * offset)
            .select({ password: 0 })

        const count = await USER.find(searchQuery).countDocuments()

        return res.status(200).json({ count, results: users })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

router
    .route('/:_id')
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Users']
            #swagger.description = '取得一位使用者' 
        */
        try {
            const { _id } = req.params
            const user = await USER.findOne({ _id }).select({ password: 0 })
            if (!user) return res.status(404).json({ message: '找不到使用者資料' })
            return res.status(200).json(user)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .patch(async (req, res) => {
        /* 	
            #swagger.tags = ['Users']
            #swagger.description = '更新一位使用者' 
        */
        try {
            const { _id } = req.params
            const user = await USER.findOneAndUpdate({ _id }, { $set: { ...req.body } }, { returnDocument: 'after' }).select({
                password: 0,
            })
            if (!user) return res.status(404).json({ message: '找不到使用者資料' })

            return res.status(200).json(user)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .delete(async (req, res) => {
        /* 	
            #swagger.tags = ['Users']
            #swagger.description = '刪除一位使用者' 
        */
        try {
            const { _id } = req.params
            const user = await USER.findOneAndDelete({ _id }).select({ password: 0 })
            if (!user) return res.status(404).json({ message: '找不到使用者資料' })

            return res.status(200).json(user)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

module.exports = router
