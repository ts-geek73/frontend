"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import noFavirate from "./../../public/images/emptyFavirates.png";
import Favirate from "./../../public/images/fillFavirates.png";
import star from "./../../public/images/star.png";

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

interface Category {
  category_id: number;
  title: string;
}

const MovieCard: React.FC<{ data: MovieData }> = ({ data }) => {
  let { title, movie_id, categories, rating, image, description, director } = data;
  const route = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryTitles, setCategoryTitles] = useState<Category[]>([]);
  const [favirates, setFavirates] = useState<boolean>(false);
  const [favoriteList, setFaviratesList] = useState<number[]>([]);

  useEffect(() => {
    const fetchCategoryTitles = async () => {
      if (categories && categories.length > 0) {
        try {
          const response = await axios.get("http://localhost:8000/category");
          if (response.status === 200) {
            setCategoryTitles(response.data);
          } else {
            console.error("Failed to fetch categories:", response.status);
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      }
    };

    const fetchFavirates = async () => {
      try {
        const response = await axios.get("http://localhost:8000/favorite");
        if (response.status === 200) {
          const favoriteList = response.data.map((fav: any) => fav.movie_id);
          // localStorage.setItem("favorites", JSON.stringify(favoriteList));
          setFaviratesList(favoriteList);
          if (favoriteList.includes(movie_id)) {
            setFavirates(true);
          }
        } 
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchCategoryTitles();
    fetchFavirates();
  }, [categories, ]);

  const CardClickFun = (id: number) => {
    route.push(`movie/${id}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  });

  // const faviratesFun = (event: React.MouseEvent<HTMLImageElement>) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   if (favirates) {
  //     toast.warning("Removed from favirates");
  //     setFavirates(false);
  //   } else {
  //     toast.success("Added from favirates");
  //     setFavirates(!favirates);
  //   }
  // };

  const faviratesFun = async (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (favirates) {
      try {

        const response = await axios.delete(
          `http://localhost:8000/favorite/${movie_id}`,{  headers: {
            'Content-Type': 'application/json',
          },}
        );
        if (response.status === 200) {
          toast.warning("Removed from favorites");
          setFavirates(false);
        }
      } catch (error) {
        toast.error(error.response.data);
        console.error("Error removing from favorites:", error);
      }
    } else {
      try {
        const response = await axios.post(`http://localhost:8000/favorite/${movie_id}`,{ headers: {
          'Content-Type': 'application/json',
        },});

        if (response.status === 201) {
          toast.success("Added to favorites");
          setFavirates(true);
        }

      } catch (error) {
        toast.error(error.response.data);
        console.error("Error adding to favorites:", error);
      }
    }
  };

  return (
    <div
      onClick={() => CardClickFun(movie_id)}
      className="border-y-4 bg-slate-100  w-3/4"
    >
      {isLoading ? (
        <>
          <div className="flex flex-col items-center justify-center w-full h-full p-4">
            <div className="animate-pulse w-[200px] h-[200px] bg-gray-300 rounded-lg mb-4"></div>
            <div className="flex flex-col gap-3 w-full">
              <div className="animate-pulse w-1/2 h-6 bg-gray-300 rounded mb-2"></div>
              <div className="animate-pulse w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
              <div className="animate-pulse w-1/4 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className=" flex flex-col relative justify-center items-center gap-3 p-4">
            {favirates ? (
              <Image
                src={Favirate}
                alt="Faviraes image"
                onClick={(e) => faviratesFun(e)}
                height={35}
                width={35}
                className="absolute top-1 right-3 cursor-pointer"
              />
            ) : (
              <Image
                src={noFavirate}
                alt="Faviraes image"
                onClick={(e) => faviratesFun(e)}
                height={35}
                width={35}
                className="absolute top-1 right-3 cursor-pointer"
              />
            )}

            {image ? (
              <Image
                src={image}
                width={200}
                height={200}
                alt={title}
                className="object-cover w-[200px] h-[200px] rounded-lg cursor-pointer hover:scale-[1.01]"
              />
            ) : (
              <div className="w-[200px] h-[200px] bg-gray-300 rounded-lg">
                No Image Available
              </div>
            )}

            <div className="flex items-center justify-between  ">
              <h1 className="font-bold  text-xl">{title}</h1>

              <div className="flex items-center justify-start ml-2">
                <Image src={star} alt="Star image" height={20} width={20} />
                <h3 className="text-lg m-2"> {rating} </h3>
              </div>
            </div>
            <ol className="flex items-center gap-2 p-4">
              {categories && categories.length > 0
                ? categories.map((catId, index1) => {
                    const category = categoryTitles.find(
                      (cat) => cat.category_id === catId
                    );
                    const catTitle = category ? category.title : "...";
                    return (
                      <li
                        className="bg-slate-200 p-2 text-base font-bold"
                        key={index1}
                      >
                        {catTitle}
                      </li>
                    );
                  })
                : null}
            </ol>
            <p>
              {description.length > 125
                ? description.substring(0, 120) + "... See More"
                : description}
            </p>
            {/* <p>Director: {director}</p> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
