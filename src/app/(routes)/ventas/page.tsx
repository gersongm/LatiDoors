'use client'

import { sqlGetVentas } from "@/app/Backend/sql/sqlGetVentas";
import { toast } from "@/components/ui/use-toast";
import { GridRowsProp } from "@mui/x-data-grid";
import { Ventas} from "../Models/Ventas";
import FacturacionComponent from "./ListVentas/page";

import React, { useEffect, useState } from 'react'

import {  Flip, ToastContainer } from 'react-toastify';

export default function page() {

  const [ventas, setVentas] = useState<GridRowsProp<Ventas>>([]);
  const [updateVentas,setUpdateVentas] = useState(false);
  
    const handleAgregarCliente  =()=>{
      setUpdateVentas(!updateVentas);
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
          const dataVentas = await sqlGetVentas() as Ventas[]
      
          setVentas(dataVentas as unknown as GridRowsProp<Ventas>);
  
        } catch (error) {
          toast({
            description: "Error al cargar los datos",
            title: "Error",
          });
        }
      };
      setUpdateVentas(false);
  
      fetchData(); // Fetch data on component mount
    }, [updateVentas]);

 function handleUpdateVentas(){
    setUpdateVentas(!updateVentas);
  }
  return (
    <div>
      <FacturacionComponent ventas={ventas} UptadeVentas={handleUpdateVentas}/>
    </div>
  )
}
