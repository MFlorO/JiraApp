import { ChangeEvent, FC, useState } from 'react'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Box, Button, TextField } from '@mui/material'
import { useEntriesContext, useUIContext } from '../../context';

const NewEntry:FC = () => {

    const { addEntry } = useEntriesContext()
    const { isAddingEntry, changeIsAddingEntry } = useUIContext()

    const [inputValue, setInputValue] = useState("")

    const [touched, setTouched] = useState(false)

    const onInputChange = ( event: ChangeEvent<HTMLInputElement> ) => setInputValue(event.target.value)

    const onSave = () => {
        
        if(inputValue.length === 0) return

        addEntry(inputValue)

        changeIsAddingEntry(false)
        setTouched(false)
        setInputValue("")
    }

    
  return (
    <Box mb={2} px={1}>
    { 
        !isAddingEntry 
        
        ? <Button variant='outlined' color='secondary' fullWidth startIcon={<AddOutlinedIcon /> } onClick={() => changeIsAddingEntry(true)}>Agregar Tarea</Button>

        : <>
            <TextField
            label='Nueva entrada'
            helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor'}
            error={ inputValue.length <= 0 && touched }
            value={inputValue}
            onChange={onInputChange}
            onBlur={ () => setTouched(true) }
            autoFocus
            multiline
            fullWidth 
            sx={{ marginY: 2 }}
            />

            <Box display='flex' justifyContent='space-between'>
                <Button variant='outlined' color='secondary' endIcon={<SaveOutlinedIcon /> } onClick={onSave}>Guardar</Button>
                <Button variant='outlined' color='error' onClick={() => changeIsAddingEntry(false)}>CANCELAR</Button>
            </Box>
        </>
    }
    </Box>
  )
}

export default NewEntry