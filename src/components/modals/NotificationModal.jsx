import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck, // ✅ CheckCircle
  faCircleXmark, // ❌ Cancel
  faCircleInfo, // ℹ️ Info
} from "@fortawesome/free-solid-svg-icons";

const customModalStyles = {
  content: {
    maxHeight: "340px",
    maxWidth: "480px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "30px",
    zIndex: 99999,
  },
};

const NotificationModal = ({
  isOpen,
  onRequestClose,
  notificationType,
  notificationTitle,
  notificationMessage,
  gotoPage,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Notification"
      style={customModalStyles}
      shouldCloseOnOverlayClick={false}
    >
      <div className="flex flex-col w-full px-4 pt-4 z-7000">
        <div className="flex justify-center mt-4">
          {notificationType === null ? (
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="text-theme"
              style={{ width: "48px", height: "48px" }}
            />
          ) : notificationType === true ? (
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-green"
              style={{ width: "48px", height: "48px" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="text-red-500"
              style={{ width: "48px", height: "48px" }}
            />
          )}
        </div>

        <div className="flex justify-center w-full mt-4 text-center">
          {notificationTitle}
        </div>

        <div className="flex justify-center w-full my-4 text-center">
          {notificationMessage}
        </div>

        <div className="flex justify-center">
          <div
            onClick={() => {
              onRequestClose();

              if (notificationTitle == "User Registration Successful") {
gotoPage("user-verify-email");
              }
              if (notificationTitle == "Farmer Registration Successful") {
gotoPage("farmer-verify-email");
              }


              if (notificationTitle == "User Login Successful") {
gotoPage("user-dashboard");
              }
              if (notificationTitle == "Farmer Login Successful") {
gotoPage("farmer-dashboard");
              }
              if (notificationTitle == "Admin Login Successful") {
gotoPage("admin-dashboard");
              }

              if (notificationTitle == "User Email Verification Successful !!") {
                gotoPage("user-dashboard");
              }
              if (notificationTitle == "Farmer Email Verification Successful !!") {
                gotoPage("farmer-dashboard");
              }



              // window.location.reload(true);
              // window.location.href = "/";

              // // ---------------- USER ---------------- //
              // if (
              //   notificationMessage ==
              //   "Please check your mail for a verification code."
              // ) {
              //   // gotoPage("login");
              //   gotoPage("user-verify-email");
              // }

              // if (notificationMessage == "Proceed to your dashboard.") {
              //   // gotoPage("login");
              //   gotoPage("user-dashboard");
              // }

              // //
              // if (notificationMessage == "Login successful.") {
              //   gotoPage("user-dashboard");
              // }
              // if (
              //   notificationMessage == "Please verify your email to continue."
              // ) {
              //   gotoPage("user-verify-email");
              // }
              // if (
              //   notificationMessage ==
              //   "Please update your profile now, or skip for later."
              // ) {
              //   gotoPage("user-complete-profile");
              // }
              // //

              // if (notificationMessage == "Email verification successful.") {
              //   gotoPage("user-complete-profile");
              // }

              // if (
              //   notificationMessage == "All documents uploaded successfully."
              // ) {
              //   gotoPage("user-dashboard");
              // }
              // if (
              //   notificationMessage ==
              //   "Invalid or expired password reset token."
              // ) {
              //   gotoPage("login");
              // }
              // // ---------------- USER ---------------- //

              // // ---------------- ADMIN ---------------- //
              // if (notificationMessage == "Admin proceed to your dashboard.") {
              //   // gotoPage("login");
              //   gotoPage("admin-dashboard");
              // }

              // if (notificationMessage == "Event registration successful.") {
              //   // setShowRegisterForEventModal(false);
              //   gotoPage();
              //   window.location.reload();
              // }

              // if (
              //   notificationMessage ==
              //   "Payment receipt status updated successfully."
              // ) {
              //   window.location.reload();
              // }
              // // ---------------- ADMIN ---------------- //

              // // ---------------- SUPER ADMIN ---------------- //
              // if (notificationMessage == "Super-Admin Login successful.") {
              //   gotoPage("super-admin-dashboard");
              // }
              // // ---------------- SUPER ADMIN ---------------- //
            }}
            style={{ width: "128px" }}
            className="text-center font-semibold  bg-theme hover:text-white hover:bg-black rounded-lg px-4 py-2 text-white text-sm cursor-pointer mx-1"
          >
            Okay
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NotificationModal;
