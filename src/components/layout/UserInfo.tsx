import { Avatar } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className="inline-block z-10 text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="flex items-center focus:outline-none"
        >
          <Avatar sx={{ bgcolor: "deepOrange"[500], width: 35, height: 35 }}>
            N
          </Avatar>
          <svg
            className="h-5 w-5 text-white-pre"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 10l5 5 5-5"></path>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black-bg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1 text-gray-300"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm hover:bg-black-light"
              role="menuitem"
            >
              Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm hover:bg-black-light"
              role="menuitem"
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm hover:bg-black-light"
              role="menuitem"
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
