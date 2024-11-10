import React from "react";
import { useNavigate } from "react-router-dom";

function HadithOption() {
  const navlink = useNavigate();

  const handleClick = (bookName) => {
    navlink(`/hadith/${bookName}`)
  }

  return (
    <>
      <h2 className="text-center uppercase text-2xl md:text-4xl mb-4">Choose a book for Hadith</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div onClick={() => handleClick("bukhari")} className="h-32 text-center bg-black-bg rounded-xl overflow-hidden shadow-lg p-4 cursor-pointer hover:bg-black-light duration-300 flex flex-col justify-between">
          <p className="text-2xl md:text-3xl">Sahih Bukhari</p>
          <p className="text-xs md:text-sm">7563 sahih hadith</p>
        </div>

        <div onClick={() => handleClick("muslim")} className="h-32 text-center bg-black-bg rounded-xl overflow-hidden shadow-lg p-4 cursor-pointer hover:bg-black-light duration-300 flex flex-col justify-between">
          <p className="text-2xl md:text-3xl">Sahih Muslim</p>
          <p className="text-xs md:text-sm">3032 sahih hadith</p>
        </div>

        <div onClick={() => handleClick("abudawud")} className="h-32 text-center bg-black-bg rounded-xl overflow-hidden shadow-lg p-4 cursor-pointer hover:bg-black-light duration-300 flex flex-col justify-between">
          <p className="text-2xl md:text-3xl">Abu Dawud</p>
          <p className="text-xs md:text-sm">3998 sahih hadith</p>
        </div>

        <div onClick={() => handleClick("tirmidhi")} className="h-32 text-center bg-black-bg rounded-xl overflow-hidden shadow-lg p-4 cursor-pointer hover:bg-black-light duration-300 flex flex-col justify-between">
          <p className="text-2xl md:text-3xl">Tirmidhi</p>
          <p className="text-xs md:text-sm">3956 sahih hadith</p>
        </div>

      </div>
    </>
  );
}

export default HadithOption;
