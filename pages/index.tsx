import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface LoginData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        formData
      );

      if (response.status === 401) {
        setError("Password Not Match");
      } else if (response.status === 400) {
        setError("User not found");
      } else if (response.status === 200) {
        toast.success("Login SuccessFull");
        setError("");
        setTimeout(() => {
          router.push("/user"); 
        }, 2000);
      }
    } catch (err) {
      setError(err.response.data);
      
      
    }
  };

  return (
    <>
      <div className="container mx-auto  flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Login Page
        </h1>
        <form
          onSubmit={handleSubmit}
          className="shadow-xl rounded-lg p-8 w-1/3 "
        >
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {/* <div>
            <label htmlFor="name" className="block">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 "
              placeholder="Enter your name"
              required
            />
          </div> */}
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
              placeholder="Enter your email"
              required
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
              placeholder="Enter your password"
              required
            />
          </div>

          {/* <div>
            <label htmlFor="id" className="block">
              User ID
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
              className="border p-2 "
              placeholder="Enter your ID"
            />
          </div> */}

          {/* <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isAdmin"
                required
                checked={formData.isAdmin}
                onChange={(e) =>
                  setFormData({ ...formData, isAdmin: e.target.checked })
                }
                className="mr-2"
              />
              Admin Login
            </label>
          </div> */}

          <div className="flex justify-between items-center">
            <a
              href="/register"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Don't have an account? Register
            </a>
            <button
              type="submit"
              className="w-full mt-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default LoginPage;
