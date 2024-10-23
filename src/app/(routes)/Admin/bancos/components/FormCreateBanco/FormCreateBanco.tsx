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

import  { SelectData,WhereData } from "@/app/Backend/sql/sqlAll";
import { sqlInsertBanco } from "@/app/Backend/sql/sqlGetBanks";
import { redirect } from "next/navigation";

const formSchema = z.object({
  nombre: z.string().min(3).max(50),
  nCuenta: z.string().min(8).max(15),
  cuenta: z.string().min(1),
  moneda: z.string().min(1),
  tipo_cuenta: z.string().min(1),
  fecha_corte: z.string().min(1),
  isActivo:z.boolean(),
});

export function FormCreateBanco(prop: FormCreateBancoProps) {
  const { setOpenModalCreate } = prop;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      nCuenta: "",
      cuenta: "",
      fecha_corte: "",
      moneda: "",
      tipo_cuenta: "",
      isActivo:true,
    },
  });

  const [tipoCuentas, setTipoCuentas] = useState<TipoCuenta[]>([]);
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);
  const [monedas, setMonedas] = useState<Moneda[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tipoMonedas = await SelectData("tbl_monedas","SELECT id,flag,nombre");
        
        setMonedas(tipoMonedas  as Moneda[]);

        const DataTipoCuentas = await SelectData("tbl_tipo_cuenta","SELECT id ,nombre");

        setTipoCuentas(DataTipoCuentas  as TipoCuenta[]);
        ///////////////////////////////
        const Cuentas = await WhereData("tbl_cuentas", "is_banco=true");
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
    try {
     const result = await sqlInsertBanco( values );
   
      if(result){
        toast({
          title: 'Éxito',
          description:`Registro ${result} guardado con èxito`,  // description: "Se ha creado el banco correctamente",
        });
       
      setOpenModalCreate(false);
      }else {
        toast({
          variant: "destructive",
          title: "Uff! Algo salió mal.",
          description: result.error
        })
      }
   
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema con su solicitud.",
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
              name="moneda"
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
              name="tipo_cuenta"
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
              name="cuenta"
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


