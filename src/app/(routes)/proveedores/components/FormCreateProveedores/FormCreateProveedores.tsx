"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";

import { Ban, CalendarIcon, Save, SaveAll } from "lucide-react";

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

import { FormCreateProovedoresProps} from "./FormCreateProveedores.type";

import {Metodo_Pago} from "@/app/(routes)/Models/Metodo_Pago";
import { Suplidor } from "@/app/(routes)/Models/Suplidor";

import sqlAll, { sqlAdd } from "@/app/Backend/sql/sqlAll";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

import { useUser } from "@clerk/nextjs";
import { Moneda } from "@/app/(routes)/Models/Moneda";

import { redirect, useRouter } from "next/navigation";
import { EmailAddress } from "@clerk/nextjs/server";
import { Tipo_Suplidor } from "@/app/(routes)/Models/Tipo_Suplidor";



const formSchema = z.object({
  nombre: z.string().min(3).max(50),
  direccion: z.string().max(200),
  telefono: z.string(),
  email: z.string().email().optional(),
  rnc: z.string(),
  tipo_suplidor: z.string().min(1),
  ciudad:z.string(),
  numero_cuenta_bancaria1: z.string(),
  numero_cuenta_bancaria2: z.string(),
  numero_cuenta_bancaria3: z.string(),
  isActivo: z.boolean(),
  referencia: z.string(),
  notas: z.string(),

});

export function FormCreateProveedores(prop: FormCreateProovedoresProps) {
  const { setOpenModalCreate } = prop;
  
  const { user } = useUser();

if(!user){
  return  redirect('/')
}
const routes = useRouter();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        nombre: "",
        direccion: "",
        telefono: "",
        email: "",
        rnc: "",
        tipo_suplidor: "",
        ciudad:"",
        numero_cuenta_bancaria1: "",
        numero_cuenta_bancaria2: "",
        numero_cuenta_bancaria3: "",
        isActivo: true,
        referencia: "",
        notas: "",
    },
  });

  const [suplidores, setSuplidores] = useState<Suplidor[]>([]);
  const [metodos, setMetodos] = useState<Metodo_Pago[]>([]);
  const [monedas, setMonedas] = useState<Moneda[]>([]);
  const [tipos, setTipos] = useState<Tipo_Suplidor[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const allSuplidores = await sqlAll("tbl_suplidores");
        setSuplidores(allSuplidores as Suplidor[]);

        const allMetodos = await sqlAll("tbl_metodo_pago");
        setMetodos(allMetodos as Metodo_Pago[]);

        const allMonedas = await sqlAll("tbl_monedas");
        setMonedas(allMonedas as Moneda[]);

        const allTipos = await sqlAll("tbl_tipos_suplidor");
        setTipos(allTipos as Tipo_Suplidor[]);
      
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

        console.log(values)
     const result = await sqlAdd("tbl_facturas_suplidores", values  );
     
      if(result){
        toast({
          title: "Registro creado",
          description:<p className="inline-flex gap-2">
          <SaveAll /> {result.respuesta}
        </p> 
        });
      routes.refresh();
      setOpenModalCreate(false);
      }else{
        toast({
          variant: "destructive",
          title: "Uff! Algo salió mal.",
          description: "Hubo un problema con su solicitud.",
          action: <ToastAction onClick={()=>onSubmit(values)}  altText="Try again">Try again</ToastAction>,
        })
      }
   
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear el registro." ,
        variant: "destructive",
      });
      // Handle error gracefully, e.g., display an error message
    }
  };
  return (
    <div className="mt-4 max-w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="grid grid-cols-3 gap-3 *:max-w-full">
          <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input required placeholder="Nombre suplidor" {...field} />
                  </FormControl>
                  <FormDescription/>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input  placeholder="000-000-0000" {...field} />
                  </FormControl>
                  <FormDescription color="info">este campo no es obligatorio</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input  placeholder="suplidor@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>este campo no es obligatorio</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rnc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RNC</FormLabel>
                  <FormControl>
                    <Input placeholder="RNC del suplidor" {...field} />
                  </FormControl>
                  <FormDescription>este campo no es obligatorio</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
              control={form.control}
              name="ciudad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl>
                    <Input placeholder="santiago" {...field} />
                  </FormControl>
                  <FormDescription>este campo no es obligatorio</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
         
          <FormField
              control={form.control}
              name="tipo_suplidor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo suplidor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Seleccione el tipo de Suplidor</SelectLabel>
                        {tipos.map((tipo) => (
                          <SelectItem
                            key={tipo.id}
                            value={tipo.id.toString()}
                          >
                             {tipo.nombre}
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
              name="numero_cuenta_bancaria1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuanta Bancaria 1</FormLabel>
                  <FormControl>
                    <Input placeholder="120-2298765-4" {...field} />
                  </FormControl>
                  <FormDescription>este campo no es obligatorio</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
              control={form.control}
              name="numero_cuenta_bancaria2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuanta Bancaria 2</FormLabel>
                  <FormControl>
                    <Input  placeholder="120-2298765-4" {...field} />
                  </FormControl>
                  <FormDescription>este campo no es obligatorio</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
              control={form.control}
              name="numero_cuenta_bancaria3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuanta Bancaria 3</FormLabel>
                  <FormControl>
                    <Input  placeholder="120-2298765-4" {...field} />
                  </FormControl>
                  <FormDescription>este campo no es obligatorio</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="referencia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referencia</FormLabel>
                  <FormControl>
                    <Input required placeholder="" {...field} />
                  </FormControl>
                  <FormDescription/>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nota</FormLabel>
                  <FormControl>
                  <Textarea
                  className="resize-none"
                  {...field}
                />
                  </FormControl>
                  <FormDescription>este campo no es obligatorio</FormDescription>
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
