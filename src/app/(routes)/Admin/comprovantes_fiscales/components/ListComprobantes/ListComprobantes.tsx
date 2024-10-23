"use client";

import { columns} from "./columns";
import { ComprobantesFiscales } from "@/app/(routes)/Models/ComprobantesFiscales";
import Box from "@mui/material/Box";
import { DataTable } from "@/components/ShowDataTable/DataTable";
import { GridRowsProp } from "@mui/x-data-grid";

type ComprobanteProps={
  comprobantes:GridRowsProp<ComprobantesFiscales>[];
}

export default function ListClientes(props:ComprobanteProps) {
  const {comprobantes} =props ;


  return (
    <div className="mt-5 ">
         <Box>
        <h1 className="text-2xl font-bold">Numeración de Comprobantes</h1>
      </Box>
   {/*    <ShowDataTable
        columns={columns}
        data={inventario}
        titleFor="producto"
        filtro="nombre"
      /> */}
       
      <DataTable
        
        columns={columns}
        data={comprobantes}
      />
    </div>
  );
}
