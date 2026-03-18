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
  faArrowRight,
  faRotateLeft,
  faLocationDot,
  faShieldAlt,
  faPhone,
  faHandshake,
  faDollarSign,
  faShield,
  faMap,
  faMobileAlt,
  faUserPlus,
  faInfo,
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

export default function MarketPage({
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

      <About />

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
              {/* --- Featured Categories --- */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-10 relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-theme/30 -mt-4"
              >
                <div className="text-center mb-0">
                  <h2 className="text-4xl font-bold">
                    Featured <span className="text-theme">Categories</span>
                  </h2>
                  <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                    Shop by product type
                  </p>
                </div>

                {/* --- Image Gallery & Join Section --- */}
                <div className="flex flex-col items-center py-12 px-6">
                  {/* Image Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-7xl mb-12">
                    {[
                      { img: farm3, text: "Fresh Vegetables" },
                      { img: farm4, text: "Fruits" },
                      { img: farm5, text: "Dairy Products" },
                      { img: farm5, text: "Honey & More" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.002 }}
                        transition={{ duration: 0.3 }}
                        className="relative h-48 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                      >
                        <img
                          src={item.img}
                          alt={item.text}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Dark overlay for text readability */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-300" />

                        {/* Bottom Left Text */}
                        <div className="absolute bottom-4 left-6">
                          <p className="text-white font-bold text-lg drop-shadow-md">
                            {item.text}
                          </p>

                          <button className="text-sm font-bold text-white cursor-pointer flex items-center gap-2">
                            View More{" "}
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="text-[10px]"
                            />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* --- Farmer Benefits Section --- */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="py-10"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold">
                    Why Shop on{" "}
                    <span className="text-blue-600">DiGiFaMaR™</span>
                  </h2>

                  <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                    Experience the future of farm-to-table shopping
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Fresher & Local",
                      desc: "Projected 98% of perishables delivered within 24 hours.",
                      icon: faCartShopping,
                      color: "bg-green-500",
                      light: "bg-green-50",
                    },
                    {
                      title: "Better Prices",
                      desc: "Save 20-30% vs traditional retail.",
                      icon: faDollarSign,
                      color: "bg-blue-500",
                      light: "bg-blue-50",
                    },
                    {
                      title: "Secure & Traceable",
                      desc: "Escrow holds funds until you confirm delivery.",
                      icon: faGlobe,
                      color: "bg-purple-500",
                      light: "bg-purple-50",
                    },
                    {
                      title: "Sustainable Choices",
                      desc: "Shop with farmer sustainability badges.",
                      icon: faShield,
                      color: "bg-orange-500",
                      light: "bg-orange-50",
                    },
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className={`bg-white p-8 rounded-2xl border border-white shadow-sm hover:shadow-md transition-all group flex flex-col items-center`}
                    >
                      <div
                        className={`${benefit.color} w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <FontAwesomeIcon
                          icon={benefit.icon}
                          className="text-white text-xl"
                        />
                      </div>
                      <h3 className="text-lg font-bold mb-3 text-center">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-0 text-center">
                        {benefit.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Farmer Marketplace Preview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                // className="py-20 bg-gray-100"
                className="py-20 relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-theme/20 -mt-4"
              >
                <div className="max-w-7xl mx-auto px-6">
                  <h2 className="text-4xl font-bold text-center mb-12">
                    Featured <span className="text-theme">Farmers</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                      >
                        <div className="h-40 bg-gray-200"></div>

                        <div className="p-4">
                          <h3 className="font-semibold">Farmer Name</h3>
                          <div className="flex gap-1 items-center mt-1 -ml-1">
                            <FontAwesomeIcon
                              icon={faLocationDot}
                              className="text-theme"
                            />
                            <p className="text-sm text-gray-600">
                              Farmer Location
                            </p>
                          </div>

                          <div className="my-3 text-theme font-bold">
                            Products
                          </div>

                          <hr className="text-gray-300" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Join Button */}
                  <button
                    // whileHover={{ scale: 1.05 }}
                    // whileTap={{ scale: 0.95 }}
                    className="bg-theme text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-green-900/20 hover:bg-green-700 transition-colors cursor-pointer mx-auto mt-10"
                  >
                    {/* <FontAwesomeIcon icon={faUserPlus} className="text-lg" /> */}
                    See All Farmers
                    <FontAwesomeIcon icon={faArrowRight} className="text-lg" />
                  </button>
                </div>
              </motion.div>

              {/* --- Nationwide Delivery --- */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-10 mt-10"
              >
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold">
                    Nationwide <span className="text-theme">Delivery</span>
                  </h2>
                  <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                    Fresh produce delivered across all 50 states. DiGiFaMaR uses
                    geolocation to connect you with nearby farmers for the
                    fastest delivery—most local orders arrive within 24 hours.
                  </p>
                </div>

                {/* Image Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                  <div className="relative   rounded-4xl overflow-hidden shadow-xl  border border-gray-200">
                    <div className="bg-green-50 rounded-xl p-8  h-full">
                      <div className="flex items-start mb-3">
                        <div className="bg-green-500 text-white p-3 rounded-lg mr-4">
                          <FontAwesomeIcon icon={faClock} />
                        </div>

                        <div className="flex flex-col">
                          <h3 className="font-bold text-lg">Home Delivery</h3>

                          <p className="text-sm text-gray-700">
                            DiGiFaMaR connects you with nearby farmers for
                            fastest delivery-most local orders arrive within 24
                            hours. Track your order in real-time and receive
                            contactless delivery at your doorstep anywhere in
                            America.
                          </p>
                        </div>
                      </div>

                      <hr className="text-gray-200 my-8" />
                    </div>
                  </div>

                  <div className="relative  rounded-4xl overflow-hidden shadow-xl  border border-gray-200">
                    <div className="bg-orange-50 rounded-xl p-8  h-full">
                      <div className="flex items-start mb-3">
                        <div className="bg-orange-500 text-white p-3 rounded-lg mr-4">
                          <FontAwesomeIcon icon={faClock} />
                        </div>

                        <div className="flex flex-col">
                          <h3 className="font-bold text-lg">Pickup Hubs</h3>

                          <p className="text-sm text-gray-700">
                            Collect from nearby pickup hubs to save on delivery
                            fees. Choose from multiple convenient locations
                            across major cities nationwide. Extended pickup
                            hours available.
                          </p>
                        </div>
                      </div>

                      <hr className="text-gray-200 my-8" />
                    </div>
                  </div>
                </div>

                {/* Disclaimer Box */}
                <div className="bg-green-50 border border-gray-100  rounded-xl p-4 flex gap-4 w-full justify-center items-center">
                  <div className="bg-theme rounded-full p-1 w-5 h-5 flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faInfo}
                      className="text-white text-xs"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg ">
                      Free delivery on orders over $50 within major metro areas
                      nationwide
                    </h4>
                  </div>
                </div>
              </motion.div>

              {/* --- Sell Your Products Section --- */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full bg-gray-50/50 py-20 px-6"
              >
                <div className="max-w-7xl mx-auto">
                  {/* Header */}
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                      Sell Your Products on{" "}
                      <span className="text-theme">DiGiFaMaR™</span>
                    </h2>
                  </div>

                  {/* Three Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-16">
                    {/* Column 1: Empower Farmers */}
                    <div className="flex flex-col items-center px-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Empower Farmers
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                        Help farmers earn fair prices for their produce by
                        eliminating unnecessary middlemen and connecting them
                        directly to you.
                      </p>
                    </div>

                    {/* Column 2: Fresh Produce */}
                    <div className="flex flex-col items-center border-t md:border-t-0 md:border-x border-gray-200 py-8 md:py-0 px-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Fresh Produce
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                        Connect consumers with fresh, locally-sourced produce
                        from American farms, delivered with speed and care.
                      </p>
                    </div>

                    {/* Column 3: Secure Transactions */}
                    <div className="flex flex-col items-center px-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Secure Transactions
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                        Provide secure escrow payments that protect both farmers
                        and buyers, ensuring peace of mind for every sale.
                      </p>
                    </div>
                  </div>

                  {/* Centered Button Underneath Columns */}
                  <div
                    className="flex justify-center"
                    onClick={() => {
                      navigate("/create-farmer-with-email");
                    }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-theme text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl shadow-green-900/10 hover:bg-green-700 transition-all cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faUserPlus} className="text-lg" />
                      Become A Farmers Today
                    </motion.button>
                  </div>
                </div>
              </motion.div>
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
