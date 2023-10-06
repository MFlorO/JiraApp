import { FC, useMemo, DragEvent, CSSProperties } from "react"
import { EntryStatus } from "../../interfaces"
import { useEntriesContext, useUIContext } from "../../context"
import EntryCard from "./EntryCard"
import { Paper, List } from "@mui/material"


interface Props {
  status: EntryStatus
}


const EntryListItem:FC<Props> = ({ status }) => {

  const { entries } = useEntriesContext()
  const { isDragging, changeIsDragging } = useUIContext()

  const entriesByStatus = entries?.filter( entry => entry.status === status )
  
  const allowDrop = ( event: DragEvent<HTMLDivElement>) => event.preventDefault()

  const onDropEntry = ( event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text')
    const entry = entries.find( e => e._id === id)!; //Siempre va a tener un valor por eso agrego el !
    entry.status = status //Tengo que cambiar el status porque sino va seguir en pending y nunca va a actualizarse
    changeIsDragging(false)
  }

  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop} style={ isDragging ? dragging : undefined } >
      <Paper sx={{ minHeight:'100vh', height:'max-content', overflowY:'auto', bgcolor:'transparent', padding:'1px 4px' }}>

        <List sx={{ opacity: isDragging ? 0.2 : 1, transition:'all 0.3s' }}>
          { entriesByStatus?.map( entry => <EntryCard key={entry._id} {...entry} />) }
        </List>

      </Paper>
    </div>
  )
}

export default EntryListItem;


const dragging:CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.1)',
  borderRadius: '10px',
  border: '1px dashed white'
}
