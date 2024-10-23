'use client'
import React, { useEffect } from 'react'
import ListClientes from './components/ListClientes/ListClientes'
import {HeaderCliente} from './components/HeaderCliente/HeaderCliente'
import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { GridRowsProp } from '@mui/x-data-grid'
import { Cliente } from '../Models/Cliente'
import { sqlGetCliente } from '@/app/Backend/sql/sqlGetClientes'
import { ToastContainer, Flip } from 'react-toastify'

export default function Clientes() {
  const [clientes, setClientes] = useState<GridRowsProp<Cliente>[]>([]);
const [updateClientes,setUpdateCliente] = useState(false);

  const handleAgregarCliente  =()=>{
    setUpdateCliente(!updateClientes);
    <ToastContainer
    position="bottom-center"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition={Flip}
    />
   { "Registro guardado con éxito"}
    <ToastContainer />
  
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataClientes = await sqlGetCliente() as Cliente[]
     
        setClientes(dataClientes as unknown as GridRowsProp<Cliente>[]);

      } catch (error) {
        toast({
          description: "Error al cargar los datos",
          title: "Error",
        });
      }
    };
    setUpdateCliente(false);

    fetchData(); // Fetch data on component mount
  }, [updateClientes]);

  


  return (
    <div>
      <HeaderCliente  onAgregarCliente={handleAgregarCliente}/>
      <ListClientes clientes={clientes}  />
      </div>
  )
}