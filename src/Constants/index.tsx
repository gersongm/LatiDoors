import axios from "axios";
import { API_SERVER_URL } from "@/app/constantes";



 const instance = axios.create({
    baseURL: API_SERVER_URL,
    timeout: 1000,
    headers: {
      "Content-Type": "application/json", 
      //'X-Custom-Header': 'foobar'
      //'Authorization': `Bearer ${_TOKEN_KEY}`
      
    },
    
  });


export default instance;