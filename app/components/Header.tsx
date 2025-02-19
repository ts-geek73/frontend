'use client'

import Image from "next/image";
import logo from './../../public/images/logo.png'
import searchImg from './../../public/images/search.png'
import { useState, createContext } from "react";
import { useRouter } from "next/navigation";

// Create and export context
export const SearchContext = createContext<string>("");

const Header: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const route = useRouter();

    function handleLogoClick() {
        route.push('/');  // Redirect to the home page
    }

    function searchImgClick() {
        if (search !== "") {
            console.log(search);
            route.push(`/search?query=${encodeURIComponent(search)}`);
            setSearch(""); 
        } else {
            console.log("error");
        }
    }

    return (
        <SearchContext.Provider value={search}>
            <div 
            className="flex items-center p-5 sm:px-10 md:px-20 lg:px-32 xl:px-72 justify-between 
            bg-gradient-to-tr from-zinc-50 from-50% via-zinc-500 to-100% ">

                <div className="flex gap-4 font-bold items-center justify-center " onClick={handleLogoClick}>
                    <Image src={logo} height={50} width={50} alt="..." 
                    className="h-8 md:h-14  "/>
                    <h1 className="xl:text-3xl lg:text-2xl md:text-xl hidden md:block font-bold">Movie Explorer</h1>
                </div>

                <div className="flex p-5 border-black gap-3 lg:gap-5">
                    
                    <input className="rounded-lg border-2 border-solid w-36 lg:w-max border-black p-2 xl:p-3" placeholder="search for movie" 
                        type="text" value={search} 
                        onChange={(event) => setSearch(event.target.value)} required />

                    <button onClick={searchImgClick}>
                        <Image className="cursor-pointer" src={searchImg} height={25} width={25} alt="..." />
                    </button>
                </div>
            </div>
        </SearchContext.Provider>
    );
};

export default Header;
