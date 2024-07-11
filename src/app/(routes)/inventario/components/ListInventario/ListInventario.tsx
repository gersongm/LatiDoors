"use client";

import sqlAll, { sqlSelect } from "@/app/Backend/sql/sqlAll";
import { toast } from "@/components/ui/use-toast";

import React, { useEffect, useState } from "react";

import { ShowDataTable } from "@/components/ShowDataTable/ShowDataTable";
import { columns } from "./columns";
import { Inventario } from "@/app/(routes)/Models/Inventario";

export function ListInventario() {
  const [inventario, setInventario] = useState<Inventario[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataInventario = await sqlSelect(
          "tbl_inventario",
          "SELECT i.id,i.fecha_movimiento,i.tipo_movimiento,\
          i.flag,m.nombre,i.cantidad,i.id_cuenta,u.fullName\
          FROM tbl_inventario as i LEFT JOIN tbl_users as u\
          on u.id=i.id_user LEFT JOIN tbl_mercancias as m\
          on m.id=i.id_articulo"
        );

        setInventario(dataInventario as Inventario[]);
      } catch (error) {
        toast({
          description: "Error al cargar los datos",
          title: "Error",
        });
      }
    };

    fetchData(); // Fetch data on component mount
  }, []);
  return (
    <div className="mt-5">
      <ShowDataTable
        columns={columns}
        data={inventario}
        titleFor="Nombre"
        filtro="nombre"
      />
    </div>
  );
}
