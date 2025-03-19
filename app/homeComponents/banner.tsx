"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 

const Banner = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const router = useRouter();

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleExploreClick = () => {
    if (selectedImage !== null) {
      router.push(`/explore/${selectedImage}`); 
    }
  };
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
      image:
        "/women1.jpg",
      hover_img:
        "https://images.unsplash.com/photo-1590649880765-91b1956b8276?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWVufGVufDB8fDB8fHww",
    },
    {
      text: "KID'S FASHION",
      path: "/collections/children",
      image:
        "/kid1.jpg",
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
    { text: "Electronics", path: "Routes/men", img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEVsZWN0cm9uaWNzfGVufDB8fDB8fHww" },
    { text: "Products", path: "/Routes/Women", img: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D" },
    { text: "Small 3", path: "/Routes/Kids", img: "/electronics.jpg" }
  ].map(({ text, path, img }, index) => (
    <div
      key={index}
      className="relative group h-20 sm:h-28 md:h-[50%] w-1/3 sm:w-[30%] md:w-[28%] overflow-hidden rounded-lg shadow-lg cursor-pointer"
      onClick={() => router.push(path)}
    >
      <img
        className="h-[30vh] w-full object-cover transition-transform duration-300 group-hover:scale-110"
        src={img} 
        alt=""
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-white text-xs sm:text-sm font-semibold transition-transform duration-500 transform translate-y-5 group-hover:translate-y-0 group-hover:invert">
          {text}
        </p>
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
          <img
            className="h-full w-full object-cover transition-opacity duration-500"
            src={elem.image}
            alt={elem.text}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-white text-lg font-semibold absolute bottom-5 transition-transform duration-500 transform translate-y-5 group-hover:translate-y-0 group-hover:invert">
              {elem.text}
            </p>
          </div>

          {index === 0 && (
            <p className="absolute top-5 right-5 text-white text-[22px] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-5 group-hover:translate-x-0 group-hover:invert">
              {elem.hover_text}
            </p>
          )}
        </div>
      ))}
    </div>
      </div>
    </div>
  );
};

export default Banner;
