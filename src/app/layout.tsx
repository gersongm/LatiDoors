import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,

} from "@clerk/nextjs";

import { Montserrat } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/Theme-provider";
import { Loading } from "@/components/Loading";



const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "200",
});

export const metadata: Metadata = {
  title: "Latin Doors",
  description: "Gestion de empresa. Facturas,Inventarios,Bancos,Contabilidad",
};

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode;}>)
{

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={montserrat.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
              <ClerkLoading>
              <div className="flex items-center justify-center h-screen"><Loading /></div>
            </ClerkLoading>
            <ClerkLoaded>
            <main>{children}</main>
            </ClerkLoaded>
          

            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
