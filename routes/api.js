const express = require('express')
const router = express.Router()

const { verifyToken } = require('./auth')
const patientRouter = require('./apis/patient')
const reportRouter = require('./apis/report')
const userRouter = require('./apis/user')
const roleRouter = require('./apis/role')
const departmentRouter = require('./apis/department')

router.use(verifyToken)

router.use('/patient', patientRouter)
router.use('/report', reportRouter)
router.use('/user', userRouter)
router.use('/role', roleRouter)
router.use('/department', departmentRouter)

module.exports = router
