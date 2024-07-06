import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { TooltipPrivateProp } from "./TooltipPrivate.type"

  
export const TooltipPrivate:React.FC<TooltipPrivateProp>=({element,tooltips})=> {
  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        {element}
      </TooltipTrigger>
      <TooltipContent>
        <p> {tooltips}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  )
}


