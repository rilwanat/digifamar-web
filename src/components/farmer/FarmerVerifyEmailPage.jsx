import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import DgfHeader from "../../navbar/DgfHeader.jsx";
import DgfFooter from "../../navbar/DgfFooter.jsx";

import TitleLine from "../../widgets/TitleLine.jsx";
// import FileUpload from "../../widgets/FileUpload.jsx";
import LoadingScreen from "../../widgets/LoadingScreen.jsx";

import logo from "../../assets/images/logo-512x512.png";


import background from "../../assets/images/background2.png";

import semicircle from "../../assets/images/register-login/semicircle.png";
import semicircleflip from "../../assets/images/register-login/semicircle-flip.png";


// import countries from "world-countries";

import NotificationModal from "../modals/NotificationModal.jsx";

//
import axiosInstance from "../../auth/axiosConfig.js"; // Ensure the correct relative path
import { setCookie, isFarmerAuthenticated } from "../../auth/authUtils.jsx"; // Ensure the correct relative path
import { jwtDecode } from "jwt-decode";
import { getCookie, deleteCookie } from "../../auth/authUtils.jsx"; // Import getCookie function
//


export default function FarmerVerifyEmailPage({
  isMobile,
  farmerDetails,
  refreshFarmerDetails,
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
//   if (farmerDetails?.email_address) {
//     refreshMemberDetails();
//   }
// }, [farmerDetails?.email_address]);

useEffect(() => {
  refreshFarmerDetails();
}, []);



  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const gotoPage = (pageName) => {
    navigate("/" + pageName);
  };
  const navigateTo = (route) => {
    navigate(route);
  };

  const [verificationCode, setVerificationCode] = useState("");

  const [isVerificationLoading, setIsVerificationLoading] = useState(false);

  const [serverResponse, setServerResponse] = useState("");



  const [errorMessage, setErrorMessage] = useState("");
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setErrorMessage({ message: "" });

    //delete this when done testing
    openNotificationModal(
          true,
          "Farmer Email Verification Successful !!",
          "Proceed to your dashboard."
        );
        return;
//delete this when done testing

           // Basic input validation
      if (!verificationCode || verificationCode.length < 6) {
        setErrorMessage({ message: 'Please enter a valid verification code. Check your email inbox/spam for the code.' });
        setIsVerificationLoading(false);
        openNotificationModal(
          null,
          "Email Verification Issue",
          "Please enter a valid verification code. Check your email inbox/spam for the code."
        );
        return;
    }

    setIsVerificationLoading(true);

    try {
      const requestData = {
        email: farmerDetails.email_address,
        verificationCode: verificationCode.trim(),
      };

      // alert(JSON.stringify(requestData, null, 2));
      // alert((import.meta.env.VITE_IS_LIVE === "true"
      //     ? import.meta.env.VITE_API_SERVER_URL
      //     : import.meta.env.VITE_API_DEMO_SERVER_URL) +
      //     import.meta.env.VITE_USER_VERIFY_EMAIL_CODE);

      const response = await axiosInstance.post(
        (import.meta.env.VITE_IS_LIVE === "true"
          ? import.meta.env.VITE_API_SERVER_URL
          : import.meta.env.VITE_API_DEMO_SERVER_URL) +
          import.meta.env.VITE_FARMER_VERIFY_EMAIL_CODE,
        requestData,
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            "Content-Type": "application/json",
          },
        }
      );

      setIsVerificationLoading(false);
      //  alert("verify: " + JSON.stringify(response.data, null, 2));
      // return;

      if (response.data.status) {
        // If login is successful
        setErrorMessage({ message: "" });

        setVerificationCode("");

        setCookie("dgf-farmer-details", JSON.stringify(response.data.farmerData));
        //  refreshMemberDetails();
        //  navigateTo('/');

        //  alert("Your kyc is pending approval. You will be notified once it is approved.");
        openNotificationModal(
          true,
          "Email Verification Successful !!",
          response.data.message
        );

        //
      } else {
        const errors = response.data.errors.map((error) => error.msg);
        setErrorMessage({ message: response.data.message, errors });
        //alert("Failed1");
      }
    } catch (error) {
      setIsVerificationLoading(false);

      //  alert(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        setErrorMessage({ message: errorMessage });

        openNotificationModal(
          false,
          "Email Verification Error",
          errorMessage
        );
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.errors
      ) {
        const { errors } = error.response.data;
        const errorMessages = errors.map((error) => error.msg);
        const errorMessage = errorMessages.join(", "); // Join all error messages
        setErrorMessage({ message: errorMessage });

        openNotificationModal(
          false,
          "Email Verification Error",
          errorMessage
        );
      } else {
        setErrorMessage({
          message:
            "Please check your data and try again.",
        });

        openNotificationModal(
          false,
          "Email Verification Error",
          "Please check your data and try again."
        );
      }
    }
  };

  return (
    <div>
      <DgfHeader isMobile={isMobile} gotoPage={gotoPage} showMarqees={true} />

      <div className="pt-10"></div>

      <div className="w-full">
        <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24 ">
          <div className="w-full px-4 ">
            <div className="text-sm">
              {/* <div className="absolute inset-0 ">
        <img
          src={stars}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div> */}

              <div className="flex relative"
                                    style={{
                                      backgroundImage: `url(${background})`,
                                      backgroundAttachment: "fixed",
                                      backgroundSize: "contain",
                                      backgroundPosition: "center",
                                    }}>
                {/* <img
                  src={semicircle}
                  alt="orange semicircle"
                  className="absolute bottom-0 -left-50 w-[680px] md:w-[680px] h-auto  -z-10 opacity-30"
                /> */}

                {/* <img
                  src={semicircleflip}
                  alt="orange semicircle"
                  className="absolute top-0 left-90 w-[800px] md:w-[800px] h-auto  -z-10 opacity-30"
                /> */}

                <div className="w-full rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-full sm:h-screen  w-full mt-4">
                    <div className="hidden md:flex flex-col justify-center items-center h-screen">
                      <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden">
                        <h2 className="text-4xl text-black font-bold text-center mt-12 mb-4">
                          Verify your{" "}
                          <span className="text-theme">DiGiFaMaR</span>{" "} Farmer
                          Membership!
                        </h2>
                        <img 
                        // src={africa} 
                        className="w-full object-contain" />
                      </div>
                    </div>

                    <div className=" flex flex-col justify-center sm:px-8 py-4">
                      {/* <div className='hidden sm:block'><img className="w-56  object-cover" src={logginImgTwo} alt="" /></div> */}
                      <form
                        className="bg-white max-w-[520px] w-full  mx-auto  p-8 px-8 rounded-lg  my-8 flex flex-col justify-center shadow-lg"
                        onSubmit={handleVerifyEmail}
                      >
                        <div>
                          <h2 className="text-xl text-black font-bold text-center">
                            Please enter the verification code we sent to your
                            email:{" "}
                            <span className="bg-softTheme px-2">
                              {farmerDetails && farmerDetails.email_address}
                            </span>
                            {/* to complete your{" "}
                            <span className="text-theme">ambassadorial</span>{" "}
                            profile */}
                          </h2>
                          <p className="text-l text-pcGrayText my-2 text-center">
                            (Check your spam as well)
                          </p>

                          <div className="mt-4"></div>
                          <div className="flex flex-col py-2 mt-4">
                            {/* <label className="text-black">Email Address: </label> */}
                            {/* <input
                              className=" bg-white border-1 border-gray-500 mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-theme"
                              style={{ borderRadius: "8px" }}
                              type="text"
                              // value={email}
                              // onChange={(e) => setEmail(e.target.value)}
                            /> */}
                          </div>
                          <div className="flex flex-col py-2 w-full items-center">
                            <label className="text-black">
                              Email Verification Code:
                            </label>
                            <input
                              className="bg-white border-1 border-gray-500 mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-theme text-2xl font-bold text-center"
                              style={{ borderRadius: "8px", width: "180px" }}
                              type="text"
                              maxLength={6}
                              placeholder="XXXXXX"
                              value={verificationCode}
                              onChange={(e) => setVerificationCode(e.target.value)}
                            />
                          </div>

                          <div className="flex flex-col md:flex-row gap-4 w-full mt-2">
                            <button
                              className="w-full md:w-auto flex-1 py-2 bg-theme text-white font-semibold cursor-pointer"
                              type="submit"
                              style={{ borderRadius: "8px" }}
                              disabled={isVerificationLoading}
                            >
                              {isVerificationLoading ? (
                                <LoadingScreen />
                              ) : (
                                "Submit"
                              )}
                            </button>
                          </div>

                          <div className="flex justify-center text-gray-400 py-2 text-center text-sm h-1">
                            <p>{serverResponse}</p>
                          </div>
                        </div>
                      </form>
                    </div>
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
