import { Cliente } from "./Cliente";

export interface Factura {
    id?: string;
    numeroFactura: string; // Número de factura único
    cliente: Cliente; // Datos del cliente asociado a la factura
    fecha_emision: string; // Fecha en que se emitió la factura
    fecha_vencimiento?: string; // Fecha de vencimiento (si es una factura a crédito)
    productos: ProductoFactura[]; // Array de productos que incluye la factura
    subtotal: number; // Subtotal de la factura antes de impuestos y descuentos
    impuestos: number; // Total de impuestos aplicados
    descuento?: number; // Descuento total (opcional)
    total: number; // Monto total de la factura
    notas?: string; // Notas adicionales sobre la factura (opcional)
    estado: "PENDIENTE" | "PAGADO" | "CANCELADO"; // Estado de la factura
    fecha_creacion: string; // Fecha de creación en el sistema
    tipoComprobante: TipoComprobanteFiscal; // Tipo de comprobante fiscal usado para la factura
    ncf: string; // Número de Comprobante Fiscal (NCF)
    formaPago:FormaDePago;
  }
  
  export interface ProductoFactura {
    id: string; // ID del producto
    nombre: string; // Nombre del producto
    descripcion?: string; // Descripción del producto (opcional)
    cantidad: number; // Cantidad de unidades compradas
    precio_unitario: number; // Precio por unidad del producto
    tipoITBIS: ITBIS; // Tipo de ITBIS aplicado al producto
    impuesto?: number; // Monto del impuesto aplicado al producto (opcional)
    total: number; // Total del producto (cantidad * precio_unitario + impuesto)
  }
  
  export type ITBIS = 0 | 0.12 | 0.18; // Tasa de ITBIS (0%, 12%, 18%)
  
  export type TipoComprobanteFiscal =
    | "FACTURA_CONSUMIDOR_FINAL" // B01: Comprobante de consumidor final
    | "FACTURA_CREDITO_FISCAL" // B02: Factura de crédito fiscal
    | "NOTA_DEBITO" // B03: Nota de débito
    | "NOTA_CREDITO" // B04: Nota de crédito
    | "FACTURA_REGIMEN_ESPECIAL" // B14: Factura para régimen especial
    | "GUBERNAMENTAL" // B15: Comprobante para entidades gubernamentales
    | "EXPORTACION"; // B16: Factura para exportación
  
    // Define el tipo de forma de pago
export type FormaDePago =
| "EFECTIVO"
| "TARJETA"
| "TRANSFERENCIA"
| "CHEQUE"
| "CREDITO";