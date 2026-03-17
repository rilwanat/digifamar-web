import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


import hero1 from '../assets/images/hero/hero1.jpg';
import hero2 from '../assets/images/hero/hero2.jpg';

const Hero = ({  }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  //
  const images = [
    hero1,
    // hero2,
  ];

  const headerText = [
    '',
    // 'Welcome to DiGiFaMaR',
];
  const subText = [
    '...',
    // '...',
];

  //


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const imageVariants = {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1.1 },
    exit: { opacity: 0, scale: 1 },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const navigateTo = (route) => {
    navigate(route);
  }

  return (
    // <div className="relative w-full h-[740px] overflow-hidden">
      // <div className="relative w-full h-screen -mt-[0px] overflow-hidden">
      <div className="relative w-full h-[740px] -mt-[0px] overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={images[currentImageIndex]}
          src={images[currentImageIndex]}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover bg-gray-500
          "
          variants={imageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 3.5 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black opacity-20 flex flex-col justify-center items-center p-4">
        {/* <h2 className="text-3xl font-bold mb-2 z-1000">{title}</h2>
        <p className="text-lg z-1000">{subtitle}</p> */}
      </div>


      <div className="mt-0 absolute inset-0 flex flex-col justify-center  text-white px-8 md:px-4 lg:px-16 xl:px-24 2xl:px-80 ">
        

        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4  md:w-1/1  text-white drop-shadow-md" 
          // style={{ color: '#ffffff' }}
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.8 }}
        >
          {headerText[currentImageIndex]}
        </motion.h1>

        <motion.p
          className="text-md md:text-xl mb-4 drop-shadow-md"
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subText[currentImageIndex]}
        </motion.p>

        {/* <div className='flex'>
            <div 
              onClick={() => {  }}
              style={{  width: '200px', fontWeight: '600',  }}
              className='text-center mt-2 border-white rounded-sm py-3  text-sm cursor-pointer mr-2 bg-white hover:bg-black hover:text-darkGray text-darkTheme'>
              View Products
            </div>
            <div 
              onClick={() => {  }}
              style={{  width: '200px', fontWeight: '600', }}
              className='text-center mt-2 border-white rounded-sm py-3  text-sm cursor-pointer bg-theme hover:bg-black hover:text-darkGray text-darkTheme'>
              About Us
            </div>
        </div> */}
        
      </div>
    </div>
  );
};

export default Hero;