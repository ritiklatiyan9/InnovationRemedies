import React from 'react';
import { Button } from "@/components/ui/button"; // Adjust path as per your project structure
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Adjust path
import { ChevronRight, Users, MessageSquare, Volume2, BrainCircuit } from 'lucide-react';

const Home4 = () => {
  // Helper function for orbit positioning (approximate)
  // Uses Tailwind classes for absolute positioning.
  // You might need more precise calculations (using transform: rotate/translate) for perfect circles.
  const orbitPositions = [
    { top: 'top-[5%]', left: 'left-[65%]' },   // Top-right-ish (Avatar 1)
    { top: 'top-[10%]', left: 'left-[25%]' },  // Top-left-ish (Icon - Brain)
    { top: 'top-[30%]', left: 'left-[88%]' },  // Right (Avatar 2)
    { top: 'top-[45%]', left: 'left-[5%]' },   // Left (Icon - Users)
    { top: 'top-[65%]', left: 'left-[78%]' },  // Bottom-right-ish (Icon - Volume)
    { top: 'top-[80%]', left: 'left-[15%]' },  // Bottom-left-ish (Avatar 3)
    { top: 'top-[85%]', left: 'left-[50%]', transform: 'transform -translate-x-1/2' }, // Bottom-center (Icon - Chat)
    { top: 'top-[60%]', left: 'left-[40%]' },  // Inner orbit (Avatar 4)
  ];

  const avatarUrls = [
    'https://picsum.photos/seed/person1/40/40',
    'https://picsum.photos/seed/person2/40/40',
    'https://picsum.photos/seed/person3/40/40',
    'https://picsum.photos/seed/person4/40/40',
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-950 text-foreground flex items-center justify-center py-16 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-24">

        {/* Left Column: Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          भरोसा ही हमारे उत्पादों को सबसे बेहतरीन बनाता है। – <br className="hidden lg:inline" />
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-8">
            <Button size="lg" className="px-6 py-3 text-lg">
              Start Journey
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="relative mt-4 sm:mt-0">
              {/* Simple approximation of the bubble - adjust position/style as needed */}
               <span className="inline-flex items-center bg-purple-500 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-md">
                 <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-purple-500"></span>
                 David
               </span>
            </div>
          </div>
        </div>

        {/* Right Column: Orbit Graphic */}
        <div className="md:w-1/2 flex items-center justify-center mt-12 md:mt-0">
          <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]">
            {/* Concentric Circles (Orbits) */}
            {/* We use border color that fits the light theme */}
            <div className="absolute inset-0 border-2 border-purple-200 dark:border-purple-700 rounded-full"></div>
            <div className="absolute inset-[15%] border-2 border-purple-200 dark:border-purple-700 rounded-full"></div>
            <div className="absolute inset-[30%] border-2 border-purple-200 dark:border-purple-700 rounded-full"></div>

            {/* Central Text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-5xl lg:text-6xl font-bold text-purple-800 dark:text-purple-300">20,000+</p>
              <p className="text-4xl text-muted-foreground">Customers</p>
            </div>

            {/* Orbiting Elements - Avatars */}
            <Avatar className={`absolute w-10 h-10 ${orbitPositions[0].top} ${orbitPositions[0].left} border-2 border-pink-300 shadow-lg shadow-pink-500/30`}>
              <AvatarImage src={avatarUrls[0]} alt="User Avatar 1"/>
              <AvatarFallback>U1</AvatarFallback>
            </Avatar>
             <Avatar className={`absolute w-10 h-10 ${orbitPositions[2].top} ${orbitPositions[2].left} border-2 border-pink-300 shadow-lg shadow-pink-500/30`}>
              <AvatarImage src={avatarUrls[1]} alt="User Avatar 2"/>
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <Avatar className={`absolute w-10 h-10 ${orbitPositions[5].top} ${orbitPositions[5].left} border-2 border-pink-300 shadow-lg shadow-pink-500/30`}>
              <AvatarImage src={avatarUrls[2]} alt="User Avatar 3"/>
              <AvatarFallback>U3</AvatarFallback>
            </Avatar>
             <Avatar className={`absolute w-10 h-10 ${orbitPositions[7].top} ${orbitPositions[7].left} border-2 border-pink-300 shadow-lg shadow-pink-500/30`}>
              <AvatarImage src={avatarUrls[3]} alt="User Avatar 4"/>
              <AvatarFallback>U4</AvatarFallback>
            </Avatar>

            {/* Orbiting Elements - Icons */}
            {/* Using dark backgrounds for icons to mimic original, with colored glows */}
            <div className={`absolute p-2.5 bg-gray-800 text-white rounded-lg shadow-lg shadow-blue-500/40 ${orbitPositions[1].top} ${orbitPositions[1].left}`}>
              <BrainCircuit className="w-5 h-5"/>
            </div>
             <div className={`absolute p-2.5 bg-gray-800 text-white rounded-lg shadow-lg shadow-green-500/40 ${orbitPositions[3].top} ${orbitPositions[3].left}`}>
              <Users className="w-5 h-5"/>
            </div>
             <div className={`absolute p-2.5 bg-gray-800 text-white rounded-lg shadow-lg shadow-red-500/40 ${orbitPositions[4].top} ${orbitPositions[4].left}`}>
              <Volume2 className="w-5 h-5"/>
            </div>
             <div className={`absolute p-2.5 bg-gray-800 text-white rounded-lg shadow-lg shadow-purple-500/40 ${orbitPositions[6].top} ${orbitPositions[6].left} ${orbitPositions[6].transform || ''}`}>
              <MessageSquare className="w-5 h-5"/>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Home4;