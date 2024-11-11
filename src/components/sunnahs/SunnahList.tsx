import React, { useCallback, useEffect, useState } from "react";
import OneSunnah from "./OneSunnah";
import { getAllSunnahsAsync } from "../../services/apis/sunnahService";
import { Skeleton } from "@mui/material";
import { useSunnahContext } from "../../services/contexts/SunnahContex";

const SunnahList = () => {
  const { sunnahList, setSunnahList } = useSunnahContext();
  const [loading, setLoading] = useState<Boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 6;

  const fetchSunnahs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllSunnahsAsync();
      if (Array.isArray(response.data)) {
        setSunnahList(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setSunnahList([]); 
      }
    } catch (error) {
      console.error("Error fetching sunnahs:", error);
      setSunnahList([]); 
    } finally {
      setLoading(false);
    }
  }, [setSunnahList]);

  useEffect(() => {
    fetchSunnahs();
  }, [fetchSunnahs]);

  const paginatedSunnahs = Array.isArray(sunnahList)
    ? sunnahList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : [];

  const totalPages = Math.ceil((sunnahList?.length || 0) / itemsPerPage);
  const handleNextPage = () =>
    setCurrentPage((prev) => (prev + 1) % totalPages);
  const handlePrevPage = () =>
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);

  return (
    <div className="p-4">
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 grid-rows-2">
        {loading
          ? Array.from(new Array(itemsPerPage)).map((_, index) => (
              <div
                key={index}
                className="h-[200px] w-[115px] bg-[#15151580] rounded-lg p-2 transition-all duration-300"
              >
                <Skeleton variant="rectangular" width="100%" height={140} />
                <Skeleton width="80%" height={24} />
              </div>
            ))
          : paginatedSunnahs.map((sunnah, index) => (
              <OneSunnah key={index} sunnah={sunnah} />
            ))}
      </div>

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

export default SunnahList;
