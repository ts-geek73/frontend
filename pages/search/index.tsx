'use client'

import { useRouter, useSearchParams } from 'next/navigation';
// import movies from '@/app/constants/movies.json'
// import catagory from '@/app/constants/catagory.json'
import { useEffect, useState } from 'react';
import LoaderComp from '@/app/components/LoaderComp';
import MovieCard from '@/app/components/MovieCard';
import Pagination from '@/app/components/Pagination';
import Header from '@/app/components/Header';
import axios from 'axios';

interface Movie {
    _id: string;
    movie_id: number;
    title: string;
    release: number;
    director: string;
    description: string;
    rating: number;
    categories: number[];
    __v: number;
    image: string;
}

interface Category {
    category_id: number;
    title: string;
}

const Search = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [moviePerPage] = useState(12);
    const [selectedCategory, setSelectedCategory] = useState<string>('All'); // Default to 'All'
    const [movies, setMovies] = useState<Movie[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

      const route = useRouter();
      if (typeof window !== "undefined") {
        const userData = localStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          if (user.isAdmin) {
            route.push("/unauthorized");
          }
        }
      }


    const searchParams = useSearchParams();
    const query = searchParams?.get('query') || '';
    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:8000/movie');
                console.log(response.data);
                
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
                
            } finally {
                setIsLoading(false); 
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/category');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchMovies();
        fetchCategories();
    }, []);

    const lastMovie = currentPage * moviePerPage;
    const firstMovie = lastMovie - moviePerPage;

    const data = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.director.toLowerCase().includes(query.toLowerCase())
    );

    const filteredData = selectedCategory === 'All'
        ? data
        : data.filter((movie) =>
            movie.categories.some((catId) => {
                const category = categories.find(cat => cat.category_id === catId);
                return category?.title.toLowerCase().includes(selectedCategory.toLowerCase());
            })

        );

        const movieLength = filteredData.length;
        const currentMovies = filteredData.slice(firstMovie, lastMovie);
    
        const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedCategory(event.target.value);
            setCurrentPage(1);
        }

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false); 
        }, 1000); 
        
        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div>
            {isLoading ? (
                <LoaderComp />
            ) : (
                <>
                    {query && data.length > 0 ? (
                        <>
                            <Header />
                            <div className="flex justify-around">
                                <h1 className="text-2xl text-center p-5 sm:text-4xl font-bold">Search: {query}</h1>
                                <select value={selectedCategory} onChange={handleCategoryChange} className="mb-5 p-2">
                                    <option value="All">All Categories</option> {/* Add "All" option */}
                                    {categories.map((item, index) => (
                                        <option key={index} value={item.title}>{item.title}</option>
                                    ))}
                                </select>
                            </div>
                            {filteredData.length > 0 ? (
                                <>
                                    <div className='grid xl:grid-cols-3 justify-center lg:grid-cols-2 grid-cols-1 gap-8 p-6 sm:px-20 md:px-52 lg:px-32 xl:px-60'>
                                        {currentMovies.map((data, index) => (
                                            <MovieCard key={index} data={data} />
                                        ))}
                                    </div>
                                    <Pagination length={movieLength} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                                </>
                            ) : (
                                <h2 className="text-center font-semibold text-xl">No movies found</h2>
                            )}
                        </>
                    ) : query ? (
                        <h1>No data found for "{query}"</h1>
                    ) : (
                        <h1>No search term entered.</h1>
                    )}
                </>
            )}
        </div>
    );
};

export default Search;