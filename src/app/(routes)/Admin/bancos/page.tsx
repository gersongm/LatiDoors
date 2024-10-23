
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { HeaderBancos } from './components/HeaderBancos'
import { ListBancos } from './components/ListBancos'
import { useState } from 'react';



export default function Bancos() {
  const { sessionClaims } = auth();
  // If the user does not have the admin role, redirect them to the home page
  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/");
  }

  return (
    <div>
      <HeaderBancos />
      <ListBancos /> 
    </div>
  )
}
