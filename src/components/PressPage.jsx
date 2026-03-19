import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import About from "../widgets/About.jsx";

import DgfHeader from "../navbar/DgfHeader.jsx";
import DgfFooter from "../navbar/DgfFooter.jsx";

import DgfBanner from "../widgets/DgfBanner.jsx";

import TitleLine from "../widgets/TitleLine.jsx";
// import FileUpload from "../widgets/FileUpload.jsx";

import Loading from "../widgets/Loading.jsx";
import MiniLoading from "../widgets/MiniLoading.jsx";

import logo from "../assets/images/logo-512x512.png";
import logoFull from "../assets/images/logo-512x512.png"; //logo-full-h768.png";

import background from "../assets/images/background2.png";

import man from "../assets/images/man.jpg";
import farm from "../assets/images/farm.jpg";
import farm1 from "../assets/images/farm1.jpg";
import farm2 from "../assets/images/farm2.jpg";
import farm3 from "../assets/images/farm3.jpg";
import farm4 from "../assets/images/farm4.jpg";
import farm5 from "../assets/images/farm5.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faChevronLeft,
  faLightbulb,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarAlt,
  faClock,
  faMapMarkerAlt,
  faEye,
  faGlobe,
  faBullseye,
  faCheck,
  faDownload,
  faNewspaper,
  faBullhorn,
  faFilePdf,
  faArrowRight,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import NotificationModal from "./modals/NotificationModal.jsx";

//
import axiosInstance from "../auth/axiosConfig.js"; // Ensure the correct relative path
import {
  setCookie,
  isUserAuthenticated,
  isFarmerAuthenticated,
  isAdminAuthenticated,
} from "../auth/authUtils.jsx"; // Ensure the correct relative path
import { jwtDecode } from "jwt-decode";
import { getCookie, deleteCookie } from "../auth/authUtils.jsx"; // Import getCookie function
//

import { format } from "date-fns";

// import DOMPurify from "dompurify";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PressPage({
  isMobile,
  userDetails,
  refreshUserDetails,
}) {
  const navigate = useNavigate();

  const slugify = (text) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-");

  //notification modal
  const [notificationType, setNotificationType] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const openNotificationModal = (type, title, message) => {
    setNotificationType(type);
    setNotificationTitle(title);
    setNotificationMessage(message);

    setIsNotificationModalOpen(true);
  };
  const closeNotificationModal = () => {
    setIsNotificationModalOpen(false);
  };
  //notification modal

  const currentPageName = "News";

  const [isDataloading, setIsDataLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const gotoPage = (path) => {
    // alert("");
    navigate("/" + path);
  };

  return (
    <div>
      <DgfHeader isMobile={isMobile} gotoPage={gotoPage} showMarqees={true} />

      <div className="pt-20"></div>
      {/* <div className=""></div> */}

      {/* <DgfBanner className="" /> */}

      {/* <About /> */}

      <div
        className="w-full "
        style={{
          backgroundImage: `url(${background})`,
          backgroundAttachment: "fixed",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col h-auto px-4 sm:px-16 md:px-8 lg:px-32 xl:px-32 2xl:px-64">
          <div className="w-full p-4 ">
            {/* Welcome */}
            <div
              className=""
              // style={{
              //   backgroundImage: `url(${background})`,
              //   backgroundAttachment: 'fixed',
              //   backgroundSize: 'contain',
              //   backgroundPosition: 'center',
              // }}
            >
              {/* --- Press Hero Header --- */}
              <div className=" bg-theme text-white py-20 px-6 text-center  -mt-4 relative left-1/2 right-1/2 -mx-[50vw] w-screen">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl mx-auto"
                >
                  <span className="bg-white/20 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
                    Newsroom
                  </span>
                  <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                    DiGiFaMaR™ Press & Media
                  </h1>
                  <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
                    Stay up to date with the latest news, announcements, and
                    media resources from the digital marketplace empowering
                    American farmers.
                  </p>
                </motion.div>
              </div>

              {/* --- Press Kit & Resources --- */}
              <div className="max-w-7xl mx-auto px-6 -mt-10 mb-20 relative z-10">
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="bg-lightGreen w-16 h-16 rounded-2xl flex items-center justify-center text-theme text-2xl">
                      <FontAwesomeIcon icon={faBullhorn} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Official Press Kit
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Download logos, brand guidelines, and executive
                        headshots.
                      </p>
                    </div>
                  </div>
                  <button className="w-full md:w-auto bg-theme text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-green-700 transition-all shadow-lg shadow-green-900/10 cursor-pointer">
                    <FontAwesomeIcon icon={faDownload} />
                    Download Kit (ZIP, 25MB)
                  </button>
                </div>
              </div>

              {/* --- News & Announcements Grid --- */}
              <div className="max-w-7xl mx-auto px-6 py-10 mb-20">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      Latest News
                    </h2>
                    <p className="text-gray-500">
                      Recent updates from the DiGiFaMaR™ team.
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <button className="text-theme font-bold flex items-center gap-2 hover:gap-3 transition-all">
                      View All Archive{" "}
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-xs"
                      />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      date: "March 15, 2026",
                      title:
                        "DiGiFaMaR™ Reaches 10,000 Verified Farmer Milestone",
                      category: "Growth",
                      icon: faNewspaper,
                    },
                    {
                      date: "Feb 28, 2026",
                      title:
                        "New Escrow Integration Enhances Secure Farm Transactions",
                      category: "Product Update",
                      icon: faFilePdf,
                    },
                    {
                      date: "Jan 12, 2026",
                      title:
                        "Expansion: Digital Marketplace Now Live in All 50 States",
                      category: "Expansion",
                      icon: faNewspaper,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -10 }}
                      className="bg-gray-50/50 border border-gray-100 p-8 rounded-[2rem] flex flex-col h-full hover:shadow-lg transition-all"
                    >
                      <span className="text-theme font-bold text-[10px] uppercase tracking-widest mb-4 inline-block">
                        {item.category}
                      </span>
                      <p className="text-gray-400 text-xs mb-3 font-medium">
                        {item.date}
                      </p>
                      <h4 className="text-xl font-bold text-gray-900 mb-6 flex-grow leading-tight">
                        {item.title}
                      </h4>
                      <button className="text-gray-900 font-bold text-sm flex items-center gap-2 group cursor-pointer">
                        Read Article
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="text-[10px] group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* --- Media Inquiries CTA --- */}
              <div className="max-w-4xl mx-auto px-6 pb-24 text-center">
                <div className="bg-lightBlue/30 border border-blue-100 rounded-[2.5rem] p-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Media Inquiries
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Are you a member of the press? For interviews, additional
                    assets, or press-related questions, please reach out to our
                    media relations team.
                  </p>
                  <a
                    href="mailto:press@digifamar.com"
                    className="text-theme font-extrabold text-lg hover:underline"
                  >
                    press@digifamar.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onRequestClose={closeNotificationModal}
        notificationType={notificationType}
        notificationTitle={notificationTitle}
        notificationMessage={notificationMessage}
        gotoPage={gotoPage}
      />

      <DgfFooter gotoPage={gotoPage} />
    </div>
  );
}
