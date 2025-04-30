import React from 'react';
import bgImage from '../../../assets/Video/bg3.jpg'; // ← Adjust path if needed
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, Users, MessageSquare, Volume2, BrainCircuit } from 'lucide-react';

// Define positions more explicitly for clarity
// Format: { top, left, transform?, sizeClass?, isIcon? }
// Use Tailwind arbitrary values for precise positioning if needed
const orbitElements = [
  // Avatars (example positions)
  { top: 'top-[5%]', left: 'left-[65%]', sizeClass: 'w-10 h-10', type: 'avatar', src: 'https://picsum.photos/seed/person1/40/40', alt: 'User Avatar 1' },
  { top: 'top-[30%]', left: 'left-[90%]', sizeClass: 'w-12 h-12', type: 'avatar', src: 'https://picsum.photos/seed/person2/40/40', alt: 'User Avatar 2' },
  { top: 'top-[65%]', left: 'left-[78%]', sizeClass: 'w-10 h-10', type: 'avatar', src: 'https://picsum.photos/seed/person3/40/40', alt: 'User Avatar 3' },
  { top: 'top-[80%]', left: 'left-[15%]', sizeClass: 'w-11 h-11', type: 'avatar', src: 'https://picsum.photos/seed/person4/40/40', alt: 'User Avatar 4' },
  // Icons (example positions)
  { top: 'top-[10%]', left: 'left-[25%]', sizeClass: 'w-10 h-10', type: 'icon', Icon: BrainCircuit, color: 'blue', label: 'AI Processing' },
  { top: 'top-[45%]', left: 'left-[5%]', sizeClass: 'w-10 h-10', type: 'icon', Icon: Users, color: 'green', label: 'Community' },
  { top: 'top-[85%]', left: 'left-[50%]', transform: 'transform -translate-x-1/2', sizeClass: 'w-12 h-12', type: 'icon', Icon: MessageSquare, color: 'purple', label: 'Communication' },
  { top: 'top-[60%]', left: 'left-[40%]', sizeClass: 'w-10 h-10', type: 'icon', Icon: Volume2, color: 'red', label: 'Audio Features' },
];

// Helper map for icon colors (Tailwind classes)
const iconColorMap = {
  blue: 'bg-blue-600/80 shadow-blue-500/50',
  green: 'bg-green-600/80 shadow-green-500/50',
  purple: 'bg-purple-600/80 shadow-purple-500/50',
  red: 'bg-red-600/80 shadow-red-500/50',
};

const Home4 = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center overflow-hidden" // Added overflow-hidden
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Enhanced Dimming overlay - subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70"></div>

      {/* Content wrapper - Increased padding and gap */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen px-6 sm:px-10 lg:px-16 py-20 gap-12 md:gap-8">

        {/* Left Column - Improved text styling and spacing */}
        <div className="md:w-1/2 text-center md:text-left space-y-8 max-w-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-md">
            भरोसा ही हमारे उत्पादों को सबसे बेहतरीन बनाता है।
          </h1>
          <p className="text-lg text-gray-300 drop-shadow-sm">
          हज़ारों संतुष्ट ग्राहकों की तरह आप भी हमारे प्लेटफ़ॉर्म पर निर्भर करें, जो सहज एकीकरण और शक्तिशाली सुविधाएँ प्रदान करता है। भरोसे का अनुभव कीजिए – फर्क साफ़ नज़र आएगा।
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-5 mt-6">
            <Button size="lg" className="px-8 py-3 bg-slate-300 text-black rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300">
              Start Journey
            
            </Button>
            {/* Refined Tag */}
            <div className="inline-flex items-center">
                <span className="relative inline-flex items-center bg-indigo-500 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-md">
                    <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0
                                    border-t-[6px] border-t-transparent
                                    border-b-[6px] border-b-transparent
                                    border-r-[8px] border-r-indigo-500"></span>
                    From Innovation Remedies
                </span>
            </div>

          </div>
        </div>

        {/* Right Column: Orbit Graphic - Enhanced sizing and animation */}
        <div className="md:w-1/2 flex items-center justify-center mt-12 md:mt-0">
          {/* Orbit Container - Adjusted responsive sizing */}
          <div className="relative
                          w-72 h-72
                          sm:w-96 sm:h-96
                          md:w-[450px] md:h-[450px]
                          lg:w-[550px] lg:h-[550px]">
            {/* Orbits - Adjusted colors, added subtle animation */}
            <div className="absolute inset-0 border-2 border-purple-400/40 dark:border-purple-600/50 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-[20%] border border-purple-400/30 dark:border-purple-600/40 rounded-full animate-spin-medium"></div>
            <div className="absolute inset-[40%] border-2 border-purple-400/40 dark:border-purple-600/50 rounded-full animate-spin-slow-reverse"></div>

            {/* Center Stats - Enhanced text contrast */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-5xl sm:text-6xl md:text-7xl font-bold text-purple-100 dark:text-purple-200 drop-shadow-lg">
                25,000+
              </p>
              <p className="text-xl sm:text-2xl text-purple-200 dark:text-purple-300/80 mt-1">
                Customers
              </p>
            </div>

            {/* Orbiting Elements (Avatars & Icons) */}
            {orbitElements.map((el, i) => (
              <div
                key={i}
                className={`
                  absolute
                  ${el.top}
                  ${el.left}
                  ${el.transform || ''}
                  ${el.sizeClass}
                  flex items-center justify-center
                  animate-float // Add floating animation
                `}
                style={{ animationDelay: `${i * 150}ms` }} // Stagger animation start
              >
                {el.type === 'avatar' ? (
                  <Avatar className="w-full h-full border-2 border-pink-300/70 shadow-lg shadow-pink-500/40">
                    <AvatarImage src={el.src} alt={el.alt} />
                    <AvatarFallback>{el.alt.slice(-2).trim()}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div
                    className={`
                      p-2.5 rounded-lg text-white flex items-center justify-center
                      ${iconColorMap[el.color] || ''}
                      shadow-lg backdrop-blur-sm w-full h-full
                    `}
                    title={el.label} // Tooltip for accessibility
                  >
                    <el.Icon className="w-5/6 h-5/6" /> {/* Scale icon within container */}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home4;

/*
  Add these animations to your tailwind.config.js:

  theme: {
    extend: {
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-medium': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        'spin-slow-reverse': {
           '0%': { transform: 'rotate(0deg)' },
           '100%': { transform: 'rotate(-360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }, // Adjust vertical distance
        },
      },
      animation: {
        'spin-slow': 'spin-slow 40s linear infinite', // Slower orbit rotation
        'spin-medium': 'spin-medium 30s linear infinite', // Medium speed reverse
        'spin-slow-reverse': 'spin-slow-reverse 50s linear infinite', // Even slower reverse
        'float': 'float 4s ease-in-out infinite', // Floating animation
      },
    },
  },

*/