"use client";

import { useState,useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { FormEventProps } from "./FormEvent.type";
import { Cliente } from "@/app/(routes)/Models/Cliente";
import sqlAll from "@/app/Backend/sql/sqlAll";
import { title } from "process";

const formSchema = z.object({
  id: z.string(),
  cliente:z.string(),
  title: z.string().min(2),
  description: z.string().min(2),
  date: z.date(),
  allDay: z.boolean(),
  timeFormat: z.string(),
  createInst: z.date(),
  updateInst: z.date(),
});

export function FormEvent(props: FormEventProps) {
  const { setNewEvent, setOpen, setOnSaveNewEvent } = props;
  const [clientes, setClientes] = useState<Cliente[]>([]);
  
  useEffect(() => {

    const listCliente = async () => {
      try {
        const clientes=await sqlAll("tbl_clientes");
        setClientes(clientes);
      } catch (error) {
        
      }
    }

    listCliente();
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      cliente:"",
      title: "",
      description: "",
      date: new Date(),
      allDay: false,
      timeFormat: "H(:mm)",
      createInst: new Date(),
      updateInst: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {

   
   
    const findCliente=clientes.find(cliente=>cliente.id==values.cliente);
    values.description = findCliente?.nombre +",  " + values.description;
    //eliminamos las propiedades clientes e id
    const { cliente, ...rest } = values;

    setNewEvent(rest);
    setOnSaveNewEvent(true);
    setOpen(false);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el títilo " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Tomar Medidas">Tomar Medida</SelectItem>
                  <SelectItem value="Rectificar Medidas">Rectificar Medidas</SelectItem>
                  <SelectItem value="Instalación">Instalación</SelectItem>
                  <SelectItem value="Reparación">Reparación</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Puede selecionar entre los tipos de acciones disponible
             </FormDescription>
              <FormMessage />
            </FormItem>
        )}
        />
            <FormField
        control={form.control}
        name="cliente"
        render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un Cliente " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {
                        clientes.map((cliente) => (
                            <SelectItem key={cliente.id} value={cliente.id.toString()}>{cliente.nombre} {cliente.telefono}</SelectItem>
                        ))
                    }
                 
                </SelectContent>
              </Select>
              <FormDescription>
              Seleccione un cliente
             </FormDescription>
              <FormMessage />
            </FormItem>
        )}
        />
         <FormField 
          control={form.control}
         name="description"
         render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input placeholder="Descripción" {...field} />
              </FormControl>
              <FormDescription>
                Descripción del evento
              </FormDescription>
              <FormMessage />
            </FormItem>
         )}
         />
           <Button className="borde-2 bg-blue-500 text-white" variant="outline" type="submit">Guardar</Button>
       
      </form>
    </Form>
  );
}
