"use client";

import { Banco } from "@/app/(routes)/Models/Banco";
import sqlAll, { sqlSelect } from "@/app/Backend/sql/sqlAll";
import { toast } from "@/components/ui/use-toast";

import React, { useEffect, useState } from "react";

import { ShowDataTable } from "@/components/ShowDataTable/ShowDataTable";
import { columns} from "./columns";



export function ListBancos() {
  const [bancos, setBancos] = useState<Banco[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataBancos = await sqlSelect(
          "tbl_bancos",
          "SELECT \
          b.id, \
          b.nombre, \
          b.nCuenta,\
          b.fecha_corte,\
          c.cuenta, \
          m.flag, \
          t.nombre as tipo\
          FROM tbl_bancos b \
          JOIN tbl_cuentas c  ON c.cuenta = b.id_cuenta \
          JOIN tbl_tipo_cuenta t ON t.id = b.id_tipo_cuenta\
          JOIN tbl_monedas m ON m.id = b.id_moneda;"
        );

        setBancos(dataBancos as Banco[]);
      
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
        data={bancos}
        titleFor="Nombre"
        filtro="nombre"
      />
    </div>
  );
}
