import  instance from "@/Constants";

export const AddBank = async ( rows: object) => {
    // Use a more reliable URL construction approach
    const url = '/Bank/Create'; // Add query parameter
  
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
  
      const response = await instance.post(url,formData);
  
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