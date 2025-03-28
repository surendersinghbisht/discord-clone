import React, { useState } from "react";
import { axiosInstance } from "../../api/api";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const query = useQueryClient();
  
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const {mutate: submitFormMutation, isPending} = useMutation({
  mutationFn: async(data: {email: string, password: string})=>{
const res = await axiosInstance.post("/auth/login", data);
return res.data;
  },
  onSuccess: ()=> {
    toast.success("logged in successfully");
     query.invalidateQueries({queryKey: ["authUser"]})

  },
  onError: (error:any)=> {
    console.log(error.response.data.message )
    toast.error(error.response.data.message || "something went wrong");
  }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   submitFormMutation(formData)
   
  };

  return (
    <div className="flex flex-col justify-center items-center bg-zinc-950 min-h-screen pb-5">
      <div className="mx-auto flex w-full flex-col justify-center px-5 md:max-w-[50%] lg:max-w-[50%] lg:px-6">
        <div className="my-auto mt-8 flex flex-col w-[350px] mx-auto">
          <p className="text-[32px] font-bold text-white">Sign In</p>
          <p className="mb-2.5 mt-2.5 text-zinc-400">Enter your email and password to sign in!</p>

          <div className="mt-8">
            <form className="pb-2">
              <button className="flex items-center justify-center w-full text-white border border-zinc-800 py-3 rounded-md hover:bg-accent">
                <span className="mr-2">🔵</span>
                <span>Sign in with Google</span>
              </button>
            </form>
          </div>

          <div className="relative my-4 flex items-center">
            <div className="flex-1 border-t border-zinc-800"></div>
          </div>

          {/* ✅ Corrected onSubmit placement */}
          <form className="mb-4" onSubmit={submitForm}>
            <div className="grid gap-2">
              <label className="text-white" htmlFor="email">
                Email
              </label>
              <input
                className="w-full p-3 bg-zinc-950 border border-zinc-800 text-white rounded-md focus:outline-none"
                id="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                name="email"
              />

              <label className="text-white mt-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full p-3 bg-zinc-950 border border-zinc-800 text-white rounded-md focus:outline-none"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                name="password"
              />

              {isPending? <h1>...loading</h1>:<button type="submit" className="mt-6 w-full bg-white text-zinc-950 py-3 rounded-md hover:bg-white/90">
                Sign in
              </button>}
            </div>
          </form>

          <p>
            <a href="/signup" className="text-white text-sm">
              Don't have an account? Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
