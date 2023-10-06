import { FC, createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Entry, EntryStatus } from '../../interfaces';
import { entriesApi } from '../../apis';
import { useSnackbar } from 'notistack';


interface ContextProps {
   entries: Entry[],
   addEntry: (description:string) => void,
   UpdateEntry: ( _id:string | string[] | undefined, description:string, status:EntryStatus, showNotif?:boolean) => void
}




export const EntriesContext = createContext({} as ContextProps);




export const EntriesProvider:FC<{ children: ReactNode }> = ({ children }) =>{ 

   const [entries, setEntries] = useState<Entry[]>([])
   const { enqueueSnackbar  } = useSnackbar()


   useEffect(() => {

    const fetchData = async () => {
      const response = await entriesApi.get<Entry[]>('/entries')
      if (!response) throw new Error(`HTTP entries - error: ${response}`)
      const { data } = response
      setEntries(data)
    }
 
    fetchData().catch((e) => console.error('An error occurred while fetching the data: ', e))
    
  }, [])
   

   const addEntry = async ( description:string ) => {

        try {
            const { data } = await entriesApi.post<Entry>('/entries', { description })
            
            setEntries([
                ...entries,
                data
            ])
            
        } catch (error) {
            console.log('error-addEntry-client', error)
        }

   }

   const UpdateEntry = async ( _id:string | string[] | undefined, description:string, status:EntryStatus, showNotif:boolean = false ) => {

        try {

          if(!_id) return

          const { data:entryId } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status } )

          entryId.status = status
          entryId.description = description

          if (showNotif) {
            enqueueSnackbar('Entrada actualizada', {
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }

            })
          }   

        } catch (error) {
            console.log('error-addEntry-client', error)
        }
        
   }


   return (
         <EntriesContext.Provider value={{ 
            entries, 

             //métodos
            addEntry,
            UpdateEntry 
        }}>
            {children}
         </EntriesContext.Provider>
   )
}



export const useEntriesContext = () => {

    const Context = useContext(EntriesContext);

    if (Context === undefined) throw Error('Esta fuera del contexto')

    return Context;
}





