import { Navigate, Route, Routes } from "react-router-dom"
import './App.css'
import SignUpPage from "./Pages/SignUpPage"
import LandingPage from "./Pages/LandingPage"
import { useQuery } from "@tanstack/react-query"
import {axiosInstance} from "../api/api"
import toast, { Toaster } from "react-hot-toast"
// import { IUser } from "./models/User"
import LoginPage from "./Pages/LoginPage"
function App() {

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        console.log("Fetched user data:", res.data); 
        return res.data;
      } catch (error) {
        console.error("Error fetching /me:", error.response?.data);
        if (error.response?.status === 401) {
          return null; 
        }
        toast.error(error.response?.data?.message || "Something went wrong");
        return null;
      }
    },
  });



  if(isLoading) return null;
  
  return (
    <div>
      <Routes>
        <Route path="/" element={authUser?<LandingPage />:<SignUpPage />}/>
        <Route path="/signup" element={!authUser? <SignUpPage />: <Navigate to="/" />} />
        <Route path="/login" element={!authUser? <LoginPage />: <Navigate to="/" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
