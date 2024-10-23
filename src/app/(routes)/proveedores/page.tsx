import { Header } from '@/components/Header'
import React from 'react'
import { ListProveedores } from './components/ListProveedores'
import { HeaderProveedores } from './components/HeaderProveedores'

export default function page() {
  return (
    <div>
        <HeaderProveedores/>
        <ListProveedores/>
    </div>
  )
}
