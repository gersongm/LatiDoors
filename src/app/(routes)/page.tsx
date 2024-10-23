"use client";
import { useSession } from "@clerk/nextjs";

import { CardSummary } from "./components/CardSummary";
import { Frown, Landmark, Smile } from "lucide-react";
import { CardSummaryProps } from "./components/CardSummary/CardSummary.type";
import LastCustomer from "./components/LastCustomers/LastCustomers";

import { FinancialState } from "./components/FinancialState";
import { Sales } from "./components/Sales";
import { Shopping } from "./components/Shopping/Shopping";
import { Footer } from "@/components/Footer";

import { checkUserRole } from "../util/roles";
import { useEffect, useState } from "react";
import { sqlIngresos } from "../Backend/sql/sqlCard";


export default function Home() {
  // Usar estado para los ingresos
  const [ingresos, setIngresos] = useState(0.00);
  const [average, setaverage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { monto,average } = await sqlIngresos();
 // Verificar si el valor de monto es un número válido
        const montoValido = !isNaN(Number(monto)) ? Number(monto) : 0;
       const averageValido=!isNaN(Number(average)) ? Number(average) : 0;
        // Actualiza el estado con los ingresos formateados
        setIngresos(montoValido);
        setaverage(averageValido)
      } catch (error) {
        console.error("Error al obtener los ingresos:", error);
      }
    };

    fetchData();
  }, []);

 
  // Solo renderiza las tarjetas cuando ingresos tiene un valor correcto
  
const cardData: CardSummaryProps[]= [
    {
      icon: Smile,
      title: "Ingresos",
      total: ingresos, // Ahora usamos el estado
      average: average,
      tooltipText: "Total de entrada de efectivo en los ultimos 3 meses",
    },
    {
      icon: Landmark,
      title: "Total en Bancos",
      total: 2450840.0, 
      average: 45,
      tooltipText: "Total de dinero registrados en bancos",
    },
    {
      icon: Frown,
      title: "Cuentas por pagar",
      total: 450840.2,
      average: 15,
      tooltipText: "Total de dinero por pagar a suplidores",
    },
  ]

  const { session } = useSession();
  const userRole = checkUserRole(session);
  
  if (userRole !== "org:admin") {
    return (
      <p className="flex mb-96 text-inherit text-justify justify-center items-center text-lg">
        Sólo el Administrador puede acceder a este contenido
      </p>
    );
  }
 
  return (
    <div>
      { ingresos &&
      
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-x-15">
        {cardData.map((card, index) => (
          <CardSummary key={index} {...card} />
        ))}
      </section>
}
      <section className="grid grid-cols-1 lg:gap-x-10 mt-12 lg:gap-y-10 bg-background">
        <LastCustomer />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-5 lg:gap-y-10 md:flex justify-evenly">
        <Sales />
        <Shopping />
      </section>
      <section className="grid grid-cols-1 gap-2 mt-5 lg:gap-y-10">
        <FinancialState />
      </section>
      <Footer />
    </div>
  );
}
