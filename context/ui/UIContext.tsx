import { FC, ReactNode, createContext, useContext, useState } from "react";


interface ContextUIProps {
  sidemenuOpen?: boolean,
  changeUISidebar?: () => void,
  isAddingEntry: boolean,
  changeIsAddingEntry: (isAdding:boolean) => void,
  isDragging: boolean,
  changeIsDragging: (isDragging:boolean) => void,
  modalEntry: boolean,
  changeModalEntry: () => void,
}


export const UIContext = createContext({} as ContextUIProps) //Estado del contexto



export const UIProvider:FC<{ children: ReactNode }> = ({ children }) => {

  const [sidemenuOpen, setSidemenuOpen] = useState(false);
  const [isAddingEntry, setisAddingEntry] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [modalEntry, setModalEntry] = useState(false)

  const changeUISidebar = () => setSidemenuOpen(!sidemenuOpen)
  const changeIsAddingEntry = (isAdding:boolean) => setisAddingEntry(isAdding)
  const changeIsDragging = (isDragging:boolean) => setIsDragging(isDragging)
  const changeModalEntry = () => setModalEntry(!modalEntry)

  return(
    <UIContext.Provider value={{ 
      sidemenuOpen, 
      isAddingEntry,
      isDragging,

      //métodos
      changeIsAddingEntry,
      changeUISidebar,
      changeIsDragging,
      changeModalEntry,
      modalEntry
    }}>
      { children }
    </UIContext.Provider>
  )
}



export const useUIContext = () => {   //Cuando se quiera utilizar el context y esta fuera tira un Error

  const Context = useContext(UIContext);

  if (Context === undefined) throw Error('Esta fuera del contexto')
  
  return Context;
}


