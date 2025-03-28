import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { FC, memo, useState } from "react";
import { axiosInstance } from "../../api/api";
import {toast} from "react-hot-toast";

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
    
      <form onSubmit={submitForm}>
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
    <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
      <div className="flex-1 bg-blue-900 text-center hidden md:flex">
        <div
          className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
          }}
        ></div>
      </div>
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div className=" flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
              Student Sign up
            </h1>
            <p className="text-[12px] text-gray-500">
              Hey enter your details to create your account
            </p>
          </div>
          <div className="w-full flex-1 mt-8">
            <div className="mx-auto max-w-xs flex flex-col gap-4">
              <input
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                name="name"
              />
              <input
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                value={formData.username}
                placeholder="Enter your user name"
                onChange={handleChange}
                name="username"
              />
              <input
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange}
                name="email"
              />
              <input
                className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
                name="password"
              />
              <button className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              type="submit"
              >
                <svg
                  className="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span className="ml-3">Sign Up</span>
              </button>
              <p className="mt-6 text-xs text-gray-600 text-center">
                Already have an account?{" "}
                <a href="">
                  <span className="text-blue-900 font-semibold">Sign in</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </form>
   
  )
};

Signup.defaultProps = {};

export default memo(Signup);