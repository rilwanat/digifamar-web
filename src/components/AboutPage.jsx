import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Hero from "../widgets/Hero.jsx";

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
  faChevronDown,
  faQuestionCircle,
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

export default function AboutPage({
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

  // Track which FAQ index is open (-1 means all closed)
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      q: "When do I get paid?",
      a: "Once the buyer confirms delivery and verifies the 6-digit escrow code, funds are released instantly to your wallet. You can withdraw to your bank account within 1-3 business days.",
    },
    {
      q: "What fees do you charge?",
      isSpecial: true, // Marker for the table layout
    },
    {
      q: "How does escrow protect me?",
      a: "Escrow.com holds the buyer's payment securely until delivery is confirmed. This guarantees you get paid—no chargebacks, no fraudulent disputes. You control when funds are released by sharing the 6-digit code with the buyer.",
    },
    {
      q: "How long does onboarding take?",
      a: "Most farmers complete registration in under 5 minutes. After submitting your application, we typically approve within 24 hours. Once approved, you can list products and start receiving orders immediately.",
    },
    {
      q: "What is the approval timeline?",
      a: "We review and approve applications within 24-48 hours (typically 24 hours for complete submissions).",
    },
    {
      q: "What if I'm new to online selling?",
      a: "No problem! We provide free onboarding support to all new farmers. You'll get a dedicated setup guide, tips for taking great product photos, and access to our farmer community for advice.",
    },
  ];

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
              {/* --- How the Marketplace Works Section --- */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full py-12"
              >
                <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-2xl p-8 md:p-12 shadow-sm">
                  <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                    How the Marketplace Works
                  </h2>

                  <p className="text-center text-gray-600 mb-10 text-lg">
                    DiGiFaMaR provides a digital environment where farmers and
                    buyers can connect directly.
                  </p>

                  <div className="space-y-4 max-w-3xl mx-auto">
                    {/* Step 1 */}
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 w-8 h-8 bg-theme text-white rounded-full flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                      <p className="text-gray-700 text-lg leading-snug">
                        Farmers create listings for available produce and set
                        their own prices and quantities.
                      </p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 w-8 h-8 bg-theme text-white rounded-full flex items-center justify-center font-bold text-sm">
                        2
                      </div>
                      <p className="text-gray-700 text-lg leading-snug">
                        Buyers can browse these listings, communicate with
                        farmers, and place orders through the platform.
                      </p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-center gap-4">
                      <div className="shrink-0 w-8 h-8 bg-theme text-white rounded-full flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      <p className="text-gray-700 text-lg leading-snug">
                        Secure transaction workflows help ensure that both
                        parties can trade with confidence.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* --- About DiGiFaMaR Section --- */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center py-16 gap-10 bg-white"
              >
                <div className="flex flex-col items-center text-center max-w-3xl">
                  <div className="flex gap-2 items-center my-2 rounded-4xl bg-softerTheme px-6 py-2 w-max mx-auto mb-6">
                    <FontAwesomeIcon icon={faGlobe} className="text-theme" />
                    <span className="text-sm font-bold text-theme leading-none">
                      PLATFORM OVERVIEW
                    </span>
                  </div>

                  <h2 className="text-4xl font-bold text-black mb-6">
                    About <span className="text-theme">DiGiFaMaR</span>
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    DiGiFaMaR (Digital Farmers Marketplace) is an online
                    platform that connects farmers and buyers across the United
                    States through a digital agricultural marketplace.
                  </p>
                  <p className="text-gray-500 mt-4">
                    Farmers can list fresh produce and agricultural products on
                    the platform, while buyers can browse listings, place
                    orders, and coordinate transactions directly with farmers
                    using secure marketplace tools.
                  </p>
                </div>

                {/* Disclaimer Box */}
                <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 flex gap-4 max-w-4xl items-start">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <FontAwesomeIcon
                      icon={faShieldAlt}
                      className="text-blue-500 text-xl"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg mb-1">
                      Marketplace Role Disclaimer
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      DiGiFaMaR operates as a digital marketplace platform
                      connecting farmers and buyers. Individual farmers are
                      responsible for their listings, pricing, product
                      descriptions, and delivery terms.
                    </p>
                  </div>
                </div>

                {/* Mission Section */}
                <div className="w-full mt-10">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold">Our Mission</h2>
                    <p className="text-gray-500 mt-2">
                      To revolutionize American agriculture by creating a
                      transparent, efficient, and fair digital marketplace.
                    </p>
                  </div>

                  <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={farm}
                      alt="Mission"
                      className="w-full h-full object-cover brightness-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <h3 className="text-white text-2xl md:text-4xl font-bold text-center ">
                        "Connecting America's Farmers to the Nation's Buyers"
                      </h3>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* --- Empower / Fresh / Secure Cards --- */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 px-6 max-w-7xl mx-auto"
              >
                {/* Empower Farmers */}
                <div className="bg-lightGreen/20 border border-green-50 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-lightGreen w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <FontAwesomeIcon
                      icon={faHandshake}
                      className="text-green-600 text-2xl"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Empower Farmers
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Help farmers earn fair prices for their produce by
                    eliminating unnecessary middlemen.
                  </p>
                </div>

                {/* Fresh Produce */}
                <div className="bg-lightBlue/20 border border-blue-50 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-lightBlue w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <FontAwesomeIcon
                      icon={faGlobe}
                      className="text-blue-600 text-2xl"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Fresh Produce
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Connect consumers with fresh, locally-sourced produce from
                    American farms.
                  </p>
                </div>

                {/* Secure Transactions */}
                <div className="bg-lightOrange/20 border border-orange-50 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-lightOrange w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <FontAwesomeIcon
                      icon={faShieldAlt}
                      className="text-orange-600 text-2xl"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Secure Transactions
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Provide secure escrow payments that protect both farmers and
                    buyers.
                  </p>
                </div>
              </motion.div>

              {/* --- Why DiGiFaMaR Was Created --- */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="py-10"
              >
                <div className="text-center mb-16">
                  <div className="flex gap-2 items-center my-2 rounded-4xl bg-softerTheme px-6 py-2 w-max mx-auto mb-6">
                    <FontAwesomeIcon
                      icon={faLightbulb}
                      className="text-theme"
                    />
                    <span className="text-sm font-bold text-theme leading-none">
                      OUR STORY
                    </span>
                  </div>

                  <h2 className="text-4xl font-bold">
                    Why <span className="text-theme">DiGiFaMaR™</span> Was
                    Created
                  </h2>
                  <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                    DiGiFaMaR™ was born from a simple observation: American
                    farmers work harder than ever but keep less of what they
                    earn. We decided to change that.
                  </p>
                </div>

                {/* Image Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                  <div className="relative h-64 md:h-80 rounded-4xl overflow-hidden shadow-xl group">
                    <img
                      src={farm1}
                      alt="Real American Farmers"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                      <h4 className="text-white font-bold text-xl">
                        Real American Farmers
                      </h4>
                      <p className="text-white/80 text-sm">
                        Working hard every day to feed America
                      </p>
                    </div>
                  </div>
                  <div className="relative h-64 md:h-80 rounded-4xl overflow-hidden shadow-xl group">
                    <img
                      src={farm2}
                      alt="Modern Agriculture"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                      <h4 className="text-white font-bold text-xl">
                        Modern Agriculture
                      </h4>
                      <p className="text-white/80 text-sm">
                        Combining tradition with technology
                      </p>
                    </div>
                  </div>
                </div>

                {/* Comparison Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                  {/* Problems Card */}
                  <div className="bg-red-50/50 border border-red-100 rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <FontAwesomeIcon
                        icon={faRotateLeft}
                        className="text-red-500"
                      />
                      <h3 className="text-xl font-bold text-red-900">
                        Problems Farmers Face
                      </h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        "Middlemen lowering profits - Farmers often receive only 25-30% of final retail price",
                        "Limited buyer access - Dependence on local markets restricts growth",
                        "Lack of digital marketplaces - No easy way to sell online directly",
                        "Unpredictable Income - Seasonal fluctuations and price volatility",
                      ].map((text, i) => (
                        <li key={i} className="flex gap-3 text-sm ">
                          <span className="font-bold text-red-800">✕</span>{" "}
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solutions Card */}
                  <div className="bg-green-50/50 border border-green-100 rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-green-600"
                      />
                      <h3 className="text-xl font-bold text-green-900">
                        The DiGiFaMaR™ Solution
                      </h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        "Direct connections - Connect directly with restaurants and retailers",
                        "Better pricing - Set your own prices and keep 80-92% of every sale",
                        "Digital marketplace - Sell produce online to buyers across all 50 states",
                        "Secure payments - Every transaction protected with escrow",
                      ].map((text, i) => (
                        <li key={i} className="flex gap-3 text-sm ">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="mt-1 text-green-800"
                          />{" "}
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* --- Image Gallery & Join Section --- */}
                <div className="flex flex-col items-center py-12 px-6">
                  {/* Image Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl mb-12">
                    {[
                      { img: farm3, text: "Farm Fresh" },
                      { img: farm4, text: "Growing Strong" },
                      { img: farm5, text: "Fresh Harvest" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.002 }}
                        transition={{ duration: 0.3 }}
                        className="relative h-56 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                      >
                        <img
                          src={item.img}
                          alt={item.text}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Dark overlay for text readability */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                        {/* Bottom Left Text */}
                        <div className="absolute bottom-4 left-6">
                          <p className="text-white font-bold text-lg drop-shadow-md">
                            {item.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Join Button */}
                  <button
                    // whileHover={{ scale: 1.05 }}
                    // whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigate("/create-farmer-with-email");
                    }}
                    className="bg-theme text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-green-900/20 hover:bg-green-700 transition-colors cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faUserPlus} className="text-lg" />
                    Join Farmers Today
                  </button>
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
                  <div className="flex gap-2 items-center my-2 rounded-4xl bg-blue-50 px-6 py-2 w-max mx-auto mb-6">
                    <FontAwesomeIcon
                      icon={faLightbulb}
                      className="text-blue-600"
                    />
                    <span className="text-sm font-bold text-blue-600 leading-none">
                      FARMER BENEFITS
                    </span>
                  </div>

                  <h2 className="text-4xl font-bold">
                    How the Platform{" "}
                    <span className="text-blue-600">Helps Farmers</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Direct Farm-to-Consumer Sales",
                      desc: "Sell directly to restaurants, retailers, and consumers. No middlemen means more money in your pocket.",
                      icon: faCartShopping,
                      color: "bg-green-500",
                      light: "bg-green-50",
                    },
                    {
                      title: "Better Pricing",
                      desc: "Set competitive prices based on quality and market demand. Keep 80-92% of every sale.",
                      icon: faDollarSign,
                      color: "bg-blue-500",
                      light: "bg-blue-50",
                    },
                    {
                      title: "Nationwide Buyer Access",
                      desc: "Break free from local markets. Reach buyers across all 50 states via our digital marketplace.",
                      icon: faGlobe,
                      color: "bg-purple-500",
                      light: "bg-purple-50",
                    },
                    {
                      title: "Secure Escrow Payments",
                      desc: "Funds are held securely until delivery is confirmed, ensuring peace of mind for every sale.",
                      icon: faShield,
                      color: "bg-orange-500",
                      light: "bg-orange-50",
                    },
                    {
                      title: "Easy Digital Tools",
                      desc: "List products, manage orders, and communicate with buyers-all from your smartphone.",
                      icon: faPhone,
                      color: "bg-cyan-500",
                      light: "bg-cyan-50",
                    },
                    {
                      title: "Business Growth",
                      desc: "Track sales, analyze trends, and grow your farm business with insights and tools designed for modern ag.",
                      icon: faBullseye,
                      color: "bg-red-500",
                      light: "bg-red-50",
                    },
                  ].map((benefit, index) => (
                    <div
                      key={index}
                      className={`${benefit.light} p-8 rounded-2xl border border-white shadow-sm hover:shadow-md transition-all group`}
                    >
                      <div
                        className={`${benefit.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <FontAwesomeIcon
                          icon={benefit.icon}
                          className="text-white text-xl"
                        />
                      </div>
                      <h3 className="text-lg font-bold mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {benefit.desc}
                      </p>
                      <button className="text-sm font-bold text-theme cursor-pointer flex items-center gap-2">
                        Learn More{" "}
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="text-[10px]"
                        />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center my-8 gap-4">
                  {/* Join Button */}
                  <button
                    // whileHover={{ scale: 1.05 }}
                    // whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigate("/create-farmer-with-email");
                    }}
                    className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-green-900/20 hover:bg-green-700 transition-colors cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faUserPlus} className="text-lg" />
                    Join Farmers
                  </button>
                  |{/* Join Button */}
                  <button
                    // whileHover={{ scale: 1.05 }}
                    // whileTap={{ scale: 0.95 }}
                    className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 border-2 border-blue-600 shadow-lg shadow-green-900/20 hover:bg-green-700 transition-colors cursor-pointer"
                  >
                    {/* <FontAwesomeIcon icon={faUserPlus} className="text-lg" /> */}
                    Browse Market
                    <FontAwesomeIcon icon={faArrowRight} className="text-lg" />
                  </button>
                </div>
              </motion.div>

              {/* --- Farmer FAQ Section --- */}
              <div className="flex flex-col items-center py-16 px-6 ">
                {/* Top Badge */}
                <div className="flex gap-2 items-center my-2 rounded-4xl bg-softerTheme px-6 py-2 w-max mx-auto mb-6">
                  <FontAwesomeIcon
                    icon={faQuestionCircle}
                    className="text-theme"
                  />
                  <span className="text-sm font-bold text-theme leading-none">
                    FREQUENTLY ASKED QUESTIONS
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12 text-center">
                  Questions Farmers Ask Us
                </h2>

                <div className="w-full max-w-4xl space-y-4">
                  {faqData.map((item, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white"
                    >
                      {/* Header / Trigger */}
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full bg-gray-50/50 p-5 flex justify-between items-center cursor-pointer transition-colors hover:bg-gray-100"
                      >
                        <h3 className="font-bold text-gray-800 text-left">
                          {item.q}
                        </h3>
                        <motion.div
                          animate={{ rotate: activeIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className="text-theme text-xs"
                          />
                        </motion.div>
                      </button>

                      {/* Dropdown Content */}
                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="p-6 bg-white border-t border-gray-100">
                              {item.isSpecial ? (
                                /* Special Layout for Fees Section */
                                <div className="space-y-4">
                                  <p className="text-gray-600 text-sm italic">
                                    Zero upfront fees. We only earn when you
                                    sell. No listing fees, no monthly fees, no
                                    hidden costs.
                                  </p>
                                  <div className="bg-green-50/50 border border-green-100 rounded-xl p-5">
                                    <h4 className="text-theme font-bold text-sm flex items-center gap-2 mb-3">
                                      <span className="text-lg font-bold">
                                        %
                                      </span>{" "}
                                      Fee Breakdown:
                                    </h4>
                                    <ul className="text-sm space-y-2 text-gray-700 font-medium list-disc list-inside marker:text-theme">
                                      <li>Platform fee: 8% of sale price</li>
                                      <li>
                                        Payment processing: ~2.9% + $0.30 (via
                                        Stripe/PayPal)
                                      </li>
                                      <li>
                                        Escrow.com: ~3.25% (deducted from total)
                                      </li>
                                    </ul>
                                  </div>
                                  <p className="text-[11px] text-gray-500 leading-tight">
                                    Farmers net up to 92% after our 8% fee on
                                    successful sales—total retention varies by
                                    payment method (e.g., ~86-89% net).
                                  </p>
                                  {/* Table */}
                                  <div className="overflow-x-auto rounded-lg border border-gray-100">
                                    <table className="w-full text-left text-xs">
                                      <thead className="bg-gray-50 text-gray-600 uppercase font-bold">
                                        <tr>
                                          <th className="p-3 border-r border-gray-100">
                                            Sale Price
                                          </th>
                                          <th className="p-3 border-r border-gray-100">
                                            Platform Fee (8%)
                                          </th>
                                          <th className="p-3 border-r border-gray-100">
                                            Processing
                                          </th>
                                          <th className="p-3 border-r border-gray-100">
                                            Escrow
                                          </th>
                                          <th className="p-3">Farmer Nets</th>
                                        </tr>
                                      </thead>
                                      <tbody className="text-gray-700 font-medium">
                                        <tr className="border-t border-gray-100">
                                          <td className="p-3 border-r border-gray-100">
                                            $100
                                          </td>
                                          <td className="p-3 border-r border-gray-100 text-red-500">
                                            -$8
                                          </td>
                                          <td className="p-3 border-r border-gray-100 text-red-500">
                                            -$3.20
                                          </td>
                                          <td className="p-3 border-r border-gray-100 text-red-500">
                                            -$3.25
                                          </td>
                                          <td className="p-3 font-bold text-theme">
                                            ~$85.55
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              ) : (
                                /* Standard Text Answer */
                                <p className="text-gray-600 text-sm leading-relaxed">
                                  {item.a}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <p className="mt-12 text-sm text-gray-500 font-medium">
                  Still have questions?{" "}
                  <span className="text-theme cursor-pointer font-bold hover:underline" 
                  onClick={() => {
                    window.location.href = "mailto:support@digifamar.com";
                  }}>
                    Email our farmer support team
                  </span>
                </p>
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
