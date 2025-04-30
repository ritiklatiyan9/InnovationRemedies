// VetWellbeingDashboardRedesigned.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Home2 from "./Home2";
import Home3 from "./Home3";
import Home4 from "./Home4";
import Home6 from "./Home6";
import Products from "../Products/ListProducts";
import videoSourceUrl from "../../../assets/Video/bg.mp4";
import logo from "../../../assets/Images/logo.png";
import twelveone from "../../../assets/Images/twelveone.png";

import { FlipWords } from "../../../components/ui/flips-words";
import { Card, CardContent } from "@/components/ui/card";
import { HeartPulse, Activity, PawPrint, Check } from "lucide-react";

const VetWellbeingDashboardRedesigned = () => {
  const words = ["World", "Care", "Family", "Health"];
  const heartBeat = {
    /* ... your existing animation config ... */
  };
  const actSwing = {
    /* ... your existing animation config ... */
  };

  // 🌐 Domain Configuration
  const domain = "https://www.innovationremedies.com";
  const canonicalUrl = `${domain}/`;
  const ogImageUrl = `${domain}${logo}`;

  return (
    <div
      className="w-full text-gray-800 font-semibold"
      style={{ fontFamily: '"SF Pro Text Semibold", system-ui, sans-serif' }}
    >
      {/* SEO Meta Tags */}
      <Helmet>
        <title>
          Innovation Remedies | Veterinary Solutions in Meerut, Delhi NCR
        </title>
        <meta
          name="description"
          content="Innovation Remedies offers cutting-edge veterinary products for animal health, wellness, and activity in Meerut, Delhi NCR. Trusted by vets and pet owners."
        />
        <meta
          name="keywords"
          content="Innovation Remedies, veterinary care Meerut, animal health products Delhi NCR, pet wellness solutions, vet supplies in Uttar Pradesh"
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Innovation Remedies - Veterinary Solutions in Meerut, Delhi NCR" />
        <meta property="og:description" content="Innovation Remedies offers cutting-edge veterinary products for animal health, wellness, and activity in Meerut, Delhi NCR." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Innovation Remedies" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Innovation Remedies - Veterinary Solutions in Meerut, Delhi NCR" />
        <meta name="twitter:description" content="Innovation Remedies offers cutting-edge veterinary products for animal health, wellness, and activity in Meerut, Delhi NCR." />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@innovationremedies" />
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Meerut" />
        <meta name="geo.position" content="28.9803;77.7039" />
        <meta name="ICBM" content="28.9803, 77.7039" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Innovation Remedies",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Health Lane",
                "addressLocality": "Meerut",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "250001",
                "addressCountry": "IN"
              },
              "telephone": "+91-1234567890",
              "email": "info@innovationremedies.com",
              "url": "${domain}",
              "sameAs": [
                "https://www.facebook.com/innovationremedies",
                "https://www.instagram.com/innovationremedies"
              ],
              "openingHours": "Mo-Su 09:00-18:00",
              "description": "Innovation Remedies provides advanced veterinary solutions for animal health, wellness, and activity across Meerut, Delhi NCR.",
              "image": "${ogImageUrl}"
            }
          `}
        </script>
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative h-screen w-full bg-gradient-to-br from-blue-50 via-emerald-50/50 to-white">
        <video
          className="absolute inset-0 w-full h-full object-cover filter brightness-50 contrast-120 sepia-30 saturate-140 hue-rotate-(-10deg)"
          src={videoSourceUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 flex flex-col lg:flex-row h-full">
          {/* LEFT COLUMN (Text) */}
          <div className="lg:w-1/2 w-full flex flex-col justify-center items-center lg:items-start p-6 sm:p-8 lg:p-12">
            <div className="max-w-2xl text-start lg:text-left">
              {/* Logo Icon */}
              <div className="mb-6 flex  mt-20 md:mt-0 justify-start lg:justify-start ">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-400 to-emerald-200 flex items-center justify-center shadow-md">
                  <PawPrint className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Main Title */}
              <h1 className="mb-8">
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                  Innovation Remedies
                </span>
                <span className="block mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-semibold text-white drop-shadow-md">
                  Better <FlipWords words={words} /> 
                </span>
                <span className="block mt-3 text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
                
                </span>
              </h1>

              {/* Hindi Subtitle */}
              <p className="text-base sm:text-lg text-gray-200 max-w-xl mb-10" lang="hi">
              उत्तम उत्पाद, बेहतर देखभाल – क्योंकि पशु परिवार का हिस्सा हैं।
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
                <div className="flex items-center space-x-2 bg-white p-3 rounded-full shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                  <motion.span className="p-2 bg-rose-100 rounded-full text-red-600" animate={heartBeat}>
                    <HeartPulse size={20} />
                  </motion.span>
                  <p className="text-sm font-medium text-gray-700">Health Booster</p>
                </div>
                <div className="flex items-center space-x-2 bg-white p-3 rounded-full shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                  <motion.span className="p-2 bg-emerald-100 rounded-full text-emerald-600" animate={actSwing}>
                    <Activity size={20} />
                  </motion.span>
                  <p className="text-sm font-medium text-gray-700">Enhance Activity</p>
                </div>
              </div>
            </div>
          </div>
<div>
  
</div>
          {/* RIGHT COLUMN (Image) */}
          <div className="lg:w-1/2 w-full ml-12 -mt-10 justify-center lg:justify-end items-center  md:flex sm:p-8 lg:p-12">
            <img
              className=" lg:mt-48 h-[24vh]  sm:h-[50vh] md:h-[60vh] lg:h-[60vh] max-w-full object-contain"
              src={twelveone}
              alt="Animal wellness"
            />
          </div>
        </div>
      </section>

      {/* OTHER SECTIONS */}
      <div className="relative mt-10 z-0">
        <Home2 />
        <Home3 />
        <Home4 />
        <Products />
        <Home6 />
      </div>
    </div>
  );
};

export default VetWellbeingDashboardRedesigned;
