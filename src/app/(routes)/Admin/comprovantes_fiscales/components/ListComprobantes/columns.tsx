"use client";

import { toast } from "@/components/ui/use-toast";

import {EyeIcon, Trash2, X } from "lucide-react";


import { sqlDelete } from "@/app/Backend/sql/sqlAll";


import Link from "next/link";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import { useRouter } from 'next/navigation';
import { useState } from "react";
import ConfirmDeleteDialog from "@/components/DialogConfirmation/DialogConfirmation";
import { ComprobantesFiscales } from "@/app/(routes)/Models/ComprobantesFiscales";

export const columns: GridColDef<ComprobantesFiscales>[] = [
  { field: "id", headerName: "ID", width: 20 },
  { field: "documento", headerName: "Tipo de Documento", width: 200 },
  { field: "nombre", headerName: "Nombre", width: 250 },
  { field: "prefijo", headerName: "Prefijo", width: 100 },
  { field: "siguiente", headerName: "Siguiente Numeración", type:"number", width: 200,
    align:"center",
    valueGetter: (value, row) => {
      const siguente = row.siguiente?value:row.inicial;
      return siguente;
    },

   },
  
  {
    field: "expira",
    type: "date",
    headerName: "Fecha Expiración",
    width: 150,
    valueGetter: (value: string) => value && new Date(value),
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
        router.push('/Admin/comprovantes_fiscales');
      };

      const deleteCliente = async (id: string | undefined) => {
        try {
          // Mostrar el diálogo de confirmación aquí  
    

          const response = await sqlDelete("tbl_comprobantes", id);

          if (response) {
            toast({
              title: "Borrado",
              description: (
                <p className="inline-flex gap-2">
                  <Trash2 className="mr-2 h-4 w-4" />{" "}
                  {`Comprobante ${id} eliminado correctamente`}
                </p>
              ),
            });
          }
        } catch (error) {
          toast({
            title: "Error",
            description: (
              <p className="inline-flex gap-2">
                <Trash2 className="mr-2 h-4 w-4" /> Hubo un error al borrar el
                comprobante
              </p>
            ),
          });
        }
      };
      const showComprobante = (id: string | undefined) => {
        router.push(`/Admin/comprobantes_fiscales/[${id}]`);
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

          <Link href={`/Admin/comprovantes_fiscales/${params.row.id}`}>
            <GridActionsCellItem
              icon={<EyeIcon color="blue" />}
              label="Ver"
              onClick={() => {
                showComprobante(params.row.id);
              }}
            />
          </Link>
        </div>
      );
    },
  },
];
