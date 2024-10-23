"use client";

import { useState } from "react";
import { TextField, Button, Grid, Container, Typography, InputAdornment, Switch, FormControlLabel, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import { z } from "zod";
import { Ban, Check, Save } from "lucide-react";
import { tipoDocumento, tiposDeComprobantes, tiposDeComprobantesElectronicos } from "./tipoComprovantesData";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormCreateComprobanteProps } from "./FormCreateComprobante.type";
import { sqlInsertComprobante } from "@/app/Backend/sql/sqlGetComprobantes";
import { ComprobantesFiscales } from "@/app/(routes)/Models/ComprobantesFiscales";

// Definir el esquema de validación usando Zod
const NCFSchema = z.object({
  documento: z.string().min(1, "El tipo de comprobante es requerido"),
  nombre: z.string().min(1, "El nombre del comprobante es requerido"),
  prefijo: z.string().min(1, "El prefijo es requerido"),
  inicial: z.number().positive("El número inicial debe ser positivo"),
  final: z.number().positive("El número final debe ser positivo"),
  siguiente: z.number().nonnegative("La secuencia actual no puede ser negativa"),
  expira: z.string().min(1, "La fecha de finalización es requerida"),
  isElectronico: z.boolean(),
}).refine((data) => data.final >= data.inicial, {
  message: "El número final debe ser mayor o igual al número inicial",
  path: ["final"],
});

// Tipos de datos para la configuración del NCF, inferidos de Zod
type NCFConfig = z.infer<typeof NCFSchema>;

export function NCFConfigForm(props: FormCreateComprobanteProps) {
  const { setOpenModalCreate } = props;

  const { isLoaded, user } = useUser();

  if (!isLoaded || !user) return null;

  // Configuración del formulario usando react-hook-form
  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<NCFConfig>({
    resolver: zodResolver(NCFSchema),
    mode: "onChange", // para validar en cada cambio
    defaultValues: {
      documento: "",
      prefijo: "",
      nombre: "",
      inicial: 1,
      final: 50,
      expira: "",
      isElectronico: true,
    },
  });

  const isElectronico = watch("isElectronico");

  const onSubmit = async (data: NCFConfig) => {
    data.siguiente = data.inicial;
    console.log("Configuración válida:", data);
    await sqlInsertComprobante(data as ComprobantesFiscales);
    setOpenModalCreate(false);
  };

  const allTiposDeComprobantes = isElectronico
    ? tiposDeComprobantesElectronicos
    : tiposDeComprobantes;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="left" marginBottom={5}>
        Configurar Numeración de Comprobantes NCF
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container columns={{ xs: 6, sm: 12, md: 6 }} spacing={3}>
          <Grid container xs={12} md={6} spacing={3}>
            {/* Tipo de Comprobante */}
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.documento}>
                <InputLabel id="label_documento">Tipo de Documento*</InputLabel>
                <Select
                  labelId="label_documento"
                  {...register("documento")}
                  fullWidth
                  size="small"
                >
                  {tipoDocumento.map((documento) => (
                    <MenuItem key={documento} value={documento}>
                      {documento}
                    </MenuItem>
                  ))}
                </Select>
                {errors.documento && (
                  <FormHelperText>{errors.documento.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* NCF electrónico */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    {...register("isElectronico")}
                  />
                }
                label="NCF electrónico"
              />
              {/* Prefijo */}
              <FormControl fullWidth error={!!errors.prefijo}>
                <InputLabel id="label_tipo">Tipo*</InputLabel>
                <Select
                  labelId="label_tipo"
                  {...register("prefijo")}
                  fullWidth
                  size="small"
                >
                  {allTiposDeComprobantes.map((comprobante) => (
                    <MenuItem key={comprobante.value} value={comprobante.value}>
                      {comprobante.label + ` (${comprobante.value})`}
                    </MenuItem>
                  ))}
                </Select>
                {errors.prefijo && (
                  <FormHelperText>{errors.prefijo.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Nombre */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Nombre*"
                {...register("nombre")}
                error={!!errors.nombre}
                helperText={errors.nombre?.message || ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Check size={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Número Inicial */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Número Inicial*"
                type="number"
                {...register("inicial", {
                  valueAsNumber: true, // Convierte automáticamente a número
                })}
                error={!!errors.inicial}
                helperText={errors.inicial?.message || ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Check size={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Número Final */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Número Final*"
                type="number"
                {...register("final", {
                  valueAsNumber: true, // Convierte automáticamente a número
                })}
                error={!!errors.final}
                helperText={errors.final?.message || ""}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Check size={20} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Fecha de Finalización */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Vigencia hasta*"
                type="date"
                {...register("expira")}
                InputLabelProps={{ shrink: true }}
                error={!!errors.expira}
                helperText={errors.expira?.message || ""}
              />
            </Grid>
          </Grid>

          <Grid container xs={12} md={6} spacing={3} justifyContent="flex-end" alignContent={"flex-end"}>
            {/* Botón de Enviar */}
            <Grid item xs={12} md={10} marginTop={{ xs: 3, md: 0 }}>
              <Button
                size="small"
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<Save />}
                disabled={!isValid}
              >
                Guardar
              </Button>
            </Grid>
            <Grid item xs={12} md={10}>
              <Button
                type="reset"
                size="small"
                fullWidth
                variant="contained"
                onClick={() => setOpenModalCreate(false)}
                color="secondary"
                startIcon={<Ban />}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
