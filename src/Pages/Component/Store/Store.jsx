import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils"; 
import { ChevronDown, Zap, Menu, X } from "lucide-react"; 
import One from "../../Products/one";
import Two from "../../Products/two";
import Three from "../../Products/three";
import Four from "../../Products/four";
import Five from "../../Products/Five";
import Six from "../../Products/Six";
import Seven from "../../Products/Seven";
import Eight from '../../Products/Eight';

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
  { id: 2, src: nine, alt: 'Artist 2' },
  { id: 3, src: ten, alt: 'Artist 3' },
  { id: 4, src: eleven, alt: 'Artist 4' },
  { id: 5, src: twelve, alt: 'Artist 5' },
  { id: 6, src: thirteen, alt: 'Artist 6' },
  { id: 7, src: fourteen, alt: 'Artist 7' },
  { id: 8, src: fifteen, alt: 'Artist 8' },
];

const bottomImages = [
  { id: 11, src: sixteen, alt: 'Artist 11' },
  { id: 12, src: seventeen, alt: 'Artist 12' },
  { id: 13, src: eighteen, alt: 'Artist 13' },
  { id: 14, src: nineteen, alt: 'Artist 14' },
  { id: 5, src: twelve, alt: 'Artist 5' },
  { id: 6, src: thirteen, alt: 'Artist 6' },
  { id: 7, src: fourteen, alt: 'Artist 7' },
  { id: 8, src: fifteen, alt: 'Artist 8' },
];

// Component for infinite scroll strips with improved mobile responsiveness
const InfiniteScrollStrip = ({ images, direction = 'left', speed = 25, className }) => {
  const duplicatedImages = [...images, ...images];
  
  // Calculate appropriate speed based on screen width
  const [scrollSpeed, setScrollSpeed] = useState(speed);
  
  useEffect(() => {
    const updateSpeed = () => {
      // Adjust animation speed based on screen width
      const width = window.innerWidth;
      if (width < 640) { // Mobile
        setScrollSpeed(speed * 0.8); // Faster on mobile
      } else if (width < 1024) { // Tablet
        setScrollSpeed(speed * 0.9);
      } else { // Desktop
        setScrollSpeed(speed);
      }
    };
    
    updateSpeed();
    window.addEventListener('resize', updateSpeed);
    return () => window.removeEventListener('resize', updateSpeed);
  }, [speed]);

  return (
    <div className={cn("overflow-hidden whitespace-nowrap group w-full", className)}>
      <div
        className={`inline-block animate-scroll-${direction} group-hover:pause-animation`}
        style={{
          animationDuration: `${scrollSpeed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite"
        }}
      >
        {duplicatedImages.map((img, index) => (
          <div
            key={`${img.id}-${index}`}
            className="inline-block mx-1 sm:mx-1.5 md:mx-2 p-0.5 sm:p-1 md:p-2 align-middle transform transition-transform duration-300 hover:scale-105 hover:z-20"
            style={{
              transform: `rotate(${Math.floor(Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1)}deg)`
            }}
          >
            <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-lg sm:rounded-xl overflow-hidden shadow-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-black/10 dark:border-white/10 p-0.5 sm:p-1 md:p-1.5">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover rounded-md"
                loading="lazy"
                width={128}
                height={128}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mobile Navigation Component
const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="md:hidden">
    
    
    </div>
  );
};

const CommunityShowcase = () => {
  const animationRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const animations = entry.target.querySelectorAll('.animate-scroll-left, .animate-scroll-right');
          if (entry.isIntersecting) {
            animations.forEach(el => { el.style.animationPlayState = 'running'; });
          } else {
            animations.forEach(el => { el.style.animationPlayState = 'paused'; });
          }
        });
      },
      { threshold: 0.01, rootMargin: '100px' }
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
    <div style={{ fontFamily: '"SF Pro Display", system-ui, sans-serif' }} className="relative antialiased">
      <style jsx global>{`
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

        @keyframes scrollLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }

        .animate-scroll-left {
          animation: scrollLeft var(--scroll-speed, 25s) linear infinite;
        }

        .animate-scroll-right {
          animation: scrollRight var(--scroll-speed, 25s) linear infinite;
        }
        
        .group-hover\\:pause-animation:hover {
            animation-play-state: paused;
        }

        /* Better responsive animations */
        @media (max-width: 639px) {
          .animate-scroll-left, .animate-scroll-right {
            animation-duration: 20s !important;
          }
        }
        
        @media (min-width: 640px) and (max-width: 1023px) {
          .animate-scroll-left, .animate-scroll-right {
            animation-duration: 30s !important;
          }
        }
        
        /* Safe area handling for notches and dynamic islands */
        @supports(padding: max(0px)) {
          .safe-padding-top {
            padding-top: max(1rem, env(safe-area-inset-top));
          }
          
          .safe-padding-bottom {
            padding-bottom: max(1rem, env(safe-area-inset-bottom));
          }
          
          .safe-padding-left {
            padding-left: max(1rem, env(safe-area-inset-left));
          }
          
          .safe-padding-right {
            padding-right: max(1rem, env(safe-area-inset-right));
          }
        }
        
        /* Touch-friendly targets */
        @media (max-width: 767px) {
          .touch-target {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        /* Optimized font sizes for readability */
        html {
          font-size: 100%;
        }
        
        @media (max-width: 639px) {
          html {
            font-size: 90%;
          }
        }
        
        @media (max-width: 375px) {
          html {
            font-size: 85%;
          }
        }
      `}</style>

      {/* Mobile Navigation */}
      <MobileNav />

    

     

      {/* Product Sections with improved responsive grid */}
      <div id="products" className="relative py-10 sm:py-14 lg:py-20 bg-gradient-to-b from-white to-slate-100 dark:from-gray-900 dark:to-slate-950 safe-padding-bottom">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 lg:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-blue-900 dark:text-blue-100 mb-2 sm:mb-3 md:mb-4">
              Explore Our Premium Products
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-2xl mx-auto">
              Discover our range of high-quality solutions, meticulously designed to elevate your experience and exceed expectations.
            </p>
          </div>

          {/* Improved Responsive Grid for Products */}
          <div className="grid grid-cols-1 xs:grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {/* Product cards - wrapped for consistent styling */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              <One />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              <Two />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              <Three />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              <Four />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] xs:hidden md:block">
              <Five />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] xs:hidden md:block">
              <Six />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] md:hidden xl:block">
              <Seven />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] md:hidden xl:block">
              <Eight />
            </div>
          </div>
          
          {/* Show more button for mobile */}
          <div className="mt-8 text-center md:hidden">
            <button className="touch-target px-5 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Show More Products
            </button>
          </div>
        </div>
      </div>
      
     
    </div>
  );
};

export default CommunityShowcase;

// Add these to your tailwind.config.js:
// module.exports = {
//   theme: {
//     extend: {
//       screens: {
//         'xs': '475px', // Extra small devices
//       },
//       animation: {
//         'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//       },
//       keyframes: {
//         pulse: {
//           '0%, 100%': { opacity: 1 },
//           '50%': { opacity: 0.5 },
//         },
//       },
//     },
//   },
//   plugins: [],
// }