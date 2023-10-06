import { ChangeEvent, useState } from "react";
import { NextPage } from "next"
import { useRouter } from "next/router";
import { EntryStatus } from "../interfaces";
import { useEntriesContext, useUIContext } from "../context";
import { Box, Card, CardContent, CardActions, capitalize ,Button, CardHeader, Grid, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']


interface Props {
    modal: Boolean;
    onChange: () => void;
}



const Entry: NextPage<Props> = ({ modal, onChange }) => {

    const { UpdateEntry } = useEntriesContext()
    const { changeModalEntry } = useUIContext()
    const { query:{ id } } = useRouter()

    const [touched, setTouched] = useState(false);
    const [inputValue, setInputValue] = useState('')
    const [status, setStatus] = useState<EntryStatus>('pending')

    const onTextFieldChanged = (event:ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)
    const onStatusChanged = (event:ChangeEvent<HTMLInputElement>) => setStatus(event.target.value as EntryStatus)

    const onChangeEntry = (id:string | string[] | undefined, inputValue:string , status:EntryStatus) => {
        if(inputValue.trim().length === 0) return
        UpdateEntry(id, inputValue, status, true)
        changeModalEntry()
    }


    return (
        <Box width='100%' height='100vh' position='absolute' top={0} display='flex' justifyContent='center' bgcolor={modal && 'RGB(0,0,0,0.6)'}>
        <Grid width='50%' height='max-content' justifyContent='center' mt={20} p={2} bgcolor='black' >
            <Grid mb={2}>
                <Button onClick={onChange}>CLOSE</Button>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>

                <Card>
                    <CardHeader title={`Entrada: ${inputValue}`} subheader={`Creada hace ... minutos`} ></CardHeader>
                </Card>

                <CardContent sx={{ display:'flex', flexDirection:'column' }}>
                    <TextField 
                        label="Modificar entrada" 
                        autoFocus 
                        multiline
                        sx={{ my:2 }}
                        value={inputValue} 
                        onChange={onTextFieldChanged} 
                        onBlur={ () => setTouched(true) }  //cuando se toca
                        helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor'}
                        error={ inputValue.length <= 0 && touched }
                    />

                    <FormControl>
                        <FormLabel>Estado: </FormLabel>
                        <RadioGroup row value={ status } onChange={onStatusChanged}>
                            { validStatus?.map( option => <FormControlLabel key={option} value={option} control={<Radio />} label={capitalize(option)} /> ) }
                        </RadioGroup>
                    </FormControl>
                </CardContent>

                <CardActions>
                    <Button startIcon={<SaveAltOutlinedIcon />} variant="contained" fullWidth onClick={() => onChangeEntry( id, inputValue, status )} disabled={ inputValue.length === 0 }>
                        Save
                    </Button>
                    <Button startIcon={<DeleteOutlineOutlinedIcon />} variant="contained" color="error">Delete</Button>
                </CardActions>                

            </Grid>
        </Grid>
        </Box>
    )
  };
  
  export default Entry;
