const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const bodyParser = require('body-parser')

const ErrorHandler = require('./src/middleware/errorHandler.js')
const User = require('./src/routes/user.js')
const Chat = require('./src/routes/chat.js')

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use(express.json())
app.use('/public', express.static(__dirname + '/public'))

require('dotenv').config()

app.use(cors())

const server = http.createServer(app)

const BOT = 'SEVER BOT'
let allRooms = ''
let users = []

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})
io.on('connection', socket => {
  console.log(`User connected ${socket.id}`)

  // adding user to the room
  socket.on('join_room', data => {
    const { username, room } = data
    socket.join(room)

    let joinedDate = Date.now()
    socket.to(room).emit('receive_message', {
      message: `${username} has joined the chat room`,
      username: BOT,
      joinedDate
    })
    socket.emit('receive_message', {
      message: `Welcome ${username}`,
      username: BOT,
      joinedDate
    })

    chatRoom = room
    users.push({ id: socket.id, username, room })
    chatRoomUsers = users.filter(user => user.room === room)
    socket.to(room).emit('chatroom_users', chatRoomUsers)
    socket.emit('chatroom_users', chatRoomUsers)
  })
})

app.get('/', (req, res) => {
  res.send('Hello world')
})
app.use('/user', User)
app.use('/chat', Chat)

// error handler
app.use(ErrorHandler)

server.listen(4000, () => {
  console.log('Server is running on port 4000')
})
