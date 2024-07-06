export interface Suplidor {
    id: number;
    nombre: string;
    direccion?: string;
    telefono?: string;
    email?:string;
    rnc?: string; // Optional RNC field
    tipo_suplidor?: string; // Optional Cedula field
    ciudad?: string;
    numero_identificacion?: string;
    numero_cuenta_bancaria1?: string;
    numero_cuenta_bancaria2?:string;
    numero_cuenta_bancaria3?:string;
    isActivo: boolean;
    referencia?: string; // Optional Referencia field
    fecha_ultima_compra?: Date; // Optional formatted date field
    notas?:string;
  }