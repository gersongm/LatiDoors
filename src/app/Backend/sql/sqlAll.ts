import { API_SERVER_URL } from "@/app/constantes";
import instance from "@/Constants"; // Assuming axios is installed



const AllData = async (tabla: string) => {
  try {
    const respuesta = await instance.get(`?tabla=${tabla}`);
   
    return respuesta.data;
  } catch (error) {
    // Maneja el error según la lógica de tu aplicación (ej: lanza error específico, retorna datos predeterminados)
    throw new Error(`Error obteniendo datos para la tabla ${tabla}`); // Ejemplo de manejo de error
  }
};
export default AllData;

export const deleteData = async (tabla: string, id: string) => {
  // Use a more reliable URL construction approach
  const url = new URL(API_SERVER_URL);
  url.searchParams.append("tabla", tabla); // Add query parameter
  url.searchParams.append("id", id.toString());

  try {
    const formData = new FormData();
    formData.append("METHOD", "DELETE");
    formData.append("isVisible", "false");
    const response = await fetch(url.toString(), {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors gracefully, e.g., return a default value or display an error message
    return null; // Or provide a user-friendly message
  }
};

export const AddData = async (tabla: string, rows: object) => {


  try {
    const formData = new FormData();
    // Loop through each row in the array and append data

    Object.entries(rows).forEach(([key, value]) => {
      if (key !== "id") {
        if (key === "isActivo") {
          value = +value;
        } // pasa el boleano a numerico
        formData.append(key, value);
      }
    });

    const response = await instance.post("?tabla=" + tabla, formData, {
      // Use axios.post for simplicity
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    
      return response.data;
    
  } catch (error) {
    throw new Error(`HTTP error! con la base de datos`);
    // Handle errors gracefully, e.g., return a default value or display an error message
    return [{ error: error }]; // Or provide a user-friendly message
  }
};

export const UpdateData = async (tabla: string, rows: object) => {
  // Use a more reliable URL construction approach
  const url = new URL(API_SERVER_URL);
  url.searchParams.append("tabla", tabla); // Add query parameter

  try {
    const formData = new FormData();
    formData.append("METHOD", "UPDATE");
    // Loop through each row in the array and append data

    Object.entries(rows).forEach(([key, value]) => {
      if (key === "isActivo") {
        value = +value;
      } // pasa el boleano a numerico
      formData.append(key, value);
    });
    const response = await fetch(url.toString(), {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", rows);
    // Handle errors gracefully, e.g., return a default value or display an error message
    return null; // Or provide a user-friendly message
  }
};

export const SelectData = async (tabla: string, consulta: string) => {
  try {
    const respuesta = await instance.get(`?tabla=${tabla}&sql=${consulta}`);
    return respuesta.data;
  } catch (error) {
    // Maneja el error según la lógica de tu aplicación (ej: lanza error específico, retorna datos predeterminados)
    throw new Error(`Error obteniendo datos para la tabla ${tabla}`); // Ejemplo de manejo de error
  }
};

export const SearchData = async ( consulta: string) => {
  // Use a more reliable URL construction approach

  try {
  
    // Send a GET request with query parameters
    const response = await instance.get(`?search=${consulta}`);
 
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo datos`);
  }
};

export const WhereData = async (tabla: string, isWhere: string) => {
  // Use a more reliable URL construction approach

  try {
    // Send a GET request with query parameters
    const response = await instance.get(`?tabla=${tabla}&where=${isWhere}`);
  
    return response.data;
  } catch (error) {
    throw new Error(`Error obteniendo datos para la tabla ${tabla}`);
  }
};

export const sqlDelete = async (tabla: string, id: string|undefined) => {
 // Assuming a specific endpoint for DELETE

  try {
    const consulta=`DELETE FROM ${tabla} WHERE id=${id}`;
    // Send a DELETE request with query parameters
    const response = await instance.post(`?sql=${consulta}`);

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    // Handle errors gracefully (more on this later)
  }
};
