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
import { NCFConfigForm} from '../NCFConfigForm'

type ComprobantesProps = {
  onAgregarComprobante: () => void;
}

export  function HeaderComprobantes(props:ComprobantesProps) {
     const [openCreate, setOpenCreate] = useState(false);
     if(openCreate){

      props.onAgregarComprobante();
     }
 

  return (
    <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Comprobante</h1>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogTrigger asChild>
                <Button variant="contained" color='primary' className='flex gap-2'>
                    <CirclePlus size={20}/>
                    Nuevo Comprobante
                </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[950px]">
                <DialogHeader>
                    <DialogTitle>Registro de Comprobante</DialogTitle>
                    <DialogDescription>
                        Agrega una nueva numeracion.
                    </DialogDescription>
                   
                </DialogHeader>
                <NCFConfigForm setOpenModalCreate={setOpenCreate}/>
            </DialogContent>
        </Dialog>
    </div>
  )
}

