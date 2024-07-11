import React from 'react'
import { useUser } from '@clerk/nextjs';

export  function ShowFullName() {
  const { user } = useUser();
  return (
    <div className="hidden lg:block  tracking-tight">{`Bienvenid@ ${user?.fullName}`}</div>
  )
}
