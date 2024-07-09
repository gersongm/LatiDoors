"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export  function Header() {

    const router = useRouter()  
  return (
    <div className="flex items-center text-xl">
        <ArrowLeft  onClick={() => router.back()} className="cursor-pointer me-1"/>
          Modificar Banco
        </div>
  )
}
