import React, { useState } from "react";
import CreateMovie from "../../app/components/User/createmovie";
import UpgradeMovie from "../../app/components/User/updatemovie";
import CategoryMovie from "../../app/components/User/createCategory";

const AdminPage = () => {
  const [activeComponent, setActiveComponent] = useState<string>("create");

  const handleSidebarClick = (eve: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(eve.currentTarget.id);
    setActiveComponent(eve.currentTarget.id);
  };

  return (
    <div className="flex h-screen">

      <div className="bg-blue-400 w-1/6 p-4 text-white text-center text-2xl flex flex-col gap-y-10 justify-center">
        <button
          id="create"
          onClick={handleSidebarClick}
          className="cursor-pointer mb-4"
        >
          Create Movie
        </button>
        <button
          id="upgrade"
          onClick={handleSidebarClick}
          className="cursor-pointer mb-4"
        >
          Upgrade Movie
        </button>
        <button
          id="category"
          onClick={handleSidebarClick}
          className="cursor-pointer mb-4"
        >
          Category Movie
        </button>
      </div>


      <div className="flex-1 p-8">
        {activeComponent === "create" && <CreateMovie />}
        {activeComponent === "upgrade" && <UpgradeMovie />}
        {activeComponent === "category" && <CategoryMovie />}
      </div>
    </div>
  );
};

export default AdminPage;
