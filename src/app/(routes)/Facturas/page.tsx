import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Select, MenuItem, IconButton, Typography
} from '@mui/material';
import { Eye, DollarSign, Printer, Edit, Trash2 } from 'lucide-react';

const FacturacionComponent = () => {
  const rows = [
    { id: 51, fecha: 'April 17, 2023', cliente: 'Ana Hernández', montoTotal: 412.5, pagado: 412.5, debido: 0, vendidoPor: 'Diego Carmona Bernal' }
  ];

  return (
    <div style={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Facturación
      </Typography>

      {/* Botón de nueva factura */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Button variant="contained" color="primary">Nueva Factura</Button>
        <div style={{ display: 'flex', gap: 10 }}>
          <TextField label="Buscar por número de factura" variant="outlined" />
          <Select defaultValue="" displayEmpty>
            <MenuItem value="">Todos los clientes</MenuItem>
            <MenuItem value="Ana Hernández">Ana Hernández</MenuItem>
            {/* Puedes agregar más clientes aquí */}
          </Select>
        </div>
      </div>

      {/* Tabla de facturas */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Facturación</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Monto total</TableCell>
              <TableCell>Pagado</TableCell>
              <TableCell>Debido</TableCell>
              <TableCell>Vendido por</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.fecha}</TableCell>
                <TableCell>{row.cliente}</TableCell>
                <TableCell>{row.montoTotal}</TableCell>
                <TableCell>{row.pagado}</TableCell>
                <TableCell>{row.debido}</TableCell>
                <TableCell>{row.vendidoPor}</TableCell>
                <TableCell>
                  <IconButton><Eye size={20} /></IconButton>
                  <IconButton><DollarSign size={20} /></IconButton>
                  <IconButton><Printer size={20} /></IconButton>
                  <IconButton><Edit size={20} /></IconButton>
                  <IconButton><Trash2 size={20} /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FacturacionComponent;
