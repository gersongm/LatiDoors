"use client"
import React ,{useEffect, useState} from 'react'
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
import { FormCreateInventario } from '../FormCreateInventario/FormCreateInventario'



export  function HeaderInventario() {
     const [openCreate, setOpenCreate] = useState(false)
 


  return (
    <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Inventario</h1>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
                <Button variant="outline" className='flex gap-2'>
                    <CirclePlus size={20}/>
                    Ajustes
                </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[725px]">
                <DialogHeader>
                    <DialogTitle>Ajustes del Inventario</DialogTitle>
                    <DialogDescription>
                        modifica el inventario.
                    </DialogDescription>
                   
                </DialogHeader>
                <FormCreateInventario setOpenModalCreate={setOpenCreate}/>
            </DialogContent>
        </Dialog>
    </div>
  )
}

