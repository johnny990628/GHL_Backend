const express = require('express')
const router = express.Router()

const { verifyToken } = require('./auth')
const patientRouter = require('./apis/patient')
const reportRouter = require('./apis/report')

// router.use(verifyToken)

router.use('/patient', patientRouter)
router.use('/report', reportRouter)

module.exports = router
