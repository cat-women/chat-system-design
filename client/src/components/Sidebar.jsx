import React, { useState } from 'react'
import { createGroupChat } from '../actions/chat'
import { searchUsers } from '../actions/user'

import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal, Box, Input, Grid
} from '@mui/material'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function Sidebar({ chats }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState()
  const [users, setUsers] = useState([])
  const [potenUser, setPotenUser] = useState([])
  const [ids, setIds] = useState([])


  const handleCreateGroupChat = async (e) => {
    e.preventDefault()
    const res = await createGroupChat({ name, users: ids })
    if (res.status === 200) {
      setPotenUser(res.data)
      alert("New group created")
    } else
      alert("Could not create group chat")
    setPotenUser([])
    setOpen(false)
    return
  }

  const handleChange = async (e) => {
    e.preventDefault()
    const value = e.target.value;
    const res = await searchUsers(value)
    console.log("response from search ", res);
    setPotenUser(res.data)
    e.target.value = '';
  }
  const addUser = (id, username) => {
    setIds(prevUsers => [...prevUsers, id]);
    setUsers(prevUsers => [...prevUsers, username]);
    setPotenUser(potenUser.filter(user => user._id !== id));

    console.log("all users", users, ids);
  }
  return (
    <container className='sidebar-container'>
      <div className='sidebar-header'>
        <Typography className='sidebar-title'>My Chats</Typography>
        <Button sx={{ padding: '0px', marginLeft: '120px' }} onClick={handleOpen}>
          Create Group
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Group
            </Typography>
            <form onSubmit={(e) => handleCreateGroupChat(e)}>
              <Input
                name="name"
                placeholder="Group name"
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />

              <Grid sx={{ display: 'flex' }}>
                {users.length > 0 && users.map(user =>
                  <Typography sx={{ margin: '10px' }}>{user}</Typography>
                )}
              </Grid>
              <Input
                name="users"
                placeholder="User"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleChange(e);
                  }
                }} />

              <Grid>
                {potenUser.length > 0 && potenUser.map(user =>
                  <Button sx={{ margin: '10px' }} onClick={(e) => { addUser(user._id, user.username) }} value={user}>{user.username}
                  </Button>
                )}
              </Grid>

              <Button type="submit">
                Create Group
              </Button>
            </form>
          </Box>
        </Modal>
      </div>

      <List>
        {chats && chats.map(chat =>
          <ListItem disablePadding>
            <ListItemButton>
              {/* <ListItemIcon>
                      <InboxIcon />
                      </ListItemIcon> */}
              <ListItemText primary={chat.chatName} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </container>
  )
}
