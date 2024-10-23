import { ComprobantesFiscales } from "@/app/(routes)/Models/ComprobantesFiscales";
import instance from "@/Constants";

export const sqlInsertComprobante = async (comprobante: ComprobantesFiscales) => {
    try {
      
      const response = await instance.post("Comprobantes/Create/", comprobante);
      return response.data; // Assuming response.data indicates success
    } catch (error) {
      throw new Error(`Error insertando los datos : ${error}`); // More specific error message
    }
  };