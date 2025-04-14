import React, { useState } from "react";
import { axiosInstance } from "../../api/api";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Login = () => {
  const query = useQueryClient();

  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const { mutate: submitFormMutation, isPending } = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axiosInstance.post("/auth/login", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Logged in successfully");
      query.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error: any) => {
      console.error(error.response?.data?.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitFormMutation(formData);
  };

  return (
    <div className="min-h-screen bg-[url('/login.png')] bg-cover bg-center flex items-center justify-center px-4">
      <form onSubmit={submitForm} className="w-full max-w-4xl bg-[#2C2F33]/95 text-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-1">Welcome back!</h2>
          <p className="text-sm text-gray-300 mb-6">We're so excited to see you again!</p>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-xs font-semibold uppercase block mb-1">
                Email or Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-[#1E1F22] border border-[#1E1F22] rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-semibold uppercase block mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-3 py-2 bg-[#1E1F22] border border-[#1E1F22] rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                required
              />
            </div>

            <div className="text-sm text-indigo-400 hover:underline">
              <a href="#">Forgot your password?</a>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={`w-full bg-indigo-500 hover:bg-indigo-600 transition px-4 py-2 rounded-sm font-medium ${
                isPending ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {isPending ? "Logging in..." : "Log In"}
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-6">
            Need an account?{" "}
            <Link to="/signup" className="text-indigo-400 hover:underline">
              Register
            </Link>
          </p>
        </div>

        {/* Right - QR Section */}
        <div className="hidden sm:flex w-full md:w-1/2 border-t md:border-t-0 md:border-l border-[#202225] p-8 items-center justify-center">
  <div className="flex flex-col items-center text-center">
    <img
      src="/discord-logo.webp"
      alt="QR Code"
      className="w-40 h-40 rounded-full mb-4"
    />
    <h3 className="text-lg font-semibold">Log in.</h3>
    <p className="text-sm text-gray-300 mt-2">
  This is a Discord clone. <span className="font-semibold">Developed By Surender.</span><br />
  Don’t have an account? <span className="text-indigo-400 hover:underline cursor-pointer"><Link to="/signup">Register a new account</Link></span>.
</p>

  </div>
</div>

      </form>
    </div>
  );
};

export default Login;
