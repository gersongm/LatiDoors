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

import { format } from "date-fns";
import { Mercancia } from "@/app/(routes)/Models/Mercancia";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";



export const columns: ColumnDef<Mercancia>[] = [
   
  {
    accessorKey: "id",
    header: "ID",
  },
    {
      accessorKey: "nombre",
      header: "Producto",
    },
    {
      accessorKey: "descripcion",
      header: "Descripción",
    },
  
    {
      accessorKey: "categoria",
      header: "Categoría",
    },
    {
      accessorKey: "suplidor",
      header: "Suplidor",
    },
    {
      accessorKey: "isActivo",
      header: "Estado",
      cell: ({ row }) => {
        const data=row.original;
        const state=data.isActivo?"secondary":"destructive";
        return(
        <Badge  variant={state}>
          {data.isActivo ? "Activo" : "Inactivo"}
        </Badge>
        )
      },
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
