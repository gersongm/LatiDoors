import { z } from "zod";

export const clienteSchema = z.object({
  nombre: z.string().min(1, "El nombre del cliente es requerido"),
  direccion: z.string().min(1, "La dirección es requerida"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  ciudad: z.string().min(1, "La ciudad es requerida"),
  limite_credito: z.number().min(0, "El límite de crédito debe ser positivo"),
  isActivo: z.boolean(),
});

export const productoSchema = z.object({
  nombre: z.string().min(1, "El nombre del producto es requerido"),
  cantidad: z.number().min(1, "La cantidad debe ser al menos 1"),
  precio_unitario: z.number().min(0, "El precio unitario debe ser mayor o igual a 0"),
  descuento: z.number().min(0, "El descuento debe ser mayor o igual a 0").max(100, "El descuento no puede ser mayor a 100%").optional(),
  tipoITBIS: z.number().min(0),
  total: z.number().min(0).optional(),
  cantidadDisponible: z.number().min(0).optional(), // Cantidad disponible del producto
});

export const facturaSchema = z.object({
  numeroFactura: z.string().min(1, "El número de factura es requerido"),
  cliente: clienteSchema,
  fecha_emision: z.string(),
  productos: z.array(productoSchema),
  subtotal: z.number(),
  impuestos: z.number(),
  total: z.number(),
  estado: z.enum(["PENDIENTE", "PAGADA", "ANULADA"]),
  tipoComprobante: z.enum([
    "FACTURA_CONSUMIDOR_FINAL",
    "FACTURA_CREDITO_FISCAL",
    "NOTA_DEBITO",
    "NOTA_CREDITO",
  ]),
  ncf: z.string().min(1, "El NCF es requerido"),
});

export type FacturaFormValues = z.infer<typeof facturaSchema>;
