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

import { FormCreateBancoProps } from "./FormCreateBanco.type";

import { Cuenta } from "@/app/(routes)/Models/Cuenta";
import { TipoCuenta } from "@/app/(routes)/Models/TipoCuenta";
import { Moneda } from "@/app/(routes)/Models/Moneda";

import sqlAll, { sqlSelect,sqlAdd } from "@/app/Backend/sql/sqlAll";

const formSchema = z.object({
  nombre: z.string().min(3).max(50),
  nCuenta: z.string().min(8).max(50),
  id_cuenta: z.string().min(1),
  id_moneda: z.string().min(1),
  id_tipo_cuenta: z.string().min(1),
  fecha_corte: z.string().min(1),
});

export function FormCreateBanco(prop: FormCreateBancoProps) {
  const { setOpenModalCreate } = prop;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      nCuenta: "",
      id_cuenta: "",
      fecha_corte: "",
      id_moneda: "",
      id_tipo_cuenta: "",
    },
  });

  const [tipoCuentas, setTipoCuentas] = useState<TipoCuenta[]>([]);
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);
  const [monedas, setMonedas] = useState<Moneda[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tipoMomendas = await sqlAll("tbl_monedas");
        setMonedas(tipoMomendas as Moneda[]);

        const tipoCuentas = await sqlAll("tbl_tipo_cuenta");

        setTipoCuentas(tipoCuentas as TipoCuenta[]);
        ///////////////////////////////
        const cuentas = await sqlSelect("tbl_cuentas", "SELECT * FROM tbl_cuentas WHERE is_banco=true");
        setCuentas(cuentas as Cuenta[]);
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
     const result = await sqlAdd("tbl_bancos", values  );
     console.log(result)
      if(result){
        toast({
          title: "Banco creado",
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
        description: "No se pudo crear el banco",
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
                  <FormLabel>Nombre del Banco</FormLabel>
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
              name="nCuenta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuenta Bancaria</FormLabel>
                  <FormControl>
                    <Input placeholder="123-456789-10-11" {...field} />
                  </FormControl>
                  <FormDescription>Digite minimo(3) caracteres</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fecha_corte"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de corte</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el dia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Dia</SelectLabel>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(
                          (day) => (
                            <SelectItem key={day} value={day.toString()}>
                              {day}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione la moneda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Seleccione la moneda</SelectLabel>
                        {monedas.map((money) => (
                          <SelectItem
                            key={money.id}
                            value={money.id.toString()}
                          >
                            {money.flag} {money.nombre}
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
              name="id_tipo_cuenta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Cuenta</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo de cuenta" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tipo de cuenta</SelectLabel>
                        {tipoCuentas.map((tipo) => (
                          <SelectItem key={tipo.id} value={tipo.id.toString()}>
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
              name="id_cuenta"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuenta Contable</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione la cuenta contable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Cuenta contable para entazar</SelectLabel>
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
