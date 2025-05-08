// src/Pages/Component/Home/Home.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Home2 from "./Home2"; // Assuming Home2 to Home8 are in the same directory or paths are correct
import Home3 from "./Home3";
import Home4 from "./Home4";
import Home6 from "./Home6";
import Home7 from "./Home7";
import Home8 from "./Home8";
import videoSourceUrl from "../../../assets/Video/bg9.mp4"; // Verify this path
import logoAsset from "../../../assets/Images/logo.png"; // Renamed to avoid conflict, verify this path
import { FlipWords } from "../../../components/ui/flips-words"; // Verify this path
import { PawPrint, HeartPulse, Activity } from "lucide-react";

const customStyle2 = {
  fontFamily: "Libreville-Free, sans-serif", // Ensure 'Libreville-Free' is loaded
  fontWeight: "400",
};

const dolceAmyaraStyle = {
  fontFamily: "'Dolce & Amyara Personal Use', serif", // Ensure 'Dolce & Amyara Personal Use' is loaded
  fontWeight: "normal",
};

// Component name changed to Home
function Home() {
  const words = ["World", "Care", "Family", "Health"];

  const heartBeat = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1],
      transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
    },
  };
  const actSwing = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, 8, -8, 0],
      transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
    },
  };

  // --- SEO & Domain Config ---
  const siteUrl = "https://www.innovationremedies.com"; // IMPORTANT: REPLACE with your actual domain
  const siteName = "Innovation Remedies";
  const pageTitle = "Innovation Remedies | Leading Veterinary Solutions in Meerut & Delhi NCR";
  const pageDescription = "Innovation Remedies: Your trusted partner for advanced veterinary pharmaceuticals and animal health products in Meerut, Delhi NCR, and Uttar Pradesh. Enhancing pet wellness, health, and activity.";
  const canonicalUrl = `${siteUrl}/`; // Canonical URL for the homepage
  const ogImageUrl = `${siteUrl}/logo.png`; // Assuming logo.png is in your public folder and accessible via this URL

  // Structured Data for VeterinaryCare
  const veterinaryCareJsonLd = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "name": siteName,
    "description": "Innovation Remedies specializes in advanced veterinary pharmaceuticals and health products, serving Meerut, Delhi NCR, and beyond.",
    "url": siteUrl,
    "image": ogImageUrl,
    "logo": ogImageUrl,
    "telephone": "+91-YOUR-ACTUAL-PHONE", // REPLACE
    "email": "contact@innovationremedies.com", // REPLACE
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "YOUR Corporate Office Address", // REPLACE
      "addressLocality": "Meerut",
      "addressRegion": "UP", // Use state abbreviation
      "postalCode": "25000X", // REPLACE
      "addressCountry": "IN"
    },
    "openingHours": "Mo-Sa 09:00-18:00", // Adjust as needed
    "areaServed": [ // Can be multiple areas
      {
        "@type": "AdministrativeArea",
        "name": "Meerut"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Delhi NCR"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Uttar Pradesh"
      }
    ],
    "sameAs": [ // Add your actual social media links
      // "https://www.facebook.com/YourProfile",
      // "https://www.linkedin.com/company/yourcompany",
      // "https://twitter.com/YourHandle"
    ],
    // "priceRange": "$$" // Optional: Typical price range
  };

  // Breadcrumb for Homepage (optional but good practice)
   const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": canonicalUrl
    }]
  };


  return (
    <div className="w-full text-gray-800 font-sans">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="Innovation Remedies, veterinary products Meerut, animal health Delhi NCR, pet wellness Uttar Pradesh, vet supplies India, animal pharmaceuticals, pet care, veterinary medicine" />
        <link rel="canonical" href={canonicalUrl} />
        {/* <meta name="robots" content="index, follow" /> // Default is index, follow, so often not needed unless changing */}

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" /> {/* Optional: Specify image dimensions */}
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_IN" /> {/* Example locale */}


        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        {/* <meta name="twitter:site" content="@YourTwitterHandle" /> */} {/* REPLACE with your actual Twitter handle */}

        {/* Geo Meta Tags */}
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Meerut" />
        <meta name="geo.position" content="28.9803;77.7039" /> {/* Latitude;Longitude */}
        <meta name="ICBM" content="28.9803, 77.7039" /> {/* Latitude, Longitude */}

        {/* Structured Data Scripts */}
        <script type="application/ld+json">
          {JSON.stringify(veterinaryCareJsonLd, null, 2)}
        </script>
         <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd, null, 2)}
        </script>
      </Helmet>

      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover filter brightness-[0.8] contrast-100"
            src={videoSourceUrl}
            autoPlay
            loop
            muted
            playsInline // Important for iOS autoplay
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-3/5 lg:w-2/3 text-center md:text-left  mb-6 md:pt-0">
            <div className="mb-5 flex justify-center md:justify-start opacity-90">
              <div className="p-2 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-full shadow-lg">
                <PawPrint size={28} className="text-white" />
              </div>
            </div>
            <h1
              style={customStyle2}
              className="
                text-5xl sm:text-6xl lg:text-6xl
                font-extrabold tracking-tight leading-tight
                mb-4 drop-shadow-lg
                bg-gradient-to-r from-gray-100 via-blue-50 to-slate-200
                bg-clip-text text-transparent
              "
            >
              <span
                className="block text-5xl md:text-9xl
                bg-gradient-to-r from-blue-100 via-slate-50 to-indigo-200
                bg-clip-text text-transparent"
                style={dolceAmyaraStyle}
              >
                Innovation
              </span>
              <span className="block whitespace-nowrap text-2xl md:text-6xl">
                Remedies Life Science Pvt. Ltd.
              </span>
            </h1>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 text-gray-200 drop-shadow-md">
              Advancing Animal{" "}
              <FlipWords words={words} className="text-white font-semibold" />{" "}
            </h2>

            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 mx-auto md:mx-0">
              Providing cutting-edge veterinary solutions to enhance the health,
              wellness, and vitality of animals across Meerut and Delhi NCR.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center space-x-2.5 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-md border border-white/20 transition-all duration-300 hover:bg-white/20 cursor-default">
                <motion.span
                  className="flex items-center justify-center p-1.5 bg-rose-500/80 rounded-full text-white shadow-inner"
                  variants={heartBeat}
                  initial="initial"
                  animate="animate"
                >
                  <HeartPulse size={18} strokeWidth={2.5} />
                </motion.span>
                <span className="text-sm font-medium text-white tracking-wide">
                  Health Boosters
                </span>
              </div>
              <div className="flex items-center space-x-2.5 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-md border border-white/20 transition-all duration-300 hover:bg-white/20 cursor-default">
                <motion.span
                  className="flex items-center justify-center p-1.5 bg-emerald-500/80 rounded-full text-white shadow-inner"
                  variants={actSwing}
                  initial="initial"
                  animate="animate"
                >
                  <Activity size={18} strokeWidth={2.5} />
                </motion.span>
                <span className="text-sm font-medium text-white tracking-wide">
                  Activity Enhancers
                </span>
              </div>
            </div>
          </div>
          {/* Optional: Right Column for Image/Illustration - if needed */}
          {/* <div className="w-full md:w-2/5 lg:w-1/3 hidden md:block">
             <img src={logoAsset} alt="Innovation Remedies Illustration" className="w-full h-auto object-contain rounded-lg shadow-xl" />
          </div> */}
        </div>
      </section>

      <Home8 />
      <div>
        <Home2 />
      </div>
      <Home7 />
      <div className="">
        <Home3 />
      </div>
      <div className="">
        <Home4 />
      </div>
      <div className="">
        <Home6 />
      </div>
    </div>
  );
}

export default Home; // Exporting as Home