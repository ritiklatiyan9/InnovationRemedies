import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import One from "../../Products/one";
import Two from "../../Products/two";
import Three from "../../Products/three";

// Import images from assets
import eight from '../../../assets/Images/eight.png';
import nine from '../../../assets/Images/nine.png';
import ten from '../../../assets/Images/ten.jpg';
import eleven from '../../../assets/Images/eleven.jpg';
import twelve from '../../../assets/Images/twelve.png';
import thirteen from '../../../assets/Images/thirteen.png';
import fourteen from '../../../assets/Images/fourteen.png';
import fifteen from '../../../assets/Images/fifteen.png';
import sixteen from '../../../assets/Images/sixteen.png';
import seventeen from '../../../assets/Images/seventeen.png';
import eighteen from '../../../assets/Images/eighteen.png';
import nineteen from '../../../assets/Images/nineteen.png';


// Image data with simplified structure using imported images
const topImages = [
  { id: 1, src: eight, alt: 'Artist 1' },
  { id: 2, src: nine, alt: 'Artist 2' }, // Updated src
  { id: 3, src: ten, alt: 'Artist 3' },  // Updated src
  { id: 4, src: eleven, alt: 'Artist 4' }, // Updated src
  { id: 5, src: twelve, alt: 'Artist 5' }, // Updated src
  { id: 6, src: thirteen, alt: 'Artist 6' },// Updated src
  { id: 7, src: fourteen, alt: 'Artist 7' },// Updated src
  { id: 8, src: fifteen, alt: 'Artist 8' },// Updated src
];

const bottomImages = [
  { id: 11, src: sixteen, alt: 'Artist 11' },    // Updated src
  { id: 12, src: seventeen, alt: 'Artist 12' },  // Updated src
  { id: 13, src: eighteen, alt: 'Artist 13' },   // Updated src
  { id: 14, src: nineteen, alt: 'Artist 14' },   // Updated src
  // Assuming you might want to cycle back or use placeholders if you have more slots than unique images
  // For now, let's repeat some or use placeholders if needed. Here we use placeholders as original code had 8.
  { id: 5, src: twelve, alt: 'Artist 5' }, // Updated src
  { id: 6, src: thirteen, alt: 'Artist 6' },// Updated src
  { id: 7, src: fourteen, alt: 'Artist 7' },// Updated src
  { id: 8, src: fifteen, alt: 'Artist 8' },// Updated src
];

// Component for infinite scroll strips with improved mobile responsiveness
const InfiniteScrollStrip = ({ images, direction = 'left', speed = 25, className }) => {
  // Duplicate images for infinite scrolling effect
  const duplicatedImages = [...images, ...images];

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div
        className={`inline-block animate-scroll-${direction}`}
        style={{
          animationDuration: `${speed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite"
        }}
      >
        {duplicatedImages.map((img, index) => (
          <div
            key={`${img.id}-${index}`}
            className="inline-block mx-2 p-4 sm:mx-3 align-middle transform transition-transform duration-300 hover:scale-105 hover:z-10"
            style={{
              // Keep the random rotation for visual interest
              transform: `rotate(${Math.floor(Math.random() * 5) * (Math.random() > 0.5 ? 1 : -1)}deg)`
            }}
          >
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg bg-white/60 backdrop-blur-sm border border-black/5 dark:border-white/10  sm:p-4 md:p-4">
              <img
                src={img.src} // src will now be the imported image variable or a placeholder URL
                alt={img.alt}
                className="w-full h-full object-cover rounded-md"
                loading="lazy"
                width={160}
                height={160}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CommunityShowcase = () => {
  const animationRef = useRef(null);

  // Setup for animation control on scroll/visibility for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const animations = entry.target.querySelectorAll('.animate-scroll-left, .animate-scroll-right');

          if (entry.isIntersecting) {
            // Resume animations when in view
            animations.forEach(el => {
              el.style.animationPlayState = 'running';
            });
          } else {
            // Pause animations when out of view to save resources
            animations.forEach(el => {
              el.style.animationPlayState = 'paused';
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (animationRef.current) {
      observer.observe(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        observer.unobserve(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* Scrolling animations CSS */}
      <style jsx global>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .animate-scroll-left {
          animation: scrollLeft 25s linear infinite;
        }

        .animate-scroll-right {
          animation: scrollRight 25s linear infinite;
        }

        @media (max-width: 640px) {
          .animate-scroll-left, .animate-scroll-right {
            animation-duration: 20s !important; /* Adjusted speed for mobile */
          }
        }
      `}</style>

      {/* Showcase Section with improved responsiveness */}
      <div
        ref={animationRef}
        className="relative flex flex-col items-center justify-center min-h-[60vh] sm:min-h-screen w-full overflow-hidden py-8 sm:py-12 lg:py-20 bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-blue-950/40 dark:via-gray-900 dark:to-indigo-950/40"
      >
        {/* Top scrolling strip - adjusted positioning for mobile */}
        <div className="absolute top-10 sm:top-16 lg:top-32 w-full z-10">
          <InfiniteScrollStrip
            images={topImages} // Uses updated topImages array
            direction="left"
            speed={35}
          />
        </div>

        {/* Bottom scrolling strip - adjusted positioning for mobile */}
        <div className="absolute bottom-10 sm:bottom-16 lg:bottom-32 w-full z-10">
          <InfiniteScrollStrip
            images={bottomImages} // Uses updated bottomImages array
            direction="right"
            speed={30}
          />
        </div>

        {/* Central Content with improved mobile styling */}
        <div className="relative z-30 flex flex-col items-center text-center max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6  transform transition-all duration-500">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-blue-900 dark:text-blue-100 leading-tight">

            <span className="mt-1 sm:mt-2 inline-block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Our Products
            </span>

          </h1>


          <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-base sm:text-lg font-medium shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Explore Products
          </button>
        </div>

        {/* Scroll Down Indicator with improved positioning */}
        <div className="absolute bottom-4 sm:bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
          <div className="text-blue-600 dark:text-blue-400 animate-bounce p-1.5 sm:p-2 bg-white/30 dark:bg-black/30 backdrop-blur-md rounded-full">
            <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
          </div>
          <span className="mt-1 sm:mt-2 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium">Scroll Down</span>
        </div>

        {/* Decorative elements - subtle background effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Gradient orbs with improved positioning for mobile */}
          <div className="absolute top-1/3 left-1/5 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-blue-400/10 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/5 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-indigo-400/10 blur-3xl"></div>
        </div>
      </div>

      {/* Product Sections with improved spacing and mobile responsiveness */}
      <div className="relative pt-12 sm:pt-16 lg:pt-24 pb-16 sm:pb-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section intro with improved typography */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 dark:text-blue-100 mb-3 sm:mb-4">Our Premium Products</h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl sm:max-w-2xl mx-auto">
              Discover our range of high-quality solutions designed to meet your needs and exceed expectations
            </p>
          </div>


        </div>
        <div className="">
            <div className=" rounded-2xl">
              <One />
            </div>

            <div className=" rounded-2xl">
              <Two />
            </div>

            <div className=" rounded-2xl">
              <Three />
            </div>
          </div>
      </div>
    </div>
  );
};

export default CommunityShowcase;