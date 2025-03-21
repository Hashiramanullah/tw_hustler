"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useAnimation, useInView } from "framer-motion";

const Banner = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const controls = useAnimation();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    // Set loaded state after a small delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleExploreClick = () => {
    if (selectedImage !== null) {
      router.push(`/explore/${selectedImage}`);
    }
  };

  // Main categories for large images
  const categories = [
    {
      text: "MEN'S STYLE",
      path: "/collections/men",
      image: "men.jpg",
      hover_text: "Men's Style and Fashion",
    },
    {
      text: "WOMEN'S STYLE",
      path: "/collections/women",
      image: "/women1.jpg",
      hover_text: "Discover Women's Fashion",
    },
    {
      text: "KID'S FASHION",
      path: "/collections/children",
      image: "/kid1.jpg",
      hover_text: "Explore Kid's Collection",
    },
  ];

  // Reduced to just 2 small categories for better presentation
  const smallCategories = [
    { 
      text: "Electronics", 
      path: "/collections/electronics", 
      img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEVsZWN0cm9uaWNzfGVufDB8fDB8fHww",
      color: "from-blue-600 to-purple-600"
    },
    { 
      text: "Accessories", 
      path: "/collections/accessories", 
      img: "/electronics.jpg",
      color: "from-amber-500 to-red-500"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12,
        duration: 0.6
      }
    }
  };

  const textVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12,
        duration: 0.8,
        delay: 0.3
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  // Floating animation for decorative elements
  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      className="w-full min-h-screen flex flex-col md:flex-row items-center bg-gradient-to-br from-slate-800 to-slate-900 p-4 lg:p-8 gap-6 overflow-hidden relative"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-20 left-10 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl"
        animate={floatAnimation}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/20 to-teal-500/20 blur-xl"
        animate={{
          y: [0, 15, 0],
          transition: {
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: 1
          }
        }}
      />

      {/* Left Section */}
      <motion.div 
        className="left w-full md:w-2/5 p-4 md:p-6 mb-8 md:mb-0 text-center md:text-left "
        variants={textVariants}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white"
          animate={{ 
            textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 10px rgba(255,255,255,0.5)", "0px 0px 0px rgba(255,255,255,0)"],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          Heading twHustlers
        </motion.h1>
        <motion.div 
          className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mt-4 mx-auto md:mx-0 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 96, transition: { delay: 0.5, duration: 1.2 } }}
        />
        <motion.p 
          className="mt-6 text-gray-200 text-sm sm:text-base leading-relaxed"
          variants={textVariants}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero obcaecati rem similique doloribus cumque architecto inventore possimus eligendi optio
          suscipit dignissimos excepturi quasi nesciunt itaque minima quod nobis animi.
        </motion.p>
        
        <motion.button
          className="mt-8 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative">Explore Collection</span>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
            initial={{ x: "100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.4 }}
          />
        </motion.button>
        
        {/* Shopping stats */}
        <motion.div 
          className="mt-10 flex flex-wrap justify-center md:justify-start gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.9 }
            }
          }}
        >
          <motion.div 
            className="flex flex-col items-center md:items-start"
            variants={fadeInUpVariants}
          >
            <span className="text-xl sm:text-2xl font-bold text-white">50k+</span>
            <span className="text-xs sm:text-sm text-gray-400">Happy Customers</span>
          </motion.div>
          <motion.div 
            className="flex flex-col items-center md:items-start"
            variants={fadeInUpVariants}
          >
            <span className="text-xl sm:text-2xl font-bold text-white">10k+</span>
            <span className="text-xs sm:text-sm text-gray-400">Premium Products</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right Section */}
      <motion.div 
        className="w-full md:w-3/5 flex flex-col gap-6 md:gap-8"
        variants={itemVariants}
      >
        {/* Small Categories - Now just 2 */}
        <motion.div 
          className="child2 w-full flex justify-center md:justify-end gap-6 p-2"
          variants={itemVariants}
        >
          {smallCategories.map(({ text, path, img, color }, index) => (
            <motion.div
              key={index}
              className="relative group h-24 sm:h-32 md:h-36 w-5/12 overflow-hidden rounded-xl shadow-lg cursor-pointer"
              onClick={() => router.push(path)}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)"
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15 + 0.3,
                type: "spring",
                stiffness: 100
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r opacity-60"
                style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                initial={{ opacity: 0.4 }}
                whileHover={{ opacity: 0.7 }}
                className={`absolute inset-0 bg-gradient-to-r ${color}  opacity-60`}
              />
              
              <motion.img
                className="h-full w-full object-cover"
                src={img} 
                alt={text}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  className="flex flex-col items-center gap-2"
                  initial={{ y: 10, opacity: 0.8 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-white text-lg font-bold">{text}</p>
                  <motion.div 
                    className="h-0.5 w-0 bg-white rounded-full"
                    whileHover={{ width: 40 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  />
                  <motion.p 
                    className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 10, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    Explore Now
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Large Categories */}
        <motion.div 
          className="flex flex-wrap md:flex-nowrap gap-4 sm:gap-6 items-center justify-center md:justify-start"
          variants={itemVariants}
        >
          {categories.map((elem, index) => (
            <motion.div
              key={index}
              className={`relative group h-48 sm:h-60 md:h-[46vh] ${
                index === 0 ? "w-full sm:w-[60%]" : "w-1/2 sm:w-[40%] md:w-[24%]"
              } overflow-hidden rounded-2xl shadow-lg cursor-pointer`}
              onClick={() => router.push(elem.path)}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)"
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15 + 0.6,
                type: "spring",
                stiffness: 60
              }}
            >
              <motion.img
                className="h-full w-full object-cover"
                src={elem.image}
                alt={elem.text}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7 }}
              />

              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end pb-6"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="flex flex-col items-center gap-3"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <motion.div
                    className="flex flex-col items-center"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-white text-xl font-bold">{elem.text}</p>
                    <motion.div 
                      className="h-0.5 w-0 bg-white mt-1.5 rounded-full"
                      whileHover={{ width: 60 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  
                  <p className="text-gray-200 text-sm px-4 text-center">{elem.hover_text}</p>
                  
                  <motion.button 
                    className="px-6 py-1.5 mt-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm border border-white/20 overflow-hidden relative group"
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.span 
                      className="relative"
                      whileHover={{ color: "#000" }}
                    >
                      Explore Now
                    </motion.span>
                    <motion.div 
                      className="absolute inset-0 bg-white"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>
              
              {index === 0 && (
                <motion.div
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <motion.p 
                    className="text-white text-xs font-semibold"
                    animate={floatAnimation}
                  >
                    NEW COLLECTION
                  </motion.p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Banner;