import React, { useState } from 'react';
import { isValid, z } from 'zod';
import { TextField, Button, Checkbox, FormControlLabel, Box, Typography } from '@mui/material';
import { toast } from '@/components/ui/use-toast';
import { AddData } from '@/app/Backend/sql/sqlAll';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastAction } from '@radix-ui/react-toast';
import { Ban, Save, SaveAll } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Mercancia } from '@/app/(routes)/Models/Mercancia';
import { FormCreateMercanciaProps } from './FormCreateMercanciaProps';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";


import { redirect, useRouter } from "next/navigation";
import { useUser } from '@clerk/nextjs';

// Definir el esquema de validación con Zod
const mercanciaSchema = z.object({
    nombre: z.string().nonempty("El nombre es obligatorio"),
    descripcion: z.string().nonempty("La descripción es obligatoria"),
    precio_costo: z.number().min(0, "El precio de costo debe ser mayor o igual a 0"),
    precio_venta: z.number().min(0, "El precio de venta debe ser mayor o igual a 0"),
    categoria_id: z.string().nonempty("La categoría es obligatoria"),
    fecha_ingreso: z.string().nonempty("La fecha de ingreso es obligatoria"),
    isActivo: z.boolean(),
    almacen_id: z.string().nonempty("El ID del almacén es obligatorio"),
    suplidor_id: z.string().nonempty("El ID del suplidor es obligatorio"),
});

export function FormCreateMercancia(prop: FormCreateMercanciaProps) {

    const { setOpenModalCreate } = prop;

    const { user } = useUser();

    if (!user) {
        return redirect('/')
    }
    const routes = useRouter();

    const form = useForm<z.infer<typeof mercanciaSchema>>({
        resolver: zodResolver(mercanciaSchema),
        defaultValues: {
            nombre: '',
            descripcion: '',
            precio_costo: 0,
            precio_venta: 0,
            categoria_id: '',
            fecha_ingreso: '',
            isActivo: false,
            almacen_id: '',
            suplidor_id: ''
        },
    });




    const [mercancia, setMercancia] = useState<Mercancia>();


    const handleSubmit = async (values: z.infer<typeof mercanciaSchema>) => {

        try {

            const result = await AddData("tbl_merancias", values);

            if (result) {
                toast({
                    title: "Registro creado",
                    description: <p className="inline-flex gap-2">
                        <SaveAll /> {result.respuesta}
                    </p>
                });

                routes.refresh();
                setOpenModalCreate(false);
            } else {
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
                description: "No se pudo crear el registro.",
                variant: "destructive",
            });
            // Handle error gracefully, e.g., display an error message
        }
    };

    return (
        <div className="mt-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 ">
                    <div className="grid grid-cols-2 gap-3">

                        {/* Nombre */}
                        <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input className="uppercase" required placeholder="Nombre del artículo" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Descripción */}
                        <FormField
                            control={form.control}
                            name="descripcion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Input required placeholder="Descripción del artículo" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Precio de Costo */}
                        <FormField
                            control={form.control}
                            name="precio_costo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Precio de Costo</FormLabel>
                                    <FormControl>
                                        <Input required type="number" placeholder="Precio de costo" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Precio de Venta */}
                        <FormField
                            control={form.control}
                            name="precio_venta"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Precio de Venta</FormLabel>
                                    <FormControl>
                                        <Input required type="number" placeholder="Precio de venta" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Categoría ID */}
                        <FormField
                            control={form.control}
                            name="categoria_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoría ID</FormLabel>
                                    <FormControl>
                                        <Input required placeholder="ID de la categoría" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Fecha de Ingreso */}
                        <FormField
                            control={form.control}
                            name="fecha_ingreso"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fecha de Ingreso</FormLabel>
                                    <FormControl>
                                        <Input required type="date" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Activo */}
                        <FormField
                            control={form.control}
                            name="isActivo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Activo</FormLabel>
                                    <FormControl>
                                        <Checkbox {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Almacén ID */}
                        <FormField
                            control={form.control}
                            name="almacen_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Almacén ID</FormLabel>
                                    <FormControl>
                                        <Input required placeholder="ID del almacén" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Suplidor ID */}
                        <FormField
                            control={form.control}
                            name="suplidor_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Suplidor ID</FormLabel>
                                    <FormControl>
                                        <Input required placeholder="ID del suplidor" {...field} />
                                    </FormControl>
                                    <FormDescription />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Botones de Guardar y Cancelar */}
                    <div className="flex justify-end gap-2">
                        <Button type="submit" disabled={!isValid} variant="contained" color="primary">
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
};



