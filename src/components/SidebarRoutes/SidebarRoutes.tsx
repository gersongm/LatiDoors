"use client";

import React from "react";
import {
  dataAdminSidebar,
  dataIngresosSidebar,
  dataGastosSidebar,
  dataInventarioSidebar,
  dataGenericoSidebar,
} from "./SidebarRoutes.Data";

import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import SidebarItem from "../SidebarItems/SidebarItem";
import { useSession } from "@clerk/nextjs";
import { checkUserRole } from "@/app/util/roles";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, Layers, ShieldCheck, Shrink } from "lucide-react";

export function SidebarRoutes() {
  const itemLogoOff = dataGenericoSidebar.find(
    (item) => item?.link === "/logout"
  );
  const { session } = useSession();
  const userRole = checkUserRole(session);
  return (
    <div className="flex flex-col justify-between h-full overflow-auto">
      <div>
        {userRole === "org:admin" && (
          <div>
            <div className="p-1 md:p-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="admin">
               
                  <AccordionTrigger className="text-slate-500 mb-2 hover:text-amber-800" >
                  <ShieldCheck/> Administrador
                  </AccordionTrigger>
                  <AccordionContent>
                    {dataAdminSidebar.map((item, index) => (
                      <SidebarItem item={item} key={index} />
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ingresos">
                  <AccordionTrigger className="text-slate-500 mb-2 ">
                   <ArrowUpNarrowWide/>Ingresos
                  </AccordionTrigger>
                  <AccordionContent>
                    {dataIngresosSidebar.map((item, index) => (
                      <SidebarItem item={item} key={index} />
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="gastos">
                  <AccordionTrigger className="text-slate-500 mb-2 ">
                  <ArrowDownNarrowWide/>Gastos
                  </AccordionTrigger>
                  <AccordionContent>
                    {dataGastosSidebar.map((item, index) => (
                      <SidebarItem item={item} key={index} />
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="inventario">
                  <AccordionTrigger className="text-slate-500 mb-2 ">
                   <Layers/>Inventario
                  </AccordionTrigger>
                  <AccordionContent>
                    {dataInventarioSidebar.map((item, index) => (
                      <SidebarItem item={item} key={index} />
                    ))}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="general">
                  <AccordionTrigger className="text-slate-500 mb-2 ">
                   <Shrink/> General
                  </AccordionTrigger>
                  <AccordionContent>
                    {dataGenericoSidebar
                      .filter((item) => item.link !== "/logout")
                      .map((item, index) => (
                        <SidebarItem item={item} key={index} />
                      ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}
      </div>

      <div>
        <footer className="text-center p-6 text-red-500">
          <Separator />
          {itemLogoOff && <SidebarItem item={itemLogoOff} key={1000} />}
        </footer>
      </div>
    </div>
  );
}
