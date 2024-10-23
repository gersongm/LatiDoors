export interface ComprobantesFiscales {
    id?: string; 
    documento: string; 
    prefijo: string;
    nombre:string; 
    inicial: number; 
    final: number; 
    siguiente:number;
    expira: string; 
    isElectronico:Boolean;
 }