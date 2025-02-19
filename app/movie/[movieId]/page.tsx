'use client' // This is a Client Component

import LoaderComp from '@/app/components/LoaderComp';
import Image from 'next/image';
import { useState, useEffect, use } from 'react';
import Header from '@/app/components/Header';
import axios from 'axios';
import { StaticImport } from 'next/dist/shared/lib/get-img-props'; // Import if needed

interface Movie {
    title: string;
    description: string;
    rating: number;
    release: number;
    director: string;
    categories: number[];
    image?: string | StaticImport;
}

interface Category {
    category_id: number;
    title: string;
}

interface PageProps {
    params: Promise<{ movieId: number }>; 
}

const Page: React.FC<PageProps> = ({ params }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [movie, setMovie] = useState<Movie | null>(null); // Initialize as null
    const [categoryTitles, setCategoryTitles] = useState<Category[]>([]);
    const movieId = use(params).movieId;

    useEffect(() => {
        const fetchMovie = async () => {
            setIsLoading(true); // Set loading before fetch
            try {
                const response = await axios.get(`http://localhost:8000/movie/${movieId}`);
                setMovie(response.data);
            } catch (error) {
                console.error("Error fetching movie:", error);
                setMovie(null); // Set movie to null on error
            } finally {
                setIsLoading(false); // Set loading in finally block
            }
        };

        fetchMovie();
    }, [movieId]);

    useEffect(() => {
        const fetchCategoryTitles = async () => {
            if (movie && movie.categories && movie.categories.length > 0) { // Check if movie and categories exist
                try {
                    const response = await axios.get('http://localhost:8000/category');
                    setCategoryTitles(response.data);
                } catch (error) {
                    console.error('Failed to fetch categories:', error);
                }
            }
        };

        fetchCategoryTitles();
    }, [movie]); // Correct dependency: fetch when movie changes

    if (isLoading) {
        return <LoaderComp />;
    }

    if (!movie) { // Handle the case where the movie is not found
        return (
            <>
                <Header />
                <div className="container flex justify-center items-center h-screen">
                    <h1 className="text-2xl font-bold">Movie not found</h1>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="container flex flex-col lg:flex-row items-center relative sm:px-10 md:px-20 xl:px-72">
                <div className="lg:w-1/2 grid text-lg gap-3 p-6">
                    <h1 className="text-2xl sm:text-4xl font-bold">{movie.title}</h1>
                    <p className="text-sm sm:text-base">
                        Director: <span className="font-bold">{movie.director}</span>
                    </p>
                    <div className="flex gap-4">
                        <p className="text-sm sm:text-base">{movie.release}</p>
                        <p className="text-sm sm:text-base">
                            IMDB <span className="font-bold">{movie.rating}</span>
                        </p>
                    </div>
                    <ol className="flex gap-2 p-4">
                        {movie.categories?.map((catId, index1) => {
                            const category = categoryTitles.find(cat => cat.category_id === catId);
                            const catTitle = category ? category.title : catId;
                            return (
                                <li className="bg-slate-200 p-2 text-base font-bold" key={index1}>
                                    {catTitle}
                                </li>
                            );
                        })}
                    </ol>
                    <p className="text-justify text-sm sm:text-base">{movie.description}</p>
                </div>

                {movie.image && (
                    <Image
                        src={movie.image}
                        width={400}
                        height={400}
                        alt={movie.title}
                        className="object-contain w-full h-full sm:w-1/2 rounded-lg m-2 cursor-pointer hover:scale-[1.01]"
                    />
                )}
            </div>
        </>
    );
};

export default Page;