
import { Navbar } from "../../../components/Navbar";
import { Sidebar } from "../../../components/Sidebar";


export async function  Dashboard({children}:{children:React.ReactElement}) {


  return (
    <div className='flex w-full h-full ' > 
    <div className="hidden lg:block w-60 h-full lg:fixed overflow-auto">
        <Sidebar/>
    </div>
    <div className="w-full lg:ml-60">
        <Navbar/>
        <div className="bg-[#fafbfc] dark:bg-secondary shadow-sm  p-6">
        {children}
        </div>
       
    </div>
    </div>
  )
}