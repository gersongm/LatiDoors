export interface Ventas {
    id: number; // ID de la factura (corresponde al campo AUTO_INCREMENT)
    cliente_id: number; // ID del cliente (clave foránea)
    fecha: Date; // Fecha de la factura
    monto_total: number; // Monto total de la factura
    pagado: number; // Monto pagado (valor por defecto 0)
    debido: number; // Monto debido, calculado como (monto_total - pagado)
    vendido_por?: string; // Nombre del vendedor (opcional)
    cliente:string;
    metodo:"Efectivo" | "Credito" | "Transferencia" | "Debito" | "Tarjeta" ;
  }
  