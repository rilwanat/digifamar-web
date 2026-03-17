import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser, // Profile
  faIdCard, // Membership
  faCalendarDays, //Events
  faShieldAlt, // Verification (from pro or substitute faShieldAlt/free)
  faKey, // Change Password
  faCreditCard, // Payment
  faRightFromBracket, // Logout
  faMessage
} from "@fortawesome/free-solid-svg-icons";

export const navData = [
  {
    id: 1,
    icon: <FontAwesomeIcon icon={faUser} className="w-4 h-4" />,
    text: "Dashboard",
    link: "user-dashboard", //"my-profile",
  },
  {
    id: 2,
    icon: <FontAwesomeIcon icon={faUser} className="w-4 h-4" />,
    text: "My Profile",
    link: "user-profile", //"my-profile",
  },
  {
    id: 3,
    icon: <FontAwesomeIcon icon={faMessage} className="w-4 h-4" />,
    text: "Messages",
    link: "user-messages", //"my-profile",
  },
  // {
  //   id: 3,
  //   icon: <FontAwesomeIcon icon={faCalendarDays} className="w-4 h-4" />,
  //   text: "Events",
  //   link: "events",
  // },
  // {
  //   id: 4,
  //   icon: <FontAwesomeIcon icon={faShieldAlt} className="w-4 h-4" />,
  //   text: "Verification Status",
  //   link: "user-verification-status",
  // },
  // {
  //   id: 5,
  //   icon: <FontAwesomeIcon icon={faKey} className="w-4 h-4" />,
  //   text: "Change Password",
  //   link: "user-change-password",
  // },
  // {
  //   id: 6,
  //   icon: <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />,
  //   text: "Logout",
  //   link: "user-logout",
  // },
];
