"use client";

import sqlAll from "@/app/Backend/sql/sqlAll";
import { toast } from "@/components/ui/use-toast";

import React, { useEffect, useState } from "react";

import { ShowDataTable } from "@/components/ShowDataTable/ShowDataTable";
import {  columnsDisponible } from "./columns";
import { Inventario } from "@/app/(routes)/Models/Inventario";
import {sqlGetInventarioDisponible } from "@/app/Backend/sql/sqlGetInventario";
import Box from "@mui/material/Box";

export function DisponibleInventario() {
  const [disponible,setDisponible]=useState<Inventario[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
      

        const disponibleInventario=await sqlGetInventarioDisponible();

        setDisponible(disponibleInventario as unknown as Inventario[]);
      } catch (error) {
        toast({
          description: "Error al cargar los datos",
          title: "Error",
        });
      }
    };

    fetchData(); // Fetch data on component mount
  }, []);
  return (
  
    <div className="mt-5 ">
      <Box>
        <h1 className="text-2xl font-bold">Productos Disponibles</h1>
      </Box>
        <ShowDataTable
        columns={columnsDisponible }
        data={disponible}
        titleFor="producto"
        filtro="nombre"
      />
  
    </div>
  );
}
