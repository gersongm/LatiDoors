import React from 'react'
import { HeaderInventario } from './components/HeaderInventario'
import { ListInventario,DisponibleInventario } from './components/ListInventario'

export default function Inventario() {
  return (
    <div>
      <HeaderInventario/>
      <DisponibleInventario/>
      <ListInventario/>
    </div>
  )
}
