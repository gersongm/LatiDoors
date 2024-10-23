// Define the structure of your client data with type safety
export interface Banco {
    id?: string;
    nombre: string;
    nCuenta: string;
    cuenta: string;
    moneda:string; // Optional RNC field
    tipo_cuenta: string; // Optional Cedula field
    fecha_corte: string;
    isActivo: boolean ;// Optional formatted date field
  }