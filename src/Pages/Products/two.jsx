import React from 'react';
import { CheckCircle, ListOrdered, Clock, Package, Zap, Droplet } from 'lucide-react'; // Added Droplet for flavor

// --- IMPORT YOUR IMAGES ---
import glucodynaBottleImage from '../../assets/Images/tenn.png';
// import orangeFlavorGraphic from '../../assets/Images/orange-graphic.svg'; // Example for flavor image

// --- Product Data ---
const glucodynaProductData = {
  name: "GLUCODYNA-40",
  qualifier: "Advance",
  tagline: "Bridge The Energy Gap Of Postpartum Cows With Energy Booster",
  ingredientsPreamble: "Each Litre contains :",
  ingredients: [
    "Propylene Glycol 400 ml", "Purified Honey 100 ml", "Bioactive Chromium 1800 mcg",
    "Magnesium Sulphate 1000 mg", "Niacin 10 gm", "Olive Oil 20 gm", "Calcium Phosphate 50 gm",
    "Aswagandha Extract 10 ml", "Glycrine 300 ml", "Vitamin C 5000 mcg",
    "silymarin 5000 mg.", "Purified Water q.s."
  ],
  flavor: "ORANGE FLAVOUR",
  benefitsTitle: "Benefits :",
  benefits: [
    "Helps in prevention of NEB & Ketosis",
    "Prevents harmful effects of NEB on Uterus",
    "Helps bring animal back to feed & milk production in case of sudden drop in milk production along with low feed intake",
    "Improves post calving health & production"
  ],
  dosageTitle: "Dosage :",
  dosage: [
    "200 ml twice daily for two days",
    "followed by 100 ml daily for two days"
  ],
  presentationTitle: "Presentation :",
  presentation: "1 Litre",
};

export default function GlucodynaProductPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 font-sans antialiased text-slate-800"> {/* Added default text color */}
      <div className="container mx-auto p-4 sm:p-6 md:p-8 max-w-6xl"> {/* Responsive padding */}

        {/* Top Header Section */}
        <header className="bg-orange-500 shadow-xl rounded-xl p-4 sm:p-6 md:p-8 mb-6 md:mb-8 text-white relative overflow-hidden">
          {/* Decorative elements - adjusted sizes for responsiveness */}
          <div className="absolute -top-8 -left-8 sm:-top-10 sm:-left-10 w-24 h-24 sm:w-32 sm:h-32 bg-orange-400/70 rounded-full opacity-50"></div>
          <div className="absolute -bottom-10 -right-6 sm:-bottom-12 sm:-right-8 w-32 h-32 sm:w-40 sm:h-40 bg-orange-400/60 rounded-full opacity-40"></div>

          <div className="relative z-10">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-yellow-300 tracking-wide mb-1 sm:mb-2"> {/* Responsive text size and margin */}
                {glucodynaProductData.tagline}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white uppercase tracking-tight my-1 sm:my-2" style={{ color: '#2c3e50' }}>
                {glucodynaProductData.name}
                <span className="ml-2 text-2xl sm:text-3xl md:text-4xl text-yellow-400 align-middle">{glucodynaProductData.qualifier}</span>
              </h1>
            </div>

            <div className="mt-4 sm:mt-6 bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-lg">
              <h3 className="text-base sm:text-lg font-semibold text-yellow-300 mb-1.5 sm:mb-2 flex items-center">
                <ListOrdered size={18} sm={20} className="mr-2"/> {glucodynaProductData.ingredientsPreamble}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed"> {/* Responsive text size */}
                {glucodynaProductData.ingredients.join(' + ')}
              </p>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        {/* On mobile, stack image first, then details for better visual hierarchy */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

          {/* Right Column (Product Image & Flavor) - Order changed for mobile */}
          <div className="lg:col-span-1 space-y-6 md:space-y-8 flex flex-col items-center order-1 lg:order-2">
             {/* Product Image - Placed higher for better mobile view */}
             <div className="w-full max-w-xs sm:max-w-sm flex justify-center items-center pt-0 lg:pt-8"> {/* Added lg:pt-8 to align better on large screens */}
              <img
                src={glucodynaBottleImage}
                alt={`${glucodynaProductData.name} Bottle`}
                className="max-h-[350px] sm:max-h-[400px] md:max-h-[450px] lg:max-h-[500px] object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </div>
            {/* Flavor Visual */}
            <div className="relative w-full flex flex-col items-center justify-center text-center mt-4 lg:mt-0"> {/* Full width on mobile for centering */}
              {/* Optional: Flavor image
              <img src={orangeFlavorGraphic} alt="Orange flavor" className="w-16 h-16 sm:w-20 sm:h-20 mb-2 opacity-80 animate-pulse-slow" />
              */}
              <div className="bg-orange-500 text-white py-2 px-4 sm:py-2.5 sm:px-6 rounded-full shadow-md inline-flex items-center">
                <Droplet size={18} sm={20} className="mr-2 text-yellow-300"/>
                <span className="text-sm sm:text-base font-semibold tracking-wide">{glucodynaProductData.flavor}</span>
              </div>
            </div>
          </div>

          {/* Left Column (Benefits, Dosage, Presentation) - Order changed for mobile */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8 order-2 lg:order-1">
            {/* Benefits Section */}
            <section className="bg-green-600 text-white p-4 sm:p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 flex items-center">
                    <Zap size={24} sm={28} className="mr-2 text-yellow-300"/>
                    {glucodynaProductData.benefitsTitle}
                </h2>
                <ul className="space-y-2.5 sm:space-y-3 pl-1 sm:pl-2">
                    {glucodynaProductData.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-sm sm:text-base">
                        <CheckCircle size={18} sm={20} className="mr-2 sm:mr-3 mt-0.5 sm:mt-1 text-yellow-300 flex-shrink-0" />
                        <span>{benefit}</span>
                    </li>
                    ))}
                </ul>
            </section>

            {/* Dosage & Presentation Section */}
            <section className="bg-emerald-700 text-yellow-200 p-4 sm:p-6 rounded-xl shadow-lg"> {/* Changed color slightly for distinction */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 flex items-center">
                            <Clock size={20} sm={24} className="mr-2"/>
                            {glucodynaProductData.dosageTitle}
                        </h2>
                        {glucodynaProductData.dosage.map((line, index) => (
                            <p key={index} className="text-sm sm:text-base mb-1">{line}</p>
                        ))}
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 flex items-center">
                            <Package size={20} sm={24} className="mr-2"/>
                            {glucodynaProductData.presentationTitle}
                        </h2>
                        <p className="text-base sm:text-lg font-semibold">{glucodynaProductData.presentation}</p>
                    </div>
                </div>
            </section>
          </div>
        </main>

        {/* Optional Footer */}
        <footer className="text-center mt-10 md:mt-12 py-4 sm:py-6 border-t border-orange-300/70"> {/* Adjusted border color */}
            <p className="text-xs sm:text-sm text-orange-800"> {/* Responsive text size */}
                © {new Date().getFullYear()} Your Company Name. All rights reserved. <br className="sm:hidden"/> {/* Break line on mobile */}
                Consult your veterinarian for animal health advice.
            </p>
        </footer>

      </div>
      {/* For animate-pulse-slow (already present and fine) */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}