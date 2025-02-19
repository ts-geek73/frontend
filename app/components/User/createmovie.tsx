'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

interface movieInter {
    title: string;
    description: string;
    rating: number;
    release: number;
    director: string;
    categories: string[];
    image: string;
}

const Admin = () => {
    const [movieData, setMovieData] = useState<movieInter>({
        title: "",
        description: "",
        rating: 0,
        release: 1950,
        director: "",
        categories: [],
        image: "", 
    });
    const [categories, setCategories] = useState<Array<{ category_id: number; title: string }>>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/category');
                setCategories(response.data);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (!movieData.title || !movieData.description || !movieData.rating || !movieData.release || !movieData.director || movieData.categories.length === 0) {
            setError("Please fill out all fields.");
            return;
        }
        
        if (movieData.description.length < 10) {
            setError("Description must be at least 10 characters long.");
            return;
        }
        
        if (movieData.description.length > 500) {
            setError("Description must be less than 500 characters.");
            return;
        }

    
        // if (movieData.release < 1900 || movieData.release > new Date().getFullYear()) {
        //     setError("Release year must be valid.");
        //     return;
        // }

        try {
            // console.log("Movie Data:", movieData);
            
            const response = await axios.post('http://localhost:8000/movie', movieData, {
                headers: {
                    'Content-Type': 'application/json', 
                },
            });

            if (response.status === 201) {
                toast.success("Movie created successfully!");
                setError("");
                setMovieData({
                    title: "",
                    description: "",
                    rating: 0,
                    release: 1950,
                    director: "",
                    categories: [],
                    image: "",
                });
            }
        } catch (error) {
            // console.error("Error:", error);
            toast.error("Error ");
            console.error("Error:", error);
            if (axios.isAxiosError(error)) {
                toast.error(`Error: ${error.response?.data || "Unknown error"}`);
            } else {
                toast.error("Error while creating movie.");
            }
        }
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
        setMovieData((prevData) => ({...prevData,categories: selectedCategories}));
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setMovieData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="m-auto p-7 text-center">
            <h1>Movie Create Page</h1>
            <form onSubmit={handleSubmit} 
            method="post" 
            className="grid gap-3 justify-center py-5">

                <div className="flex border-b-2 items-center justify-evenly p-4 gap-5">
                    <label htmlFor="title">Movie Title:</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={movieData.title}
                        onChange={handleChange}
                        placeholder="Enter Movie Name"
                        className="border-2 p-1"
                    />
                </div>

                <div className="flex border-y-2 items-center justify-between p-4 gap-5">
                    <label htmlFor="desc">Movie Description:</label>
                    <textarea
                        name="description"
                        id="desc"
                        rows={4}
                        value={movieData.description}  
                        onChange={handleChange}  
                        cols={25}
                        placeholder="Describe the Movie"
                        className="border-2 p-1"
                    />
                </div>

                <div className="flex border-b-2 items-center justify-evenly p-4 gap-5">
                    <label htmlFor="rating">IMDB Ratings:</label>
                    <input
                        type="number"
                        name="rating"
                        id="rating"
                        min={0}
                        max={10}
                        value={movieData.rating}
                        onChange={handleChange}
                        className="border-2 p-1"
                    />
                </div>

                <div className="flex border-b-2 items-center justify-evenly p-4 gap-5">
                    <label htmlFor="release">Release Year:</label>
                    <input
                        type="number"
                        name="release"
                        id="release"
                        className="border-2"
                        value={movieData.release}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex border-b-2 items-center justify-evenly p-4 gap-5">
                    <label htmlFor="director">Director Name:</label>
                    <input
                        type="text"
                        name="director"
                        id="director"
                        value={movieData.director}
                        onChange={handleChange}
                        placeholder="Enter Movie Director Name"
                    />
                </div>

                <div className="flex border-b-2 items-center justify-evenly p-4 gap-5">
                    <label htmlFor="categories">Categories:</label>
                    <select
                        multiple
                        name="categories"
                        id="categories"
                        className="border-2"
                        value={movieData.categories}
                        onChange={handleCategoryChange}
                    >
                        {categories.map((category) => (
                            <option key={category.category_id} value={category.category_id.toString()}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex border-b-2 items-center justify-evenly p-4 gap-5">
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="text"
                        name="image"
                        id="image"
                        value={movieData.image}
                        onChange={handleChange}
                        placeholder="Enter Movie Image URL"
                        className="border-2 p-1"
                    />
                </div>

                {error && <div className="text-red-500">{error}</div>}

                <button type="submit"
                className='bg-red-300 w-28 h-11 rounded-lg m-auto'>Submit</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Admin;
