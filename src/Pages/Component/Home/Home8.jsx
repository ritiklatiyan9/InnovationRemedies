// src/components/HeroSection.jsx
import { Button } from "@/components/ui/button"; // Adjust path if necessary
import { PlayCircle, ChevronRight } from "lucide-react"; // BookKey and FaResearchgate were unused
import videoUrl from "../../../assets/Video/bg10.mp4"; // Adjust path if necessary
const customStyle2 = {
  fontFamily: "Libreville-Free, sans-serif",
  fontWeight: "400",
};
const customStyle = {
  fontFamily: "Moonhouse, sans-serif",
  fontWeight: "400",
}

  

const HeroSection = () => {
  // You'll need a URL for your video.
// <<<<---- REPLACE WITH YOUR VIDEO PATH
  const posterImageUrl =
    "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"; // Fallback poster

  return (
    <section
    style={customStyle2}
    className="relative w-full overflow-hidden h-screen">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline // Important for iOS to prevent fullscreen
          poster={posterImageUrl} // Shows an image while video loads or if it fails
          className="w-full h-full object-cover object-center"
          // You can provide multiple sources for different video formats
          // src={videoUrl} // Or use the src attribute directly if only one format
        >
          <source src={videoUrl} type="video/mp4" />
          {/* Add other formats if needed, e.g., WebM or Ogg */}
          {/* <source src="/videos/lab-background.webm" type="video/webm" /> */}
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Gradient Overlay for text contrast - MODIFIED for left-aligned text */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-transparent"></div>

      {/* Content Area - MODIFIED for left alignment */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start min-h-[70vh] sm:min-h-[80vh] lg:min-h-[560px] py-16 md:py-24">
        <div className="max-w-xl lg:max-w-2xl text-left"> {/* Changed text-right to text-left */}
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-tight">
            Research & Verify
            <br />
            <span className=" text-5xl md:text-7xl" style={customStyle}>Innovation</span> <br /> <span className=" text-xl md:text-4xl">Remedies Life Science Pvt. Ltd.</span> <span style={customStyle} className="text-sky-400">Laboratory</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-200 max-w-lg"> {/* Removed ml-auto */}
            Innovation Remedies is ultramodern laboratory services. Delivering newer
            molecules from our state of the art laboratories
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col items-start sm:flex-row sm:items-center sm:justify-start gap-4"> {/* Changed items-end to items-start and sm:justify-end to sm:justify-start */}
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
                  <PlayCircle className="mr-2 h-5 w-5 text-white transition-colors group-hover:text-blue-700" />
              Learn More
            </Button>
          
          </div>
        </div>
      </div>

      {/* Right Arrow Navigator (position unchanged, consider if it should move) */}
      <button
        aria-label="Next slide"
        className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-4 lg:right-6 z-20 bg-white/80 backdrop-blur-sm p-2 sm:p-2.5 rounded-[3px] shadow-md hover:bg-white transition-colors duration-300"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700" />
      </button>
    </section>
  );
};

export default HeroSection;