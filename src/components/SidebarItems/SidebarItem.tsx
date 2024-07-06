"use client"

import Link from "next/link";
import { SidebarItemsPros } from "./SidebarItem.Type";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";


export default function SidebarItem(props:SidebarItemsPros) {
    const{item}=props;
    const {title,icon:Icon,link}=item;

    const pathName=usePathname();

    const activePath=pathName===link;
  return (
    <Link href={link} 
     className={cn(`flex gap-x-2 mt-2 
         light:text-slate-700 dark:text-white text-sm items-center
          hover:bg-red-700/50 p-2 rounded-lg cursor-pointer`, activePath && "bg-red-400/20")}
   >

    <Icon className="w-5 h-5" strokeWidth={1}/>

    {title}
   </Link>
       
  )
}
