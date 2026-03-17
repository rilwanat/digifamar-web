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

// import countries from "world-countries";

import background from "../assets/images/background2.png";

import NotificationModal from "./modals/NotificationModal.jsx";

//
import axiosInstance from "../auth/axiosConfig.js"; // Ensure the correct relative path
import { setCookie, isUserAuthenticated } from "../auth/authUtils.jsx"; // Ensure the correct relative path
import { jwtDecode } from "jwt-decode";
import { getCookie, deleteCookie } from "../auth/authUtils.jsx"; // Import getCookie function
//

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function CreateUserWithEmailPage({ isMobile }) {
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

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [selected, setSelected] = useState("");

  const currentPageName = "Register User";
  const [isDataLoading, setIsDataLoading] = useState(false);

  const [agreeToTerms, setAgreeToTerms] = useState(false);

  

  //   const countryOptions =
  //  countries
  //     .filter((c) => c.region === "Africa")
  //     .map((c) => ({
  //       name: c.name.common,
  //       code: c.cca2,
  //     }))
  //     .sort((a, b) => a.name.localeCompare(b.name));

  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const [serverResponse, setServerResponse] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 4;
  };

  const passwordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage({ message: "" });

//delete this when done testing
    openNotificationModal(
          true,
          "User Registration Successful",
          "Proceed to your dashboard."
        );
        return;
//delete this when done testing


    // if (!isTermsChecked) {
    //   setErrorMessage({ message: 'Please accept A.S.K Terms & Conditions.' });
    //   return;
    // }

    if (firstname === "" || lastname === "") {
      setErrorMessage({
        message:
          "Please enter your Firstname and Lastname.",
      });
      openNotificationModal(
        null,
        "Registration Issue",
        "Please enter your Firstname and Lastname."
      );
      // setRegistrationStatus("Failed");
      setIsSignupLoading(false);

      //alert("");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage({ message: "Please, enter a valid email." });
      openNotificationModal(
        null,
        "Registration Issue",
        "Please, enter a valid email."
      );
      return;
    }

    if (      
      password === "" ||
      confirmPassword === ""
    ) {
      setErrorMessage({
        message: "Please enter valid passwords.",
      });
      openNotificationModal(
        null,
        "Registration Issue",
        "Please enter valid passwords."
      );
      // setRegistrationStatus("Failed");
      setIsSignupLoading(false);

      //alert("");
      return;
    }

    

    if (!isValidPassword(password)) {
      setErrorMessage({ message: "Password must be at least 4 characters." });
      openNotificationModal(
        null,
        "Registration Issue",
        "Password must be at least 4 characters."
      );
      return;
    }

    if (!passwordsMatch(password, confirmPassword)) {
      setErrorMessage({ message: "Passwords must match." });
      openNotificationModal(
        null,
        "Registration Issue",
        "Passwords must match."
      );
      return;
    }


    if (!agreeToTerms) {
      setErrorMessage({ message: "Please agree to DiGiFaMar registration terms." });
      openNotificationModal(
        null,
        "Registration Issue",
        "Please agree to DiGiFaMar registration terms."
      );
      return;
    }

    // alert("User: " + email + " " + firstname + " " + lastname);
    setIsSignupLoading(true);

    try {
      const requestData = {
        first_name: firstname.trim(),
        last_name: lastname.trim(),
        phone_number: phoneNumber.trim(),
        password: password.trim(),
        confirm_password: confirmPassword.trim(),

      };

      // alert(JSON.stringify(requestData, null, 2));
      // alert((import.meta.env.VITE_IS_LIVE === "true"
      //     ? import.meta.env.VITE_API_SERVER_URL
      //     : import.meta.env.VITE_API_DEMO_SERVER_URL) +
      //     import.meta.env.VITE_USER_REGISTER);

      const response = await axiosInstance.post(
        (import.meta.env.VITE_IS_LIVE === "true"
          ? import.meta.env.VITE_API_SERVER_URL
          : import.meta.env.VITE_API_DEMO_SERVER_URL) +
          import.meta.env.VITE_USER_REGISTER_WITH_EMAIL,
        requestData,
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            "Content-Type": "application/json",
          },
        }
      );

      setIsSignupLoading(false);
      // alert(JSON.stringify(response.data, null, 2));
      // return;

      if (response.data.status) {
        // If registration is successful
        setErrorMessage({ message: "" });

        setFirstname("");
        setLastname("");
        setPhoneNumber("");
        setPassword("");
        setConfirmPassword("");



        const token = response.data.token;
        const decodedToken = jwtDecode(token);
        // alert(JSON.stringify(decodedToken), null, 2);

        const expirationDays =
          (decodedToken.exp - decodedToken.iat) / (24 * 60 * 60);
        // alert(expirationDays * (24 * 60 * 60)); //seconds

        setCookie("dgf-user-token", token, expirationDays);
        setCookie(
          "dgf-user-details",
          JSON.stringify(response.data.memberData)
        );

        // openNotificationModal(
        //   true,
        //   "Registration Successful",
        //   response.data.message
        // );

        // openNotificationModal(
        //   true,
        //   "Registration Successful !!",
        //   response.data.message
        // );

        openNotificationModal(
          true,
          "User Registration Successful",
          "Proceed to your dashboard."
        );

        // toggleAccountForSignIn();
      } else {
        // If there are errors in the response
        const errors = response.data.errors.map((error) => error.msg);
        const errorMessage = errors.join(", ");
        setErrorMessage({ message: errorMessage });
        // alert("Registration Failed");

        openNotificationModal(
          false,
          "Registration Error",
          "Registration Failed"
        );
      }
    } catch (error) {
      setIsSignupLoading(false);
      // alert(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        setErrorMessage({ message: errorMessage });
        openNotificationModal(false, "Registration Error", errorMessage);
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.errors
      ) {
        const { errors } = error.response.data;
        const errorMessages = errors.map((error) => error.msg);
        const errorMessage = errorMessages.join(", "); // Join all error messages
        setErrorMessage({ message: errorMessage });
        openNotificationModal(false, "Registration Error", errorMessage);
      } else {
        setErrorMessage({
          message:
            "Registration failed. Please check your credentials and try again.",
        });
        openNotificationModal(
          false,
          "Registration Error",
          "Registration failed. Please check your credentials and try again."
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
            {/* <div className="text-sm bg-amber-900"> */}
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
                />

                <img
                  src={semicircleflip}
                  alt="orange semicircle"
                  className="hidden md:block absolute top-0 sm:left-90 sm:w-[800px] w-full md:w-[800px] h-auto  -z-10 opacity-30"
                /> */}

                <div className="w-full rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2    w-full mt-4">
                    <div className="hidden lg:flex flex-col justify-center items-center h-screen">
                      <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden">
                        <h2 className="text-4xl text-black font-bold text-center mt-12 mb-4">
                          Join{" "}
                          <span className="text-theme">
                            DiGiFaMar
                          </span>{" "} as a User
                        </h2>
                        <img src={logo} className="w-full object-contain" />
                      </div>
                    </div>

                    <div className=" flex flex-col justify-center sm:px-8 py-4">
                      <div className="flex lg:hidden w-full justify-center  mt-8  rounded-md  p-4">
                        <img className="w-48  object-cover" src={logo} alt="" />
                      </div>
                      <form
                        className="bg-white max-w-[520px] w-full  mx-auto  p-8 px-8 rounded-lg  my-8 flex flex-col justify-center shadow-lg"
                        onSubmit={handleSignup}
                      >
                        <div className="w-full">
                          <h2 className="text-xl text-black font-bold">
                            Fill in your details below to complete your{" "}
                            <span className="text-theme">DiGiFaMar</span> User Profile:
                          </h2>
                          {/* <p className='text-l text-pcGrayText my-2'>Start your 30-day free trial</p> */}
                          <div className="flex flex-col mt-4 py-2">
                            <label className="text-black">
                              {"First name" + " "}
                              <span className="text-red-500 font-bold">*</span>
                            </label>
                            <input
                              className=" bg-white border-1 border-gray-500 mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-theme"
                              style={{ borderRadius: "8px" }}
                              type="text"
                              value={firstname}
                              onChange={(e) =>
                                setFirstname(e.target.value.trim())
                              }
                            />
                          </div>
                          <div className="flex flex-col py-2">
                            <label className="text-black">
                              {"Last name" + " "}
                              <span className="text-red-500 font-bold">*</span>
                            </label>
                            <input
                              className=" bg-white border-1 border-gray-500 mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-theme"
                              style={{ borderRadius: "8px" }}
                              type="text"
                              value={lastname}
                              onChange={(e) =>
                                setLastname(e.target.value.trim())
                              }
                            />
                          </div>
                          <div className="flex flex-col py-2">
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
                            {
                            // password && 
                            (
                              <p className="text-xs mt-1">
                                <span
                                  className={
                                    password.length >= 4
                                      ? "text-green-600"
                                      : "text-red-500"
                                  }
                                >
                                  • At least 4 characters
                                </span>
                                {/* <br />
                                <span
                                  className={
                                    /[A-Z]/.test(password)
                                      ? "text-green-600"
                                      : "text-red-500"
                                  }
                                >
                                  • One uppercase letter
                                </span>
                                <br />
                                <span
                                  className={
                                    /[a-z]/.test(password)
                                      ? "text-green-600"
                                      : "text-red-500"
                                  }
                                >
                                  • One lowercase letter
                                </span>
                                <br />
                                <span
                                  className={
                                    /\d/.test(password)
                                      ? "text-green-600"
                                      : "text-red-500"
                                  }
                                >
                                  • One number
                                </span> */}
                              </p>
                            )}
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
                            <div className="flex flex-col py-2">
                              <label className="text-black">
                                {"Confirm Password" + " "}
                                <span className="text-red-500 font-bold">
                                  *
                                </span>
                              </label>
                              <div className="relative">
                                <input
                                  className="w-full bg-white border-1 border-gray-500 mt-2 p-2 focus:outline-none focus:ring-2 focus:ring-theme"
                                  style={{ borderRadius: "8px" }}
                                  type={passwordVisible ? "text" : "password"}
                                  value={confirmPassword}
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value.trim())
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


                          </div>

                          <div className="flex justify-between text-black py-2">
                            <p className="flex items-start text-xs leading-snug">
                              <input
                                className="mr-2 mt-[2px]"
                                type="checkbox"
                                checked={agreeToTerms}
                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                              />
                              <span>
                                I agree to the{" "}
                                <span
                                  onClick={() => navigate("/terms-of-service")}
                                  className="text-theme cursor-pointer hover:underline"
                                >
                                  Terms of Service
                                </span>{" "}
                                and{" "}
                                <span
                                  onClick={() => navigate("/privacy-policy")}
                                  className="text-theme cursor-pointer hover:underline"
                                >
                                  Privacy Policy
                                </span>
                                , and I acknowledge reading them.
                              </span>
                            </p>
                          </div>

                          <button
                            className="w-full my-5 py-2 bg-theme  text-white font-semibold  cursor-pointer"
                            type="submit"
                            style={{ borderRadius: "8px" }}
                            disabled={isSignupLoading}
                          >
                            {isSignupLoading ? <LoadingScreen /> : "Sign Up"}
                          </button>

                          <div className="flex justify-center text-black py-2">
                            <p className="mr-1">Already a member?</p>
                            <p
                              className="cursor-pointer text-theme font-semibold"
                              onClick={() => {
                                navigate("/user-login");
                              }}
                            >
                              {" "}
                              Sign in
                            </p>
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
