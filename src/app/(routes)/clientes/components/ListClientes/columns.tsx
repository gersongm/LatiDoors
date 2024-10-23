"use client";

import { toast } from "@/components/ui/use-toast";

import { Check, EyeIcon, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { sqlDelete } from "@/app/Backend/sql/sqlAll";
import { Cliente } from "@/app/(routes)/Models/Cliente";

import { currencyFormatter } from "@/funtions";

import Link from "next/link";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import { useRouter } from 'next/navigation';
import { useState } from "react";
import DialogConfirmation from "@/components/DialogConfirmation/DialogConfirmation";
import ConfirmDeleteDialog from "@/components/DialogConfirmation/DialogConfirmation";

export const columns: GridColDef<Cliente>[] = [
  { field: "id", headerName: "ID", width: 20 },
  { field: "nombre", headerName: "Nombres", width: 300 },
  { field: "telefono", headerName: "Teléfono", width: 150 },
  {
    field: "fecha_creacion",
    type: "date",
    headerName: "Fecha Creación",
    width: 120,
    valueGetter: (value: string) => value && new Date(value),
  },
  {
    field: "limite_credito",
    headerName: "Limite de Credito",
    type: "number",
    width: 150,
    valueFormatter: (params: number) => currencyFormatter(params),
  },
  {
    field: "isActivo",
    headerName: "Estado",
    renderCell(params) {
      const data = params.row;
      const state = data.isActivo ? "secondary" : "destructive";
      return (
        <Badge   color={state} variant={state}>{
         data.isActivo ? <Check/>:<X/>}
         { data.isActivo ? "Activo" : "Inactivo"}
          </Badge>
      );
    },
  },
  {
    field: "actions",
    headerName: "Acciones",
    width: 80,
    sortable: false,
    headerAlign: "center",

    renderCell(params) {
      const router = useRouter();
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      const handleDeleteClick = () => {
        setIsDialogOpen(true);
      };
    
      const handleDialogClose = () => {
        setIsDialogOpen(false);
      };
    
      const handleConfirmDelete = () => {
        // Aquí va la lógica para borrar el elemento
       
        setIsDialogOpen(false);
        deleteCliente(params.row.id);
        router.push('/clientes/');
      };

      const deleteCliente = async (id: string | undefined) => {
        try {
          // Mostrar el diálogo de confirmación aquí  
    

          const response = await sqlDelete("tbl_clientes", id);

          if (response) {
            toast({
              title: "Borrado",
              description: (
                <p className="inline-flex gap-2">
                  <Trash2 className="mr-2 h-4 w-4" />{" "}
                  {`Cliente ${id} eliminado correctamente`}
                </p>
              ),
            });
          }
        } catch (error) {
          toast({
            title: "Error",
            description: (
              <p className="inline-flex gap-2">
                <Trash2 className="mr-2 h-4 w-4" /> Hubo un error al borrar al
                cliente
              </p>
            ),
          });
        }
      };
      const showCliente = (id: string | undefined) => {
        router.push(`/clientes/[${id}]`);
      };
      return (
        <div className="flex">
          <GridActionsCellItem
            icon={<Trash2 color="red" />}
            label="Borrar"
            onClick={() =>{handleDeleteClick()}}
          />
    
    <ConfirmDeleteDialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        onConfirm={handleConfirmDelete}
        entityName={`el cliente ${params.row.nombre}` }// Opcional: puede ser cualquier nombre del elemento a borrar
      />

          <Link href={`/clientes/${params.row.id}`}>
            <GridActionsCellItem
              icon={<EyeIcon color="blue" />}
              label="Ver"
              onClick={() => {
                showCliente(params.row.id);
              }}
            />
          </Link>
        </div>
      );
    },
  },
];
