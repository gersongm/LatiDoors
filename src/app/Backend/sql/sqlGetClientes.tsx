import { Cliente } from "@/app/(routes)/Models/Cliente";
import  instance from "@/Constants";

export const sqlInsertCliente = async (cliente: Cliente) => {
    try {
      
      const response = await instance.post("Clientes/Create/", cliente);
      return response.data; // Assuming response.data indicates success
    } catch (error) {
      throw new Error(`Error insertando los datos : ${error}`); // More specific error message
    }
  };
  export const sqlGetCliente = async () => {
    try {
      
      const response = await instance.get("Clientes/GetAll/");
      return response.data; // Assuming response.data indicates success
    } catch (error) {
      throw new Error(`Error obteniendo los datos : ${error}`); // More specific error message
    }
  };