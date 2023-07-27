import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const Home = props => {
  const navigate = useNavigate()
  const { username, setUsername, room, setRoom, socket } = props

  const joinRoom = () => {
    if (!room || !username) {
      alert('Enter username and room ')
      return
    }
    socket.emit('join_room', { username, room })
    navigate('/chat', { replace: true })
  }
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>Join room</>`}</h1>
        <input
          name='username'
          className={styles.input}
          placeholder='Username...'
          onChange={e => setUsername(e.target.value)}
        />

        <select
          className={styles.input}
          onChange={e => setRoom(e.target.value)}
        >
          <option>-- Select Room --</option>
          <option value='javascript'>JavaScript</option>
          <option value='node'>Node</option>
          <option value='express'>Express</option>
          <option value='react'>React</option>
        </select>

        <button className='btn btn-secondary' onClick={joinRoom}>
          Join Room
        </button>
      </div>
    </div>
  )
}

export default Home
