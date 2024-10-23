"use client";

import sqlAll from "@/app/Backend/sql/sqlAll";
import { toast } from "@/components/ui/use-toast";

import React, { useEffect, useState } from "react";

import { ShowDataTable } from "@/components/ShowDataTable/ShowDataTable";
import { columns} from "./columns";
import { Mercancia } from "@/app/(routes)/Models/Mercancia";
import { sqlGetMercancias} from "@/app/Backend/sql/sqlGetMercancias";


export function ListMercancias() {
  const [mercancias, setMercancias] = useState<Mercancia[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataMercancias = await sqlGetMercancias()

        setMercancias(dataMercancias as unknown as Mercancia[]);

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
    <div className="mt-5 ">
     
      <ShowDataTable
        columns={columns}
        data={mercancias}
        titleFor="Producto"
        filtro="nombre"
        total= {{titulo:"Total mercancías",cantidad:mercancias.length}}
      />
    </div>
  );
}