import React, { useEffect, useState } from "react";
import OneSurah from "./OneSurah";
import { getAllSurahsAsync, getSurahAudioBySurahNo } from "../../services/apis/surahService";
import { useSurahContext } from "../../services/contexts/SurahContext";
import { Skeleton } from "@mui/material";

const SurahList = () => {
  const { surahList, setSurahList } = useSurahContext();
  const [loading, setLoading] = useState<Boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const getAllSurahs = await getAllSurahsAsync();
        setSurahList(getAllSurahs.data);
      } catch (error) {
        console.error("Error fetching surahs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, [setSurahList]);


  const paginatedSurahs = surahList?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  
  // Pagination controls
  const totalPages = Math.ceil((surahList?.length || 0) / itemsPerPage);
  const handleNextPage = () =>
    setCurrentPage((prev) => (prev + 1) % totalPages);
  const handlePrevPage = () =>
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <div className="p-4">
      <div className="grid gap-1 md:gap-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 grid-rows-2">
        {loading
          ? 
            Array.from(new Array(itemsPerPage)).map((_, index) => (
              <div
                key={index}
                className="h-[200px] sm:h-[300px] w-[115px] sm:w-[120px] md:w-[140px] lg:w-[160px] bg-[#15151580] rounded-lg p-2 md:p-4 transition-all duration-300"
              >
                <div className="mb-4">
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={140}
                    className="rounded"
                  />
                </div>
                <div className="font-squada">
                  <Skeleton width="80%" height={24} />
                  <Skeleton width="60%" height={20} className="mb-2" />
                  <Skeleton width="100%" height={20} className="mb-1" />
                  <Skeleton width="90%" height={20} />
                </div>
              </div>
            ))
          : 
            paginatedSurahs?.map((val, ind) => (
              <OneSurah key={ind} val={val} audioSrc={getSurahAudioBySurahNo(currentPage * itemsPerPage + ind + 1)} index={currentPage * itemsPerPage + ind + 1} />
            ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className="px-4 py-2 mx-1 bg-gray-400 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          className="px-4 py-2 mx-1 bg-gray-400 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SurahList;
