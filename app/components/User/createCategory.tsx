'use client'
import React, { useState } from "react";
import axios from "axios";

type category = {
  title: string;
  icon: string;
};

const CreateCategory: React.FC = () => {
  const [category, setCategory] = useState<category>({
    title: "",
    icon: "",
  }); 
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!category.title || !category.icon) {
      setError("Please fill in both fields");
      return;
    }

    try {

      const response = await axios.post("http://localhost:8000/category", category);


      if (response.status === 200) {
        setSuccess("Category created successfully!");
        setError(null); 
        setCategory({ title: "", icon: "" }); 
      }
    } catch (error: any) {
        setError(error.response.data);

    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center">Create Category</h1>

      {/* Display success or error message */}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Category Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={category.title}
            onChange={(e) => setCategory({...category , title: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg mt-1"
            placeholder="Enter category title"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
            Category Icon
          </label>
          <input
            type="text"
            id="icon"
            name="icon"
            value={category.icon}
            onChange={(e) => setCategory({ ...category, icon: e.target.value })} 
            className="w-full p-3 border border-gray-300 rounded-lg mt-1"
            placeholder="Enter category icon "
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;

