"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import HeartFavorite from "./HeartFavorite";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
  index?: number;
}

const ProductCard = ({ product, updateSignedInUser, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const controls = useAnimation();
  
  const originalPrice = product.originalPrice || (product.price * 1.2).toFixed(2);
  const hasDiscount = product.originalPrice !== undefined || product.discountPercentage;
  const discountPercentage = product.discountPercentage || Math.floor((1 - (product.price / parseFloat(originalPrice))) * 100);
  const isNew = product.isNew || Math.random() > 0.7; // Randomly mark some products as new for demo

  const colorVariants = [
    "from-purple-600 to-blue-500",
    "from-yellow-400 to-orange-500",
    "from-green-400 to-emerald-500",
    "from-pink-500 to-rose-500",
    "from-indigo-600 to-violet-500"
  ];
  
  const colorVariant = colorVariants[index % colorVariants.length];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Image carousel effect on hover
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isHovered && product.media && product.media.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === product.media!.length - 1 ? 0 : prev + 1
        );
      }, 1800);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, product.media]);

  // Cart animation
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.6, 
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1]
          }
        }
      }}
      className="w-full max-w-xs relative perspective-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
    >
      <div className="relative overflow-hidden rounded-xl shadow-lg bg-white transform-gpu transition-all duration-700 group-hover:shadow-xl">
        {/* Card background gradient accent */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${colorVariant} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.08 : 0 }}
        />
        
        {/* Discount badge with enhanced animation */}
        <AnimatePresence>
          {hasDiscount && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`absolute top-3 right-3 z-20 bg-gradient-to-r ${colorVariant} text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg`}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block"
              >
                {discountPercentage}% OFF
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* New product badge */}
        <AnimatePresence>
          {isNew && !hasDiscount && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`absolute top-3 left-3 z-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg`}
            >
              <motion.span
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                NEW
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Product Image with 3D rotation effect */}
        <Link href={`/products/${product._id}`}>
          <motion.div 
            className="relative w-full h-72 overflow-hidden bg-gray-100"
            animate={{
              rotateY: isHovered ? '5deg' : '0deg',
              rotateX: isHovered ? '-5deg' : '0deg',
              transition: { duration: 0.6 }
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full"
              >
                <Image
                  src={product.media?.[currentImageIndex] || "/placeholder.jpg"}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transform-gpu transition-transform duration-500 group-hover:scale-105"
                  priority={currentImageIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Fancy image pagination */}
            {product.media && product.media.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {product.media.map((_, index) => (
                  <motion.button 
                    key={index} 
                    className="h-2 rounded-full bg-white bg-opacity-70 shadow-sm focus:outline-none"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImageIndex(index);
                    }}
                    animate={{
                      width: index === currentImageIndex ? 16 : 8,
                      opacity: index === currentImageIndex ? 1 : 0.6,
                      backgroundColor: index === currentImageIndex ? "#ffffff" : "rgba(255, 255, 255, 0.7)"
                    }}
                    whileHover={{
                      scale: 1.2,
                      opacity: 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            )}
            
            {/* Hover overlay with morphing effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
              initial={{ opacity: 0, height: "30%" }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                height: isHovered ? "100%" : "30%"
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full p-4 flex justify-center gap-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300 ${isQuickViewOpen ? 'bg-blue-50 text-blue-600' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsQuickViewOpen(true);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="2"></circle>
                    <path d="M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7z"></path>
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300 ${isAddedToCart ? 'bg-green-50 text-green-600' : ''}`}
                  onClick={handleAddToCart}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <HeartFavorite product={product} updateSignedInUser={updateSignedInUser} />
                </motion.div>
              </div>
            </motion.div>
            
            {/* Add to cart animation */}
            <AnimatePresence>
              {isAddedToCart && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="bg-white text-green-600 p-3 rounded-full shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </Link>
        
        {/* Product Info with hover effect */}
        <motion.div 
          className="p-4"
          animate={{
            y: isHovered ? -5 : 0,
            transition: { duration: 0.4 }
          }}
        >
          <Link href={`/products/${product._id}`}>
            <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 truncate">
              {product.title}
            </h3>
          </Link>
          
          <div className="flex items-center mt-1">
            <p className="text-sm text-gray-500">{product.category}</p>
            
            {/* Animated stock indicator */}
            {product.stock !== undefined && (
              <motion.span 
                className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                  product.stock > 5 ? "bg-green-100 text-green-800" : 
                  product.stock > 0 ? "bg-orange-100 text-orange-800" : 
                  "bg-red-100 text-red-800"
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {product.stock > 5 ? "In Stock" : 
                 product.stock > 0 ? `Only ${product.stock} left` : 
                 "Out of Stock"}
              </motion.span>
            )}
          </div>
          
          {/* Animated pricing */}
          <div className="flex items-center mt-2">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span className={`text-xl font-bold ${hasDiscount ? 'text-red-600' : 'text-gray-900'}`}>
                ${product.price}
              </span>
              {hasDiscount && (
                <motion.span 
                  className="ml-2 text-sm text-gray-500 line-through"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  ${originalPrice}
                </motion.span>
              )}
            </motion.div>
            
            {/* Dynamic rating */}
            {product.rating && (
              <motion.div 
                className="flex items-center ml-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.svg 
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 + (star * 0.05) }}
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">
                  ({product.reviews || 0})
                </span>
              </motion.div>
            )}
          </div>
          
          {/* Buy now button with reveal effect */}
          <motion.div
            className="mt-4 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isHovered ? 40 : 0,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <button 
              className={`w-full py-2 rounded-lg font-medium text-white bg-gradient-to-r ${colorVariant} hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1`}
              onClick={handleAddToCart}
            >
              Buy Now
            </button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Premium quick view modal */}
      <AnimatePresence>
        {isQuickViewOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsQuickViewOpen(false)}
          >
            <motion.div 
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 relative h-80 md:h-auto overflow-hidden bg-gray-100">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={product.media?.[currentImageIndex] || "/placeholder.jpg"}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Image thumbnail navigation */}
                  {product.media && product.media.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
                      {product.media.map((img, idx) => (
                        <motion.button
                          key={idx}
                          className={`relative h-16 w-16 rounded-md overflow-hidden border-2 ${currentImageIndex === idx ? 'border-blue-500' : 'border-transparent'}`}
                          whileHover={{ scale: 1.05 }}
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentImageIndex(idx);
                          }}
                        >
                          <Image
                            src={img}
                            alt={`${product.title} - view ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="p-8 w-full md:w-1/2 relative">
                  <button 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
                    onClick={() => setIsQuickViewOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-sm font-medium px-2 py-1 rounded bg-gray-100 text-gray-600">
                      {product.category}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-800 mt-3">{product.title}</h2>
                    
                    {product.rating && (
                      <div className="flex items-center mt-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg 
                              key={star}
                              className={`w-5 h-5 ${star <= Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">
                          ({product.reviews || 0} reviews)
                        </span>
                      </div>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    className="mt-4 border-t border-gray-100 pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {product.description || "Experience ultimate comfort and style with this premium product. Crafted with quality materials to enhance your everyday life."}
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="mt-6 flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                    {hasDiscount && (
                      <div className="ml-4 flex flex-col">
                        <span className="text-gray-500 line-through">${originalPrice}</span>
                        <span className="text-green-600 text-sm font-medium">Save ${(parseFloat(originalPrice) - product.price).toFixed(2)}</span>
                      </div>
                    )}
                  </motion.div>
                  
                  {/* Features or specs */}
                  <motion.div 
                    className="mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="font-medium text-gray-900">Highlights</h3>
                    <ul className="mt-2 space-y-2">
                      {product.features ? product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          {feature}
                        </li>
                      )) : [
                        "Premium quality materials",
                        "Designed for comfort and style",
                        "Durable construction",
                        "Easy maintenance"
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  <motion.div 
                    className="mt-8 flex flex-wrap gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <button 
                      className={`flex-1 py-3 px-8 rounded-xl font-medium text-white bg-gradient-to-r ${colorVariant} hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
                    <Link 
                      href={`/products/${product._id}`}
                      className="py-3 px-8 rounded-xl border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                    >
                      View Details
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductCard;