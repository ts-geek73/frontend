'use client'

import LoaderComp from '@/app/components/LoaderComp';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Pagination from '@/app/components/Pagination';
import MovieCard from '@/app/components/MovieCard';

interface MovieData {
  movie_id: number;
  title: string;
  description: string;
  rating: number;
  release: number;
  director: string;
  categories: number[];
  image?: string; 
}

const Catagory: React.FC = () => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [search, setSearch] = useState<string>("");
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') || '';

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviePerPage] = useState(12);

  const lastMovie = currentPage * moviePerPage;
  const firstMovie = lastMovie - moviePerPage;

  const filteredSearchResults = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const movieLength = filteredSearchResults.length;
  const currentMovies = filteredSearchResults.slice(firstMovie, lastMovie);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`/api/movies/category/${query}`);
        const data = await response.json();
        setMovies(data); 
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setIsLoading(false);
      }
    };

    if (query) {
      fetchMovies();
    }
  }, [query]);

  const liveSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <div>
        {isLoading ? (
          <LoaderComp />
        ) : (
          <>
            {query && movies.length > 0 ? (
              <>
                <Header />
                <div className="flex justify-around gap-3">
                  <h1 className="text-2xl text-center p-5 sm:text-4xl font-bold">Category: {query}</h1>
                  <div className="flex p-5 border-black gap-3 lg:gap-5">
                    <input
                      className="rounded-lg border-2 border-solid w-36 lg:w-max border-black p-2 xl:p-3"
                      placeholder="search for movie"
                      type="text"
                      value={search}
                      onChange={liveSearch}
                      required
                    />
                  </div>
                </div>
                {movieLength > 0 ? (
                  <>
                    <div className="grid xl:grid-cols-3 justify-center lg:grid-cols-2 grid-cols-1 gap-8 p-6 sm:px-20 md:px-52 lg:px-32 xl:px-60">
                      {currentMovies.map((data, index) => (
                        <MovieCard
                          key={index}
                          data={{
                            movie_id: data.movie_id,
                            title: data.title,
                            description: data.description,
                            rating: data.rating,
                            release: data.release,
                            director: data.director,
                            categories: data.categories,
                            image: data.image,
                          }}
                        />
                      ))}
                    </div>
                    <Pagination
                      length={movieLength}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
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
    </>
  );
};

export default Catagory;
