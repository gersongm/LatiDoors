import { SignIn } from '@clerk/nextjs'
import React from 'react'

export  function loging() {
  return (
    <div className='flex  justify-center items-center'>
        <SignIn/>
    </div>
  )
}
