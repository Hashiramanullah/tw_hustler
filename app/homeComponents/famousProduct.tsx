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
  const [isHovered, setIsHovered] = useState(false);
  const [translateZ, setTranslateZ] = useState(getTranslateZ());

  useEffect(() => {
    const handleResize = () => setTranslateZ(getTranslateZ());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const preloadImages = () => {
      let loadedImages = 0;
      images.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedImages++;
          if (loadedImages === images.length) {
            setTimeout(() => setIsLoaded(true), 1000);
          }
        };
      });
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (isLoaded && !isHovered) {
      const interval = setInterval(() => {
        setRotate((prev) => prev + 46);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLoaded, isHovered]);

  function getTranslateZ() {
    if (typeof window === "undefined") return "400px";
    if (window.innerWidth <= 768) return "300px";
    if (window.innerWidth <= 1024) return "400px";
    return "500px";
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-200 overflow-hidden">
      {isLoaded && (
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
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.img
              loading="lazy"
                src={src}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover rounded-xl shadow-lg"
                animate={{ filter: isHovered ? "invert(1)" : "invert(0)" }}
                transition={{ duration: 0.5 }}
              />
              {isHovered && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.span
                    className="text-white text-2xl font-bold"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    Shop Now
                  </motion.span>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MovingCarousel;
