import axios from "axios"
import { config } from "process"


export const axiosInstance  = axios.create({
    baseURL :"localhost:3000/",
    timeout:10000,
    headers: {
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer TOKEN',   
  },
    responseType: 'json', 
})

