// Define the structure of your client data with type safety
export interface Cliente {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
    email?:string;
    rnc?: string; // Optional RNC field
    cedula?: string; // Optional Cedula field
    ciudad: string;
    fecha_creacion: string;
    limite_credito: number;
    isActivo: boolean;
    referencia?: string; // Optional Referencia field
    fecha_ultima_compra: Date; // Optional formatted date field
    notas:string;
  }