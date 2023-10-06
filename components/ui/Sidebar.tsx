import { FC } from 'react'
import { Drawer, Box, Divider, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { useUIContext } from '../../context';


const menuItems: string[] = ['Inbox', 'Starrred', 'Send Email', 'Drafts']


const Sidebar:FC = () => {

  const { sidemenuOpen, changeUISidebar } = useUIContext()
    
  return (
    <Drawer anchor='left' open={sidemenuOpen} onClose={ changeUISidebar }>
        <Box width='250px'>

            <Box padding='5px 10px'>
                <Typography variant='h4'>Menú</Typography>
            </Box>

            <List>
                {
                    menuItems?.map( (item, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>{ index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon /> }</ListItemIcon>
                            <ListItemText primary={ item } />
                        </ListItem>
                    ))
                }
            </List>

            <Divider />

            <List>
                {
                    menuItems?.map( (item, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>{ index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon /> }</ListItemIcon>
                            <ListItemText primary={ item } />
                        </ListItem>
                    ))
                }
            </List>

        </Box>
    </Drawer>
  )
}

export default Sidebar