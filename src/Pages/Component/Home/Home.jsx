// src/Pages/Component/Home/Home.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Home2 from "./Home2"; // Ensure paths are correct
import Home3 from "./Home3";
import Home4 from "./Home4";
import Home6 from "./Home6";
import Home7 from "./Home7";
import Home8 from "./Home8";
import videoSourceUrl from "../../../assets/Video/bg9.mp4"; // Verify this path
// import logoAsset from "../../../assets/Images/logo.png"; // Not used directly in this component's render
import { FlipWords } from "../../../components/ui/flips-words"; // Verify this path
import { PawPrint, HeartPulse, Activity } from "lucide-react";

const customStyle2 = {
  fontFamily: "Libreville-Free, sans-serif",
  fontWeight: "400",
};

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

  // --- SEO & Domain Config ---
  const siteUrl = "https://www.innovationremedies.com"; // USE YOUR ACTUAL HTTPS DOMAIN
  const siteName = "Innovation Remedies"; // Crucial for branding
  const pageTitle = "Innovation Remedies | Leading Veterinary Solutions & Animal Health Products"; // Brand first
  const pageDescription = `${siteName} is your trusted partner for advanced veterinary pharmaceuticals and animal health products. We serve professionals and pet owners, enhancing animal wellness, health, and activity. Discover our innovative solutions.`; // Brand focused
  const canonicalUrl = `${siteUrl}/`;
  const ogImageUrl = `${siteUrl}/logo.png`; // URL to logo.png in /public folder

  // Structured Data for VeterinaryCare (or Organization if more general for the homepage brand)
  const primaryEntitySchema = { // Changed to be more generic, can be VeterinaryCare too
    "@context": "https://schema.org",
    "@type": "Organization", // Using Organization for broader brand representation on homepage
    "name": siteName,
    "alternateName": "Innovation Remedies Life Science Pvt. Ltd.", // Your full legal name if different
    "description": `Pioneering veterinary solutions, ${siteName} offers a comprehensive range of animal health products.`,
    "url": siteUrl,
    "logo": ogImageUrl, // Official logo
    "image": ogImageUrl, // Representative image (can be same as logo or a banner)
    "telephone": "+91-YOUR-ACTUAL-PHONE", // REPLACE
    "email": "contact@innovationremedies.com", // REPLACE
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "YOUR Corporate Office Address", // REPLACE
      "addressLocality": "Meerut",
      "addressRegion": "UP",
      "postalCode": "25000X", // REPLACE
      "addressCountry": "IN"
    },
    // If you are primarily a VeterinaryCare provider, you can use that type instead or in addition
    // "department": { // Example if you wanted to add VeterinaryCare aspects
    //   "@type": "VeterinaryCare",
    //   "name": `${siteName} - Veterinary Products Division`
    // },
    "sameAs": [ // REPLACE with your actual social media profile URLs
      // "https://www.facebook.com/InnovationRemediesOfficial",
      // "https://twitter.com/InnovationRemedies",
      // "https://www.linkedin.com/company/innovation-remedies"
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home", // Or siteName for the root breadcrumb
      "item": canonicalUrl
    }]
  };

  return (
    <div className="w-full text-gray-800 font-sans">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`${siteName}, veterinary products, animal health, pet wellness, vet supplies India, animal pharmaceuticals, pet care, veterinary medicine, innovative veterinary solutions`} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph - Emphasize Brand */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card - Emphasize Brand */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        {/* <meta name="twitter:site" content="@YourBrandHandle" /> */} {/* REPLACE */}

        {/* Geo Meta Tags (Still useful for local context if applicable, but brand is primary) */}
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Meerut" />
        <meta name="geo.position" content="28.9803;77.7039" />
        <meta name="ICBM" content="28.9803, 77.7039" />

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
            <div className="mb-5 flex justify-center md:justify-start opacity-90">
              <div className="p-2 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-full shadow-lg">
                <PawPrint size={28} className="text-white" />
              </div>
            </div>
            {/* H1: Make sure "Innovation Remedies" is clearly the main subject */}
            <h1
              style={customStyle2}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-4 drop-shadow-lg bg-gradient-to-r from-gray-100 via-blue-50 to-slate-200 bg-clip-text text-transparent"
            >
              <span className="block text-5xl md:text-8xl lg:text-9xl bg-gradient-to-r from-blue-100 via-slate-50 to-indigo-200 bg-clip-text text-transparent" style={dolceAmyaraStyle}>
                Innovation Remedies
              </span>
              <span className="block whitespace-nowrap text-xl md:text-4xl mt-2 text-slate-300 font-light">
                Life Science Pvt. Ltd.
              </span>
            </h1>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 text-gray-200 drop-shadow-md">
              Advancing Animal <FlipWords words={words} className="text-white font-semibold" />
            </h2>

            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 mx-auto md:mx-0">
              Welcome to {siteName}. We provide cutting-edge veterinary solutions to enhance the health,
              wellness, and vitality of animals.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {/* ... feature tags ... */}
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
            </div>
          </div>
        </div>
      </section>

      {/* Your other Home sections */}
      <Home8 />
      <div><Home2 /></div>
      <Home7 />
      <div className=""><Home3 /></div>
      <div className=""><Home4 /></div>
      <div className=""><Home6 /></div>
    </div>
  );
}

export default Home;