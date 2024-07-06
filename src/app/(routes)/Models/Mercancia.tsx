// Define the structure of your client data with type safety
export interface Mercancia {
    id: number;
    nombre: string;
    descripcion: string;
    precio_costo: number;
    precio_venta: number; // Optional RNC field
    categoria_id: string; // Optional Cedula field
    fecha_ingreso: Date;
    isActivo: boolean ;
    almacen_id:string;
    suplidor_id:string
    
  }
