const { Router } = require("express");
const express = require("express");
const router = express.Router();

const app = require('express')()
var cors = require('cors')
const http = require('http').createServer(router)
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
const port = 3001

router.use(cors())

router.get('/', (req, res) => {
    res.send('Hello World!')
})

io.on('connection', (socket) => {
    console.log('User Connected.')

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected.')
    })
})

http.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

module.exports = router;