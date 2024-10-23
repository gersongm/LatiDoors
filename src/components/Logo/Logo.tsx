"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export function Logo() {
    const route=useRouter();
  return (
    <div className="min-h-20 h-20 flex items-center px-6 border-b cursor-pointer gap-2 bg-inherit"
     onClick={()=>route.push("/")}>
        <Image src="/3.png" alt="logo" width={60} height={60} priority />
       <p> <span className="text-xl font-bold text-red-600">C</span>
       ont <span className="text-xl font-bold text-red-600">F</span>
       ast
       </p>
     </div>
  )
}

