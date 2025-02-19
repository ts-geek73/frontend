'use client'
// import categories from '@/app/constants/catagory.json'
import Image from 'next/image';
import cancel from './../../public/images/close.png'
import { useEffect, useState } from 'react';
import MoviePage from './MoviePage';
import { useRouter } from 'next/navigation';
import axios from 'axios';
// import React from 'react';


interface viewAllInterFace{
    viewAll : boolean,
}

interface Category {
    category_id: number;
    title: string;
    icon: string; // Or whatever properties your backend returns
}

const Catagory: React.FC<viewAllInterFace> = ({ viewAll }) => {
    const [viewMore, setViewMore] = useState<boolean>(true);
    const [categoryLimit, setCategoryLimit] = useState<number>(11);
    const [categories, setCategories] = useState<Category[]>([]); // Initialize as empty array
    const route = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/category');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                // Handle the error (e.g., display an error message)
            }
        };

        fetchCategories(); // Call the function to fetch data
    }, []); 

    const viewMoreFun = ()=>{
        setViewMore(!viewMore)
    }

    const filterMovie = (cat:string)=>{
        // setCatager(cat)
        route.push(`/catagory?query=${encodeURIComponent(cat)}`);

    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 425) { 
                setCategoryLimit(2);
            }else if (window.innerWidth <= 768) { 
                setCategoryLimit(4);
            } else if (window.innerWidth <= 1024) { 
                setCategoryLimit(6);
            } else {
                setCategoryLimit(7);
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize);
    }, []);

    return (
        <>
        <div className="relative bg-slate-400 text-lg font-bold p-5 sm:px-20 lg:px-32 xl:px-60">

                {(viewMore) ? (
                    <>

                    <div className="grid grid-flow-col lg:justify-between justify-evenly  grid-cols-2
                    md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 auto-rows-auto ">
                        {categories.slice(0,categoryLimit).map( ( cat,index) =>(
                            <div key={index} className="flex items-center">
                            <span className="text-2xl">{cat.icon}</span>
                            <h1 onClick={() => filterMovie(cat.title)} className='text-white border-dashed cursor-pointer'>{cat.title}</h1>
                        </div>
                        ))}
                        {viewAll && <button onClick={viewMoreFun} className='text-yellow-300 ml-2  ' >See All</button>}
                    </div>
                    </>
                ):(
                    <>

                    <div 
                    className="grid items-center text-center p-2 gap-5 gap-x-2
                    grid-cols-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 auto-rows-fr ">
                        {categories.map( ( cat,index) =>(
                            <div key={index} 
                            className="flex items-center">
                            <span className="text-2xl">{cat.icon}</span>
                            <h1 onClick={() => filterMovie(cat.title)} 
                            className='text-white border-dashed cursor-pointer'>{cat.title}</h1>
                        </div>
                        ))}
                        <Image onClick={viewMoreFun} src={cancel} alt='cancel image' 
                        className='cursor-pointer absolute top-4 right-4 sm:right-8 md:right-10 lg:right-14 xl:right-20 '
                        height={50} width={50} />
                    </div>
                    </>
                )}

            </div>

            <MoviePage />


        </>
    );
}

export default Catagory;