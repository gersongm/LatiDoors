import { Banco } from "@/app/(routes)/Models/Banco";
import { BancoInformationProps } from "./BancoInformationProps.type";
import { User } from "lucide-react";
import { BancoForm } from "./BancoForm";


export function BancoInformation(props:BancoInformationProps) {
  const {banco} = props;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-4" >
      <div className="p-4 rounnded-lg  bg-background shadown-md  hover:shadow-lg">
        <div>
          <BancoForm banco={banco}/>
        </div>

      </div>
     
        <div className="rounnded-lg  bg-background shadown-md  hover:shadow-lg p-4 h-min">
         
          <div className="flex items-center justify-between gap-x-2">
            <div className="flex items-center gap-x-2">
              <User className="w-5 h-"/>
              Usuario
            </div>
            <div>
              <p>{banco.nombre}</p>
            </div>

          </div>
          <p>Lista de Bancos</p>
          </div>
      </div>
  )
}
