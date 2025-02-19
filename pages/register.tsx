import axios from "axios";
import { set } from "mongoose";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface LoginData {
  name: string;
  email: string;
  password: string;
  comPassword: string;
  // id: string;
  isAdmin: boolean;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    name: "",
    email: "",
    password: "",
    comPassword: "",
    // id: "",
    isAdmin: false,
  });
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.name || !formData.email || !formData.password || !formData.comPassword) {
      setError("Please fill all the fields");
      return;
    }
  
    if (formData.password !== formData.comPassword) {
      setError("Password and Confirm Password should be the same");
      return;
    }
  
    try {
      // console.log("pass1");
  
      const response = await axios.post("http://localhost:8000/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("pass2");
  
      if (response.status === 201) { 
        setError("Email exists, use another email");
      } else if (response.status === 200) {
        
        toast.success("User created successfully!");
        setError("");
        setFormData({
          name: "",
          email: "",
          password: "",
          comPassword: "",
          isAdmin: false,
        });

        setTimeout(() => {
          router.push("/"); 
        }, 2000);
      }
    } catch (err) {
      setError("Something went wrong"+ err);
    }
  };
  

  return (
    <>
      <div className="container mx-auto flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl text-blue-600 font-semibold ">Register Page</h1>
        <form method="POST"
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-lg p-8 w-1/3"
        >
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Conform Password
            </label>
            <input
              type="password"
              id="comPassword"
              name="comPassword"
              value={formData.comPassword}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter password again!!"
            />
          </div>

          {/* <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">
            User ID
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your ID"
          />
        </div> */}

          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={(e) =>
                setFormData({ ...formData, isAdmin: e.target.checked })
              }
              className="mr-2"
            />
            <label htmlFor="isAdmin" className="text-sm text-gray-700">
              Admin Login
            </label>
          </div>

          <div className="flex justify-between items-center">
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-800">
            Already have an account? Login
          </Link>
          
            <button
              type="submit"
              className="w-full mt-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegisterPage;
