import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { getFullNameFromToken, logout } from "../../services/utilities/tokenUtilities";
import { useNavigate } from "react-router-dom";
import { stringAvatar } from "../../services/utilities/stringUtilities";

function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const navlink = useNavigate();
  const authorizedUserFullName = getFullNameFromToken()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navlink("/auth");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className="inline-block z-10 text-left" ref={dropdownRef}>
      <div>
        {authorizedUserFullName ? (
        <button
           type="button"
           onClick={toggleDropdown}
           className="flex items-center focus:outline-none"
          >
           <Avatar {...stringAvatar(authorizedUserFullName)}>
           </Avatar>
           <svg
             className="h-5 w-5 text-white-pre"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 20 20"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
           >
             <path d="M7 10l5 5 5-5"></path>
           </svg>
         </button> 
        ) : (
          <a href="#" onClick={() => navlink("/auth")} className="text-gray-300 text-md p-3" >Login</a>
        )}
       
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black-bg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1 text-gray-300"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <a
              onClick={() => navlink("/playlists")}
              href="#"
              className="block px-4 py-2 text-sm hover:bg-black-light"
              role="menuitem"
            >
              My Playlists
            </a>
            <a
              onClick={() => navlink("/prayerTimes")}
              href="#"
              className="block px-4 py-2 text-sm hover:bg-black-light"
              role="menuitem"
            >
              Prayer Time
            </a>
            <a
              href="#"
              onClick={handleClickOpen}
              className="block px-4 py-2 text-sm hover:bg-black-light"
              role="menuitem"
            >
              Logout
            </a>
          </div>
        </div>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Reminder"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to logout your account ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogout} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserInfo;
