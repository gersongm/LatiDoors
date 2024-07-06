"use client";

import React from "react";
import {
  dataAdminSidebar,
  dataUserSidebar,
  dataGenericoSidebar,
} from "./SidebarRoutes.Data";

import { Separator } from "@/components/ui/separator";

import SidebarItem from "../SidebarItems/SidebarItem";


export function SidebarRoutes() {
  const itemLogoOff = dataGenericoSidebar.find((item) => item?.link === "/logout");

  return (
    <div className="flex flex-col justify-between h-full overflow-auto">
      <div>
        <div className="p-1 md:p-6">
          <p className="text-slate-500 mb-2">Administrador</p>

          {dataAdminSidebar.map((item, index) => (
            <SidebarItem item={item} key={index} />
          ))}
        </div>
        <Separator />

        <div className="p-1 md:p-6">
          <p className="text-slate-500 mb-2">Transaciones</p>

          {dataUserSidebar.map((item, index) => (
            <SidebarItem item={item} key={index} />
          ))}
        </div>
        <Separator />

        <div className="p-1 md:p-6">
          <p className="text-slate-500 mb-2">General</p>

          {dataGenericoSidebar.filter((item)=>item.link!=="/logout").map((item, index) => (
            <SidebarItem item={item} key={index} />
          ))}
        </div>
      
      </div>
   
      <div >
      
        <footer className="text-center p-6 text-red-500">
        <Separator/>
          {itemLogoOff &&
           <SidebarItem item={itemLogoOff} key={1000}/>
          }
        </footer>
      </div>
    </div>
  );
}
