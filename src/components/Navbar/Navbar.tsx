"use client";
import { SidebarRoutes } from "@/components/SidebarRoutes";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ToogleTheme";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { Menu, Search } from "lucide-react";

import { ShowFullName } from "../ShowFullName";
import { useEffect,useState } from "react";

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
      justify-between w-full bg-background border-b h-20"
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
      <li className="relative w[300px]">
        <Input placeholder="Buscar..." className="rounded-lg" />
        <Search
          strokeWidth={1}
          className="absolute top-1/2 right-2 text-muted-foreground"
        />
      </li>
      <li className="flex items-center gap-x-2">
        <ShowFullName />
        
          <ModeToggle />

          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        
      </li>
    </nav>
  );
}
