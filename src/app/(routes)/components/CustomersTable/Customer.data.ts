"use client"

import { useEffect, useState } from "react";
import { Payment } from "./CustomerType";
import { sqlGetVentas } from "@/app/Backend/sql/sqlGetVentas";
import { Ventas } from "../../Models/Ventas";

 // Estado para las ventas obtenidas de la base de datos
export  function dataCustomer(){
  const [dataClientes, setDataClientes] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const resultVentas = await sqlGetVentas();
     
        // Transforma las ventas en el formato de `Payment`
        const transformedPayments = resultVentas.map((venta: Ventas) => {
          // Convertir venta.id a cadena y rellenar con ceros delante si es necesario
          const paddedInvoiceId = venta.id.toString().padStart(7, '0'); 
        
               // Verifica si venta.fecha es un objeto Date o convierte una cadena/numero a Date
               const fecha = venta.fecha instanceof Date ? venta.fecha : new Date(venta.fecha);
               const formattedFecha = fecha.toLocaleDateString(); // Formato ISO de la fecha 

          return {
            amount: venta.monto_total, // Monto total de la venta
            invoice: `INV-${paddedInvoiceId}`, // Formato de factura con ceros adelante
            customer: venta.cliente, // Nombre del cliente
            method: venta.metodo, // Método de pago
            date: formattedFecha, // Fecha (aún no está asignada en este código)
          };
        });
 
        setDataClientes(transformedPayments); // Actualiza con los datos transformados
       
      } catch (error) {
        console.error("Error fetching ventas:", error);
      }
    };
 
    fetchVentas();
  }, []);

  return dataClientes;

}
 
