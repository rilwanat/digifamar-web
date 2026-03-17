import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser, // Admin Profile
  faUpload, // Uploads
  faNewspaper, // News
  faUsers, // Membership
  faBell, // Reminders
  faKey, // Change Password
  faCalendarDays, // Events
  faHeadset, // Support
  faRightFromBracket, // Logout
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

export const navData = [
  {
    id: 1,
    icon: <FontAwesomeIcon icon={faUser} className="w-4 h-4" />,
    text: "Admin Dashboard",
    link: "admin-dashboard",
  },
  {
    id: 2,
    icon: <FontAwesomeIcon icon={faUser} className="w-4 h-4" />,
    text: "My Profile",
    link: "admin-profile", //"my-profile",
  },
  {
      id: 3,
      icon: <FontAwesomeIcon icon={faMessage} className="w-4 h-4" />,
      text: "Messages",
      link: "admin-messages", //"my-profile",
    },
  // {
  //   id: 2,
  //   icon: <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />,
  //   text: "Memberships",
  //   link: "admin-membership",
  // },
  // {
  //   id: 3,
  //   icon: <FontAwesomeIcon icon={faCalendarDays} className="w-4 h-4" />,
  //   text: "Manage Events",
  //   link: "admin-events",
  // },
  // {
  //   id: 4,
  //   icon: <FontAwesomeIcon icon={faNewspaper} className="w-4 h-4" />,
  //   text: "Manage News",
  //   link: "admin-news",
  // },
  // {
  //   id: 5,
  //   icon: <FontAwesomeIcon icon={faBell} className="w-4 h-4" />,
  //   text: "Reminders",
  //   link: "admin-reminders",
  // },
  // {
  //   id: 6,
  //   icon: <FontAwesomeIcon icon={faKey} className="w-4 h-4" />,
  //   text: "Change Password",
  //   link: "admin-change-password",
  // },
  // {
  //   id: 6,
  //   icon: <FontAwesomeIcon icon={faHeadset} className="w-4 h-4" />,
  //   text: "Support",
  //   link: "admin-support",
  // },
  // {
  //   id: 7,
  //   icon: <FontAwesomeIcon icon={faUpload} className="w-4 h-4" />,
  //   text: "Uploads",
  //   link: "admin-uploads",
  // },
  // {
  //   id: 8,
  //   icon: <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />,
  //   text: "Logout",
  //   link: "admin-logout",
  // },
];
