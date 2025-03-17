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

  useEffect(() => {
    const interval = setInterval(() => {
      setRotate((prev) => prev + 46);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getTranslateZ = () => {
    if (window.innerWidth <= 768) return "300px";
    if (window.innerWidth <= 1024) return "400px";
    return "500px";
  };

  const [translateZ, setTranslateZ] = useState(getTranslateZ());

  useEffect(() => {
    const handleResize = () => {
      setTranslateZ(getTranslateZ());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
    style={{
        backgroundColor: '#D2D2D2',
        backgroundImage: `
          repeating-linear-gradient(
            to right, transparent 0 100px,
            #25283b22 100px 101px
          ),
          repeating-linear-gradient(
            to bottom, transparent 0 100px,
            #25283b22 100px 101px
          )
        `
      }} className="w-full h-screen flex items-center justify-center bg-gray-200 overflow-hidden relative">
      <motion.div
        className="relative w-[150px] md:w-[260px] h-[250px]"
        animate={{ rotateY: rotate }}
        transition={{ ease: "linear", duration: 4}}
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
      <div className="absolute inset-0 flex items-end justify-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-800 tracking-wide text-center">
          Famous Products
        </h1>
      </div>
    </div>
  );
};

export default MovingCarousel;
