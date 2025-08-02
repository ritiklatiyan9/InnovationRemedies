import React from "react";
import veterinaryVideoUrl from "../../../assets/Video/bg121.mp4"; // Ensure this path is correct

// Ensure your custom fonts 'Oregon LDO' and 'Moonhouse' are correctly
// imported/linked in your project's HTML or CSS (e.g., via @font-face in your global CSS).
// For example, in your main CSS file:
// @font-face {
//   font-family: 'Oregon LDO';
//   src: url('/fonts/OregonLDO.woff2') format('woff2'), /* Adjust path */
//        url('/fonts/OregonLDO.woff') format('woff');
//   font-weight: 400; /* Or whatever weights you have */
//   font-style: normal;
// }
// @font-face {
//   font-family: 'Moonhouse';
//   src: url('/fonts/Moonhouse.woff2') format('woff2'), /* Adjust path */
//        url('/fonts/Moonhouse.woff') format('woff');
//   font-weight: 400;
//   font-style: normal;
// }

const customFontStyle5 = {
  fontFamily: "'Qrada Personal Use', sans-serif",
  fontWeight: 600,
  fontStyle: "normal",
};
const customFontStyle3 = {
  fontFamily: "'Neue Montreal Regular', sans-serif",
  fontWeight: 600,
  fontStyle: "normal",
};



// It's generally better to define font families in CSS and use Tailwind classes,
// but for direct application like this, these styles are fine.
const customStyleOregon = {
  fontFamily: "Oregon LDO, sans-serif",
  fontWeight: "400", // Assuming Oregon LDO is used for regular/bold text
};

const customStyleMoonhouse = {
  fontFamily: "Libreville-Free, sans-serif",
  fontWeight: "400", // Assuming Moonhouse is a more decorative/accent font
};

const HeroSection = () => {
  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center" // min-h-screen allows content to grow, flex for centering
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
          onError={(e) => {
            console.error("Video Error:", e);
            // Fallback: you could set a state to show a static background image here
          }}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Dark Overlay for Text Contrast - Increased opacity for better readability */}
      <div className="absolute inset-0 z-[5] bg-black/70"></div> {/* Simple, effective dark overlay */}

      {/* Content Area - Centered */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 text-center py-20 md:py-32">
        {/* Optional: You can have a smaller tagline/pre-header if needed */}
        <p 
          style={customStyleOregon} 
          className="text-sky-300 text-base sm:text-lg md:text-xl font-light mb-3 sm:mb-4 tracking-wide"
        >
          Commitment in Every Detail
        </p>

        <h1 
          style={customFontStyle3}  // Base font for the H1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 sm:mb-8"
        >
          Thoughtful Handling,
          <br />
          <span 
            style={customFontStyle5} 
            className="block text-sky-400 mt-1 sm:mt-2 text-[.6em] p-4 -tracking-tight" // Slightly larger, Moonhouse font
          >
            Expertly Developed Solutions
          </span>
        </h1>

        <p 
          style={customFontStyle3}
          className="mt-4 sm:mt-6 text-lg sm:text-lg lg:text-xl text-slate-200 max-w-xl lg:max-w-2xl mx-auto leading-relaxed -tracking-tighter"
        >
          We meticulously care for your products and leverage deep technical expertise to craft innovative, reliable solutions tailored precisely to your needs.
        </p>

        {/* Example Button (Optional) - Styled for a modern look */}
        {/* <div className="mt-8 sm:mt-10">
          <a
            href="#learn-more" // Replace with your actual link
            style={customStyleOregon}
            className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold text-lg px-8 py-3 rounded-lg shadow-lg transition-colors duration-300 transform hover:scale-105"
          >
            Discover Our Approach
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;