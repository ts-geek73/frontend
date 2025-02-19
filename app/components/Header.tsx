"use client";

import Image from "next/image";
import logo from "./../../public/images/logo.png";
import searchImg from "./../../public/images/search.png";
import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

interface User {
  isAdmin: boolean;
  email: string;
  password: string;
  name: string;
}

export const SearchContext = createContext<string>("");

const Header: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const route = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false); // Popup visibility state

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUser(userData);
    }
  }, []);

  function handleLogoClick() {
    route.push("/"); // Redirect to the home page
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

  const handleLogout = () => {
    toast.success("Log Out SuccessFully");

    setTimeout(() => {
      localStorage.removeItem("user");
      // setUser(null);
      route.push("/");
    }, 1000);
  };

  return (
    <SearchContext.Provider value={search}>
      <div className="bg-gradient-to-tr from-zinc-50 from-50% via-zinc-500 to-100%">
        <div className="flex container mx-auto items-center justify-between">
          <div
            className="flex gap-4 font-bold items-center justify-center"
            onClick={handleLogoClick}
          >
            <Image
              src={logo}
              height={50}
              width={50}
              alt="..."
              className="h-8 md:h-14"
            />
            <h1 className="xl:text-3xl lg:text-2xl md:text-xl hidden md:block font-bold">
              Movie Explorer
            </h1>
          </div>

          <div className="grid grid-flow-col p-5 border-black gap-3 lg:gap-5">
            <input
              className="rounded-lg border-2 border-solid w-36 lg:w-max border-black p-2 xl:p-3"
              placeholder="search for movie"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              required
            />

            <button onClick={searchImgClick}>
              <Image
                className="cursor-pointer"
                src={searchImg}
                height={25}
                width={25}
                alt="..."
              />
            </button>

            {user && user.isAdmin ? (
              <>
                <div
                  className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-xl font-semibold cursor-pointer"
                  onClick={() => setShowPopup(!showPopup)}
                >
                  Ad
                </div>
              </>
            ) : (
              <>
                <div
                  className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-xl font-semibold cursor-pointer"
                  onClick={() => setShowPopup(!showPopup)}
                >
                  {user?.name.slice(0, 2)}
                </div>
              </>
            )}
            {showPopup && (
              <div
                className="  bg-white border shadow-lg p-4 rounded-md"
                onClick={handleLogout}
              >
                <h1 className="cursor-pointer text-red-500 text-sm font-semibold">
                  Logout
                </h1>
              </div>
            )}
          </div>
        </div>

        <ToastContainer />
      </div>
    </SearchContext.Provider>
  );
};

export default Header;
