import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { io } from "socket.io-client";


import ChatContext from './Context'

import './App.css'

import { getChats } from './actions/chat'

import Sidebar from './components/Sidebar'
import Homepage from './pages/home'
import Chatpage from './pages/chat'
import Auth from './pages/auth'

// connect to client

const socket = io("http://localhost:8000", {
  path: "/server/"
});



// connection with server
console.log("socket type", socket);

socket.on('connection', function () {
  console.log('Connected to Server')

});


function App() {
  const getData = async () => {
    const res = await getChats()
    if (res) setChats(res.data)
  }

  socket.on('connection', () => {
    console.log("connected to server");
  })

  const [room, setRoom] = useState('')
  const [chats, setChats] = useState([])

  const [user, setUser] = useState(sessionStorage.getItem('user'))
  const [users, setUsers] = useState()



  useEffect(() => {
    getData()
  }, [user])

  return (
    <div className='App'>
      <ChatContext.Provider value={{ user, setUser, chats }}>
        <div style={{ display: 'flex' }}>
          <Sidebar users={users} chats={chats} />
          <div>
            <Routes>
              <Route path='/' element={<Homepage />} exact />
              <Route path='/chats' element={<Chatpage />} />
              <Route path='/login' element={<Auth setUser={setUser} />} />

            </Routes>
          </div>
        </div>
      </ChatContext.Provider>
    </div>
  )
}

export default App
