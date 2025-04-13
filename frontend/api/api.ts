import axios from "axios";
import { io } from "socket.io-client";

export const axiosInstance = axios.create({
    baseURL: "https://discord-clone-nine-blond.vercel.app/api", withCredentials: true
})



const SOCKET_URL = "https://discord-clone-nine-blond.vercel.app/api"; 

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: true, 
});
