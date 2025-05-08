import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Home2 from "./Home2";
import Home3 from "./Home3";
import Home4 from "./Home4";
import Home6 from "./Home6";
import Home7 from "./Home7";
import Home8 from "./Home8";
// import Products from "../Products/ListProducts"; // Assuming not used in this snippet, commented out
import videoSourceUrl from "../../../assets/Video/bg9.mp4"; // Ensure this path is correct
import logo from "../../../assets/Images/logo.png"; // Ensure this path is correct
// import twelveone from "../../../assets/Images/twelveone.png"; // Assuming not used in this snippet, commented out
import { FlipWords } from "../../../components/ui/flips-words"; // Ensure this path is correct
import { PawPrint, HeartPulse, Activity } from "lucide-react";

const customStyle2 = {
  fontFamily: "Libreville-Free, sans-serif",
  fontWeight: "400",
};

// Define the style for the "Dolce & Amyara" font
const dolceAmyaraStyle = {
  fontFamily: "'Dolce & Amyara Personal Use', serif", // Use the exact font name, quoted if it has spaces. Added a generic serif fallback.
  fontWeight: "normal", // The font in the image preview appears to be normal weight. Adjust if needed.
};

const VetWellbeingDashboard = () => {
  const words = ["World", "Care", "Family", "Health"];

  // Animation Variants for Icons
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
  const domain = "https://www.innovationremedies.com"; // Replace with your actual domain
  const canonicalUrl = `${domain}/`;
  const ogImageUrl = `${domain}${logo}`;

  return (
    <div className="w-full text-gray-800 font-sans">
      <Helmet>
        {/* --- SEO Meta Tags --- */}
        <title>
          Innovation Remedies | Leading Veterinary Solutions in Meerut & Delhi
          NCR
        </title>
        <meta
          name="description"
          content="Innovation Remedies: Your trusted partner for advanced veterinary pharmaceuticals and animal health products in Meerut, Delhi NCR, and Uttar Pradesh. Enhancing pet wellness, health, and activity."
        />
        <meta
          name="keywords"
          content="Innovation Remedies, veterinary products Meerut, animal health Delhi NCR, pet wellness Uttar Pradesh, vet supplies India, animal pharmaceuticals, pet care"
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Innovation Remedies - Leading Veterinary Solutions"
        />
        <meta
          property="og:description"
          content="Discover top-tier veterinary products for animal health, wellness, and activity from Innovation Remedies, serving Meerut, Delhi NCR."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Innovation Remedies" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Innovation Remedies - Veterinary Solutions"
        />
        <meta
          name="twitter:description"
          content="Advanced veterinary products for animal health and wellness in Meerut & Delhi NCR by Innovation Remedies."
        />
        <meta name="twitter:image" content={ogImageUrl} />
        {/* <meta name="twitter:site" content="@YourTwitterHandle" /> */}{" "}
        {/* Add actual handle */}
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Meerut" />
        <meta name="geo.position" content="28.9803;77.7039" />
        <meta name="ICBM" content="28.9803, 77.7039" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "VeterinaryCare", // More specific schema type
              "name": "Innovation Remedies",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Corporate Office Address", // Replace with actual address
                "addressLocality": "Meerut",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "250001", // Replace with actual postal code
                "addressCountry": "IN"
              },
              "telephone": "+91-9876543210", // Replace with actual phone
              "email": "contact@innovationremedies.com", // Replace with actual email
              "url": "${domain}",
              "image": "${ogImageUrl}",
              "description": "Innovation Remedies specializes in advanced veterinary pharmaceuticals and health products, serving Meerut, Delhi NCR, and beyond.",
              "openingHours": "Mo-Sa 09:00-18:00", // Adjust as needed
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "28.9803",
                  "longitude": "77.7039"
                },
                "geoRadius": "100000" // Radius in meters (e.g., 100km) serving Delhi NCR
              },
              "sameAs": [
                 // Add actual social media links here
                "https://www.facebook.com/YourProfile",
                "https://www.linkedin.com/company/yourcompany"
              ]
            }
          `}
        </script>
      </Helmet>
      {/* --- HERO SECTION --- */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden text-white">
        {/* Video Background Layer */}
        <div className="absolute inset-0 z-0">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover filter brightness-[0.8] contrast-100"
            src={videoSourceUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 container mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* LEFT COLUMN (Text Content) */}
          <div className="w-full md:w-3/5 lg:w-2/3 text-center md:text-left  mb-6 md:pt-0">
            {/* Optional: Subtle Icon/Logo Above Title */}
            <div className="mb-5 flex justify-center md:justify-start opacity-90">
              <div className="p-2 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-full shadow-lg">
                <PawPrint size={28} className="text-white" />
              </div>
            </div>

            {/* Main Headline - Bolder, Clearer */}
            <h1
  style={customStyle2} // Applies Libreville-Free and fontWeight 400 as a base to the H1
  className="
    text-5xl sm:text-6xl lg:text-6xl
    font-extrabold tracking-tight leading-tight
    mb-4 drop-shadow-lg
    bg-gradient-to-r from-gray-100 via-blue-50 to-slate-200
    bg-clip-text text-transparent
  "
>
  <span 
    className="block text-9xl
    bg-gradient-to-r from-blue-100 via-slate-50 to-indigo-200
    bg-clip-text text-transparent" 
    style={dolceAmyaraStyle}
  >
    Innovation
  </span>
  <span className="block whitespace-nowrap">
    Remedies Life Science Pvt. Ltd.
  </span>
</h1>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 text-gray-200 drop-shadow-md">
              {/* Empty h2, possibly for spacing or future content */}
            </h2>
            {/* Sub-headline with FlipWords */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 text-gray-200 drop-shadow-md">
              Advancing Animal{" "}
              <FlipWords words={words} className="text-white font-semibold" />{" "}
            </h2>

            {/* Descriptive Paragraph */}
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 mx-auto md:mx-0">
              Providing cutting-edge veterinary solutions to enhance the health,
              wellness, and vitality of animals across Meerut and Delhi NCR.
            </p>

            {/* Feature Tags - Enhanced Styling */}
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
        </div>
      </section>

      <Home8 />
      {/* --- OTHER SECTIONS --- */}
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
};

export default VetWellbeingDashboard;