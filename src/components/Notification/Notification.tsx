import { Bell,BellDot } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export  function Notification() {
 
  const[notificationCount, setNotificationCount] = useState(0)

  const [showActivityBar, setShowActivityBar] = useState([
    {label:"Puerta 80*200",cantidad:10},
    {label:"Puertas 90*210", cantidad:3}])

 
  
 return (
  <>
       
      {!notificationCount ? 
            <Button variant="ghost" size="icon">
                <Bell className="h-[1.2rem] w-[1.2rem] text-current"  />
              </Button> 
              :
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <BellDot className="h-[1.2rem] w-[1.2rem]" color="red" />
              
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-46">
              <DropdownMenuLabel>Alertas</DropdownMenuLabel>
             
              <DropdownMenuSeparator />
              {showActivityBar.map((activity,index)=>{
                return(
               <DropdownMenuLabel key={index}  >
                {activity.label}
                <Badge variant="secondary" className="ml-2">
                  {activity.cantidad}
                </Badge>
               </DropdownMenuLabel>
                )
              })}
      
             
            </DropdownMenuContent>
           </DropdownMenu>
      
      }
  </>
  )
}
