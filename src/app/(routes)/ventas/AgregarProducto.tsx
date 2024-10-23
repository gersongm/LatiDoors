import React, { useEffect } from "react";
import { Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import { Control, Controller, UseFieldArrayAppend, FieldArrayWithId, FieldErrors, useWatch, useForm } from "react-hook-form";
import { FacturaFormValues } from "./schemas";

interface Props {
  control: Control<FacturaFormValues>;
  append: UseFieldArrayAppend<FacturaFormValues, "productos">;
  fields: FieldArrayWithId<FacturaFormValues, "productos", "id">[];
  errors: FieldErrors<FacturaFormValues>;
}

const AgregarProducto: React.FC<Props> = ({ control, append, fields, errors }) => {
  // Usar el hook useForm para obtener setValue
  const { setValue, getValues } = useForm<FacturaFormValues>({
    defaultValues: {
      productos: [],
    },
  });

  const handleAddProduct = () => {
    append({ nombre: "", cantidad: 1, precio_unitario: 0,cantidadDisponible:0, tipoITBIS: 0, descuento: 0, total: 0 });
  };

  // Monitorear cambios en los campos relevantes
  const productos = useWatch({
    control,
    name: "productos",
  });

  useEffect(() => {
    productos.forEach((producto, index) => {
      if (producto) {
        const { cantidad, precio_unitario, tipoITBIS, descuento } = producto;
        const precioConDescuento = precio_unitario * (1 - descuento / 100);
        const nuevoTotal = cantidad * precioConDescuento * (1 + tipoITBIS);
        
        // Solo actualizar si el total ha cambiado para evitar bucles infinitos
        const totalActual = getValues(`productos.${index}.total`);
        if (totalActual !== nuevoTotal) {
          setValue(`productos.${index}.total`, nuevoTotal);
        }
      }
    });
  }, [productos, setValue, getValues]);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6">Agregar Producto</Typography>
      </Grid>
      {fields.map((field, index) => (
        <React.Fragment key={field.id}>
          <Grid item xs={3}>
            <Controller
              name={`productos.${index}.nombre`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre del Producto"
                  fullWidth
                  error={!!errors.productos?.[index]?.nombre}
                  helperText={errors.productos?.[index]?.nombre?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              name={`productos.${index}.cantidadDisponible`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Disponible"
                  type="number"
                  fullWidth
                  error={!!errors.productos?.[index]?.cantidadDisponible}
                  helperText={errors.productos?.[index]?.cantidadDisponible?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              name={`productos.${index}.cantidad`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Cantidad"
                  type="number"
                  fullWidth
                  error={!!errors.productos?.[index]?.cantidad}
                  helperText={errors.productos?.[index]?.cantidad?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              name={`productos.${index}.precio_unitario`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Precio Unitario"
                  type="number"
                  fullWidth
                  error={!!errors.productos?.[index]?.precio_unitario}
                  helperText={errors.productos?.[index]?.precio_unitario?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              name={`productos.${index}.descuento`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descuento (%)"
                  type="number"
                  fullWidth
                  error={!!errors.productos?.[index]?.descuento}
                  helperText={errors.productos?.[index]?.descuento?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel>ITBIS</InputLabel>
              <Controller
                name={`productos.${index}.tipoITBIS`}
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value={0}>0%</MenuItem>
                    <MenuItem value={0.12}>12%</MenuItem>
                    <MenuItem value={0.18}>18%</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Controller
              name={`productos.${index}.total`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Total"
                  type="number"
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              )}
            />
          </Grid>
        </React.Fragment>
      ))}
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleAddProduct}>
          Agregar Producto
        </Button>
      </Grid>
    </>
  );
};

export default AgregarProducto;
