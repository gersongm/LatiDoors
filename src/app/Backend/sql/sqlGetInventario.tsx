import { Inventario } from "@/app/(routes)/Models/Inventario";
import  instance from "@/Constants";


export const sqlGetInventario = async () => {
    // Use a more reliable URL construction approach
    let response = null;
    try {
      
      await instance({
        // url of the api endpoint (can be changed)
        url: "Inventario/GetAll/",
        method: "GET",
      }).then((res) => {
        // handle success
        response= res.data as Inventario[]; 
      });
  return response;
     
    } catch (error) {
      throw new Error(`Error fetching data:,${error}`);
      // Handle errors gracefully, e.g., return a default value or display an error message
    }
  };

export const sqlGetInventarioDisponible = async () => {
    // Use a more reliable URL construction approach
   
    try {
      
  let response= await instance.get("Inventario/Disponibles/"); 
      
  return response.data as Inventario[];
     
    } catch (error) {
      throw new Error(`Error obteniendo los datos:,${error}`);
      // Handle errors gracefully, e.g., return a default value or display an error message
    }
  };
  export const sqlGetMercanciasDisponible = async () => {
    // Use a more reliable URL construction approach
   
    try {
      
  let response= await instance.get("Mercancias/Disponibles/"); 
      
  return response.data as Inventario[];
     
    } catch (error) {
      throw new Error(`Error obteniendo los datos:,${error}`);
      // Handle errors gracefully, e.g., return a default value or display an error message
    }
  };

  export const sqlInsertInventario = async (inventario: Inventario) => {
    try {
      
      const response = await instance.post("Inventario/Create/", inventario);
      return response.data; // Assuming response.data indicates success
    } catch (error) {
      throw new Error(`Error insertando los datos : ${error}`); // More specific error message
    }
  };