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

import { FormCreateCompraProps } from "./FormCreateCompra.type";

import {Metodo_Pago} from "@/app/(routes)/Models/Metodo_Pago";
import { Suplidor } from "@/app/(routes)/Models/Suplidor";

import sqlAll, { AddData} from "@/app/Backend/sql/sqlAll";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

import { useUser } from "@clerk/nextjs";
import { Moneda } from "@/app/(routes)/Models/Moneda";

import { redirect, useRouter } from "next/navigation";



const formSchema = z.object({
  numero_factura: z.string().min(3).max(50),
  ncf: z.string().min(8).max(20),
  id_suplidor: z.string().min(1),
  fecha_emision: z.string(),
  fecha_vencimiento: z.string(),
  monto: z.number().min(1),
  id_usuario:z.string(),
  observaciones: z.string(),
  metodo_pago: z.string().min(1),
  id_moneda: z.string().min(1),

});

export function FormCreateCompra(prop: FormCreateCompraProps) {
  const { setOpenModalCreate } = prop;
  
  const { user } = useUser();

if(!user){
  return  redirect('/')
}
const routes = useRouter();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numero_factura: "",
      ncf: "",
      id_suplidor: "",
      fecha_emision: "",
      id_usuario: "",
      fecha_vencimiento: "",
      monto:0,
      observaciones: "",
      metodo_pago:"",
      id_moneda: "",
    },
  });

  const [suplidores, setSuplidores] = useState<Suplidor[]>([]);
  const [metodos, setMetodos] = useState<Metodo_Pago[]>([]);
  const [monedas, setMonedas] = useState<Moneda[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const allSuplidores = await sqlAll("tbl_suplidores");
        setSuplidores(allSuplidores as unknown as Suplidor[]);

        const allMetodos = await sqlAll("tbl_metodo_pago");
        setMetodos(allMetodos as unknown as Metodo_Pago[]);

        const allMonedas = await sqlAll("tbl_monedas");
        setMonedas(allMonedas as unknown as Moneda[]);
      
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


      values.id_usuario=user?.id as string;

 

     const result = await AddData("tbl_facturas_suplidores", values  );
     
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
          action: <ToastAction altText="Try again">Try again</ToastAction>,
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
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="grid grid-cols-2 gap-3">
          <FormField
              control={form.control}
              name="id_suplidor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suplidor</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el suplidor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Seleccione el Suplidor</SelectLabel>
                        {suplidores.map((suplidor) => (
                          <SelectItem
                            key={suplidor.id}
                            value={suplidor.id.toString()}
                          >
                             {suplidor.nombre}
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
              name="numero_factura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>N Factura</FormLabel>
                  <FormControl>
                    <Input className="uppercase" required placeholder="numero de factura" {...field} />
                  </FormControl>
                  <FormDescription/>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ncf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NCF</FormLabel>
                  <FormControl>
                    <Input placeholder="numero de comprobante fiscal" {...field} />
                  </FormControl>
                  <FormDescription/>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="monto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="monto" {...field} 
                    required
                       onChange={(event) => {
                        const parsedValue = Number(event.target.value);
                        if (!isNaN(parsedValue)) {
                          field.onChange(parsedValue);
                        }
                      }}/>
                  </FormControl>
                  <FormDescription/>
                  <FormMessage />
                </FormItem>
              )}
            />
               <FormField
              control={form.control}
              name="fecha_emision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Emision</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy").toString()
                          ) : (
                            <span>fecha de emision</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value) as Date}
                        onSelect={(date?) => field.onChange(format(date ?date:"", "yyyy-MM-dd"))}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription/>
                  <FormMessage />
                </FormItem>
              )}
            />
               <FormField
              control={form.control}
              name="fecha_vencimiento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Vencimiento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy").toString()
                          ) : (
                            <span>fecha de vencimiento</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value) as Date}
                        onSelect={(date?) => field.onChange(format(date ?date:"", "yyyy-MM-dd"))}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription/>
                  <FormMessage />
                </FormItem>
              )}
            />


             <FormField
              control={form.control}
              name="id_moneda"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Moneda</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione la meneda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Seleccione la Moneda</SelectLabel>
                        {monedas.map((moneda) => (
                          <SelectItem
                            key={moneda.id}
                            value={moneda.id.toString()}
                          >
                             {moneda.flag} {moneda.nombre}
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
              name="metodo_pago"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de Pago</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el método de pago" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Seleccione el método de pago</SelectLabel>
                        {metodos.map((metodo) => (
                          <SelectItem
                            key={metodo.id}
                            value={metodo.id.toString()}
                          >
                             {metodo.nombre}
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
          <div>

        <FormField
          control={form.control}
          name="observaciones"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observación</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="describa la factura"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription/>
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
