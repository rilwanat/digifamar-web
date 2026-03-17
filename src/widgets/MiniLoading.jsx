import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipLoader } from 'react-spinners';

// import logo from '../../assets/images/logo.png';



function Loading({  }) {

    return (
      <>
        <div className="flex  z-50">
          <ClipLoader size={24} color={"#fab641"} loading={true} /> 
        </div>
      </>    
    );
}

export default Loading;
