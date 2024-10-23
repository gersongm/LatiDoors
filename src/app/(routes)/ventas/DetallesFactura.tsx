import React from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem, TextField,Typography } from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FacturaFormValues } from "./schemas";

interface Props {
  control: Control<FacturaFormValues>;
  errors: FieldErrors<FacturaFormValues>;
}

const DetallesFactura: React.FC<Props> = ({ control, errors }) => (
  <>
    <Grid item xs={12}>
      <Typography variant="h6">Detalles de la Factura</Typography>
    </Grid>
    <Grid item xs={6}>
      <FormControl fullWidth>
        <InputLabel>Tipo de Comprobante</InputLabel>
        <Controller
          name="tipoComprobante"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              <MenuItem value="FACTURA_CONSUMIDOR_FINAL">Factura Consumidor Final</MenuItem>
              <MenuItem value="FACTURA_CREDITO_FISCAL">Factura Crédito Fiscal</MenuItem>
              <MenuItem value="NOTA_DEBITO">Nota de Débito</MenuItem>
              <MenuItem value="NOTA_CREDITO">Nota de Crédito</MenuItem>
            </Select>
          )}
        />
      </FormControl>
    </Grid>
    <Grid item xs={6}>
      <Controller
        name="ncf"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Número de Comprobante Fiscal (NCF)"
            fullWidth
            error={!!errors?.ncf}
            helperText={errors?.ncf?.message}
          />
        )}
      />
    </Grid>
  </>
);

export default DetallesFactura;
