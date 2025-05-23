// src/Pages/Component/Home/Home.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Home2 from "./Home2";
import Home3 from "./Home3";
import Home4 from "./Home4";
import Home6 from "./Home6";
import Home7 from "./Home7";
import Home8 from "./Home8";
import logo from "../../../assets/Images/logo.png";
import videoSourceUrl from "../../../assets/Video/bg911.mp4";
import { FlipWords } from "../../../components/ui/flips-words";
import { PawPrint, HeartPulse, Activity, Dog, TreePine } from "lucide-react";

const customStyle2 = {
  fontFamily: "Libreville-Free, sans-serif",
  fontWeight: "400",
};
const customStyle = {
  fontFamily: "Moonhouse, sans-serif",
  fontWeight: "400",
}

const dolceAmyaraStyle = {
  fontFamily: "'Dolce & Amyara Personal Use', serif",
  fontWeight: "normal",
};

function Home() {
  const words = ["World", "Care", "Family", "Health"];

  const heartBeat = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.1, 1], transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" } },
  };
  const actSwing = {
    initial: { rotate: 0 },
    animate: { rotate: [0, 8, -8, 0], transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" } },
  };

  // --- SEO & Domain Config (NATIONAL FOCUS) ---
  const siteUrl = "https://www.innovationremedies.com";
  const siteName = "Innovation Remedies";
  // Page title for national brand recognition
  const pageTitle = `${siteName} | Trusted Animal Health & Veterinary Products Across India`;
  // Page description emphasizing national service
  const pageDescription = `${siteName} is your dedicated partner for advanced veterinary pharmaceuticals and animal health solutions throughout India. Enhancing animal wellness, health, and performance with our innovative product range.`;
  const canonicalUrl = `${siteUrl}/`;
  const ogImageUrl = `${siteUrl}/logo.png`; // Ensure logo.png is in /public folder

  // Organization Schema for the homepage - reinforce national brand
  const primaryEntitySchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "alternateName": "Innovation Remedies Life Science Pvt. Ltd.",
    "description": `Pioneering veterinary solutions, ${siteName} offers a comprehensive range of animal health products to customers across India.`,
    "url": siteUrl,
    "logo": ogImageUrl,
    "image": ogImageUrl, // Can be a different representative image if desired
    "telephone": "+91-9412702900", // REPLACE with your PRIMARY business phone (consistent with App.jsx)
    "email": "info@innovationremedies.com", // REPLACE with your primary contact email
    "address": { // Primary corporate/registered address (consistent with App.jsx)
      "@type": "PostalAddress",
      "streetAddress": "Kila Parikshitgarh", // REPLACE with your Head Office / Registered Address
      "addressLocality": "Meerut", // City of Head Office
      "addressRegion": "UP",   // State of Head Office
      "postalCode": "250406", // Postal Code of Head Office
      "addressCountry": "IN"
    },
    "sameAs": [ // REPLACE with your ACTUAL social media profile URLs (consistent with App.jsx)
       "https://www.facebook.com/profile.php?id=61575431486434",
      // "https://www.instagram.com/YourInnovationRemediesPage",
      // "https://www.linkedin.com/company/YourInnovationRemediesPage",
      // "https://twitter.com/YourInnovationRemediesHandle"
    ],
    // "areaServed": { // You can explicitly state area served here too if needed
    //   "@type": "Country",
    //   "name": "India"
    // }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home", // Or use siteName
      "item": canonicalUrl
    }]
  };

  return (
    <div className="w-full text-gray-800 font-sans">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {/* Keywords with national focus */}
        <meta name="keywords" content={`${siteName}, veterinary products India, animal health solutions India, animal supplements India, pet wellness India, livestock care India, veterinary pharmaceuticals India`} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph - Emphasize National Brand */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card - Emphasize National Brand */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        {/* <meta name="twitter:site" content="@YourBrandHandle" /> */} {/* REPLACE */}

        {/* Geo Meta Tags - Can still show origin if desired, but primary focus is national */}
        {/* If you want to completely de-emphasize specific locality for homepage, you can remove these or make them broader for India */}
        <meta name="geo.region" content="IN" /> {/* Broader region: India */}
        {/* <meta name="geo.placename" content="Meerut" /> */} {/* Optional: Keep if origin is part of brand story */}
        {/* <meta name="geo.position" content="28.9803;77.7039" /> */}
        {/* <meta name="ICBM" content="28.9803, 77.7039" /> */}

        {/* Structured Data Scripts */}
        <script type="application/ld+json">
          {JSON.stringify(primaryEntitySchema, null, 2)}
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
            src={videoSourceUrl} autoPlay loop muted playsInline preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        </div>

        <div className="relative z-10 container mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-3/5 lg:w-2/3 text-center md:text-left  mb-6 md:pt-0">
          
            <h1
              style={customStyle2}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-4 drop-shadow-lg bg-gradient-to-r from-gray-100 via-blue-50 to-slate-200 bg-clip-text text-transparent"
            >
              <span className="block text-4xl md:text-8xl -tracking-tighter lg:text-8xl bg-gradient-to-r from-blue-200 via-slate-100 to-indigo-200 bg-clip-text text-transparent" style={customStyle}>
                INNOVATION
              </span>
              <span className="block whitespace-nowrap text-2xl md:text-6xl mt-2 text-slate-300 font-light">
              Remedies Life Science Pvt. Ltd.
              </span>
            </h1>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 text-gray-200 drop-shadow-md">
              Advancing Animal <FlipWords words={words} className="text-green-500 font-semibold" /> Across India
            </h2>

            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 mx-auto md:mx-0">
              Welcome to {siteName}. We deliver cutting-edge veterinary solutions nationwide, enhancing the health,
              wellness, and vitality of animals throughout India.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center space-x-2.5 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-md border border-white/20 transition-all duration-300 hover:bg-white/20 cursor-default">
                <motion.span className="flex items-center justify-center p-1.5 bg-rose-500/80 rounded-full text-white shadow-inner" variants={heartBeat} initial="initial" animate="animate">
                  <HeartPulse size={18} strokeWidth={2.5} />
                </motion.span>
                <span className="text-sm font-medium text-white tracking-wide">Health Boosters</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-md border border-white/20 transition-all duration-300 hover:bg-white/20 cursor-default">
                <motion.span className="flex items-center justify-center p-1.5 bg-emerald-500/80 rounded-full text-white shadow-inner" variants={actSwing} initial="initial" animate="animate">
                  <Activity size={18} strokeWidth={2.5} />
                </motion.span>
                <span className="text-sm font-medium text-white tracking-wide">Activity Enhancers</span>
              </div>
                 <div className="flex items-center space-x-2.5 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-md border border-white/20 transition-all duration-300 hover:bg-white/20 cursor-default">
                <motion.span className="flex items-center justify-center p-1.5 bg-orange-500 rounded-full text-white shadow-inner" variants={heartBeat} initial="initial" animate="animate">
                  <Dog size={18} strokeWidth={2.5} />
                </motion.span>
                <span className="text-sm font-medium text-white tracking-wide">Growth Boosters</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-md border border-white/20 transition-all duration-300 hover:bg-white/20 cursor-default">
                <motion.span className="flex items-center justify-center p-1.5 bg-emerald-700/80 rounded-full text-white shadow-inner" variants={actSwing} initial="initial" animate="animate">
                  <TreePine size={18} strokeWidth={2.5} />
                </motion.span>
                <span className="text-sm font-medium text-white tracking-wide"> Wellness Enhancers</span>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      <Home8 />
       <div className=""><Home6 /></div>
     
      <Home7 />
      <div className=""><Home3 /></div>
      <div className=""><Home4 /></div>
      <div><Home2 /></div>
    </div>
  );
}

export default Home;