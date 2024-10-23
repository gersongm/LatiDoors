"use client"
import React ,{useEffect, useState} from 'react'
import Button from '@mui/material/Button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { CirclePlus } from 'lucide-react'
import { FormCreateCliente } from '../FormCreateCliente/FormCreateCliente'

type ClientesProps = {
  onAgregarCliente: () => void;
}

export  function HeaderCliente(props:ClientesProps) {
     const [openCreate, setOpenCreate] = useState(false);
     if(openCreate){

      props.onAgregarCliente();
     }
 

  return (
    <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Cliente</h1>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
                <Button variant="contained" color='primary' className='flex gap-2'>
                    <CirclePlus size={20}/>
                    Nuevo Cliente
                </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[950px]">
                <DialogHeader>
                    <DialogTitle>Registro de Cliente</DialogTitle>
                    <DialogDescription>
                        Agrega un nuevo cliente.
                    </DialogDescription>
                   
                </DialogHeader>
                <FormCreateCliente setOpenModalCreate={setOpenCreate}/>
            </DialogContent>
        </Dialog>
    </div>
  )
}

