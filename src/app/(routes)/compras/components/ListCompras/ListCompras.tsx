"use client";


import { Banco } from "@/app/(routes)/Models/Banco";
import { SelectData } from "@/app/Backend/sql/sqlAll";
import { toast } from "@/components/ui/use-toast";

import { GridRowsProp } from "@mui/x-data-grid";

import React, { useEffect, useRef, useState } from "react";

import { ShowDataTable } from "@/components/ShowDataTable/ShowDataTable";
import { columns} from "./columns";
import { Compra } from "@/app/(routes)/Models/Compra";
import { DataTable } from "@/components/ShowDataTable/DataTable";

export function ListCompras() {
  const [compras, setCompras] = useState<GridRowsProp<Compra>[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCompras = await SelectData("tbl_compras",
          "SELECT f.id, f.numero_factura, f.ncf, s.nombre,\
          f.fecha_emision, f.fecha_vencimiento, f.monto, \
          id_usuario, observaciones, mp.nombre as metodo, m.flag as moneda \
          FROM  tbl_facturas_suplidores as f \
          LEFT JOIN tbl_metodo_pago as mp on mp.id=f.metodo_pago \
          LEFT JOIN tbl_suplidores as s on s.id=f.id_suplidor \
          LEFT JOIN tbl_monedas as m on m.id=f.id_moneda \
          LEFT JOIN tbl_users as u on u.id=f.id_usuario "
        );

        setCompras(dataCompras as GridRowsProp<Compra>[]);
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
      <DataTable
        columns={columns}
        data={compras}
      />
    </div>
  );
}
