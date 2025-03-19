"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const categories = [
  { name: "Luxury", image: "https://i.ebayimg.com/00/s/NTUyWDU1Mw==/z/dLAAAOSw3tpmVtNS/$_1.JPG" },
  { name: "Sneakers", image: "https://ir.ebaystatic.com/cr/v/c01/02_PopularDestination_Sneakers.jpg" },
  { name: "Devices", image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVsZWN0cm9uaWNzfGVufDB8fDB8fHww" },
  { name: "Care", image: "https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3RzfGVufDB8fDB8fHww" },
];

const CategorySlider = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Mobile: Show 2 items
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Tablet view
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // Mobile view
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
        Explore Popular Categories
      </h2>

      {/* Mobile & Tablet: Show Slider */}
      <div className="block lg:hidden">
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div key={index} className="p-2">
              <div
                className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedCategory === category.name ? "bg-gray-300 shadow-md" : "bg-gray-100"
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
                />
                <p className="text-center mt-2 font-semibold text-sm break-words w-24">
                  {category.name}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Desktop: Show Grid */}
      <div className="hidden lg:grid grid-cols-4 gap-6 justify-center w-full">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-4 rounded-lg transition-all duration-200 ${
              selectedCategory === category.name ? "bg-gray-300 shadow-md" : "bg-gray-100"
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <p className="text-center mt-2 font-semibold text-sm break-words w-24">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;
