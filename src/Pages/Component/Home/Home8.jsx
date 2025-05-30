import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ArrowUpRight } from "lucide-react";
import one from '../../../assets/Images/buf.png'; // Double-check this path!
import three from '../../../assets/Images/dog.jpg'; // Double-check this path!
import two from '../../../assets/Images/cow.png'; // Double-check this path!
import sheep from '../../../assets/Images/sheep.jpg'; // Double-check this path!
import cats from '../../../assets/Images/cat.png'; // Double-check this path!
import fish from '../../../assets/Images/fish.png'; // Double-check this path!
const customStyle = {
  fontFamily: "Libreville-Free, sans-serif",
  fontWeight: "400",
}

// Sample Data
const testimonialsData = [
  { id: 1, name: "", title: "BUFFALO", companyUrl: "", imageUrl: one, rating: 5, bgColorClass: "bg-gradient-to-br from-red-400 to-red-600" },
  { id: 2, name: "", title: "COWS", companyUrl: "", imageUrl: two, rating: 5, bgColorClass: "bg-gradient-to-br from-yellow-300 to-yellow-500" },
  { id: 3, name: "", title: "DOGS", companyUrl: "", imageUrl: three, rating: 5, bgColorClass: "bg-gradient-to-br from-sky-400 to-sky-600" },
  { id: 4, name: "", title: "SHEEPS", companyUrl: "", imageUrl: sheep, rating: 4, bgColorClass: "bg-gradient-to-br from-gray-600 to-gray-800" },
  { id: 5, name: "", title: "CATS", companyUrl: "", imageUrl: cats, rating: 5, bgColorClass: "bg-gradient-to-br from-green-400 to-green-600" },
  { id: 6, name: "", title: "FISHES", companyUrl: "", imageUrl: fish, rating: 5, bgColorClass: "bg-gradient-to-br from-blue-400 to-blue-600" },
];

const AUTO_SLIDE_INTERVAL = 3000;

const TestimonialCard = ({ item, isActive }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0.7 }}
      animate={{ 
        scale: isActive ? 1 : 0.9, 
        opacity: isActive ? 1 : 0.7 
      }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className={`relative w-full aspect-[4/3] rounded-2xl h-96 overflow-hidden shadow-2xl ${item.bgColorClass || 'bg-gray-300'}`}
    >
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white">Image N/A</div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0" />
      
      <motion.a
        href={`https://${item.companyUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-3 rounded-full cursor-pointer hover:bg-white/30 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Visit ${item.companyUrl}`}
      >
        <ArrowUpRight className="w-5 h-5" />
      </motion.a>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex mb-3 gap-1">
          {Array(0)
            .fill(0)
            .map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400 fill-gray-400"}`}
              />
            ))}
        </div>
        <h3 className="text-xl font-bold mb-1">{item.name}</h3>
        <p className="text-4xl opacity-90">
          {item.title} • {item.companyUrl}
        </p>
      </div>
    </motion.div>
  );
};

const TestimonialCarousel = () => {
  const numItems = testimonialsData.length;

  const extendedData = useMemo(() => {
    if (numItems === 0) return [];
    const dataWithUniqueKeys = (data, setNumber) => 
        data.map(item => ({...item, uniqueKey: `${item.id}-${setNumber}`}));

    return [
        ...dataWithUniqueKeys(testimonialsData, 0), 
        ...dataWithUniqueKeys(testimonialsData, 1), 
        ...dataWithUniqueKeys(testimonialsData, 2)
    ];
  }, [numItems]);

  const [carouselIndex, setCarouselIndex] = useState(numItems);
  const [logicalIndex, setLogicalIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isWrapping, setIsWrapping] = useState(false);
  const [currentTransition, setCurrentTransition] = useState({
    type: "tween",
    duration: 0.5,
    ease: "easeInOut",
  });

  useEffect(() => {
    const handleResize = () => {
      // Tailwind breakpoints: sm: 640px, lg: 1024px
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const changeSlide = useCallback((direction) => {
    if (isWrapping || numItems === 0) return;
    setCurrentTransition({ type: "tween", duration: 0.5, ease: "easeInOut" });
    setCarouselIndex(prev => prev + direction);
  }, [isWrapping, numItems]);

  const nextSlide = useCallback(() => changeSlide(1), [changeSlide]);
  const prevSlide = useCallback(() => changeSlide(-1), [changeSlide]);

  const goToSlide = useCallback((targetLogicalDotIndex) => {
    if (isWrapping || numItems === 0) return;
    setCurrentTransition({ type: "tween", duration: 0.5, ease: "easeInOut" });
    const newCarouselIndex = numItems + targetLogicalDotIndex;
    setCarouselIndex(newCarouselIndex);
  }, [isWrapping, numItems]);

  useEffect(() => {
    if (isHovering || isWrapping || numItems === 0) return;
    const timer = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [nextSlide, isHovering, isWrapping, numItems]);

  useEffect(() => {
    if (numItems === 0) return;
    const newLogicalIndex = (Math.round(carouselIndex) % numItems + numItems) % numItems;
    setLogicalIndex(newLogicalIndex);
  }, [carouselIndex, numItems]);

  const handleAnimationComplete = () => {
    if (numItems === 0) return;
    
    const currentActualIndex = Math.round(carouselIndex);
    if (currentActualIndex < numItems || currentActualIndex >= numItems * 2) {
      setIsWrapping(true);
      setCurrentTransition({ duration: 0 });
      const newLogicalIdx = (currentActualIndex % numItems + numItems) % numItems;
      setCarouselIndex(numItems + newLogicalIdx);
      
      requestAnimationFrame(() => {
          setIsWrapping(false);
      });
    } else {
        if (isWrapping) setIsWrapping(false);
    }
  };
  
  const getTransformPercentage = () => {
    if (extendedData.length === 0 || visibleCards === 0) return 0;
    return (carouselIndex * 100) / extendedData.length;
  };

  if (numItems === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-green-950 to-sky-900 py-16 flex justify-center items-center min-h-screen px-4">
        <p className="text-white">No testimonials to display.</p>
      </div>
    );
  }
  
  return (
    <div style={customStyle} className="bg-gradient-to-br from-slate-900 via-green-950 to-sky-900 py-8 sm:py-12 lg:py-16 flex justify-center items-center md:min-h-screen px-4 ">
      <div
        className="w-full max-w-8xl bg-white/10 backdrop-blur-xl p-6 sm:p-8 lg:p-12 rounded-3xl shadow-2xl border border-white/20"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="text-2xl ml-8 sm:text-3xl lg:text-4xl font-bold text-white mb-2">
              WE SERVERS FOR 
            </h2>
           
          </div>
          <div className="flex gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.25)" }}
              whileTap={{ scale: 0.95 }}
              onClick={prevSlide}
              className="p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-md text-white transition-colors duration-300 border border-white/20"
              aria-label="Previous testimonial"
              disabled={isWrapping}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.25)" }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
              className="p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-md text-white transition-colors duration-300 border border-white/20"
              aria-label="Next testimonial"
              disabled={isWrapping}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </div>
        </div>

        <div className="relative overflow-hidden"> {/* This div defines the viewport for the carousel */}
          <motion.div
            className="flex" // Removed gap here, spacing handled by padding inside items
            animate={{ x: `-${getTransformPercentage()}%` }}
            transition={currentTransition}
            onAnimationComplete={handleAnimationComplete}
            // Track width: calculated to hold all items, where each group of 'visibleCards' fits the viewport
            style={{ width: visibleCards > 0 && extendedData.length > 0 ? `${(extendedData.length * 100) / visibleCards}%` : '100%' }}
          >
            {extendedData.map((item, index) => {
              const isActive = index >= Math.round(carouselIndex) && index < Math.round(carouselIndex) + visibleCards;
              
              return (
                <div
                  key={item.uniqueKey}
                  className="flex-shrink-0"
                  // Item slot width: each slot takes up 1/visibleCards of the viewport width
                  // This is achieved by setting its width as a percentage of the track's total width.
                  style={{ width: extendedData.length > 0 ? `${100 / extendedData.length}%` : '0%' }}
                >
                  {/* Padding here creates the visual gap between cards */}
                  <div className="px-2 sm:px-3"> {/* e.g., 0.5rem padding L/R on mobile, 0.75rem L/R on sm+ */}
                    <TestimonialCard 
                      item={item} 
                      isActive={isActive}
                    />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {Array(numItems)
            .fill(0)
            .map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === logicalIndex 
                    ? 'w-6 sm:w-8 bg-white' 
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                whileHover={{ scale: index === logicalIndex ? 1 : 1.5, backgroundColor: index !== logicalIndex ? "rgba(255,255,255,0.5)" : undefined }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to testimonial ${index + 1}`}
                disabled={isWrapping}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;