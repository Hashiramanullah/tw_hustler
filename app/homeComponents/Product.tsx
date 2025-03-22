

'use client'
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '@/lib/actions/actions';

const Product = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Category cards data - using the images from your screenshot
  const categories = [
    {
      id: 1,
      title: "MEN'S STYLE & FASHION",
      subtitle: "NEWS, TIPS, TRENDS & CELEBRITY STYLE",
      image: "/men.jpg", // Update with your actual path
      cta: "Explore Men",
      link: "/men"
    },
    {
      id: 2,
      title: "WOMEN'S COLLECTION",
      subtitle: "ELEGANT & TRENDY STYLES",
      image: "/women1.jpg", // The image with woman in orange
      cta: "Shop Women",
      link: "/women"
    },
    {
      id: 3,
      title: "KIDS' FASHION",
      subtitle: "COMFORTABLE & PLAYFUL",
      image: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2lkfGVufDB8fDB8fHww", // The image with the child
      cta: "View Kids",
      link: "/kids"
    },
    {
      id: 4,
      title: "ACCESSORIES",
      subtitle: "COMPLETE YOUR LOOK",
      image: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D", // The image with accessories (hats, etc.)
      cta: "Browse Accessories",
      link: "/accessories"
    },
    {
      id: 5,
      title: "ELECTRONICS",
      subtitle: "CUTTING-EDGE TECH",
      image: "https://plus.unsplash.com/premium_photo-1661304671477-37c77d0c6930?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGVsZWN0cm9uaWNzfGVufDB8fDB8fHww", // Add an electronics image
      cta: "Shop Electronics",
      link: "/electronics"
    }
  ];

  // Calculate number of slides to show based on screen width
  const getSlidesToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }
    return 3; // Default for SSR
  };

  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    // Set initial slides to show
    setSlidesToShow(getSlidesToShow());

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Start autoplay
    startAutoplay();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  const startAutoplay = () => {
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 4000);
  };

  const stopAutoplay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const resetAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  // Handle dragging for mobile swipe
  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
    stopAutoplay();
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;
    
    // Limit dragging to prevent excessive movement
    if (Math.abs(diff) < 100) {
      setTranslateX(diff);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    if (translateX > 50) {
      prevSlide();
    } else if (translateX < -50) {
      nextSlide();
    }
    
    setIsDragging(false);
    setTranslateX(0);
    resetAutoplay();
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === categories.length - slidesToShow ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? categories.length - slidesToShow : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
    resetAutoplay();
  };

  // Calculate if a given index is the active slide
  const isActiveSlide = (index) => {
    return index >= activeIndex && index < activeIndex + slidesToShow;
  };

  return (
    <div className="relative w-full overflow-hidden py-12">
      <div className="mb-8 ml-4">
        <p className="mt-2 text-black">
          Discover our curated collections for every style and occasion.
        </p>
      </div>

      {/* Main Slider */}
      <div 
        className="relative"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
      >
        <div 
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(-${activeIndex * (100 / slidesToShow)}%)`,
            marginLeft: isDragging ? `${translateX}px` : '0px'
          }}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          {categories.map((category, index) => (
            <div 
              key={category.id}
              className={`relative w-full flex-none px-3 sm:w-1/2 lg:w-1/3`}
              style={{ transition: 'all 0.5s ease' }}
            >
              <div 
                className={`group overflow-hidden rounded-lg transition-all duration-500 ${
                  isActiveSlide(index) 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-50 scale-95 pointer-events-none'
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="transform transition-transform duration-500 group-hover:translate-y-0">
                      <p className="mb-1 text-xs font-medium uppercase tracking-wider opacity-75">{category.subtitle}</p>
                      <h3 className="mb-3 text-xl font-bold sm:text-2xl">{category.title}</h3>
                      <Link href={category.link}>
                        <span className="inline-block rounded-lg bg-white px-4 py-2 font-medium text-gray-900 transition-transform duration-300 group-hover:scale-105">
                          {category.cta}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button 
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-75 transition-opacity hover:opacity-100 sm:p-3"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button 
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-75 transition-opacity hover:opacity-100 sm:p-3"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Dots Indicator */}
      <div className="mt-6 flex justify-center space-x-2">
        {[...Array(categories.length - slidesToShow + 1)].map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              activeIndex === index ? 'w-6 bg-white' : 'bg-gray-400/50 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Product;