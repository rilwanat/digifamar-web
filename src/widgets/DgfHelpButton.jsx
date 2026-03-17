import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

// import MembershipRequirementsPage from "../components/MembershipRequirementsPage.jsx";

export default function DgfHelpButton({
  isMobile,
  userDetails,
  refreshUserDetails,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block"
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
      // onClick={() => setIsHovered(!isHovered)}
    >
      {/* Help Icon */}
      <FontAwesomeIcon
        icon={faCircleQuestion}
        size="xl"
        className="text-black cursor-pointer mr-2"
        title="Click here for more information about membership fees"
        onClick={() => setIsHovered(!isHovered)}
      />

      {/* Fullscreen Hover View */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="membership-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto shadow-2xl border border-gray-200 mt-[100px]"
          >
            <div className="relative">
              {/* Optional close hint */}
              <div
                className="absolute top-4 right-6 text-red-500 text-sm italic cursor-pointer"
                onClick={() => setIsHovered(!isHovered)}
              >
                (Click here to close)
              </div>

              {/* <MembershipRequirementsPage
                isMobile={isMobile}
                memberDetails={memberDetails}
                refreshMemberDetails={refreshMemberDetails}
              /> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
