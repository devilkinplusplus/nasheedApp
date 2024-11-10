import React from "react";

function Searchbar() {
  return (
    <div className="relative text-gray-600 focus-within:text-gray-400">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button
          type="submit"
          className="p-1 focus:outline-none focus:shadow-outline"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M21 21l-6-6"></path>
            <path d="M15 9a6 6 0 1 0-12 0 6 6 0 0 0 12 0z"></path>
          </svg>
        </button>
      </span>
      <input
        type="text"
        className="py-1 md:py-2 pl-10 pr-4 w-44 md:w-72 lg:w-96 rounded-full text-sm focus:outline-none focus:bg-white focus:text-gray-500"
        placeholder="Search..."
      />
    </div>
  );
}

export default Searchbar;
