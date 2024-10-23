
import  instance from "@/Constants";


export const sqlIngresos = async () => {
    try {
      
        const response = await instance.get("Card/GetAll/?tipo=ingresos");
      
        return  response.data; // Assuming response.data indicates success
      } catch (error) {
        throw new Error(`Error obteniendo los datos : ${error}`); // More specific error message
      }
    };