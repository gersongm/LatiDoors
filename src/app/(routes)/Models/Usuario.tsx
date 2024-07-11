export interface Usuario {
    applicationId: string;
    id: string;
    insertInstant:string,
    lastLoginInstant:string,
    lastUpdateInstant:string,
    roles:"Administrador"|"Ventas"|"Almacen"|"Caja",
    usernameStatus:string,
    verified:boolean,
    email:string,
    password:string,
    fullName:string,
    phoneNumber:string,
 
  }
