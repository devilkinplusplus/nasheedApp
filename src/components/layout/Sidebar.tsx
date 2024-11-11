import { useState } from "react";
import SidebarMenu from "./SidebarMenu";
import '../../assets/control.png'
import { getFullNameFromToken } from "../../services/utilities/tokenUtilities";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const fullName = getFullNameFromToken();

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "sm:w-56 md:w-60" : "w-20"
        } bg-black h-full p-2 pt-5 md:p-5 md:pt-8 relative duration-300`}
      >
     
        <img
          alt="control"
          src={require('../../assets/control.png')}
          className={`absolute cursor-pointer -right-3 top-9 w-7 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex justify-start px-2 gap-x-4 items-center">
          <span
            className={`text-gray-200 origin-left font-medium text-xl cursor-pointer hover:text-white-pre duration-200 ${
              !open && "scale-0"
            }`}
          >
            {fullName ?? "Username"}
          </span>
        </div>
        <ul className="pt-6">
          <SidebarMenu open={open} />
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
