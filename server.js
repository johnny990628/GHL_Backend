require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)

const APIRouter = require('./routes/api')
const { router: authRouter } = require('./routes/auth')

const port = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ credentials: true, origin: process.env.WEB_ORIGIN_URL }))
app.use(cookieParser())
app.use(express.static('./public'))

app.use('/ghl/auth', authRouter)
app.use('/ghl/api', APIRouter)

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})
