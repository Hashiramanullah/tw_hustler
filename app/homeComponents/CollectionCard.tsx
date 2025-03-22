// CollectionsClient.jsx (Client Component)
"use client"; // Important: Mark as client component

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const CollectionsClient = ({ collections }) => {
  return (
    <div className="container mx-auto max-w-7xl">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-10 py-12 px-4 md:px-6 lg:px-8"
      >
        <motion.h1 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Our Collections
        </motion.h1>
        
        {!collections || collections.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-4 p-8 rounded-lg bg-gray-50 dark:bg-gray-800"
          >
            <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">No collections found</p>
            <p className="text-gray-400 dark:text-gray-500">Check back later for new additions</p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {collections.map((collection, index) => (
              <CollectionCard 
                key={collection._id} 
                collection={collection} 
                index={index} 
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// Separate component for each collection card with its own animations
const CollectionCard = ({ collection, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      className="relative overflow-hidden rounded-xl shadow-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/collections/${collection._id}`} className="block h-full">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={collection.image}
            alt={collection.title || "Collection image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={index < 6} // prioritize loading for visible cards
          />
          
          {/* Overlay that appears on hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: isHovered ? 0.7 : 0.3 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Collection title */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <motion.h2 
              className="text-lg md:text-xl font-bold text-white"
              initial={{ y: 10, opacity: 0.8 }}
              animate={{ 
                y: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0.8
              }}
              transition={{ duration: 0.3 }}
            >
              {collection.title || "Untitled Collection"}
            </motion.h2>
            
            {/* Collection description or additional info (if available) */}
            {collection.description && (
              <motion.p 
                className="text-sm text-gray-200 mt-1 line-clamp-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  height: isHovered ? "auto" : 0
                }}
                transition={{ duration: 0.3 }}
              >
                {collection.description}
              </motion.p>
            )}
            
            {/* View button */}
            <motion.div 
              className="mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="inline-flex items-center text-sm font-medium text-white">
                View Collection
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CollectionsClient;