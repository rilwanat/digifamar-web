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
  faCheckCircle, 
  faShield, 
  faChartLine, 
  faUserPlus, 
  faStore, 
  faTruck, 
  faWallet
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

export default function JoinFarmersPage({
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
              {/* --- Section 1: Full-Width Green Hero --- */}
              <div className="bg-theme text-white py-24 px-6 text-center relative left-1/2 right-1/2 -mx-[50vw] w-screen -mt-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-4xl mx-auto"
                >
                  <span className="bg-white/20 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest mb-6 inline-block">
                    U.S. Farmers Only
                  </span>
                  <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                    Sell Direct to Buyers <br /> Across America
                  </h1>
                  <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
                    Join the digital movement. Eliminate middlemen, set your own
                    prices, and keep up to{" "}
                    <span className="text-yellow-400 font-bold">
                      92% of every sale
                    </span>
                    .
                  </p>
                </motion.div>
              </div>

              {/* --- Section 2: Overlapping Stats Card --- */}
              <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10 mb-24">
                <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <h3 className="text-3xl font-extrabold text-theme mb-1">
                      10,000+
                    </h3>
                    <p className="text-gray-500 font-medium">
                      Projected Farmers
                    </p>
                  </div>
                  <div className="border-y md:border-y-0 md:border-x border-gray-100 py-6 md:py-0">
                    <h3 className="text-3xl font-extrabold text-theme mb-1">
                      Free
                    </h3>
                    <p className="text-gray-500 font-medium">
                      Onboarding for First 1,000
                    </p>
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-theme mb-1">
                      24h
                    </h3>
                    <p className="text-gray-500 font-medium">
                      Typical Approval Time
                    </p>
                  </div>
                </div>
              </div>

              {/* --- Section 3: Why Choose DiGiFaMaR™ (Benefits Grid) --- */}
              <div className="max-w-7xl mx-auto px-6 mb-32">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                    Why Farmers Choose Our Marketplace
                  </h2>
                  <div className="h-1.5 w-20 bg-theme mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: "No Listing Fees",
                      desc: "It costs $0 to list your entire inventory. We only earn an 8% fee when you successfully sell.",
                      icon: faStore,
                    },
                    {
                      title: "Secure Escrow",
                      desc: "Funds are held securely by Escrow.com and released the moment delivery is confirmed.",
                      icon: faShield,
                    },
                    {
                      title: "Build Reputation",
                      desc: "Verified sales and 5-star reviews unlock priority ranking and future agricultural loan access.",
                      icon: faChartLine,
                    },
                  ].map((benefit, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="p-8 rounded-4xl bg-gray-50 border border-gray-100 hover:border-theme/30 transition-all"
                    >
                      <div className="text-theme text-3xl mb-6">
                        <FontAwesomeIcon icon={benefit.icon} />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {benefit.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* --- Section 4: Three-Step Process --- */}
              <div className="w-full bg-gray-50 py-24 px-6 rounded-[3rem] mb-32">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                      How the Process Works
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {[
                      {
                        step: "01",
                        title: "Create Profile",
                        desc: "List your products, prices, and delivery radius in under 5 minutes.",
                        icon: faUserPlus,
                      },
                      {
                        step: "02",
                        title: "Receive Orders",
                        desc: "Get real-time notifications when buyers purchase your fresh produce.",
                        icon: faTruck,
                      },
                      {
                        step: "03",
                        title: "Get Paid",
                        desc: "Deliver the goods and enter the 6-digit code to release funds to your wallet.",
                        icon: faWallet,
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center text-center relative z-10"
                      >
                        <div className="w-16 h-16 bg-white shadow-lg rounded-2xl flex items-center justify-center text-theme text-2xl mb-6 border border-gray-100">
                          <FontAwesomeIcon icon={item.icon} />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-500 text-sm max-w-xs">
                          {item.desc}
                        </p>
                        <span className="absolute -top-4 -right-2 text-6xl font-black text-gray-200/50 -z-10">
                          {item.step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* --- Section 5: Final CTA (Ready to Sell?) --- */}
              <div className="max-w-4xl mx-auto px-6 pb-32 text-center">
                <motion.div
                  // whileHover={{ scale: 1.02 }}
                  className="bg-theme rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden"
                >
                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                      Ready to Take Control?
                    </h2>
                    <p className="text-white/80 mb-10 text-lg">
                      Join hundreds of U.S. farmers already growing their
                      business with DiGiFaMaR™. Signup is free and approval
                      takes less than 48 hours.
                    </p>
                    <motion.button 
                    whileHover={{ scale: 1.02 }}
                    onClick={() => navigate("/create-farmer-with-email")}
                    className="bg-white cursor-pointer text-theme px-10 py-4 rounded-2xl font-bold text-lg 
                     hover:text-orange transition-all flex items-center gap-3 mx-auto shadow-lg">
                      <FontAwesomeIcon icon={faCheckCircle} />
                      Start Your Free Application
                    </motion.button>
                  </div>
                  {/* Decorative background element */}
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                </motion.div>
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
