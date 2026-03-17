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
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { faEye, faBullseye } from "@fortawesome/free-solid-svg-icons";

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
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-6"
              >
                <div className=" xs:p-8 py-8 rounded-lg">
                  <div className="flex flex-col items-start mb-4">
                    <h2 className="text-4xl font-semibold text-black mb-4">
                      Welcome to{" "}
                      <span className="text-theme font-bold">DiGiFaMaR!</span>
                    </h2>
                    <p className="text-lg text-black mb-4 ">DiGiFaMaR is .</p>

                    <div
                      onClick={() => {
                        navigate("/about-us");
                      }}
                      style={{
                        width: "176px",
                        borderWidth: "1px",
                        userSelect: "none",
                      }}
                      className="text-center  border-theme bg-theme rounded-lg px-4 py-2 text-white text-sm  mx-1 
                      cursor-pointer
                      hover:text-white hover:bg-black
                      "
                    >
                      Learn More
                    </div>
                  </div>
                </div>

                {/* <div className="relative w-full flex items-center justify-center">
                  <div className="flex w-full items-center justify-center">
                    <img
                      src={logo}
                      className="w-[300px] border-2 border-theme rounded-lg shadow-md"
                      style={{
                        // width: "100%",
                        // height: "100%",
                        objectFit: "cover",
                        // userSelect: "none",
                        // pointerEvents: "none",
                      }}
                    />
                    <div className="flex flex-col items-start">
                      <div
                        className=" px-4 py-0 text-theme rounded-lg   font-bold"
                        // style={{ color: "#EBEA1C" }}
                      >
                        NAME NAME
                      </div>
                      <div className="mt-1 ml-4" style={{ fontWeight: "600" }}>
                        DiGiFaMaR, President
                      </div>
                    </div>
                  </div>
                </div> */}
              </motion.div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="grid grid-cols-1  gap-8 mb-8 mt-6"
              >
                <div className=" xs:p-8 py-8 rounded-lg">
                  <h2 className="text-2xl font-semibold text-black mb-4 text-center">
                    <span className="text-theme font-bold">DiGiFaMaR</span> is
                    proudly supported by:
                  </h2>

                  <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
                    <div className="relative w-full sm:w-1/4 flex sm:flex-col-reverse items-center justify-center">
                      <div className="flex flex-col items-start my-4">
                        <div
                          className=" px-4 py-0 text-theme rounded-lg   font-bold"
                          // style={{ color: "#EBEA1C" }}
                        >
                          Name Name
                        </div>
                        <div
                          className="mt-1 ml-4"
                          style={{ fontWeight: "600" }}
                        >
                          Position
                        </div>
                      </div>
                      <img
                        src={logo}
                        className="w-[250px] sm:w-[300px]  border-1 border-theme rounded-lg shadow-md"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div className="relative w-full sm:w-1/4 flex sm:flex-col-reverse items-center justify-center">
                      <div className="flex flex-col items-start my-4">
                        <div
                          className=" px-4 py-0 text-theme rounded-lg   font-bold"
                          // style={{ color: "#EBEA1C" }}
                        >
                          Name Name
                        </div>
                        <div
                          className="mt-1 ml-4"
                          style={{ fontWeight: "600" }}
                        >
                          Position
                        </div>
                      </div>
                      <img
                        src={logo}
                        className="w-[250px] sm:w-[300px]  border-1 border-theme rounded-lg shadow-md"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div className="relative w-full sm:w-1/4 flex sm:flex-col-reverse items-center justify-center">
                      <div className="flex flex-col items-start my-4">
                        <div
                          className=" px-4 py-0 text-theme rounded-lg   font-bold"
                          // style={{ color: "#EBEA1C" }}
                        >
                          Name Name
                        </div>
                        <div
                          className="mt-1 ml-4"
                          style={{ fontWeight: "600" }}
                        >
                          Position
                        </div>
                      </div>
                      <img
                        src={logo}
                        className="w-[250px] sm:w-[300px]  border-1 border-theme rounded-lg shadow-md"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div className="relative w-full sm:w-1/4 flex sm:flex-col-reverse items-center justify-center">
                      <div className="flex flex-col items-start my-4">
                        <div
                          className=" px-4 py-0 text-theme rounded-lg   font-bold"
                          // style={{ color: "#EBEA1C" }}
                        >
                          Name Name
                        </div>
                        <div
                          className="mt-1 ml-4"
                          style={{ fontWeight: "600" }}
                        >
                          Position
                        </div>
                      </div>
                      <img
                        src={logo}
                        className="w-[250px] sm:w-[300px]  border-1 border-theme rounded-lg shadow-md"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

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
                      DiGiFaMaR{" "}
                      <span className="text-theme">Title</span>
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
                        onClick={() =>
                          navigate("/create-farmer-with-email")
                        }
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
