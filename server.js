require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')

const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)


app.use(express.static(path.join(__dirname, 'public')))

app.get('*', (req, res) => {
  res.redirect('/')
})

const fs = require('fs');

io.on("connection", (socket) => {
  console.log("connection")
  
  fs.watchFile(path.join(__dirname, 'public/bundle.js'), (curr, prev) => {
    console.log("restart emit")
    socket.emit('restart')
  })
})



server.listen(process.env.PORT || 3000, () => {
  console.log(`listening on port ${process.env.PORT || 3000}`)
})