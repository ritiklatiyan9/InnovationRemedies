import React from "react";
import { motion } from "framer-motion";
import veterinaryVideoUrl from "../../../assets/Video/bg8.mp4"; // Ensure this path is correct
// Make sure 'Oregon LDO' and 'Moonhouse' fonts are correctly imported/linked.
// For example, in your global CSS (e.g., index.css or App.css):
/*
@font-face {
  font-family: 'Oregon LDO';
  src: url('/path/to/your/fonts/OregonLDO.woff2') format('woff2'),
       url('/path/to/your/fonts/OregonLDO.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Moonhouse';
  src: url('/path/to/your/fonts/Moonhouse.woff2') format('woff2'),
       url('/path/to/your/fonts/Moonhouse.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}
*/
// Or, if using Tailwind CSS, configure them in your tailwind.config.js theme.extend.fontFamily

const customStyleBase = {
  fontFamily: "Oregon LDO, sans-serif", // Custom font style, 'sans-serif' is a fallback
  fontWeight: "400",
};

const customStyleHighlight = {
  fontFamily: "Moonhouse, sans-serif",
  fontWeight: "400",
};

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Delay between each child animation
      delayChildren: 0.2,   // Initial delay before first child starts
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 }, // Start slightly lower and faded out
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring", // Gives a subtle bounce effect
      stiffness: 100,
      // duration: 0.6, // Alternatively, use tween for more direct control
      // ease: "easeOut",
    },
  },
};

const HeroSection = () => {
  return (
    <section
      style={customStyleBase}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Video Container */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          src={veterinaryVideoUrl}
          className="w-full h-full object-cover object-center"
          poster="/path/to/your/video-poster-image.jpg" // Recommended: Add a poster image
          onError={(e) => {
            console.error("Video Error:", e);
            // Fallback: You could set state here to show a static background image
          }}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Gradient Overlay for Text Contrast */}
      {/* Adjusted for potentially better readability or a more modern feel if desired */}
      {/* Current: from-slate-900/85 via-slate-900/60 */}
      {/* Alternative: from-black/70 via-black/50 to-transparent */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent"></div>

      {/* Content Area */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full py-16 md:py-24">
        {/* Framer Motion container for staggered animations */}
        <motion.div
          className="max-w-xl lg:max-w-2xl xl:max-w-3xl" // Slightly increased max-width for larger screens
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight" // Slightly larger, added tracking
          >
            Compassionate Care
            <br />
            For Your <br /><span style={customStyleHighlight} className="text-sky-400 -tracking-tighter">Beloved Animals</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 sm:mt-8 text-lg sm:text-xl text-slate-200/90 max-w-lg leading-relaxed" // Increased size, more line-height, slightly less opaque
          >
            Dedicated to providing exceptional veterinary services. Our experienced team
            offers comprehensive medical, surgical, and wellness care for your furry family members.
          </motion.p>
          
          {/* If you wanted to add buttons later, they could also use itemVariants */}
          {/* 
          <motion.div variants={itemVariants} className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors duration-300 text-lg">
              Our Services
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-sky-400 text-sky-400 font-semibold rounded-lg hover:bg-sky-400 hover:text-white transition-colors duration-300 text-lg">
              Contact Us
            </button>
          </motion.div> 
          */}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;