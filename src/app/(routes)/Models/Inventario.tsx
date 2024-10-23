import { boolean } from "zod"

export type Inventario={
    id?:string,
    nombre?:string,
    precio? :number,
    fecha_movimiento:string
    tipo_movimiento:string
    cantidad:number
    id_articulo:string
    flag:string
    id_user:string
    id_cuenta:string
    categoria?:string
    isActivo?:boolean
}