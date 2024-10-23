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
import { FormCreateCompra } from '../FormCreateCompra'

export  function HeaderCompras() {
    const [openCreate, setOpenCreate] = useState(false)
 

  return (
    <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Listado de Compras</h1>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
                <Button variant="outline" className='flex gap-2'>
                    <CirclePlus size={20}/>
                    Nueva Compra
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px]">
                <DialogHeader>
                    <DialogTitle>Nueva Compra</DialogTitle>
                    <DialogDescription>
                        crea un nueva compra
                    </DialogDescription>
                   
                </DialogHeader>
                <FormCreateCompra setOpenModalCreate={setOpenCreate}/>
            </DialogContent>
        </Dialog>
    </div>
  )
}

