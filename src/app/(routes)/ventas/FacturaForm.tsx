"use client";

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  IconButton,
  Paper,
} from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Ban, SquareX } from "lucide-react";
import { sqlGetMercanciasDisponible } from "@/app/Backend/sql/sqlGetInventario";
import { Cliente } from "../Models/Cliente";
import AllData from "@/app/Backend/sql/sqlAll";
import { Inventario } from "../Models/Inventario";
import { Save, Plus } from "lucide-react";
import { FormaDePago, TipoComprobanteFiscal } from "../Models/Factura";

type FormValues = {
  cliente: {
    id: string;
    nombre: string;
    direccion: string;
    telefono: string;
    ciudad: string;
  };
  fecha: Date;
  productos: {
    id: string;
    nombre: string;
    cantidad: number;
    precio_unitario: number;
    cantidadDisponible: number;
  }[];
  tipoComprobante: TipoComprobanteFiscal;
  formaDePago: FormaDePago;
  ncf: string;
  subtotal: number;
  itbis: number;
  total: number;
  descuento: number;
};

const FacturaForm: React.FC = () => {
  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      cliente: {
        nombre: "",
        direccion: "",
        telefono: "",
        ciudad: "",
      },
      fecha: new Date(),
      productos: [],
      tipoComprobante: "FACTURA_CONSUMIDOR_FINAL",
      formaDePago: "EFECTIVO",
      ncf: "",
      subtotal: 0,
      itbis: 0,
      total: 0,
      descuento: 0,
    },
  });
  const [productosDisponibles, setProductosDisponibles] = useState<Inventario[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "productos",
  });

  const productos = watch("productos");

  // Función para obtener la fecha actual en formato YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Aseguramos formato de 2 dígitos
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // useEffect para establecer la fecha actual al cargar el componente
  useEffect(() => {
    const currentDate = getCurrentDate();
    setValue("fecha", new Date(currentDate)); // Establecemos el valor en el formulario
  }, [setValue]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await sqlGetMercanciasDisponible();
        if (response) {
          const data = response;
          setProductosDisponibles(data);
        } else {
          throw new Error("Error al obtener productos");
        }
      } catch (error) {
        throw new Error("Error al obtener productos:" + error);
      }
    };
    fetchProductos();
  }, []);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await AllData("tbl_clientes");
        if (response) {
          const data = response;
          setClientes(data);
        } else {
          console.error("Error al obtener productos");
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchClientes();
  }, []);

  // useEffect para calcular el subtotal, ITBIS y total en función de los productos
  useEffect(() => {
    let nuevoSubtotal = 0;
    let nuevoITBIS = 0;
    const itebis = 0.18;
    const descuento = 5;

    productos.forEach((producto) => {
      if (producto) {
        const { cantidad, precio_unitario } = producto;
        const precioConDescuento = precio_unitario * (1 - descuento / 100);
        const totalProducto = cantidad * precioConDescuento;
        const itbisProducto = totalProducto * itebis;

        nuevoSubtotal += totalProducto;
        nuevoITBIS += itbisProducto;
      }
    });

    const nuevoDescuento = nuevoSubtotal * (descuento / 100);
    const nuevoTotal = nuevoSubtotal + nuevoITBIS;

    setValue("subtotal", nuevoSubtotal);
    setValue("descuento", nuevoDescuento);
    setValue("itbis", nuevoITBIS);
    setValue("total", nuevoTotal);
  }, [productos, setValue]);

  const handleClientSelect = (clientId: string) => {
    const selectedClient = clientes.find((c) => c.id === clientId);
    if (selectedClient) {
      setValue("cliente.id", selectedClient.id || "");
      setValue("cliente.nombre", selectedClient.nombre);
      setValue("cliente.direccion", selectedClient.direccion);
      setValue("cliente.telefono", selectedClient.telefono);
      setValue("cliente.ciudad", selectedClient.ciudad);
    }
  };




  const handleProductSelect = (index: number, productId: string) => {
    const selectedProduct = productosDisponibles.find(
      (p) => p.id === productId
    );
    if (selectedProduct) {
      setValue(`productos.${index}.nombre`, selectedProduct.nombre || "");
      setValue(
        `productos.${index}.cantidadDisponible`,
        selectedProduct.cantidad
      );
      setValue(`productos.${index}.precio_unitario`, selectedProduct.precio || 0);
    }
  };

  const handleAddProduct = () => {
    append({
      id: "",
      nombre: "",
      cantidad: 1,
      precio_unitario: 0,
      cantidadDisponible: 0,
    });
  };

  const onSubmit = (data: any) => {
    console.log("Datos de la factura:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4" gutterBottom>
        Crear Factura
      </Typography>
      <Grid container spacing={2}>
        {/* Información del Cliente */}
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: "6px", marginBottom: "16px" }}>
            <Typography variant="h6">Datos del Cliente</Typography>
            <Grid container >
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Cliente</InputLabel>
                  <Controller
                    name="cliente.id"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        size="small"
                        onChange={(e) => {
                          field.onChange(e);
                          handleClientSelect(e.target.value);
                        }}
                      >
                        {clientes.map((cliente) => (
                          <MenuItem key={cliente.id} value={cliente.id}>
                            {cliente.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="cliente.telefono"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      InputProps={{ readOnly: true }}
                      size="small"
                      label="Teléfono"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="cliente.direccion"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      InputProps={{ readOnly: true }}
                      size="small"
                      label="Dirección"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Información de Factura */}
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: "6px", marginBottom: "16px" }}>
            <Typography variant="h6">Información de Factura</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Tipo de Comprobante</InputLabel>
                  <Controller
                    name="tipoComprobante"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} size="small">
                        <MenuItem value="FACTURA_CONSUMIDOR_FINAL">
                          Factura Consumidor Final
                        </MenuItem>
                        <MenuItem value="FACTURA_CREDITO_FISCAL">
                          Factura Crédito Fiscal
                        </MenuItem>
                        <MenuItem value="FACTURA_NOTA_DEBITO">
                          Nota de Débito
                        </MenuItem>
                        <MenuItem value="FACTURA_NOTA_CREDITO">
                          Nota de Crédito
                        </MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Forma de Pago</InputLabel>
                  <Controller
                    name="formaDePago"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} label="Forma de Pago" size="small">
                        {/* Opciones de FormaDePago */}
                        <MenuItem value="EFECTIVO">Efectivo</MenuItem>
                        <MenuItem value="TARJETA">Tarjeta</MenuItem>
                        <MenuItem value="TRANSFERENCIA">Transferencia</MenuItem>
                        <MenuItem value="CHEQUE">Cheque</MenuItem>
                        <MenuItem value="CREDITO">Crédito</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="fecha"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="date"
                      label="Fecha"
                      InputLabelProps={{ shrink: true }}
                      size="small"
                      fullWidth
                       margin="dense"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Productos */}
      <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
        <Typography marginBottom={3} variant="h6">Productos</Typography>
        <Grid container spacing={2} alignItems="center">
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Producto</InputLabel>
                  <Controller
                    name={`productos.${index}.id`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        size="small"
                        onChange={(e) => {
                          field.onChange(e);
                          handleProductSelect(index, e.target.value);
                        }}
                      >
                        {productosDisponibles.map((producto) => (
                          <MenuItem key={producto.id} value={producto.id}>
                            {producto.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <Controller
                  name={`productos.${index}.cantidadDisponible`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Cant. Disp."
                      InputProps={{ readOnly: true }}
                      size="small"
                      fullWidth
                      margin="normal"
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
                      size="small"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <Controller
                  name={`productos.${index}.precio_unitario`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Precio Unitario"
                      InputProps={{ readOnly: true }}
                      size="small"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  color="secondary"
                  onClick={() => remove(index)}
                  aria-label="Eliminar producto"
                >
                  <SquareX />
                </IconButton>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Plus />}
          onClick={handleAddProduct}
        >
          Agregar Producto
        </Button>
      </Paper>
      {/* Resumen */}
      <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
        <Grid container spacing={2} mt={3}>
          <Grid item xs={6} sm={3}>
            <Controller
              name="subtotal"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Subtotal"
                  InputProps={{ readOnly: true }}
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Controller
              name="itbis"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="ITBIS"
                  InputProps={{ readOnly: true }}
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Controller
              name="descuento"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descuento"
                  InputProps={{ readOnly: true }}
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Controller
              name="total"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Total"
                  InputProps={{ readOnly: true }}
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </Grid>
        </Grid>
      </Paper>

      <Grid justifyItems={'flex-end'} container item xs={4} spacing={4}>
        <Grid item >
        <Button
          variant="contained"
          color="primary"
          startIcon={<Save />}
          type="submit"
        >
          Guardar 
        </Button>
        </Grid>
        <Grid item >
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Ban />}
          type="reset"
        >
          Cancelar
        </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FacturaForm;
