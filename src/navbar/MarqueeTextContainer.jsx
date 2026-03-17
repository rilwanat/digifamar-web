import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const MarqueeTextContainer = ({ isMobile }) => {
  const sampleTexts = [
    
    "National Grassroots Media Summit",
    "Coming December 16th, 2025",
    "National Grassroots Media Summit",
    "Coming December 16th, 2025",
    "National Grassroots Media Summit",
    "Coming December 16th, 2025",
    "National Grassroots Media Summit",
    "Coming December 16th, 2025",
    "National Grassroots Media Summit",
    "Coming December 16th, 2025",
  ];

  //   // State to control animation trigger
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    setStartAnimation(true);
  }, []);

  const styles = useSpring({
    from: { transform: "translateX(20%)" },
    to: { transform: "translateX(-100%)" },
    loop: true,
    config: { duration: isMobile ? 100000 : 100000 }, // Adjust speed here
    // reset: true,
    reverse: false,
    immediate: !startAnimation,
  });

  //bg-gradient-to-r from-black to-theme

  return (
    <div
      className="
     
    bg-black
    py-1.5 text-sm flex justify-center text-white"
      style={{ overflow: "hidden", width: "100%", whiteSpace: "nowrap" }}
    >
      <animated.div style={{ ...styles, whiteSpace: "nowrap" }}>
        {sampleTexts.join(" • • • • • ")}
        {/* {sampleTexts[0]} */}
      </animated.div>
    </div>
  );
};

export default MarqueeTextContainer;
