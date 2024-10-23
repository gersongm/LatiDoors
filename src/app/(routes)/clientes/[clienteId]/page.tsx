
'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { WhereData } from '@/app/Backend/sql/sqlAll';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { Cliente } from '../../Models/Cliente';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    Divider,
    Button,
  } from "@mui/material";
import { ArrowLeft } from 'lucide-react'; 
import { useRouter } from 'next/navigation';
import { formatDate } from '@/lib/formatDate';
import { currencyFormatter } from '@/funtions';

function page() {
   let {clienteId}=useParams();
   
   const [cliente, setCliente] = useState<Cliente>();

   const router = useRouter();

   const handleBack = () => {
     router.back();
   };

   useEffect(() => {
     const fetchData = async () => {
       try {
       
      const dataCliente = await WhereData("tbl_clientes",`id=${clienteId}`);
          setCliente(dataCliente[0] as unknown as Cliente);
         
           
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



      if (!cliente) {
        return <Typography>No hay datos de cliente disponibles.</Typography>;
      }
    console.log(cliente);
      return (
        <Box sx={{ padding: 4 ,
            height: '90%',
            borderRadius: 1
          }}>
        <Button
          variant="contained"
          startIcon={<ArrowLeft />}
          onClick={() => router.back()}
          sx={{ mb: 4 }}
        >
          Volver
        </Button>
        <Grid container spacing={4}>
          
            <Grid item xs={6} >
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent sx={{width: '100%', }}>
                  <Typography variant="h5" component="div">
                    {cliente.nombre}
                  </Typography>
                  {cliente.telefono && (
                  <Typography variant="body2" color="text.primary">
                    Teléfono: {cliente.telefono}
                  </Typography>)}
                  <Typography variant="body2" color="text.primary">
                    Estado: {cliente.isActivo ? "Activo" : "Inactivo"}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" color="text.primary">
                    Fecha de Creación: {cliente.fecha_creacion}
                  </Typography>
                  {cliente.email && (
                    <Typography variant="body2" color="text.primary">
                      Email: {cliente.email}
                    </Typography>
                  )}
                    {cliente.cedula && (
                    <Typography variant="body2" color="text.primary">
                      Cédula: {cliente.cedula}
                    </Typography>
                  )}
                  {cliente.rnc && (
                    <Typography variant="body2" color="text.primary">
                      RNC: {cliente.rnc}
                    </Typography>
                  )}
                
                  {cliente.direccion && 
                  (<Typography variant="body2" color="text.primary">
                    Dirección: {cliente.direccion}
                  </Typography>)}
                  <Typography variant="body2" color="text.secondary">
                    {cliente.ciudad}
                  </Typography>
              
                  <Typography variant="body2" color="text.primary">
                    Límite de Crédito: {currencyFormatter(cliente.limite_credito)}
                  </Typography>
                 
                  {cliente.referencia && (
                    <Typography variant="body2" color="text.primary">
                      Referencia: {cliente.referencia}
                    </Typography>
                  )}
                  {cliente.fecha_ultima_compra && (
                    <Typography variant="body2" color="text.primary">
                      Última Compra:{" "}
                      {formatDate( cliente.fecha_ultima_compra)}
                    </Typography>
                  )}
                  {cliente.notas && (
                    <Typography variant="body2" color="text.secondary">
                      Notas: {cliente.notas}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
        
        </Grid>
      </Box>
      );
 };
    



export default page
