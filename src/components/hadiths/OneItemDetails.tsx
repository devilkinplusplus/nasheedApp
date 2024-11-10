import React, { useEffect, useState, useCallback } from "react";
import { getHadithAsync, isHadithBookType } from "../../services/apis/hadithService";
import { HadithData } from "../../services/responseTypes/hadithResponse";
import Skeleton from "@mui/material/Skeleton";
import { HadithBookType } from "../../services/responseTypes/hadithBookType";
import { useParams } from 'react-router-dom';

function OneItemDetails() {
  const [hadith, setHadith] = useState<HadithData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { bookName } = useParams();

  const fetchHadith = useCallback(async () => {
    setLoading(true);
    try {
      const hadithBook = isHadithBookType(bookName) ? (bookName as HadithBookType) : undefined;

      if(hadithBook){
        const result = await getHadithAsync(hadithBook);
        setHadith(result.data.data);
      }

    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHadith();
  }, [fetchHadith]);


  return (
    <div className="h-full md:h-80 lg:h-96 bg-black-bg rounded-xl overflow-hidden shadow-lg p-4 md:p-6 lg:p-8 m-4 md:m-6 font-squada cursor-pointer hover:bg-black-light duration-300 flex flex-col justify-between">
      {loading ? (
        <>
          <Skeleton variant="text" className="text-center" height={32} width="60%" />
          <Skeleton variant="text" className="text-center" height={24} width="80%" />
          <Skeleton variant="text" className="text-center" height={24} width="80%" />
          <div className="flex justify-between mt-auto">
            <Skeleton variant="text" height={16} width="40%" />
            <Skeleton variant="text" height={16} width="20%" />
          </div>
        </>
      ) : (
        <>
          <h2 className="text-center text-lg md:text-xl lg:text-2xl uppercase mb-4">
            {hadith?.chapterName || "Chapter Not Available"}
          </h2>

          <p className="text-gray-300 font-medium text-sm md:text-base lg:text-lg mb-4 text-center">
            {hadith?.hadith_english || "Hadith text not available"}
          </p>

          <div className="flex justify-between text-gray-400 mt-auto">
            <p className="text-xs md:text-sm">{hadith?.header || "Unknown"}</p>
            <span className="text-xs md:text-sm">{hadith?.refno || "No reference"}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default OneItemDetails;
