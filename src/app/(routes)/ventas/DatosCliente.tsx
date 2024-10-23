import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FacturaFormValues } from "./schemas";

interface Props {
  control: Control<FacturaFormValues>;
  errors: FieldErrors<FacturaFormValues>;
}

const DatosCliente: React.FC<Props> = ({ control, errors }) => (
  <>
    <Grid item xs={12}>
      <Typography variant="h6">Datos del Cliente</Typography>
    </Grid>
    <Grid item xs={6}>
      <Controller
        name="cliente.nombre"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nombre del Cliente"
            fullWidth
            error={!!errors?.cliente?.nombre}
            helperText={errors?.cliente?.nombre?.message}
          />
        )}
      />
    </Grid>
    <Grid item xs={6}>
      <Controller
        name="cliente.direccion"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Dirección"
            fullWidth
            error={!!errors?.cliente?.direccion}
            helperText={errors?.cliente?.direccion?.message}
          />
        )}
      />
    </Grid>
  </>
);

export default DatosCliente;
