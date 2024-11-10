import React, { useEffect, useState, useCallback } from "react";
import OneNasheed from "./OneNasheed";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  DataResponse,
  NasheedResponse,
} from "../../services/responseTypes/nasheedResponse";
import { getNasheedsAsync } from "../../services/apis/nasheedService";
import { Skeleton } from "@mui/material";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  initialSlide: 0,
  rows:2,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

function NasheedList() {
  const [nasheeds, setNasheeds] = useState<NasheedResponse[]>();
  const [loading, setLoading] = useState(true);

  const fetchNasheeds = useCallback(async () => {
    try {
      const response = await getNasheedsAsync();
      setNasheeds(response.data);
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    fetchNasheeds();
  }, [fetchNasheeds]);

  return (
    <div className="grid gap-1 md:gap-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 p-4">
    <Slider {...settings} className="col-span-full mx-3">
      {loading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-[#15151580] rounded-lg p-2 md:p-4">
            <Skeleton
              variant="rectangular"
              height={120}
              className="mb-4 rounded w-full"
            />
            <Skeleton variant="text" width="80%" className="mb-2" />
            <Skeleton variant="text" width="60%" />
          </div>
        ))
      ) : (
        nasheeds?.map((val, index) => (
          <OneNasheed
            key={index}
            audioSrc={val?.audioPath}
            title={val?.title}
            coverImg={val?.coverImage}
            index={index}
            playlistElements={null}
            isPlaylist={false}
          />
        ))
      )}
    </Slider>
  </div>
  );
}

export default NasheedList;
