import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ChatContext from './Context'

import './App.css'

import { getAllUser } from './actions/user'

import Sidebar from './components/Sidebar'
// import Nav from './components/Nav'
import Homepage from './pages/home'
import Chatpage from './pages/chat'


function App() {

useEffect(() => {
  const user =  getAllUser()
  console.log("user in appp.js",user);
 }, [])
 
  const [room, setRoom] = useState('')
  const [username, setUsername] = useState('cat-women')

  return (
    <div className='App'>
      <ChatContext.Provider value={{ username, setUsername }}>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div>
            <Routes>
              <Route path='/' element={<Homepage />} exact />
              <Route path='/chats' element={<Chatpage />} />
            </Routes>
          </div>
        </div>
      </ChatContext.Provider>
    </div>
  )
}

export default App
