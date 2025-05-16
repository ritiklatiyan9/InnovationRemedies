import React from "react";
import veterinaryVideoUrl from "../../../assets/Video/bg121.mp4"; // Ensure this path is correct
// ensure it's correctly imported/linked in your project's HTML or CSS.

const customStyle = {
  fontFamily: "Oregon LDO, sans-serif", // Custom font style, 'sans-serif' is a fallback
  fontWeight: "400",
};
const customStyle2 = {
  fontFamily: "Moonhouse, sans-serif", // Custom font style, 'sans-serif' is a fallback
  fontWeight: "400",
};


const HeroSection = () => {
  

  return (
    <section
      style={customStyle}
      className="relative w-full h-screen overflow-hidden" // h-screen makes it take full viewport height
    >
      {/* Background Video Container */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted // Muted is often required for autoplay in modern browsers
          playsInline // Important for iOS Safari to play inline and not fullscreen
          src={veterinaryVideoUrl}
          className="w-full h-full object-cover object-center" // 'object-cover' ensures the video covers the area
          // Optional: Add a poster image for while the video loads or if it fails
          // poster="/path/to/your/video-poster-image.jpg"
          onError={(e) => {
            console.error("Video Error:", e);
            // You could implement a fallback to a static image here if the video fails
            // For example, by setting a state variable that changes the background.
          }}
        >
          Your browser does not support the video tag. {/* Fallback text for old browsers */}
        </video>
      </div>

      {/* Gradient Overlay for Text Contrast */}
      {/* This overlay helps make the text readable over various video backgrounds.
          Adjust the colors and opacity (e.g., slate-900/85) as needed. */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-transparent"></div>

      {/* Content Area */}
      {/* 'relative z-10' ensures this content is above the video and overlay.
          'flex items-center' for vertical centering of the content block.
          'h-full' ensures the flex container takes the full height of the section. */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full py-16 md:py-24">
        <div className="max-w-xl lg:max-w-2xl"> {/* Constrains the width of the text content */}
        <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-tight">
  Thoughtful Handling
  <br /> 
  Expertly <br /> <span style={customStyle2} className="text-sky-400 -tracking-tighter">Developed Solutions</span>
</h1>
<p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-200 max-w-lg -tracking-tighter">
  Committed to excellence in every step. We treat your products with the utmost care and apply deep technical expertise to deliver innovative, reliable solutions tailored to your needs.
</p>

          {/* Buttons and other interactive elements were removed as per your request */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;