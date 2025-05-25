import React from 'react';
import { Button } from '@/components/ui/button'; // Adjust import path if needed
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Adjust import path
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Adjust import path


import BG_IMAGE_URL from '../../../assets/Video/uij.png'; // <<< REPLACE

const FreightHero = () => {
  return (
    <div
      className="relative flex items-center h-screen md:h-[800px] w-full md:w-full bg-cover bg-center text-white overflow-hidden"
      style={{ backgroundImage: `url(${BG_IMAGE_URL})` }}
    >
      {/* Background Overlay - Adjusted gradient direction */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-transparent"></div>
      {/* Or a simpler overlay: <div className="absolute inset-0 bg-black/60"></div> */}

      {/* Main Content - Added 'items-end' to push content right */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16 flex flex-col justify-center items-end h-full w-full"> {/* <<< Added items-end */}

        {/* Right Side Content - Added 'text-right' for inner alignment */}
        <div className="max-w-xl space-y-6 text-right"> {/* <<< Added text-right */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            We Care About Your Animals
          </h1>
          <p className="text-lg text-gray-200 ml-auto max-w-md"> {/* Optional: ml-auto ensures it doesn't stretch full width if needed */}
            We Makes Products with Love and Care for Your Animals. We are here to help you with your animals.
          </p>
          {/* You could add buttons here if they belong with the main text */}
          {/* Example:
           <div className="flex justify-end space-x-4 mt-4">
             <Button variant="secondary">Learn More</Button>
             <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold">
               Get Started
             </Button>
           </div>
          */}
        </div>

        {/* --- Absolutely Positioned Cards (Remain in place) --- */}

        {/* Unloading Card (Bottom Left) */}
        <Card className="absolute bottom-10 md:bottom-20 left-4 md:left-10 lg:left-16 w-80 bg-gray-900/80 backdrop-blur-sm border-gray-700 text-white p-4">
           <CardContent className="p-0 flex items-center justify-between space-x-4">
             <div className="space-y-1">
                <p className="text-xs uppercase text-gray-400 tracking-wider">Unlocking</p>
                <p className="font-semibold text-base">Power of Better health Care</p>
             
             </div>
           
           </CardContent>
        </Card>

        {/* Route/Timing Card (Bottom Right) */}
        <Card className="absolute bottom-10 ml-4 md:bottom-20 right-4 md:right-10 lg:right-20 w-auto bg-gray-900/80 backdrop-blur-sm border-gray-700 text-white p-4">
            <CardContent className="p-0 flex items-center space-x-6">
               {/* Origin */}
               <div className="text-center">
                  <p className="text-sm font-semibold">Innovation Remedies Life Science</p>
                
               </div>

               {/* Simple Separator Line */}
               <div className="flex items-center space-x-1">
                 <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-gray-900/80"></div>
                 <div className="w-16 h-px bg-gray-600"></div>
                 <div className="w-3 h-3 bg-gray-600 rounded-full border-2 border-gray-900/80"></div>
               </div>


               {/* Destination */}
               <div className="text-center">
                 <p className="text-sm font-semibold">Better World</p>
                 <p className="text-xs text-gray-400 mt-1">Better Health</p>
                 
               </div>
            </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default FreightHero;