
import  instance from "@/Constants";
export const sqlReportesVentas = async () => {
    // Use a more reliable URL construction approach
   
    try {
      
  let response= await instance.get("ReportesVentas/GetAll/"); 
  
  return response.data ;
     
    } catch (error) {
      throw new Error(`Error obteniendo los datos:,${error}`);
      // Handle errors gracefully, e.g., return a default value or display an error message
    }
  };