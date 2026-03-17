import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import DgfHeader from "../navbar/DgfHeader.jsx";
import DgfFooter from "../navbar/DgfFooter.jsx";

import TitleLine from "../widgets/TitleLine.jsx";
import LoadingScreen from "../widgets/LoadingScreen.jsx";

import logo from "../assets/images/logo-512x512.png";

// import charter from "../assets/images/home/charter.webp";
// import president from "../assets/images/home/president.webp";

import semicircle from "../assets/images/register-login/semicircle.png";
import semicircleflip from "../assets/images/register-login/semicircle-flip.png";
// import africa from "../assets/images/register-login/africa.png";

import NotificationModal from "./modals/NotificationModal.jsx";

import background from "../assets/images/background2.png";

//
import axiosInstance from "../auth/axiosConfig.js"; // Ensure the correct relative path
import { setCookie, isAdminAuthenticated } from "../auth/authUtils.jsx"; // Ensure the correct relative path
import { jwtDecode } from "jwt-decode";
import { getCookie, deleteCookie } from "../auth/authUtils.jsx"; // Import getCookie function
//

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function LoginAdminPage({ isMobile }) {
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const gotoPage = (pageName) => {
    navigate("/" + pageName);
  };
  const navigateTo = (route) => {
    navigate(route);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSigninLoading, setIsSigninLoading] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 8;
  };

  const [errorMessage, setErrorMessage] = useState({ message: "" });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleSignin = async (e) => {
    e.preventDefault();
    setErrorMessage({ message: "" });


    //delete this when done testing
    openNotificationModal(
          true,
          "Admin Login Successful",
          "Proceed to your dashboard."
        );
        return;
//delete this when done testing



    // if (!isTermsChecked) {
    //   setErrorMessage({ message: 'Please accept A.S.K Terms & Conditions.' });
    //   return;
    // }

    if (email === "Enter your email" || email === "" || password === "") {
      setErrorMessage({
        message: "Login Failed: Please enter valid credentials",
      });
      openNotificationModal(
        false,
        "Login",
        "Login Failed: Please enter valid credentials."
      );
      // setRegistrationStatus("Failed");
      setIsSigninLoading(false);

      //alert("");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage({ message: "Please, enter a valid email." });
      openNotificationModal(false, "Login", "Please, enter a valid email.");
      return;
    }

    if (!isValidPassword(password)) {
      setErrorMessage({ message: "Password must be at least 8 characters." });
      openNotificationModal(
        false,
        "Login",
        "Password must be at least 8 characters."
      );
      return;
    }

    // alert("Admin: " + email + " " + firstname + " " + lastname);
    setIsSigninLoading(true);

    try {
      const requestData = {
        email: email.trim(),
        password: password.trim(),
      };

      // alert(JSON.stringify(requestData, null, 2));
      // alert((import.meta.env.VITE_IS_LIVE === "true"
      //     ? import.meta.env.VITE_API_SERVER_URL
      //     : import.meta.env.VITE_API_DEMO_SERVER_URL) +
      //     import.meta.env.VITE_USER_LOGIN);

      const response = await axiosInstance.post(
        (import.meta.env.VITE_IS_LIVE === "true"
          ? import.meta.env.VITE_API_SERVER_URL
          : import.meta.env.VITE_API_DEMO_SERVER_URL) +
          import.meta.env.VITE_USER_LOGIN_WITH_EMAIL,
        requestData,
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            "Content-Type": "application/json",
          },
        }
      );

      setIsSigninLoading(false);
      // alert(JSON.stringify(response.data, null, 2));
      // return;

      if (response.data.status) {
        // If registration is successful
        setErrorMessage({ message: "" });

        setEmail("");
        setPassword("");

        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        // alert(JSON.stringify(decodedToken), null, 2);

        const expirationDays =
          (decodedToken.exp - decodedToken.iat) / (24 * 60 * 60);
        // alert(expirationDays * (24 * 60 * 60)); //seconds

        setCookie("dgf-admin-token", token, expirationDays);
        setCookie(
          "dgf-admin-details",
          JSON.stringify(response.data.memberData)
        );

        // refreshMemberDetails();

        //toggleAccount();
        // alert("Login Successful: " + response.data.message);

        if (response.data.userData.email_verified !== "Yes") {
          openNotificationModal(
            true,
            "Admin Login Successful",
            "Please verify your email to continue."
          );
        } else {
          // alert(response.data.message);
          // if (response.data.memberData.document_upload_status !== "Ok") {
          //   // upload documnents
          //   openNotificationModal(
          //     true,
          //     "Login Successful",
          //     "Please update your profile now, or skip for later."
          //   );
          // } else {
          //   // login
          //   openNotificationModal(
          //     true,
          //     "Login Successful",
          //     response.data.message
          //   );
          // }
          // login
            openNotificationModal(
              true,
              "Admin Login Successful",
              response.data.message
            );
        }

        // toggleAccountForSignIn();
      } else {
        // If there are errors in the response
        const errors = response.data.errors.map((error) => error.msg);
        const errorMessage = errors.join(", ");
        setErrorMessage({ message: errorMessage });
        // alert("Registration Failed");

        openNotificationModal(false, "Login Error", "Login Failed");
      }
    } catch (error) {
      setIsSigninLoading(false);
      // //alert(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        setErrorMessage({ message: errorMessage });
        openNotificationModal(false, "Login Error", errorMessage);
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.errors
      ) {
        const { errors } = error.response.data;
        const errorMessages = errors.map((error) => error.msg);
        const errorMessage = errorMessages.join(", "); // Join all error messages
        setErrorMessage({ message: errorMessage });
        openNotificationModal(false, "Login Error", errorMessage);
      } else {
        setErrorMessage({
          message: "Login failed. Please check your credentials and try again.",
        });
        openNotificationModal(
          false,
          "Login Error",
          "Login failed. Please check your credentials and try again."
        );
      }
    }
  };

  const handleForgotPassword = async (e) => {
    if (!isValidEmail(email)) {
      // openNotificationModal(false, currentPageName + " Form Error", 'Invalid email address');
      // alert("Please, enter a valid email.");

      setErrorMessage({ message: "Please, enter a valid email." });
      openNotificationModal(false, "DGF", "Please, enter a valid email.");
      return;
    }

    e.preventDefault();
    setErrorMessage({ message: "" });





    setIsSigninLoading(true);

    // setLoginEmailAddress();
    // setLoginPassword();

    if (email === "Enter your email" || email === "") {
      setErrorMessage({
        message: "Forgot Password Failed: Please enter a valid email.",
      });
      openNotificationModal(
        false,
        "LOAA",
        "Forgot Password Failed: Please enter a valid email."
      );
      // setRegistrationStatus("Failed");
      setIsSigninLoading(false);
      return;
    }

    // alert("login user: " + loginEmailAddress + " " + loginPassword);
    try {
      const requestData = {
        email: email,
        baseName: `${window.location.origin}/`,
        userType: "user",
      };

      const response = await axiosInstance.post(
        (import.meta.env.VITE_IS_LIVE === "true"
          ? import.meta.env.VITE_API_SERVER_URL
          : import.meta.env.VITE_API_DEMO_SERVER_URL) +
          import.meta.env.VITE_FORGOT_PASSWORD,
        requestData,
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            "Content-Type": "application/json",
          },
        }
      );

      setIsSigninLoading(false);
      // alert("login: " + JSON.stringify(response.data, null, 2));
      // return;

      if (response.data.status) {
        // If login is successful
        setErrorMessage({ message: "" });

        setEmail("");
        setPassword("");

        //toggleAccount();

        // alert("Login Successful: " + response.data.message);
        openNotificationModal(true, "Forgot Password", response.data.message);
      } else {
        const errors = response.data.errors.map((error) => error.msg);
        setErrorMessage({ message: response.data.message, errors });
        openNotificationModal(false, "Forgot Password", response.data.message);
        //alert("Failed1");
      }
    } catch (error) {
      setIsSigninLoading(false);

      alert(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        setErrorMessage({ message: errorMessage });
        openNotificationModal(false, "Forgot Password", errorMessage);
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.errors
      ) {
        const { errors } = error.response.data;
        const errorMessages = errors.map((error) => error.msg);
        const errorMessage = errorMessages.join(", "); // Join all error messages
        setErrorMessage({ message: errorMessage });
        openNotificationModal(false, "Forgot Password", errorMessage);
      } else {
        setErrorMessage({
          message:
            "Forgot Password failed. Please check your email and try again.",
        });
        openNotificationModal(
          false,
          "Forgot Password",
          "Please check your email and try again."
        );
      }
    }
  };

  return (
    <div>
      <DgfHeader isMobile={isMobile} gotoPage={gotoPage} showMarqees={true} />

      <div className="pt-10"></div>

      <div className="w-full"
      style={{
                                  backgroundImage: `url(${background})`,
                                  backgroundAttachment: 'fixed',
                                  backgroundSize: 'contain',
                                  backgroundPosition: 'center',
                                }}
                                >
        <div className="flex flex-col h-auto px-4 sm:px-16 md:px-8 ">
          <div className="w-full px-4 ">
            <div className="text-sm">
              {/* <div className="absolute inset-0 ">
        <img
          src={stars}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div> */}

              <div className="flex relative">
                {/* <img
                  src={semicircle}
                  alt="orange semicircle"
                  className="absolute bottom-0 -left-50 w-[680px] md:w-[680px] h-auto  -z-10 opacity-30"
                /> */}

                {/* <img
                  src={semicircleflip}
                  alt="orange semicircle"
                  className="hidden md:block absolute top-0 sm:left-90 sm:w-[800px] w-full md:w-[800px] h-auto  -z-10 opacity-30"
                /> */}

                <div className="w-full rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-full sm:h-screen  w-full  mt-4">
                    <div className="hidden lg:flex flex-col justify-center items-center h-screen">
                      <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden">
                        <h2 className="text-4xl text-black font-bold text-center mb-4">
                          Welcome! Log in to your Admin account
                        </h2>
                        {/* <img src={africa} className="w-full object-contain" /> */}
                      </div>
                    </div>

                    <div className=" flex flex-col justify-center sm:px-8 py-4">
                      <div className="flex md:hidden w-full justify-center sm:mt-0 mt-8 bg-white rounded-md  p-4">
                        <img className="w-48  object-cover" src={logo} alt="" />
                      </div>
                      <form
                        className="bg-white max-w-[520px] w-full  mx-auto  p-8 rounded-lg  mb-8 flex flex-col justify-center shadow-lg"
                        onSubmit={handleSignin}
                      >
                        <div>
                          <h2 className="text-xl text-black font-bold ">
                            <span className="text-theme">DiGiFaMar </span>Admin Login
                          </h2>
                          {/* <p className='text-l text-pcGrayText my-2'>Start your 30-day free trial</p> */}
                          <div className="flex flex-col py-2 mt-4">
                            <label className="text-black">
                              {"Email Address" + " "}
                              <span className="text-red-500 font-bold">*</span>
                            </label>
                            <input
                              className=" bg-white border-1 border-gray-500 mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-theme"
                              style={{ borderRadius: "8px" }}
                              type="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value.trim())}
                            />
                          </div>
                          <div className="flex flex-col py-2">
                            <label className="text-black">
                              {"Password" + " "}
                              <span className="text-red-500 font-bold">*</span>
                            </label>
                            <div className="relative">
                              <input
                                className="w-full bg-white border-1 border-gray-500 mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-theme"
                                style={{ borderRadius: "8px" }}
                                type={passwordVisible ? "text" : "password"}
                                value={password}
                                onChange={(e) =>
                                  setPassword(e.target.value.trim())
                                }
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-2 mt-2 mr-2">
                                <div
                                  tabIndex="-1"
                                  onClick={() =>
                                    setPasswordVisible(!passwordVisible)
                                  }
                                >
                                  {passwordVisible ? (
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className="text-theme p-0"
                                    />
                                  ) : (
                                    <FontAwesomeIcon
                                      icon={faEyeSlash}
                                      className="p-0"
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end text-black py-2">
                            <p
                              className="mr-1  cursor-pointer hover:text-theme"
                              onClick={(e) => {
                                if (!isSigninLoading) handleForgotPassword(e);
                              }}
                            >
                              Forgot Password?
                            </p>
                          </div>
                          {/* <div className="flex justify-between text-black py-2">                            
                            <p className="flex items-center text-xs">
                              <input className="mr-2" type="checkbox" />I Agree
                              to Terms of Service and Privacy Policy and to our
                              Admin Agreement and acknowledge reading our Admin
                              Privacy Notice.
                            </p>
                            <p>Forgot Password</p>
                          </div> */}
                          <button
                            className="w-full mt-5 py-2 bg-theme  text-white font-semibold  cursor-pointer 
                            hover:text-white hover:bg-black
                            "
                            type="submit"
                            style={{ borderRadius: "8px" }}
                            disabled={isSigninLoading}
                          >
                            {isSigninLoading ? <LoadingScreen /> : "Sign In"}
                          </button>
                          {/* <div className="flex justify-center text-red-400 py-2 text-center text-xs h-1 mb-4">
                            <p>{errorMessage.message}</p>
                          </div> */}

                          {/* <div className="flex justify-center text-black py-2">
                            <p className="mr-1">Don't have an Admin account?</p>
                            <p
                              className="cursor-pointer text-theme font-semibold"
                              onClick={() => {
                                navigate("/create-user-with-email");
                              }}
                            >
                              {" "}
                              Create Admin
                            </p>
                          </div> */}

                          {/* <p className="text-l text-black my-2 text-center">
                            Or sign up with
                          </p>

                          <button
                            className="w-full  py-2 bg-white border-2 border-gray-500 my-1"
                            type="button"
                            style={{ borderRadius: "4px" }}
                            disabled={isSignupLoading || isSigninLoading}
                            // onClick={handleSignup}
                          >
                            {isSignupLoading ? (
                              <LoadingScreen />
                            ) : (
                              "Sign up with Google"
                            )}
                          </button>
                          <button
                            className="w-full  py-2 bg-white border-2 border-gray-500 my-1"
                            type="button"
                            style={{ borderRadius: "4px" }}
                            disabled={isSignupLoading || isSigninLoading}
                            // onClick={handleSignup}
                          >
                            {isSignupLoading ? (
                              <LoadingScreen />
                            ) : (
                              "Sign up with Apple"
                            )}
                          </button> */}
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
