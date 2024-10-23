"use client"
import { toast } from "@/components/ui/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  EyeIcon,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";


import { Inventario } from "@/app/(routes)/Models/Inventario";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { GridColDef } from "@mui/x-data-grid";


export const columns: GridColDef<Inventario>[] = [
   
   {
      field: "fecha_movimiento",
      headerName: "Fecha",
      width: 150,
      renderCell: ({ row }) => {
        const fecha = row.fecha_movimiento;
        const fechaFormateada = format(fecha? fecha.toString(): "", "dd/MM/yyyy");
        return <div>{fechaFormateada? fechaFormateada.toString(): ""}</div>;
      },
    }, 
    {
      field: "nombre",
      headerName: "Producto",
      width: 250,
    },
    {
      field: "tipo_movimiento",
      headerName: "Movimiento",
    },
  
    {
      field: "flag",
      headerName: "Tipo",
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
    },
    {
      field: "fullName",
      headerName: "Usuario",
      width:200,
    },
   
    {
      field: "Acciones",
      renderCell: ({ row }) => {
        const register = row;
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
             
              <Link href={`/inventario/view/${register.id}`}>
                <DropdownMenuItem>
                  <EyeIcon className="mr-2 h-4 w-4" /> Ver
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

export const columnsDisponible: ColumnDef<Inventario>[] = [
   
    {
       accessorKey: "categoria",
       header: "Categoria",
     }, 
     {
       accessorKey: "nombre",
       header: "Producto",
     },
     {
       accessorKey: "cantidad",
       header: "Disponible",
     },
   
     {
       accessorKey: "is_activo",
       header: "Estado",
       cell: ({ row }) => {
        const data=row.original;
        const state=data.isActivo?(data.cantidad>0? "secondary":"destructive"):"destructive";
        return(
        <Badge  variant={state}>
          {data.isActivo?(data.cantidad>0? "Disponible":" No Disponible"):"Innativo"}
        </Badge>
        )
      },
     },
   
   ];