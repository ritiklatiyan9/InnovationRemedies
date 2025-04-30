// VetWellbeingDashboardRedesigned.jsx
import React from "react";
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion";
import Home2 from "./Home2";
import Home3 from "./Home3";
import Home4 from "./Home4";
import Home6 from "./Home6";
import Products from "../Products/ListProducts";
import videoSourceUrl from "../../../assets/Video/bg.mp4";
import logo from '../../../assets/Images/logo.png'; // Ensure this is hosted publicly (e.g., via CDN)

import { FlipWords } from "../../../components/ui/flips-words";
import { Card, CardContent } from "@/components/ui/card";
import { HeartPulse, Activity, PawPrint, Check } from "lucide-react";

const VetWellbeingDashboardRedesigned = () => {
  const words = ["World", "Care", "Family", "Health"];
  const heartBeat = { /* ... animation config ... */ };
  const actSwing = { /* ... animation config ... */ };

  // 🌐 Domain Configuration
  const domain = "https://www.innovationremedies.com"; // Update with your actual domain
  const canonicalUrl = `${domain}/`;
  const ogImageUrl = `${domain}${logo}`; // Ensure logo is hosted publicly

  return (
    <div
    style={{
      fontFamily: '"SF Pro Text Semibold", system-ui, sans-serif',
      fontWeight: 600,
    }}
      className="w-full text-gray-800"
    >
      {/* SEO Meta Tags */}
      <Helmet>
        {/* 🔍 SEO Basics */}
        <title>Innovation Remedies | Veterinary Solutions in Meerut, Delhi NCR</title>
        <meta
          name="description"
          content="Innovation Remedies offers cutting-edge veterinary products for animal health, wellness, and activity in Meerut, Delhi NCR. Trusted by vets and pet owners."
        />
        <meta
          name="keywords"
          content="Innovation Remedies, veterinary care Meerut, animal health products Delhi NCR, pet wellness solutions, vet supplies in Uttar Pradesh"
        />

        {/* 🔗 Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* 📱 Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* 🧾 Robots */}
        <meta name="robots" content="index, follow" />

        {/* 🌐 Open Graph (Social Media) */}
        <meta property="og:title" content="Innovation Remedies - Veterinary Solutions in Meerut, Delhi NCR" />
        <meta property="og:description" content="Innovation Remedies offers cutting-edge veterinary products for animal health, wellness, and activity in Meerut, Delhi NCR." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Innovation Remedies" />

        {/* 🐦 Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Innovation Remedies - Veterinary Solutions in Meerut, Delhi NCR" />
        <meta name="twitter:description" content="Innovation Remedies offers cutting-edge veterinary products for animal health, wellness, and activity in Meerut, Delhi NCR." />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@innovationremedies" /> {/* Replace with your Twitter handle */}

        {/* 📍 Geolocation Targeting */}
        <meta name="geo.region" content="IN-UP" /> {/* Uttar Pradesh */}
        <meta name="geo.placename" content="Meerut" />
        <meta name="geo.position" content="28.9803;77.7039" /> {/* Coordinates for Meerut */}
        <meta name="ICBM" content="28.9803, 77.7039" />

        {/* 🧠 Schema Markup (LocalBusiness) */}
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

      {/* HERO SECTION with full-screen video */}
      <section className="relative h-screen w-full bg-gradient-to-br from-blue-50 via-emerald-50/50 to-white">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover filter brightness-50 contrast-120 sepia-30 saturate-140 hue-rotate-(-10deg)"
          src={videoSourceUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col lg:flex-row h-full">
          {/* Left Column */}
          <div className="lg:w-1/2 flex flex-col justify-center p-6 sm:p-8 lg:p-12 mt-10 md:mt-0">
            <div className="max-w-2xl mx-auto lg:mx-0">
              {/* Logo Icon */}
              <div className="mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-emerald-200 flex items-center justify-center shadow-md">
                    <PawPrint className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>

              {/* Main Title */}
              <h1   style={{
          fontFamily: '"SF Pro Text Semibold", system-ui, sans-serif',
          fontWeight: 600,
        }} className="mb-8">
                <span className="block text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                  Innovation Remedies
                </span>
                <span className="block mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white drop-shadow-md">
                  Better <FlipWords words={words} /> For
                </span>
                <span className="block mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
                  Every Animal
                </span>
              </h1>

              {/* Hindi Subtitle */}
              <p className="text-base sm:text-lg text-gray-200 max-w-xl mb-10" lang="hi">
                सर्वश्रेष्ठ उत्पादों का उपयोग करते हुए{" "}
                <span className="text-green-400 text-xl sm:text-2xl font-semibold">
                  पशुओं की भलाई
                </span>{" "}
                पर लगातार जानकारी प्रदान करना, ताकि आप उनके स्वास्थ्य और खुशहाली
                को सुनिश्चित कर सकें
              </p>

              {/* Feature Tags */}
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

          {/* Right Column (Floating Card) */}
          <div className="lg:w-1/2 w-full h-[60vh] sm:h-[70vh] lg:h-full relative">
            <Card className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 z-20 bg-white/90 backdrop-blur-lg shadow-2xl border border-gray-100/60 rounded-xl max-w-[260px]">
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

      {/* Other Sections */}
      <div className="relative z-0">
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