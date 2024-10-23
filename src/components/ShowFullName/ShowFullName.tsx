import React from 'react'
import { useUser } from '@clerk/nextjs';

export  function ShowFullName() {
  const { user } = useUser();
  return (
    <div className="hidden lg:block pr-2 tracking-tight">{`Bienvenid@ ${user?.fullName}`}</div>
  )
}
