"use client";
import Hamburger from "hamburger-react";
import { useState, useEffect } from "react";
import { useUser } from "@/context/user";

import Sidebar from "./Sidebar";

type userProps = {
  firstName: string;
  role: string;
};

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  const { user, getUser } = useUser();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav className="flex items-center justify-between h-20 w-full lg:bg-[#EFEFEF] bg-white dark:bg-primary-dashboard sticky top-0 z-10 lg:px-10">
      {/* Logo and search input */}
      <div className="hidden lg:flex items-center w-1/2">
        {/* Search */}
        <div className="w-full">
          <input
            type="text"
            placeholder="Search Orders"
            className="dark:bg-input rounded-3xl border border-white border-opacity-25 outline-none py-3 px-5 w-2/3"
          />
        </div>
      </div>

      {/* Timer and profile */}
      <div className="flex justify-between items-center w-full lg:w-1/2 px-5 lg:px-0">
        <div className="hidden lg:block">
          <div className="bg-button-primary bg-opacity-20 rounded-3xl py-3 px-0">
            
          </div>
        </div>

        {/* hamburger */}

        <div className="flex items-center lg:hidden z-20">
          <Hamburger toggled={isOpen} toggle={setOpen} />
          <div>{isOpen ? "Close" : "Menu"}</div>
        </div>

        {/* Profile */}

        <div
          className={`flex items-center gap-x-2 ${
            isOpen ? "hidden lg:block" : "block"
          }`}
        >
          <div className="">&#x1F44B;</div>
          <div>
            <h3 className="text-sm md:text-xl font-bold">{user?.firstName}</h3>
            <p className="opacity-40 text-[.75rem] md:text-base">
              {user?.role}
            </p>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="block lg:hidden absolute top-20 bg-white dark:bg-primary-dashboard w-full min-h-[calc(100vh-80px)] z-20 px-5">
          <Sidebar setOpen={setOpen} />
        </div>
      )}
    </nav>
  );
}
