import React, { useState, useEffect, memo  } from "react";

import DgfHeaderHead from "./DgfHeaderHead";

import GuestMobileNavbar from "./guest/GuestMobileNavbar";
import UserMobileNavbar from "./user/UserMobileNavbar";
import FarmerMobileNavbar from "./farmer/FarmerMobileNavbar";
import AdminMobileNavbar from './admin/AdminMobileNavbar';


//
import axiosInstance from "../auth/axiosConfig"; // Ensure the correct relative path
import {
  setCookie,
  isUserAuthenticated,
  isFarmerAuthenticated,
  isAdminAuthenticated,
} from "../auth/authUtils"; // Ensure the correct relative path
import { jwtDecode } from "jwt-decode";
import { getCookie, deleteCookie } from "../auth/authUtils"; // Import getCookie function
//

import MarqueeTextContainer from "./MarqueeTextContainer";

function DgfHeader({ isMobile, gotoPage, showMarqees }) {
  return (
    <div className="fixed w-full  z-[9999]">
      {/* { showMarqees ? <MarqueeTextContainer isMobile={isMobile} /> : <div></div> } */}
      <div>
        {isMobile ? (
          isUserAuthenticated() ? (
            <UserMobileNavbar gotoPage={gotoPage} />
          ) : isFarmerAuthenticated() ? (
            <FarmerMobileNavbar gotoPage={gotoPage} />
          ) : isAdminAuthenticated() ? (
            <AdminMobileNavbar gotoPage={gotoPage} />
          ) : (
            <GuestMobileNavbar gotoPage={gotoPage} />
          )
        ) : (
          <div></div>
        )}
      </div>
      <div className="flex w-full">
        <div className="w-full">
          {isMobile ? <div></div> : <DgfHeaderHead gotoPage={gotoPage} />}
        </div>
      </div>
    </div>
  );
}

export default memo(DgfHeader);