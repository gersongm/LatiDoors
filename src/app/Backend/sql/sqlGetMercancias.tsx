import { Mercancia } from "@/app/(routes)/Models/Mercancia";
import  instance from "@/Constants";


export const sqlGetMercancias = async () => {
    // Use a more reliable URL construction approach
    let response = null;
    try {
      
      await instance({
        // url of the api endpoint (can be changed)
        url: "Mercancias/GetAll/",
        method: "GET",
      }).then((res) => {
        // handle success
        response= res.data as Mercancia[]; 
      });
  return response;
     
    } catch (error) {
      throw new Error(`Error fetching data:,${error}`);
      // Handle errors gracefully, e.g., return a default value or display an error message
    }
  };