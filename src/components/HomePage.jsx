import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Hero from "../widgets/Hero";

import DgfHeader from "../navbar/DgfHeader.jsx";
import DgfFooter from "../navbar/DgfFooter.jsx";

import DgfBanner from "../widgets/DgfBanner.jsx";

import TitleLine from "../widgets/TitleLine.jsx";
// import FileUpload from "../widgets/FileUpload.jsx";

import Loading from "../widgets/Loading";
import MiniLoading from "../widgets/MiniLoading";

import logo from "../assets/images/logo-512x512.png";
import logoFull from "../assets/images/logo-512x512.png"; //logo-full-h768.png";

import background from "../assets/images/background2.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
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

  faShieldAlt, faPhone
} from "@fortawesome/free-solid-svg-icons";

import NotificationModal from "./modals/NotificationModal";

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

import { format } from "date-fns";

// import DOMPurify from "dompurify";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomePage({
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
  // const gotoPageWithRouteParams = (path, id) => {
  //   navigate(`/${path}/${id}`);
  // };

  // const handleEventClick = (event, e) => {
  //   {
  //     const slug = slugify(event.name);

  //     if (isAdminAuthenticated() || isSuperAdminAuthenticated()) {
  //       openNotificationModal(
  //         null,
  //         currentPageName,
  //         "You are >= Admin. Event Registration page is only available to members and web guests. Go back to your dashboard to edit an event."
  //       );
  //     } else {
  //       // alert(JSON.stringify(event, null, 2));
  //       // const encryptedData = AES.encrypt(JSON.stringify(event), 'encryptionKey').toString();
  //       // navigate(`/view-event/${event.id}`, {
  //       navigate(`/view-event/${slug}`, {
  //         state: {
  //           event, // full event object passed here
  //         },
  //       });
  //     }
  //   }
  // };

  // const handlePublicationClick = (publication, e) => {
  //   {
  //     const slug = slugify(publication.publication_name);
  //     // alert(JSON.stringify(event, null, 2));
  //     // const encryptedData = AES.encrypt(JSON.stringify(event), 'encryptionKey').toString();
  //     // navigate(`/view-publication/${publication.id}`, {
  //     navigate(`/view-publication/${slug}`, {
  //       state: {
  //         publication, // full publication object passed here
  //       },
  //     });
  //   }
  // };

  // const [newsData, setNewsData] = useState([]);
  // // useEffect(() => {
  // //   handleDataNews();
  // // }, []);
  // const handleDataNews = async () => {
  //   setIsDataLoading(true);

  //   try {
  //     // API payment to get  count
  //     const newsEndpoint =
  //       (import.meta.env.VITE_IS_LIVE === "true"
  //         ? import.meta.env.VITE_API_SERVER_URL
  //         : import.meta.env.VITE_API_DEMO_SERVER_URL) +
  //       import.meta.env.VITE_READ_ALL_NEWS;
  //     // alert(adminPaymentsEndpoint);
  //     const newsResponse = await axiosInstance.get(newsEndpoint, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     setNewsData(newsResponse.data.data); // Update state with  count

  //     // openNotificationModal(true, currentPageName, "");
  //     // alert(JSON.stringify(newsResponse.data.data), null, 2); // Update state with payments count

  //     // Once all data is fetched, set loading to false
  //     setIsDataLoading(false);
  //   } catch (error) {
  //     setIsDataLoading(false);

  //     //alert(error);
  //     // Handle errors
  //     if (error.response && error.response.data) {
  //       const errorMessage = error.response.data.message;
  //       openNotificationModal(false, currentPageName + " Error", errorMessage);
  //     } else {
  //       openNotificationModal(
  //         false,
  //         currentPageName + " Error",
  //         "An unexpected error occurred."
  //       );
  //     }
  //   }
  // };

  // const [eventsData, setEventsData] = useState([]);
  // // useEffect(() => {
  // //   handleDataEvents();
  // // }, []);
  // const handleDataEvents = async () => {
  //   setIsDataLoading(true);

  //   try {
  //     // API payment to get  count
  //     const eventsEndpoint =
  //       (import.meta.env.VITE_IS_LIVE === "true"
  //         ? import.meta.env.VITE_API_SERVER_URL
  //         : import.meta.env.VITE_API_DEMO_SERVER_URL) +
  //       import.meta.env.VITE_READ_ALL_EVENTS;
  //     // alert(adminPaymentsEndpoint);
  //     const eventsResponse = await axiosInstance.get(eventsEndpoint, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     setEventsData(eventsResponse.data.data); // Update state with  count

  //     // openNotificationModal(true, currentPageName, "");
  //     // alert(JSON.stringify(eventsResponse.data.data), null, 2); // Update state with payments count

  //     // Once all data is fetched, set loading to false
  //     setIsDataLoading(false);
  //   } catch (error) {
  //     setIsDataLoading(false);

  //     //alert(error);
  //     // Handle errors
  //     if (error.response && error.response.data) {
  //       const errorMessage = error.response.data.message;
  //       openNotificationModal(false, currentPageName + " Error", errorMessage);
  //     } else {
  //       openNotificationModal(
  //         false,
  //         currentPageName + " Error",
  //         "An unexpected error occurred."
  //       );
  //     }
  //   }
  // };

  // useEffect(() => {
  //   // handleDataNews();
  //   // handleDataEvents();
  // }, []);

  // const [language, setLanguage] = useState("english");
  // // Map language -> file path in assets
  // const files = {
  //   portuguese: "/assets/files/The Charter - portuguese.pdf",
  //   english: "/assets/files/The Charter - english.pdf",
  //   french: "/assets/files/The Charter - french.pdf",
  //   arabic: "/assets/files/The Charter - arabic.pdf",
  //   swahili: "/assets/files/The Charter - swahili.pdf",
  // };
  // const handleDownload = () => {
  //   const filePath = files[language];
  //   const link = document.createElement("a");
  //   link.href = filePath;
  //   link.download = filePath.split("/").pop(); // get file name
  //   link.click();
  // };

  return (
    <div>
      <DgfHeader isMobile={isMobile} gotoPage={gotoPage} showMarqees={true} />

      <div className="pt-20"></div>
      {/* <div className=""></div> */}

      <DgfBanner className="" />

      <Hero />

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
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex flex-col gap-12 items-center py-16"
              >
                {/* LEFT TEXT */}
                <div className="flex flex-col items-center">
                  <h2 className="text-4xl font-bold text-black mb-4 text-center">
                    Fresh Produce,{" "}
                    <span className="text-theme">Direct from Farmers</span>
                  </h2>

                  <h3 className="text-xl text-center font-semibold text-gray-700 mb-4">
                    Empowering Farmers with Modern Technology
                  </h3>

                  <p className="text-gray-600 text-lg mb-6 max-w-xl text-center">
                    Our easy-to-use mobile app puts the power of direct market
                    access in every farmer's pocket. Connect with buyers,
                    negotiate prices, and secure payments — all from your
                    smartphone.
                  </p>
                </div>

                {/* BOTTOM FEATURES */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Easy to Use */}
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-theme text-3xl mb-3"
                    />
                    <h4 className="font-semibold text-lg">Easy to Use</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Simple interface designed for farmers and buyers.
                    </p>
                  </div>

                  {/* Secure Payments */}
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-theme text-3xl mb-3"
                    />
                    <h4 className="font-semibold text-lg">Secure Payments</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Escrow protected transactions ensure safe trading.
                    </p>
                  </div>

                  {/* Real-time Updates */}
                  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-theme text-3xl mb-3"
                    />
                    <h4 className="font-semibold text-lg">Real-time Updates</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Stay informed with instant order and price updates.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Features Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-full py-20 bg-white"
              >
                <div className="max-w-7xl mx-auto px-6 text-center">
                  <h2 className="text-4xl font-bold mb-6">
                    Why <span className="text-theme">DiGiFaMaR</span>?
                  </h2>

                  <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                    A digital marketplace designed to connect farmers directly
                    with buyers while ensuring transparency and secure
                    transactions.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
                      <div className="bg-softTheme w-14 h-14 flex items-center justify-center rounded-lg mx-auto mb-4">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-theme text-2xl"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Direct Trade
                      </h3>
                      <p className="text-gray-600">
                        Buyers purchase directly from farmers without
                        unnecessary middlemen.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
                      <div className="bg-softTheme w-14 h-14 flex items-center justify-center rounded-lg mx-auto mb-4">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-theme text-2xl"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Real-Time Inventory Updates
                      </h3>
                      <p className="text-gray-600">
                        Real-time inventory updates.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
                      <div className="bg-softTheme w-14 h-14 flex items-center justify-center rounded-lg mx-auto mb-4">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-theme text-2xl"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Fair Pricing and Transparent Transactions
                      </h3>
                      <p className="text-gray-600">
                        Transparent pricing and no hidden fees.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
                      <div className="bg-softTheme w-14 h-14 flex items-center justify-center rounded-lg mx-auto mb-4">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-theme text-2xl"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Secure Payments
                      </h3>
                      <p className="text-gray-600">
                        Escrow-based payments ensure safety for both buyers and
                        farmers.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
                      <div className="bg-softTheme w-14 h-14 flex items-center justify-center rounded-lg mx-auto mb-4">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-theme text-2xl"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Nationwide Access
                      </h3>
                      <p className="text-gray-600">
                        Whether you're in California or New York, connect with
                        farmers and buyers across all 50 states.
                      </p>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
                      <div className="bg-softTheme w-14 h-14 flex items-center justify-center rounded-lg mx-auto mb-4">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-theme text-2xl"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        Join our growing network of U.S. farmers
                      </h3>
                      <p className="text-gray-600">
                        Start transforming your agricultural business today.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Process Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="w-full py-20"
              >
                {/* Title */}
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-2">How It Works</h2>
                  <p className="text-gray-600">
                    Secure Escrow System — From payment to delivery, every
                    transaction is protected
                  </p>
                </div>

                {/* Steps */}
                <div className="flex flex-wrap justify-center items-start gap-4">
                  {[
                    {
                      title: "Buyer Pays",
                      text: "Buyer completes payment for the order. Funds are securely held in escrow.",
                    },
                    {
                      title: "Buyer Receives Code",
                      text: "A unique 6-digit verification code is sent to the buyer's phone via SMS.",
                    },
                    {
                      title: "Farmer Delivers",
                      text: "Farmer packs and delivers the fresh produce to the buyer's location.",
                    },
                    {
                      title: "Buyer Confirms",
                      text: "Buyer inspects and confirms receipt of the products.",
                    },
                    {
                      title: "Release Code Sent",
                      text: "Once confirmed, a unique release code is sent to the buyer's phone.",
                    },
                    {
                      title: "Farmer Enters Code",
                      text: "Farmer enters the release code provided by the buyer to unlock funds.",
                    },
                    {
                      title: "Funds Released",
                      text: "Payment is released to the farmer's account. Transaction complete!",
                    },
                  ].map((step, index) => (
                    <div key={index} className="flex items-center">
                      {/* Card */}
                      <div className="w-[200px] h-[240px] bg-white border rounded-xl p-6 shadow-sm flex flex-col">
                        <div className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-lg font-bold mb-4">
                          {index + 1}
                        </div>

                        <h3 className="font-semibold mb-2">{step.title}</h3>

                        <p className="text-sm text-gray-600">{step.text}</p>
                      </div>

                      {/* Arrow */}
                      {index !== 6 && (
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="mx-3 text-green-500"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Delivery Info Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                  {/* 24 hour */}
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <div className="bg-orange-500 text-white p-3 rounded-lg mr-3">
                        <FontAwesomeIcon icon={faClock} />
                      </div>

                      <h3 className="font-semibold text-lg">
                        Projected 24-Hour Local Delivery
                      </h3>
                    </div>

                    <p className="text-sm text-gray-700">
                      Using geolocation, DiGiFaMaR automatically connects buyers
                      with farmers in their area. Projected 98% of local
                      perishable deliveries completed within 24 hours
                      post-launch; standard non-perishable or distant deliveries
                      within 48 hours.
                    </p>
                  </div>

                  {/* 48 hour */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-500 text-white p-3 rounded-lg mr-3">
                        <FontAwesomeIcon icon={faClock} />
                      </div>

                      <h3 className="font-semibold text-lg">
                        48-Hour Standard
                      </h3>
                    </div>

                    <p className="text-sm text-gray-700">
                      Standard non-perishable items and orders from distant
                      farms delivered within 48 hours post-launch. Track your
                      order in real-time.
                    </p>
                  </div>

                  {/* 72 hour */}
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <div className="bg-red-500 text-white p-3 rounded-lg mr-3">
                        <FontAwesomeIcon icon={faRotateLeft} />
                      </div>

                      <h3 className="font-semibold text-lg">
                        72-Hour Refund Trigger
                      </h3>
                    </div>

                    <p className="text-sm text-gray-700">
                      Refund triggers if delivery exceeds 72 hours without buyer
                      confirmation. Full refund processed within 24 hours after
                      problem assessment and verification.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="w-full bg-gray-900 text-white rounded-2xl px-6 md:px-12 py-16 flex flex-col items-center justify-center gap-6 my-20"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-center">
                  Ready to Get Started?
                </h2>
                <p className="text-gray-300 text-lg text-center">
                  Start selling or buying fresh produce today
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  {/* Start Escrow Transaction */}
                  <button className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 transition text-white font-semibold px-6 py-3 rounded-lg">
                    Start Escrow Transaction
                    <FontAwesomeIcon icon={faShieldAlt} />
                  </button>

                  {/* Contact Sales */}
                  <button className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 transition text-white font-semibold px-6 py-3 rounded-lg">
                    Contact Sales
                    <FontAwesomeIcon icon={faPhone} />
                  </button>
                </div>
              </motion.div>

              {/* Marketplace Preview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="py-20 bg-gray-100"
              >
                <div className="max-w-7xl mx-auto px-6">
                  <h2 className="text-4xl font-bold text-center mb-12">
                    Fresh Produce{" "}
                    <span className="text-theme">Marketplace</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                      >
                        <div className="h-40 bg-gray-200"></div>

                        <div className="p-4">
                          <h3 className="font-semibold">Product Name</h3>
                          <p className="text-sm text-gray-600">Farmer Name</p>

                          <div className="mt-3 text-theme font-bold">
                            ₦ Price
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              

              {/* How it works */}
              <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto text-center px-6">
                  <h2 className="text-4xl font-bold mb-12">
                    How <span className="text-theme">DiGiFaMaR</span> Works
                  </h2>

                  <div className="grid md:grid-cols-3 gap-10">
                    <div>
                      <div className="text-3xl font-bold text-theme mb-2">
                        1
                      </div>
                      <p>Farmers list their products.</p>
                    </div>

                    <div>
                      <div className="text-3xl font-bold text-theme mb-2">
                        2
                      </div>
                      <p>Buyers place secure orders.</p>
                    </div>

                    <div>
                      <div className="text-3xl font-bold text-theme mb-2">
                        3
                      </div>
                      <p>Delivery and escrow release payment.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* TMF IMPACT STATS */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="w-full mb-8 mt-6 gap-8px-6 md:px-20 lg:px-32 py-20 bg-theme text-black"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
                  DiGiFaMaR in <span className="font-extrabold">Numbers</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
                  <div>
                    <h3 className="text-4xl font-extrabold">250K+</h3>
                    <p className="text-lg mt-2">Online Supporters</p>
                  </div>
                  <div>
                    <h3 className="text-4xl font-extrabold">15K+</h3>
                    <p className="text-lg mt-2">Registered Users</p>
                  </div>
                  <div>
                    <h3 className="text-4xl font-extrabold">36</h3>
                    <p className="text-lg mt-2">Registered Farmers</p>
                  </div>
                  <div>
                    <h3 className="text-4xl font-extrabold">500+</h3>
                    <p className="text-lg mt-2">Total Products</p>
                  </div>
                </div>
              </motion.div>

              {/* TMF CTA SECTION*/}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="w-full mt-0 px-6 md:px-20 lg:px-32 pb-8"
              >
                <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 overflow-hidden">
                  {/* Soft background glow */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background:
                        "radial-gradient(circle at center, #EBEA1C 0%, transparent 70%)",
                    }}
                  ></div>

                  <div className="relative z-10 text-center">
                    <h2 className="text-4xl font-bold text-black mb-6">
                      DiGiFaMaR <span className="text-theme">Title</span>
                    </h2>

                    <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
                      At DiGiFaMaR, .
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <div
                        onClick={() => navigate("/about-us")}
                        className="cursor-pointer px-6 py-3 bg-theme text-white font-semibold rounded-lg 
                        hover:text-white hover:bg-softTheme transition duration-300 ease-in-out"
                      >
                        About Us
                      </div>

                      <div
                        onClick={() => navigate("/create-user-with-email")}
                        className="cursor-pointer px-6 py-3 border-2 border-theme text-theme font-semibold rounded-lg 
                        hover:text-white hover:bg-softTheme transition duration-300 ease-in-out"
                      >
                        Create User Account
                      </div>

                      <div
                        onClick={() => navigate("/create-farmer-with-email")}
                        className="cursor-pointer px-6 py-3 border-2 border-theme text-theme font-semibold rounded-lg 
                        hover:text-white hover:bg-softTheme transition duration-300 ease-in-out"
                      >
                        Create Farmer Account
                      </div>
                    </div>
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
