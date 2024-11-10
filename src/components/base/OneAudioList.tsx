import React from "react";
import PlayArrow from "@mui/icons-material/PlayArrow";

function OneAudioList() {
  return (
      <div className="h-12 mx-6 flex justify-start items-center text-xl gap-x-1 rounded bg-black-bg px-5 py-2 uppercase hover:bg-black-light duration-300 cursor-pointer">
        <PlayArrow />
        <span>Surah Name</span>
      </div>
  );
}

export default OneAudioList;
