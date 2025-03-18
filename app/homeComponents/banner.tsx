import React from "react";

const Banner = () => {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center bg-slate-600 p-4 gap-6">
      <div className="left w-full md:w-2/5 p-4 mb-[17%] text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Heading twHustlers</h1>
        <p className="mt-4 text-gray-200 text-sm sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero obcaecati rem similique doloribus cumque architecto inventore possimus eligendi optio
          suscipit dignissimos excepturi quasi nesciunt itaque minima quod nobis animi repellendus numquam dolorum, quae autem. Culpa est eum impedit vel ad.
        </p>
      </div>

      <div className="w-full md:w-3/5 flex flex-col gap-6">
        <div className="child2 w-full flex justify-center md:justify-end flex-wrap gap-4 p-4">
          {["Small 1", "Small 2", "Small 3"].map((text, index) => (
            <div
              key={index}
              className="relative group h-20 sm:h-28 md:h-auto w-1/3 sm:w-[30%] md:w-[24%] overflow-hidden rounded-lg shadow-lg"
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

        <div className="child1 flex flex-wrap md:flex-nowrap gap-4 items-center justify-center md:justify-start">
          {["Image 1", "Image 2", "Image 3"].map((text, index) => (
            <div
              key={index}
              className={`relative group h-32 sm:h-40 md:h-[37vh] ${
                index === 0 ? "w-2/3 sm:w-[50%]" : "w-1/3 sm:w-[30%] md:w-[24%]"
              } overflow-hidden rounded-lg shadow-lg`}
            >
              <img
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
                alt=""
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs sm:text-sm md:text-lg font-semibold">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
