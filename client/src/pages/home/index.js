import { Button } from '@mui/material'
import { useEffect } from 'react'

function Homepage({ socket }) {
  const onSocket = () => {

   socket.emit("sendToServer", `Hello server ${socket.id}`);

  }
  return (
    <div>
      <h1>This is home</h1>
      <Button onClick={onSocket}>Click here</Button>
    </div>
  )
}

export default Homepage
