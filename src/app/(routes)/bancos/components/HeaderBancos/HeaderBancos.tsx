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
import { FormCreateBanco } from '../FormCreateBanco'

export  function HeaderBancos(UdateBank:(bank:boolean)=>void) {
    const [openCreate, setOpenCreate] = useState(false)
    const handleUpdateBank = (bank:boolean) => {
        UdateBank(bank);
      };

  return (
    <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Listado de Bancos</h1>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
                <Button variant="outline" className='flex gap-2'>
                    <CirclePlus size={20}/>
                    Nuevo Banco
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[725px]">
                <DialogHeader>
                    <DialogTitle>Nuevo Banco</DialogTitle>
                    <DialogDescription>
                        crea un nuevo banco
                    </DialogDescription>
                   
                </DialogHeader>
                <FormCreateBanco setOpenModalCreate={setOpenCreate}/>
            </DialogContent>
        </Dialog>
    </div>
  )
}
