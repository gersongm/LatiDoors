
export type Payment = {
    amount: number
    date: string
    method: "Efectivo" | "Credito" | "Transferencia" | "Debito" | "Tarjeta"
    invoice:string
    customer:string
   
  }