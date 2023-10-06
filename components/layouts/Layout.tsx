import { FC, ReactNode } from 'react'
import { Navbar, Sidebar} from '../ui';
import { Box } from '@mui/material'
import HeadJira from '../HeadJira';


interface Props {
    title?: string,
    children: ReactNode; // Agrega children de tipo ReactNode
}


const Layout:FC<Props> = ({ title = 'Jira', children }) => {
  return (
    <Box flexGrow={1}>

        <HeadJira title={title} />

        <Navbar />
        <Sidebar />

        <Box>
            { children }
        </Box>

    </Box>
  )
}

export default Layout
