import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import DgfHeader from "../../navbar/DgfHeader.jsx";
import DgfFooter from "../../navbar/DgfFooter.jsx";
import DgfBanner from "../../widgets/DgfBanner.jsx";

import UserSideNavbar from "../../navbar/user/UserSideNavbar.jsx";

import TitleLine from "../../widgets/TitleLine.jsx";
// import FileUpload from "../../widgets/FileUpload.jsx";
import Loading from "../../widgets/Loading.jsx";
import LoadingScreen from "../../widgets/LoadingScreen.jsx";
// import PaymentReceiptUpload from "../../widgets/PaymentReceiptUpload.jsx";

import logo from "../../assets/images/logo-512x512.png";

// import charter from "../../assets/images/home/charter.webp";
// import president from "../../assets/images/home/president.webp";

import background from "../../assets/images/background2.png";

import semicircle from "../../assets/images/register-login/semicircle.png";
import semicircleflip from "../../assets/images/register-login/semicircle-flip.png";
// import africa from "../../assets/images/register-login/africa.png";

// import countries from "world-countries";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faSearch,
  faRotateRight,
  faMessage,
  faBell,
  faComments,
  faSync,
  faIdCard,
  faShield,
  faCircleExclamation,
  faEnvelope,
  faCalendar,
  faUsersLine,
  faChartLine,
  faVoteYea,
} from "@fortawesome/free-solid-svg-icons";

import NotificationModal from "../modals/NotificationModal.jsx";
import MainDashboardMenu from "../../widgets/MainDashboardMenu.jsx";

//
import axiosInstance from "../../auth/axiosConfig.js"; // Ensure the correct relative path
import { setCookie, isUserAuthenticated } from "../../auth/authUtils.jsx"; // Ensure the correct relative path
import { jwtDecode } from "jwt-decode";
import { getCookie, deleteCookie } from "../../auth/authUtils.jsx"; // Import getCookie function
//

export default function UserDashboardPage({
  isMobile,
  userDetails,
  refreshUserDetails,
}) {
  const navigate = useNavigate();

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

  // useEffect(() => {
  //   if (liveUserData?.email_address) {
  //     refreshUserDetails();
  //   }
  // }, [liveUserData?.email_address]);

  const [isDataLoading, setIsDataLoading] = useState(true);
  useEffect(() => {
    refreshUserDetails();
  }, []);

  useEffect(() => {
    // alert(userDetails?.id);
    if (userDetails?.id) {
      getLiveUserDetails();
      // getMessages();
    }
  }, [userDetails?.id]);

  const [liveUserData, setLiveUserData] = useState({});
  const getLiveUserDetails = async () => {
    setIsDataLoading(true);

    try {
      // const requestData = {
      //   id: id,
      // };
      // alert(JSON.stringify(requestData, null, 2));

      // API payment to get  count
      const userEndpoint =
        (import.meta.env.VITE_IS_LIVE === "true"
          ? import.meta.env.VITE_API_SERVER_URL
          : import.meta.env.VITE_API_DEMO_SERVER_URL) +
        import.meta.env.VITE_READ_USER_BY_ID +
        "?id=" +
        userDetails.id;
      // alert(userEndpoint);
      const userResponse = await axiosInstance.get(
        userEndpoint,
        // requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLiveUserData(userResponse.data.data); // Update state with  count

      // openNotificationModal(true, currentPageName, "");
      // alert(JSON.stringify(userResponse.data.data), null, 2); // Update state with payments count

      // Once all data is fetched, set loading to false
      setIsDataLoading(false);
    } catch (error) {
      setIsDataLoading(false);

      // alert(error);
      // return;
      // Handle errors
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        openNotificationModal(false, currentPageName + " Error", errorMessage);
      } else {
        openNotificationModal(
          false,
          currentPageName + " Error",
          "An unexpected error occurred."
        );
      }
    }
  };

  const [messagesData, setMessagesData] = useState({});
  const getMessages = async () => {
    setIsDataLoading(true);

    try {
      const requestData = {
        user_id: userDetails.id,
        // zone_id: 3,
        // state_id: 5,
        // delivery_type: "broadcast",
      };
      // alert(JSON.stringify(requestData, null, 2));

      // API messagest
      const messagesEndpoint =
        (import.meta.env.VITE_IS_LIVE === "true"
          ? import.meta.env.VITE_API_SERVER_URL
          : import.meta.env.VITE_API_DEMO_SERVER_URL) +
        import.meta.env.VITE_GET_MESSAGES;
      const messagesResponse = await axiosInstance.post(
        messagesEndpoint,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessagesData(messagesResponse.data); // Update state with  count

      // openNotificationModal(true, currentPageName, "");
      // alert(JSON.stringify(setMessagesData.data.data), null, 2); // Update state with message
      // alert(JSON.stringify(messagesResponse.data), null, 2); // Update state with message
      alert(JSON.stringify(messagesResponse.data.count), null, 2); // Update state with message

      // Once all data is fetched, set loading to false
      setIsDataLoading(false);
    } catch (error) {
      setIsDataLoading(false);

      // alert(error);
      // return;
      // Handle errors
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        openNotificationModal(null, currentPageName + "", errorMessage);
      } else {
        openNotificationModal(
          false,
          currentPageName + " Error",
          "An unexpected error occurred."
        );
      }
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const gotoPage = (pageName) => {
    navigate("/" + pageName);
  };
  const navigateTo = (route) => {
    navigate(route);
  };

  //Update features
  // Editable user data
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",

    gender: "",
    phone_number: "",
    address: "",
    date_of_birth: "",
    profile_image: "",

    // zone_id: "",
    // state_id: "",
    // lga_id: "",
    // ward_id: "",

    // status: "",
    // political_party: "",
    // occupation: "",
    // education_level: "",
    // membership_type: "",
  });

  useEffect(() => {
    if (liveUserData) {
      setFormData({
        first_name: liveUserData.firstname || "",
        middle_name: liveUserData.middlename || "",
        last_name: liveUserData.lastname || "",

        gender: liveUserData.gender || "",
        phone_number: liveUserData.phone_number || "",
        address: liveUserData.address || "",
        date_of_birth: liveUserData.date_of_birth || "",
        profile_image: liveUserData.profile_image || "",

        // zone_id: liveUserData.zone_id || "",
        // state_id: liveUserData.state_id || "",
        // lga_id: liveUserData.lga_id || "",
        // ward_id: liveUserData.ward_id || "",

        // status: liveUserData.status || "",
        // political_party: liveUserData.political_party || "",
        // occupation: liveUserData.occupation || "",
        // education_level: liveUserData.education_level || "",
        // membership_type: liveUserData.membership_type || "",
      });
    }
  }, [liveUserData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Update features
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const currentPageName = "Dashboard";

  return (
    <div>
      <DgfHeader isMobile={isMobile} gotoPage={gotoPage} showMarqees={true} />

      <div className="pt-20"></div>
      <DgfBanner className="" />

      <div className="flex">
        {isMobile ? (
          <div></div>
        ) : (
          <UserSideNavbar currentPageName={currentPageName} />
        )}

        <div
          // className="w-full rounded-lg "
          className="w-full"
          style={{
            backgroundImage: `url(${background})`,
            backgroundAttachment: "fixed",
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
          // style={{ borderRadius: '8px' }}
        >
          <div className="invisible bg-white p-4 rounded-lg pt-0 sm:pt-0 -mt-12">
            <div className="flex flex-row w-full justify-between mx-4 items-center">
              <div
                className="cursor-pointer hover:text-theme hover:bg-black bg-theme rounded-md px-2 py-2"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
              </div>

              <div className="invisible relative flex items-center mr-4 rounded-lg">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-8 h-4 w-4 object-scale-down text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-14 border border-gray-300 rounded-lg py-1 px-2 mx-4 focus:outline-none focus:border-1 focus:border-theme"
                  // onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>

          {/* <div className="flex justify-between">
            <div className="inline-flex items-center my-2 py-1 px-3 ml-4 bg-theme rounded-md text-white">
              <div className="font-semibold">Member Dashboard</div>
            </div>

            <MainDashboardMenu getMessages={getMessages}/>
          </div> */}

          {/* Upload Payment Receipt */}
          {/* {liveUserData &&
            liveUserData.payment_receipt_status !== "Ok" &&
            // liveUserData.payment_receipt == "" && 
            (
              <PaymentReceiptUpload
                liveUserData={liveUserData}
                refreshUserDetails={refreshUserDetails}
              />
            )} */}

          <div className="flex w-full p-4">
            <div className="w-full">
              <div className="flex w-full md:flex-row flex-col z-20">
                <div
                  className="flex flex-col flex-grow  border-0   rounded-lg   pb-4 mt-0 mb-12 px-4 "
                  style={{ flexBasis: "50%" }}
                >
                  <div className="flex mt-4 ">
                    <div className="relative w-full rounded-lg">
                      <div className="absolute w-full bg-theme rounded-tl-lg rounded-tr-lg "></div>

                      <div className="flex flex-col md:flex-row justify-between items-center mb-0   px-2">
                        <motion.div
                          initial={{ y: -50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="w-full"
                        >
                          <p
                            style={{ fontWeight: "700", fontSize: "24px" }}
                            className="text-black"
                          >
                            User Dashboard
                          </p>
                          <TitleLine />
                          <p className="text-lg text-black my-4">
                            View your general dashboard statistics.
                          </p>
                          {/* <div className="flex gap-5 mb-2">
                            <div className="flex flex-col">
                              <p className="text-gray-600 text-sm">
                                Zone:{" "}
                                <span className="font-bold">
                                  {liveUserData?.zone_name}
                                </span>
                              </p>
                            </div>
                            <p className="text-gray-600 text-sm">
                              State:{" "}
                              <span className="font-bold">
                                {liveUserData?.state_name}
                              </span>
                            </p>
                            <p className="text-gray-600 text-sm">
                              LGA:{" "}
                              <span className="font-bold">
                                {liveUserData?.lga_name}
                              </span>
                            </p>
                            <p className="text-gray-600 text-sm">
                              Ward:{" "}
                              <span className="font-bold">
                                {liveUserData?.ward_name}
                              </span>
                            </p>
                          </div> */}
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="flex  items-center mt-2 ">
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {/* DGF ID */}
                        <div className="flex items-center bg-white shadow-md p-4 rounded-xl">
                          <div className="p-3 bg-theme/20 rounded-lg">
                            <FontAwesomeIcon
                              icon={faIdCard}
                              className="text-theme text-xl"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600 text-sm">DGF User ID:</p>
                            <p className="text-xl font-bold">
                              {liveUserData?.tmf_id}
                            </p>
                          </div>
                        </div>

                        {/* Verification Status */}
                        <div className="flex items-center bg-white shadow-md p-4 rounded-xl">
                          <div
                            className={`p-3 rounded-lg ${
                              liveUserData?.status === "Verified"
                                ? "bg-green-500/20"
                                : "bg-yellow-500/20"
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={
                                liveUserData?.status === "Verified"
                                  ? faShield
                                  : faCircleExclamation
                              }
                              className={`text-xl ${
                                liveUserData?.status === "Verified"
                                  ? "text-green-600"
                                  : "text-yellow-600"
                              }`}
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600 text-sm">
                              Verification Status:
                            </p>
                            <p className="text-xl font-bold">
                              {liveUserData?.status}
                            </p>
                          </div>
                        </div>

                        {/* Messages */}
                        <div
                          className="flex items-center bg-white shadow-md p-4 rounded-xl cursor-pointer"
                          onClick={() => {
                            gotoPage("user-messages");
                          }}
                        >
                          <div className="p-3 bg-blue-500/20 rounded-lg">
                            <FontAwesomeIcon
                              icon={faEnvelope}
                              className="text-blue-600 text-xl"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600 text-sm">
                              Inbox Messages:
                            </p>
                            {/* <p className="text-xl font-bold">{messages?.count_inbox ?? 0}</p> */}
                          </div>
                        </div>

                        {/* Referrals */}
                        <div className="flex items-center bg-white shadow-md p-4 rounded-xl">
                          <div className="p-3 bg-orange-500/20 rounded-lg">
                            <FontAwesomeIcon
                              icon={faUsersLine}
                              className="text-orange-600 text-xl"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600 text-sm">
                              Your Referrals:
                            </p>
                            <p className="text-xl font-bold">
                              {liveUserData?.referrals ?? 0}
                            </p>
                          </div>
                        </div>

                        {/* Profile Completion */}
                        <div
                          className="flex items-center bg-white shadow-md p-4 rounded-xl cursor-pointer"
                          onClick={() => {
                            gotoPage("user-profile");
                          }}
                        >
                          <div className="p-3 bg-gray-700/20 rounded-lg">
                            <FontAwesomeIcon
                              icon={faChartLine}
                              className="text-gray-700 text-xl"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-600 text-sm">
                              Profile Completion:
                            </p>
                            {/* <p className="text-xl font-bold">{liveUserData?.profile_percent ?? "82%"}</p> */}
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
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
