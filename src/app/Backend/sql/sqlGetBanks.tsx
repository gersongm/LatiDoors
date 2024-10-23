import { Banco } from "@/app/(routes)/Models/Banco";
import  instance from "@/Constants";


export const sqlGetBanks = async () => {
    // Use a more reliable URL construction approach
    let response = null;
    try {
       const response= await instance.get("Bank/GetAll/");
       return response.data as Banco[]; 
      } catch (error) {
      throw new Error(`Error fobteniendo los datos:,${error}`);
      // Handle errors gracefully, e.g., return a default value or display an error message
    }
  };

  export const sqlInsertBanco = async (banco: Banco) => {
    try {
      
      const response = await instance.post("Bank/Create/", banco);
      return response.data; // Assuming response.data indicates success
    } catch (error) {
      throw new Error(`Error insertando los datos : ${error}`); // More specific error message
    }
  };