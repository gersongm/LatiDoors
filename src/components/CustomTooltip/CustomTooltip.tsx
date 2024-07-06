import React from 'react'
import { CustomTooltipProps } from './CustomTolltipTypes'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { Info } from 'lucide-react'
  
export function CustomTooltip(props:CustomTooltipProps) {
    const {content}=props
  return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Info className='h-5 w-5' strokeWidth={1}/>
        </TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  
  )
}


