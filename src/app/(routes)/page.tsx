import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { CardSummary } from "./components/CardSummary";
import { UserRound } from "lucide-react";

export default function Home() {
  
    return (
      <div>
        <h1>Bienvenido</h1>
        <UserButton afterSignOutUrl="/"/>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20">
          <CardSummary
          icon={UserRound}
          title="Usuarios registrados"
          total="12.50"
          average={23}
          tooltipText="total de usuarios"
          />
        </section>
      </div>
  );
}
