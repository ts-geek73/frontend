"use client";

// import Image from 'next/image';
// import  movies from '../constants/movies.json'
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import LoaderComp from "./LoaderComp";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

interface Movie {
  // Define the Movie interface
  movie_id: number;
  title: string;
  description: string;
  rating: number;
  release: number;
  director: string;
  categories: number[];
  image?: string;
}

const MoviePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [moviePerPage] = useState(12);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]); // Store fetched movies

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get("http://localhost:8000/movie"); // Fetch all movies
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
        // Handle error (e.g., display error message)
      } finally {
        setIsLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchMovies();
  }, []);

  const lastMovie = currentPage * moviePerPage;
  const firstMovie = lastMovie - moviePerPage;

  const movieLength = movies.length;
  const currentMovies = movies.slice(firstMovie, lastMovie);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
      //   toast.success(`${catagocy } Movie catagorized`)
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPage]);

  return (
    <>
      {isLoading ? (
        <LoaderComp />
      ) : (
        <>
          <div
            className="grid xl:grid-cols-3 justify-center
         lg:grid-cols-2 grid-cols-1 gap-5 
         p-6 sm:px-20 md:px-52 lg:px-32 xl:px-60"
          >
            {currentMovies.map((data, index) => (
              <MovieCard key={index} data={data} />
            ))}
          </div>
        </>
      )}
      <Pagination
        length={movieLength}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ToastContainer />
    </>
  );
};

export default MoviePage;
