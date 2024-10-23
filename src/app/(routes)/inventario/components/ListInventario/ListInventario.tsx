"use client";

import sqlAll from "@/app/Backend/sql/sqlAll";
import { toast } from "@/components/ui/use-toast";

import React, { useEffect, useState } from "react";

import { ShowDataTable } from "@/components/ShowDataTable/ShowDataTable";
import { columns} from "./columns";
import { Inventario } from "@/app/(routes)/Models/Inventario";
import { sqlGetInventario} from "@/app/Backend/sql/sqlGetInventario";
import Box from "@mui/material/Box";
import { DataTable } from "@/components/ShowDataTable/DataTable";
import { GridRowsProp } from "@mui/x-data-grid";

export function ListInventario() {
  const [inventario, setInventario] = useState<GridRowsProp<Inventario>[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataInventario = await sqlGetInventario()

        setInventario(dataInventario as unknown as GridRowsProp< Inventario>[]);

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
        <h1 className="text-2xl font-bold">Entradas y Salidas</h1>
      </Box>
   {/*    <ShowDataTable
        columns={columns}
        data={inventario}
        titleFor="producto"
        filtro="nombre"
      /> */}
       
      <DataTable
        columns={columns}
        data={inventario}
      />
    </div>
  );
}
