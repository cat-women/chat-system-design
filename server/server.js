const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const ErrorHandler = require('./src/middleware/errorHandler.js')
const User = require('./src/routes/user.js')
const Chat = require('./src/routes/chat.js')

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use(express.json())

require('dotenv').config()

app.use(cors())

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);

const io = new Server(httpServer, {
  path: '/server/',
  connect_timeout: 10000,
  cors: {
    origin: ["http://localhost:3000"]
  }
});


// make connection with user from server side
io.on('connection', (socket) => {
  console.log('new client connected', socket);

  socket.on('disconnect', () => {
    console.log('disconnected from user');
  });

});



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
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    )
  )
  .catch(err => console.log(err.message))
