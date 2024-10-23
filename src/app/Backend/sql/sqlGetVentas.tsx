import { Ventas } from "@/app/(routes)/Models/Ventas";
import  instance from "@/Constants";
export const sqlGetVentas = async () => {
    // Use a more reliable URL construction approach
   
    try {
      
  let response= await instance.get("Ventas/GetAll/"); 
  
  return response.data as Ventas[];
     
    } catch (error) {
      throw new Error(`Error obteniendo los datos:,${error}`);
      // Handle errors gracefully, e.g., return a default value or display an error message
    }
  };