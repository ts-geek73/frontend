import React, { useEffect, useState } from "react";
import CreateMovie from "../../app/components/User/createmovie";
import LoaderComp from "@/app/components/LoaderComp";
import UpgradeMovie from "../../app/components/User/updatemovie";
import CategoryMovie from "../../app/components/User/createCategory";
import { useRouter } from "next/navigation";

interface User {
  isAdmin: boolean;
  email: string;
  password: string;
  name: string;
}

const AdminPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  //  const [user, setUser] = useState<User | null>(null);
  const [activeComponent, setActiveComponent] = useState<string>("create");
    
  const route = useRouter();
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (!user.isAdmin) {
        route.push("/unauthorized");
      }
    }
  }

  const sidebarItems = [
    { id: "create", label: "Create Movie" },
    { id: "upgrade", label: "Upgrade Movie" },
    { id: "category", label: "Category Movie" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  });

  const handleSidebarClick = (id: string) => {
    setActiveComponent(id);
  };

  return (
    <>
      {isLoading ? (
        <LoaderComp />
      ) : (
        <>
          <div className="flex h-screen">
            <div className="bg-blue-500 w-1/6 p-4 text-white text-center text-2xl flex flex-col gap-y-10 justify-center">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  id={item.id}
                  onClick={() => handleSidebarClick(item.id)}
                  className={`cursor-pointer mb-4 py-2 px-4 rounded-md transition-colors ${
                    activeComponent === item.id ? "bg-blue-600" : " "
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex-1">
              {activeComponent === "create" && <CreateMovie />}
              {activeComponent === "upgrade" && <UpgradeMovie />}
              {activeComponent === "category" && <CategoryMovie />}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminPage;
