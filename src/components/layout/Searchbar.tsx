import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSurahContext } from "../../services/contexts/SurahContext";

function Searchbar() {
  const { surahList } = useSurahContext(); 
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<{ surahNo: number; name: string }[]>([]);
  const navigate = useNavigate();
  
  const searchbarRef = useRef<HTMLDivElement>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = surahList
      .map((surah, index) => ({ surahNo: index + 1, name: surah.surahName }))
      .filter((surah) =>
        surah.name.toLowerCase().includes(value.toLowerCase()) 
      );
    setFilteredResults(filtered);
    setShowResults(value.length > 0); 
  };

  const handleItemClick = (surahNo: number) => {
    navigate(`/surahs/${surahNo}`);
    setShowResults(false); 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchbarRef.current && !searchbarRef.current.contains(event.target as Node)) {
        setShowResults(false); 
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchbarRef}
      className="relative text-gray-600 focus-within:text-gray-400"
    >
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
        className="py-1 md:py-2 pl-10 pr-4 rounded-full text-sm focus:outline-none focus:bg-white focus:text-gray-500"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Display search results */}
      {showResults && filteredResults.length > 0 && (
        <div className="absolute bg-white shadow-lg rounded-lg w-full mt-2 z-10 max-h-48 overflow-y-auto">
          {filteredResults.map((result) => (
            <div
              key={result.surahNo}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => handleItemClick(result.surahNo)} 
            >
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Searchbar;
