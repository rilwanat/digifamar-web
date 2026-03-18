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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faChevronLeft,
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
  faEnvelope,
  faPaperPlane,
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

export default function ContactPage({
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

      {/* <Hero /> */}

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
              {/* First Section */}
              

              {/* --- Contact Header & Quick Contact --- */}
              <div className="w-full bg-theme text-white py-20 rounded-b-[40px] text-center px-6">
                <span className="bg-white/20 text-white text-xs font-bold px-4 py-1 rounded-full uppercase mb-4 inline-block">
                  Get In Touch
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Contact <span className="text-softTheme">DiGiFaMaR™</span>
                </h2>
                <p className="text-white/80 max-w-2xl mx-auto">
                  Have questions? We're here to help! Reach out to our support
                  team and we'll get back to you within 24 hours.
                </p>
              </div>

              {/* Email & WhatsApp Cards */}
              <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto -mt-12 px-6">
                <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center">
                  <div className="bg-green-100 p-4 rounded-xl mb-4">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-theme text-2xl"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Email Us</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Speak directly with our support team Monday to Friday.
                  </p>
                  <a
                    href="mailto:support@digifamar.com"
                    className="text-theme font-bold text-sm hover:underline"
                  >
                    support@digifamar.com
                  </a>
                </div>

                <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center">
                  <div className="bg-green-100 p-4 rounded-xl mb-4">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="text-theme text-2xl"
                    />
                  </div>
                  <h3 className="font-bold text-lg mb-2">WhatsApp Chat</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Get instant support via WhatsApp chat - fastest response
                    time!
                  </p>
                  <button className="text-theme font-bold text-sm cursor-pointer hover:underline">
                    Start WhatsApp Chat
                  </button>
                </div>
              </div>

              {/* --- Contact Form Section --- */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto py-24 px-6 items-center">
                {/* Left: Form */}
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                  <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                    • Send Message
                  </span>
                  <h3 className="text-3xl font-bold mb-8">Drop Us a Line</h3>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-theme"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="youremail@example.com"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-theme"
                      />
                    </div>
                    <button className="w-full bg-theme text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-green-700 transition cursor-pointer">
                      <FontAwesomeIcon icon={faPaperPlane} /> Send Message
                    </button>
                  </form>
                </div>

                {/* Right: Info Cards */}
                <div className="space-y-6">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl h-64">
                    <img
                      src={man}
                      alt="Support"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-orange-400 text-white p-3 rounded-xl text-center">
                      <p className="text-xs font-bold leading-tight">
                        24/7
                        <br />
                        Available
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4">
                    <div className="bg-theme w-10 h-10 rounded-full flex items-center justify-center text-white">
                      <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400">
                        Office Location
                      </p>
                      <p className="font-bold">United States 🇺🇸</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4">
                    <div className="bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center text-white">
                      <FontAwesomeIcon icon={faClock} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400">
                        Working Hours
                      </p>
                      <p className="font-bold">
                        Monday - Friday, 9:00 AM - 6:00 PM EST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Contact Form Section --- */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto py-24 px-6 items-center">
                {/* Left: Form */}
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                  <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2 block">
                    • Send Message
                  </span>
                  <h3 className="text-3xl font-bold mb-8">Drop Us a Line</h3>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-theme"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="youremail@example.com"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-theme"
                      />
                    </div>
                    <button className="w-full bg-theme text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-green-700 transition cursor-pointer">
                      <FontAwesomeIcon icon={faPaperPlane} /> Send Message
                    </button>
                  </form>
                </div>

                {/* Right: Info Cards */}
                <div className="space-y-6">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl h-64">
                    <img
                      src={man}
                      alt="Support"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-orange-400 text-white p-3 rounded-xl text-center">
                      <p className="text-xs font-bold leading-tight">
                        24/7
                        <br />
                        Available
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4">
                    <div className="bg-theme w-10 h-10 rounded-full flex items-center justify-center text-white">
                      <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400">
                        Office Location
                      </p>
                      <p className="font-bold">United States 🇺🇸</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex items-center gap-4">
                    <div className="bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center text-white">
                      <FontAwesomeIcon icon={faClock} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400">
                        Working Hours
                      </p>
                      <p className="font-bold">
                        Monday - Friday, 9:00 AM - 6:00 PM EST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- FAQ Section --- */}
              <div className="bg-gray-50/50 py-24 px-6 rounded-t-[40px]">
                <div className="max-w-4xl mx-auto text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4 text-gray-900">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-gray-500">
                    Quick answers to common questions. Can't find what you're
                    looking for? Contact us directly!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {[
                    {
                      q: "What are your support hours?",
                      a: "Our support team is available Monday to Friday, 9:00 AM - 6:00 PM EST. WhatsApp support is available 24/7.",
                    },
                    {
                      q: "How fast do you respond?",
                      a: "We typically respond to all inquiries within 24 hours. WhatsApp messages usually get responses within 2-4 hours.",
                    },
                    {
                      q: "Can I schedule a call?",
                      a: "Yes! Contact us via email or WhatsApp to schedule a call with our team at a time that works for you.",
                    },
                    {
                      q: "Do you have physical offices?",
                      a: "We're headquartered in the United States. For in-person meetings, please contact us in advance to schedule an appointment.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                    >
                      <h4 className="font-bold mb-3 flex items-center gap-3">
                        <span
                          className={`w-3 h-3 rounded-full ${i % 2 === 0 ? "bg-theme" : "bg-orange-400"}`}
                        ></span>
                        {item.q}
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bottom Help CTA */}
                <div className="max-w-4xl mx-auto mt-20 bg-theme text-white p-12 rounded-[40px] text-center">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FontAwesomeIcon icon={faPhone} className="text-2xl" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">
                    Need Immediate Help?
                  </h3>
                  <p className="text-white/80 mb-8">
                    For urgent matters, reach out via WhatsApp for the fastest
                    response from our support team.
                  </p>
                  <button className="bg-white text-theme font-bold px-8 py-4 rounded-xl flex items-center gap-3 mx-auto hover:bg-gray-100 transition cursor-pointer">
                    <FontAwesomeIcon icon={faPhone} /> Chat on WhatsApp
                  </button>
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
