import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

import {
  ClerkProvider,

} from "@clerk/nextjs";

import { Montserrat } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/Theme-provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
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
            
            <main>{children}</main>

            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
