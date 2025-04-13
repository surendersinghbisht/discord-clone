import axios from "axios";
import { io } from "socket.io-client";

export const axiosInstance = axios.create({
    baseURL: "https://discord-clone-api-nu.vercel.app/api", withCredentials: true
})



const SOCKET_URL = "https://discord-clone-api-nu.vercel.app/api"; 

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: true, 
});
