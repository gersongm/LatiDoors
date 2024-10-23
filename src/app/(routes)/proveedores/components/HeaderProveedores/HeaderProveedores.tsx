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
import { FormCreateProveedores } from '../FormCreateProveedores'

export  function HeaderProveedores() {
    const [openCreate, setOpenCreate] = useState(false)
 

  return (
    <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Listado de suplidores</h1>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
                <Button variant="outline" className='flex gap-2'>
                    <CirclePlus size={20}/>
                    Nueva Suplidor
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px]">
                <DialogHeader className=' border-sky-300'>
                    <DialogTitle>Nuevo Suplidor</DialogTitle>
                    <DialogDescription>
                        crea un nuevo suplidor
                    </DialogDescription>
                   
                </DialogHeader>
                <FormCreateProveedores setOpenModalCreate={setOpenCreate}/>
            </DialogContent>
        </Dialog>
    </div>
  )
}

