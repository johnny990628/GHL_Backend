const express = require('express')
const router = express.Router()

const { verifyToken } = require('./auth')
const patientRouter = require('./apis/patient')
const reportRouter = require('./apis/report')
const userRouter = require('./apis/user')
const departmentRouter = require('./apis/department')
const scheduleRouter = require('./apis/schedule')
const bloodRouter = require('./apis/blood')
const existRouter = require('./apis/exist')
const countRouter = require('./apis/count')
const statsRouter = require('./apis/stats')

router.use('/department', departmentRouter)
router.use('/exist', existRouter)

router.use(verifyToken)
router.use('/patient', patientRouter)
router.use('/report', reportRouter)
router.use('/user', userRouter)
router.use('/schedule', scheduleRouter)
router.use('/blood', bloodRouter)
router.use('/count', countRouter)
router.use('/stats', statsRouter)

module.exports = router
