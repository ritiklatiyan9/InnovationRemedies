import React from 'react';
import { Button } from '@/components/ui/button'; // Adjust import path if needed
import { Card, CardContent } from '@/components/ui/card'; // Adjust import path, CardHeader, CardTitle, CardDescription removed as not used in cards
// Avatar components were imported but not used in the original or the request, so I'll keep them commented or remove if not needed later.
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import BG_IMAGE_URL from '../../../assets/Images/iko.png'; // <<< REPLACE WITH YOUR ACTUAL IMAGE PATH
const customFontStyle5 = {
  fontFamily: "'Qrada Personal Use', sans-serif",
  fontWeight: 600,
  fontStyle: "normal",
};
const customFontStyle3 = {
  fontFamily: "'Neue Montreal Regular', sans-serif",
  fontWeight: 600,
  fontStyle: "normal",
};


const FreightHero = () => {
  return (
    <div
      className="relative flex items-center h-screen md:h-[800px] w-full bg-cover bg-center text-white overflow-hidden"
      style={{ backgroundImage: `url(${BG_IMAGE_URL})` }}
    >
      {/* Background Overlay - Adjusted gradient direction for left-aligned text */}
      <div style={customFontStyle3} className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
      {/* Alternative simpler overlay: <div className="absolute inset-0 bg-black/60"></div> */}

      {/* Main Content - Adjusted to 'items-start' for left alignment */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 flex flex-col justify-center items-start h-full w-full">

        {/* Left Side Content - Adjusted 'text-left' */}
        <div style={customFontStyle3} className="max-w-xl md:max-w-2xl lg:max-w-3xl space-y-6 text-left"> {/* Increased max-width for better text flow */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            We Care About Your Animals
          </h1>
          <p style={customFontStyle3} className="text-lg md:text-xl text-gray-200 max-w-lg"> {/* Adjusted max-width for paragraph */}
            We make products with love and care for your animals. We are here to help you with your animals.
          </p>
        
        </div>

        {/* --- Absolutely Positioned Cards --- */}

        {/* Info Card 1 (Bottom Left) */}
        <Card className="absolute bottom-8 md:bottom-12 lg:bottom-16 left-4 sm:left-6 md:left-8 lg:left-16 w-72 sm:w-80 bg-gray-900/80 backdrop-blur-sm border-gray-700 text-white p-4 shadow-xl">
           <CardContent className="p-0 flex items-center justify-between space-x-3">
             <div className="space-y-1">
                <p className="text-xs uppercase text-gray-400 tracking-wider">Unlocking</p>
                <p className="font-semibold text-sm md:text-base">Power of Better Health Care</p>
             </div>
             {/* Optional: Add an icon here if desired */}
           </CardContent>
        </Card>

        {/* Info Card 2 (Bottom Right - remains, can be adjusted if it feels too far or clashes with some background elements) */}
        <Card className="hidden md:block absolute bottom-8 md:bottom-12 lg:bottom-16 right-4 sm:right-6 md:right-8 lg:right-16 w-auto bg-gray-900/80 backdrop-blur-sm border-gray-700 text-white p-4 shadow-xl">
            <CardContent className="p-0 flex items-center space-x-4 md:space-x-6">
               {/* Origin */}
               <div className="text-center">
                  <p className="text-xs md:text-sm font-semibold">Innovation Remedies</p>
                  <p className="text-xs text-gray-400 mt-0.5">Life Science</p>
               </div>

               {/* Separator Line */}
               <div className="flex items-center space-x-1">
                 <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-blue-500 rounded-full border-2 border-gray-900/80"></div>
                 <div className="w-12 md:w-16 h-px bg-gray-600"></div>
                 <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-gray-600 rounded-full border-2 border-gray-900/80"></div>
               </div>

               {/* Destination */}
               <div className="text-center">
                 <p className="text-xs md:text-sm font-semibold">A Better World</p>
                 <p className="text-xs text-gray-400 mt-0.5">Better Health</p>
               </div>
            </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default FreightHero;