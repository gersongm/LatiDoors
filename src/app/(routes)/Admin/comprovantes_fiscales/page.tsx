import { NCFConfigForm } from "./components/NCFConfigForm";



'use client'
import React, { useEffect } from 'react'
import ListCOmprobantes from './components/ListComprobantes/ListComprobantes'
import {HeaderComprobantes} from './components/HeaderComprobantes/HeaderComprobantes'
import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { GridRowsProp } from '@mui/x-data-grid'
import { ComprobantesFiscales as CFiscales } from "../../Models/ComprobantesFiscales";
import { sqlGetCliente } from '@/app/Backend/sql/sqlGetClientes'
import { ToastContainer, Flip } from 'react-toastify'
import AllData from "@/app/Backend/sql/sqlAll";

export default function ComprobantesFiscales() {
  const [comprobantes, setComprobantes] = useState<GridRowsProp<CFiscales>[]>([]);
const [updateComprobantes,setUpdateComprobantes] = useState(false);

  const handleAgregarCliente  =()=>{
    setUpdateComprobantes(!updateComprobantes);
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
        const dataComprobantes = await AllData("tbl_comprobantes") as CFiscales[]
     
        setComprobantes(dataComprobantes as unknown as GridRowsProp<CFiscales>[]);
        

      } catch (error) {
        toast({
          description: "Error al cargar los datos",
          title: "Error",
        });
      }
    };
    setUpdateComprobantes(false);

    fetchData(); // Fetch data on component mount
  }, [updateComprobantes]);

  


  return (
    <div>
      <HeaderComprobantes  onAgregarComprobante={handleAgregarCliente}/>
      <ListCOmprobantes comprobantes={comprobantes}  />
      </div>
  )
}