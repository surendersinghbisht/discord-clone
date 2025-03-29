import axios from "axios";
import { io } from "socket.io-client";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api", withCredentials: true
})



const SOCKET_URL = "http://localhost:5000"; 

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false, 
});
