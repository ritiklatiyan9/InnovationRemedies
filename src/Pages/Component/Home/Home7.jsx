// src/components/HeroSection.jsx
import { Button } from "@/components/ui/button"; // Adjust path if necessary
import { PlayCircle, ChevronRight, BookKey } from "lucide-react";
import { FaResearchgate } from "react-icons/fa";


const customStyle = {
    fontFamily: "Oregon LDO, sans-serif",
    fontWeight: "400",
  }

const HeroSection = () => {
  const heroImageUrl =
    "https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  return (
    <section 
    style={customStyle}
    className="relative w-full overflow-hidden h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImageUrl}
          alt="Laboratory background with scientists"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Gradient Overlay for text contrast */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-r from-slate-900/85 via-slate-900/50 to-transparent"></div>

      {/* Content Area */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-[70vh] sm:min-h-[80vh] lg:min-h-[560px] py-16 md:py-24">
        <div className="max-w-xl lg:max-w-2xl">
           
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-tight">
            Research & Verify
            <br />
            Innovation Remedies <span className="text-sky-400">Laboratory</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-200 max-w-lg">
            Innovation Remedies is ultramodern laboratory services. Delivering newer
            molecules from our state of the art laboratories
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              Learn More
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white text-blue-600 border-transparent hover:bg-slate-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900/50 px-6 text-base rounded-full group flex items-center shadow-md hover:shadow-lg transition-all duration-300"
            >
              <PlayCircle className="mr-2 h-5 w-5 text-blue-600 transition-colors group-hover:text-blue-700" />
              View Video
            </Button>
          </div>
        </div>
      </div>

      {/* Right Arrow Navigator */}
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