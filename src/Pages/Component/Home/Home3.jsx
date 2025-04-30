// src/components/MasterpieceDisplay.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import maintwo from '../../../assets/Images/twelve.png';

const MasterpieceDisplay = () => {
  const navigate = useNavigate();

  // Build the first six cards from your shared products array
  const cardImages = products.slice(0, 6).map((p, idx) => ({
    id:          p.id,
    src:         p.imageUrl,
    alt:         p.name,
    artist:      p.description,
    price:       `₹${p.price.toFixed(2)}`,
    year:        '',
    medium:      '',
    z:           (idx + 1) * 10,
    rotate:     -25 + idx * 10,
    x:         -50 + idx * 20,
    y:           0,
    shadowColor: p.color,
  }));

  const [openCards, setOpenCards]               = useState([]);
  const [isMobile, setIsMobile]                 = useState(false);
  const [hasAnimationPlayed, setHasAnimationPlayed] = useState(false);
  const [detailsOpen, setDetailsOpen]           = useState(false);
  const [selectedCard, setSelectedCard]         = useState(null);

  // Detect mobile layout
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sequential stagger on load
  useEffect(() => {
    if (!hasAnimationPlayed) {
      setHasAnimationPlayed(true);
      setOpenCards([]);
      cardImages.forEach((c, i) =>
        setTimeout(() => setOpenCards(prev => [...prev, c.id]), 1500 * i)
      );
      setTimeout(() => setOpenCards([]), 1500 * cardImages.length + 2000);
    }
  }, [hasAnimationPlayed, cardImages]);

  // Mobile card tap handler
  const handleCardSelect = id => {
    if (!isMobile) return;
    if (selectedCard === id) {
      setDetailsOpen(!detailsOpen);
    } else {
      setSelectedCard(id);
      setDetailsOpen(true);
    }
  };
  const closeDetails = () => setDetailsOpen(false);

  // Shadow & transform helpers
  const hexToRgb = hex => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return `${r}, ${g}, ${b}`;
  };
  const getCardShadowStyle = card => (
    isMobile
      ? {}
      : {
          boxShadow: `0 10px 25px -5px rgba(0,0,0,0.1), 0 0 15px ${card.shadowColor}55`,
          position: 'relative',
          transition: 'box-shadow .4s ease-out',
        }
  );
  const getTransformStyle = card => {
    const open = openCards.includes(card.id);
    if (isMobile) {
      if (open && !selectedCard) {
        return { zIndex: 90 - card.id, transform: 'none', transition: 'all .8s cubic-bezier(0.34,1.56,0.64,1)' };
      }
      return { zIndex: card.z, transform: 'none', transition: 'all .5s cubic-bezier(0.34,1.56,0.64,1)' };
    } else {
      if (open && !selectedCard) {
        return {
          zIndex: card.z,
          transform: `translateX(${card.x * 1.2}%) translateY(${card.y - 10}%) rotate(${card.rotate * 0.7}deg) scale(1.2)`,
          transition: 'all .8s cubic-bezier(0.34,1.56,0.64,1)',
        };
      }
      return {
        zIndex: card.z,
        transform: `translateX(${card.x}%) translateY(${card.y}%) rotate(${card.rotate}deg)`,
        transition: 'all .5s cubic-bezier(0.34,1.56,0.64,1)',
      };
    }
  };
  const selectedCardData = cardImages.find(c => c.id === selectedCard);

  // CSS-in-JS for BG & animations
  const styleAndAnimations = `
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
    @keyframes flowAnimation {
      0% { transform: translateX(-5%) translateY(0) rotate(0deg); }
      50% { transform: translateX(5%) translateY(-2%) rotate(0.5deg); }
      100% { transform: translateX(-5%) translateY(0) rotate(0deg); }
    }
    .svg-flow {
      position: absolute; top: 0; left: 0;
      width: 100%; height: 100%;
      opacity: 0.1;
      pointer-events: none;
      animation: flowAnimation 20s ease-in-out infinite;
    }
    @keyframes slideInFromRight { 0% { transform: translateX(100%); } 100% { transform: translateX(0); } }
    @keyframes slideOutToRight { 0% { transform: translateX(0); } 100% { transform: translateX(100%); } }
    .slide-in { animation: slideInFromRight 0.3s forwards; }
    .slide-out { animation: slideOutToRight 0.3s forwards; }
    .custom-card { position: relative; }
  `;

  // SVG background flow
  const FlowSVG = () => (
    <svg className="svg-flow" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg">
      {/* … your three <path> elements here … */}
    </svg>
  );

  return (
    <div className="relative overflow-hidden min-h-screen py-16 px-4 flex flex-col items-center justify-center rounded-2xl m-4 md:m-8 animated-gradient-bg">
      <style>{styleAndAnimations}</style>
      <FlowSVG />

      {/* … your bubbles & headline … */}

      {isMobile ? (
        <div className="w-full relative">
          <div className="grid grid-cols-2 gap-4 mb-16">
            {cardImages.map(card => (
              <div
                key={card.id}
                className={`relative cursor-pointer transition-transform duration-300 ${
                  selectedCard === card.id ? 'scale-105' : ''
                }`}
                onClick={() => handleCardSelect(card.id)}
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className={`w-full h-48 rounded-lg object-cover bg-white shadow-sm ${
                    selectedCard === card.id ? 'border-2 border-blue-500' : 'border border-gray-200'
                  }`}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 rounded-b-lg text-center text-xs">
                  {card.alt}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile detail panel */}
          {selectedCard && (
            <div
              className={`fixed inset-0 bg-black bg-opacity-50 z-[150] flex items-center justify-center ${
                detailsOpen ? 'visible' : 'invisible'
              }`}
              onClick={closeDetails}
            >
              <div
                className={`absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-lg p-6 ${
                  detailsOpen ? 'slide-in' : 'slide-out'
                }`}
                onClick={e => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={closeDetails}
                >
                  {/* X icon */}
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
                    <div className="w-12 h-1 bg-blue-500 mb-3" />
                    <p className="text-gray-900 text-lg font-bold mt-4">{selectedCardData.price}</p>
                    <button
                      className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm"
                      onClick={() => navigate(`/product/${selectedCardData.id}`)}
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <p className="text-center text-gray-500 text-xs mt-4">Tap any product to view details</p>
        </div>
      ) : (
        <div className="relative w-full h-[400px] md:h-[420px] flex items-center justify-center mb-24 md:mb-36">
          {cardImages.map(card => (
            <div key={card.id} className="absolute custom-card" style={getTransformStyle(card)}>
              <img
                src={card.src}
                alt={card.alt}
                className="w-[160px] h-[224px] md:w-[180px] md:h-[252px] lg:w-[200px] lg:h-[280px] rounded-lg md:rounded-xl object-cover bg-white transition-all duration-300 ease-out border border-gray-200"
                style={getCardShadowStyle(card)}
              />
              <div
                className="absolute inset-0 rounded-lg md:rounded-xl opacity-10 pointer-events-none"
                style={{ background: `linear-gradient(to bottom, ${card.shadowColor} 0%, transparent 70%)` }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-1 rounded-b-lg md:rounded-b-xl text-center text-xs z-[5]">
                {card.alt} — {card.price}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer image & text */}
      <div className="w-full">
        <img className="w-full h-full" src={maintwo} alt="" />
      </div>
      <p className="text-center text-gray-700 max-w-lg text-sm md:text-base relative z-10 mt-4">
        अपने पशुधन की भलाई के लिए बनाए गए हमारे भरोसेमंद उत्पादों को देखें।
      </p>
    </div>
  );
};

export default MasterpieceDisplay;
