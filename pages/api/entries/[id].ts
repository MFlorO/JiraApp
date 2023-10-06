import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'
import { db } from '../../../data'
import { Entry, IEntry } from '../../../models'


type Data = 
    | { message: string }
    | IEntry



export default function handler ( req: NextApiRequest, res: NextApiResponse<Data> ) { 

    const { id } = req.query

    if( !mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'El id no es valido '})
    
    switch (req.method) {

        case 'PUT':
            return UpdateEntriesById(req, res); 
        
        case 'GET':
            return getEntriesByID(req, res); 
    
        default:
            break;
    }

    res.status(200).json({ message:'Example' })
}


const getEntriesByID = async ( req: NextApiRequest, res: NextApiResponse ) => {

    const { id } = req.query;
    
    await db.connect()
    const entrybyID = await Entry.findById(id)
    await db.disconnect()
    
    if(!entrybyID) return res.status(400).json({ message: `No hay entrada con ese id: ${id}` })

    res.status(200).json(entrybyID)
}



const UpdateEntriesById = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query
    
    await db.connect()
    
    const updateEntry = await Entry.findById(id)
    
    if(!updateEntry) {
        await db.disconnect()
        return res.status(400).json({ message: `No hay entrada con ese id: ${id}` })
    }
    
    const { description = updateEntry.description, status = updateEntry.status } = req.body

    try {
        //Reemplazo los valores del objeto por los modificados
        updateEntry.description = description
        updateEntry.status = status
        await updateEntry.save()

        await db.disconnect()
        res.status(200).json(updateEntry!)
        
    } catch (error) {
        console.log('error-updateEntryByID', error)
        await db.disconnect()
        res.status(400).json({ message: 'bad request' })
    }

}