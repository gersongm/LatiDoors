import { Instalacion } from "@/app/(routes)/Models/Instalacion"
import { Dispatch, SetStateAction } from "react"


export type InstalacionesProps={
   instalaciones:Instalacion[],
   Recargar:Dispatch<SetStateAction<boolean>>
}