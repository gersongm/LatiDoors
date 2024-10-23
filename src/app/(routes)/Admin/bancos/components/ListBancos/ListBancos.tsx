"use client";

import { Banco } from "@/app/(routes)/Models/Banco";
import { toast } from "@/components/ui/use-toast";

import React, { useEffect, useState } from "react";

import { ShowDataTable } from "@/components/ShowDataTable/ShowDataTable";
import { columns } from "./columns";
import { sqlGetBanks } from "@/app/Backend/sql/sqlGetBanks";


export function ListBancos() {
  const [bancos, setBancos] = useState<Banco[]>([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await sqlGetBanks();
      setBancos(data as unknown as Banco[]);

    } catch (error) {
      toast({
        description: "Error al cargar los datos",
        title: "Error",
      });
    }
  };

 
    // componentDidMount();

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
