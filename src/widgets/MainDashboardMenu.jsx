import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import './styles/styles.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  faRotateRight,
  faMessage,
  faBell,
  faComments,
  faSync,
} from "@fortawesome/free-solid-svg-icons";

// import NotificationModal from "../modals/NotificationModal.jsx";

// //
// import axiosInstance from "../../auth/axiosConfig.js"; // Ensure the correct relative path
// import { setCookie, isMemberAuthenticated } from "../../auth/authUtils.jsx"; // Ensure the correct relative path
// import { jwtDecode } from "jwt-decode";
// import { getCookie, deleteCookie } from "../../auth/authUtils.jsx"; // Import getCookie function
// //

const MainDashboardMenu = ({ getMessages }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex  gap-2  mr-4">
        <div
          className="w-10 inline-flex justify-center items-center my-2 py-1 px-3  bg-theme rounded-md text-white cursor-pointer
          hover:text-white hover:bg-softTheme transition duration-300 ease-in-out
          "
          onClick={() => {
            getMessages();
          }}
        >
          <FontAwesomeIcon
            icon={faSync}
            className="text-white"
            style={{ width: "16px", height: "16px" }}
          />
        </div>
        <div
          className="w-10 inline-flex justify-center items-center my-2 py-1 px-3  bg-theme rounded-md text-white cursor-pointer 
          hover:text-white hover:bg-softTheme transition duration-300 ease-in-out
          "
          onClick={() => { navigate("/user-messages"); }}
        >
          <FontAwesomeIcon
            icon={faMessage}
            className="text-white"
            style={{ width: "16px", height: "16px" }}
          />
        </div>
        <div
          className="w-10 inline-flex justify-center items-center my-2 py-1 px-3  bg-theme rounded-md text-white cursor-pointer 
          hover:text-white hover:bg-softTheme transition duration-300 ease-in-out
          "
          // onClick={() => { getMessages(); }}
        >
          <FontAwesomeIcon
            icon={faBell}
            className="text-white"
            style={{ width: "16px", height: "16px" }}
          />
        </div>
      </div>
    </>
  );
};

export default MainDashboardMenu;
