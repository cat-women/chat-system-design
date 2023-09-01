const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const ErrorHandler = require('./src/middleware/errorHandler.js')
const User = require('./src/routes/user.js')
const Chat = require('./src/routes/chat.js')

const { verifyAccessToken } = require('./src/services/token')

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use(express.json())

require('dotenv').config()

app.use(cors())
const http = require('http')
let server = http.createServer(app)

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);

const io = new Server(httpServer, {
  path: '/server/',
  connect_timeout: 90000,
  cors: {
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST']
  }
});

io.use((socket, next) => {
  const token = socket.handshake.headers['authorization'];
  console.log("Access token ", token);
  const { decoded, error } = verifyAccessToken(token)
  console.log("decoded , error", decoded, error);
  if (decoded) socket.user = decoded
  next()
})


// make connection with user from server side
io.on('connection', (socket) => {
  console.log('new client connected', socket.id);

  socket.on('disconnect', () => {
    console.log('disconnected from user');
  });

  socket.on("connect_error", () => {
    socket.connect();
  });


  socket.emit("sendMsg", `Hello client ${socket.id}`);

  socket.on("sendToServer", (arg) => {
    console.log(arg);
  });

});

httpServer.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT} `)
)

app.get('/', (req, res) => {
  return res.send('Chat Server : Hello world')
})



app.get('/server/', (req, res) => {
  return res.send('this is server routes')
})


app.use('/user', User)
app.use('/chat', Chat)

// error handler
app.use((err, req, res, next) => {
  console.log(err);
  ErrorHandler(err, req, res, next);
});

// database connection

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to database");
  }
  )
  .catch(err => console.log(err.message))
