
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../data';
import { Entry } from '../../models';

type Data = {
    message: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

  if( process.env.NODE_ENV === 'production') return res.status(401).json({ message: 'No tiene acceso a este servicio'}); //*Para no publicar la base de datos en produccion

  await db.connect()
  await Entry.deleteMany(); //Borrar todo
  await Entry.insertMany(seedData.entries); //Inserto los seed-data de la carpeta data
  await db.disconnect()


  res.status(200).json({ message: 'Proceso realizado correctamente' })
  
}
