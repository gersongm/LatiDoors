"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";


import { Ban, CalendarIcon, Save } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Button, TextField } from '@mui/material';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,

} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SelectData } from "@/app/Backend/sql/sqlAll";


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


import { FormCreateClienteProps } from "./FormCreateCliente.type";


import { sqlInsertCliente } from "@/app/Backend/sql/sqlGetClientes";


import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

import { useUser } from "@clerk/nextjs";
import { Tipo_Cliente } from "@/app/(routes)/Models/Tipo_Cliente";

const formSchema = z.object({
  nombre: z.string({ required_error: "El Nombre es requerido" }).min(3, {
    message: "El nombre debe tener al menos 3 caracteres",
  }),
  direccion: z.string({ required_error: "La Dirección es requerido" }).min(3, {
    message: "la Direción debe tener al menos 3 caracteres",
  }),
  telefono: z.string({ required_error: "El Teléfono es requerido" }).min(10, {
    message: "El nombre debe tener al menos 10 caracteres",
  }),
  email: z.string(),
  rnc: z.string(),
  cedula: z.string(),
  ciudad: z.string(),
  tipo_cliente: z.number(),
  fecha_creacion: z.string(),
  limite_credito: z.number(),
  isActivo: z.boolean(),
  referencia: z.string(),
  notas: z.string(),
});
export function FormCreateCliente(props: FormCreateClienteProps) {
  const { setOpenModalCreate } = props;
  const { isLoaded, user } = useUser();

  if (!isLoaded || !user) return null;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      direccion: "",
      telefono: "",
      email: "",
      rnc: "",
      cedula: "",
      ciudad: "",
      fecha_creacion: new Date().toLocaleDateString("es-ES"),
      limite_credito: 0,
      isActivo: true,
      referencia: "",
      notas: "",
      tipo_cliente: 1,
    },
  });

  const [tipoClientes, setTipoClientes] = useState<Tipo_Cliente[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const dataTipoClientes = await SelectData("tbl_tipos_cliente", "Select id,nombre,descuento");
        setTipoClientes(dataTipoClientes as unknown as Tipo_Cliente[]);


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
      const newString = values.fecha_creacion.split("/");

      const dias = newString[0];
      const meses = newString[1];
      const años = newString[2];
      const fechaFormateada = años + "-" + meses + "-" + dias;

      values.fecha_creacion = fechaFormateada;
      values.nombre = values.nombre.toUpperCase();


      const result = await sqlInsertCliente(values);

      if (result) {
    
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
    <div className="mt-2 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2  ">
        <div className="grid grid-cols-12 gap-2 ">
        <FormField
       
              control={form.control}
              name="fecha_creacion"
              render={({ field }) => (
                <FormItem  className="col-start-10 col-span-2">
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="text"
                          fullWidth
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value) as Date}
                        onSelect={(date?) =>
                          field.onChange(format(date ? date : "", "yyyy-MM-dd"))
                        }
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

          <div className="grid grid-cols-3 gap-2 w-full">
         
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>*Nombre Completo</FormLabel>
                  <FormControl>
                    <TextField
                      className="uppercase"
                      placeholder="*Ingrese su nombre completo"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      required
                      size="small"
                      fullWidth
                      
                    />

                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>*Teléfono</FormLabel>
                  <FormControl>
                    <TextField
                      placeholder="*Ingrese su teléfono"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      required
                      size="small"
                      fullWidth
                    />

                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <TextField
                      placeholder="Ingrese su correo electrónico"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      size="small"
                      fullWidth
                    />

                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cedula"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cédula</FormLabel>
                  <FormControl>
                    <TextField
                      placeholder="Ingrese su cédula"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      size="small"
                      fullWidth
                    />

                  </FormControl>
                  <FormDescription></FormDescription>
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
                    <TextField
                      placeholder="Ingrese su numero de comerciantes"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      size="small"
                      fullWidth
                    />

                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipo_cliente"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Cliente</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo de cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel></SelectLabel>
                        {tipoClientes.map((tipo) => (
                          <SelectItem
                            key={tipo.id}
                            value={tipo.id.toString()}
                          >
                            {tipo.nombre + ` (Porciento de descuento ${tipo.descuento}%)`}
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
              name="limite_credito"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Límite de Crédito</FormLabel>
                  <FormControl>
                    <TextField
                      type="number"
                      placeholder="Ingrese la cantidad"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      size="small"
                      fullWidth
                    />

                  </FormControl>
                  <FormDescription></FormDescription>
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
                    <TextField
                      placeholder="Ingrese un nombre de referencia"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      size="small"
                      fullWidth
                    />

                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>*Dirección</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="*Ingrese la dirección"
                      className="resize-none *:w-full"
                      onChange={(e) => field.onChange(e.target.value)}
                      required
                    />

                  </FormControl>
                  <FormDescription></FormDescription>
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
                      placeholder="Puede ingresar algunas notas referente al cliente"
                      className="resize-none *:w-full"
                      onChange={(e) => field.onChange(e.target.value)}
                    />

                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <div className="flex  justify-end gap-2">
            <Button
              type="submit"
              disabled={!isValid}
              variant="contained" color="primary"
            >
              <Save size={20} className="mr-2" /> Guardar
            </Button>
            <Button type="reset" onClick={() => setOpenModalCreate(false)} variant="outlined" color="secondary">
              <Ban size={20} className="mr-2" /> Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
