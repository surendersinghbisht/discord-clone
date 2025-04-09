import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { FC, memo, useState } from "react";
import { axiosInstance } from "../../api/api";
import {toast} from "react-hot-toast";
import { Link } from "react-router-dom";

type signupProps = {};

const Signup: FC<signupProps> = (props) => {

const queryClient = useQueryClient();

  const[formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  });

  const { mutate: signUpMutation } = useMutation({
    mutationFn: async (data: { name: string; username: string; email: string; password: string }) => {
        console.log("Sending data:", data);
        const res = await axiosInstance.post("/auth/signup", data);
        return res.data;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error:any)=> {
      console.log(error.response.data.message )
      toast.error(error.response.data.message || "something went wrong");
    }
  });
  
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=> {
setFormData({
  ...formData, 
  [e.target.name] : e.target.value,
})
  }

  const submitForm = (e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault();
signUpMutation(formData);
  }

  return (
    <div
    className="min-h-screen flex items-center px-4 justify-center bg-cover bg-center"
    style={{ backgroundImage: "url('/login.png')" }} // Replace with your image path
  >
    <div className="bg-[#2c2f33] text-white w-full max-w-md rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create an account
      </h2>

      <form onSubmit={submitForm} className="space-y-4">
      <div>
          <label className="text-xs uppercase text-gray-300 mb-1 block">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full bg-[#23272a] text-white border border-[#202225] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="text-xs uppercase text-gray-300 mb-1 block">
            Username
          </label>
          <input
            type="text"
            value={formData.username}
            name="username"
            onChange={handleChange}
            placeholder="Choose a username"
            className="w-full bg-[#23272a] text-white border border-[#202225] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="text-xs uppercase text-gray-300 mb-1 block">
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Enter your email"
            className="w-full bg-[#23272a] text-white border border-[#202225] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>  

        <div>
          <label className="text-xs uppercase text-gray-300 mb-1 block">
            Password
          </label>
          <input
          name="password"
          value={formData.password}
          onChange={handleChange}
            type="password"
            placeholder="Create a password"
            className="w-full bg-[#23272a] text-white border border-[#202225] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 transition-colors text-white font-semibold py-2 rounded"
        >
          Continue
        </button>

        <p className="text-sm text-gray-400 text-center">
          Already have an account? <span className="text-indigo-400 hover:underline cursor-pointer"><Link to="/login">Login</Link></span>
        </p>
      </form>
    </div>
  </div>
   
  )
};

Signup.defaultProps = {};

export default memo(Signup);