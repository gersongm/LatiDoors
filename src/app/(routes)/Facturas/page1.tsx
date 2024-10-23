"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { z } from "zod";

// Definir el esquema de validación con Zod
const clienteSchema = z.object({
  nombre: z.string().min(1, "El nombre del cliente es requerido"),
  direccion: z.string().min(1, "La dirección es requerida"),
  telefono: z.string().min(1, "El teléfono es requerido"),
  ciudad: z.string().min(1, "La ciudad es requerida"),
  fecha_creacion: z.string().optional(),
  limite_credito: z.number().min(0, "El límite de crédito debe ser positivo"),
  isActivo: z.boolean(),
});

const productoSchema = z.object({
  id: z.string().optional(),
  nombre: z.string().min(1, "El nombre del producto es requerido"),
  cantidad: z.number().min(1, "La cantidad debe ser al menos 1"),
  precio_unitario: z.number().min(0, "El precio unitario debe ser mayor o igual a 0"),
  tipoITBIS: z.number().min(0),
  total: z.number().min(0),
});

const facturaSchema = z.object({
  numeroFactura: z.string().min(1, "El número de factura es requerido"),
  cliente: clienteSchema,
  fecha_emision: z.string(),
  productos: z.array(productoSchema),
  subtotal: z.number(),
  impuestos: z.number(),
  total: z.number(),
  estado: z.enum(["PENDIENTE", "PAGADA", "ANULADA"]),
  tipoComprobante: z.enum([
    "FACTURA_CONSUMIDOR_FINAL",
    "FACTURA_CREDITO_FISCAL",
    "NOTA_DEBITO",
    "NOTA_CREDITO",
  ]),
  ncf: z.string().min(1, "El NCF es requerido"),
  fecha_creacion: z.string(),
});

const FacturaForm: React.FC = () => {
  const [factura, setFactura] = useState({
    numeroFactura: "",
    cliente: {
      nombre: "",
      direccion: "",
      telefono: "",
      ciudad: "",
      fecha_creacion: new Date().toISOString(),
      limite_credito: 0,
      isActivo: true,
    },
    fecha_emision: new Date().toISOString(),
    productos: [],
    subtotal: 0,
    impuestos: 0,
    total: 0,
    estado: "PENDIENTE",
    tipoComprobante: "FACTURA_CONSUMIDOR_FINAL",
    ncf: "",
    fecha_creacion: new Date().toISOString(),
  });

  const [producto, setProducto] = useState({
    id: "",
    nombre: "",
    cantidad: 1,
    precio_unitario: 0,
    tipoITBIS: 0,
    total: 0,
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFactura((prevFactura) => ({
      ...prevFactura,
      [name]: value,
    }));
  };

  const handleProductoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProducto((prevProducto) => ({
      ...prevProducto,
      [name]: name === "cantidad" || name === "precio_unitario" ? Number(value) : value,
    }));
  };

  const addProducto = () => {
    try {
        // Validación con Zod antes de agregar el producto
        const productoValidado = productoSchema.parse(producto);
        const impuesto = productoValidado.precio_unitario * productoValidado.cantidad * productoValidado.tipoITBIS;
        const totalProducto = productoValidado.precio_unitario * productoValidado.cantidad + impuesto;

        setFactura((prevFactura) => ({
            ...prevFactura,
            productos: [...prevFactura.productos, { ...productoValidado, total: totalProducto }],
            subtotal: (prevFactura.subtotal || 0) + (productoValidado.precio_unitario * productoValidado.cantidad),
            impuestos: (prevFactura.impuestos || 0) + impuesto,
            total: (prevFactura.total || 0) + totalProducto,  // Asegúrate de que se inicialice como 0
        }));

        // Limpiar el formulario de productos después de agregar uno
        setProducto({
            id: "",
            nombre: "",
            cantidad: 1,
            precio_unitario: 0,
            tipoITBIS: 0,
            total: 0,
        });
        setErrors([]);
    } catch (error) {
        if (error instanceof z.ZodError) {
            setErrors(error.errors.map((err) => err.message));
        }
    }
};


  const handleSubmit = () => {
    try {
      // Validar el esquema de factura completo
      facturaSchema.parse(factura);
      console.log("Factura válida:", factura);
      setErrors([]);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.errors.map((err) => err.message));
      }
    }
  };

  return (
    <form>
      <Typography variant="h4" gutterBottom>
        Crear Factura
      </Typography>
      <Grid container spacing={2}>
        {/* Mostrar errores si existen */}
        {errors.length > 0 && (
          <Grid item xs={12}>
            {errors.map((error, index) => (
              <Typography key={index} color="error">
                {error}
              </Typography>
            ))}
          </Grid>
        )}

        {/* Información del Cliente */}
        <Grid item xs={12}>
          <Typography variant="h6">Datos del Cliente</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Nombre"
            name="nombre"
            value={factura.cliente.nombre}
            fullWidth
            onChange={(e) =>
              setFactura((prev) => ({
                ...prev,
                cliente: { ...prev.cliente, nombre: e.target.value },
              }))
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Dirección"
            name="direccion"
            value={factura.cliente.direccion}
            fullWidth
            onChange={(e) =>
              setFactura((prev) => ({
                ...prev,
                cliente: { ...prev.cliente, direccion: e.target.value },
              }))
            }
          />
        </Grid>

        {/* Productos */}
        <Grid item xs={12}>
          <Typography variant="h6">Agregar Producto</Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Nombre del Producto"
            name="nombre"
            value={producto.nombre}
            fullWidth
            onChange={handleProductoChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Cantidad"
            name="cantidad"
            type="number"
            value={producto.cantidad}
            fullWidth
            onChange={handleProductoChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Precio Unitario"
            name="precio_unitario"
            type="number"
            value={producto.precio_unitario}
            fullWidth
            onChange={handleProductoChange}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel>ITBIS</InputLabel>
            <Select
              label="ITBIS"
              name="tipoITBIS"
              value={producto.tipoITBIS}
              onChange={(e) =>
                setProducto((prev) => ({ ...prev, tipoITBIS: parseFloat(e.target.value as string) }))
              }
            >
              <MenuItem value={0}>0%</MenuItem>
              <MenuItem value={0.12}>12%</MenuItem>
              <MenuItem value={0.18}>18%</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={addProducto}>
            Agregar Producto
          </Button>
        </Grid>

        {/* Botón de enviar */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Guardar Factura
          </Button>
        </Grid>
      </Grid>
    </form>
 

  );
};

export default FacturaForm;
