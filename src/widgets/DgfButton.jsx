import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import { ClipLoader } from 'react-spinners';

// import logo from '../assets/images/logo-512x512.png';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DgfButton({ icon, iconData, text, onClick, buttonWidth = "120px" }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => onClick && onClick()}
        style={{ width: buttonWidth }}
        className={`flex justify-center text-center shadow-lg 
        ${
text == "Sign In" ? 'bg-theme text-white' :  
text == "Send" ? 'bg-yellow-500 text-black' : ''
        
        }    
        
        rounded-lg px-4 py-2  text-sm cursor-pointer mx-1  font-semibold
                  hover:text-white hover:bg-softTheme transition duration-300 ease-in-out`}
      >
        {icon && (
          <FontAwesomeIcon icon={iconData} className="mt-0.75 mr-1 w-4 h-4" />
        )}
        <p className="ml-1">{text}</p>
      </div>
    </>
  );
}

export default DgfButton;
