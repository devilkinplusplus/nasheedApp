import React from "react";

function OneSunnah( {sunnah} ) {
  return (
    <div className="w-full h-36 flex flex-col justify-between bg-black-bg rounded-xl overflow-hidden shadow-lg p-6 font-squada cursor-pointer hover:bg-black-light duration-300">
      <div className="text-gray-300 font-medium text-lg mb-4">
        {sunnah?.content}.
      </div>
      <div className="text-gray-400 text-sm">Prophet Muhammad ﷺ</div>
    </div>
  );
}

export default OneSunnah;
