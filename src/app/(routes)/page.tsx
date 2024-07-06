import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { CardSummary } from "./components/CardSummary";
import {
  BookOpenCheck,
  DollarSign,
  Frown,
  Landmark,
} from "lucide-react";
import { CardSummaryProps } from "./components/CardSummary/CardSummary.type";
import LastCustomer from "./components/LastCustomers/LastCustomers";

import { FinancialState } from "./components/FinancialState";
import { Sales } from "./components/Sales";
import { Shopping } from "./components/Shopping/Shopping";
import { Footer } from "@/components/Footer";



export default function Home() {


  const cardData: CardSummaryProps[] = [
   
    {
      icon: BookOpenCheck,
      title: "Ingresos",
      total: 89355,
      average: 89,
      tooltipText: "total de entrada de efectivo",
    },
 
    {
      icon: Landmark,
      title: "Total en Bancos",
      total: 2450840.0, // Assuming total is a number here
      average: 45,
      tooltipText: "Total de dinero registrados en bancos",
    },
   
    {
      icon: Frown,
      title: "Cuentas por pagar",
      total: 450840.0, // Assuming total is a number here
      average: 15,
      tooltipText: "Total de dinero por pagar a suplidores",
    },
  ];

 
  return (
    <div>

      <h1>Bienvenido</h1>
      <section className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-x-15">
       {
        cardData.map((card, index) => (
           <CardSummary key={index} {...card} />
         ))
       }
       
      </section>
      <section  className="grid grid-cols-1 p-5 lg:gap-x-10 mt-12 lg:gap-y-10">
      <LastCustomer/>
     
     
      </section>

      <section  className="flex grid-cols-2 gap-2 p-5 mt-8 lg:gap-y-10 h-[400px]  justify-between">
      <Sales/>
      <Shopping/>
     
      </section>
      <section className="grid grid-cols-1  p-5 mt-8 gap-2 lg:gap-y-10">
      <FinancialState/>
      </section>
      <Footer/>
    </div>
    
  );
}
