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

import sqlAll, { sqlAdd } from "@/app/Backend/sql/sqlAll";

import { Mercancia } from "@/app/(routes)/Models/Mercancia";
import { Cuenta } from "@/app/(routes)/Models/Cuenta";
import { Usuario } from "@/app/(routes)/Models/Usuario";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";


const formSchema = z.object({
  fecha_movimiento: z.date().readonly(),
  tipo_movimiento: z
    .string({ required_error: "El tipo de movimiento es requerido" })
    .min(5)
    .max(50),
  cantidad: z.number({ required_error: "La cantidad es requerida" }).min(1),
  flag: z.string({ required_error: "El flag es requerido" }).min(1),
  id_articulo: z.string({ required_error: "El Producto es requerido" }).min(1),
  id_user: z.number(),
  id_cuenta: z.string({ required_error: "La cuenta es requerida" }).min(1),
});
export function FormCreateInventario(props: FormCreateInventarioProps) {
  const { setOpenModalCreate } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fecha_movimiento:new Date(),
      tipo_movimiento: "",
      cantidad: 0,
      flag: "",
      id_articulo: "",
      id_user: 0,
      id_cuenta: "",
    },
  });

  const [productos, setProductos] = useState<Mercancia[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Usuarios = await sqlAll("tbl_users");
        setUsuarios(Usuarios as Usuario[]);

        const Productos = await sqlAll("tbl_mercancias");

        setProductos(Productos as Mercancia[]);
        ///////////////////////////////
        const Cuentas = await sqlAll("tbl_cuentas");
        setCuentas(Cuentas as Cuenta[]);
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
 
    values.id_user = 1;
    values.fecha_movimiento =new Date(format( values.fecha_movimiento,"MM-dd-yyyy"));
    try {
        console.log(values);
      const result = await sqlAdd("tbl_inventario", values);

      if (result) {
        toast({
          title: "Guardar",
          description: result.respuesta, // description: "Se ha creado el banco correctamente",
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
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd/MM/yyyy").toString()
                          ) : (
                            <span>fecha de movimiento</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value) as Date}
                        onSelect={field.onChange}
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
              name="flag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flag</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={"E"}> Entrada</SelectItem>
                        <SelectItem value={"S"}> Salida</SelectItem>
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
                  <FormLabel>Producto</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el producto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
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
                  <FormLabel>Ingrese la cantidad</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingrese la cantidad"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
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
                            value={cuenta.id.toString()}
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
