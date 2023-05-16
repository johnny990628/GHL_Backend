const express = require('express')
const router = express.Router()

const EVENT = require('../../models/event')

router
    .route('/')
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Event']
            #swagger.description = '取得活動' 
        */
        try {
            const { limit, offset, sort, desc } = req.query
            if (!limit || !offset) return res.status(400).json({ message: 'Need a limit and offset' })

            const events = await EVENT.find()
                .sort({ [sort]: desc })
                .limit(limit)
                .skip(limit * offset)

            const count = await EVENT.find().countDocuments()
            return res.status(200).json({ count, results: events })
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .post(async (req, res) => {
        /* 	
            #swagger.tags = ['Event']
            #swagger.description = '新增活動' 
        */
        try {
            let event = new EVENT(req.body)
            event = await event.save()
            return res.status(200).json(event)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

router
    .route('/:_id')
    .get(async (req, res) => {
        /* 	
            #swagger.tags = ['Event']
            #swagger.description = '取得單一活動' 
        */
        try {
            const { _id } = req.params
            const event = await EVENT.findOne({ _id })
            if (!event) return res.status(404).json({ message: '找不到活動資料' })
            return res.status(200).json(event)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .post(async (req, res) => {
        try {
            const { _id } = req.params
            if (_id === 'all') return res.clearCookie('event').status(200).json({ message: '清除活動資料' })
            else
                return res
                    .cookie('event', _id, {
                        maxAge: 86400000,
                        // maxAge: 6000,
                        secure: false, //set true if using https
                        httpOnly: true, //can't access from javascript
                        sameSite: true,
                    })
                    .status(200)
                    .json({ message: 'register event successful', _id })
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .patch(async (req, res) => {
        /* 	
            #swagger.tags = ['Event']
            #swagger.description = '更新一個活動' 
        */
        try {
            const { _id } = req.params
            const event = await EVENT.findOneAndUpdate({ _id }, { $set: { ...req.body } }, { returnDocument: 'after' })
            if (!event) return res.status(404).json({ message: '找不到活動資料' })
            return res.status(200).json(event)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })
    .delete(async (req, res) => {
        /* 	
            #swagger.tags = ['Event']
            #swagger.description = '刪除活動' 
        */
        try {
            const { _id } = req.params
            const event = await EVENT.findOneAndDelete({ _id })
            if (!event) return res.status(404).json({ message: '找不到活動資料' })
            return res.status(200).json(event)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    })

module.exports = router
