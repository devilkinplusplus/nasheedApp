import { useParams } from "react-router-dom";
import OneAudioList from "../../components/base/OneAudioList";
import { useAudioContext } from "../../services/contexts/AudioContext";
import { useEffect, useState } from "react";
import {
  SurahResponse,
  DataResponse,
} from "../../services/responseTypes/surahResponse";
import { getSurahAsync } from "../../services/apis/surahService";

function Details() {
  const [surahInfo, setSurahInfo] = useState<DataResponse>();
  const { id } = useParams();

  useEffect(() => {
    const fetchSurahById = async () => {
      try {
        const getSurahById: SurahResponse = await getSurahAsync(id);
        setSurahInfo(getSurahById.data);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    fetchSurahById();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow lg:p-6 flex flex-col justify-start space-y-2 items-center">
        {/* Title */}
        <h3 className="text-3xl sm:text-4xl lg:text-5xl mt-2 font-squada uppercase text-gray-400">
         Surah {surahInfo?.surahName ? surahInfo?.surahName : "Title of the Audio"}
        </h3>

        {/*! DEPRECETED */}
        {/* <div
          className="grid grid-cols-1 w-full pt-4 font-squada space-y-1 overflow-y-scroll h-72 
                        scrollbar-thin scrollbar-thumb-black-light scrollbar-track-black-bg">
          <OneAudioList />
          <OneAudioList />
          <OneAudioList />
          <OneAudioList />
          <OneAudioList />
          <OneAudioList />
          <OneAudioList />
        </div> */}

        <div className="w-full text-center h-auto bg-black-bg rounded-xl overflow-hidden shadow-lg p-6 font-squada">
          <div className="text-gray-400 font-medium text-3xl mb-2 uppercase">
             {surahInfo?.surahNameArabicLong ? surahInfo?.surahNameArabicLong : "Title"}
          </div>
          <div className="text-gray-300 text-sm mb-5">
            It's {surahInfo?.totalAyah} verses and was revealed in{" "}
            {surahInfo?.revelationPlace}
          </div>

          {/* Verces */}
          <div className="text-gray-400 my-2 scrollbar-thin h-72 overflow-y-scroll scrollbar-thumb-black-light scrollbar-track-black-bg">
            {surahInfo?.arabic1.map((arabic, ind) => (
              <div key={ind} className="mb-4">
                {/* Arabic ayah */}
                <p className="text-2xl">{arabic}</p>

                {/* Corresponding English translation */}
                <p className="text-base">{surahInfo?.english[ind]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
