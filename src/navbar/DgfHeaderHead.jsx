import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logoHome from "../assets/images/logo-home.png";

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

import DgfButton from "../widgets/DgfButton";
import DgfHelpButton from "../widgets/DgfHelpButton";
import DgfButtonDropdown from "../widgets/DgfButtonDropdown";

import YesNoNotificationModal from "../components/modals/YesNoNotificationModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function DgfHeaderHead({ gotoPage }) {
  const navigate = useNavigate();

  //YesNo notification modal
  const [notificationYesNoType, setYesNoNotificationType] = useState(false);
  const [notificationYesNoTitle, setYesNoNotificationTitle] = useState("");
  const [notificationYesNoMessage, setYesNoNotificationMessage] = useState("");
  const [isYesNoNotificationModalOpen, setYesNoIsNotificationModalOpen] =
    useState(false);
  const openYesNoNotificationModal = (type, title, message) => {
    setYesNoNotificationType(type);
    setYesNoNotificationTitle(title);
    setYesNoNotificationMessage(message);

    setYesNoIsNotificationModalOpen(true);
  };
  const closeYesNoNotificationModal = () => {
    setYesNoIsNotificationModalOpen(false);
  };
  //YesNo notification modal

  useEffect(() => {
    // Initial useEffect logic if needed
  }, []);

  return (
    <div
      className={`flex flex-col h-auto px-4 sm:px-16 md:px-16  
    ${
      isUserAuthenticated() ||
      isFarmerAuthenticated() ||
      isAdminAuthenticated()
        ? ""
        : "lg:px-32 xl:px-32 2xl:px-64 "
    }
    py-2 pb-2 bg-white shadow-lg`}
    >
      <div className="flex flex-col md:flex-row justify-between">
        {/* <div className="absolute top-2 flex items-center mr-8 bg-white p-2 rounded-full"> */}
        <div
          className={`absolute top-1 flex items-center mr-8 
        ${
          isUserAuthenticated()
            ? "bg-white"
            : isFarmerAuthenticated()
            ? "bg-white"
            : isAdminAuthenticated()
            ? "bg-white"
            : "bg-white"
        } 
        p-0.5  z-[100]`}
        >
          <img
            className={` block h-16 w-auto max-w-none cursor-pointer `}
            src={logoHome}
            alt="Logo"
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="text-center w-full">
          <div className="flex items-center z-50" style={{ height: "64px" }}>
            <div
              className="cursor-pointer ml-28 mx-4"
              onClick={() => {
                navigate("/");
              }}
            >
              <p className="text-sm cursor-pointer font-semibold text-theme">
                Home
              </p>
            </div>

            <div
              className="cursor-pointer mx-4"
              onClick={() => {
                navigate("/about-us");
              }}
            >
              <p className="text-sm cursor-pointer font-semibold text-theme">
                About
              </p>
            </div>

            {/* <div
              className="cursor-pointer mx-4"
              onClick={() => {
                navigate("/members");
              }}
            >
              <p className="text-sm cursor-pointer font-semibold">Membership</p>
            </div> */}
            {/* <div
              className="cursor-pointer mx-4"
              onClick={() => {
                // navigate("/events");
              }}
            >
              <p className="text-sm cursor-pointer font-semibold text-red-500 white">Events</p>
            </div> */}
            {/* <div
              className="cursor-pointer mx-4"
              onClick={() => {
                // navigate("/publications");
              }}
            >
              <p className="text-sm cursor-pointer font-semibold text-red-500  white">
                Newsletters
              </p>
            </div> */}
            {/* <div
              className="cursor-pointer mx-4"
              onClick={() => {
                // navigate("/media");
              }}
            >
              <p className="text-sm cursor-pointer font-semibold text-red-500  white">Gallery</p>
            </div> */}
            {/* <div
              className="cursor-pointer mx-4"
              onClick={() => {
                navigate("/donations");
              }}
            >
              <p className="text-sm cursor-pointer font-semibold text-theme">
                Donations
              </p>
            </div> */}
            {/* <div
              className="cursor-pointer mx-4"
              onClick={() => {
                // navigate("/membership-requirements");
              }}
            >
              <p className="text-sm cursor-pointer font-semibold text-black">
                Membership Fee
              </p>
            </div> */}
            <div
              className="cursor-pointer mx-4"
              onClick={() => {
                navigate("/contact-us");
              }}
            >
              <p className="text-sm cursor-pointer font-semibold text-theme">
                Contact
              </p>
            </div>
          </div>
        </div>

        {/* <div className="flex items-center" style={{  }}>
                    <img
                        className="block h-12 w-auto max-w-none"
                        src={scrappLogo}
                        alt="Logo"
                        onClick={() => {
                            navigate('/');
                        }}
                        style={{ cursor: 'pointer' }}
                    />
                </div> */}

        <div className="flex items-center">
          <>
            <div className="flex items-center" style={{ height: "40px" }}>
              {isUserAuthenticated() ? (
                <div className="flex items-center">
                  {/* <FontAwesomeIcon icon={faUser} className="w-4 h-4" /> */}
                  <div
                    className="text-sm text-theme cursor-pointer font-semibold hover:bg-white hover:text-theme rounded-md px-3 py-1 mr-2"
                    onClick={() => {
                      navigate("/user-dashboard");
                    }}
                  >
                    Dashboard
                  </div>
                  <div
                    className="text-sm text-red-500 cursor-pointer font-semibold hover:bg-white hover:text-theme rounded-md px-3 py-1"
                    onClick={() => {
                      openYesNoNotificationModal(
                        null,
                        "User Logout",
                        "Are you sure you want to logout ?"
                      );
                    }}
                  >
                    Logout
                  </div>
                </div>
              ) : isFarmerAuthenticated() ? (
                <div className="flex items-center">
                  {/* <FontAwesomeIcon icon={faUser} className="w-4 h-4" /> */}
                  <div
                    className="text-sm text-theme cursor-pointer font-semibold hover:bg-white hover:text-theme rounded-md px-3 py-1 mr-2"
                    onClick={() => {
                      navigate("/farmer-dashboard");
                    }}
                  >
                    Dashboard
                  </div>
                  <div
                    className="text-sm text-red-500 cursor-pointer font-semibold hover:bg-white hover:text-theme rounded-md px-3 py-1"
                    onClick={() => {
                      openYesNoNotificationModal(
                        null,
                        "Farmer Logout",
                        "Admin, are you sure you want to logout ?"
                      );
                    }}
                  >
                    Logout
                  </div>
                </div>
              ) : isAdminAuthenticated() ? (
                <div className="flex items-center">
                  {/* <FontAwesomeIcon icon={faUser} className="w-4 h-4" /> */}
                  <div
                    className="text-sm text-theme cursor-pointer font-semibold hover:bg-white hover:text-theme rounded-md px-3 py-1 mr-2"
                    onClick={() => {
                      navigate("/admin-dashboard");
                    }}
                  >
                    Dashboard
                  </div>
                  <div
                    className="text-sm text-red-500 cursor-pointer font-semibold hover:bg-white hover:text-theme rounded-md px-3 py-1"
                    onClick={() => {
                      openYesNoNotificationModal(
                        null,
                        "Admin Logout",
                        "Admin, are you sure you want to logout ?"
                      );
                    }}
                  >
                    Logout
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  {/* <TmfpHelpButton /> */}

                  <DgfButtonDropdown />
                  <DgfButton
                    icon={true}
                    iconData={faUser}
                    text={"Sign In"}
                   onClick={() => gotoPage("login-with-phone")}
                  />
                </div>
              )}
            </div>
          </>
        </div>
      </div>

      <YesNoNotificationModal
        isOpen={isYesNoNotificationModalOpen}
        onRequestClose={closeYesNoNotificationModal}
        notificationType={notificationYesNoType}
        notificationTitle={notificationYesNoTitle}
        notificationMessage={notificationYesNoMessage}
        gotoPage={gotoPage}
      />
    </div>
  );
}
