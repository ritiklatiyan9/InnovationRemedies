import React from "react";
import { Button } from "@/components/ui/button"; // Adjust path if needed
import { motion } from "framer-motion";
import Home2 from "./Home2";
import Home3 from './Home3'
import Home4 from './Home4'
 import Home6 from './Home6'

import { FlipWords } from "../../../components/ui/flips-words";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // Adjust path
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Adjust path
// Removed unused Input import
import {
  // Removed unused: Search, Bell, Menu, Smile, ExternalLink, ShieldCheck
  HeartPulse, // Vitals
  Activity, // General Activity
  Footprints, // Specific Activity/Movement
  Dog, // Or Cat, depending on branding focus
  PawPrint, // Excellent choice for vet
  BarChart3, // For Analytics
  ArrowRight,
  Check,
  Home, // Used in floating card
} from "lucide-react";

const VetWellbeingDashboardRedesigned = () => {
  const words = ["World", "Care", "Family", "Health"];

  // Animation definition for HeartPulse (Beat)
  const heartBeatAnimation = {
    scale: [1, 1.15, 1], // Scale up slightly and back down
    transition: {
      duration: 0.8, // How long one beat takes
      ease: "easeInOut",
      repeat: Infinity, // Loop forever
      repeatType: "mirror", // Go back and forth (1 -> 1.15 -> 1 -> 1.15 ...)
    },
  };

  const activityMoveAnimation = {
    rotate: [0, -4, 4, -4, 0], // Rotate slightly left, right, left, center
    transition: {
      duration: 1, // How long one wiggle cycle takesfli

      ease: "easeInOut",
      repeat: Infinity, // Loop forever
      repeatType: "loop", // Restart the sequence (0 -> -4 -> 4 -> -4 -> 0 -> ...)
    },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-emerald-50/50 to-white text-gray-800 font-sans">
      {/* Use Flexbox for main layout: column on mobile, row on large screens */}
      <div className="flex flex-col lg:flex-row min-h-screen w-full">
        {/* Left Column: Content */}
        <div className="lg:w-1/2 flex flex-col justify-center p-6 sm:p-8 lg:p-12 order-last lg:order-first">
          {" "}
          {/* Adjust padding */}
          <div className="max-w-2xl mx-auto lg:mx-0">
            {" "}
            {/* Constrain content width */}
            {/* Decorative Paw Print */}
            <div className="w-14 h-14 mb-5">
              {" "}
              {/* Slightly smaller, adjusted margin */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-200 to-emerald-200 flex items-center justify-center shadow-md">
                <PawPrint className="w-7 h-7 text-white" />{" "}
                {/* Adjusted size */}
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900 mb-4">
              {" "}
              {/* Adjusted mobile size & margin */}
              Innovation Remedies <br />{" "}
              <span className="text-3xl sm:text-4xl lg:text-5xl">
                Better{" "}
                
                  <FlipWords words={words} /> 
               For 
              </span>
              <br /> {/* Adjusted sizes */}
              <span className="bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Every Animal
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mb-6">
              {" "}
              सर्वश्रेष्ठ उत्पादों का उपयोग करते हुए <span className="text-green-600 text-2xl">पशुओं की भलाई</span> पर लगातार जानकारी प्रदान करना, ताकि आप उनके स्वास्थ्य और खुशहाली को सुनिश्चित कर सकें
            </p>
            {/* Feature Highlights */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              {" "}
              {/* Adjusted gap & margin */}
              {/* --- Health Booster --- */}
              <div className="flex items-center space-x-2 bg-white p-2 px-3 rounded-full shadow-sm border border-gray-100">
                {" "}
                {/* Adjusted padding/spacing */}
                <motion.span
                  className="p-1.5 bg-blue-100 rounded-full text-red-600 flex items-center justify-center" // Added flex centering for the icon within span
                  animate={heartBeatAnimation} // Apply the beat animation
                >
                  <HeartPulse size={16} /> {/* Adjusted size */}
                </motion.span>
                <p className="text-xs sm:text-sm font-medium text-gray-700">
                  Health Booster
                </p>
              </div>
              {/* --- Enhance Activity --- */}
              <div className="flex items-center space-x-2 bg-white p-2 px-3 rounded-full shadow-sm border border-gray-100">
                {" "}
                {/* Adjusted padding/spacing */}
                <motion.span
                  className="p-1.5 bg-emerald-100 rounded-full text-emerald-600 flex items-center justify-center" // Added flex centering for the icon within span
                  animate={activityMoveAnimation} // Apply the move animation
                >
                  <Activity size={16} /> {/* Adjusted size */}
                </motion.span>
                <p className="text-xs sm:text-sm font-medium text-gray-700">
                  Enhance Activity
                </p>
              </div>
            </div>
            {/* Key Features/Insights Section */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                {" "}
                {/* Adjusted size */}
                Quick Insights & Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Card 1: Activity */}
                <Card className="group bg-white/90 backdrop-blur-lg rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100/50 cursor-pointer">
                  {" "}
                  {/* Added group */}
                  <CardContent className="p-4 flex flex-col items-start space-y-2">
                    <div className="flex justify-between items-center w-full">
                      <span className="p-2 bg-gray-800 rounded-lg text-emerald-400">
                        <Footprints size={20} />
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-7 h-7 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform duration-200" // Hover effect on arrow
                      >
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                    <p className="text-sm font-semibold pt-1 text-gray-800">
                      Activity Tracking
                    </p>
                    <p className="text-xs text-gray-500">
                      Monitor daily movement patterns.
                    </p>
                  </CardContent>
                </Card>
                {/* Card 2: Behavior */}
                <Card className="group bg-white/90 backdrop-blur-lg rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100/50 cursor-pointer">
                  {" "}
                  {/* Added group */}
                  <CardContent className="p-4 flex flex-col items-start space-y-2">
                    <div className="flex justify-between items-center w-full">
                      <span className="p-2 bg-gray-800 rounded-lg text-blue-400">
                        <Dog size={20} />
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-7 h-7 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform duration-200" // Hover effect on arrow
                      >
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                    <p className="text-sm font-semibold pt-1 text-gray-800">
                      Behavior Analysis
                    </p>
                    <p className="text-xs text-gray-500">
                      Detect subtle changes & alerts.
                    </p>
                  </CardContent>
                </Card>
                {/* Card 3: Analytics */}
                <Card className="group bg-white/90 backdrop-blur-lg rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100/50 cursor-pointer">
                  {" "}
                  {/* Added group */}
                  <CardContent className="p-4 flex flex-col items-start space-y-2">
                    <div className="flex justify-between items-center w-full">
                      <span className="p-2 bg-gray-800 rounded-lg text-purple-400">
                        <BarChart3 size={20} />
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-7 h-7 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform duration-200" // Hover effect on arrow
                      >
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                    <p className="text-sm font-semibold pt-1 text-gray-800">
                      Health Analytics
                    </p>
                    <p className="text-xs text-gray-500">
                      View trends, reports & insights.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Image and Visual Elements */}
        {/* Takes full height on large screens, 50vh on mobile. Positioned above text on mobile */}
        <div className="relative lg:w-1/2 w-full h-[50vh] lg:h-screen order-first lg:order-last overflow-hidden">
          {/* Background Shapes */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] right-[-20%] w-[80%] h-[80%] bg-gradient-radial from-blue-200/30 via-emerald-100/10 to-transparent rounded-full filter blur-3xl opacity-60"></div>
            <div className="absolute bottom-[-15%] left-[-15%] w-[70%] h-[70%] bg-gradient-radial from-emerald-200/20 via-blue-100/10 to-transparent rounded-full filter blur-3xl opacity-50"></div>
          </div>

          {/* Image - Fills the container using object-cover */}
          <img
            // Replace with your high-quality, relevant veterinary image
            src="https://ogden_images.s3.amazonaws.com/www.motherearthnews.com/images/2010/04/16105811/keeping-a-family-milk-cow.jpg" //  <-- IMPORTANT: Replace this URL
            onError={(e) => {
              e.target.onerror = null;
              // Using a more generic animal placeholder
              e.target.src =
                "https://motherspet.com/blogs/wp-content/uploads/2024/09/animal-and-their-babies-870x490.jpg"; // Replace if needed
            }}
            alt="Animal well-being" // More descriptive alt text
            className="absolute inset-0 w-full h-full object-cover z-10" // Use object-cover to fill space
          />

          {/* Floating Info Card */}
          <Card className="absolute bottom-4 left-4 lg:bottom-8 lg:right-8 lg:left-auto z-20 bg-white/80 backdrop-blur-md shadow-xl border border-gray-100/60 rounded-xl w-auto max-w-[220px] sm:max-w-[250px]">
            {" "}
            {/* Adjusted max-width */}
            <CardContent className="p-3 sm:p-4">
              {" "}
              {/* Adjusted padding */}
              <div className="flex items-center space-x-2 sm:space-x-3 mb-1.5 sm:mb-2">
                {" "}
                {/* Adjusted spacing */}
                <span className="p-1.5 sm:p-2 bg-emerald-500 rounded-full text-white shadow-sm">
                  {" "}
                  {/* Adjusted padding */}
                  <HeartPulse size={14} sm={16} /> {/* Adjusted size */}
                </span>
                <div>
                  <p className="text-xs text-gray-500 leading-tight">
                    {" "}
                    {/* Adjusted leading */}
                    Avg. Resting HR
                  </p>
                  <p className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                    {" "}
                    {/* Adjusted size/leading */}
                    72{" "}
                    <span className="text-xs sm:text-sm font-normal text-gray-600">
                      bpm
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center text-xs text-green-600">
                <Check size={14} className="mr-1" />
                <span>Normal Range</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Home2 /> 
      <Home3 />
      <Home4 />
      <Home6 /> {/* Added Home4 component for additional content */}
      {/* Added Home2 component for additional content */}
    </div>
  );
};

export default VetWellbeingDashboardRedesigned;
