import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/images/logo-512x512.png";
import logoi from "../assets/images/logo-512x512-i.png";
import logoFooter from "../assets/images/logo-footer.png";



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faFacebookF,
  faInstagram,
  faYoutube,
  faTelegram,
  faWhatsapp,
  faTiktok,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

// import appstore from '../../../assets/icons/app-store.png';
// import googleplay from '../../../assets/icons/google-play.png';

// import axios from 'axios';
// import axiosInstance from '../../../axiosConfig';

function DgfFooter({ gotoPage }) {
  const navigate = useNavigate();

  // const [email, setEmail] = useState("");
  // useEffect(() => {}, []);
  // const isValidEmail = (email) => {
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   return emailRegex.test(email);
  // };

  return (
    <div className="flex flex-col bg-theme text-white">
      <div className="flex flex-col h-auto px-8 py-4 pb-8 lg:mb-12  sm:px-16 md:px-8 lg:px-32 xl:px-32 2xl:px-64">
        <div className="flex flex-col items-start lg:flex-row lg:items-center lg:justify-between ">
          <div className="flex flex-col lg:items-start lg:w-1/3 my-4 lg:h-40">
            <div className="flex items-center mb-2 rounded-full">
              <div className="flex p-0.5  rounded-full">
                <img
                  className="block h-16 w-auto max-w-none"
                  src={logoFooter}
                  alt="Logo"
                  onClick={() => {
                    gotoPage("");
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
            {/* <p className="text-white" style={{ color: "", fontSize: "32px" }}>
              League of{" "}
            </p> */}
            <p className="text-white text-sm">
              Trade directly with farmers nationwide through DiGiFaMaR™ - fresh produce, fair prices.
            </p>
            <div className="flex my-4">
              <div
              // className="relative z-20"
              >
                <ul className="flex">
                  {/* <li className="bg-theme rounded-md p-1 mr-4 hover:bg-softTheme hover:text-white text-white cursor-pointer">
                    <a href="https://www.facebook.com" target="_blank">
                      <FontAwesomeIcon icon={faFacebookF} className="" />
                    </a>
                  </li> */}
                  <li className="bg-theme rounded-md p-1 mr-4 hover:bg-softTheme hover:text-white text-white cursor-pointer">
                    <a href="https://www.x.com/DiGiFaMaR" target="_blank">
                      <FontAwesomeIcon icon={faXTwitter} className="" />
                    </a>
                  </li>
                  <li className="bg-theme rounded-md p-1 mr-4 hover:bg-softTheme hover:text-white text-white cursor-pointer">
                    <a href="https://www.instagram.com/digifamar" target="_blank">
                      <FontAwesomeIcon icon={faInstagram} className="" />
                    </a>
                  </li>
                  {/* <li className="bg-theme rounded-md p-1 mr-4 hover:bg-softTheme hover:text-white text-white cursor-pointer">
                    <a href="https://www.linkedin.com" target="_blank">
                      <FontAwesomeIcon icon={faLinkedinIn} className="" />
                    </a>
                  </li> */}
                  {/* <li className="bg-theme rounded-md p-1 mr-4 hover:bg-softTheme hover:text-white text-white cursor-pointer">
                    <a href="https://www.tiktok.com" target="_blank">
                      <FontAwesomeIcon icon={faTiktok} className="" />
                    </a>
                  </li> */}
                  {/* <li className="bg-theme rounded-md p-1 mr-4 hover:bg-softTheme hover:text-white text-white cursor-pointer">
                    <a href="https://youtube.com" target="_blank">
                      <FontAwesomeIcon icon={faYoutube} className="" />
                    </a>
                  </li> */}
                  {/* <li className="bg-theme rounded-md p-1 mr-4 hover:bg-softTheme hover:text-white text-white cursor-pointer">
                    <a href="https://www.telegram.com/" target="_blank">
                      <FontAwesomeIcon icon={faTelegram} className="" />
                    </a>
                  </li> */}
                  {/* <li className="bg-theme rounded-md p-1 mr-4 hover:bg-softTheme hover:text-white text-white cursor-pointer">
                    <a href="https://www.whatsapp.com/" target="_blank">
                      <FontAwesomeIcon icon={faWhatsapp} className="" />
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="flex flex-col">
              {/* <span
                className="text-white text-sm cursor-pointer block mb-2 
              hover:text-softTheme hover:bg-theme
              "
                onClick={() => {
                  window.location.href = "tel:+2348091113333";
                }}
              >
                Phone: +1 111 111 1111
              </span> */}
              <span
                className="text-white text-sm cursor-pointer block mb-2 
              hover:text-softTheme hover:bg-theme
              "
                onClick={() => {
                  window.location.href = "mailto:support@digifamar.com";
                }}
              >
                Email: support@digifamar.com
              </span>
              {/* <span
                className="text-white text-sm cursor-pointer block mb-2"
                onClick={() => {
                  
                }}
              >
                Address: <br />
                No 1, One Street II,<br />
                Province, State, Country.
              </span> */}
              <span
                className="text-white text-sm cursor-pointer block mb-2 
              hover:text-softTheme hover:bg-theme
              "
                onClick={() => {
                  // window.location.href = "mailto:support@digifamar.com";
                }}
              >
                Website: www.digifamar.com
              </span>
            </div>
          </div>

          <div className="flex flex-col md:items-start md:w-1/3  my-4 md:h-40">
            <p
              onClick={() => {}}
              className="text-white mb-2 "
              style={{ color: "", fontSize: "20px" }}
            >
              Company Info
            </p>
            <p
              onClick={() => {
                navigate("/");
              }}
              className="text-white text-sm mb-2 cursor-pointer hover:text-softTheme"
              style={{ color: "" }}
            >
              Home
            </p>
            <p
              onClick={() => {
                navigate("/about-us");
              }}
              className="text-white text-sm mb-2 cursor-pointer hover:text-softTheme"
              style={{ color: "" }}
            >
              About Us
            </p>
            <p
              onClick={() => {
                navigate("/contact-us");
              }}
              className="text-white text-sm mb-2 cursor-pointer hover:text-softTheme"
              style={{ color: "" }}
            >
              Contact Us
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-end sm:mt-16 ">
          <span
            className="text-white text-sm cursor-pointer block mb-2 
            hover:text-softTheme hover:bg-theme
            "
            onClick={() => { gotoPage("privacy-policy"); }}
          >
            Privacy Policy
          </span>
          <span
            className="text-white text-sm cursor-pointer block mb-2 
            hover:text-softTheme hover:bg-theme
            "
            onClick={() => { gotoPage("terms-of-service"); }}
          >
            Terms of Service
          </span>
        </div>
      </div>

      <div className="mt-auto bg-theme">
        <div className="bottom-0 w-full text-center">
          <p className="text-xs py-2">
            &copy; 2026 DiGiFaMar™. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DgfFooter;
