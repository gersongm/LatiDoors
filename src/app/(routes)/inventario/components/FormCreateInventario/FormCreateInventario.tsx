"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

import { Ban, CalendarIcon, Save } from "lucide-react";

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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";

import { FormCreateInventarioProps } from "./FormCreateInventario.type";

import {SelectData}  from "@/app/Backend/sql/sqlAll";
import { sqlInsertInventario } from "@/app/Backend/sql/sqlGetInventario";

import { Mercancia } from "@/app/(routes)/Models/Mercancia";
import { Cuenta } from "@/app/(routes)/Models/Cuenta";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

import {useUser} from "@clerk/nextjs";

const formSchema = z.object({
  fecha_movimiento: z.string(),
  tipo_movimiento: z
    .string({ required_error: "El tipo de movimiento es requerido" }),
   
  cantidad: z.number({ required_error: "La cantidad es requerida" }).min(1),
  flag: z.string(),
  id_articulo: z.string({ required_error: "El Producto es requerido" }),
  id_user: z.string(),
  id_cuenta: z.string({ required_error: "La cuenta es requerida" }).min(1),
});
export function FormCreateInventario(props: FormCreateInventarioProps) {
  const { setOpenModalCreate } = props;
  const {isLoaded,user}=useUser();

  if(!isLoaded || !user) return null;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fecha_movimiento:new Date().toLocaleDateString("es-ES"),
      tipo_movimiento: "",
      cantidad: 0,
      flag: "",
      id_articulo: "",
      id_user: "",
      id_cuenta: "",
    },
  });

  const [productos, setProductos] = useState<Mercancia[]>([]);
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
     const Mercancias = await SelectData("tbl_mercancias","Select id,nombre");
         setProductos(Mercancias as unknown as Mercancia[]);
        
           const Cuentas = await SelectData("tbl_cuentas", "Select id,cuenta,descripcion");
        setCuentas(Cuentas as unknown as Cuenta[]); 
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
       const newString=values.fecha_movimiento.split("/");

       const dias=newString[0];
       const meses=newString[1];
       const años=newString[2];
       const fechaFormateada=años+"-"+meses+"-"+dias;
      
    
     
       values.id_user=user.id;
        values.fecha_movimiento = fechaFormateada;
        values.flag = values.tipo_movimiento === "Compras" ? 
        "E" : values.tipo_movimiento === "Ventas" ? "S":"D";
        
      const result = await sqlInsertInventario(values);
  
      if (result) {
        toast({
          title: "Éxito",
          description:`Registro ${result} guardado con èxito`, // description: "Se ha creado el banco correctamente",
        });
        setOpenModalCreate(false);
      } else {
        
        toast({
          variant: "destructive",
          title: "Uff! Algo salió mal.",
          description: "Hubo un problema con su solicitud.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar el registro",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="fecha_movimiento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Movimiento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal ",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value }
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
              name="tipo_movimiento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo Movimiento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo de movimiento..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={"Compras"}> Compras</SelectItem>
                        <SelectItem value={"Ventas"}> Ventas</SelectItem>
                        <SelectItem value={"Devolución"}> Devolución</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
       
            <FormField
              control={form.control}
              name="id_articulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Producto/Servicio</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el producto" />
                    </SelectTrigger>
                    <SelectContent>
                     <SelectGroup>
                     <SelectLabel>Mercancia</SelectLabel>
                         {productos.map((producto) => (
                          <SelectItem
                            key={producto.id}
                            value={ producto.id.toString()}
                          >
                            {producto.nombre}
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
              name="cantidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingrese la cantidad"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />

                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="id_cuenta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuenta Contable</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione la cuenta contable..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Cuenta Contable</SelectLabel>
                         {cuentas.map((cuenta) => (
                          <SelectItem
                            key={cuenta.id}
                            value={cuenta.cuenta.toString()}
                          >
                            {cuenta.cuenta} {cuenta.descripcion}
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
            <Button
              type="submit"
              disabled={!isValid}
              className="bg-blue-400 hover:bg-blue-500 text-white"
            >
              <Save size={20} className="mr-2" /> Guardar
            </Button>
            <Button type="reset" onClick={() => setOpenModalCreate(false)}>
              <Ban size={20} className="mr-2" /> Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
