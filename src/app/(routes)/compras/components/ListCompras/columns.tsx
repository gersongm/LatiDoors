"use client";

import { toast } from "@/components/ui/use-toast";

import {  Eye, Trash2 } from "lucide-react";

import { sqlDelete } from "@/app/Backend/sql/sqlAll";
import { Compra } from "@/app/(routes)/Models/Compra";

import { currencyFormatter } from "@/funtions";
import {
  GridActionsCellItem,
  GridColDef,
} from "@mui/x-data-grid";
import Link from "next/link";



 const deleteCompra = async (id: string) => {

  try {
    const response = await sqlDelete("tbl_facturas_suplidores", id);
    if (response) {
      toast({
        title: "Borrado",
        description: (
          <p className="inline-flex gap-2">
            <Trash2 /> {response.respuesta}
          </p>
        ),
      });
     
    }
  } catch (error) {
    toast({
      title: "Error",
      description: (
        <p className="inline-flex gap-2">
          <Trash2 className="mr-2 h-4 w-4" /> Hubo un error al borrar la
          compra
        </p>
      ),
    });
  }
};

export   const columns:GridColDef<Compra>[] =[

  { field: "numero_factura", flex: 1, headerName: "Factura" },
  { field: "ncf", flex: 1, headerName: "NCF" },
  { field: "nombre", flex: 1, headerName: "Suplidor" },
  {
    field: "fecha_emision",
    flex: 1,
    type: "date",
    headerName: "Emisión",
    valueGetter: (value: string) => value && new Date(value),
  },
  {
    field: "fecha_vencimiento",
    flex: 1,
    type: "date",
    headerName: "Vencimiento",
    valueGetter: (value: string) => value && new Date(value),
  },
  { field: "moneda", flex: 1, headerName: "Moneda" },
  {
    field: "monto",
    flex: 1,
    headerName: "Monto",
    valueFormatter: (params: number) => currencyFormatter(params),
  },
  { field: "metodo", flex: 1, headerName: "Método Pago" },
  {
    field: "actions",
    headerName: "Acciones",
    width: 80,
    sortable: false,
    headerAlign: "center",
    
    renderCell(params) {
        return (
        <div className="flex">
            <GridActionsCellItem
            icon={<Trash2 color="red"/>}
            label="Borrar"
            onClick={()=>deleteCompra(params.row.id)}
           
          />
           <Link href={`/compras/${params.row.id}`}>
            <GridActionsCellItem
            icon={<Eye color="blue"/>}
            label="Ver"
            onClick={()=>{}}
          />
         </Link>
        </div>
      );
    }
  },
 
]
