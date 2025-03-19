"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1560343090-f0409e92791a",
  "https://plus.unsplash.com/premium_photo-1664392147011-2a720f214e01",
  "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90",
  "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
  "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
  "https://plus.unsplash.com/premium_photo-1684407617236-c60dc693293a",
  "https://images.unsplash.com/photo-1559056199-641a0ac8b55e",
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571",
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
];

const MovingCarousel = () => {
  const [rotate, setRotate] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [counter, setCounter] = useState(3);
  const [translateZ, setTranslateZ] = useState(getTranslateZ());

  useEffect(() => {
    // Adjust carousel depth on window resize
    const handleResize = () => setTranslateZ(getTranslateZ());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Counter animation for 3 seconds
    let counterInterval = setInterval(() => {
      setCounter((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Preload all images
    const preloadImages = () => {
      let loadedImages = 0;
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedImages++;
          if (loadedImages === images.length) {
            setTimeout(() => setIsLoaded(true), 1000); // Show loader for extra 1 sec
          }
        };
      });
    };

    preloadImages();

    return () => clearInterval(counterInterval);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      // Start rotation only after loading is complete
      const interval = setInterval(() => {
        setRotate((prev) => prev + 46);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLoaded]);

  function getTranslateZ() {
    if (typeof window === "undefined") return "400px";
    if (window.innerWidth <= 768) return "300px";
    if (window.innerWidth <= 1024) return "400px";
    return "500px";
  }

  return (
    <div className="w-full h-screen">
      {!isLoaded ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
          {/* Counter Animation */}
          <motion.div
            className="text-6xl font-bold text-gray-800"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            {counter}
          </motion.div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mt-4"></div>
        </div>
      ) : (
        <div className="relative w-full h-screen flex items-center justify-center bg-gray-200 overflow-hidden">
          <motion.div
            className="relative w-[150px] md:w-[260px] h-[250px]"
            animate={{ rotateY: rotate }}
            transition={{ ease: "linear", duration: 4 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {images.map((src, index) => (
              <div
                key={index}
                className="absolute w-[80%] h-full"
                style={{
                  transform: `rotateY(${index * (360 / images.length)}deg) translateZ(${translateZ})`,
                }}
              >
                <img
                  src={src}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              </div>
            ))}
          </motion.div>
          <div className="absolute bottom-10 text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-800 tracking-wide">
              Just Famous
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovingCarousel;
