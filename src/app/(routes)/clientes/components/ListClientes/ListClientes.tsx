"use client";

import { columns} from "./columns";
import { Cliente } from "@/app/(routes)/Models/Cliente";
import Box from "@mui/material/Box";
import { DataTable } from "@/components/ShowDataTable/DataTable";
import { GridRowsProp } from "@mui/x-data-grid";

type ClienteProps={
  clientes:GridRowsProp<Cliente>[];
}

export default function ListClientes(props:ClienteProps) {
  const {clientes} =props ;


  return (
    <div className="mt-5 ">
         <Box>
        <h1 className="text-2xl font-bold">Gestion de Clientes</h1>
      </Box>
   {/*    <ShowDataTable
        columns={columns}
        data={inventario}
        titleFor="producto"
        filtro="nombre"
      /> */}
       
      <DataTable
        
        columns={columns}
        data={clientes}
      />
    </div>
  );
}
