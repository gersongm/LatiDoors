"use client";

import { toast } from "@/components/ui/use-toast";
import { Eye, Trash2, Printer, DollarSign, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sqlDelete } from "@/app/Backend/sql/sqlAll";
import { Factura } from "@/app/(routes)/Models/Factura";
import { currencyFormatter } from "@/funtions";
import Link from "next/link";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import ConfirmDeleteDialog from "@/components/DialogConfirmation/DialogConfirmation";

export const columns: GridColDef<Factura>[] = [
  { field: "id", headerName: "# Fact", width: 80 },
  {
    field: "fecha",
    headerName: "Fecha",
    type: "date",
    width: 100,
    valueGetter: (value:string) => new Date(value),
  },
  { field: "cliente", headerName: "Cliente", width: 200 },
  {
    field: "monto_total",
    headerName: "Monto total",
    width: 100,
    type: "number",
    valueFormatter: (value:number) => currencyFormatter(value),
  },
  {
    field: "pagado",
    headerName: "Pagado",
    width: 100,
    type: "number",
    valueFormatter: (value:number) => currencyFormatter(value),
  },
  {
    field: "debido",
    headerName: "Debido",
    width: 100,
    type: "number",
    valueFormatter: (value:number) => currencyFormatter(value),
  },
  {
    field: "vendido_por",
    headerName: "Vendido por",
    width: 200,
  },
  {
    field: "actions",
    headerName: "Acciones",
    width: 180,
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
        setIsDialogOpen(false);
        deleteFactura(params.row.id);
        router.push('/facturacion/');
      };

      const deleteFactura = async (id: string | undefined) => {
        try {
          const response = await sqlDelete("tbl_facturacion", id);
          if (response) {
            toast({
              title: "Borrado",
              description: (
                <p className="inline-flex gap-2">
                  <Trash2 className="mr-2 h-4 w-4" />{" "}
                  {`Factura ${id} eliminada correctamente`}
                </p>
              ),
            });
          }
        } catch (error) {
          toast({
            title: "Error",
            description: (
              <p className="inline-flex gap-2">
                <Trash2 className="mr-2 h-4 w-4" /> Hubo un error al borrar la factura
              </p>
            ),
          });
        }
      };

      const showFactura = (id: string | undefined) => {
        router.push(`/facturacion/${id}`);
      };

      return (
        <div className="flex space-x-2">
          {/* Botón Ver */}
          <Link  href={`/facturacion/${params.row.id}`}>
            <GridActionsCellItem
              icon={<Eye color="blue" />}
              label="Ver"
              onClick={() => showFactura(params.row.id)}
            />
          </Link>

          {/* Botón Abonar */}
          <GridActionsCellItem
            icon={<DollarSign color="green" />}
            label="Abonar"
            onClick={() => {
              // Lógica para abonar
            }}
          />

      

          {/* Botón Editar */}
          <Link href={`/facturacion/editar/${params.row.id}`}>
            <GridActionsCellItem
              icon={<Edit color="blue" />}
              label="Editar"
              onClick={() => {
                // Lógica para editar
              }}
            />
          </Link>

          {/* Botón Borrar */}
          <GridActionsCellItem
            icon={<Trash2 color="red" />}
            label="Borrar"
            onClick={handleDeleteClick}
          />

          {/* Diálogo de Confirmación para eliminar */}
          <ConfirmDeleteDialog
            open={isDialogOpen}
            onClose={handleDialogClose}
            onConfirm={handleConfirmDelete}
            entityName={`la factura ${params.row.id}`}
          />
        </div>
      );
    },
  },
];
