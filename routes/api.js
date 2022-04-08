const express = require('express')
const router = express.Router()

const { verifyToken } = require('./auth')
const patientRouter = require('./apis/patient')

// router.use(verifyToken)

router.use('/patient', patientRouter)

module.exports = router
