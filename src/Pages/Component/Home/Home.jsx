// src/components/VetWellbeingDashboard.jsx
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
import { PawPrint, HeartPulse, Activity } from "lucide-react";

const VetWellbeingDashboard = () => {
  const words = ["World", "Care", "Family", "Health"];
  const heartBeat = {
    // your existing framer-motion heartbeat animation config
    initial: { scale: 1 },
    animate: { scale: [1, 1.2, 1], transition: { duration: 1.5, repeat: Infinity } }
  };
  const actSwing = {
    // your existing framer-motion swing animation config
    initial: { rotate: 0 },
    animate: { rotate: [0, 15, -15, 0], transition: { duration: 2, repeat: Infinity } }
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
      <section className="relative w-full bg-gradient-to-br from-blue-50 via-emerald-50/50 to-white">
        {/* Video background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover filter brightness-50 contrast-120 sepia-30 saturate-140 hue-rotate-[-10deg]"
            src={videoSourceUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content: stacks on mobile, splits at md */}
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-stretch min-h-[80vh] py-12 md:py-0">
          {/* LEFT COLUMN */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24">
            {/* Logo icon */}
            <div className="mb-6 flex">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-400 to-emerald-200 flex items-center justify-center shadow-md">
                <PawPrint className="w-7 h-7 text-white" />
              </div>
            </div>

            {/* Titles */}
            <h1 className="mb-6">
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                Innovation Remedies
              </span>
              <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white drop-shadow-md">
                Better <FlipWords words={words} />
              </span>
            </h1>

            {/* Hindi subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xl mb-8" lang="hi">
              उत्तम उत्पाद, बेहतर देखभाल – क्योंकि पशु परिवार का हिस्सा हैं।
            </p>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <motion.span className="p-2 bg-rose-100 rounded-full text-red-600" animate={heartBeat}>
                  <HeartPulse size={20} />
                </motion.span>
                <span className="text-sm font-medium text-gray-700">Health Booster</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-full shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <motion.span className="p-2 bg-emerald-100 rounded-full text-emerald-600" animate={actSwing}>
                  <Activity size={20} />
                </motion.span>
                <span className="text-sm font-medium text-gray-700">Enhance Activity</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full md:w-1/2 flex justify-center items-center px-6 sm:px-10 md:px-16 lg:px-24 mt-8 md:mt-0">
            <img
              src={twelveone}
              alt="Animal wellness"
              className="w-full max-w-lg h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* OTHER SECTIONS */}
      <div className="mt-10">
        <Home2 />
        <Home3 />
        <Home4 />
        <Products />
        <Home6 />
      </div>
    </div>
  );
};

export default VetWellbeingDashboard;
