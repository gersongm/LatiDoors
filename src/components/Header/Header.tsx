"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface HeaderProps {
  title:string
}

export  function Header(props:HeaderProps) {


    const router = useRouter()  
  return (
    <div className="flex items-center text-xl">
        <ArrowLeft  onClick={() => router.back()} className="cursor-pointer me-1"/>
         { props.title}
        </div>
  )
}
