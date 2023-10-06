import { FC } from "react"
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useUIContext } from "../../context";


const Navbar:FC = () => {

  const { changeUISidebar } = useUIContext()

  return (
    <AppBar position="sticky" elevation={0}>
        <Toolbar>
            <IconButton onClick={ changeUISidebar }>
                <MenuIcon />
            </IconButton>
            <Typography variant='h6'>Jira</Typography>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar