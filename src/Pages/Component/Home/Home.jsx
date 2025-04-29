import React from "react";
import { motion } from "framer-motion";
import Home2 from "./Home2";
import Home3 from "./Home3";
import Home4 from "./Home4";
import Home6 from "./Home6";
import videoSourceUrl from "../../../assets/Video/bg.mp4";
import logo from '../../../assets/Images/logo.png';

import { FlipWords } from "../../../components/ui/flips-words";
import { Card, CardContent } from "@/components/ui/card";

import { HeartPulse, Activity, PawPrint, Check } from "lucide-react";

const VetWellbeingDashboardRedesigned = () => {
  const words = ["World", "Care", "Family", "Health"];
  const heartBeat = {
    scale: [1, 1.15, 1],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    },
  };
  const actSwing = {
    rotate: [0, -4, 4, -4, 0],
    transition: {
      duration: 1,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  };

  return (
    <div
      style={{
        fontFamily: '"SF Pro Text Semibold", system-ui, sans-serif',
        fontWeight: 600,
      }}
      className="w-full text-gray-800"
    >
      {/* HERO SECTION with full-screen video */}
      <section className="relative h-screen w-full bg-gradient-to-br from-blue-50 via-emerald-50/50 to-white ">
        {/* video + overlay */}
        <video
          className="
    absolute inset-0 w-full h-full object-cover
    filter
    [filter:brightness(50%)_contrast(120%)_sepia(30%)_saturate(140%)_hue-rotate(-10deg)]
  "
          src={videoSourceUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />

        <div className="absolute inset-0 bg-black/30" />

        {/* hero content */}
        <div className="relative z-10 flex flex-col lg:flex-row h-full">
          {/* HERO TEXT */}
          <div className="lg:w-1/2 flex flex-col justify-center p-6 sm:p-8 lg:p-12 mt-10 md:mt-0 ">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <div className="mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-emerald-200 flex items-center justify-center shadow-md">
                    <PawPrint className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>

              <h1 className="mb-8">
                <span
                  className="
                    block text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight
                    bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500
                    bg-clip-text text-transparent drop-shadow-lg
                  "
                >
                  Innovation Remedies
                </span>
                <span
                  className="
                    block mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white
                    drop-shadow-md
                  "
                >
                  Better <FlipWords words={words} /> For
                </span>
                <span
                  className="
                    block mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold
                    bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500
                    bg-clip-text text-transparent drop-shadow-lg
                  "
                >
                  Every Animal
                </span>
              </h1>
              

              <p
                className="text-base sm:text-lg text-gray-200 max-w-xl mb-10"
                lang="hi"
              >
                सर्वश्रेष्ठ उत्पादों का उपयोग करते हुए{" "}
                <span className="text-green-400 text-xl sm:text-2xl font-semibold">
                  पशुओं की भलाई
                </span>{" "}
                पर लगातार जानकारी प्रदान करना, ताकि आप उनके स्वास्थ्य और खुशहाली
                को सुनिश्चित कर सकें
              </p>

              {/* FEATURE TAGS */}
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center space-x-2 bg-white p-3 rounded-full shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                  <motion.span
                    className="p-2 bg-rose-100 rounded-full text-red-600"
                    animate={heartBeat}
                  >
                    <HeartPulse size={20} />
                  </motion.span>
                  <p className="text-sm font-medium text-gray-700">
                    Health Booster
                  </p>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-full shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                  <motion.span
                    className="p-2 bg-emerald-100 rounded-full text-emerald-600"
                    animate={actSwing}
                  >
                    <Activity size={20} />
                  </motion.span>
                  <p className="text-sm font-medium text-gray-700">
                    Enhance Activity
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FLOATING CARD */}
          <div className="lg:w-1/2 w-full h-[60vh] sm:h-[70vh] lg:h-full relative">
            <Card
              className="
                absolute bottom-6 right-6 lg:bottom-8 lg:right-8 z-20
                bg-white/90 backdrop-blur-lg shadow-2xl border border-gray-100/60
                rounded-xl max-w-[260px]
              "
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="p-2 bg-emerald-500 rounded-full text-white shadow-sm">
                    <HeartPulse size={16} />
                  </span>
                  <div>
                    <p className="text-xs text-gray-500">Avg. Resting HR</p>
                    <p className="text-base sm:text-lg font-bold text-gray-900">
                      72{" "}
                      <span className="text-xs sm:text-sm text-gray-600">
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
      </section>

      {/* OTHER SECTIONS (no video background) */}
      <div className="relative z-0">
        <Home2 />
        <Home3 />
        <Home4 />
        <Home6 />
      </div>
    </div>
  );
};

export default VetWellbeingDashboardRedesigned;
