require('dotenv').config()
const app = require('express')()
const cors = require('cors')
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const mongoose = require('mongoose')

const Patient = require('./models/patient')

app.use(cors({ credentials: true, origin: process.env.WEB_ORIGIN_URL }))

const changeStream = Patient.watch()

changeStream.on('change', change => {
    console.log(change)
    io.emit('dataChange', change)
})

io.on('connection', socket => {
    console.log('Socket Coneected')
})

http.listen(process.env.SOCKET_PORT, async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log(`Listening on port :${process.env.SOCKET_PORT}`)
    } catch (e) {
        console.error(e)
    }
})
