"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

// Category Data (Banner & Subcategories)
const categoryData = {
  men: {
    banner: "https://images.unsplash.com/photo-1611042553489-16a36ea3e1d6?w=1200&auto=format&fit=crop&q=60",
    subcategories: [
      { name: "Watches", path: "/Routes/Men/Watches" },
      { name: "Wallets", path: "/Routes/Men/Wallets" },
      { name: "Shoes", path: "/Routes/Men/Shoes" },
    ],
  },
  women: {
    banner: "https://images.unsplash.com/photo-1590650046871-92c887180603?w=1200&auto=format&fit=crop&q=60",
    subcategories: [
      { name: "Dresses", path: "/Routes/Women/Dresses" },
      { name: "Handbags", path: "/Routes/Women/Handbags" },
      { name: "Jewelry", path: "/Routes/Women/Jewelry" },
    ],
  },
  kids: {
    banner: "https://plus.unsplash.com/premium_photo-1663090623376-7a393707d783?w=1200&auto=format&fit=crop&q=60",
    subcategories: [
      { name: "Toys", path: "/Routes/Kids/Toys" },
      { name: "Clothing", path: "/Routes/Kids/Clothing" },
      { name: "Shoes", path: "/Routes/Kids/Shoes" },
    ],
  },
};

// Dummy Product Data
const products = [
  {
    id: 1,
    name: "Classic Leather Watch",
    price: "$120",
    image: "https://images.unsplash.com/photo-1603808033192-3babf2370873?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Premium Wallet",
    price: "$50",
    image: "https://images.unsplash.com/photo-1589561459216-114c1fe3a7a3?w=600&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Sneakers",
    price: "$90",
    image: "https://images.unsplash.com/photo-1598300185241-34b77e1d3ede?w=600&auto=format&fit=crop&q=60",
  },
];

const CategoryPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Extract category name from URL (e.g., "/Routes/Men" → "men")
  const categoryKey = pathname.split("/").pop()?.toLowerCase();
  const category = categoryData[categoryKey || "men"]; // Default: "Men"

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔹 Breadcrumb Navigation */}
      <nav className="p-4 bg-white shadow-md text-sm text-gray-500">
        <span className="cursor-pointer hover:text-gray-700" onClick={() => router.push("/")}>Home</span> 
        <span className="mx-2"> / </span>
        <span className="font-semibold text-gray-800 capitalize">{categoryKey}</span>
      </nav>

      {/* 🔹 Banner Section (Dynamic) */}
      <div
        className="relative w-full h-72 sm:h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${category.banner})` }}
      >
        <h1 className="text-3xl sm:text-5xl font-bold text-white bg-black bg-opacity-50 px-6 py-3 rounded-lg capitalize">
          {categoryKey}'s Collection
        </h1>
      </div>

      {/* 🔹 Subcategories */}
      <div className="flex flex-wrap justify-center gap-4 py-6 px-4">
        {category.subcategories.map((item, index) => (
          <button
            key={index}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={() => router.push(item.path)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* 🔹 Product Listings */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
            <img className="w-full h-60 object-cover rounded-md" src={product.image} alt={product.name} />
            <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
            <p className="text-gray-600">{product.price}</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg w-full hover:bg-blue-700 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
