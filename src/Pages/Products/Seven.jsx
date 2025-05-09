import React from 'react';
import { ChevronRight, Package, PillBottle, TrendingUp } from 'lucide-react';

import ayngrowBolus40Image from '../../assets/Images/twentyone.jpg'; // Main product image

// --- Product Data (keeping as is) ---
const ayngrowBolusData = {
  mainTitle: "Ayngrow",
  hindiHeader: "अयनग्रो बोलस",
  productType: "Bolus",
  benefitsTitle: "फायदे :",
  benefits: [
    "गाभिन पशुओं में अयन (जड़) को बढ़ाती है।",
    "पशुओं में कमजोरी और तनाव को दूर करती है।",
    "रोग प्रतिरोधक क्षमता बढ़ाती है।",
    "खुरों व थनों को चटकने से रोकती है।",
    "पशु को बार-बार बीमार होने से बचाती है।",
    "थनैला रोग से बचाव में सहायक है।",
    "रेस वाले भैंसें (झोटे) का स्टैमिना व ताकत बढ़ाती है।",
    "पशुओं में दूध टपकने से रोकती है।"
  ],
  usageTitle: "प्रयोग विधि :",
  usageInstructions: [
    { context: "पशुओं में ब्याहने के अन्तिम महीनों में :", dose: "1 बोलस प्रतिदिन 40 दिन तक।" },
    { context: "रेस वाले भैंसे (झोटे) :", dose: "1 बोलस प्रतिदिन 40 दिन तक।" }
  ],
  availablePackTitle: "Available Pack :",
  availablePacks: "20 Bolus & 40 Bolus",
  footerTagline: "Ayngrow bolus for better health & better productivity",
  udderSVGPath: "M80 60 C60 100, 40 100, 20 60 C20 30, 35 20, 50 20 C65 20, 80 30, 80 60 Z M30 55 C25 75, 30 85, 35 80 S45 60, 40 55 Z M50 58 C48 80, 52 80, 50 58 Z M70 55 C75 75, 70 85, 65 80 S55 60, 60 55 Z"
};

export default function AyngrowBolusProductPage() {
  const mainBgColor = "bg-yellow-400";
  const textColor = "text-black";
  const creamBgColor = "bg-yellow-50";
  const footerBgColor = "bg-black";
  const footerTextColor = "text-yellow-400";

  return (
    <div className={`min-h-screen font-sans antialiased ${creamBgColor}`}>
      {/* Header Section */}
      <header className={`${mainBgColor} py-6 sm:py-8 md:py-10 text-center shadow-lg`}>
        <div className="container mx-auto px-4">
          <h2 className={`${textColor} text-xl sm:text-2xl md:text-3xl font-semibold mb-0.5 sm:mb-1`}>
            {ayngrowBolusData.hindiHeader}
          </h2>
          <h1 className={`${textColor} text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight relative`}>
            {ayngrowBolusData.mainTitle}
            <span className="absolute -top-0.5 -right-2 sm:-right-3 md:-right-4 text-xs sm:text-sm font-bold text-black bg-yellow-300 px-1 sm:px-1.5 py-0.5 rounded-sm shadow">TM</span>
          </h1>
          <p className={`${textColor} text-xl sm:text-2xl md:text-3xl font-medium mt-0.5 sm:mt-1`}>
            {ayngrowBolusData.productType}
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      {/* On mobile, image comes first, then details */}
      <main className="container mx-auto p-4 sm:p-6 md:p-8 mt-0 md:-mt-6 lg:-mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">

          {/* Right Column: Product Images - Order 1 on mobile */}
          <div className="md:col-span-1 flex flex-col items-center space-y-4 sm:space-y-6 order-1 md:order-none md:pt-4 lg:pt-6">
            <div className="w-full max-w-[280px] sm:max-w-xs md:max-w-sm transform transition-transform duration-300 hover:scale-105">
              <img
                src={ayngrowBolus40Image}
                alt="Ayngrow Bolus 40 Pack"
                className="w-full h-auto object-contain drop-shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>

          {/* Left Column: Benefits, Usage, Pack Info - Order 2 on mobile */}
          <div className={`md:col-span-2 ${creamBgColor} p-4 sm:p-6 rounded-xl shadow-xl border-2 border-yellow-400 order-2 md:order-none`}>
            {/* Benefits */}
            <section className="mb-6 sm:mb-8">
              <h3 className={`${textColor} text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 flex items-center`}>
                <TrendingUp size={20} sm={24} className="mr-2 text-yellow-600" /> {ayngrowBolusData.benefitsTitle}
              </h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {ayngrowBolusData.benefits.map((benefit, index) => (
                  <li key={index} className={`flex items-start ${textColor} text-sm sm:text-base md:text-lg`}>
                    <ChevronRight size={18} sm={20} className="mr-1.5 sm:mr-2 mt-0.5 sm:mt-1 text-yellow-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Usage Instructions */}
            <section className="mb-6 sm:mb-8">
              <h3 className={`${textColor} text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 flex items-center`}>
                <PillBottle size={20} sm={24} className="mr-2 text-yellow-600" /> {ayngrowBolusData.usageTitle}
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {ayngrowBolusData.usageInstructions.map((item, index) => (
                  <div key={index} className={`${textColor} text-sm sm:text-base md:text-lg`}>
                    <p className="font-semibold">{item.context}</p>
                    <p className="pl-3 sm:pl-4">{item.dose}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Available Pack */}
            <section className="flex flex-col items-center text-center md:items-start md:text-left">
              <h3 className={`${textColor} text-lg sm:text-xl md:text-2xl font-bold mb-1.5 sm:mb-2 flex items-center justify-center md:justify-start`}>
                <Package size={20} sm={24} className="mr-2 text-yellow-600" /> {ayngrowBolusData.availablePackTitle}
              </h3>
              <p className={`${textColor} text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3`}>
                {ayngrowBolusData.availablePacks}
              </p>
              <svg viewBox="0 0 100 100" className="w-20 h-12 sm:w-24 sm:h-16 md:w-28 md:h-18 fill-current text-yellow-500 opacity-70">
                <path d={ayngrowBolusData.udderSVGPath}></path>
              </svg>
            </section>
          </div>
        </div>
      </main>

      {/* Footer Tagline */}
      <footer className={`${footerBgColor} ${footerTextColor} text-center py-3 sm:py-4 md:py-5 mt-8 sm:mt-10 md:mt-12 shadow-top-lg`}>
        <p className="text-base sm:text-lg md:text-xl font-semibold tracking-wide px-2">
          {ayngrowBolusData.footerTagline}
        </p>
      </footer>
    </div>
  );
}