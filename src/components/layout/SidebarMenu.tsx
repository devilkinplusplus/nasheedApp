import React from "react";
import { Link, NavLink } from "react-router-dom";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ArticleIcon from "@mui/icons-material/Article";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Tooltip from "@mui/material/Tooltip";

function SidebarMenu({ open }) {
  const menus = [
    { title: "Home", icon: <SpaceDashboardIcon />, link: "" },
    { title: "Playlists", icon: <ArticleIcon />, link: "playlists" },
    { title: "Surahs", icon: <AutoStoriesIcon />, link: "surahs" },
    { title: "Nasheeds", icon: <HeadphonesIcon />, link: "nasheeds" },
    { title: "Hadith", icon: <AppShortcutIcon />, link: "hadith" },
    { title: "Sunnahs", icon: <AcUnitIcon />, link: "sunnahs" },
    { title: "Prayer times", icon: <AccessTimeFilledIcon />, link: "prayerTimes"}
  ];
  return (
    <>
      {menus.map((val, index) => {
        return (
          <li className="mb-1.5" key={index}>
            <NavLink
              to={val.link}
              className="flex items-center cursor-pointer text-gray-300 hover:bg-black-light text-base duration-300 py-2 px-2 rounded gap-x-1.5"
            >
              {val.icon}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {val.title}
              </span>
            </NavLink>
          </li>
        );
      })}
    </>
  );
}

export default SidebarMenu;
