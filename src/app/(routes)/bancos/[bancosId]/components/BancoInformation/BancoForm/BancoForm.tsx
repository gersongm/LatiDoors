import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import{useState} from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { 
    Select, 
    SelectItem, 
    SelectTrigger, 
    SelectValue,
     SelectContent 
    } from "@/components/ui/select"

    import { Toast } from "@/components/ui/toast"

import { BancoFormProps } from "./BancoForm.type"
export function BancoForm(props:BancoFormProps) {
    const {banco} = props
  return (
    <div>BancoForm</div>
  )
}
