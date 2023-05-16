const express = require('express')
const router = express.Router()

router.route('/').get(async (req, res) => {
    /* 	
            #swagger.tags = ['Cookie']
            #swagger.description = '取得cookie' 
        */
    try {
        const { event, accessToken } = req
        return res.status(200).json({ event, accessToken })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
})

module.exports = router
