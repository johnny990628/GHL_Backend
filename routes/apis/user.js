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
        const { limit, offset } = req.query
        const users = await USER.find()
            .limit(limit)
            .sort('createdAt')
            .skip(limit * offset)
            .select({ password: 0 })

        const count = await USER.countDocuments()

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
            if (!user) return res.status(404).json({ message: `Can't find the user` })
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
            const user = await USER.findOneAndUpdate(
                { _id },
                { $set: { ...req.body, password: await bcrypt.hash(req.body.password, 10) } },
                { returnDocument: 'after' }
            ).select({ password: 0 })
            if (!user) return res.status(404).json({ message: `Can't find the user` })

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
            if (!user) return res.status(404).json({ message: `Can't find the user` })

            return res.status(200).json(user)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

module.exports = router
