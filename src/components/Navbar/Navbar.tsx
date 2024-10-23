"use client";

import { useEffect,useState } from "react";

import { SidebarRoutes } from "@/components/SidebarRoutes";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ToogleTheme";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";


import { SignedIn,UserButton } from "@clerk/nextjs";

import { Menu, Search } from "lucide-react";

import { ShowFullName } from "../ShowFullName";
import { Notification } from "../Notification";


export function Navbar() {
  const [isMountd, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMountd) {
    return null;
  }
  return (
    <nav
      className="flex items-center px-2 gap-x-4 md:px-6 
      justify-between lg:justify-end w-full bg-background border-b h-20"
    >
      <li className="block lg:hidden">
        <Sheet>
          <SheetTrigger className="flex items-center">
            <Menu />
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SidebarRoutes />
          </SheetContent>
        </Sheet>
      </li>
      
      <li className="flex items-center justify-end gap-x-1">
        <ShowFullName />
        
          <Notification />
          <ModeToggle />

          <div className="ms-2">
          <SignedIn >
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          </div>
      </li>
    </nav>
  );
}
