import React, { useState, useEffect } from 'react';
import makkhiinjection from '../../../assets/Images/nineteen.png';
import one from '../../../assets/Images/one.png';
import r3 from '../../../assets/Images/R3.png';
import calfshakti from '../../../assets/Images/thirteen.png';
import racerkit from '../../../assets/Images/two.png';
import urocenta from '../../../assets/Images/three.png';
import maintwo from '../../../assets/Images/twelve.png';

// Reduced to 6 cards with more detailed information
const cardImages = [
  {
    id: 1,
    src: makkhiinjection,
    alt: 'Makkhi Injection',
    artist: 'Protection from Flies',
    price: '$150',
    year: '2024',
    medium: 'Oil on Canvas',
    z: 10,
    rotate: -25,
    x: -50, // Adjusted spacing to be closer
    y: 0,
    shadowColor: '#ff5e5e' // Red shadow
  },
  {
    id: 2,
    src: one,
    alt: 'Abstract Dreams',
    artist: 'Marcus Wright',
    price: '$1,890',
    year: '2023',
    medium: 'Acrylic on Panel',
    z: 20,
    rotate: -15,
    x: -30, // Adjusted spacing to be closer
    y: -5,
    shadowColor: '#5e8aff' // Blue shadow
  },
  {
    id: 3,
    src:  r3,
    alt: 'Coastal Sunrise',
    artist: 'Sarah Johnson',
    price: '$3,200',
    year: '2024',
    medium: 'Watercolor',
    z: 30,
    rotate: -5,
    x: -10, // Adjusted spacing to be closer
    y: -10,
    shadowColor: '#5effb8' // Green shadow
  },
  {
    id: 4,
    src: calfshakti,
    alt: 'Urban Reflections',
    artist: 'David Lee',
    price: '$2,750',
    year: '2024',
    medium: 'Mixed Media',
    z: 40,
    rotate: 5,
    x: 10, // Adjusted spacing to be closer
    y: -5,
    shadowColor: '#ffd15e' // Yellow shadow
  },
  {
    id: 5,
    src: racerkit,
    alt: 'Serene Meadows',
    artist: 'Lisa Parker',
    price: '$1,950',
    year: '2023',
    medium: 'Oil on Canvas',
    z: 50,
    rotate: 15,
    x: 30, // Adjusted spacing to be closer
    y: 0,
    shadowColor: '#c15eff' // Purple shadow
  },
  {
    id: 6,
    src: urocenta,
    alt: 'Celestial Bodies',
    artist: 'Raj Patel',
    price: '$4,100',
    year: '2024',
    medium: 'Digital Art',
    z: 60,
    rotate: 25,
    x: 50, // Adjusted spacing to be closer
    y: 5,
    shadowColor: '#ff5e9c' // Pink shadow
  }
];

const MasterpieceDisplay = () => {
  // Track which cards should be opened (for sequential animation)
  const [openCards, setOpenCards] = useState([]);
  // Track if we're in mobile view
  const [isMobile, setIsMobile] = useState(false);
  // Track if the auto-animation has played
  const [hasAnimationPlayed, setHasAnimationPlayed] = useState(false);
  // Track if detail panel is open (for mobile)
  const [detailsOpen, setDetailsOpen] = useState(false);
  // Track selected card for mobile view only
  const [selectedCard, setSelectedCard] = useState(null);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Sequential opening animation on page load
  useEffect(() => {
    if (!hasAnimationPlayed) {
      setHasAnimationPlayed(true);

      // Clear any existing cards
      setOpenCards([]);

      // Add each card with a delay
      cardImages.forEach((card, index) => {
        setTimeout(() => {
          setOpenCards(prev => [...prev, card.id]);
        }, 1500 * index);
      });

      // After all cards have been shown, reset after a delay
      setTimeout(() => {
        setOpenCards([]);
      }, 1500 * cardImages.length + 2000);
    }
  }, [hasAnimationPlayed]);

  // Handle card selection (mobile only)
  const handleCardSelect = (cardId) => {
    if (isMobile) {
      if (selectedCard === cardId) {
        // If same card is tapped again, toggle details panel
        setDetailsOpen(!detailsOpen);
      } else {
        // New card selected, open details panel
        setSelectedCard(cardId);
        setDetailsOpen(true);
      }
    }
  };

  // Close details panel for mobile
  const closeDetails = () => {
    setDetailsOpen(false);
  };

  // Helper function to generate transform style without hover effect
  const getTransformStyle = (card) => {
    const isOpen = openCards.includes(card.id);

    // Mobile styles
    if (isMobile) {
      // Sequential animation effect for initial load
      if (isOpen && !selectedCard) {
        return {
          zIndex: 90 - card.id,
          transform: `translateX(0%) translateY(0%) rotate(0deg) scale(1)`,
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
        };
      }
      // Default mobile style (simple grid layout)
      return {
        zIndex: card.z,
        transform: 'none',
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
      };
    }

    // Desktop styles
    else {
      // Sequential animation effect
      if (isOpen && !selectedCard) {
        return {
          zIndex: card.z,
          transform: `translateX(${card.x * 1.2}%) translateY(${card.y - 10}%) rotate(${card.rotate * 0.7}deg) scale(1.2)`, // Adjusted scale
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
        };
      }
      // Default state (no selection or hover effect)
      return {
        zIndex: card.z,
        transform: `translateX(${card.x}%) translateY(${card.y}%) rotate(${card.rotate}deg)`,
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
      };
    }
  };

  // Helper function to get the card shadow style (applied to the img)
  const getCardShadowStyle = (card) => {
    // No colored shadow on mobile
    if (isMobile) return {};

    // Convert hex color to rgba for the shadow variable if needed, or use hex directly
    const shadowColorRgb = hexToRgb(card.shadowColor); // Helper function defined below

    return {
      // Apply shadow directly here
      boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 15px ${card.shadowColor}55`, // 55 = 33% alpha
      position: 'relative', // Keep for stacking context if needed, though shadow doesn't require it
      transition: 'box-shadow 0.4s ease-out'
    };
  };

  // Helper function to convert hex color to RGB
  const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return `${r}, ${g}, ${b}`;
  };

  // Find the selected card data (for mobile only)
  const selectedCardData = cardImages.find(card => card.id === selectedCard);

  // Animation for the background gradient - lighter colors
  // Updated with softer colors and added SVG flow background
  const styleAndAnimations = `
    /* Softer gradient with more gentle colors */
    @keyframes gradientBG {
      0% { background-position: 0% 50% }
      50% { background-position: 100% 50% }
      100% { background-position: 0% 50% }
    }
    
    .animated-gradient-bg {
      background: linear-gradient(-45deg, #f8f4f0, #f0f4f8, #f0f8f4, #f8f0f8);
      background-size: 400% 400%;
      animation: gradientBG 30s ease infinite;
      position: relative;
      overflow: hidden;
    }
    
    /* SVG Flow Animation */
    @keyframes flowAnimation {
      0% {
        transform: translateX(-5%) translateY(0) rotate(0deg);
      }
      50% {
        transform: translateX(5%) translateY(-2%) rotate(0.5deg);
      }
      100% {
        transform: translateX(-5%) translateY(0) rotate(0deg);
      }
    }
    
    .svg-flow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.1;
      pointer-events: none;
      animation: flowAnimation 20s ease-in-out infinite;
    }

    /* Mobile slide-in animation */
    @keyframes slideInFromRight {
      0% { transform: translateX(100%); }
      100% { transform: translateX(0); }
    }

    @keyframes slideOutToRight {
      0% { transform: translateX(0); }
      100% { transform: translateX(100%); }
    }

    .slide-in {
      animation: slideInFromRight 0.3s forwards;
    }

    .slide-out {
      animation: slideOutToRight 0.3s forwards;
    }

    .custom-card {
      position: relative;
    }
  `;

  // SVG Flow Pattern Component
  const FlowSVG = () => (
    <svg className="svg-flow" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M0,192L48,208C96,224,192,256,288,245.3C384,235,480,181,576,181.3C672,181,768,235,864,234.7C960,235,1056,181,1152,186.7C1248,192,1344,256,1392,288L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
        fill="#6495ED" 
        fillOpacity="0.2"
      />
      <path 
        d="M0,384L48,373.3C96,363,192,341,288,309.3C384,277,480,235,576,229.3C672,224,768,256,864,250.7C960,245,1056,203,1152,197.3C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
        fill="#8A2BE2" 
        fillOpacity="0.1"
      />
      <path 
        d="M0,128L48,144C96,160,192,192,288,176C384,160,480,96,576,96C672,96,768,160,864,176C960,192,1056,160,1152,160C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" 
        fill="#20B2AA" 
        fillOpacity="0.15"
      />
    </svg>
  );

  return (
    <div className="relative overflow-hidden min-h-screen py-16 px-4 flex flex-col items-center justify-center rounded-2xl m-4 md:m-8 animated-gradient-bg">
      {/* Add the CSS styles and animations */}
      <style>{styleAndAnimations}</style>
      
      {/* SVG Flow Background */}
      <FlowSVG />

      {/* Username Bubbles */}
      <div className="absolute top-[15%] left-[20%] md:left-[30%] transform -translate-x-1/2 -translate-y-1/2 z-50">
        <span className="inline-block bg-blue-500 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-md">
        विश्वास ❤️
        </span>
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[90%] w-3 h-3 bg-blue-500 rotate-45 -mt-1"></div>
      </div>

      <div className="absolute top-[20%] right-[20%] md:right-[30%] transform translate-x-1/2 -translate-y-1/2 z-50">
        <span className="inline-block bg-teal-500 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-md">
        भरोसा ❤️
        </span>
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[90%] w-3 h-3 bg-teal-500 rotate-45 -mt-1"></div>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-12 md:mb-32 relative z-10">
        Products of Trust <br />
        <span className="text-blue-600">Family</span>Care
      </h1>

      {isMobile ? (
        /* Mobile Cards Layout */
        <div className="w-full relative">
          {/* Grid layout for mobile */}
          <div className="grid grid-cols-2 gap-4 mb-16">
            {cardImages.map((card) => (
              <div
                key={card.id}
                className={`relative cursor-pointer transition-all duration-300 ${selectedCard === card.id ? 'scale-105' : ''}`}
                onClick={() => handleCardSelect(card.id)}
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className={`w-full h-48 rounded-lg object-cover bg-white shadow-sm
                          ${selectedCard === card.id ? 'border-2 border-blue-500' : 'border border-gray-200'}`}
                  // Mobile doesn't use getCardShadowStyle, simple shadow-sm is fine
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 rounded-b-lg text-center text-xs">
                  {card.alt}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Detail Panel that slides in from right */}
          {selectedCard && (
            <div
              className={`fixed inset-0 bg-black bg-opacity-50 z-[150] flex items-center justify-center ${detailsOpen ? 'visible' : 'invisible'}`} // Increased z-index
              onClick={closeDetails}
            >
              <div
                className={`absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-lg p-6 ${detailsOpen ? 'slide-in' : 'slide-out'}`} // Increased shadow
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10" // Ensure button is clickable
                  onClick={closeDetails}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {selectedCardData && (
                  <div className="pt-6">
                    <img
                      src={selectedCardData.src}
                      alt={selectedCardData.alt}
                      className="w-full h-64 object-cover rounded-lg shadow-sm mb-4"
                    />
                    <h3 className="text-xl font-bold text-gray-800">{selectedCardData.alt}</h3>
                    <p className="text-sm font-medium text-blue-600 mb-2">{selectedCardData.artist}</p>
                    <div className="w-12 h-1 bg-blue-500 mb-3"></div>
                    <p className="text-gray-600 text-sm mb-1">
                      <span className="font-medium">Medium:</span> {selectedCardData.medium}
                    </p>
                    <p className="text-gray-600 text-sm mb-1">
                      <span className="font-medium">Year:</span> {selectedCardData.year}
                    </p>
                    <p className="text-gray-900 text-lg font-bold mt-4">{selectedCardData.price}</p>
                    <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                      Add to Cart
                    </button>
                    <button className="mt-3 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile instruction */}
          <p className="text-center text-gray-500 text-xs mt-4">
            Tap any artwork to view details
          </p>
        </div>
      ) : (
        /* Desktop Cards Container - Adjusted to be closer together with no hover effects */
        <div className="relative w-full h-[400px] md:h-[420px] flex items-center justify-center mb-24 md:mb-36">
          {cardImages.map((card) => (
            <div
              key={card.id}
              className="absolute custom-card" // Removed cursor-pointer
              style={getTransformStyle(card)}
            >
              <img
                src={card.src}
                alt={card.alt}
                className="w-[160px] h-[224px] md:w-[180px] md:h-[252px] lg:w-[200px] lg:h-[280px]
                        rounded-lg md:rounded-xl object-cover bg-white
                        transition-all duration-300 ease-out border border-gray-200"
                style={getCardShadowStyle(card)}
              />

              {/* Colored gradient overlay - kept for subtle effect */}
              <div
                className="absolute inset-0 rounded-lg md:rounded-xl opacity-10 pointer-events-none"
                style={{
                  background: `linear-gradient(to bottom, ${card.shadowColor} 0%, transparent 70%)`,
                  zIndex: 1,
                  transition: 'opacity 0.3s'
                }}
              ></div>

              {/* Small label that appears on all cards */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-1 rounded-b-lg md:rounded-b-xl text-center text-xs z-[5]">
                {card.alt}
              </div>
            </div>
          ))}
        </div>
      )}
  <div>
    <img className='w-full h-full' src={maintwo} alt="" />
  </div>
      {/* Sub-headline / Description */}
      <p className="text-center text-gray-700 max-w-lg text-sm md:text-base relative z-10 mt-4">
        Discover our trusted range of products designed for the well-being of your livestock family.
      </p>
    </div>
  );
};

export default MasterpieceDisplay;