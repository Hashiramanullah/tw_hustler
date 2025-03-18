"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Corrected Import

const Banner = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const router = useRouter();

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleExploreClick = () => {
    if (selectedImage !== null) {
      router.push(`/explore/${selectedImage}`); // ✅ Dynamic Routing Fixed
    }
  };
  const categories = [
    {
      text: "Explore Men",
      path: "/Routes/men",
      image: "men.jpg",
      hover_img: "men_hover.jpg",
    },
    {
      text: "Explore Women",
      path: "/Routes/women",
      image:
        "https://images.unsplash.com/photo-1590650046871-92c887180603?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tZW58ZW58MHx8MHx8fDA%3D",
      hover_img:
        "https://images.unsplash.com/photo-1590649880765-91b1956b8276?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWVufGVufDB8fDB8fHww",
    },
    {
      text: "Explore Child",
      path: "/Routes/children",
      image:
        "https://plus.unsplash.com/premium_photo-1663090623376-7a393707d783?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hpbGR8ZW58MHx8MHx8fDA%3D",
      hover_img:
        "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hpbGR8ZW58MHx8MHx8fDA%3D",
    },
  ];
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center bg-slate-600 p-4 gap-6">
      {/* Left Section */}
      <div className="left w-full md:w-2/5 p-4 mb-[17%] text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Heading twHustlers</h1>
        <p className="mt-4 text-gray-200 text-sm sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero obcaecati rem similique doloribus cumque architecto inventore possimus eligendi optio
          suscipit dignissimos excepturi quasi nesciunt itaque minima quod nobis animi repellendus numquam dolorum, quae autem. Culpa est eum impedit vel ad.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-3/5 flex flex-col gap-6">
        {/* Small Images */}
        <div className="child2 w-full flex justify-center md:justify-end flex-wrap gap-4 p-4">
        {[
  { text: "Small 1", path: "Routes/men" },
  { text: "Small 2", path: "/Routes/Women" },
  { text: "Small 3", path: "/Routes/Kids" }
].map(({ text, path }, index) => (
  <div
    key={index}
    className="relative group h-20 sm:h-28 md:h-auto w-1/3 sm:w-[30%] md:w-[24%] overflow-hidden rounded-lg shadow-lg cursor-pointer"
    onClick={() => router.push(path)} // Navigates to the respective path
  >
    <img
      className="h-[30vh] w-full object-cover transition-transform duration-300 group-hover:scale-110"
      src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
      alt=""
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <p className="text-white text-xs sm:text-sm font-semibold">{text}</p>
    </div>
  </div>
))}

        </div>

        {/* Large Images */}
        <div className="flex flex-wrap md:flex-nowrap gap-6 items-center justify-center md:justify-start">
      {categories.map((elem, index) => (
        <div
          key={index}
          className={`relative group h-40 sm:h-52 md:h-[45vh] ${
            index === 0 ? "w-2/3 sm:w-[50%]" : "w-1/3 sm:w-[30%] md:w-[24%]"
          } overflow-hidden rounded-2xl shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105`}
          onClick={() => router.push(elem.path)}
        >
          {/* Default Image */}
          <img
            className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            src={elem.image}
            alt={elem.text}
          />

          {/* Hover Image & Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <img className="w-full h-full object-cover" src={elem.hover_img} alt={elem.text} />
            <p className="absolute bottom-5 text-white text-sm sm:text-lg font-semibold bg-black bg-opacity-50 px-3 py-2 rounded-md">
              {elem.text}
            </p>
          </div>
        </div>
      ))}
    </div>
      </div>

      {/* Modal for Explore */}
      {selectedImage !== null && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-xl font-bold mb-4">Explore More</p>
            <button
              onClick={handleExploreClick}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Explore Now
            </button>
            <button
              onClick={() => setSelectedImage(null)}
              className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
