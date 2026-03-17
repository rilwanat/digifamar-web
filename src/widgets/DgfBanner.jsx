import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import logo from "../assets/images/logo-512x512.png";

export default function DgfBanner({
  images = [
    // logo
  ],
  text = [
    "Text1 ...",
    "Text2 ...",
    "Text3 ...",
    "Text4 ...",
  ],
  links = [
    "/about-us", // corresponding page for first text
    "/donations", // second text
    "/donations", // third text
    "/donations", // fourth text
  ],
  interval = 5000, // 3 seconds per message
}) {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);

  // Rotate text messages
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % text.length);
    }, interval);
    return () => clearInterval(timer);
  }, [text.length, interval]);

  const handleClick = () => {
    const url = links[index];
    if (url) {
      navigate(url); // for React Router
      // OR for plain JS: window.location.href = url;
    }
  };

  return (
    <div className="mt-0 md:mt-0 z-[1000] w-full bg-gradient-to-r from-theme-400 via-green-500 to-green-500  py-2 overflow-hidden shadow-lg relative">
      {/* Slow shimmering diagonal stripes */}
      <div
        className="absolute inset-0 
        bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] 
        bg-[length:20px_20px] 
        animate-[pulse_6s_infinite] 
        opacity-30"
      ></div>

      <div className="relative flex items-center justify-center gap-6 px-4">
        {/* Left Images */}
        {/* <div className="flex items-center gap-4">
          {images.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              className="w-10 h-10 object-contain drop-shadow-md"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.4 }}
            />
          ))}
        </div> */}

        {/* Rotating Neon Text */}
        <motion.div
          key={index} // triggers fade animation on text change
          className="text-center text-md font-semibold text-white drop-shadow-md cursor-pointer"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: 1,
            textShadow: [
              "0 0 4px rgba(255,255,255,0.2)",
              "0 0 12px rgba(255,255,255,1)",
              "0 0 4px rgba(255,255,255,0.2)",
            ],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          // onClick={handleClick} // navigate on click
        >
          {/* {text[index]} */}
          {text[index] === "Donate • Volunteer • Engage" ? (
            <div className="flex gap-3 cursor-pointer">
              <span 
              // onClick={() => navigate("/donations")}
              >Link 1</span>
              <span className="mx-2">•</span>
              <span 
              // onClick={() => navigate("/volunteer")}
                >Link 2</span>
              <span className="mx-2">•</span>
              <span 
              // onClick={() => navigate("/engage")}
                >Link 3</span>
            </div>
          ) : (
            <span onClick={() => navigate(links[index])}>{text[index]}</span>
          )}
        </motion.div>

        {/* Right Images */}
        {/* <div className="hidden sm:flex items-center gap-4">
          {images.map((img, i) => (
            <motion.img
              key={"right-" + i}
              src={img}
              className="w-10 h-10 object-contain drop-shadow-md"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 + i * 0.4 }}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
