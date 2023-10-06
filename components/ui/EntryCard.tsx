import { FC, DragEvent } from 'react'
import { useRouter } from 'next/router'
import { Entry } from '../../interfaces'
import { useUIContext } from '../../context/ui/UIContext'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Card, CardActions, CardActionArea, CardContent, Typography, Button } from "@mui/material"


const EntryCard:FC<Entry> = ({ description, _id }) => {

  const { push } = useRouter()

  const { changeIsDragging, changeModalEntry } = useUIContext()

  const onDragStart = (event:DragEvent) => {
    event.dataTransfer.setData('text', _id)
    changeIsDragging(true)
  }

  const onChangeQuery = (_id:string) => {
    push({
      pathname: '/',
      query: { id: _id }, // Aquí puedes definir el nombre del parámetro de consulta
    })
  }
  
  return (
    <Card sx={{marginBottom: 1}} draggable onDragStart={onDragStart} onDragEnd={() => changeIsDragging(false)} onClick={() => onChangeQuery(_id)}>
      <CardActionArea>
        
          <CardActions onClick={changeModalEntry}>
            <Button startIcon={<ModeEditOutlinedIcon/>}>EDITAR</Button>
            <Button color='error' startIcon={<DeleteOutlineOutlinedIcon/>}>ELIMINAR</Button>
          </CardActions>

          <CardContent>
            <Typography whiteSpace='pre-line'>{description}</Typography>
          </CardContent>

          <CardActions sx={{ display:'flex', justifyContent:'end', paddingLeft:2 }} >
            <Typography variant='body2'>hace 30 minutos</Typography>
          </CardActions>
      </CardActionArea>
    </Card>
  )
}

export default EntryCard