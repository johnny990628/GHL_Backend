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
    .route('/:username')
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Users']
            #swagger.description = '取得一位使用者' 
        */
        try {
            const { username } = req.params
            const user = await USER.findOne({ username }).select({ password: 0 })
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
            const { username } = req.params
            const user = await USER.findOneAndUpdate(
                { username },
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
            const { username } = req.params
            const user = await USER.findOneAndDelete({ username }).select({ password: 0 })
            if (!user) return res.status(404).json({ message: `Can't find the user` })

            return res.status(200).json(user)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

module.exports = router
