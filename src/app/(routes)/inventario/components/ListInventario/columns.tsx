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
import { Inventario } from "@/app/(routes)/Models/Inventario";


export const columns: ColumnDef<Inventario>[] = [
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
      accessorKey: "flag",
      header: "Tipo",
    },
    {
      accessorKey: "cantidad",
      header: "Disponible",
    },
    {
      accessorKey: "fullName",
      header: "Usuario",
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
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];