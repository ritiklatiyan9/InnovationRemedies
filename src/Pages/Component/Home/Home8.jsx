import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Your original image imports
import one from '../../../assets/Images/buffalo.png';
import three from '../../../assets/Images/dogs.png';
import two from '../../../assets/Images/cow.jpg';
import sheep from '../../../assets/Images/sheep.png';
import cats from '../../../assets/Images/cat.png';
import fish from '../../../assets/Images/fish.png';

const cardsData = [
  { id: 1, title: "BUFFALO", imageUrl: one },
  { id: 2, title: "COWS", imageUrl: two },
  { id: 3, title: "DOGS", imageUrl: three },
  { id: 4, title: "SHEEPS", imageUrl: sheep },
  { id: 5, title: "CATS", imageUrl: cats },
  { id: 6, title: "FISHES", imageUrl: fish },
];

const AUTO_SLIDE_INTERVAL = 4000; // 4 seconds
const CARD_WIDTH = 240; // in pixels
const CARD_HEIGHT = 320; // in pixels
const RADIUS = 280; // Circle radius

const CreativeCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Effect for automatic sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % cardsData.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Calculate circular positioning for each card
  const getCardStyle = (index) => {
    const numItems = cardsData.length;
    const angleStep = (2 * Math.PI) / numItems;
    const currentAngle = angleStep * index;
    
    // Rotate the entire circle so active card is at the top-center
    const rotationOffset = -angleStep * activeIndex + Math.PI / 2;
    const adjustedAngle = currentAngle + rotationOffset;
    
    // Calculate position on circle
    const x = Math.cos(adjustedAngle) * RADIUS;
    const y = Math.sin(adjustedAngle) * RADIUS * 0.6; // Flatten the circle slightly
    
    // Calculate distance from active position (top center)
    const distanceFromActive = Math.abs(((index - activeIndex + numItems) % numItems) - numItems / 2);
    const normalizedDistance = Math.min(distanceFromActive, numItems - distanceFromActive) / (numItems / 2);
    
    // Scale and opacity based on position
    const scale = 1 - normalizedDistance * 0.3;
    const opacity = 1 - normalizedDistance * 0.4;
    
    // Rotation for 3D effect
    const rotateY = (x / RADIUS) * 25;
    const rotateX = -(y / (RADIUS * 0.6)) * 15;
    
    // Z-index - higher for cards closer to center
    const zIndex = Math.round((1 - normalizedDistance) * 100);
    
    return {
      x: x,
      y: y,
      scale: scale,
      opacity: Math.max(opacity, 0.3),
      rotateY: rotateY,
      rotateX: rotateX,
      zIndex: zIndex,
    }; 
  };

  if (!cardsData || cardsData.length === 0) {
    return (
      <div className="bg-gray-100 flex justify-center items-center min-h-screen">
        <p>No items to display in the carousel.</p>
      </div>
    );
  }

  return (
    <div className="bg-green-100   flex flex-col justify-center items-center min-h-screen w-full overflow-hidden py-16">
      {/* Container for the circular carousel */}
      <div
        className="relative flex items-center justify-center"
        style={{ 
          height: `${CARD_HEIGHT + RADIUS * 1.2}px`, 
          width: `${RADIUS * 2.5}px`,
          perspective: '1000px'
        }}
      >
        {cardsData.map((card, index) => (
          <motion.div
            key={card.id}
            className="absolute cursor-pointer rounded-2xl shadow-xl bg-white overflow-hidden border border-gray-200"
            style={{
              width: `${CARD_WIDTH}px`,
              height: `${CARD_HEIGHT}px`,
              transformStyle: 'preserve-3d',
            }}
            animate={getCardStyle(index)}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 25,
              duration: 0.8
            }}
            onClick={() => setActiveIndex(index)}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
            <img
              src={card.imageUrl}
              alt={card.title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay for better depth effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50" />
            
            {/* Card title overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white text-sm font-medium drop-shadow-lg">
                {card.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="flex space-x-2 mt-8 mb-8">
        {cardsData.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-gray-800 w-6' 
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* Text content below the carousel */}
      <div className="text-center mt-8">
        <p className="text-gray-500 text-sm sm:text-base mb-2">
         Our Working Arena
        </p>
        <p className="text-gray-800 text-lg sm:text-xl font-medium tracking-wide">
          
        </p>
      </div>
    </div>
  );
};

export default CreativeCarousel;