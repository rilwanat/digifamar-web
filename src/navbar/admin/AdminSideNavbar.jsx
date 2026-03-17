import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
// import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { navData } from "./AdminNavData";
import styles from "./AdminSideNavbar.module.css";

import logo from "../../assets/images/logo-512x512.png";

const AdminSideNavbar = ({ currentPageName }) => {
  const [open, setOpen] = useState(true);

  const MenuNavData = navData.filter((item) => item.id >= 1 && item.id <= 11); //9);
  // const filteredNavData = navData.filter(item => item.id === 10 || item.id === 11);

  const toggleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // Add any side effects or subscriptions here
  }, []);

  return (
    <div className={open ? styles.sidenav : styles.sidenavClosed}>
      {/* <div className='flex'>
        <img className="ml-3 w-32 h-16 object-scale-down " src={logo} alt=""  />
      </div> */}
      <div className=" mt-0  pt-0" style={{}}>
        <div className="">
          {MenuNavData.map((item) => {
            if (item.text === "Memberships") return null;

            return (
              <NavLink
                key={item.id}
                className={`${
                  currentPageName === item.text
                    ? "bg-theme  text-white"
                    : "text-black font-semibold"
                } ${
                  styles.sideitem
                } rounded-lg hover:bg-gray-300 hover:text-white`}
                to={`/${item.link}`}
              >
                {item.icon}
                {open ? (
                  <span className={styles.adminSideitem}>{item.text}</span>
                ) : (
                  <div></div>
                )}
              </NavLink>
            );
          })}
        </div>
        {/* <div className="fixed bottom-0  text-center bg-white">
          
          <div className="bottom-0 w-full  text-center bg-theme pl-4">
            <p
              className="text-xs text-white py-2"
              style={{ paddingLeft: "24px" }}
            >
              &copy; LOAM 2025
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AdminSideNavbar;
