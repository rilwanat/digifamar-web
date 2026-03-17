import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function DgfButtonDropdown() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOptionClick = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Main Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        // onMouseEnter={() => setOpen(true)}
        // onMouseLeave={() => setOpen(false)}
        style={{ width: "176px", userSelect: "none" }}
        // className="text-center shadow-lg bg-softTheme rounded-lg px-4 py-2 text-white text-sm cursor-pointer mx-1  hover:text-white hover:bg-black"
        className="text-center px-4 py-2 text-theme font-bold text-sm cursor-pointer mx-1  "
      >
        Create Account
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15, delay: 0.1 }}
            className="absolute mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg right-0 z-50"
          >
            {/* <div
              onClick={() => handleOptionClick("/membership-requirements")}
              className="px-4 py-2 text-sm text-gray-800 hover:bg-black hover:text-white cursor-pointer rounded-t-lg"
            >
              Registration Fee
            </div> */}
            <div 
              onClick={() => handleOptionClick("/create-user-with-email")}
              className="px-4 py-2 text-sm text-gray-800 hover:bg-theme hover:text-white cursor-pointer rounded-t-lg"
            >
              User Account
            </div>
            <div 
              onClick={() => handleOptionClick("/create-farmer-with-email")}
              className="px-4 py-2 text-sm text-gray-800 hover:bg-theme hover:text-white cursor-pointer rounded-b-lg"
            >
              Farmer Account
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DgfButtonDropdown;
