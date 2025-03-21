'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';



const FeaturedProduct = ({ image, name, price, discount }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative mb-3 h-60 overflow-hidden rounded-lg bg-gray-100 sm:h-72">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105" 
        />
        {discount && (
          <span className="absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-xs font-medium text-white">
            {discount}% OFF
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 flex translate-y-full justify-center gap-2 bg-black/60 p-2 text-white transition-transform duration-300 group-hover:translate-y-0">
          <button className="rounded-full bg-white p-2 text-black hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <button className="rounded-full bg-white p-2 text-black hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
          <button className="rounded-full bg-white p-2 text-black hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>
      <h3 className="font-medium text-gray-900">{name}</h3>
      <div className="mt-1 flex items-center gap-2">
        <span className="font-semibold text-gray-900">${price.toFixed(2)}</span>
        {discount && (
          <span className="text-sm text-gray-500 line-through">
            ${(price / (1 - discount / 100)).toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};

const Test = () => {
  const [activeTab, setActiveTab] = useState('featured');
  
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">



      {/* Featured Products Section */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Our Products</h2>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['featured', 'bestsellers', 'new', 'sale'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
                    activeTab === tab
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
          <FeaturedProduct 
            image="/path-to-product1.jpg" 
            name="Classic Cotton T-Shirt" 
            price={29.99} 
            discount={0} 
          />
          <FeaturedProduct 
            image="/path-to-product2.jpg" 
            name="Slim Fit Jeans" 
            price={49.99} 
            discount={15} 
          />
          <FeaturedProduct 
            image="/path-to-product3.jpg" 
            name="Leather Casual Shoes" 
            price={89.99} 
            discount={0} 
          />
          <FeaturedProduct 
            image="/path-to-product4.jpg" 
            name="Wool Blend Coat" 
            price={129.99} 
            discount={20} 
          />
          <FeaturedProduct 
            image="/path-to-product5.jpg" 
            name="Wireless Earbuds" 
            price={79.99} 
            discount={10} 
          />
          <FeaturedProduct 
            image="/path-to-product6.jpg" 
            name="Sports Watch" 
            price={119.99} 
            discount={0} 
          />
          <FeaturedProduct 
            image="/path-to-product7.jpg" 
            name="Canvas Backpack" 
            price={59.99} 
            discount={0} 
          />
          <FeaturedProduct 
            image="/path-to-product8.jpg" 
            name="Polarized Sunglasses" 
            price={34.99} 
            discount={25} 
          />
        </div>
        <div className="mt-10 text-center">
          <Link href="/products" className="inline-block rounded-md border border-primary-600 px-6 py-3 text-primary-600 shadow-sm transition hover:bg-primary-50">
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Test;






// 'use client'
// import { useState, useEffect, useRef } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// const BannerSection = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const slideInterval = useRef(null);
  
//   const bannerSlides = [
//     {
//       id: 1,
//       image: 'https://images.unsplash.com/photo-1485282826741-1b5d56f7e268?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGVjb21tZXJjZSUyMGJhbm5lcnxlbnwwfHwwfHx8MA%3D%3D',
//       title: 'Spring Collection',
//       subtitle: 'Refresh Your Wardrobe',
//       description: 'Discover the latest trends for the new season with up to 40% off',
//       ctaText: 'Shop Now',
//       ctaLink: '/collections/spring',
//       position: 'left', // text position
//       theme: 'light', // text color theme (light or dark)
//     },
//     {
//       id: 2,
//       image: 'https://images.unsplash.com/photo-1516690962695-bd573a42a487?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN0dWZmfGVufDB8fDB8fHww',
//       title: 'Premium Electronics',
//       subtitle: 'Next-Gen Tech',
//       description: 'Experience innovation with our curated selection of cutting-edge devices',
//       ctaText: 'Explore',
//       ctaLink: '/collections/electronics',
//       position: 'right',
//       theme: 'dark',
//     },
//     {
//       id: 3,
//       image: 'https://images.unsplash.com/photo-1550505393-2c5dbec5de87?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZmZ8ZW58MHx8MHx8fDA%3D',
//       title: 'Kids Fashion',
//       subtitle: 'Playful & Practical',
//       description: 'Comfortable styles that keep up with their adventures',
//       ctaText: 'View Collection',
//       ctaLink: '/collections/kids',
//       position: 'center',
//       theme: 'light',
//     },
//   ];

//   const nextSlide = () => {
//     if (!isAnimating) {
//       setIsAnimating(true);
//       setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
//       setTimeout(() => setIsAnimating(false), 500);
//     }
//   };

//   const prevSlide = () => {
//     if (!isAnimating) {
//       setIsAnimating(true);
//       setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
//       setTimeout(() => setIsAnimating(false), 500);
//     }
//   };

//   const goToSlide = (index) => {
//     if (!isAnimating && index !== currentSlide) {
//       setIsAnimating(true);
//       setCurrentSlide(index);
//       setTimeout(() => setIsAnimating(false), 500);
//     }
//   };

//   // Auto-rotate slides
//   useEffect(() => {
//     slideInterval.current = setInterval(() => {
//       nextSlide();
//     }, 5000); // Change slide every 5 seconds

//     return () => {
//       if (slideInterval.current) {
//         clearInterval(slideInterval.current);
//       }
//     };
//   }, [currentSlide]);

//   // Pause auto-rotation when user interacts
//   const pauseSlideshow = () => {
//     if (slideInterval.current) {
//       clearInterval(slideInterval.current);
//     }
//   };

//   const resumeSlideshow = () => {
//     slideInterval.current = setInterval(() => {
//       nextSlide();
//     }, 5000);
//   };

//   // Helper function to determine text position classes
//   const getPositionClasses = (position) => {
//     switch (position) {
//       case 'left':
//         return 'items-start text-left pl-8 md:pl-16 lg:pl-24';
//       case 'right':
//         return 'items-end text-right pr-8 md:pr-16 lg:pr-24';
//       case 'center':
//       default:
//         return 'items-center text-center';
//     }
//   };

//   // Helper function to determine text color classes
//   const getThemeClasses = (theme) => {
//     return theme === 'dark' ? 'text-gray-900' : 'text-white';
//   };

//   return (
//     <section className="relative h-[50vh] w-full overflow-hidden sm:h-[60vh] md:h-[70vh] lg:h-[80vh]" 
//       onMouseEnter={pauseSlideshow}
//       onMouseLeave={resumeSlideshow}
//       onTouchStart={pauseSlideshow}
//       onTouchEnd={resumeSlideshow}>
      
//       {/* Slides */}
//       <div className="relative h-full w-full">
//         {bannerSlides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
//               index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
//             }`}
//           >
//             {/* Slide background */}
//             <div className="relative h-full w-full">
//               <Image
//                 src={slide.image}
//                 alt={slide.title}
//                 fill
//                 priority={index === 0}
//                 className={`object-cover transition-transform duration-700 ${
//                   index === currentSlide ? 'scale-100' : 'scale-110'
//                 }`}
//               />
//               <div className="absolute inset-0 bg-black/30" />
//             </div>
            
//             {/* Slide content */}
//             <div className={`absolute inset-0 flex flex-col justify-center ${getPositionClasses(slide.position)}`}>
//               <div className={`max-w-lg px-4 ${getThemeClasses(slide.theme)}`}>
//                 <span className={`mb-2 block transform text-sm font-medium uppercase tracking-wider opacity-0 transition-all delay-200 duration-700 ${
//                   index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//                 }`}>
//                   {slide.subtitle}
//                 </span>
//                 <h2 className={`mb-4 transform text-4xl font-bold leading-tight opacity-0 transition-all delay-300 duration-700 sm:text-5xl md:text-6xl ${
//                   index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//                 }`}>
//                   {slide.title}
//                 </h2>
//                 <p className={`mb-6 max-w-md transform text-base opacity-0 transition-all delay-400 duration-700 sm:text-lg ${
//                   index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//                 }`}>
//                   {slide.description}
//                 </p>
//                 <Link href={slide.ctaLink}>
//                   <span className={`inline-block transform rounded-full bg-primary-600 px-6 py-3 font-medium text-white opacity-0 shadow-lg transition-all delay-500 duration-700 hover:bg-primary-700 hover:shadow-xl ${
//                     index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//                   }`}>
//                     {slide.ctaText}
//                   </span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {/* Navigation Arrows */}
//       <button
//         className="group absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/50 sm:p-3"
//         onClick={prevSlide}
//         aria-label="Previous slide"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 transition-transform group-hover:-translate-x-1 sm:h-6 sm:w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>
//       <button
//         className="group absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/50 sm:p-3"
//         onClick={nextSlide}
//         aria-label="Next slide"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 transition-transform group-hover:translate-x-1 sm:h-6 sm:w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>
      
//       {/* Dots Indicator */}
//       <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2 md:bottom-8">
//         {bannerSlides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`h-2 w-2 rounded-full transition-all sm:h-3 sm:w-3 ${
//               index === currentSlide
//                 ? 'w-6 bg-white sm:w-8'
//                 : 'bg-white/50 hover:bg-white/70'
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
      
//       {/* Progress Bar */}
//       <div className="absolute bottom-0 left-0 h-1 w-full bg-white/20">
//         <div
//           className="h-full bg-primary-600 transition-all duration-100 ease-linear"
//           style={{
//             width: `${((currentSlide + 1) / bannerSlides.length) * 100}%`,
//           }}
//         />
//       </div>
//     </section>
//   );
// };

// export default BannerSection;
