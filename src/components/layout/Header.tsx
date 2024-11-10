import React from "react";
import Searchbar from "./Searchbar";
import UserInfo from "./UserInfo";

function Header() {
  return (
    <header className="bg-[#0B0B0B] p-4 text-2xl font-bold">
      <div className="flex justify-between gap-x-1.5 w-full">
        <span className="text-4xl tracking-wider font-bold cursor-pointer uppercase font-squada text-white">
          NASHEED
        </span>

       <Searchbar />
       <UserInfo />
      </div>
    </header>
  );
}

export default Header;
