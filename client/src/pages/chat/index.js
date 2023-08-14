import React, { useContext } from 'react'
import styles from './styles.module.css'

import ChatContext from '../../Context'
import MyChats from '../../components/mychats'
import ChatBox from '../../components/chatBox'

function ChatPage () {
  const { username, setUsername } = useContext(ChatContext)
  console.log(username)
  const user = 'new user'
  return (
    <div>
      <h1>Welcome to Chat</h1>
      {user && <ChatBox />}
    </div>
  )
}

export default ChatPage
