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
import { Banco } from "@/app/(routes)/Models/Banco";


export const columns: ColumnDef<Banco>[] = [
    {
      accessorKey: "nombre",
      header: "Nombre",
    },
    {
      accessorKey: "nCuenta",
      header: "N° Cuenta",
    },
    {
      accessorKey: "tipo",
      header: "Tipo Cuenta",
    },
    {
      accessorKey: "flag",
      header: "Moneda",
    },
    {
      accessorKey: "fecha_corte",
      header: "Fecha Corte",
    },
    {
      accessorKey: "cuenta",
      header: "Cuenta Contable",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const banco = row.original as Banco;
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>Acciones</DropdownMenuLabel> */}
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(banco.id);
  
                  toast({
                    title: "Copiado",
                    description: (
                      <p className="inline-flex gap-2">
                        <Copy /> Se copio el banco {banco.id}
                      </p>
                    ),
                  });
                }}
              >
                <CopyIcon className="mr-2 h-4 w-4" /> Copiar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href={`/Admin/bancos/view/${banco.id}`}>
                <DropdownMenuItem>
                  <EyeIcon className="mr-2 h-4 w-4" /> Ver
                </DropdownMenuItem>
              </Link>
              <Link href={`/Admin/bancos/${banco.id}`}>
                <DropdownMenuItem>
                  <Edit2Icon className="mr-2 h-4 w-4" /> Editar
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={async () => {
                  const saveBanco = await sqlDelete("tbl_bancos", banco.id);
                  if (saveBanco) {
                  toast({
                    title: "Borrado",
                    description: (
                      <p className="inline-flex gap-2">
                        <SaveAll />  {saveBanco.respuesta} 
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