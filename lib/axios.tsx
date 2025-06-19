"use client"    
import axios from "axios";

const URL = "http://localhost:3000/api";

export const axiosInstance = axios.create({
    baseURL: URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    responseType: 'json',
})

