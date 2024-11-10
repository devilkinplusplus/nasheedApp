import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navlink = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center text-center font-semibold uppercase font-squada p-12 text-red-600">
      <h3 className="text-6xl md:text-9xl tracking-widest">404</h3>
      <span className="text-4xl md:text-7xl tracking-wider">The page is not found</span>
      <button className="bg-white border-2 border-red-600 px-4 md:px-6 py-3 w-72 md:w-96 rounded text-2xl md:text-3xl mt-2 hover:bg-red-600 hover:text-white duration-300" type="button" onClick={() => navlink("/")}>Back home</button>
    </div>
  );
}

export default NotFound;
