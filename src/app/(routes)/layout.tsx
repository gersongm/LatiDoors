
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  } from "@clerk/nextjs"
import { Dashboard } from "./Dashboard/page"

export default function LayoutDashboard({children}:{children:React.ReactElement}) {

const estadoDelDia=new Date().getHours()
const saludo=estadoDelDia<12?"Buenos días":estadoDelDia<18?"Buenas tardes":"Buenas noches"

  return (
    <div className='flex w-full h-full items-center justify-center' > 
       <SignedOut>
       <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100">
      <div className="text-3xl font-bold text-gray-800 mb-4">{saludo + ", que gusto volver a verle!"} </div>
      <div className="text-lg text-gray-500">Precione para iniciar sesión</div>
    
     <SignInButton mode="modal">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Iniciar sesión
        </button>
      </SignInButton>
    </div>
              </SignedOut>
              <SignedIn>
                <Dashboard children={children}/>
              </SignedIn>
    </div>
  )
}
