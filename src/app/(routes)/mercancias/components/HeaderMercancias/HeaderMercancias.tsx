"use client"
import React ,{useState} from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { CirclePlus } from 'lucide-react'

import  {FormCreateMercancia}  from '../formCreateMercancia/formCreateMercancias'

export const HeaderMercancias = () => {


    const [openCreate, setOpenCreate] = useState(false)
 

  return (
    <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Listado de Productos/Servicios</h1>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
                <Button variant="outline" className='flex gap-2'>
                    <CirclePlus size={20}/>
                    Nuevo Producto/Servicio
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px]">
                <DialogHeader>
                    <DialogTitle>Nuevo Producto/Servicio</DialogTitle>
                    <DialogDescription>
                        crea un nuevo Producto/Servicio
                    </DialogDescription>
                   
                </DialogHeader>
                <FormCreateMercancia setOpenModalCreate={setOpenCreate}/>
            </DialogContent>
        </Dialog>
    </div>
  )


}
