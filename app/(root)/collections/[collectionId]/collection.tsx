"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CollectionClient = ({ collectionDetails }: { collectionDetails: any }) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(collectionDetails?.products || []);
  const [isLoading, setIsLoading] = useState(true);

  // Extract unique categories from products
  const categories = collectionDetails?.products 
    ? ["all", ...new Set(collectionDetails.products.map((product: any) => product.category))]
    : ["all"];

  useEffect(() => {
    if (collectionDetails) {
      setIsLoading(false);
      filterProducts(selectedCategory);
    }
  }, [collectionDetails, selectedCategory]);

  const filterProducts = (category: string) => {
    if (category === "all") {
      setFilteredProducts(collectionDetails.products);
    } else {
      setFilteredProducts(
        collectionDetails.products.filter((product: any) => 
          product.category === category
        )
      );
    }
  };

  if (!collectionDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="p-8 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">Collection Not Found</h2>
          <p className="mt-2 text-gray-600">The collection you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => router.push("/collections")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse Collections
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex justify-center items-center min-h-[50vh]"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Breadcrumb Navigation */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md">
            <div className="container mx-auto px-4 md:px-6 py-3">
              <nav className="flex items-center text-sm">
                <button 
                  className="hover:text-blue-300 transition-colors flex items-center" 
                  onClick={() => router.push("/")}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </button>
                <span className="mx-2 text-gray-400">/</span>
                <button 
                  className="hover:text-blue-300 transition-colors" 
                  onClick={() => router.push("/collections")}
                >
                  Collections
                </button>
                <span className="mx-2 text-gray-400">/</span>
                <span className="font-medium text-blue-300 capitalize">{collectionDetails.title}</span>
              </nav>
            </div>
          </div>

          {/* Collection Banner */}
          <motion.div 
            className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={collectionDetails.image}
              fill
              sizes="100vw"
              priority
              alt={collectionDetails.title}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {collectionDetails.title}
              </motion.h1>
              <motion.p 
                className="mt-3 max-w-2xl text-sm md:text-base lg:text-lg text-gray-200"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {collectionDetails.description}
              </motion.p>
            </div>
          </motion.div>

          {/* Category Selection */}
          <div className="container mx-auto px-4 pt-8 pb-4">
            <motion.div 
              className="mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Browse Categories</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((category: string) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Results Summary */}
            <motion.div 
              className="mb-6 text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
            </motion.div>

            {/* Products Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <AnimatePresence>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product: any, index: number) => (
                    <motion.div
                      key={product._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    className="col-span-full flex flex-col items-center justify-center py-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="text-xl font-medium text-gray-800">No products found</h3>
                    <p className="mt-2 text-gray-600">Try selecting a different category</p>
                    <button 
                      onClick={() => setSelectedCategory('all')}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      View All Products
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CollectionClient;