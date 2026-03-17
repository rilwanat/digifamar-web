import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,            // Admin Profile
  faUpload,          // Uploads
  faNewspaper,       // News
  faUsers,           // Membership
  faBell,            // Reminders
  faCalendarDays,    // Events
  faHeadset,         // Support
  faRightFromBracket // Logout
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
    icon: <FontAwesomeIcon icon={faUpload} className="w-4 h-4" />,
    text: "Uploads",
    link: "admin-uploads",
  },
  {
    id: 3,
    icon: <FontAwesomeIcon icon={faNewspaper} className="w-4 h-4" />,
    text: "News",
    link: "admin-news",
  },
  {
    id: 4,
    icon: <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />,
    text: "Membership",
    link: "admin-membership",
  },
  {
    id: 5,
    icon: <FontAwesomeIcon icon={faBell} className="w-4 h-4" />,
    text: "Reminders",
    link: "admin-reminders",
  },
  {
    id: 6,
    icon: <FontAwesomeIcon icon={faCalendarDays} className="w-4 h-4" />,
    text: "Events",
    link: "admin-events",
  },
  {
    id: 7,
    icon: <FontAwesomeIcon icon={faHeadset} className="w-4 h-4" />,
    text: "Support",
    link: "admin-support",
  },
  
];
