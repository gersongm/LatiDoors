import { Header } from '@/components/Header'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

function page({params}:{params:{compraId:string}}) {
    
    const {userId} = auth()
    if(!userId){
      return  redirect('/')
    }
  return (
  <>
     <h1>{params.compraId}</h1>
     <Header title='Ver Compra'/>
  </>
 
  )
}

export default page
