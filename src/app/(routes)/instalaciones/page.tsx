"use client"

import { auth } from "@clerk/nextjs/server"
import {redirect} from "next/navigation"
import { useEffect, useState } from "react";
import { Instalacion } from "../Models/Instalacion";
import  { sqlWhere } from "@/app/Backend/sql/sqlAll";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Calendar } from "./components/Calendar";
import { Loading } from "@/components/Loading";

export default function InstalacionPage() {


const [instalaciones, setInstalaciones] = useState<Instalacion[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const allInstalaciones = await sqlWhere("tbl_instalaciones","WHERE is_Activo=1");
      setInstalaciones(allInstalaciones as Instalacion[]);

    
    } 
    catch (error) {
     toast({
        variant: "destructive",
        title: "Uff! Algo salió mal.",
        description: "Hubo un problema con su solicitud.",
        action: <ToastAction onClick={()=>fetchData()} altText="Try again">Reintentar</ToastAction>,
      });
      
      
      // Handle error gracefully, e.g., display an error message
    }
    finally{
      setIsLoading(false);
    }
  };

  fetchData(); // Fetch data on component mount
}, [isLoading===true]);

  return (
    isLoading ? <Loading/> :
    <div><Calendar instalaciones={instalaciones} Recargar={setIsLoading}/></div>
  )
}
