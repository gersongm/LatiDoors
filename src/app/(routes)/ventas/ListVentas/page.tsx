import React, { useEffect, useState } from 'react';
import {
  Button, TextField, Autocomplete, Typography, Drawer, IconButton
} from '@mui/material';
import { CirclePlus, X } from 'lucide-react'; // X es el icono de cerrar
import { columns } from "./columns";
import { DataTable } from '@/components/ShowDataTable/DataTable';
import { Ventas } from '../../Models/Ventas';
import { GridRowsProp } from '@mui/x-data-grid';
import { Cliente } from '../../Models/Cliente';
import { sqlGetCliente } from '@/app/Backend/sql/sqlGetClientes';
import { toast } from '@/components/ui/use-toast';
import FacturaForm from '../FacturaForm';

type VentasProps = {
  ventas: GridRowsProp<Ventas>;
  UptadeVentas:()=>void;
};

const FacturacionComponent = (props: VentasProps) => {
  const { ventas,UptadeVentas } = props;
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [verFactura, setVerFactura] = useState(false); // Control del Drawer
  const [filteredVentas, setFilteredVentas] = useState<Ventas[]>([]); // State for filtered ventas

  useEffect(() => {
    if (ventas && ventas.length > 0) {
      setFilteredVentas([...ventas]); 
    }
  }, [ventas]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataClientes = await sqlGetCliente() as Cliente[];
        setClientes(dataClientes);
      } catch (error) {
        toast({
          description: "Error al cargar los datos",
          title: "Error",
        });
      }
    };

    fetchData();
  }, []);

  const handleChange = (value: number, newValue: string | Cliente | null) => {
    const selectedClientId = Number(typeof newValue === 'string' ? newValue : newValue ? newValue.id : null);

    if (selectedClientId > 0) {
      const filtered = ventas.flat().filter((venta: Ventas) => venta.cliente_id === selectedClientId);
      setFilteredVentas(filtered);
    } else {
      setFilteredVentas([...ventas]);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    if (Number(searchTerm) !== 0 && searchTerm !== null && searchTerm !== "") {
      const filtered = ventas.flat().filter((venta: Ventas) => venta.id === Number(searchTerm));
      setFilteredVentas(filtered);
    } else {
      setFilteredVentas([...ventas]);
    }
  };

  return (
    <div className="mt-5">
      <Typography variant="h4" gutterBottom>
        Gestión de Facturas
      </Typography>

      {/* Botón de nueva factura */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Button
          variant="contained"
          onClick={() => setVerFactura(true)} // Abre el Drawer al hacer clic
          size="small"
          color="primary"
        >
          <CirclePlus style={{ marginRight: 5 }} size={20} /> Nueva Factura
        </Button>

        <div style={{ display: 'flex', gap: 5 }}>
          <TextField
            size="small"
            label="Buscar por número de factura"
            variant="outlined"
            onChange={handleSearchChange}
          />
          <Autocomplete
            id="include-input-in-list"
            freeSolo
            onChange={(event: any, newValue: string | Cliente | null) => handleChange(event, newValue)}
            options={clientes}
            getOptionLabel={(option: string | Cliente) =>
              typeof option === 'string' ? option : option.nombre
            }
            size="small"
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Clientes" variant="outlined" />
            )}
          />
        </div>
      </div>

      {/* Tabla de facturas */}
      <DataTable
        columns={columns}
        data={filteredVentas} // Use filteredVentas for data display
      />

      {/* Drawer lateral para mostrar el formulario */}
      <Drawer
        anchor="top" // Abre desde la derecha
        open={verFactura} // Controla si el drawer está abierto o cerrado
        onClose={() =>{ setVerFactura(false); UptadeVentas();}} // Cierra el Drawer
        PaperProps={{
          sx: { width: '100vw' } // Cambia el ancho del Drawer al 70% del viewport
        }}
      >
        {/* Contenido del Drawer */}
        <div style={{ padding: 20 }}>
          {/* Botón de cierre */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={() => setVerFactura(false)}>
              <X size={20} />
            </IconButton>
          </div>

          {/* Formulario de factura */}
          <FacturaForm />
        </div>
      </Drawer>
    </div>
  );
};

export default FacturacionComponent;
