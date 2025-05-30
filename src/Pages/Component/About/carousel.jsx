import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import one from '../../../assets/Images/dog.jpg'
import two from '../../../assets/Images/lab.png'
import three from '../../../assets/Images/cat.png'
import four from '../../../assets/Images/fish.png'
import five from '../../../assets/Images/buf.png'
import six from '../../../assets/Images/sheep.jpg'

const FloralCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      id: 1,
      title: "",
      image: one,
      bgColor: "from-teal-300 to-green-400" // This bgColor is now not directly used for card background
    },
    {
      id: 2,
      title: "",
      image: two,
      bgColor: "from-purple-400 via-pink-500 to-red-500"
    },
    {
      id: 3,
      title: "",
      image: three,
      bgColor: "from-yellow-300 to-orange-400"
    },
    {
      id: 4,
      title: "",
      image: four,
      bgColor: "from-pink-300 to-rose-400"
    },
    {
      id: 5,
      title: "",
      image:    five,
      bgColor: "from-blue-300 to-indigo-400"
    },
    {
      id: 6,
      title: "",
      image: six,
      bgColor: "from-emerald-300 to-teal-400"
    },
    {
      id: 7,
      title: "",
      image: four,
      bgColor: "from-violet-300 to-purple-400"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        handleNext();
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [currentIndex, isAnimating]); // Added handleNext to dependencies

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const getSlidePosition = (slideIndex) => {
    const diff = (slideIndex - currentIndex + slides.length) % slides.length;
    
    if (diff === 0) return 0;
    if (diff === 1) return 1;
    if (diff === slides.length - 1) return -1;
    if (diff === 2) return 2;
    if (diff === slides.length - 2) return -2;
    return 3;
  };

  return (
    // MODIFIED: Page background gradient
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-purple-100 to-sky-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="relative w-full max-w-7xl">
        {/* Carousel Container */}
        <div className="relative h-[600px] flex items-center justify-center">
          {slides.map((slide, index) => {
            const position = getSlidePosition(index);
            const isVisible = Math.abs(position) <= 2;

            return (
              <div
                key={slide.id}
                className={`absolute transition-all duration-700 ease-out cursor-pointer ${
                  isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                style={{
                  transform: `
                    translateX(${position * 280}px)
                    translateZ(${position === 0 ? 0 : -150}px)
                    scale(${
                      position === 0 ? 1 :
                      Math.abs(position) === 1 ? 0.8 :
                      0.6
                    })
                  `,
                  zIndex: position === 0 ? 10 : 5 - Math.abs(position),
                  filter: position === 0 ? 'none' : ``
                }}
                onClick={() => {
                  if (position === 1) handleNext();
                  else if (position === -1) handlePrev();
                  else if (position !== 0) goToSlide(index);
                }}
              >
                <div className={`
                  relative rounded-3xl overflow-hidden shadow-2xl
                  ${position === 0 ? 'w-80 h-[500px]' : 
                    Math.abs(position) === 1 ? 'w-64 h-96' : 
                    'w-48 h-72'}
                  transition-all duration-700
                `}>
                  {/* MODIFIED: Removed slide.bgColor. Added a subtle dark overlay for text contrast. */}
                  {/* The original `opacity-80` on an empty div had no visual effect. */}
                  {/* This overlay is optional, remove if not desired. */}
                  <div className="absolute inset-0 bg-black opacity-10"></div>
                  
                  <img
                    src={slide.image}
                    alt={slide.title || `Slide ${slide.id}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <h2 className={`
                      font-extralight tracking-widest text-white drop-shadow-2xl text-center break-words
                      ${position === 0 ? 'text-6xl' : 
                        Math.abs(position) === 1 ? 'text-4xl' : 
                        'text-3xl'}
                      transition-all duration-700
                    `}>
                      {slide.title}
                    </h2>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-0 md:left-8 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 z-20"
          disabled={isAnimating}
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 md:right-8 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-white/30 transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 z-20"
          disabled={isAnimating}
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-gray-600 shadow-lg scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
              }`}
              disabled={isAnimating}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-pink-200 to-purple-300 rounded-full opacity-30 blur-xl animate-pulse -z-10" />
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-blue-200 to-teal-300 rounded-full opacity-25 blur-xl animate-pulse -z-10" />
        <div className="absolute top-20 right-20 w-14 h-14 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full opacity-20 blur-xl animate-pulse -z-10" />
      </div>
    </div>
  );
};

export default FloralCarousel;