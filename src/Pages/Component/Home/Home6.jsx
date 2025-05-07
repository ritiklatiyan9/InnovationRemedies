// src/components/TopSellingSection.jsx
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming this is from shadcn/ui or similar
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Image imports (ensure these paths are correct relative to this file)
import Calfshakti from '../../../assets/Images/seventeen.png';
import One from '../../../assets/Images/one.png';
import R3 from '../../../assets/Images/two.png';
import MakkiInjection from '../../../assets/Images/sixteen.png';

// If "Oregon LDO" is a custom font, ensure it's loaded globally (e.g., in your main CSS file)
// @font-face {
//   font-family: 'Oregon LDO';
//   src: url('/path/to/OregonLDO.woff2') format('woff2'), /* ... other formats */
//   font-weight: 400;
//   font-style: normal;
// }
const customStyle = {
  fontFamily: "Oregon LDO, sans-serif", // Make sure this font is available
  fontWeight: "400",
};

const products = [
  { id: 1, name: "Calfshakti", price: "₹1299", src: Calfshakti, alt: 'Calf nutrition supplement' },
  { id: 2, name: "VitalGro One", price: "₹899", src: One, alt: 'Plant growth enhancer' },
  { id: 3, name: "R3 Immunity", price: "₹1550", src: R3, alt: 'Animal immune booster' },
  { id: 4, name: "Makki Injection", price: "₹750", src: MakkiInjection, alt: 'Crop treatment injection', hasIcon: true },
 
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function TopSellingSection() {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const getGap = () => {
    if (carouselRef.current) {
      return parseInt(getComputedStyle(carouselRef.current).columnGap, 10) || 16; // Default to 16 if not found
    }
    return 16;
  };

  const scrollCarousel = (direction) => {
    const el = carouselRef.current;
    if (!el || el.children.length === 0) return;

    const gap = getGap();
    const cardWidth = el.children[0].clientWidth;
    const scrollAmount = cardWidth + gap;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % products.length;
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      newIndex = (currentIndex - 1 + products.length) % products.length;
      el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
    // Note: Accurately setting currentIndex with scrollBy can be tricky due to smooth scroll
    // For precise index tracking with scrollBy, one might need IntersectionObserver
    // For simplicity, this example updates index optimistically.
    setCurrentIndex(newIndex); 
  };
  
  // Auto-scroll
  useEffect(() => {
    if (isHovering || !carouselRef.current || products.length === 0) return;

    const intervalId = setInterval(() => {
      scrollCarousel('next');
    }, 4000);

    return () => clearInterval(intervalId);
  }, [isHovering, currentIndex, products.length]); // Re-run if hover state changes or index changes


  return (
    <motion.section
      style={customStyle} // Apply custom font style
      className="bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          className="md:flex md:justify-between md:items-center text-center md:text-left"
          variants={textVariants}
        >
          <div>
            <motion.p
              className="inline-block bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4 shadow-sm"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              New Arrivals
            </motion.p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              Top-Selling Products
              <br />
              <span className="text-blue-600">of the Year</span>
            </h2>
            <p className="mt-6 text-gray-600 max-w-lg mx-auto md:mx-0 text-base md:text-lg">
              Discover our latest innovations. Fresh designs released weekly to bring you the very best in agricultural solutions.
            </p>
          </div>
          <motion.div
            className="mt-8 flex flex-col space-y-3 items-stretch sm:flex-row sm:space-y-0 sm:space-x-4 sm:items-center justify-center md:justify-start"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button 
              size="lg" 
              className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Shop Now
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 rounded-full border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-semibold shadow-sm hover:shadow-md transition-all duration-300"
            >
              See All Products
            </Button>
          </motion.div>
        </motion.div>

        {/* Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Prev/Next controls */}
          <button
            onClick={() => scrollCarousel('prev')}
            className="hidden md:flex absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Previous Product"
          >
            <ArrowLeft className="h-6 w-6 text-blue-600" />
          </button>
          <button
            onClick={() => scrollCarousel('next')}
            className="hidden md:flex absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Next Product"
          >
            <ArrowRight className="h-6 w-6 text-blue-600" />
          </button>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 sm:gap-6 lg:gap-8 py-4 px-2 scrollbar-none" // Added py-4 for shadow visibility
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                custom={index} // For staggered animation
                variants={cardVariants}
                initial="hidden" // For individual card animation on scroll into view (if section `whileInView` is not used)
                whileInView="visible" // Animate when card enters viewport
                viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of card is visible
                className="
                  relative flex-shrink-0 group
                  w-[70vw]        sm:w-64      md:w-72    lg:w-[22rem] 
                  h-auto aspect-[3/4] // Maintain aspect ratio
                  bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out
                  snap-start overflow-hidden cursor-pointer
                "
              >
                <img
                  src={product.src}
                  alt={product.alt}
                  className="w-full h-2/3 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow h-1/3">
                  <div>
                    <h3 className="font-semibold text-lg md:text-xl text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm md:text-base">{product.price}</p>
                  </div>
                  {product.hasIcon && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-4 right-4 bg-white/70 backdrop-blur-sm rounded-full text-blue-600 hover:bg-white hover:text-blue-700 transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"
                      aria-label="View Product Details"
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </Button>
                  )}
                </div>
                {/* Optional: Quick Add to cart button */}
                <Button
                  variant="default"
                  className="absolute bottom-4 left-4 bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out"
                >
                  Add to Cart
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}