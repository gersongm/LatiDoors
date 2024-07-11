"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";

import { Ban, Save } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
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
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { FormCreateMercanciaProps } from "./FormCreateMercancia.type";

import sqlAll, { sqlAdd } from "@/app/Backend/sql/sqlAll";
import { Categoria } from "@/app/(routes)/Models/Categoria";
import { Almacen } from "@/app/(routes)/Models/Almacen";
import { Suplidor } from "@/app/(routes)/Models/Suplidor";
import { DatePicker } from "@/components/DatePicker";


const formSchema = z.object({
    nombre: z.string().min(3).max(50),
    descripcion: z.string().min(5).max(50),
    precio_costo: z.number().min(1),
    precio_venta: z.number().min(1),
    categoria_id: z.string().min(1),
    fecha_ingres: z.string().min(1),
    isActivo: z.string().min(1),
    almacen_id: z.string().min(1),
    suplidor_id: z.string().min(1),
  });
export function FormCreateMercancia(props:FormCreateMercanciaProps) {
    const { setOpenModalCreate } = props;

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
    defaultValues: {
    nombre:"",
    descripcion:"",
    precio_costo:0,
    precio_venta: 0,
    categoria_id: "",
    fecha_ingres:"",
    isActivo: "",
    almacen_id:"",
    suplidor_id:"",
      },
    });
  
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [almacenes, setAlmacenes] = useState<Almacen[]>([]);
    const [suplidores, setSuplidores] = useState<Suplidor[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const Categorias = await sqlAll("tbl_categorias");
          setCategorias(Categorias as Categoria[]);
  
          const Almacenes = await sqlAll("tbl_almacenes");
  
          setAlmacenes(Almacenes as Almacen[]);
          ///////////////////////////////
          const Suplidores = await sqlAll("tbl_suplidores")
          setSuplidores(Suplidores as Suplidor[]);

        } catch (error) {
         toast({
            variant: "destructive",
            title: "Uff! Algo salió mal.",
            description: "Hubo un problema con su solicitud.",
            action: <ToastAction altText="Try again">Reintentar</ToastAction>,
          });
          
          // Handle error gracefully, e.g., display an error message
        }
      };
  
      fetchData(); // Fetch data on component mount
    }, []);
  
    const { isValid } = form.formState;
    const { toast } = useToast();
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
       const result = await sqlAdd("tbl_mercancias", values  );
       console.log(result)
        if(result){
          toast({
            title: "Guardar",
            description:result.respuesta  // description: "Se ha creado el banco correctamente",
          });
        setOpenModalCreate(false);
        }else{
          toast({
            variant: "destructive",
            title: "Uff! Algo salió mal.",
            description: "Hubo un problema con su solicitud.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
        }
     
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo guardar el registro",
          variant: "destructive",
        });
        // Handle error gracefully, e.g., display an error message
      }
    };
    return (
      <div className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Mercancia</FormLabel>
                    <FormControl>
                      <Input placeholder="Banco Nacional" {...field} onChange={
                        (e) => {
                          const inputValue = e.target.value;
                          const valueUperCase = inputValue.toUpperCase();
                          field.onChange(valueUperCase);
                        }
                      } />
                    </FormControl>
                    <FormDescription>Digite minimo(3) caracteres</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descripcion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripcion</FormLabel>
                    <FormControl>
                      <Input placeholder="descripcion de la mercancia" {...field} />
                    </FormControl>
                    <FormDescription>Digite minimo(3) caracteres</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fecha_ingres"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de ingreso</FormLabel>
                    <DatePicker
                    />
                    <FormDescription>Seleccione la fecha de ingreso</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoria_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione la categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Seleccione la categoria</SelectLabel>
                          {categorias.map((categoria) => (
                            <SelectItem
                              key={categoria.id}
                              value={categoria.id.toString()}
                            >
                              {categoria.nombre}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="almacen_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Almacen</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione el almacen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Almacen</SelectLabel>
                          {almacenes.map((almacen) => (
                            <SelectItem key={almacen.id} value={almacen.id.toString()}>
                              {almacen.nombre}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="suplidor_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suplidor</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione el suplidor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Suplidorr</SelectLabel>
                          {suplidores.map((suplidor) => (
                            <SelectItem
                              key={suplidor.id}
                              value={suplidor.id.toString()}
                            >
                              {suplidor.rnc} - {suplidor.nombre}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex  justify-end gap-2">
            <Button type="submit" disabled={!isValid}>
              <Save size={20} className="mr-2" /> Guardar
            </Button>
            <Button type="reset" onClick={()=>setOpenModalCreate(false)} >
              <Ban size={20} className="mr-2" /> Cancelar
            </Button>
            </div>
          
          </form>
        </Form>
      </div>
    );
}
