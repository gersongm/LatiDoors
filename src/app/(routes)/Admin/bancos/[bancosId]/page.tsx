import { sqlSelect } from "@/app/Backend/sql/sqlAll";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Header } from "@/components/Header";
import { BancoInformation } from "./components/BancoInformation";
import { Banco } from "../../../Models/Banco";


export default async function BancoIdPage({params}:{params:{bancosId:string}}) {
    const {userId} = auth()
    if(!userId){
      return  redirect('/')
    }

    const banco = await sqlSelect(
        "tbl_bancos",
        "SELECT * from tbl_bancos where id = "+ params.bancosId
      ) as Banco;

      if(!banco){
       return redirect('/bancos')
      }
    

  return (
    <div>
        <Header title="Editar Banco"/>
        <BancoInformation  banco={banco}/>
        <p>footer</p>
    </div>
  )
}
