"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export function Logo() {
    const route=useRouter();
  return (
    <div className="min-h-20 h-20 flex items-center px-6 border-b cursor-pointer gap-2"
     onClick={()=>route.push("/")}>
        <Image src="/dictionarydotcom-color.svg" alt="logo" width={30} height={30} priority />
        <span className="text-xl font-bold text-red-600">
            Latin Doors
        </span>
     </div>
  )
}

