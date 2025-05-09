import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils"; // Assuming this is a utility like clsx or tailwind-merge
import { ChevronDown, Zap } from "lucide-react"; // Added Zap for button icon example
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
  { id: 5, src: twelve, alt: 'Artist 5' }, // Repeating for effect
  { id: 6, src: thirteen, alt: 'Artist 6' },
  { id: 7, src: fourteen, alt: 'Artist 7' },
  { id: 8, src: fifteen, alt: 'Artist 8' },
];

// Component for infinite scroll strips with improved mobile responsiveness
const InfiniteScrollStrip = ({ images, direction = 'left', speed = 25, className }) => {
  const duplicatedImages = [...images, ...images];

  return (
    <div className={cn("overflow-hidden whitespace-nowrap group", className)}> {/* Added group for potential parent-hover effects */}
      <div
        className={`inline-block animate-scroll-${direction} group-hover:pause-animation`} // Example: pause on hover
        style={{
          animationDuration: `${speed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite"
        }}
      >
        {duplicatedImages.map((img, index) => (
          <div
            key={`${img.id}-${index}`}
            className="inline-block mx-1.5 p-1 sm:mx-2 sm:p-2 md:p-3 align-middle transform transition-transform duration-300 hover:scale-105 hover:z-20" // Adjusted padding and margin
            style={{
              transform: `rotate(${Math.floor(Math.random() * 4) * (Math.random() > 0.5 ? 1 : -1)}deg)` // Slightly less rotation
            }}
          >
            <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-lg sm:rounded-xl overflow-hidden shadow-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-black/10 dark:border-white/10 p-1 sm:p-1.5 md:p-2">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover rounded-md"
                loading="lazy"
                width={144} // approx lg:w-36 in px
                height={144} // approx lg:h-36 in px
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
      { threshold: 0.01, rootMargin: '100px' } // Start/stop animation a bit earlier/later
    );

    if (animationRef.current) {
      observer.observe(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        observer.unobserve(animationRef.current); // Use animationRef.current consistently
      }
    };
  }, []);

  return (
    <div style={{ fontFamily: '"SF Pro Display", system-ui, sans-serif' }} className="relative antialiased"> {/* Using SF Pro Display for headings, Text for body often a good combo */}
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

        /* Custom breakpoints for finer control if needed, e.g., xs */
        /* Tailwind already includes sm, md, lg, xl */
        /* Add custom 'xs' to tailwind.config.js if you use it extensively */
        /* For this example, using Tailwind's default breakpoints */

        @media (max-width: 639px) { /* Corresponds to Tailwind's 'sm' breakpoint */
          .animate-scroll-left, .animate-scroll-right {
            animation-duration: 20s !important; /* Faster on mobile */
          }
        }
      `}</style>

      {/* Showcase Section */}
      <div
        ref={animationRef}
        className="relative flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[80vh] md:min-h-screen w-full overflow-hidden py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-100 via-white to-indigo-200 dark:from-slate-900 dark:via-gray-900 dark:to-indigo-950"
      >
        {/* Top scrolling strip */}
        <div className="absolute top-4 sm:top-8 md:top-12 lg:top-16 w-full z-10">
          <InfiniteScrollStrip
            images={topImages}
            direction="left"
            speed={45} // Slower for top
          />
        </div>

        {/* Central Content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32"> {/* Increased padding to avoid overlap */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 sm:mb-6">
            Join Our Vibrant <span className="text-blue-600 dark:text-blue-400">Community</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-xs sm:max-w-md md:max-w-2xl mx-auto mb-6 sm:mb-8">
            Discover amazing creators, share your work, and connect with like-minded individuals from around the globe.
          </p>
          <button className="flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-base sm:text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <Zap size={20} className="mr-2" />
            Get Started
          </button>
        </div>

        {/* Bottom scrolling strip */}
        <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 lg:bottom-16 w-full z-10">
          <InfiniteScrollStrip
            images={bottomImages}
            direction="right"
            speed={40} // Slightly different speed
          />
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
          <div className="text-blue-600 dark:text-blue-400 animate-bounce p-1 sm:p-1.5 bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-full shadow-lg">
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          </div>
          <span className="mt-1 text-blue-700 dark:text-blue-300 text-[10px] sm:text-xs font-medium tracking-wide">Scroll</span>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-green-300/20 dark:bg-green-500/10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full bg-indigo-300/20 dark:bg-indigo-500/10 blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
      </div>

      {/* Product Sections */}
      <div className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-slate-100 dark:from-gray-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-blue-900 dark:text-blue-100 mb-3 sm:mb-4">
              Explore Our Premium Products
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
              Discover our range of high-quality solutions, meticulously designed to elevate your experience and exceed expectations.
            </p>
          </div>

          {/* Responsive Grid for Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {/* Assuming One, Two, etc. are components that render a product card */}
            <One />
            <Two />
            <Three />
            <Four />
            <Five />
            <Six />
            <Seven />
            <Eight />
            {/* 
              If your Product components (One, Two, etc.) don't have their own outer div
              with styling for a card, you might wrap them:
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"> <One /> </div>
              But it's better if One, Two, etc., are self-contained cards.
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityShowcase;

// Add a custom 'xs' breakpoint to your tailwind.config.js if you want to use it:
// module.exports = {
//   theme: {
//     extend: {
//       screens: {
//         'xs': '475px',
//       },
//       animation: {
//          // ... your existing animations
//       },
//       keyframes: {
//         // ... your existing keyframes
//       },
//     },
//   },
//   plugins: [],
// }