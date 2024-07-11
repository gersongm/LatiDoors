"use client"
import { toast } from "@/components/ui/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Copy,
  CopyIcon,
  DeleteIcon,
  Edit2Icon,
  EyeIcon,
  MoreHorizontal,
  SaveAll,
} from "lucide-react";
import Link from "next/link";

import { sqlDelete } from "@/app/Backend/sql/sqlAll";
import { Mercancia } from "@/app/(routes)/Models/Mercancia";


export const columns: ColumnDef<Mercancia>[] = [
     {
        accessorKey: "nombre",
        header: "Producto",
      },
    {
      accessorKey: "fecha_movimiento",
      header: "Fecha",
    },
    {
      accessorKey: "tipo_movimiento",
      header: "Movimiento",
    },
  
    {
      accessorKey: "suplidor_id",
      header: "Suplidor",
    },
    {
      accessorKey: "fecha_ingres",
      header: "Fecha Ingreso",
    },
    {
      accessorKey: "almacen_id",
      header: "Almacen",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const register = row.original;
  
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
              <Link href={`/inventario/${register.id}`}>
                <DropdownMenuItem>
                  <Edit2Icon className="mr-2 h-4 w-4" /> Editar
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                disabled={true}
                onClick={async () => {
                  const deletedRegister = await sqlDelete("tbl_inventario", register.id);
                  if (deletedRegister) {
                  toast({
                    title: "Borrado",
                    description: (
                      <p className="inline-flex gap-2">
                        <SaveAll />  {deletedRegister.respuesta} 
                      </p>
                    ),
                  });
                   }
                
                }}
              >
                <DeleteIcon className="mr-2 h-4 w-4" /> Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];