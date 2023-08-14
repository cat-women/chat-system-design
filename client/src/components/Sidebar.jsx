import React from 'react'
import styled from 'styled-components'
import SidebarItems from './SidebarItem'
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material'

export default function Sidebar () {
  return (
    <container className='sidebar-container'>
      <div className='sidebar-header'>
        <Typography className='sidebar-title'>My Chats</Typography>
        <Button sx={{ padding: '0px', marginLeft: '120px' }}>
          Create Group
        </Button>
      </div>

      <List>
        {SidebarItems.map(item =>
          <ListItem disablePadding>
            <ListItemButton>
              {/* <ListItemIcon>
                      <InboxIcon />
                      </ListItemIcon> */}
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </container>
  )
}
