import React from 'react'

import Box from '@mui/material/Box'
import { Container, Typography } from '@mui/material'
import './style.css'

const messages = [
  {
    id: 1,
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
    sender: 1,
    receiver: 2
  },
  {
    id: 2,
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
    sender: 2,
    receiver: 1
  },
  {
    id: 3,
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
    sender: 2,
    receiver: 1
  },
  {
    id: 4,
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
    sender: 1,
    receiver: 2
  }
]

export default function ChatBox () {
  const userId = 1

  return (
    <section className='msger'>
      <header className='msger-header'>
        <div className='msger-header-title'>
          {/* <i className="fas fa-comment-alt"></i> */}
          SimpleChat
        </div>
        {/* <div className='msger-header-options'>
          <span><i className="fas fa-cog"></i></span>
        </div> */}
      </header>
      {messages.map(message =>
        <main className='msger-chat'>
          <div
            className={`msg ${message.sender === userId
              ? 'left-msg'
              : 'right-msg'}`}
          >
            {/* <div
            className='msg-img'
            style='background-image: url(https://image.flaticon.com/icons/svg/327/327779.svg)'
          /> */}

            <div className='msg-bubble'>
              <div className='msg-info'>
                <div className='msg-info-name'>
                  BOT {message.sender}
                </div>
                <div className='msg-info-time'>12:45</div>
              </div>

              <div className='msg-text'>
                {message.text}
              </div>
            </div>
          </div>
        </main>
      )}
      <form className='msger-inputarea'>
        <input
          type='text'
          className='msger-input'
          placeholder='Enter your message...'
        />
        <button type='submit' className='msger-send-btn'>
          Send
        </button>
      </form>
    </section>
  )
}
